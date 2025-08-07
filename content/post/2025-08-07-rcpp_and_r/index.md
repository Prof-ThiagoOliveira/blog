---
title: From prototype to production, choosing the right `R` and `C++` tool in Rcpp
author: Thiago de Paula Oliveira
date:  "August 07, 2025"
slug: compression-data-read-write-performance
categories:
  - R Programming
  - Data handling
tags:
  - C++
  - Rcpp
  - R
subtitle: ''
summary: 'what each tool solves, when to reach for it, and ready-to-paste code.'
authors: 
- admin
lastmod: "August 07, 2025"
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
h0, 
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

h0 {
  font-size: 2rem; /* New heading size for h0 */
  border-bottom: 3px solid #3b80d1;
  padding-bottom: 0.3em; /* Padding for visual separation */
  margin-top: 1em; 
}

h1 {
  font-size: 1.75rem; /* Adjusted size for larger heading */
  border-bottom: 2px solid #3b80d1;
  padding-bottom: 0.3em; /* Padding for visual separation */
  margin-top: 1em; 
}

h2 {
  font-size: 1.5rem; /* Adjusted size for second-level heading */
  color: #3b80d1;
  padding-bottom: 0.2em; /* Padding for visual separation */
}

h3 {
  font-size: 1.25rem; /* Adjusted size for third-level heading */
  color: #333;
}

h4 {
  font-size: 1.125rem; /* Adjusted size for fourth-level heading */
  color: #333;
}

h5 {
  font-size: 1rem; /* Adjusted size for fifth-level heading */
  color: #333;
}

h6 {
  font-size: 0.875rem; /* Adjusted size for sixth-level heading */
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
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 1.5em;
  cursor: pointer;
  transition: transform 0.5s;
}
</style>


<script>
  function openImageInNewWindow(imgSrc) {
    const newWindow = window.open();
    newWindow.document.write(`<img src="${imgSrc}" style="width:100%; height:auto;">`);
    newWindow.document.close();
  }
</script>


#  Prototype at light-speed with **inline**

`inline::cxxfunction()` compiles, links and returns an `R` function from a character string, ideal for quick sketches or teaching. 


``` r
library(inline)
library(Rcpp)
```

```
## 
## Attaching package: 'Rcpp'
```

```
## The following object is masked from 'package:inline':
## 
##     registerPlugin
```

``` r
src <- '
  // Declare two Rcpp numeric vectors, populated from the R arguments `a` and `b`
  Rcpp::NumericVector xa(a), xb(b);

  // Cache the lengths of those vectors in plain C++ ints for fast reuse
  int na = xa.size(), nb = xb.size();

  // Pre-allocate the output vector, with length (na + nb − 1) for a full 
  // discrete convolution
  Rcpp::NumericVector out(na + nb - 1);

  // Walk over every element of the first vector
  for (int i = 0; i < na; ++i)
    // Multiply the i-th element of `a` with every element of `b`
    for (int j = 0; j < nb; ++j)
        // Accumulate the product at the correct lag/index in the result
        out[i + j] += xa[i] * xb[j];

  // Return the filled result vector back to R
  return out;
'

conv <- cxxfunction(signature(a = "numeric", b = "numeric"),
                    body = src, plugin = "Rcpp")
conv(1:4, 2:5)
```

```
## [1]  2  7 16 30 34 31 20
```

``` r
#> [1]  2  7 16 30 34 31 20
```

Choose **inline** when:

* you need an answer *now* without creating extra files;
* you are benchmarking or exploring an API shape;
* you want to inject ad-hoc `#include` blocks or compiler flags.

## Level-up with plugins and **Rcpp attributes**

### 4.1 Plugins

Plugins bolt extra headers and libraries onto an `inline` or attributes build—no manual `-I`/`-L` juggling.
The built-in `RcppArmadillo` plugin lets you write BLAS-backed linear algebra on the fly:


