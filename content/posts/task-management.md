+++
title = "Task Management"
date = 2023-11-24
draft = false
drop_cap = true
+++

Without a reliable system for tracking tasks, overlooking responsibilities becomes far too easy, leading to stress as one has to grapple with the challenge of recovering forgotten duties. By adding to cognitive load, this unnecessary tension decreases focus, even impeding the completion of those tasks that are remembered. Thus, having a task management is important, especially for those balancing diverse commitments. As different people hold different thresholds for how much effort they are willing to allocate for task management, it is important for one to individually tailor their system. In this article, I detail my personal task management syste alongside its implementation. Its design is very much centered around my unique preferences, but may serve as inspiration for others looking to adopt a system for themselves.


## Design Choices {#design-choices}

The system is a modified version of David Allen's Getting Things Done (GTD) methodology. I chose GTD as the foundation because it is sensible and almost complete in the sense that it describes how to manage:

-   Spontaneous thoughts that need to be captured for later processing.
-   One-off tasks that aren't part of a larger goal.
-   Projects with several steps.
-   Work that has been delegated to others.
-   Commitments that must be done at specific times.
-   Non-imminent actions that still need to be considered at a future date.

While I do recommend GTD, I don't recommend Allen's book advertising the system. The book is 267 pages filled with business jargon that overcomplicates the subject matter. After an estimated 75 pages, I found myself exhausted by the book's redundancy and decided to instead read a [fifteen minute summary](https://web.archive.org/web/20230917211801/https://hamberg.no/gtd/) which I personally felt was more useful than the book itself. I highly recommend referring to this summary rather than the book when learning about GTD.

The system's implementation is almost entirely centered around Emacs. Emacs is chosen as the workhorse due to its incredible capacity for customization via Emacs Lisp alongside the simplicity of Org mode, making it far too attractive to consider alternatives.


## The System {#the-system}

Within my task management system, I maintain a set of distinct lists where each list groups together tasks that share similar properties. My set of lists are:

-   An inbox list.
-   A next actions list.
-   A projects list.
-   A delegated list.
-   A calendar list.
-   A reminders list.
-   A potential list.

As tasks arise, I first record them in my inbox list. At random---yet frequent---intervals, I process the inbox, which involves further detailing what the task entails then transferring tasks to a more appropriate list depending on the type of task (e.g. whether the task must be done at a specific date or instead at my earliest convenience). As tasks are completed, they are removed from their respective list. A weekly review is set in place to ensure I have an appropriate set of tasks for the upcoming week.


### Inbox List {#inbox-list}

The inbox list serves as a catch-all list, temporarily holding ideas as they arise. Anytime I think of a potential task or idea to pursue, I immediately note it in the inbox list. It does not matter how menial or far-fetched a task appears---if there's a non-zero probability of me completing it at a later time, it should be included. Consequently, the barrier to access the inbox list must be low, meaning that tasks written in the inbox list are typically terse and unfinished.

It is important to note that the inbox list is a temporary placeholder. While processing the list, if a task takes less than two minutes to complete, I will complete the task right then; otherwise, I will decide which one of the other lists mentioned below is more appropriate for this task, then move the task to that list. When a task is moved out of the inbox list, I ensure that I fully detail what the task entails, writing the task as a _physical_ action. For example, a task in the inbox list may begin as "publish blog post," but once processed becomes "push commits for krishxmatta.dev to GitHub."


### Next Actions List {#next-actions-list}

The next actions list contains all tasks that should be completed at my earliest convenience, but don't need to be completed _on_ a certain date. Note here the difference between having a task that needs to be completed _at_ a certain time as opposed to a task that needs to be completed _by_ a certain time---the former can only be done at the specified time, but the latter can be done at any point before its deadline. Tasks that must be completed before a certain time are included on the next actions list alongside their deadline. As we shall see later, tasks that must be completed at a certain time will be placed in the calendar list.


### Projects List {#projects-list}

Oftentimes I have objectives that require more than one task to complete, and are thus inappropriate for the next actions list. The projects list is a place to collect all such goals. It is simply a list of all these project titles, not including the actual tasks required to complete them. The tasks belonging to a project are placed in the next actions list with a tag to identify which project it belongs to.

At a minimum, each project in the projects list should contain a title alongside a unique identifier. The identifier is what's used to tag tasks in the next actions list that belong to this project. Each project may optionally include a description of intended outcomes.


### Delegated List {#delegated-list}

The delegated list contains all tasks that I have delegated to someone else and am waiting to hear back on. Tasks here should include the date they were handed over to the other person. The purpose of this list is to ensure that I remember to follow up on these commitments.


### Calendar List {#calendar-list}

The calendar list is a list of all tasks that _must_ be completed at a certain time. Each task here should include the time it needs to be completed. Thus, this list allows me to easily see what's urgent for a certain date.


### Reminders List {#reminders-list}

The reminders list is a list of all tasks that don't need to be completed at a certain time, but for those that I do need to be reminded of (for example, go to the gym).


### Potential List {#potential-list}

The potential list is reserved for tasks that I don't see myself completing anytime soon, but do want to keep track of as I may potentially work on them in the future.


### Weekly Review {#weekly-review}

Every week I dedicate approximately thirty minutes to conduct a weekly review for my system. In this weekly review, I do the following:

-   Ensure that every project has at least one task on the next actions list.
-   Ensure that every task on my next actions list is something I want or need to do in the coming week---if not, move it to the potential list.
-   Review the potential list and see if there's anything worth moving to the next actions list.


## Implementation {#implementation}

