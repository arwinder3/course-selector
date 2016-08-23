# Course Selector Front-End
React front-end for selecting courses and viewing a weekly calendar.

## Installing
First you will need to clone the repo to a local folder. To do this please run the following commands:
```Shell
git clone https://github.com/arwinder3/course-selector.git course-selector-fe
```

Then cd into the newly created directory:
```Shell
cd course-selector-fe
```

Next you'll need to install the npm dependencies, can do so by running this:
```Shell
npm install
```

### Prerequisite
Since this is just the front-end server, you will need to configure and startup the required back-end api service.

## Running the server
Once you've cloned the repo and installed the npm dependencies you're good to start the server:
```Shell
npm start
```

## Configuring the server
As default the server will be running on port 2999, therefore, you can access the web application here - http://localhost:2999.

If you'd like to change this you can edit webpack.config.js:

```Javascript
host: process.env.HOST,
port: process.env.PORT || 2999
```
