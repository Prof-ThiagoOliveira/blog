---
title: Modelling menstrual cycle length using state space models

event: Inaugural Young-ISA Meeting
event_url: https://young-istat.github.io/news/

location: Glenroyal Hotel & Leisure Club
address:
  street: Straffan Rd
  city: Maynooth
  region: Co. Kildare
  postcode: 'W23 C2C9'
  country: Ireland

summary: <p align="justify">Times are changing. At an elite level, female athletes and coaches across the globe are now starting to work with the menstrual cycle to gain a performance edge. By tracking the menstrual cycle, and knowing how, why and when hormone fluctuations affect female physiology, an athlete's training, nutrition and recovery can be tailored to their cycle to sustain peak performance</p>

# Talk start and end times.
#   End time can optionally be hidden by prefixing the line with `#`.
date: "2019-10-04T09:00:00Z"
date_end: "2019-10-04T17:00:00Z"
all_day: false

# Schedule page publish date (NOT talk date).
publishDate: "2017-01-01T00:00:00Z"

authors: 
- admin
- John Newell

tags:
- Bayesian Approach
- State Space Models
- Cycle Length
- Performance
- Autoregressive Models

# Is this a featured talk? (true/false)
featured: false

image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/bzdhc5b3Bxs)'
  focal_point: Right

links:
- icon: twitter
  icon_pack: fab
  name: Follow
  url: https://young-istat.github.io/news/
url_code: ""
url_pdf: ""
url_slides: ""
url_video: ""

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
- sport-project
---

**Abstract**:

<p align="justify">
The ability to predict menstrual cycle length to a high degree of precision enables female athletes to track their period and tailortheir training and nutrition correspondingly knowing when to push harder when to prioritise recovery and how to minimise theimpact of menstrual symptoms on performance. Such individualisation is possible if cycle length can be predicted to a highdegree of accuracy. To achieve this, a hybrid predictive model was built using data on 16,990 cycles collected from a sampleof 2,178 women (mean age 33.89 years, range 14.98 - 47.10, number of menstrual cycles ranging from 4 - 53). To capture thewithin-subject temporal correlation, a mixed-effect state-space model was fitted incorporating a Bayesian approach for processforecasting to predict the duration (in days) of the next menstrual cycle. The modelling procedure was split into three steps(i)a time trend component using a random walk with an overdispersion parameter, (ii) an autocorrelation component using anautoregressive moving-average (ARMA) model, and (iii) a linear predictor to account for covariates (e.g. injury, stomach cramps,training intensity). The inclusion of an overdispersion parameter suggested that26.81% [24.14%,29.58%]of cycles in the samplewere overdispersed where the random walk standard deviation under a non-overdispersed cycle is1.0530 [1.0060,1.0526]days whileunder an overdispersed cycle it increased to4.7386 [4.5379,4.9492]days. To assess the performance and prediction accuracy ofthe model, each woman’s last observation was used as test data. The Root Mean Square Error (RMSE), Concordance CorrelationCoefficient (CCC) and Pearson correlation coefficient (r) between the observed and predicted values were calculated. The modelhad an RMSE of 1.6126 days, a precision of 0.7501 and overall accuracy of 0.9855. In the absence of hormonal measurements,knowing how aspects of physiology and psychology are changing across the menstrual cycle has the potential to help femaleathletes personalise their training, nutrition and recovery tailored to their cycle to sustain peak performance at the highest leveland gain a competitive edge. In conclusion, the hybrid model presented here is a useful approach for predicting menstrual cyclelength which in turn can be used to support female athlete wellness to optimise performance
</p>