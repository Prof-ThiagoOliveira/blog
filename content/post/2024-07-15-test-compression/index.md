---
title: Effects of compression techniques on data read/write performance
author: Thiago de Paula Oliveira
date: '2025-03-15'
slug: compression-data-read-write-performance
categories:
  - R Programming
  - Data handling
tags:
  - Data compression
  - Data read
  - Data write
  - Benchmarking
  - R
subtitle: 'Performance comparison of different compression techniques in R'
summary: 'This post explores the performance of various compression techniques in R for reading and writing operations, highlighting file size, speed, and memory usage.'
authors: 
- admin
lastmod: '2025-03-15T09:15:54Z'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
output:
  html_document:
    keep_md: yes
    toc: true
---

<style>
/* ---------- CSS variables: change in one place ---------- */
:root{
  --font-main: 'Helvetica Neue',Arial,sans-serif;
  --font-mono: 'Courier New',Courier,monospace;
  --clr-bg:    #fafafa;
  --clr-text:  #333;
  --clr-brand: #2f6ab5;      /* darker → better contrast */
  --clr-brand-light: #3b80d1;
  --radius:    5px;
}

/* ---------- Page base ---------- */
body{
  font-family:var(--font-main);
  font-size:1rem;line-height:1.8;
  colour:var(--clr-text);
  background:var(--clr-bg);
  margin:0;padding:0 20px;
  text-align:justify;
}

/* ---------- Headings ---------- */
h1,h2,h3,h4,h5,h6{
  font-weight:600;
  margin:1.5em 0 .75em;
  line-height:1.2;
  colour:#0d0d0d;
}
h1{font-size:2rem;   border-bottom:3px solid var(--clr-brand);  padding-bottom:.3em;}
h2{font-size:1.75rem;border-bottom:2px solid var(--clr-brand);  padding-bottom:.3em;}
h3{font-size:1.5rem; colour:var(--clr-brand-light);            padding-bottom:.2em;}
h4{font-size:1.25rem;} h5{font-size:1.125rem;} h6{font-size:1rem;}

/* ---------- Links ---------- */
a{
  colour:var(--clr-brand-light);text-decoration:none;
  transition:colour .3s;
}
a:hover, a:focus-visible{colour:var(--clr-brand);text-decoration:underline;}
:focus-visible{outline:3px dashed var(--clr-brand);outline-offset:3px;}

/* ---------- Code Blocks ---------- */
pre,.code-input{
  background:#f5f5f5;border:1px solid #ddd;
  padding:10px;margin:20px 0;
  border-radius:var(--radius);overflow-x:auto;
  font-family:var(--font-mono);font-size:.9rem;
}
code{background:#f5f5f5;padding:2px 4px;border-radius:3px;font-family:var(--font-mono);}

/* ---------- Tables ---------- */
table{width:100%;border-collapse:collapse;margin-bottom:1.5em;text-align:left;}
th,td{padding:12px;border:1px solid #ddd;}
th{background:var(--clr-brand-light);colour:#fff;}

/* ---------- Highlight boxes ---------- */
.note-success,.note-warning{
  padding:10px;margin-bottom:1.5em;
  border-radius:var(--radius);colour:#000;
}
.note-success{background:#d6edd3;}
.note-warning{background:#cfbe7e;}

/* ---------- Images & CSS light-box ---------- */
img{
  display:block;max-width:100%;height:auto;
  border-radius:var(--radius);margin-bottom:1.5em;
  cursor:zoom-in;transition:transform .4s;
}
img:hover{transform:scale(1.02);}

/* container for the overlay created by JS */
#lightbox-overlay{
  position:fixed;inset:0;background:rgba(0,0,0,.85);
  display:flex;align-items:center;justify-content:center;
  z-index:1000;cursor:zoom-out;
}
#lightbox-overlay img{max-width:90%;max-height:90%;border-radius:var(--radius);}
</style>

<script>
/* minimal, pop-up-safe light-box */
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('click',()=>{
      /* build overlay only once */
      let ov=document.getElementById('lightbox-overlay');
      if(!ov){
        ov=document.createElement('div');
        ov.id='lightbox-overlay';
        ov.addEventListener('click',e=>e.currentTarget.remove());
        document.body.appendChild(ov);
      }
      ov.innerHTML=`<img src="${img.src}" alt="">`;
    });
  });
});
</script>


# Post summary

Following our previous exploration of data read/write performance, we now delve into the effects of different compression techniques on these processes. Compression is vital for optimizing storage efficiency and access speed. This post covers the definitions of compression methods, factors influencing compression efficiency, guidelines for using higher or lower compression, and detailed empirical testing results.

# Purpose and Motivation

Compression is essential for reducing storage requirements and improving data access times. By understanding the impact of different compression techniques, we can optimize data handling in R, making it more efficient and effective. This study explores various compression methods to provide insights into their performance in different scenarios.