My entire task management system is implemented via Emacs Org mode and the Notes app on my iPhone. On my laptop, everything task management related is stored in `~/org/todo` with a file for each list:

-   `inbox.org`: The inbox list
-   `next.org`: The next actions list
-   `projects.org`: The projects list
-   `delegated.org`: The delegated list
-   `calendar.org`: The calendar list
-   `reminders.org`: The reminders list
-   `potential.org`: The potential list


### Inbox List {#inbox-list}

As the inbox list must have a low barrier to access, I maintain two inbox lists, one on my iPhone in the Notes app and one on my laptop in `~/org/todo/inbox.org`. Which one I use depends on my circumstances when a task manifests---if I am using my laptop, I prefer the list on my laptop, otherwise I use the list on my iPhone for ease of access. When processing the inbox list, I move everything from my iPhone to my laptop.

When capturing ideas on my laptop, I utilize the Emacs command `org-capture` which allows me to easily dump thoughts in the inbox list regardless of what my buffer contains. To configure this command for my inbox list, I modify the `org-capture-templates` variable:

```nil
(setq org-capture-templates
  '(("t" "Inbox" entry (file+headline "~/org/todo/inbox.org" "Inbox") "* TODO %i%?")))
```

After invoking `org-capture`, I can then press `t` to add a task to my inbox list. Tasks are stored as a `TODO` entry. For example, my inbox list may look like:

```org
* Inbox
** TODO Write task management article
** TODO Write note-taking article
```

When processing the inbox list, I utilize the `org-refile` command to easily move tasks from the inbox list to any one of the other lists. To configure `org-refile` to allow me to move items to other lists, I need to set the `org-refile-targets` command to include all list files. But I want to only be able to refile into a list file if my buffer is currently viewing a list file. Thus, I've written a function which dynamically updates the `org-refile-targets` variable depending on if my buffer is currently viewing a list file.

First I define a variable `krishxmatta/org-refile-targets-original` which preserves the original value of `org-refile-targets` on startup:

```nil
(defvar krishxmatta/org-refile-targets-original
  (if (boundp 'org-refile-targets)
    org-refile-targets
    nil))
```

I then write a function which, when invoked, checks if the current buffer is viewing a file in the `~/org/todo/` directory (i.e. a list file). If so, it sets `org-refile-targets` to include all list files mentioned above. If not, it sets `org-refile-targets` to its original value on startup:

```nil
(defun krishxmatta/set-refile-target-todo ()
  (if (and buffer-file-name
    (string-prefix-p (expand-file-name "~/org/todo/") buffer-file-name))
    (setq org-refile-targets
      '(("~/org/todo/next.org" :level . 1)
        ("~/org/todo/projects.org" :level . 1)
        ("~/org/todo/delegated.org" :level . 1)
        ("~/org/todo/reminders.org" :level . 1)
        ("~/org/todo/calendar.org" :level . 1)
       ("~/org/todo/potential.org" :level . 1)))
    (setq org-refile-targets krishxmatta/org-refile-targets-original)))
```

Finally, I add this function to `post-command-hook` so that it's called everytime I run `org-refile`:

```nil
(add-hook 'post-command-hook 'krishxmatta/set-refile-target-todo)
```

Now when I run `org-refile`, if and only if I am currently viewing a list file, Emacs will prompt me for which list I want to move the current task to.


### Next Actions List {#next-actions-list}

If a task in the next actions list belongs to a project, I tag the task's entry with the project's unique identifier using `org-set-tags-command`. Then if I'd like to view all tasks belonging to a project, say a project with identifier `coursework`, I can use `org-occur` and search for all entries with the `:coursework:` tag.

For tasks with deadlines, I utilize `org-deadline` to insert a deadline date for a given entry.


### Projects List {#projects-list}

Each ongoing project has a designated headline in the projects list file. To associate a project with its unique identifier, I also tag its headline with its identifier via `org-set-tags-command`. If I decide to have a description for that project, I'll write it below the headline. My projects file, for example, may look like:

```org
* Projects
** Coursework                                                    :coursework:
Everything related to my coursework such as assignments or review.
```


### Calendar and Reminders Lists {#calendar-and-reminders-lists}

Tasks in the calendar and reminders lists need to be scheduled at a certain time. Here I use `org-schedule` to associate each entry with a time. I can also easily accomodate for recurring tasks using the [repeated tasks](https://orgmode.org/manual/Repeated-tasks.html) functionality in timestamps.


### Agenda {#agenda}

It is often useful to see all tasks that are either scheduled or have a deadline on a certain day. For this purpose I use `org-agenda`. To let `org-agenda` know where to look for entries, I set the `org-agenda-files` variable to the `~/org/todo` directory:

```nil
(setq org-agenda-files '("~/org/todo"))
```


### Completing Tasks {#completing-tasks}

Whenever I complete a task, I then mark the task as `DONE` using `org-todo`. Over time this generates clutter in each list, as completed tasks stay in the file. To remedy this issue, I utilize `org-archive-subtree` during my weekly review to clean out tasks that are finished while not deleting data.


## Conclusion {#conclusion}

I strongly believe that some form of a task management system is an almost necessity for anyone with numerous responsibilities as it makes managing work significantly less stressful. While many different systems are available on the internet and in literature, I don't believe that there is a universal guide that'll work for everyone---in fact, I believe that everyone should customize their task management system to them. While I've utilized GTD as a foundation for my system, I've made some modifications that make it more suitable for me. Additionally, by leveraging Emacs's unlimited capacity for customization, I've been able to create a system that I find to be seamless. I hope that this article provides some ideas that contribute to others' systems.
