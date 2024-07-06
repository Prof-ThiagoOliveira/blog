---
title: Comparing data read and write performance in R
author: Thiago de Paula Oliveira
date: '2024-07-10'
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
lastmod: '2024-07-10T09:15:54Z'
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
/* Blog post container */
body {
   font-family: 'Helvetica Neue', Arial, sans-serif;
   font-size: 1rem;
   line-height: 1.8;
   color: #333;
   text-align: justify;
   background-color: #fafafa;
   margin: 0;
   padding: 0 20px;
}

/* Header styling */
h1, 
h2, 
h3, 
h4, 
h5, 
h6 {
  font-weight: 600; /* Semi-bold for a professional look */
  margin-bottom: 0.75em; /* Slightly reduced bottom margin */
  color: #0d0d0d;
  line-height: 1.2;
  margin-top: 1.5em; /* Added top margin for consistency */
}

h1 {
  font-size: 1.75rem; 
  border-bottom: 2px solid #3b80d1;
  padding-bottom: 0.3em; /* Padding for visual separation */
  margin-top: 1em; 
}

h2 {
  font-size: 1.5rem; 
  color: #3b80d1;
  padding-bottom: 0.2em; /* Padding for visual separation */
}

h3 {
  font-size: 1.25rem; 
  color: #333;
}

h4 {
  font-size: 1.125rem; 
  color: #333;
}

h5 {
  font-size: 1rem; 
  color: #333;
}

h6 {
  font-size: 0.875rem; 
  color: #333;
}

/* Link styling */
a {
  color: #3b80d0;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  text-decoration: underline;
  color: #1a57a0;
}

/* Code styling */
pre, 
.code-input {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 5px;
  margin: 20px 0;
  overflow-x: auto;
}

code {
  font-size: 0.9rem;
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
  text-align: left;
}

th, 
td {
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  background-color: #3b80d1;
  color: white;
}

/* Div options - color box text */
.div-1 {
  color: black;
  background-color: #d6edd3;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1.5em;
}

.div-2 {
  color: black;
  background-color: #cfbe7e;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1.5em;
}

/* Article content */
.article-content {
  text-align: justify;
}

/* Image styling */
img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 1.5em;
}
</style>

# Post Summary

<p align="justify">
Efficient data handling is crucial for daily data analysis tasks. In this post, we will compare the performance of various data formats in `R` for reading and writing operations. The formats considered include RDS, CSV (using `data.table` and `readr`), FST, Feather, Parquet, and QS. We will benchmark the speed, file sizes, and memory usage of each format across different data sizes.
</p>

# Database Definition

<p align="justify">
In this section, we will describe each of the data formats in detail, highlighting their strengths and weaknesses. We will provide insights into the specific use cases where each format excels. The choice of format will depend on the specific needs of the data analysis tasks.
</p>

## RDS

<p align="justify">
RDS is a format native to `R` that is highly efficient for saving single R objects. The `saveRDS()` and `readRDS()` functions are used to write and read `R` objects, respectively. RDS seamlessly integrates with `R`, retaining object metadata including data types and structures, which is beneficial for preserving the exact state of an `R` object. It provides fast read and write operations for moderate data sizes, making it suitable for storing intermediate results and final outputs in `R`. Additionally, it is easy to use with built-in `R` functions. However, it can result in larger file sizes compared to some compressed formats due to lack of advanced compression. Moreover, RDS has limited compatibility with other software or programming languages, limiting its use for data sharing outside of `R` environments.
</p>

## QS

<p align="justify">
QS (Quick Serialization of `R` objects) is a binary format for `R` objects that emphasizes speed and compression. It uses advanced compression algorithms to achieve high performance. QS provides extremely fast read and write operations, even for large data sets, making it suitable for high-performance computing tasks. It uses advanced compression techniques to reduce file size significantly without compromising on speed. Additionally, QS preserves `R` object metadata, ensuring that data types and structures are maintained. However, QS is mainly designed for use within `R`, with limited support in other programming environments. It also requires familiarity with additional functions and parameters to fully leverage its capabilities, which might be a barrier for new users. The goal of this package is to provide a lightning-fast and complete replacement for the `saveRDS` and `readRDS` functions in `R`.
</p>

## CSV (using `data.table` and `readr`)

