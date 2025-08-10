---
title: Comparing data read and write performance in R
author: Thiago de Paula Oliveira
date: '2024-07-06'
slug: data-read-write-performance
categories:
  - R Programming
  - Data handling
tags:
  - Data read
  - Data write
  - Benchmarking
  - R
subtitle: 'Performance comparison of different data formats in R'
summary: 'This post explores the performance of various data formats in R for reading and writing operations, highlighting file size, speed, and memory usage.'
authors: 
- admin
lastmod: '2024-07-06T09:15:54Z'
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


# Post Summary

Efficient data handling is crucial for daily data analysis tasks. In this post, we compare the performance of various data formats in `R` for reading and writing operations, including RDS, CSV (using `data.table` and `readr`), FST, Feather, Parquet, and QS. We benchmark the speed, file sizes, and memory usage of each format across different data sizes.

QS offers the fastest read and write times, the smallest file sizes, and low memory usage, making it best suited for small to medium-sized data sets. FST delivers excellent read and write times along with efficient memory usage, which is suitable for high-performance tasks with small to moderately large data sets. Feather provides the fastest read times for large data sets, good write performance, and efficient memory usage, making it great for interoperability across different programming languages. 

# Database Definition

In this section, we will describe each of the data formats in detail, highlighting their strengths and weaknesses. We will provide insights into the specific use cases where each format excels. The choice of format will depend on the specific needs of the data analysis tasks.

## RDS

RDS is a format native to `R` that is highly efficient for saving single R objects. The `saveRDS()` and `readRDS()` functions are used to write and read `R` objects, respectively. RDS seamlessly integrates with `R`, retaining object metadata including data types and structures, which is beneficial for preserving the exact state of an `R` object. However, it can result in larger file sizes compared to some compressed formats due to lack of advanced compression and has limited compatibility with other software or programming languages.

## QS

QS (Quick Serialization of `R` objects) is a binary format for `R` objects that emphasizes speed and compression. It uses advanced compression algorithms to achieve high performance. QS provides extremely fast read and write operations, even for large data sets, making it suitable for high-performance computing tasks. However, QS is mainly designed for use within `R`, with limited support in other programming environments. It also requires familiarity with additional functions and parameters to fully leverage its capabilities.

### CSV (using `data.table` and `readr`)

CSV (Comma-Separated Values) is a plain text format widely used for data storage and transfer. `R` offers multiple ways to handle CSV files, with `data.table` and `readr` being popular for their speed and efficiency. 

- `data.table`: the package provides the `fread` and `fwrite` functions, which are optimized for speed and can handle large CSV files efficiently. These functions leverage multi-threading and offer various options for data parsing and writing, making them suitable for high-performance tasks.
- `readr`: the package offers `read_csv` and `write_csv` functions, which are designed for ease of use and fast data loading. `readr` focuses on providing a user-friendly interface while maintaining competitive performance.

The universality of CSV makes it readable across different software and programming languages. However, CSV does not retain data types and structure information, requiring manual handling and potential data type issues when reading back. It is generally slower for large data sets compared to binary formats due to the need to parse text. The text format also results in larger file sizes, especially for large data sets with many rows and columns.

### Columnar Storage Formats

Columnar storage is a method of storing data tables that improves the efficiency of reading and writing operations, especially for large data sets. Instead of storing data row by row, columnar storage organizes data by columns. This allows for more efficient data compression and faster retrieval of specific columns, which is particularly beneficial for analytical queries that often access a subset of columns from a large data set.

### FST

The `fst` package is a fast, binary data format for `R` data frames. It uses a highly efficient columnar storage format and supports multiple compression algorithms. FST offers extremely fast read and write operations, especially for large data sets, making it ideal for scenarios requiring frequent data access and manipulation.

- by storing data in columns, FST allows for quick access to specific columns without needing to load the entire data set into memory.
- it supports various compression methods, allowing users to balance between speed and file size reduction.
- it utilizes memory mapping to enable efficient access to large data sets without loading the entire file into memory, reducing memory usage and increasing speed.

### Feather

Feather is a binary columnar data format that is part of the Apache Arrow project. It provides efficient storage for data frames and supports interchangeability between different languages.

- it is built on top of the Apache Arrow columnar memory format, which ensures high performance and interoperability across different programming languages.
- it files can be easily shared between `R`, Python, and other languages, making it an excellent choice for multi-language data workflows.
- it provides fast read and write speeds due to its columnar storage, suitable for handling large data sets efficiently.

### Parquet

Parquet is a columnar storage file format optimized for large-scale data processing and is part of the Apache Hadoop ecosystem. Parquet is widely supported across different programming languages and big data tools, including `R`, Python, Spark, and more, facilitating seamless data exchange.

