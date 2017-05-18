var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var browserSyncReuseTab = require('browser-sync-reuse-tab')(browserSync)
var webpack = require('gulp-webpack')
var path = require('path')
var runSequence = require('run-sequence')

gulp.task('bundle-debug', function () {
  return gulp.src('src/Main')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest(path.resolve(__dirname, 'build/debug/js/')))
})

gulp.task('html-debug', function () {
  // gulp.src('./index.html')
  // .pipe(gulp.dest('./build/debug/'))
})

gulp.task('resources-debug', function () {
  gulp.src('./resources/**/*')
  .pipe(gulp.dest('./build/debug/'))
})

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 3000,
    server: {
      baseDir: ['./build/debug/']
    },
    open: false
  }, browserSyncReuseTab)

  gulp.watch('./build/debug/**/*').on('change', browserSync.reload)
})

gulp.task('watch-debug', function () {
  gulp.watch('resources/**/*', ['resources-debug'])
  gulp.watch('src/**/*', ['bundle-debug'])
})

gulp.task('default', runSequence('bundle-debug', 'html-debug', 'resources-debug', 'watch-debug', 'browser-sync'))