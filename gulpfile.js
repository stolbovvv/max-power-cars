const _if = require('gulp-if');
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const gulpZIP = require('gulp-zip');
const babelJS = require('gulp-babel');
const terserJS = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const deleteAsync = require('del');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// DIR & PATHS SETTINGS
const _rootDir = path.basename(__dirname);
const _buildDir = 'dist';
const _sourceDir = 'app';

// MODE SETTINGS
const _isDevMod = !process.argv.includes('--production');
const _isProdMod = process.argv.includes('--production');

// Collect CSS Files
function collectSCSS() {
  return gulp
    .src([`./${_sourceDir}/scss/**/*.scss`])
    .pipe(_if(_isDevMod, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ grid: 'autoplace', cascade: true }))
    .pipe(_if(_isProdMod, gulp.dest(`./${_buildDir}/css/`)))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(_if(_isDevMod, sourcemaps.write('./')))
    .pipe(gulp.dest(`./${_sourceDir}/css/`))
    .pipe(browserSync.stream());
}

// Collect JS Files
function collectJS() {
  return gulp
    .src([`./${_sourceDir}/javascript/**/*.js`, `!./${_sourceDir}/javascript/**/*.min.js`])
    .pipe(_if(_isDevMod, sourcemaps.init()))
    .pipe(babelJS({ presets: ['@babel/env'] }))
    .pipe(_if(_isProdMod, gulp.dest(`./${_buildDir}/javascript/`)))
    .pipe(terserJS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(_if(_isDevMod, sourcemaps.write('./')))
    .pipe(gulp.dest(`./${_sourceDir}/javascript/`))
    .pipe(browserSync.stream());
}

// Collect Build
function collectBuild() {
  return gulp
    .src([`./${_sourceDir}/**/*.html`], { base: `./${_sourceDir}/` })
    .pipe(gulp.dest(`./${_buildDir}/`))
    .pipe(gulp.src(`./${_sourceDir}/{css,javascript}/**/*.min.{css,js}`, { base: `./${_sourceDir}/` }))
    .pipe(gulp.dest(`./${_buildDir}/`))
    .pipe(gulp.src(`./${_sourceDir}/libs/**/*.{css,js}`, { base: `./${_sourceDir}/` }))
    .pipe(gulp.dest(`./${_buildDir}/`))
    .pipe(gulp.src(`./${_sourceDir}/{fonts,images}/**/*.*`, { base: `./${_sourceDir}/` }))
    .pipe(gulp.dest(`./${_buildDir}/`))
    .pipe(gulp.src(`./${_sourceDir}/{site.webmanifest,favicon.ico}`, { base: `./${_sourceDir}/` }))
    .pipe(gulp.dest(`./${_buildDir}/`))
    .pipe(gulp.src(`./${_sourceDir}/{favicon*,android*,apple*}.png`, { base: `./${_sourceDir}/` }))
    .pipe(gulp.dest(`./${_buildDir}/`));
}

// Collect Archive
function collectArchive() {
  return gulp
    .src(`./${_buildDir}/**/*.*`)
    .pipe(gulpZIP(`${_rootDir}.zip`))
    .pipe(gulp.dest('./'));
}

// Starting a server with file watching
function runServer() {
  browserSync.init({
    server: {
      baseDir: `./${_sourceDir}/`,
    },
    port: 1234,
    open: true,
    online: true,
    notify: false,
  });

  gulp.watch([`./${_sourceDir}/**/*.html`]).on('change', browserSync.reload);
  gulp.watch([`./${_sourceDir}/scss/**/*.scss`], collectSCSS);
  gulp.watch([`./${_sourceDir}/javascript/**/*.js`, `!./${_sourceDir}/javascript/**/*.min.js`], collectJS);
}

// Clean command
const cleanBuild = () => deleteAsync([`./${_buildDir}/**/*`]);
const cleanArchive = () => deleteAsync([`./${_rootDir}.zip`]);

// Base tasks
exports.clean = gulp.series(cleanBuild, cleanArchive);
exports.build = gulp.series(cleanBuild, collectJS, collectSCSS, collectBuild);
exports.archive = gulp.series(cleanBuild, collectJS, collectSCSS, collectBuild, cleanArchive, collectArchive);

// Default task
exports.default = gulp.series(collectJS, collectSCSS, runServer);