- it uses highly efficient data compression and encoding schemes to reduce file sizes significantly while maintaining performance.
- similar to FST and Feather, Parquet's columnar storage format is optimized for read performance on large data sets, especially when querying specific columns.
- it's integration with the Hadoop ecosystem and other big data tools makes it a popular choice for big data applications, ensuring compatibility and performance in large-scale data processing.

# Data Simulation

To evaluate the performance of various data formats, we generated sample data sets of varying sizes using a custom data generation function. This function creates data frames with three columns: an `ID` column with sequential integers, a `Value` column with random normal values, and a `Group` column with randomly selected letters. The sizes of the data sets range from 100 to 100 million rows, allowing us to assess the performance across different scales. The random seed is set to 123 to ensure reproducibility of the generated data.

```r
# Function to generate sample data sets
generate_sample_data <- function(n) {
  set.seed(123)
  data.frame(
    ID = 1:n,
    Value = rnorm(n),
    Group = sample(letters, n, replace = TRUE)
  )
}

# Define dataset sizes
dataset_sizes <- c(1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8)
```

## Benchmarking Read and Write Performance

The benchmarking process involves measuring the time taken to read from and write to different data formats. We used the `microbenchmark` package in `R` to perform these measurements, ensuring that each operation is repeated 100 times to obtain reliable statistics. Additionally, we considered multi-threading capabilities where applicable, leveraging the maximum number of available cores to enhance performance.

Multi-threading can significantly impact the performance of read and write operations. We determined the number of available threads using `parallel::detectCores()` and configured the relevant functions to use this information. For instance, the `fwrite` function from `data.table` and `qsave` from the `qs` package support multi-threading, which we enabled in our benchmarking process.

```r
# Determine and print the number of threads
num_threads <- parallel::detectCores()
cat("Number of threads available:", num_threads, "\n")
# Setting threads for data.table
setDTthreads(num_threads)
```

Thus, we defined functions for writing to and reading from each data format, incorporating multi-threading where supported. These functions were then used in the benchmarking process.

```r
# Definition of writing and reading functions with threading support
write_rds <- function(data, file) saveRDS(data, file)
write_dt <- function(data, file) data.table::fwrite(data, file, nThread = num_threads)
write_fst <- function(data, file) fst::write_fst(data, file)
write_feather <- function(data, file) arrow::write_feather(data, file)
write_qs <- function(data, file) qs::qsave(data, file, nthreads = num_threads)
write_readr <- function(data, file) readr::write_csv(data, file, num_threads = num_threads)
write_parquet <- function(data, file) arrow::write_parquet(data, file)

read_rds <- function(file) readRDS(file)
read_dt <- function(file) data.table::fread(file, nThread = num_threads)
read_fst <- function(file) fst::read_fst(file, as.data.table = TRUE)
read_feather <- function(file) arrow::read_feather(file)
read_qs <- function(file) qs::qread(file, nthreads = num_threads)
read_readr <- function(file) readr::read_csv(file, show_col_types = FALSE, num_threads = num_threads)
read_parquet <- function(file) arrow::read_parquet(file)
```

### Benchmarking Procedure

We looped over different data set sizes, writing the sample data to each format and measuring the file sizes, write times, read times, and memory usage. The results were stored in data frames for later analysis and visualization.

### Device Specifications

The benchmarking was conducted on a system with the following specifications:

- **Processor**: 13th Gen Intel(R) Core(TM) i7-13620H, 2.40 GHz
- **Installed RAM**: 32.0 GB (31.7 GB usable)
- **System type**: 64-bit operating system, x64-based processor

### Performance Metrics

The performance metrics considered in our analysis are:
- **Read and write time**: the time taken to read from and write to each data format, crucial for understanding efficiency in different scenarios.
- **File size**: the disk space required to store the data in each format. Smaller file sizes are generally preferable, especially for large data sets.
- **Memory usage**: the amount of memory consumed during the read operations, important for handling large data sets without running into memory constraints.

# Results and Analysis

The results of the benchmarking study on various data formats in `R` include read and write time, file size, and memory usage. The results are visualized in graphs and tables, which show the performance trends as the data set size increases.

## File Sizes

The first graph illustrates the file sizes for each data format across different data set sizes. Smaller file sizes are generally preferable as they require less disk space and can be more efficient for data transfer. The formats compared include RDS, CSV (using `data.table` and `readr`), FST, Feather, Parquet, and QS.

<div style="text-align:center;">
  <img src="p_file_sizes.png" onclick="openImageInNewWindow(this.src)">
</div>

From the graph, we can observe:
- QS consistently produces the smallest file sizes across all data set sizes.
- RDS and FST also perform well, producing relatively small file sizes.
- CSV formats (both `data.table` and `readr`) tend to produce the largest file sizes, particularly for larger data sets.
- Feather and Parquet offer a balance between file size and compatibility, but their sizes increase significantly with very large data sets.

### Recommendations

