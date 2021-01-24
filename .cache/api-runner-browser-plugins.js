module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"MyRuns","short_name":"MyRuns","start_url":"/","background_color":"#6b37bf","theme_color":"#6b37bf","display":"standalone","icon":"src/images/run.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"20558f68f558bb044afb20e4d9e20aac"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
