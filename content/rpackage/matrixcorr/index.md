---
title: 'matrixCorr: Correlation & Agreement Toolkit'
date: '2024-11-01'
summary: 'An R package that collects correlation, shrinkage, and agreement estimators in one statistically sound toolbox.'
tags:
  - R Package
  - Statistical Methods
  - Correlation
  - Agreement Analysis
  - High-dimensional data
image:
  caption: matrixCorr package
  focal_point: Center
links:
  - icon: brands/github
    icon_pack: fab
    name: GitHub
    url: https://github.com/Prof-ThiagoOliveira/matrixCorr
  - icon: academicons/r-project
    icon_pack: ai
    name: CRAN
    url: https://CRAN.R-project.org/package=matrixCorr
---

Description: Compute correlation and other association matrices from small to high-dimensional datasets with relatively simple functions and sensible defaults. Includes shrinkage and robust estimators for noisy or **p ≥ n** situations, convenient print/plot methods, C++/BLAS/OpenMP backends with memory-aware symmetric updates, and support for base matrices/data frames via a consistent S3 interface. Fits naturally in statistics, machine-learning, and method-comparison workflows. Supports Pearson, Spearman, Kendall, distance, partial, biweight mid-correlation, Bland–Altman analyses, and Lin’s concordance correlation coefficient (including repeated-measures extensions). Methods follow Ledoit & Wolf (2004), Schäfer & Strimmer (2005), and Lin (1989).

`matrixCorr` packages the correlation and agreement estimators I rely on when exploring high-dimensional datasets or validating measurement methods. Everything shares one S3 interface, so I can move from Pearson/Spearman screening to Bland–Altman or concordance analyses without switching packages. The implementation leans on Rcpp, BLAS, and OpenMP, which keeps matrix updates fast even when the number of variables exceeds the number of samples.

### Why this package matters

- **Consistent API** – Pearson, Spearman, Kendall, distance, partial, and robust correlations all follow the same argument structure and return familiar matrix objects.
- **High-dimensional ready** – Shrinkage estimators (`schafer_corr()`), distance correlation, and memory-aware symmetric updates behave well when **p >> n**.
- **Agreement analytics included** – Bland–Altman (two-method, repeated-measures) and Lin’s concordance (pairwise, REML/LMM, U-statistic) live alongside correlation tools, which keeps method-comparison workflows tidy.
- **Well-tested implementation** – Rcpp + BLAS/OpenMP kernels plus CI for R-CMD-check and coverage provide the stability needed for production R scripts and dashboards.

### What’s new compared to typical correlation helpers

1. **Correlation + agreement in one place** – I can stay in the same package from exploratory covariance work through formal method-agreement reporting.
2. **Defaults tuned for messy data** – Heavy-tailed, noisy, or undersampled datasets get shrinkage and robust options without ad-hoc tweaks.
3. **Documented and reproducible** – The package is unit-tested, benchmarked, and documented so that anyone reading an analysis or pipeline can reproduce the association layer exactly.

Whenever I need a clean correlation/association layer without juggling multiple packages, `matrixCorr` is the first tool I reach for.
