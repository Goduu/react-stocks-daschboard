# React Stocks Dashboard
Aplication to create custom dashboards stocks studies.

![alt text](https://github.com/Goduu/stocks-studies-dashboard/blob/main/public/images/logged_out/headerImage.jpg?raw=true)


## Getting Started

### Prerequisites

#### Node.js 14+ (versions below could work, but are not tested)
#### Java 11+ (versions below could work, but are not tested)
#### Maven 3+ (versions below could work, but are not tested)

* Linux:

   ```
   sudo apt install nodejs npm
   ```

* Windows or macOS:

   https://nodejs.org/en/

### Installing

1. Clone the repository

   ```
   git clone https://github.com/Goduu/stocks-studies-dashboard
   ```
2. Install dependencies, this can take a minute

   ```
   cd react-saas-template
   npm install
   ```
3. Start the local server

   ```
   npm start
   ```
4. Clone the backend Java repository
   ```
   git clone https://github.com/Goduu/stocks-studies-java-api
   ```
5. Install dependencies, this can take a minute

   ```
   mvn install
   ```
5. Run the backend

   ```
   mvn spring-boot:run
   ```

After step 3 your browser should now open and show the app. Otherwise open http://localhost:3000/ in your browser. Editing files will automatically refresh the page for the frontend.

### What to do next?

If you are new to React, you should watch a [basic React tutorial](https://www.youtube.com/results?search_query=react+tutorial) first.

If you already know React, then most of the information you need is in the [Material-UI documentation](https://material-ui.com/getting-started/usage/).

You can go into [src/theme.js](/src/theme.js) and change the primary and secondary color codes at the top of the script to the values you like and some magic will happen.

## Deployment

If you are happy with the state of your website you can run:

```
npm run build 
```

It will create a folder named build with your compiled project inside. After that copy its content into your webroot and you are ready to go.

## Build With

* [SaaS-Template](https://github.com/dunky11/react-saas-template) - Used as Initial Site Template
* [Create-React-App](https://github.com/facebook/create-react-app) - Used to bootstrap the development
* [Material-UI](https://github.com/mui-org/material-ui) - Material Design components
* [React-Router](https://github.com/ReactTraining/react-router) - Routing of the app
* [Pace](https://github.com/HubSpot/pace) - Loading bar at the top
* [Emoji-Mart](https://github.com/missive/emoji-mart) - Picker for the emojis
* [React-Dropzone](https://github.com/react-dropzone/react-dropzone) - File drop component for uploads
* [Recharts](https://github.com/recharts/recharts) - Charting library
* [Aos](https://github.com/michalsnik/aos) - Animations based on viewport
* [React-Cropper](https://github.com/roadmanfong/react-cropper) - Cropper for the image uploads
* [Redux](https://github.com/reduxjs/redux) - State manager
* [MongoDB](https://www.mongodb.com/) - As Database

## Contribute
Show your support by ⭐ the project. Pull requests are always welcome.

