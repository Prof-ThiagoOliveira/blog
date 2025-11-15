---
title: "Developing best practices for genotyping-by-sequencing analysis in the construction of linkage maps"
authors:
- Cristiane Hayumi Taniguti
- Lucas Mitsuo Taniguti
- Rodrigo Rampazo Amadeu
- Jeekin Lau
- Gabriel de Siqueira Gesteira
- admin
- Getulio Caixeta Ferreira
- Guilherme da Silva Pereira
- David Byrne
- Marcelo Mollinari
- Oscar Riera-Lizarazu
- Antonio Augusto Franco Garcia

date: "2023-10-27T00:00:00Z"
doi: "10.1093/gigascience/giad092"

# Schedule page publish date (NOT publication's date).
publishDate: "2023-10-27T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["2"]

# Publication name and optional abbreviated publication name.
publication: "*GigaScience*"

abstract: <p align="justify">Genotyping-by-sequencing offers cost-effective, high-density marker data but also introduces PCR bias, sequencing errors, and contaminants that distort linkage maps. We benchmarked the Reads2Map workflows across simulated and empirical diploid outcrossing populations, pairing variant callers (GATK, Stacks, TASSEL, FreeBayes) with genotype callers (updog, polyRAD, SuperMASSA) and linkage-map tools (OneMap, GUSMap). We quantified when genotype-probability models, global error rates, or haplotype-based multiallelic markers best recover the expected genetic distances, and flagged scenarios where pipeline choices are dataset dependent. The resulting best-practice defaults, together with the Reads2MapApp visual diagnostics, reduce the trial-and-error burden when building reliable linkage maps from GBS data.</p>

# Summary. An optional shortened abstract.
summary: Benchmarked the Reads2Map workflows and set best-practice defaults so breeders can build reliable linkage maps from noisy GBS data.

tags:
- R Package
- Genetic
- Quantitative Genetic
- Reads2Map Tools
- Workflows

featured: true

links:
 - name: "Journal article"
   url: "https://academic.oup.com/gigascience/article/12/12/giad092/7330892"
 - name: "Package link"
   url: "https://github.com/Cristianetaniguti/Reads2MapTools"

url_pdf: ''
url_code: 'https://github.com/Cristianetaniguti/Reads2MapTools'
url_dataset: ''
url_poster: ''
url_project: 'https://github.com/Cristianetaniguti/Reads2MapTools'
url_slides: ''
url_source: ''
url_video: ''



# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
#image:
#  caption: 'Image credit: **Thiago de Paula Oliveira**'
#  focal_point: ""
#  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
- genetic-project

---
