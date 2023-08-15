+++
title = "Site"
draft = false
drop_cap = false
+++

This site serves as both an outlet for me to haphazardly share some of my thoughts and an exercise to improve my writing style. It has been carefully tailored to fit my vision.


## Technical Aspects {#technical-aspects}


### Hosting {#hosting}

This site is hosted on GitHub Pages, and consequently managed using git. Its repository is available [here](https://github.com/krishxmatta/krishxmatta.dev/).


### Workflow {#workflow}

[Hugo](https://gohugo.io/) is used as a static site generator to easily maintain fine-grained control over the site without having to directly manage its HTML. All content on the website originates as an Org file created in Emacs, as it is my preferred editor. All posts in their Org form are available in the [content-org](https://github.com/krishxmatta/krishxmatta.dev/tree/main/content-org) folder found in the site repository. The [ox-hugo](https://ox-hugo.scripter.co/) Emacs package is then used to convert Org files to Hugo-compatible Markdown. Once this Markdown is pushed to the main repository, a GitHub Action automatically deploys the site to [krishxmatta.dev](https://krishxmatta.dev).

I originally had hoped to use a Lisp-based static site generator such as [Haunt](https://dthompson.us/projects/haunt.html), but such tools proved to be cumbersome and impractical for use---hence, my current choice of Hugo. This selection is subject to change, however.


### Design {#design}

The site is designed to be minimal while maintaining some stylistic features to impart a distinctive touch. Ironically, many design choices are attributed to [Gwern](https://gwern.net/), but I hope to iteratively modify the style into my own. The appearance itself is managed with a [custom Hugo theme](https://github.com/krishxmatta/krishxmatta.dev/tree/main/themes/krishxmatta.dev).


## To-Do {#to-do}

Below is a list of everything I'd like to eventually add to the site.


### Features {#features}

-   RSS feed integration


### Appearance {#appearance}

-   Improved code blocks
-   Improved post listing on homepage
-   Pagination on homepage
-   Improved blockquotes


### Articles {#articles}

-   Write an article regarding notes workflow
