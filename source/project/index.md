layout: others
title: One Recent Project...
navItem: nav-item-project
---

<!-- TOC depthFrom:2 insertAnchor:true -->

- [Introduction](#introduction)
- [Preliminary Development Phases](#preliminary-development-phases)
	- [Year 1](#year-1)
	- [Year 2](#year-2)
- [The HMT Project](#the-hmt-project)
	- [Technology](#technology)
	- [URLs and Deployment](#urls-and-deployment)
	- [Normal user workflow](#normal-user-workflow)

<!-- /TOC -->

<hr>
<h1 class="text-center"><small>Math Tournament <br class="d-sm-none">@ GSW<small></h1>

<a id="markdown-introduction" name="introduction"></a>
## Introduction

Every year, from 1974, the School of Computing and Mathematics at **Georgia Southwestern State University** (GSW) has hosted a tournament for high school students from throughout the State of Georgia. This tournament has brought hundreds of students to the campus in the early spring each year to compete with one another. The need to host hundreds of students at the same time while giving them opportunity to individually work on the same set of problems, and mainly important, to process their answers in quickest possible manner enforced us to run the tournament with the help of Scantron technology.

Before I joined the project the following workflow was used:
- Team sponsor (one per School) filled in registration form hosted on GSW website
- An email with registration data was sent to organizers and a copy was sent to team sponsor
- Organizers manyally processed all registrations and for each student prepared an individualized Scantron sheet
- On the day of the event any modifications requiring update of Scantron sheets were made by handwriting
- Scantron sheets with answers were scanned using old Scantron machine connected to an old Windows 98 driven computer (existing Scantron software was incompatible with modern operating systems)
- A standalone C++ program (developed by another faculty) was used to process text files with scan data to prepare reports
- Reports were printed and handed to Team sponsors
- No centralized repository of tournament results for previous years was maintained


<a id="markdown-preliminary-development-phases" name="preliminary-development-phases"></a>
## Preliminary Development Phases

<a id="markdown-year-1" name="year-1"></a>
### Year 1
I joined the project in 2015 and reworked the _registration form_ to support **front-end validation**. It was the time when I just started learning web technology so I implemented the task using [jQuery UI](https://jqueryui.com/). I ended up with constructing a landing page with modal dialog that was collecting form data and pushing it to PHP backend for processing. Our processing was as simple as it can be: (i) calculate the total cost; (ii) send out two customized  e-mails: one to team sponsor and one to organizers. 

<!-- Unfortunately, the only trace of that version's existence in [Web Archive](http://web.archive.org/web/20160730231809/https://hmt.gswcm.net/) shows the "Registration Closed" banner. -->

<a id="markdown-year-2" name="year-2"></a>
### Year 2

I was told that the old Windows 98 PC that we use to control Scantron machine is about to die. I proposed replacing it by a RasPi board that would mimic proprietary Scantron protocol. Since Scantron and PC were connected by means of RS-232 interface I decided to try to sniff on their exchange. We've purchased a [SerialGhost Pro](https://www.keelog.com/files/SerialGhostUsersGuide.pdf) dongle and grabbed a few sessions where PC was controlling Scantron to handle a number of typical scanning scenarios including 
- normal scan of a single sheet 
- normal scan of a batch of sheets
- interrupted scan due to improper form orientation
- interrupted scan due to a paper jam 

The exchange protocol happend to be entirely text based, so I identified the bootstraping protocol, negotiation of form parameters, and the main part allowing to scan one or more sheets and recover in case of problems. At that time I started learning Node.js and decided to try [SerialPort](https://www.npmjs.com/package/serialport) package to control serial port exchange of the RasPi board. I ended up with a JavaScript class implementing basic logic of the underlying finite state machine. That class was then integrated into a Node.js console application. 

The implementation worked as expected and my next move was to _build a web interface_ running off of RasPi, so we could control the Scantron in a bit more user friendlier manner. Since Node.js was already under the hood of the project, I added Express to serve static HTML5 bootstrap flavored frontend and used Socket.io to support asynchronous communication between the frontend (web UI) and the backend (Scantron controller class). After all programming improvements I packaged RasPi board into a touchscreen enabled case and that was a complete product... I thought it was. 

The last think to do was to replace the C++ program that was previously used to process scan data by a _web facing solution_, so I ended up with jQuery + Bootstrap HTML5 document, capable of _merging_ and _processing_ raw registration data along with scan data to generate persistent reports. 

Both RasPi scanner and report generator were tested during 2017 Math Tournament event and worked pretty well.  

<a id="markdown-the-hmt-project" name="the-hmt-project"></a>
## The HMT Project

After working with different parts of the Math Tournament registration portal it was a pretty obvious move to integrate them under umbrella of a single web application capable of addressing the following tasks

- Integrate the existing web form with a permanent storage solution (database) so the registration data should no longer be handled and processed by hands
- Implement an ability for **team sponsors** to re-visit and correct their registrations 
- Implement an ability for **tournament organizers** to retrieve any registration for the purposes of editing and marking as "paid"
- Automate the process of preparing Scantron sheets
- Integrate scanning, processing, and reporting activities so the scanned data could be automatically merged with registration data to generate various reports
- Implement archiving facility so the tournament results would be bound to particular year and could be retrived at will
- Implement automatic roll-over process so the application could be managed without direct manipulation with the program code (to setup dates, to clean up database, etc). 

<a id="markdown-technology" name="technology"></a>
### Technology

I started the HMT project in the beginning of Fall 2017, and at that time, I already had some experience with full stack development using Node.js + MongoDB on the backend, and jQuery + Bootstrap on the frontend. I decided to make one step further and started learning Vue.js frontend framework in parallel. The following list shows technological skeleton of the HMT Project:
- **MongoDB + Mongoose** to store user _registrations_, tournament _questions_, Scantron _scans_ with answers, previous years _archives_, and some auxiliary data like tokens, timestamps, etc.
- **Express** framework to handle API calls. The SPA nature of the app allowed offloading all page rendering to the frontend, so the only page rendered by Express was the **About** page (in support of SEO best practices).
- **Axios** on both front- and backend sides as an HTTP client.
- **Bcrypt** to hash and check passwords on the backend.
- **Nodemailer** for e-mail delivery.
- **Socket.io** for asynchronous communication with Scantron controller.
- **Vue.js** as the main frontend framework with _vue_router_, _vuex_, _vue-recaptcha_, _vue_axios_ to name just a few supporting components.
- **Bootstrap 4** for frontend styling. Actually I used a mixture of **bootstrap-vue** for vue-styled components, and pure **bootstrap** classes for precise tuning of the interface.
- **Webpack 3** for frontend bundling. Majority of Webpack configurations I built by following [SurviveJS Webpack](https://leanpub.com/survivejs-webpack) guide by _Juho Vepsäläinen et al_.
- **Font awesome 5** (free) for icons.
- **Google Web Fonts** (Roboto mono) for interface styling.
- **jsPDF** for generating PDF graphics printed directly on Scantron sheets.

<a id="markdown-urls-and-deployment" name="urls-and-deployment"></a>
### URLs and Deployment 

The live version of the HMT Project website is avaiulable at [https://hmt.gswcm.net](https://hmt.gswcm.net). The registration is currently closed but tournament results can be observed at [https://hmt.gswcm.net/stats](https://hmt.gswcm.net/stats).

The GitHub project page is available at [https://github.com/gswcm/hmt.git](https://github.com/gswcm/hmt.git).

Deployment of the application should not face any bumps, but there are a number of issues that have to be carefully addressed:
- The project requires Node.js v8.x, MongoDB at least v2.6. 
- The app is configured to be served by **Nginx** running as a reverse proxy server. The Nginx config file is available in `/configs/nginx`. The configuration assumes that repo either is cloned into `/var/www/app` or a symbolic link `/var/www/app` points to a real location of repo files. 
- Registration form uses [Invisible reCAPTCHA](https://developers.google.com/recaptcha/docs/invisible) that requires `reCAPTCHA_KEY` and `reCAPTCHA_SECRET` environment variables set with values configured on [http://www.google.com/recaptcha/admin](http://www.google.com/recaptcha/admin) page.
- Emailing feature uses Amazon S3 storage to handle image delivery, so `S3_KEY` and `S3_SECRET` environment variables have to be set to store corresponding values for S3 bucket.
- After installing **Node** and **MongoDB** server, cloning the GitHub repo, and setting up environment variables all dependencies can be installed in a straightforward manner by running `npm i`
- The app can be started from the repo directory by running `node ./bin/www.js`. 
- Permanent installation can be achieved, for instance, by using globally installed `pm2` NPM package.

<a id="markdown-normal-user-workflow" name="normal-user-workflow"></a>
### Normal user workflow

A normal user (team sponsor) visits the landing page of the portal, i.e. [https://hmt.gswcm.net](https://hmt.gswcm.net) and, if the tournament date is set at least 1 days ahead, can proceed with creating a new or revising the previously made registration. Team sponsor is identified by e-mail address that has to be entered into the corresponding input field. Entering of an unrecognized e-mail address leads to displaying of an empty registration form. But if the entered e-mail address is found matching existing registration, the form would be populated with previously entered registration data. 

Form validation routines require clearing up all errors in order for the submission button to become enabled. The Invisible reCAPTCHA guards the form from spammers and other automated fillings/submissions.

Once the form is completed and submitted, the registration is treated as _unconfirmed_ or _pending_ until after the sponsor would follow confirmation link from the automated e-mail. Should this happen within the grace period, the same registration info will become available for the last moment editing and final submission.

**Important note**: The registration process allows for unrestricted submission of registration info. All unconfirmed (pending) registrations expire in 1 day. The registration process is password-free. 