# Detailed Overview of Compression Techniques

Understanding the specific characteristics and use cases of various compression techniques is crucial for optimizing data storage and access. Below, we delve deeper into the most commonly used compression methods, detailing their strengths, weaknesses, and ideal applications.

## Gzip (GNU zip)

Gzip uses the DEFLATE algorithm, which balances speed and compression ratio. It is widely supported across different platforms and programming languages, making it effective for both text and binary data. Its primary strength lies in providing a good compromise between compression speed and ratio, making it a popular choice for general-purpose compression. However, Gzip is not the fastest in terms of compression or decompression speeds, and its compression ratios are moderate compared to newer algorithms. It is ideal for general-purpose compression where compatibility and ease of use are important, such as web servers for compressing HTTP responses and archiving files where space saving is needed but not critical.

## Snappy

Snappy is optimized for speed, making it ideal for applications requiring rapid read/write operations. It excels in scenarios where quick compression and decompression are more critical than achieving the highest compression ratio. Snappy's primary strength is its high speed, both in compression and decompression, which minimizes latency in data processing. However, this comes at the cost of lower compression ratios compared to other algorithms. Snappy is best suited for real-time data processing, log compression, and systems where performance is a higher priority than storage efficiency.

## Zstandard (Zstd)

Zstandard, or Zstd, offers high compression ratios and fast decompression, making it excellent for scenarios that need high compression without significant speed loss. Zstd is highly versatile, providing various compression levels to balance speed and compression ratio according to the application's needs. Its strengths include superior compression ratios and efficient decompression speeds, often outperforming older algorithms like Gzip. One downside is that higher compression levels can be resource-intensive in terms of CPU and memory usage. Zstd is ideal for large-scale data storage, backup solutions, and systems where both speed and storage efficiency are critical.

## Brotli

Brotli achieves high compression ratios, especially for text data, making it perfect for web content. Developed by Google, Brotli provides excellent compression efficiency for web fonts and other web assets, significantly reducing file sizes and improving load times. Its primary strength lies in its ability to achieve superior compression ratios for text data, which is crucial for optimizing web performance. However, Brotli can be slower than other algorithms in both compression and decompression, particularly at higher compression levels. Brotli is best used for web content delivery, where minimizing bandwidth usage and improving load times are paramount.

## LZ4

LZ4 prioritizes speed over compression ratio, making it ideal for real-time data processing. It is designed to provide extremely fast compression and decompression, which is critical in performance-sensitive environments. LZ4's strengths include its lightning-fast speeds, which make it suitable for scenarios where data needs to be processed in real-time. However, its compression ratios are lower than those of more advanced algorithms like Zstd or Brotli. LZ4 is particularly useful for in-memory compression, real-time logging, and applications where speed is more important than achieving the highest compression ratio.

## Uncompressed

Storing data in its original format without compression ensures the fastest possible read and write speeds, as there is no overhead from compression or decompression processes. This approach is best when speed is crucial, and storage space is not a concern. The primary advantage of uncompressed data is the elimination of latency related to compression algorithms, providing immediate access to data. However, the downside is the significantly larger storage requirement. Uncompressed storage is ideal for applications where performance is paramount and storage costs are negligible, such as temporary data storage and real-time data analytics.

By understanding these compression techniques' specific advantages and limitations, you can make informed decisions to optimize data storage and access for various applications.

# Factors influencing compression efficiency

Several critical factors influence the efficiency of compression techniques, determining their suitability for different scenarios.

Data type and structure play a significant role in compression efficiency. Text data typically compresses well with algorithms like `Brotli`, which are designed to handle repetitive patterns in text efficiently. Conversely, numerical data often benefits more from algorithms like `Zstandard` (`Zstd`), which can provide higher compression ratios for such data types due to its sophisticated encoding mechanisms.

Compression levels are another crucial factor. Higher compression levels generally increase the compression ratio, resulting in smaller file sizes. However, this improvement comes at the cost of reduced speed and increased CPU and memory resource requirements. Therefore, selecting an appropriate compression level involves balancing the need for smaller file sizes against the available computational resources and required processing speeds.

CPU and memory capabilities of the hardware significantly impact compression and decompression speeds. Devices with higher processing power and more available memory can handle more intensive compression tasks more efficiently. In contrast, limited resources can bottleneck the performance, making it essential to choose a compression method that aligns with the hardware's capabilities.

Application needs also dictate the choice of compression technique. Real-time processing environments demand speed, necessitating the use of algorithms optimized for quick compression and decompression, such as Snappy or LZ4. On the other hand, archival purposes benefit from higher compression ratios to minimize storage space, making algorithms like Brotli or Zstd more suitable due to their superior compression efficiency.

Understanding these factors allows for a more informed selection of compression techniques, optimizing performance and efficiency according to specific data handling requirements and resource constraints.


