---
title: 'matrixCorr: Correlation, Agreement & Reliability Toolkit'
date: '2024-11-01'
lastmod: '2026-06-02'
summary: 'A matrix-oriented R toolkit for correlation, dependence, agreement, and reliability analysis, from ordinary wide data to high-dimensional and repeated-measures designs.'
tags:
  - R Package
  - Statistical Methods
  - Correlation
  - Agreement Analysis
  - Reliability Analysis
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

`matrixCorr` is an R package for analysing association, agreement, and reliability without switching between unrelated interfaces. It is designed around a practical distinction: correlation asks whether variables move together, agreement asks whether methods produce sufficiently similar values on the measurement scale, and reliability asks how much variation reflects stable differences among subjects rather than measurement error or method disagreement.

The package combines five workflow families. Wide-data functions accept a matrix or data frame with variables in columns and return square results indexed by the original column names. Repeated-measures functions use long-format data with explicit subject, method, and time identifiers where required. Most fitted objects support a familiar inspection pattern: `print()` for a compact preview, `summary()` for a richer digest, `plot()` for a graphical summary, and accessors such as `estimate()`, `confint()`, `ci()`, and `tidy()` where appropriate.

### Choose a workflow

| Scientific question or data structure | Start with | What it targets |
| --- | --- | --- |
| Approximately linear association among continuous variables | `pearson_corr()` | Pearson correlation on the original measurement scale |
| Monotone association or rank-based analysis | `spearman_rho()` or `kendall_tau()` | Rank correlation |
| Non-linear dependence that Pearson correlation may miss | `dcor()` or `hsic()` | General dependence rather than only linear association |
| Directed dependence | `xi_corr()` | Chatterjee's asymmetric rank correlation |
| Outlier-prone numeric data | `bicor()`, `pbcor()`, `wincor()`, or `skipped_corr()` | Robust alternatives to ordinary correlation |
| Conditional association after accounting for other variables | `pcorr()` | Partial correlation, including regularised estimators |
| High-dimensional data where **p >= n** | `shrinkage_corr()` or regularised `pcorr()` | Better-conditioned correlation or precision estimates |
| Binary, ordinal, or mixed-scale variables | `tetrachoric()`, `polychoric()`, `polyserial()`, or `biserial()` | Latent association under threshold models |
| Similarity between measurement methods | `ccc()` or `ba()` | Concordance, bias, and limits of agreement |
| Reliability across methods or raters | `icc()` | Pairwise or overall intraclass correlation |
| Nominal agreement between two raters | `cohen_kappa()` or `gwet_ac()` | Cohen's kappa or Gwet's AC1/AC2 |
| Ordered agreement between two raters | `weighted_kappa()` | Weighted kappa with unweighted, linear, quadratic, or custom weights |
| Nominal agreement across multiple raters | `multirater_kappa()` or `gwet_ac()` | Fleiss, Randolph, or panel AC1/AC2 agreement |
| Panel reliability with nominal, ordinal, interval, or ratio disagreement | `krippendorff_alpha()` | Krippendorff's alpha, including missing ratings |
| Reliability expressed as an agreement probability curve | `prob_agree()` | Probability of agreement for binomial reliability curves |
| Individual agreement with replicated readings | `cia()` | Coefficient of individual agreement relative to within-method disagreement |
| Within-subject association over repeated observations | `rmcorr()` | Repeated-measures correlation after subject-level offsets are removed |
| Repeated-measures agreement or reliability | `ba_rm()`, `ccc_rm_ustat()`, `ccc_rm_reml()`, `icc_rm_reml()`, or `cia_rm()` | Repeated bias, concordance, reliability, or individual agreement |
| Concordance for count data | `ccc_glmm()` | Poisson GLMM concordance, including total, inter-, and method-specific intra-CCC |

### Quick start

```r
library(matrixCorr)

set.seed(1)
X <- as.data.frame(matrix(rnorm(300 * 6), ncol = 6))
names(X) <- paste0("V", 1:6)

fit <- pearson_corr(X, ci = TRUE)

print(fit, digits = 2)
summary(fit)
plot(fit)
tidy(fit)
```

The same matrix-oriented pattern extends to rank correlation, distance correlation, robust estimators, shrinkage correlation, latent correlation, concordance, and ICC. For repeated-measures designs, the package keeps a shared long-format interface but changes the estimator to account for within-subject structure explicitly.

### Installation

```r
# CRAN release
install.packages("matrixCorr")

# Development version from GitHub
# install.packages("remotes")
remotes::install_github("Prof-ThiagoOliveira/matrixCorr")
```

### Important distinctions

The functions are intentionally related, but they are not interchangeable:

- `ccc()` summarises pairwise concordance by combining precision and accuracy, while `ba()` makes bias and limits of agreement visible on the original scale.
- `icc(scope = "pairwise")` asks how reliable each method pair is. `icc(scope = "overall")` asks how reliable the full set of methods is when analysed jointly.
- `icc(type = "consistency")` discounts additive method shifts, whereas `icc(type = "agreement")` penalises them.
- `rmcorr()` targets within-subject association. It is not an agreement coefficient.
- `ccc_rm_ustat()` is a non-parametric repeated-measures CCC route. `ccc_rm_reml()` is the model-based path when variance components and residual structure need to be handled explicitly.
- `icc_rm_reml()` uses the repeated-measures REML backend but targets reliability rather than CCC concordance.

### Implementation

Most computational functions expose `n_threads`, with package-wide defaults configurable through `options(matrixCorr.threads = ...)`. Performance-critical paths use optimized C++ backends with Rcpp, BLAS/OpenMP, and memory-aware symmetric updates. Optional Shiny viewers support interactive matrix inspection.

The [GitHub repository](https://github.com/Prof-ThiagoOliveira/matrixCorr) contains the README, issue tracker, and six workflow vignettes:

1. [Introduction to matrixCorr](https://github.com/Prof-ThiagoOliveira/matrixCorr/blob/main/vignettes/v01-matrixCorr-introduction.Rmd)
2. [Wide Correlation Workflows](https://github.com/Prof-ThiagoOliveira/matrixCorr/blob/main/vignettes/v02-wide-correlation-workflows.Rmd)
3. [Robust and High-Dimensional Correlation](https://github.com/Prof-ThiagoOliveira/matrixCorr/blob/main/vignettes/v03-robust-and-highdim-correlation.Rmd)
4. [Latent and Mixed-Scale Correlation](https://github.com/Prof-ThiagoOliveira/matrixCorr/blob/main/vignettes/v04-latent-and-mixed-scale-correlation.Rmd)
5. [Agreement and ICC for Wide Data](https://github.com/Prof-ThiagoOliveira/matrixCorr/blob/main/vignettes/v05-agreement-and-icc-wide.Rmd)
6. [Repeated-Measures Workflows](https://github.com/Prof-ThiagoOliveira/matrixCorr/blob/main/vignettes/v06-repeated-measures-workflows.Rmd)
