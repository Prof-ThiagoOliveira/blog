# Source user-level .Rprofile first
if (file.exists("~/.Rprofile")) {
  base::sys.source("~/.Rprofile", envir = environment())
}

# Project-specific blogdown options
options(
  blogdown.serve_site.startup = FALSE,
  blogdown.knit.on_save = TRUE,   # set to FALSE if you don't want knit-on-save
  blogdown.method = "html"        # publish HTML (prevents .md from masking maths)
)

# Pin Hugo version for this project
options(blogdown.hugo.version = "0.128.2")

