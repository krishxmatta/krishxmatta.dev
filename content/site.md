+++
title = "Site"
draft = false
drop_cap = false
+++

This site serves as an outlet for me to share my thoughts and as an exercise to improve my writing.


## Technical Aspects {#technical-aspects}


### Hosting {#hosting}

This site is hosted on GitHub Pages, and thus managed using git. Its repository is available [here](https://github.com/krishxmatta/krishxmatta.dev/).


### Workflow {#workflow}

[Hugo](https://gohugo.io/) is used as a static site generator to easily maintain fine-grained control over the site without having to directly manage its HTML. All content on the website originates as an Org file created in Emacs. All posts in their Org form are available in the [content-org](https://github.com/krishxmatta/krishxmatta.dev/tree/main/content-org) folder found in the site repository. The [ox-hugo](https://ox-hugo.scripter.co/) Emacs package is then used to convert Org files to Hugo-compatible Markdown. Once this Markdown is pushed to the main repository, a GitHub Action using Hugo automatically deploys the site to [krishxmatta.dev](https://krishxmatta.dev), converting the Markdown to HTML.

I had originally hoped to use a Lisp-based static site generator such as [Haunt](https://dthompson.us/projects/haunt.html), but such tools proved to be cumbersome---hence, my current choice of Hugo.


### Design {#design}

The site is designed to be minimal. Many choices are inspired by [Gwern](https://gwern.net/), but I am iteratively modifying the style into my own. The appearance itself is managed with a [custom Hugo theme](https://github.com/krishxmatta/krishxmatta.dev/tree/main/themes/krishxmatta.dev).


## Updates {#updates}

My thoughts and beliefs are constantly evolving as I continue to learn and encounter new ideas---consequently, this site is organic, meaning that it is subject to frequent change. As such, I'm not entirely in favor of ordering posts chronologically, but it's definitely the least confusing option from a user perspective. The combination of frequent updates alongside chronological order can certainly cause confusion when reading posts, so to help ameliorate this issue I have included a changelog for articles on the site below. For more detailed descriptions of each change made, please refer to the site repository's [commit history](https://github.com/krishxmatta/krishxmatta.dev/commits/main).


### Changelog {#changelog}

-   4/11/2024: Style overhaul in [Task Management](../posts/task-management/)
-   12/2/2023: Fixed incorrect code snippet in [Task Management](../posts/task-management/)
