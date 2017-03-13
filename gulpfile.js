/**
 * Created by jun on 2017/3/13.
 */
var gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    clean  = require('gulp-clean');
/*清除文件*/
gulp.task('clean',function () {
    return gulp.src('release').pipe(clean())
});
/**
 * 压缩合并js
 */
gulp.task('uglifyJs',function () {
   return gulp.src(["src/js/Blob.js","src/js/FileSaver.js","src/js/tableExport.js","node_modules/crypto-js/crypto-js.js","node_modules/crypto-js/aes.js","src/js/index.js"])
       .pipe(concat('index.js'))
       .pipe(gulp.dest('release/js'))
       .pipe(uglify())
       .pipe(rename('index.min.js'))
       .pipe(gulp.dest('release/js'))
});
gulp.task('jq',function () {
    return gulp.src("node_modules/jquery/dist/jquery.min.js")
        .pipe(gulp.dest('release/js'))
});
gulp.task('api',function () {
    return gulp.src("src/api")
    .pipe(gulp.dest('release'))
});
gulp.task('index',function () {
    return gulp.src("src/index.min.html")
    .pipe(rename('index.html'))
    .pipe(gulp.dest('release'))
});
gulp.task('build',['uglifyJs','jq','api','index']);
gulp.task('default',['clean'],function () {
   return gulp.start('build');
});