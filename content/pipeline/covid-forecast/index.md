---
title: "Global short-term COVID-19 forecasting"
date: "2021-04-01"
publishDate: "2021-04-01T00:00:00Z"
summary: "Scripts and Shiny app backing our short-term COVID-19 case forecasts."
tags:
  - Pipeline
  - COVID-19
  - Forecasting
  - Shiny
links:
  - icon: brands/github
    icon_pack: fab
    name: Repository
    url: https://github.com/Prof-ThiagoOliveira/covid_forecast
  - icon: link
    name: Dashboard
    url: https://www.hamilton.ie/covid19/apps/pred_app/
---

This pipeline reproduces the short-term COVID-19 case forecasts developed during the pandemic. It contains data-prep, modelling, evaluation scripts, and the Shiny dashboard used for communication.

### What’s inside

- Data ingestion/cleaning scripts pulling international case counts.
- Forecasting models (time-series/statistical) with reproducible notebooks.
- A Shiny dashboard (`pred_app`) for visualising forecasts worldwide.

### Reproducibility

We provide all code and data-processing steps so analysts can replicate or extend the forecasts. Contact:

- Thiago de Paula Oliveira <thiago.paula.oliveira@ed.ac.uk>
- Rafael de Andrade Moral <rafael.deandrademoral@mu.ie>

Run the scripts as outlined in the README and deploy the Shiny app for dissemination.
