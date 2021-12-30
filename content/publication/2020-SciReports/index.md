---
title: "Modelling menstrual cycle length in athletes using state-space models"
authors:
- admin
- Georgie Bruinvels
- Charles Pedlar
- Brian Moore
- John Newell

date: "2020-12-10T00:00:00Z"
doi: "10.1038/s41598-021-95960-1"

# Schedule page publish date (NOT publication's date).
publishDate: "2020-12-10T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["2"]

# Publication name and optional abbreviated publication name.
publication: "*Nature Scientific Reports*"

abstract: <p align="justify"> The ability to predict an individual’s menstrual cycle length to a high degree of precision could help female athletes to track their period and tailor their training and nutrition correspondingly. Such individualisation is possible and necessary, given the known inter-individual variation in cycle length. To achieve this, a hybrid predictive model was built using data on 16,524 cycles collected from a sample of 2125 women (mean age 34.38 years, range 18.00–47.10, number of menstrual cycles ranging from 4 to 53). A mixed-effect state-space model was fitted to capture the within-subject temporal correlation, incorporating a Bayesian approach for process forecasting to predict the duration (in days) of the next menstrual cycle. The modelling procedure was split into three steps (1) a time trend component using a random walk with an overdispersion parameter, (2) an autocorrelation component using an autoregressive moving-average model, and (3) a linear predictor to account for covariates (e.g. injury, stomach cramps, training intensity). The inclusion of an overdispersion parameter suggested that 26.36% [23.68%,29.17%] of cycles in the sample were overdispersed. The random walk standard deviation for a non-overdispersed cycle is 27.41±1.05 [1.00, 1.09] days while under an overdispersed cycle, the menstrual cycle variance increase in 4.78 [4.57, 5.00] days. To assess the performance and prediction accuracy of the model, each woman’s last observation was used as test data. The root mean square error (RMSE), concordance correlation coefficient and Pearson correlation coefficient (r) between the observed and predicted values were calculated. The model had an RMSE of 1.6412 days, a precision of 0.7361 and overall accuracy of 0.9871. In conclusion, the hybrid model presented here is a helpful approach for predicting menstrual cycle length, which in turn can be used to support female athlete wellness. </p>

# Summary. An optional shortened abstract.
summary: Development of an appropriate parametric state-space formulation for the marginal distribution of standard menstrual cycles for female athletes

tags:
- Menstrual cycle
- Longitudinal data
- State-Space Models
- Athletes
- Statistical Modelling
- Hierarchical data

featured: TRUE

links:
 - name: "Journal Link"
   url: "https://www.nature.com/articles/s41598-021-95960-1"

url_pdf: 'https://www.nature.com/articles/s41598-021-95960-1'
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Image credit: **Thiago de Paula Oliveira**'
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
- sport-project
- predictive-models

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
#slides: 2018-lcc
---