``` r
library(RcppArmadillo)
src <- '
  // Armadillo + Rcpp headers are supplied automatically by the plugin
  using namespace Rcpp;

  /* ---- 1. Map the inputs -------------------------------------------------- */
  Rcpp::NumericVector  yr_(yr);            // wrap SEXP as NumericVector
  Rcpp::NumericMatrix  Xr_(Xr);            // wrap SEXP as NumericMatrix

  int n = Xr_.nrow();                      // rows  = #obs
  int k = Xr_.ncol();                      // cols  = #predictors

  // zero-copy Armadillo views
  arma::colvec y( yr_.begin(), yr_.size(), false );
  arma::mat    X( Xr_.begin(), n, k,       false );

  /* ---- 2. OLS -------------------------------------------------------------- */
  arma::colvec coef = arma::solve(X, y);
  arma::colvec res  = y - X * coef;
  double s2         = arma::dot(res, res) / (n - k);
  arma::colvec se   = arma::sqrt( s2 * arma::diagvec( arma::inv(X.t() * X) ) );

  /* ---- 3. Ship results back to R ------------------------------------------ */
  return List::create(_["coef"] = coef,
                      _["se"]   = se,
                      _["df"]   = n - k);
'

fastLm <- cxxfunction(signature(yr = "numeric", Xr = "numeric"),
                      body   = src,
                      plugin = "RcppArmadillo")

# Usage 
set.seed(123)

n <- 1000
k <- 3
X <- cbind(1, matrix(rnorm(n * k), n, k))  # 1st col = intercept
beta  <- c(5, 0.8, -1.2, 0.5)                 # true coefficients
y  <- X %*% beta + rnorm(n, sd = 2)           # synthetic data
res <- fastLm(y, X)
str(res)
```

```
## List of 3
##  $ coef: num [1:4, 1] 4.984 0.797 -1.216 0.603
##  $ se  : num [1:4, 1] 0.0628 0.0636 0.0625 0.0642
##  $ df  : int 996
```

``` r
fit <- lm(y ~ X[,2] + X[,3] + X[,4])  # lm() adds its own intercept

cbind(fastLm = res$coef,
      lm     = coef(fit))
```

```
##                                lm
## (Intercept)  4.9844816  4.9844816
## X[, 2]       0.7974000  0.7974000
## X[, 3]      -1.2162403 -1.2162403
## X[, 4]       0.6029614  0.6029614
```

``` r
microbenchmark::microbenchmark(
  fastLm = fastLm(y, X),
  lm     = { lm(y ~ X[,2] + X[,3] + X[,4]) },
  times  = 100
)
```

```
## Unit: microseconds
##    expr   min     lq    mean median     uq    max neval cld
##  fastLm  43.1  49.25  66.608  60.35  80.00  143.7   100  a 
##      lm 776.2 859.85 968.767 893.35 964.15 1743.6   100   b
```


### 4.2 Rcpp Attributes

* Attributes internalise *inline*’s magic behind `[[Rcpp::export]]`.
* `sourceCpp()` compiles a file; 
* `cppFunction()` compiles from a string; 
* `evalCpp()` runs an expression, all while caching builds transparently.


``` r
cpp_src <- paste(
  '#include <Rcpp.h>',
  'using namespace Rcpp;',
  '',
  '// [[Rcpp::export]]',
  'int fibonacci(int x) {',
  '  return (x < 2) ? x : fibonacci(x - 1) + fibonacci(x - 2);',
  '}',
  sep = "\n"
)
writeLines(cpp_src, "fibonacci.cpp")   # main copy
```


``` r
Rcpp::sourceCpp("fibonacci.cpp")
fibonacci(20)     #> 6765
```

```
## [1] 6765
```

Use attributes for almost everything once you move beyond exploratory work.


## Quick decision guide

| Task                                              | Reach for …                                                                           |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Package / production code                         | **Rcpp Attributes**                                                                   |
| One-off sketches, benchmarks, Stack Overflow post | **inline::cxxfunction()**                                                             |
| Extra C++ libraries (Armadillo, Eigen, GSL, …)    | **Plugins** (built-in or custom)                                                      |
| Low-level debugging with `gdb`                    | Manual `R CMD SHLIB` + helper flags                                                   |
| Propagate C++ exceptions cleanly                  | Ensure `BEGIN_RCPP/END_RCPP` are present (added automatically by inline / Attributes) |

---

## Take-aways

* **Match R’s compiler** or live with hard-to-trace crashes.
* **`.Call()` via Rcpp** is the modern native interface—type-safe and header-driven.
* **inline** and **Attributes** shrink the compile–link–load loop to a single line.
* **Plugins** keep code portable while tapping heavy C++ libraries.
* **BEGIN\_RCPP/END\_RCPP** keep your C++ errors readable from R.

Master these patterns and you can move fluidly between 🟦 R scripts and ⚙️ high-performance C++—without ever leaving R’s build system or worrying about ABI gremlins.


**Did you find this page helpful? Consider sharing it 🙌**
