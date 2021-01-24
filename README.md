# Garmin View Runs
### Fetch your [Garmin Connect](https://connect.garmin.com/modern/) recent runs and create a simple page for viewing them 

### [My runs example](https://danielschwartz85.github.io/garmin-view-runs/)
[![Build Status](https://travis-ci.com/danielschwartz85/garmin-view-runs.svg?branch=main)](https://travis-ci.com/danielschwartz85/garmin-view-runs)

<br/>

### Build (update the table with latest runs):
```
npm run fetch-and-build 
```

### Just make sure env variables are set: 
```
GARMIN_USER_NAME=daniel@gmail.com
GARMIN_PASSWORD=123456
```

### Then serve: ```public/```

<br/>

* Build with [garmin-run-fetch](https://github.com/danielschwartz85/garmin-run-fetch)
* Supports `.env` files.
* You can use `npm run build-push` for local run and perfrom a git push (for `gh-pages` update).
* Using [React](https://reactjs.org/), [Gatsby](https://www.gatsbyjs.com/) and [Material UI](https://material-ui.com/).