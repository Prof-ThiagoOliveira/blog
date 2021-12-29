---
title: Global Short-Term Forecasting of Covid-19 Cases

event: Seminar
event_url: ""

location: University of São Paulo
address:
  street: ""
  city: Piracicaba
  region: São Paulo
  postcode: ""
  country: Brazil

summary: Accurate short-term forecasting is thus vital to support country-level policy making during COVID-19 outbreak

# Talk start and end times.
#   End time can optionally be hidden by prefixing the line with `#`.
date: "2020-06-01T13:00:00Z"
date_end: "2020-06-01T15:00:00Z"
all_day: false

# Schedule page publish date (NOT talk date).
publishDate: "2020-05-30T00:00:00Z"

authors: 
- admin
- Rafael de Andrade Moral

tags:
- COVID-19
- Outbreak
- State-Space Model
- Longitudinal Data

# Is this a featured talk? (true/false)
featured: false

image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/bzdhc5b3Bxs)'
  focal_point: Right

links:
- icon: twitter
  icon_pack: fab
  name: Follow
  url: https://twitter.com/georgecushen
url_code: https://github.com/Prof-ThiagoOliveira/covid_forecast
url_pdf: https://arxiv.org/pdf/2006.00111.pdf
url_slides: https://raw.githubusercontent.com/Prof-ThiagoOliveira/Poster-and-Seminars/master/Seminars/2020/covid-19Seminar2020.pdf
url_video: https://www.youtube.com/watch?v=M6H1Zcw9PRI

# Markdown Slides (optional).
#   Associate this talk with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides = "example-slides"` references `content/slides/example-slides.md`.
#   Otherwise, set `slides = ""`.
slides: example

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects:
- internal-project
---


**Abstract:** 

<p align="justify">The continuously growing number of COVID-19 cases pressures healthcare services worldwide. Accurate short-term forecasting is thus vital to support country-level policy making. The strategies adopted by countries to combat the pandemic vary, generating different uncertainty levels about the actual number of cases. Accounting for the hierarchical structure of the data and accommodating extra-variability is therefore fundamental. We introduce a new modelling framework to describe the course of the pandemic with great accuracy, and provide short-term daily forecasts for every country in the world. We show that our model generates highly accurate forecasts up to six days ahead, and use estimated model components to cluster countries based on recent events. We introduce statistical novelty in terms of modelling the autoregressive parameter as a function of time, increasing predictive power and flexibility to adapt to each country. Our model can also be used to forecast the number of deaths, study the effects of covariates (such as lockdown policies), and generate forecasts for smaller regions within countries. Consequently, it has strong implications for global planning and decision making. We constantly update forecasts and make all results freely available to any country in the world through an online Shiny dashboard.</p>