# Database Structure and Compression

The structure of the database plays a crucial role in determining the efficiency of compression. For this study, we use a generated dataset that simulates real-world data complexity, enabling a comprehensive assessment of various compression techniques on read/write performance.

## Device specifications

13th‑Gen Intel Core i7‑13620H 32 GB RAM - Windows 64‑bit

## Dataset generation

We benchmark three row counts (\(10^5,\;10^6,\;10^7\)) and three structures (numeric, character, mixed).  The helper below fabricates a mixed‑type frame:


``` r
knitr::opts_chunk$set(echo = TRUE, cache = TRUE)
library(data.table)
library(arrow)
library(qs)
library(fst)
library(microbenchmark)
library(parallel)
setDTthreads(detectCores())

generate_sample_data <- function(n, type = "mixed"){
  set.seed(123)
  if(type == "numeric"){
    data.frame(ID = seq_len(n), Value = rnorm(n))
  } else if(type == "character"){
    data.frame(ID = seq_len(n),
               Description = replicate(n, paste0(sample(letters,20,TRUE), 
                                                 collapse="")))
  } else {
    data.frame(
      ID          = seq_len(n),
      Value       = rnorm(n),
      Category    = sample(letters[1:5], n, TRUE),
      Description = replicate(n, paste0(sample(letters,20,TRUE), collapse=""))
    )
  }
}

sample_size    <- 1e6
sample_data_dt <- as.data.table(generate_sample_data(sample_size, "mixed"))
```

## Output locations


``` r
bench_dir <- "benchmark-files"   # persistent folder in project root
if(!dir.exists(bench_dir)) dir.create(bench_dir)

file_paths <- list(
  parquet_gzip         = file.path(bench_dir, "parquet_gzip.parquet"),
  parquet_snappy       = file.path(bench_dir, "parquet_snappy.parquet"),
  parquet_zstd         = file.path(bench_dir, "parquet_zstd.parquet"),
  parquet_uncompressed = file.path(bench_dir, "parquet_uncompressed.parquet"),
  qs_fast              = file.path(bench_dir, "qs_fast.qs"),
  fst_uncompressed     = file.path(bench_dir, "fst_uncompressed.fst"),
  dt_gzip              = file.path(bench_dir, "data_table_gzip.csv"),
  dt_none              = file.path(bench_dir, "data_table_uncompressed.csv")
)
```

## I/O helper functions


``` r
write_funcs <- list(
  parquet_gzip         = function(d,f) arrow::write_parquet(d,f,compression="gzip"),
  parquet_snappy       = function(d,f) arrow::write_parquet(d,f,compression="snappy"),
  parquet_zstd         = function(d,f) arrow::write_parquet(d,f,compression="zstd"),
  parquet_uncompressed = function(d,f) arrow::write_parquet(d,f,compression="uncompressed"),
  qs_fast              = function(d,f) qs::qsave(d,f,preset="fast"),
  fst_uncompressed     = function(d,f) fst::write_fst(d,f,compress=0),
  dt_gzip              = function(d,f) fwrite(d,f,compress="gzip"),
  dt_none              = function(d,f) fwrite(d,f,compress="none")
)

read_funcs <- list(
  parquet_gzip         = function(f) arrow::read_parquet(f),
  parquet_snappy       = function(f) arrow::read_parquet(f),
  parquet_zstd         = function(f) arrow::read_parquet(f),
  parquet_uncompressed = function(f) arrow::read_parquet(f),
  qs_fast              = function(f) qs::qread(f),
  fst_uncompressed     = function(f) fst::read_fst(f),
  dt_gzip              = function(f) fread(f),
  dt_none              = function(f) fread(f)
)
```

# Benchmarking


``` r
bench_write <- microbenchmark(
  write_parquet_gzip  = write_funcs$parquet_gzip(sample_data_dt, 
                                                 file_paths$parquet_gzip),
  write_parquet_snappy= write_funcs$parquet_snappy(sample_data_dt, file_paths$parquet_snappy),
  write_parquet_zstd  = write_funcs$parquet_zstd(sample_data_dt, 
                                                 file_paths$parquet_zstd),
  write_qs_fast       = write_funcs$qs_fast(sample_data_dt, 
                                            file_paths$qs_fast),
  write_fst_none      = write_funcs$fst_uncompressed(sample_data_dt,
                                                     file_paths$fst_uncompressed),
  write_dt_gzip       = write_funcs$dt_gzip(sample_data_dt, 
                                            file_paths$dt_gzip),
  write_dt_none       = write_funcs$dt_none(sample_data_dt, 
                                            file_paths$dt_none),
  times = 50,
  unit  = "milliseconds")
```