<p align="justify">
CSV (Comma-Separated Values) is a plain text format widely used for data storage and transfer. `R` offers multiple ways to handle CSV files, with `data.table` and `readr` being popular for their speed and efficiency. The universality of CSV makes it readable across different software and programming languages. Its simple, plain text format can be easily inspected and edited manually, facilitating easy debugging and quick checks. Moreover, `data.table` and `readr` provide efficient functions for reading and writing CSV files in `R`, enhancing performance over base `R` functions. However, CSV does not retain data types and structure information, requiring manual handling and potential data type issues when reading back. It is generally slower for large data sets compared to binary formats due to the need to parse text. The text format also results in larger file sizes, especially for large data sets with many rows and columns.
</p>


## Columnar storage formats

<p align="justify">
Columnar storage is a method of storing data tables that improves the efficiency of reading and writing operations, especially for large data sets. Instead of storing data row by row, columnar storage organizes data by columns. This allows for more efficient data compression and faster retrieval of specific columns, which is particularly beneficial for analytical queries that often access a subset of columns from a large data set.
</p>


### FST

<p align="justify">
The `fst` package is a fast, binary data format for `R` data frames. It uses a highly efficient columnar storage format and supports multiple compression algorithms. FST offers extremely fast read and write operations, especially for large data sets, making it ideal for scenarios requiring frequent data access and manipulation. It efficiently compresses data, reducing file size significantly without sacrificing speed. The columnar storage format is optimized for columnar data access, enhancing speed for specific column retrieval and partial data loading. While FST is primarily designed for use within `R`, it is not limited to it. The `pyfst` library, for example, provides an interface to the `OpenFst` library, enabling similar fast storage and retrieval functionalities in Python. However, within `R`, FST can be slightly more complex to use compared to native formats due to additional options and parameters for compression and storage.
</p>

### Feather

<p align="justify">
Feather is a binary columnar data format that is part of the Apache Arrow project. It provides efficient storage for data frames and supports interchangeability between different languages. Feather supports interchangeability between `R`, Python, and other languages, making it a great choice for multi-language data workflows. It offers fast read and write speeds due to columnar storage, suitable for handling large data sets efficiently. It is also easy to use with the `arrow` package in `R`, allowing straightforward data exchange and manipulation. However, file sizes are generally larger than highly compressed formats like FST or Parquet, which might be a concern for very large data sets. Additionally, Feather is continually evolving, which might affect long-term stability and require frequent updates.
</p>

### Parquet

<p align="justify">
Parquet is a columnar storage file format optimized for large-scale data processing and is part of the Apache Hadoop ecosystem. Parquet is widely supported across different programming languages and big data tools, including `R`, Python, Spark, and more, facilitating seamless data exchange. It uses highly efficient data compression and encoding schemes to reduce file sizes significantly while maintaining performance. The columnar storage format is optimized for read performance on large data sets, especially when querying specific columns, making it ideal for big data applications. However, Parquet is more complex to handle due to advanced features and options for compression, encoding, and storage management.
</p>


# Data Simulation

<p align="justify">
To evaluate the performance of various data formats, we generated sample datasets of varying sizes using a custom data generation function. This function creates data frames with three columns: an `ID` column with sequential integers, a `Value` column with random normal values, and a `Group` column with randomly selected letters. The sizes of the datasets range from 100 to 10 million rows, allowing us to assess the performance across different scales. The random seed is set to $123$ to ensure reproducibility of the generated data.
</p>

```
# Function to generate sample datasets
generate_sample_data <- function(n) {
  set.seed(123)
  data.frame(
    ID = 1:n,
    Value = rnorm(n),
    Group = sample(letters, n, replace = TRUE)
  )
}

# Define dataset sizes
dataset_sizes <- c(1e2, 1e3, 1e4, 1e5, 1e6, 1e7)
```

## Benchmarking read and write performance

<p align="justify">
The benchmarking process involves measuring the time taken to read from and write to different data formats. We used the `microbenchmark` package in `R` to perform these measurements, ensuring that each operation is repeated 30 times to obtain reliable statistics.
</p>
<p align="justify">
For writing operations, we utilized the following functions:
<ul>
  <li>`saveRDS()` for RDS files</li>
  <li>`fwrite()` from the `data.table` package for CSV files</li>
  <li>`write_fst()` from the `fst` package for FST files</li>
  <li>`write_feather()` from the `arrow` package for Feather files</li>
  <li>`qsave()` from the `qs` package for QS files</li>
  <li>`write_csv()` from the `readr` package for CSV files</li>
  <li>`write_parquet()` from the `arrow` package for Parquet files</li>
