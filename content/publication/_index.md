---
title: Publications
subtitle: Peer-reviewed research in quantitative genetics, statistical computing, and sports analytics
summary: A curated collection of peer-reviewed articles, preprints, and software contributions spanning animal breeding, data methods, and performance science. Each publication includes links to code, data, and supplementary resources.
cms_exclude: true

# View.
view: citation

# Optional header image (relative to `static/media/` folder).
banner:
  caption: ''
  image: ''

# Add featured/filters block
design:
  spacing: '5rem'
sections:
  - block: markdown
    id: pub-stats
    content:
      title: Publication Overview
      text: |-
        <div class="pub-stats-row">
          <div class="pub-stat">
            <div class="value">18</div>
            <div class="label">Peer-reviewed publications</div>
          </div>
          <div class="pub-stat">
            <div class="value">50+</div>
            <div class="label">Co-authors</div>
          </div>
          <div class="pub-stat">
            <div class="value">3</div>
            <div class="label">Research domains</div>
          </div>
        </div>

  - block: markdown
    id: pub-tags
    content:
      title: Research Areas
      text: |-
        <div class="pub-tag-cloud">
          <a href="#" class="tag">Animal Breeding</a>
          <a href="#" class="tag">Quantitative Genetics</a>
          <a href="#" class="tag">Statistical Methods</a>
          <a href="#" class="tag">Sports Analytics</a>
          <a href="#" class="tag">Sustainability</a>
          <a href="#" class="tag">Performance Science</a>
          <a href="#" class="tag">R Programming</a>
          <a href="#" class="tag">Data Visualization</a>
        </div>

  - block: collection
    id: featured-pubs
    content:
      title: Featured Publications
      text: |-
        Highlights of peer-reviewed work with implementations, code, and datasets available.
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: citation
      columns: 1

  - block: collection
    id: all-pubs
    content:
      title: All Publications
      text: |-
        <p align="justify">
          Below is a comprehensive list of peer-reviewed publications, working papers, and software contributions across quantitative genetics, statistical methodology, and applied analytics. Search by keyword or filter by publication type using the interface below.
        </p>
      filters:
        folders:
          - publication
        featured_only: false
      page_type: publication
      count: 100
      sort_by: 'Date'
      sort_ascending: false
    design:
      view: citation
      columns: 1

  - block: markdown
    id: pub-footer
    content:
      title: Get in Touch
      text: |-
        **Interested in collaboration?** I'm open to projects in quantitative genetics, statistical methodology, and analytical workflows. [Contact me](mailto:toliveira@abacusbio.com) to discuss opportunities.
---
