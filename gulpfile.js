var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');

gulp.task('script',function(){
    gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
});

gulp.task('images',function(){
    gulp.src('src/img/**/*.*')
        //.pipe(imagemin({
        //    progressive : true
        //}))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('css',function(){
    gulp.src('src/css/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('build',function(){
    gulp.watch('src/js/**/*.js',['script']);
    gulp.watch('src/img/**/*.*',['images']);
    gulp.watch('src/css/**/*.less',['css']);
});

gulp.task('default',['script','images','css','build']);