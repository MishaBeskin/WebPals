## WebPals App Architecture.


short description about App's Architecture.


### Main Architecture ###
* General components like: Header, Footer, Home or LandingPage
* Modules: each Module contains different functionally for example, Auth Module controlling users login, logout and user data.  
Profiles Module controlling data of the profiles and it's repositories.

#### Modules Architecture ####
* Each module has it's components, services, routing   and module(lazy-loading).
so in this way I mange specific logic for particular entity and it's user story in one independent place that helps me with performance when running the App
===========================================

### Using The App ###
* In this app I had used local storage to indicate if current user has lodged in.
* When user login I sore his mail in localStorage
I using service with observable of the user to indicate which user is logged in, if user is null I redirecting him to login page
* If we needed to mage user state we can use NGRX state management to dynamically know user state(one source of truth)
* When I was fetching the profiles data I had used forkJoin to get each profile userInfo that I was needed
* Using dialog with reference option to pass the user profile object that I was intend to show
* using user's repositories url to load his repositories list






