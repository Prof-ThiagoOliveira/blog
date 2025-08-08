library(tidyverse)
library(tidyr)
library(purrr)
library(data.table)
library(arrow)
library(qs)
library(fst)
library(microbenchmark)
library(parallel)
setDTthreads(detectCores())

bench_dir <- "benchmark-files"
if (!dir.exists(bench_dir)) dir.create(bench_dir)

get_paths <- function(structure) {
  subdir <- file.path(bench_dir, structure)
  if (!dir.exists(subdir)) dir.create(subdir, recursive = TRUE)
  list(
    parquet_gzip         = file.path(subdir, "parquet_gzip.parquet"),
    parquet_snappy       = file.path(subdir, "parquet_snappy.parquet"),
    parquet_zstd         = file.path(subdir, "parquet_zstd.parquet"),
    parquet_uncompressed = file.path(subdir, "parquet_uncompressed.parquet"),
    qs_fast              = file.path(subdir, "qs_fast.qs"),
    fst_uncompressed     = file.path(subdir, "fst_uncompressed.fst"),
    dt_gzip              = file.path(subdir, "data_table_gzip.csv"),
    dt_none              = file.path(subdir, "data_table_uncompressed.csv")
  )
}

method_from_expr <- function(x) sub("^(write|read)_", "", x)

# Print a compact table per structure
print_per_structure <- function(df, s) {
  subdf <- df %>%
    filter(structure == s) %>%
    select(Method,
           `Write (ms)` = write_median_ms,
           `Read (ms)`  = read_median_ms,
           `Size (MB)`  = size_MB,
           `Rel size (%)` = relative_size) %>%
    arrange(`Write (ms)`)
  knitr::kable(subdf, digits = 1,
               caption = paste0("Performance summary — ", s, " (median times)"))
}

run_benchmarks_one <- function(dti, file_paths, write_funcs, read_funcs, 
                               times = 50) {
  # start clean
  invisible(lapply(unname(file_paths), 
                   function(p) if (file.exists(p)) unlink(p)))
  
  bw <- microbenchmark::microbenchmark(
    write_parquet_gzip = 
      write_funcs$parquet_gzip(dti, file_paths$parquet_gzip),
    write_parquet_snappy = 
      write_funcs$parquet_snappy(dti, file_paths$parquet_snappy),
    write_parquet_zstd = 
      write_funcs$parquet_zstd(dti, file_paths$parquet_zstd),
    write_parquet_uncompressed = 
      write_funcs$parquet_uncompressed(dti, file_paths$parquet_uncompressed),
    write_qs_fast  = 
      write_funcs$qs_fast(dti, file_paths$qs_fast),
    write_fst_uncompressed = 
      write_funcs$fst_uncompressed(dti,file_paths$fst_uncompressed),
    write_dt_gzip = 
      write_funcs$dt_gzip(dti, file_paths$dt_gzip),
    write_dt_none = 
      write_funcs$dt_none(dti, file_paths$dt_none),
    times = times, unit = "milliseconds"
  )
  
  br <- microbenchmark::microbenchmark(
    read_parquet_gzip = read_funcs$parquet_gzip(file_paths$parquet_gzip),
    read_parquet_snappy = read_funcs$parquet_snappy(file_paths$parquet_snappy),
    read_parquet_zstd = read_funcs$parquet_zstd(file_paths$parquet_zstd),
    read_parquet_uncompressed =
      read_funcs$parquet_uncompressed(file_paths$parquet_uncompressed),
    read_qs_fast = read_funcs$qs_fast(file_paths$qs_fast),
    read_fst_uncompressed  = 
      read_funcs$fst_uncompressed(file_paths$fst_uncompressed),
    read_dt_gzip = read_funcs$dt_gzip(file_paths$dt_gzip),
    read_dt_none = read_funcs$dt_none(file_paths$dt_none),
    times = times, unit = "milliseconds"
  )
  
  write_summary <- dplyr::summarise(dplyr::group_by(bw, expr),
                                    median = median(time)/1e6,
                                    mean   = mean(time)/1e6,
                                    sd     = sd(time)/1e6,
                                    .groups = "drop") |>
    dplyr::arrange(median)
  
  read_summary  <- dplyr::summarise(dplyr::group_by(br, expr),
                                    median = median(time)/1e6,
                                    mean   = mean(time)/1e6,
                                    sd     = sd(time)/1e6,
                                    .groups = "drop") |>
    dplyr::arrange(median)
  
  size_summary <- tibble::tibble(
    method   = names(file_paths),
    file     = as.character(unname(file_paths)),
    size_MB  = 
      vapply(unname(file_paths),
             function(p) if (file.exists(p)) file.size(p)/(1024^2) else NA_real_,
             numeric(1))
  ) |>
    dplyr::arrange(size_MB) |>
    dplyr::mutate(relative_size = 100 * size_MB / max(size_MB, na.rm = TRUE))
  
  list(write_summary = write_summary,
       read_summary  = read_summary,
       size_summary  = size_summary)
}

# Helper to make one plot per structure
make_structure_plot <- function(structure, log_scale = FALSE) {
  df <- plot_df %>% filter(structure == !!structure)
  
  # Stable ordering: by worst (max) median across phases for each method
  order_tbl <- df %>%
    group_by(Method) %>%
    summarise(order_val = max(median), .groups = "drop") %>%
    arrange(desc(order_val))
  
  df <- df %>%
    mutate(Method = factor(Method, levels = order_tbl$Method))
  
  p <- ggplot(df, aes(x = Method, y = median, fill = phase)) +
    geom_col(position = position_dodge(width = 0.75), width = 0.7) +
    coord_flip() +
    labs(
      title = paste0("Median I/O time — ", structure),
      x = NULL, y = "Median time (ms)", fill = NULL
    ) +
    theme_minimal(base_family = "Helvetica") +
    theme(legend.position = "top")
  
  if (log_scale) {
    p <- p + scale_y_log10()
  }
  p
}


# Helper: normalise to fastest (× from fastest)
normalise_ratio <- function(df, value_col) {
  df %>%
    group_by(structure) %>%
    mutate("{value_col}_ratio" := .data[[value_col]] / min(.data[[value_col]], 
                                                           na.rm = TRUE)) %>%
    ungroup()
}