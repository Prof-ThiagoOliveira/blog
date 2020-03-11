all: build

build:
	R -e "blogdown::build_site()"

serve:
	R -e "blogdown::serve_site()"

deploy: build
	git add .;git commit -m "Build site";git push origin master

# Label for commits
m="My comment"
# to create a new commit with a particular title:
# make new m="blah blah"
d-commit: build
	git add .;git commit -m "$m";git push origin master
