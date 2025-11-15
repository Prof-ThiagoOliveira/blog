---
title: "AlphaPart"
date: "2022-11-15"
publishDate: "2022-11-15T00:00:00Z"
summary: "Partition genetic trends to quantify the sources of genetic gain in breeding programmes."
tags:
  - R Package
  - Breeding Analytics
  - Genetic Gain
  - Quantitative Genetics
links:
  - icon: brands/github
    icon_pack: fab
    name: GitHub
    url: https://github.com/AlphaPart/AlphaPart
  - icon: academicons/r-project
    icon_pack: ai
    name: CRAN
    url: https://CRAN.R-project.org/package=AlphaPart
---

AlphaPart implements the partitioning method of Garcia-Cortés et al. (2008) to decompose genetic trends by paths of information. By separating genetic gain into contributions (e.g., selection paths, parental sources), breeding programmes can see which cohorts, regions, or strategies actually drive progress.

### Key features

- Main function `AlphaPart()` handles pedigree/genomic breeding values and partitions them into user-defined paths.
- Helper functions for data prep, summaries, visualization, and exporting results.
- Supports additive and non-additive models; integrates with ggplot2 and tidyverse workflows.

### Package details

- Version: 0.9.8 (published 2022-11-15)
- Depends on R ≥ 3.5.0; imports directlabels, ggplot2, pedigree, Rcpp, methods, reshape, dplyr, magrittr, tibble.
- LinkingTo: Rcpp.
- Suggests: RColorBrewer, truncnorm, knitr, rmarkdown, testthat, covr, ggridges.
- DOI: 10.32614/CRAN.package.AlphaPart
- Authors: Gregor Gorjanc (aut/cre), Jana Obsteter (aut), Thiago de Paula Oliveira (aut).
- License: GPL-2 | GPL-3.

Reference manuals, vignettes (e.g., PartitioningVariance, AlphaPart), binaries, and archives are available on CRAN.
