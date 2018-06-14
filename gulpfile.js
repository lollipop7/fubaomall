const fs = require('fs'),
    join = require('path').join,
    gulp = require('gulp'),
    ejs = require('ejs'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    srcDir = join(__dirname, 'src'),
    ejsDir = join(srcDir, 'ejs'),
    sassDir = join(srcDir, 'sass'),
    wwwDir = join(srcDir, 'www'),
    _ = require('lodash');

let fileArray = ['login','register','resetPWD','setPWD','integral'];
gulp.task('tpl',()=>{
    _.each(fileArray, ejsFileName => {
        let templateStr = fs.readFileSync(join(ejsDir, `${ejsFileName}/${ejsFileName}.ejs`), 'utf-8'),
        htmlTemplate = ejs.render(templateStr, {
            filename: join(ejsDir, `${ejsFileName}/${ejsFileName}.ejs`),
            dataJSON: _.extend({}, require(join(srcDir, `data/data.js`)), {filename: ejsFileName})
        });
        fs.writeFile(join(wwwDir, `${ejsFileName}.html`), htmlTemplate, err => {
            if(err) throw new Error(err);
            console.log(`${ejsFileName} is Saved!`);
        })
    })
})

//compile watch
gulp.task('tpl:watch', () => {
    gulp.watch(join(ejsDir, '**/*.ejs'), ['tpl']);
});
//compile sass to css
gulp.task('sass', () => {
    fileArray.forEach(ejsFileName => {
        return gulp.src(join(sassDir, `${ejsFileName}/${ejsFileName}.scss`))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(join(wwwDir, 'styles/')));
    })
})

//sass watch
gulp.task('sass:watch', () => {
    gulp.watch(join(sassDir, `***/*.scss`), ['sass']);
})

//compile js
gulp.task('js', () => {
    return gulp.src(join(srcDir, `script/*.js`))
    .pipe(babel())
    .pipe(gulp.dest(join(wwwDir, `js/`)))
})

//js watch
gulp.task('js:watch', () => {
    gulp.watch(join(srcDir, 'script/*.js'), ['js']);
});

//webserver
gulp.task('ws', ['sass:watch', 'tpl:watch', 'js:watch'], () => {});


