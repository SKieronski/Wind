# Wind
Wind is a running app! Create a running route based on a given distance, direction, and your location. See a list of all the routes you have saved to your account. Select a saved route to see all of its details. 

## Getting Started
This is a React Native app built for iOS so it is not deployed...yet!
Feel free to clone this repo and test it with your iOS or android simulators. I've been using XCode for testing on my Macbook and Expo GO for testing on my actual phone.

## Screenshots
![Create Screen](/images/CreateScreen.png)

![Routes List](/images/myroutes.png)

![Routine Details](/images/signup.png)

## Planning 
### Back end Models
![Backend Wireframe](/images/WindModels.png)

### Screen Layout
![Frontend Wireframe](/images/WindWireframe.png)

### Component Heirarchy
![Component Heirarchy](/images/WindComponents.png)

## MVP User Stories
* As a user, I would like to be able to route a run based on a given distance, bearing, and my location.
* As a user, I would like to be able to save a route to my profile.
* As a user, I would like to see a list of all the routes that I have saved.
* As a user, I would like to select a saved route to see its details.
* As a user, I would like to select a saved route to see it on a map.
* As a user, I would like to track my location to see where I am at in the route.

### Post MVP Stretch Goals
* Built-in timer so that I can see how much time my run took.
* Route a run based on a starting point and an end point.
* Route a run based on a given distance and a location that I specify.
* Create running events.
* Invite other users to my event.
* Featured running routes or places on the home screen.

## Technologies Used
* MongoDB
* Express
* React-Native
* Node.js
* Expo
* Axios
* Xcode
* Bcrypt
* JWT
* React-native-maps
* React-navigation

## End Point calculation reference
In this app, we use a formula derived from the Haversine formula to calculate the destination point given a start point, distance, and bearing. Please check out [Movable Type Scripts](http://www.movable-type.co.uk/scripts/latlong.html) if you wish to learn more.
