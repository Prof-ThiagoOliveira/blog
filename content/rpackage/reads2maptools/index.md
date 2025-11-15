---
title: "Reads2Map Tools"
date: "2023-08-01"
publishDate: "2023-08-01T00:00:00Z"
summary: "Utilities that power Reads2Map workflows: genotype calling pipelines, PedigreeSim interfaces, and VCF/onemap conversions."
tags:
  - R Package
  - Genotyping-by-Sequencing
  - Linkage Maps
  - Workflows
links:
  - icon: brands/github
    icon_pack: fab
    name: GitHub
    url: https://github.com/Cristianetaniguti/Reads2MapTools
  - icon: link
    name: Documentation
    url: https://github.com/Cristianetaniguti/Reads2MapTools#readme
---

Reads2Map Tools bundles the R utilities behind the Reads2Map workflows described in Taniguti et al. (2023, GigaScience 12). It automates genotype calling, population simulation, and file conversions so users can build end-to-end pipelines for linkage-map construction.

### What it does

- Uses VCF inputs to run `updog`, `polyRAD`, and `SuperMASSA`, and converts their outputs to `onemap` objects or VCF files.
- Simulates mapping populations via PedigreeSim and exports compatible objects for downstream analysis.
- Draws sample haplotypes from phased VCFs, easing reproducible marker validation.
- Ships inside the `cristaniguti/reads2map` Docker image so the full workflow is container-ready.

### Package details

- Version 0.3.4 (development); install via `devtools::install_github("Cristianetaniguti/Reads2MapTools")`.
- Depends on R ≥ 4.0 and imports doParallel, matrixStats, updog, polyRAD, dplyr, ggplot2, ggpubr, lubridate, onemap, stringr, tidyr, vcfR, gtools.
- Maintainer: Cristiane Taniguti <chtaniguti@usp.br>; contributors include colleagues from the GigaScience Reads2Map paper.
- License: GPL-3.

The package underpins the Reads2Map workflows and accompanying Docker images, enabling reproducible GBS analyses for linkage-map projects.
