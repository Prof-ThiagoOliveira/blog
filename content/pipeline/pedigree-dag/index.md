---
title: "Pedigree-based mixed-effects models via DAGs"
date: "2024-06-01"
publishDate: "2024-06-01T00:00:00Z"
summary: "Scripts comparing JAGS vs NIMBLE implementations and parameterisations for mixed-effects animal models." 
tags:
  - Pipeline
  - MCMC
  - Animal Model
  - DAG
links:
  - icon: brands/github
    icon_pack: fab
    name: Repository
    url: https://github.com/Prof-ThiagoOliveira/pedigree-dag
---

This workflow evaluates directed acyclic graph (DAG) formulations for the animal model using both JAGS and NIMBLE. It benchmarks Gibbs/Metropolis samplers, transformed additive-genetic parameterisations, and Cholesky-based approaches to understand how sampler choice affects effective sample size and CPU time.

### Highlights

- Demonstrates how transformed additive genetic values can improve mixing compared to classical Gibbs updates, while documenting the cost of dense Cholesky decompositions of the NRM.
- Shows that NIMBLE consistently outperforms JAGS for complex animal models once custom samplers are defined.
- Provides complete R scripts to install specific package versions (e.g., MasterBayes 2.58) and OS-specific build tools (Rtools, Xcode, GNU Fortran).

### Required packages & environment

```r
pacman::p_load(
  tidyverse, version = "1.3.2",
  knitr, version = "1.42",
  runjags, version = "2.2.1-7",
  MCMCvis, version = "0.15.5",
  MCMCglmm, version = "2.34",
  gdata, version = "2.18.0.1",
  MasterBayes, version = "2.58",
  coda, version = "0.19-4",
  ggrepel, version = "0.9.2",
  dplyr, version = "1.0.10",
  kableExtra, version = "1.3.4",
  MatrixModels, version = "0.5-1",
  pedigreemm, version = "0.3-3",
  prettycode, version = "1.1.0",
  formattable, version = "0.2.1",
  AlphaSimR, version = "1.3.4",
  patchwork, version = "1.1.2",
  animalModels
)
```

Additional dependencies: JAGS (https://sourceforge.net/projects/mcmc-jags/), platform-specific compilers (Rtools on Windows, Xcode/GNU Fortran on macOS, gfortran on Linux). The scripts show how to install archived versions when needed via `remotes::install_version()`.

### Usage notes

1. Clone the repo and follow the README instructions to install OS-specific toolchains and package versions.
2. Run the provided R Markdown files to compare samplers (MasterBayes, NIMBLE, JAGS) and inspect effective sample size, trace plots, and runtime summaries.
3. The outputs guide the choice of parameterisation/sampler for future animal-model analyses, especially when quantifying additive-genetic variance in breeding pipelines.