For small to medium-sized data sets where disk space and data transfer efficiency are critical, QS and RDS formats are recommended. For larger data sets, Feather and Parquet are preferable due to their balance of file size and compatibility, especially when interoperability with other tools is necessary.

## Write Performance

The second graph shows the write performance for each data format. Faster write times are beneficial for efficiently saving data, particularly in workflows involving frequent data saving operations.

<div style="text-align:center;">
  <img src="p_write_benchmark.png" onclick="openImageInNewWindow(this.src)">
</div>

Key observations from the graph include:
- `data.table` (`dt`) exhibits the fastest write times for smaller data sets, maintaining good performance even as data set size increases.
- Feather and FST follow closely with good write performance across various data set sizes.
- RDS is relatively fast for small data sets, but its performance degrades more than `dt`, QS, and FST with larger data sets.
- CSV formats, especially `readr`, show significantly slower write times, making them less suitable for small to medium-scale data operations. `readr` shows better performance as data size increases beyond 1e06 rows.
- Parquet provides moderate write performance, balancing speed and compatibility with other data analysis tools.

### Recommendations

For small to medium-sized data sets, `dt`, QS, Feather, and FST are recommended due to their fast write times. For larger data sets, Feather is preferable for its close performance to `dt`, while Parquet can also be considered for its balance of write speed and compatibility. `readr` should be avoided for large-scale data operations due to its slower write times, although it shows improved performance for data sets from sizes of 1e06 onward.

## Read Performance

The third graph displays the read performance for each data format. Fast read times are critical for efficient data analysis, especially when working with large data sets that need to be frequently loaded into memory.

<div style="text-align:center;">
  <img src="p_read_benchmark.png" onclick="openImageInNewWindow(this.src)">
</div>

Key observations from the graph include:
- For data sets ranging from 100 to 1,000 rows, QS performs the best, offering the fastest read times.
- For data sets larger than 1,000 rows, Feather outperforms all other formats, followed by Parquet, `dt`, and FST.
- RDS is only effective for very small data sets, with its performance significantly degrading for larger data sets.
- `readr` is the worst performer overall, exhibiting the slowest read times across all data set sizes.

### Recommendations

For small to medium-sized data sets (up to 10,000 rows), QS is recommended due to its superior read performance. For larger data sets, Feather is the preferred format for its fastest read times, followed by Parquet, `dt`, and FST. RDS should only be used for very small data sets, while `readr` should be avoided due to its consistently poor performance.

## Memory Usage

The final graph compares the memory usage of each data format during read operations. Efficient memory usage is important for handling large data sets without encountering memory constraints.

<div style="text-align:center;">
  <img src="p_memory_usage.png" onclick="openImageInNewWindow(this.src)">
</div>

Key points from the graph include:
- Feather and Parquet perform the best in terms of memory usage, consuming less than 50 MB for data sizes of 1e07.
- QS, FST and RDS exhibit relatively high memory usage, but lower than `dt` and `readr`.
- `dt`, and `readr` have higher memory usage, with `readr` being the highest among all formats.

# Final Considerations

When selecting a data format in `R`, it is crucial to consider the specific requirements of your analysis. The following points summarize the key considerations for each format based on the benchmarking results:

1. **QS:** excellent overall performance with the smallest file sizes, fastest read times, and lowest memory usage for small to medium-sized data sets.
   - **Strengths:** small file sizes, fast read times, low memory usage.
   - **Best for:** small to medium-sized data operations and environments with limited resources.

2. **RDS:** performs well with moderate file sizes, fast read times, and low memory usage, making it a strong general-purpose format within `R`.
   - **Strengths:** moderate file sizes, fast read times, low memory usage.
   - **Best for:** small to medium-sized data sets, general-purpose use with a good balance of performance and compatibility within `R`.

3. **FST:** offers excellent read and write times and efficient memory usage, suitable for high-performance data operations, especially with small to moderately large data sets.
   - **Strengths:** fast read and write times, efficient memory usage.
   - **Best for:** high-performance data operations with small to moderately large data sets.

Best For:** high-performance data operations with small to moderately large data sets.

4. **Feather:** provides the fastest read speeds for large data sets, close write performance to `dt` for large data, and good memory efficiency.
   - **Strengths:** fastest read speeds for large data sets, excellent memory efficiency.
   - **Best for:** interoperability across different programming languages and tools, handling large data sets efficiently.

5. **Parquet:** balances performance and interoperability, with efficient memory usage for very large data sets.
   - **Strengths:** balance between performance and interoperability, excellent memory usage for large data sets.
   - **Best for:** compatibility with big data tools and frameworks, handling large data sets.

6. **CSV (data.table and readr):** offers wide compatibility with various tools and platforms, but suffers from larger file sizes, slower read and write times, and higher memory usage, making it less ideal for large-scale data sets.
   - **Strengths:** wide compatibility with various tools and platforms.
   - **Best for:** small data sets or scenarios where maximum compatibility is needed, despite slower performance and higher memory usage for large data sets.