</ul>
</p>
<p align="justify">
For reading operations, we used the following functions:
<ul>
  <li>`readRDS()` for RDS files</li>
  <li>`fread()` from the `data.table` package for CSV files</li>
  <li>`read_fst()` from the `fst` package for FST files</li>
  <li>`read_feather()` from the `arrow` package for Feather files</li>
  <li>`qread()` from the `qs` package for QS files</li>
  <li>`read_csv()` from the `readr` package for CSV files</li>
  <li>`read_parquet()` from the `arrow` package for Parquet files</li>
</ul>
</p>

## Performance metrics

<p align="justify">
The performance metrics considered in our analysis are:
<ul>
  <li> The time taken to read from and write to each data format. This metric is crucial for understanding the efficiency of each format in different scenarios.</li>
  <li>The disk space required to store the data in each format. Smaller file sizes are generally preferable, especially when dealing with large data sets.</li>
  <li>The amount of memory consumed during the read operations. Efficient memory usage is important for handling large data sets without running into memory constraints.</li>
</ul>
</p>

# Results and analysis

<p align="justify">
The results of benchmarking study on various data formats in `R` include read and write time, file size, and memory usage. The results are visualized in graphs and tables, which show the performance trends as the data set size increases.
</p>

## File sizes

<p align="justify">
The first graph illustrates the file sizes for each data format across different data set sizes. Smaller file sizes are generally preferable as they require less disk space and can be more efficient for data transfer. The formats compared include RDS, CSV (using `data.table` and `readr`), FST, Feather, Parquet, and QS.
</p>


<p align="justify">
From the graph, we can observe:
<ul>
  <li>QS consistently produces the smallest file sizes across all data set sizes.</li>
  <li>RDS and FST also perform well, producing relatively small file sizes.</li>
  <li>CSV formats (both `data.table` and `readr`) tend to produce the largest file sizes, particularly for larger data sets.</li>
  <li>Feather and Parquet offer a balance between file size and compatibility, but their sizes increase significantly with very large data sets.</li>
</ul>
</p>

## Write performance

<p align="justify">
The second graph shows the write performance for each data format. Faster write times are beneficial for efficiently saving data, particularly in workflows involving frequent data saving operations.
</p>



<p align="justify">
Key observations from the graph include:
<ul>
  <li>QS and FST exhibit the fastest write times for smaller datasets, maintaining good performance even as dataset size increases.</li>
  <li>RDS is also relatively fast, but its performance degrades more than QS and FST with larger datasets.</li>
  <li>CSV formats, especially `readr`, show significantly slower write times, making them less suitable for large-scale data operations.</li>
  <li>Feather and Parquet provide moderate write performance, balancing speed and compatibility with other data analysis tools.</li>
</ul>
</p>

## Read performance

<p align="justify">
The third graph displays the read performance for each data format. Fast read times are critical for efficient data analysis, especially when working with large datasets that need to be frequently loaded into memory.
</p>



<p align="justify">
From the graph, we note that:
<ul>
  <li>QS, FST, and RDS offer the fastest read times, making them ideal for scenarios where quick data loading is essential.</li>
  <li>CSV formats (both `data.table` and `readr`) have slower read times, particularly for larger datasets, which can hinder performance in large-scale analyses.</li>
  <li>Feather and Parquet provide moderate read speeds, suitable for interoperability across different tools and languages.</li>
</ul>
</p>

## Memory usage

<p align="justify">
The final graph compares the memory usage of each data format during read operations. Efficient memory usage is important for handling large datasets without encountering memory constraints.
</p>


<p align="justify">
Key points from the graph include:
<ul>
  <li>QS and RDS exhibit the lowest memory usage, making them suitable for environments with limited memory resources.</li>
  <li>FST and Feather also show good memory efficiency, particularly for smaller to moderate-sized datasets.</li>
  <li>CSV formats, especially `readr`, consume the most memory, which can be problematic for very large datasets.</li>
  <li>Parquet offers a balance between memory usage and interoperability, although its memory consumption increases with larger datasets.</li>
</ul>
</p>

<p align="justify">
Overall, these results provide a comprehensive comparison of different data formats in `R`, highlighting their respective strengths and weaknesses in terms of file size, read and write performance, and memory usage. This information can guide the selection of appropriate data formats based on specific analysis requirements.
</p>

**Did you find this page helpful? Consider sharing it 🙌**
