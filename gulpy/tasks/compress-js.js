var gulp = require('gulp'),
    uglify = require('gulp-uglifyjs'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');

require('./strip-debug')();

// Compress js-files
module.exports = function(buildOptions) {

    return gulp.task('compress-js', ['strip-debug'], function() {
        return gulp.src('./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/js/main' + buildOptions.hash + '.js')
            .pipe(uglify('main' + buildOptions.hash + '.min.js', {
                mangle: false
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while compressing js.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/js/'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'JS\'ve been minified \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
        });
};   