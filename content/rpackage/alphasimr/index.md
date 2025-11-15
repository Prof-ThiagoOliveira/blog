---
title: "AlphaSimR"
date: "2025-11-08"
publishDate: "2024-11-08T00:00:00Z"
summary: "Stochastic breeding-program simulations with DNA-level detail."
tags:
  - R Package
  - Breeding Simulation
  - Quantitative Genetics
  - Genomic Selection
links:
  - icon: brands/github
    icon_pack: fab
    name: GitHub
    url: https://github.com/gaynorr/AlphaSimR
  - icon: academicons/r-project
    icon_pack: ai
    name: CRAN
    url: https://CRAN.R-project.org/package=AlphaSimR
  - icon: link
    name: Docs & course
    url: https://gaynorr.github.io/AlphaSimR/
---

AlphaSimR is the successor to AlphaSim and provides a comprehensive framework for stochastic simulations of plant and animal breeding programmes, down to DNA sequence for every individual (Faux et al. 2016). Users construct complex breeding workflows in R—selection, crossing, genomic selection pipelines, germplasm introductions—and evaluate their behaviour across generations.

### Why it is useful

- **Full breeding-program loop** – Functions exist for each step (selection, mating, propagation, phenotyping, genotyping) so researchers can stitch together realistic, multi-cohort breeding systems via scripts instead of GUI clicks.
- **Genomic and phenotypic realism** – Includes the Markovian Coalescent Simulator (MaCS; Chen et al. 2009) for fast biallelic sequence generation under demographic histories, enabling DNA-level inheritance and LD patterns.
- **Design research** – By simulating scenarios rapidly, teams can test breeding strategies (e.g., genomic selection) before deploying them in the field or nucleus herds.

### Package details

- Version: 2.1.0 (published 2025-11-08)
- Depends on R >= 4.0.0 and imports Rcpp, Rdpack, methods, R6; links to Rcpp, RcppArmadillo, BH.
- Suggests: knitr, rmarkdown, testthat.
- DOI: 10.32614/CRAN.package.AlphaSimR
- License: MIT + file LICENSE
- Maintainer: Chris Gaynor <gaynor.robert@hotmail.com>
- Contributors include Gregor Gorjanc, John Hickey, Daniel Money, David Wilson, Thiago Oliveira, Audrey Martin, Philip Greenspoon, Ros Craddock, Jana Obsteter, among others.

Documentation, reference manuals, vignettes, binaries, and reverse dependency information are available on CRAN. The project also powers an edX course on breeding programme modelling.
