# Mom-Network
## Communication Tool for Busy Mothers.

*All parents and especially Mothers are every day super heroes!*

Mom-Network is a content-sharing social platform for Busy Mothers. The application allows users to browse each other's content as well as add, edit and delete their posts, comments, profiles. They can write messages to each other and exchange information about their children's specific age and interest related issues. They can subscribe to a newsletter to recieve the highlights of the social network per email to stay engaged even outside the platform.

Main Technologies are:

- HTML, CSS, JavaScript
- React.js
- Bootstrap.js
- Django REST Framework API 

This is the fifth and final Portfolio Project in frames of the Code Institute Full Stack Web Developer Course Assessment.

:point_down: Click the link below for the live view: 

# [Live View](https://mom-network-frontend.herokuapp.com/)


<img width="100%" alt="wireframe" src="src/readme-images/Nest_Hub_Max_Device_view.png">


## Contents:
- [UX](#ux-and-ui)
    - [User Stories](#user-stories)
    - [Responsivity](#responsivity)
    - [User Friendly Messages](#user-friendly-messages)
- [Features](#features)
    - [Superhero Mom Logo](#superhero-mom-logo)
    - [ Register and Login at the landing page](#register-and-login-at-the-landing-page)
    - [Navigation](#navigation)
    - [Posts](#posts)
    - [Comments](#comments)
    - [Profiles](#profiles)
    - [Thematic Interest Groups](#thematic-interest-groups)
    - [Newsletter Subscription](#newsletter-subscription)
    - [Future Features](#future-features)
- [Development Stages]()
    - [Planning]()
    - [Structure]()
    - [Using Frameworks and Libraries]()
    - [Using Source code]()
- [Testing]()
    - [Validators]()
    - [Manual Testing]()
    - [Automatic Testing - Writing Functions]()
    - [Debugging]()
    - [Remaining Issues]()
- [Deployment]()
    - [Heroku]()
- [Sources & Credits]()
    - [Sources]()
    - [Tools]()
    - [Acknowledgments]()

## UX and UI

It is crucial to identify and get to know the website user in order to enhance the user experience. A Persona method helps 'bringing to life' a real-life individual with personality traits, favourite choices and preferences. Jane Smith (the Persona) is a working mother that loves bio products and enjoys walks in the nature. She will like the Mom Network colour pallette in natural tones. 

More about this user Persona is described in my previous project, called Mom Lifehacks: https://github.com/annagabain/Mom-Lifehacks#User-Experience-and-User-Interface-Design-UX-and-UI

### User Stories:

Some of the most important user stories are:

- As a site user, I can register and log in so that I can view my news feed and profile.

- As a user, I can see a navigation bar so that I can easily find the desired path to interact with.

- As a site user I can **Create** a post so that I can share my experiences with others.

- As a site user, I can **View** an individual post so that I can read the comments to it.

- As a site user, I can **Edit** my own post so that I can correct the information.

- As a site user I can **Delete** my own post so that I can remove the no longer needed information.

All user stories as part of a project: https://github.com/users/annagabain/projects/10


### Responsivity


There have been two main device views considered for the responsivity of Mom Schedule: Mobile and Larger Monitor. Some efforts have been made for the application to be mobile friendly. However there is room for implovement.
The Methods to achieve desired device responsivity level include Bootstrap5 features and custom CSS.

Initial test result: Am I responsive?

<img width="78%" alt="wireframe" src="src/readme-images/responsivity.png">


### User Friendly Messages

In order to reassure the user for the actions they have taken, as well as to guide them, user-friendly messages have been created.

<img width="50%" alt="logged" src="src/readme-images/userfriendly-alreadyloggedin-message.png">

<img width="50%" alt="logouttoregister" src="src/readme-images/userfriendly-need-to-logout-to-register-message.png">

<img width="50%" alt="success" src="src/readme-images/message-sent-successfully.png">

## Features

### Superhero Mom Logo   

<img width="30%" alt="wireframe" src="src/readme-images/superhero-mom-logo.png">

**All parents are every day super heroes and the logo shows their strength when joining the powers in a network together!**

### Register and Login at the landing page

<img width="100%" alt="wireframe" src="src/readme-images/logn-register.png">

### Navigation

<img width="100%" alt="wireframe" src="src/readme-images/navbar1.png">

<img width="100%" alt="wireframe" src="src/readme-images/navbar2.png">

### Posts

<img width="100%" alt="wireframe" src="src/readme-images/posts.png">

<img width="50%" alt="wireframe" src="src/readme-images/create-post.png">

### Comments

<img width="50%" alt="wireframe" src="src/readme-images/comment1.png">

<img width="100%" alt="wireframe" src="src/readme-images/comment2.png">

### Profiles

<img width="50%" alt="wireframe" src="src/readme-images/profiles.png">

### Thematic Interest Groups

User's personal selection of groups

<img width="50%" alt="wireframe" src="src/readme-images/groups1.png">

All thematic groups directly accessible through the navigation panel

<img width="30%" alt="wireframe" src="src/readme-images/groups2.png">

Groups overview

<img width="100%" alt="wireframe" src="src/readme-images/groups3.png">

Selected specific group page

<img width="100%" alt="wireframe" src="src/readme-images/groups4.png">


### Newsletter Subscription

To recieve the highlights and invitations per email. Even if one had no time to participate in networking activities, they can stay engaged with Mom network. 

<img width="100%" alt="wireframe" src="src/readme-images/newsletter.png">

### Future Features

- Like/unlike
- Follow/unfollow


## Planning

### Wireframes

<img width="68%" alt="wireframe" src="src/wireframes/homepage-public.png">
<img width="68%" alt="wireframe" src="src/wireframes/homepage-logged-in.png">
<img width="80%" alt="wireframe" src="src/wireframes/post.png">
<img width="80%" alt="wireframe" src="src/wireframes/group.png">
<img width="78%" alt="wireframe" src="src/wireframes/profile.png">





### Initial Terminal commands

npx create-react-app . --use-npm

npm start

## Testing and Debugging

<img width="68%" alt="wireframe" src="src/readme-images/test_api_in_postman.png">
<img width="68%" alt="wireframe" src="src/readme-images/Screenshot 2023-07-11 110116.png">


writing a sample message with hard-coded sender and recipient in the api backend and displaying it on front-end

<img width="68%" alt="wireframe" src="src/readme-images/Add-message-from-admin-testing1.png">

<img width="68%" alt="wireframe" src="src/readme-images/Add-message-from-admin-testing2.png">
<img width="68%" alt="wireframe" src="src/readme-images/Add-message-from-admin-testing3withclg.png">
<img width="68%" alt="wireframe" src="src/readme-images/Add-message-from-admin-testing4withclg.png">



-----------------------------------------------------------------------------------

:lady_beetle: - refresh token bug -

*Before: logs out upon page refresh*



:mag:  

<img width="70%" alt="debugging" src=""> 

:bulb:

<img width="70%" alt="debugging" src=""> 

*After*

<img width="70%" alt="debugging" src=""> 

-----------------------------------------------------------------------------------

:lady_beetle: - rendering problem


*Before: *



:mag:  

<img width="70%" alt="debugging" src=""> 

:bulb: -->>>> solved with index.js react DOM

<img width="70%" alt="debugging" src=""> 

*After*

<img width="70%" alt="debugging" src=""> 

-----------------------------------------------------------------------------------

:lady_beetle: data.results wrong access code

*Before: console.log(data)* 

<img width="70%" alt="debugging" src="src/readme-images/pagination-api-not-rendering-frontend-BUG.png"> 


:mag: 

<img width="70%" alt="debugging" src="src/readme-images/pagination-api-not-rendering-frontend-BUG-console-logging.png"> 

:bulb: added .results to access the desired array of data

*After onsole.log(data.results)*

<img width="70%" alt="debugging" src=""> 

-----------------------------------------------------------------------------------