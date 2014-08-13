var gulp = require('gulp'),                                     // Gulp JS
    run = require('gulp-run'),                                  // Run bash-scripts from gulp
    gulpif = require('gulp-if'),                                // Gulp if module
    gutil = require('gulp-util'),                               // Gulp util module
    os = require('os'),                                         // Node os module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    ms = false,                                                 // Windows System Detect

    paths = 'markup/static/js/libs ' + 
            'markup/static/js/plugins ' + 
            'markup/static/images ' + 
            'markup/static/images/content ' + 
            'markup/static/images/plugins ' + 
            'markup/static/images/sprite ' + 
            'markup/static/images/sprite/96 ' + 
            'markup/static/images/sprite/144 ' + 
            'markup/static/images/sprite/192 ' + 
            'markup/static/images/sprite/288 ' + 
            'markup/static/images/svg ' + 
            'markup/static/fonts ' + 
            'markup/static/scss/plugins ' + 
            'markup/modules/_template/assets ' + 
            'markup/modules/_template/ie';

    windowsPaths = paths.replace(/\//g,"\\\\");


// Create FS.
module.exports = function(cb) { 
    if (os.platform() == 'win32') {
        ms = true;
    }

    gulp.src('')
        .pipe(gulpif(ms, 
            run('mkdir ' + windowsPaths),
            run('mkdir ' + paths)
            )
        )
        .pipe(
            gulpif(notifyConfig.useNotify, 
                notify({
                    onLast: true,
                    sound: notifyConfig.sounds.onSuccess,
                    title: notifyConfig.title,
                    message: 'Builder\'ve been inited. \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                    templateOptions: {
                        date: modifyDate.getTimeOfModify()
                    }
                })
            )
        );

    gutil.log('Don\'t forget to check project config in root directory (projectConfig.js)');

    cb(null);    
};   