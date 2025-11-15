---
title: "lcc"
date: "2023-11-25"
publishDate: "2023-11-25T00:00:00Z"
summary: "Longitudinal concordance, Pearson, and accuracy profiles via polynomial mixed-effects models."
tags:
  - R Package
  - Agreement Analysis
  - Longitudinal Data
  - Mixed Models
links:
  - icon: brands/github
    icon_pack: fab
    name: GitHub (dev)
    url: https://github.com/Prof-ThiagoOliveira/lcc
  - icon: academicons/r-project
    icon_pack: ai
    name: CRAN archive
    url: https://CRAN.R-project.org/package=lcc
---

`lcc` estimates longitudinal concordance correlation (lcc), longitudinal Pearson correlation (lpc), and longitudinal accuracy (la) by fitting polynomial mixed-effects regression models. It implements the variance-components approach of Oliveira, Hinde & Zocchi (2018) and provides inference, confidence intervals (parametric and bootstrap), and graphical summaries for agreement profiles over time.

### Key features

- Handles balanced or unbalanced designs and allows covariates in the linear predictor.
- Models heteroscedastic within-group errors with or without time covariates.
- Generates fitted values, sampled values, and confidence bands numerically and graphically.

### Package details

- Version: 2.0.0 (CRAN; archived 2025-11-07 pending fixes; development continues on GitHub).
- Depends on R ≥ 3.2.3 plus nlme, ggplot2; imports hnp, parallel, doSNOW, doRNG, foreach.
- Suggests roxygen2, covr, testthat, MASS.
- Maintainer: Thiago de Paula Oliveira <thiago.paula.oliveira@alumni.usp.br>.
- Authors: Thiago de Paula Oliveira (aut/cre), Rafael de Andrade Moral, Silvio Sandoval Zocchi, Clarice Garcia Borges Demetrio, John Hinde.
- License: GPL (≥ 2).

Installation:

```r
install.packages("lcc")       # CRAN archive
# Development
install.packages("devtools")
devtools::install_github("Prof-ThiagoOliveira/lcc")
```

A companion Shiny app illustrates how parameters affect LCC over time, and tutorials are available via the PeerJ paper (10.7717/peerj.9850). Former CRAN binaries/sources remain in the archive while the next stable release is prepared.
