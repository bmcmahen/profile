---
template: post.jade
pageName: blogPost
header: images/trees.jpg
headerBlurred: images/trees-blurred.jpg
headerAbsolutePath: /blog/eugenics-archive/images/trees.jpg
title: Introducing the Eugenics Archive
shortDescription: Recently I've had the pleasure of working with the Living Archives on Eugenics team with the goal of creating a new, interactive, and engaging website.
---
For the past couple of years I've had the pleasure of working with the Living Archives on Eugenics team with the goal of creating a new, interactive, and engaging website to explore the history (and continued legacy) of eugenics in Western Canada, and [around the world](http://eugenicsarchive.ca/discover/world). In many ways, it's a seminal project due to the sheer, vast amount of content available. But I think it's important for other reasons, too.

Before starting this website, our team had a vision for what we wanted to create. We wanted a database that multiple people could contribute to, with its content fully cited, and of high quality. But we didn't necessarily want to tell people what happened. We wanted to provide small pieces of information, that could be explored in different contexts. We wanted users to create their own narratives -- to make their own [connections](http://eugenicsarchive.ca/discover/connections) between ideas, concepts, people and places. We wanted, above all, to engage users through interaction, animation, video and images. The result was the creation of 10 unique tools for exploring the database, which includes a timeline, a spinning globe, a network of ideas & concepts, among others. This exhibits what I've described as a "shallow design philosphy" -- in the sense that there is a lot of information on the website, that you can access very quickly, in many different contexts. This is not to say that the content isn't often rigorous and detailed, as the [encyc](http://eugenicsarchive.ca/discover/encyc) page clearly demonstrates -- it's to say that you, typically, can access content quickly, and easily.

It's an experiment. We still want to offer narrative experiences where they make sense -- and we are working on parts of this right now. Provide a blend of these two forms of accessing content, so that you don't feel entirely overwhelmed, but also liberated.

For me, personally, this project was a great opportunity to utilize and contribute to the open source community. The stack is fairly conventional -- express & node on the backend, with most of the page rendered clientside using modularized components. The entire website is available on [github](http://github.com/eugenicsarchivesca/know-eugenics). And we have produced multiple open source components that we utilize throughout the website.

Some of the challenges for a page like this -- that is highly interactive in nature -- is ensuring that everything is accessible. This has been a struggle, and continues to be. What do I mean by accessible? I mean not only should it be compatible with other browsers, and easy to use for people -- but also, and importantly for this project, it should be accessible for people with disabilities. We have, where possible, created screen-reader fallbacks to canvas and svg based visuals, and we have attempted to use meaningful html semantics and aria attributes where applicable.

- generally accessibility is not a priority for people, and this is more often the case when utilizing small libraries. In retrospect, one of the big advantages of using a library like Backbone for things like tooltips, menus, etc., is that they handle accessibility issues for you. This, in my opinion, is a big reason for using Backbone as a solution. There is nothing stopping us from creating small, individual components that are fully accessible -- but we need to make this a priority. It's not uncommon to see browser compatibility notes on a github readme, but how often do you see accessibility notes? This is something we should consider.
- when accessibility is concerned, native widgets are a huge benefit. my advice -- and i learned this a bit late -- is use native widgets whenever possible.
- use proper html semantics, and then "hack" it to look pretty. Take forms, for example -> use formsets and always use labels. If you don't want to visually use labels, add a 'sr-only' class to hide them.

- when I first started working on this site, it became apparent that we needed some way to upload and store images. I relied on a small startup at the time because their prices were low, and I wanted to avoid the complexity of dynamic image handling on my own. The problem -- the startup soon raised their prices. This is clearly one of the issues of relying on a service like this. The result, I ended up creating my own dynamic image handler -- uploading the images on s3, etc., which has worked okay -- but has added complexity, and has been a performance problem since launch.

- what is it?
- what does it mean / represent for me?
- embracing open source, and contributing to it
- what were some of the challenges?
  - accessibility
  - browser compatibility
  - performance (relying on external services)
- what parts, in particular, stand out?
