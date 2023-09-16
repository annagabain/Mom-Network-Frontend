# LIVE LINK: https://mom-network-frontend.herokuapp.com/

<img width="100%" alt="wireframe" src="src/readme-images/Nest_Hub_Max_Device_view.png">


# Mom-Network
Portfolio Project nr. 5 for Code Institute Assessment. Mom Network - Communication Tool for Busy Mothers.


### Project purpose:

In this project, you will design and build a content-sharing web application with React and an API (Django Rest Framework) Back-End. This will allow your users to browse and comment/ like each other's content as well as add, edit and delete their own. The users will also be able to follow one another.

The data is presented in a way that makes it easy for users to find what they're looking for.


### Main Technologies

- HTML, CSS, JavaScript
- React.js
- Bootstrap.js
- Django REST Framework


### Project Idea: Content Platform

Create a community-based publishing platform to share ideas, stories, tutorials and journalistic articles. Now that you're a fully-fledged web developer you've decided it's probably time for you to start your very own cool, modern content platform, offering a publishing portal to a global audience. To provide the best user experience, the platform will be available via a browser-based interface.

Suggested functionality:

The platform should enable users to create, read, comment and vote on content.
Content should be searchable and categorized.
Search results can be filtered on username, popularity, date created, title, content keywords and category.


## Features

#### Superhero Mom Logo

<img width="30%" alt="wireframe" src="src/readme-images/superhero-mom-logo.png">

#### **All parents are every day super heroes and the logo shows their strength when joining the powers in a network together!**


#### Register and Login at the landing page

<img width="100%" alt="wireframe" src="src/readme-images/logn-register.png">

#### Navigation

<img width="100%" alt="wireframe" src="src/readme-images/navbar1.png">

<img width="100%" alt="wireframe" src="src/readme-images/navbar2.png">

#### Posts

<img width="100%" alt="wireframe" src="src/readme-images/posts.png">

<img width="50%" alt="wireframe" src="src/readme-images/create-post.png">

#### Comments

<img width="50%" alt="wireframe" src="src/readme-images/comment1.png">

<img width="100%" alt="wireframe" src="src/readme-images/comment2.png">

#### Profiles

<img width="50%" alt="wireframe" src="src/readme-images/profiles.png">


#### Thematic Interest Groups

User's personal selection of groups

<img width="50%" alt="wireframe" src="src/readme-images/groups1.png">

All thematic groups directly accessible through the navigation panel

<img width="50%" alt="wireframe" src="src/readme-images/groups2.png">

Groups overview

<img width="100%" alt="wireframe" src="src/readme-images/groups3.png">

Selected specific group page

<img width="100%" alt="wireframe" src="src/readme-images/groups4.png">


#### Newsletter Subscription

To recieve the highlights and invitations per email. Even if one had no time to participate in networking activities, they can stay engaged with Mom network. 

<img width="100%" alt="wireframe" src="src/readme-images/newsletter.png">

## Planning

### Wireframes

<img width="68%" alt="wireframe" src="src/wireframes/homepage-public.png">
<img width="68%" alt="wireframe" src="src/wireframes/homepage-logged-in.png">
<img width="80%" alt="wireframe" src="src/wireframes/post.png">
<img width="80%" alt="wireframe" src="src/wireframes/group.png">
<img width="78%" alt="wireframe" src="src/wireframes/profile.png">


### UX and UI

User Stories: https://github.com/users/annagabain/projects/10/views/1

Conditional rendering - experience flow:

<img width="78%" alt="wireframe" src="src/readme-images/conditional_rendering-homepage2.png">

<img width="78%" alt="wireframe" src="src/readme-images/conditional_rendering-homepage1.png">

### Initial Terminal commands

npx create-react-app . --use-npm

npm start

### Testing and Debugging

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