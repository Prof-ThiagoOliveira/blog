---
title: "AGHmatrix"
date: "2023-10-03"
publishDate: "2023-10-03T00:00:00Z"
summary: "Fast pedigree (A), genomic (G), and combined (H) relationship matrices for diploid and autopolyploid species."
tags:
  - R Package
  - Relationship Matrix
  - Genetics
  - Pedigree
  - Polyploidy
links:
  - icon: brands/github
    icon_pack: fab
    name: GitHub
    url: https://github.com/rramadeu/AGHmatrix
  - icon: academicons/r-project
    icon_pack: ai
    name: CRAN
    url: https://CRAN.R-project.org/package=AGHmatrix
---

AGHmatrix computes pedigree (A), genomic (G), and combined H relationship matrices for diploid and autopolyploid species. It implements additive and non-additive models, supporting generalized breeding-value estimation and genomic prediction pipelines.

### Key features

- A/G/H matrices with multiple methodologies, including autopolyploid adjustments.
- Efficient C++ backends via Rcpp/RcppArmadillo for large pedigrees.
- Works seamlessly with zoo/matrixStats for downstream analytics.

### Package details

- Version: 2.1.4 (CRAN) with dev version 3.0.0.
- Depends on R ≥ 3.6.0; imports Matrix, zoo (latest release), with dev version using Rcpp and matrixStats.
- DOI: 10.32614/CRAN.package.AGHmatrix
- Maintainer: Rodrigo Amadeu <rramadeu@gmail.com>
- Contributors include Luis Ferrao, Thiago Oliveira, Catherine Cellon, Leticia Lara, Marcio Resende, Ivone Oliveira, Patricio Munoz, Augusto Garcia, and more.
- License: GPL-3.

Documentation, reference manuals, tutorials, binaries, and reverse dependency information are available on CRAN.