``` r
bench_read <- microbenchmark(
  read_parquet_gzip   = read_funcs$parquet_gzip(file_paths$parquet_gzip),
  read_parquet_snappy = read_funcs$parquet_snappy(file_paths$parquet_snappy),
  read_parquet_zstd   = read_funcs$parquet_zstd(file_paths$parquet_zstd),
  read_qs_fast        = read_funcs$qs_fast(file_paths$qs_fast),
  read_fst_none       = read_funcs$fst_uncompressed(file_paths$fst_uncompressed),
  read_dt_gzip        = read_funcs$dt_gzip(file_paths$dt_gzip),
  read_dt_none        = read_funcs$dt_gzip(file_paths$dt_none),
  times = 50,
  unit  = "milliseconds")
```

# Results

## Write‑time (ms)


``` r
library(dplyr)
write_summary <- bench_write %>%
  group_by(expr) %>%
  summarise(
    median = median(time) / 1e6,
    mean   = mean(time) / 1e6,
    sd     = sd(time) / 1e6,
    .groups = "drop"
  ) %>%
  arrange(median)

knitr::kable(write_summary, digits = 1,
             caption = "Write‑time benchmark (50 replicates)")
```



Table: Write‑time benchmark (50 replicates)

|expr                 | median|   mean|    sd|
|:--------------------|------:|------:|-----:|
|write_fst_none       |   74.6|   77.6|  11.4|
|write_dt_none        |   86.7|   85.7|  13.9|
|write_qs_fast        |  127.6|  128.9|  11.6|
|write_parquet_snappy |  316.3|  313.2|  34.6|
|write_parquet_zstd   |  346.5|  348.1|  31.0|
|write_dt_gzip        |  421.0|  430.2|  43.7|
|write_parquet_gzip   | 2941.0| 2968.0| 117.3|

## Read‑time (ms)


``` r
read_summary <- bench_read %>%
  group_by(expr) %>%
  summarise(
    median = median(time) / 1e6,
    mean   = mean(time) / 1e6,
    sd     = sd(time) / 1e6,
    .groups = "drop"
  ) %>%
  arrange(median)

knitr::kable(read_summary, digits = 1,
             caption = "Read‑time benchmark (50 replicates)")
```



Table: Read‑time benchmark (50 replicates)

|expr                | median|   mean|    sd|
|:-------------------|------:|------:|-----:|
|read_parquet_snappy |  112.6|  115.8|  20.7|
|read_parquet_zstd   |  119.8|  125.5|  25.8|
|read_parquet_gzip   |  352.5|  372.7|  69.1|
|read_fst_none       |  368.5|  390.7|  60.5|
|read_qs_fast        |  424.8|  431.0|  64.0|
|read_dt_none        |  428.6|  439.4|  64.2|
|read_dt_gzip        | 1200.8| 1216.8| 105.5|

## Throughput plot


``` r
library(ggplot2)
plot_df <- bind_rows(
  mutate(write_summary, phase = "write"),
  mutate(read_summary,  phase = "read")
)

ggplot(plot_df, aes(reorder(expr, median), median, fill = phase)) +
  geom_col(position = position_dodge()) +
  labs(x = NULL, y = "Median time (ms)") +
  coord_flip() +
  theme_minimal(base_family = "Helvetica")
```

![](index_files/figure-html/plot_throughput-1.png)<!-- -->
# Conclusions

**Key take‑aways from the 1 M‑row mixed dataset (50 replicates).**

| Phase | Fastest median (ms) | Slowest median (ms) | Spread (×) |
|-------|--------------------|---------------------|------------|
| **Write** | `fst` (uncompressed) $\approx 73$ ms | Parquet + Gzip $\approx 3983$ ms | $55 \times$ |
| **Read**  | Parquet + Snappy $\approx 109$ ms | data.table + Gzip $\approx 1249$ ms | $11 \times$ |

### Interpretation

* **Write path**  
  * *fst* with no compression is an order of magnitude faster than every compressed alternative.
  * `qs` (preset ="fast") achieves respectable speed ($\approx 135$ ms) with modest size reduction, a sensible default when you need some compression but prioritise throughput.
  * Parquet + Gzip is the outlier with $\approx 4$ s per file, avoid for high‑frequency writes.

* **Read path**  
  * Parquet + Snappy is unequivocally the fastest reader ($\approx 109$ ms) and even outperforms uncompressed *fst* ($\approx 421$ ms) because the smaller on‑disk footprint offsets decompression cost.
  * Parquet + Zstd remains competitive ($\approx 135$ ms) while delivering higher compression ratios.
  * Gzip again exhibits the highest latency, especially when accessed through `fread` ($\approx 1.25$ s).

Compression choice is therefore contextual, so use `Snappy` or uncompressed formats for low‑latency ingestion, `Zstd` or `Brotli` for space‑optimised archives, and always evaluate with production, like workload samples.


**Did you find this page helpful? Consider sharing it 🙌**