These results provide a comprehensive comparison of different data formats in `R`, highlighting their respective strengths and weaknesses in terms of file size, read and write performance, and memory usage.

**Did you find this page helpful? Consider sharing it 🙌**

<style>
/* ====== Post-only layout + typography polish (Hugo Blox / Tailwind) ====== */
/* Place this at the very end of the post so it wins the cascade. */

/* 0) Widen the page shell Hugo Blox uses around articles */
.page-body > .mx-auto,
.page-body .max-w-screen-xl{
  max-width: 100vw !important;
  width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* 1) Remove the Tailwind max-w cap on the <main> inside <article> */
.page-body article > main{
  max-width: none !important;  /* beats .max-w-6xl */
  width: 100% !important;
}

/* 2) Control the actual reading width (fluid per breakpoint) */
.page-body article .prose{
  /* Base: a touch larger with comfy line height */
  font-size: clamp(1rem, 0.96rem + 0.25vw, 1.12rem);
  line-height: 1.75;
  text-align: left;
  margin-inline: auto;

  /* Reading width: scale up on big screens, but keep lines readable */
  max-width: 86ch !important; /* default desktop */
}
@media (min-width: 1024px){  /* lg */
  .page-body article .prose{ max-width: 96ch !important; }
}
@media (min-width: 1280px){  /* xl */
  .page-body article .prose{ max-width: 102ch !important; }
}
@media (min-width: 1536px){  /* 2xl / very wide */
  .page-body article .prose{ max-width: 108ch !important; }
}

/* 3) Phones/tablets: full width with side padding */
@media (max-width: 768px){
  .page-body article .prose{
    max-width: 100% !important;
    padding-inline: 1rem;
  }
}

/* 4) Give the article more room by slimming sidebars on wide screens */
@media (min-width: 1280px){
  .hb-sidebar-container, .hb-toc { width: 12rem !important; } /* was 16rem */
}
@media (max-width: 1279.98px){
  .hb-sidebar-container{ display:none !important; } /* hide sidebar under xl */
}

/* --------- Clean, professional type polish (scoped to post content) -------- */
.page-body article .prose p{
  margin: 0 0 1.15em;
  text-wrap: pretty;
  hyphens: auto;
}

.page-body article .prose h1{
  font-size: clamp(1.9rem, 1.6rem + 1.2vw, 2.3rem);
  margin: 1.2em 0 .5em;
  padding-bottom: .25em;
  border-bottom: 2px solid #e5e7eb;
}
.page-body article .prose h2{
  font-size: clamp(1.4rem, 1.2rem + 0.6vw, 1.7rem);
  margin: 1.35em 0 .4em;
  padding-bottom: .2em;
  border-bottom: 1px solid #e5e7eb;
}
.page-body article .prose h3{
  font-size: clamp(1.15rem, 1.05rem + 0.35vw, 1.35rem);
  margin: 1.1em 0 .3em;
}

/* Links: subtle underline-on-hover */
.page-body article .prose a{
  color: #2f6ab5;
  text-decoration: none;
  border-bottom: 1px solid rgba(47,106,181,.25);
}
.page-body article .prose a:hover{
  color: #1f4f8f;
  border-bottom-color: currentColor;
}

/* Code blocks & inline code */
.page-body article .prose pre{
  background: #f6f8fa;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 14px;
  overflow: auto;
}
.page-body article .prose code{
  background: #f6f8fa;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  padding: .15em .35em;
  font-size: .95em;
}
.page-body article .prose pre code{
  background: none; border: 0; padding: 0; font-size: 0.95em;
}

/* Tables */
.page-body article .prose table{
  width: 100%;
  border-collapse: collapse;
  margin: 1.2rem 0;
  font-variant-numeric: tabular-nums;
}
.page-body article .prose th,
.page-body article .prose td{
  border: 1px solid #e5e7eb;
  padding: .6rem .75rem;
}
.page-body article .prose thead th{
  background: #2f6ab5;
  color: #fff;
  text-align: left;
}

/* Images & figures */
.page-body article .prose img{ border-radius: 6px; }

/* Optional: allow “full-bleed” wide elements
   Add class="wide" to a block (table/pre/img wrapper) to span the viewport. */
.page-body article .prose .wide{
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding-inline: clamp(12px, 4vw, 36px);
}

/* Footer timestamp spacing */
.page-body article time{ margin-top: 2rem; display: block; }

/* Dark mode tweaks */
html.dark .page-body article .prose pre,
html.dark .page-body article .prose code{
  background: #111826;
  border-color: #253041;
}
html.dark .page-body article .prose thead th{ background: #5aa0ff; }
</style>
