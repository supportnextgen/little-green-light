import gulp from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import webpack from 'webpack'
import webpackConfig from './webpack.config'
import imagemin from 'gulp-imagemin'
import sourcemaps from 'gulp-sourcemaps'
import sequence from 'run-sequence'
import gutil from 'gulp-util'
import critical from 'critical'
import fancyLog from 'fancy-log'
import chalk from 'chalk'
import del from 'del'
import nodemon from 'gulp-nodemon'
import BrowserSync from 'browser-sync'
import config from './project.config'

const browserSync = BrowserSync.create()
const reload = browserSync.reload

gulp.task('clean', () => {
  return del(config.paths.clean)
})

gulp.task('styles', () => {
  return gulp.src(config.paths.styles.glob)
    .pipe(process.env.NODE_ENV !== 'production' ? sourcemaps.init() : gutil.noop())
    .pipe(sass())
    .on('error', showErrors)
    .pipe(autoprefixer(['last 2 versions', '> 5%'], { cascade: true }))
    .pipe(process.env.NODE_ENV !== 'production' ? sourcemaps.write('maps') : gutil.noop())
    .pipe(process.env.NODE_ENV === 'production' ? cssnano() : gutil.noop())
    .pipe(gulp.dest(config.paths.styles.dest))
    .pipe(browserSync.stream({ match: '**/*.css' }))
})

gulp.task('criticalcss', ['styles'], (callback) => {
  doSynchronousLoop(config.critical.pages, processCriticalCSS, () => {
    callback()
  })
})

gulp.task('scripts', (callback) => {
  const myConfig = Object.assign({}, webpackConfig)

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }))
    browserSync.reload()
    callback()
  })
})

gulp.task('images', () => {
  return gulp.src(config.paths.images.glob)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true,
      svgoPlugins: [
        { cleanupListOfValues: { floatPrecision: 2 } },
        { cleanupNumericValues: { floatPrecision: 2 } },
        { convertPathData: { floatPrecision: 2 } }
      ]
    }))
    .pipe(gulp.dest(config.paths.images.dest))
})

gulp.task('files', () => {
  return gulp.src(config.paths.static.glob)
    .pipe(gulp.dest(config.paths.static.dest))
})

gulp.task('fonts', () => {
  return gulp.src(config.paths.fonts.glob)
    .pipe(gulp.dest(config.paths.fonts.dest))
})

gulp.task('watch', () => {
  browserSync.init({
    notify: false,
    proxy: config.urls.local
  })

  watchSources()
})

gulp.task('nodemon', (cb) => {
  let started = false
  return nodemon({
    script: 'public/index.js',
    ignore: `**/*`
  }).on('start', function () {
    if (!started) {
      cb()
      started = true
    }
  })
})

gulp.task('quick-server', ['nodemon'], () => {
  browserSync.init({
    notify: false,
    proxy: 'localhost:5000',
    port: 3000
  })

  watchSources()
})

gulp.task('build', () => {
  sequence('clean',
    [
      config.critical.init ? 'criticalcss' : 'styles',
      'scripts',
      'images',
      'files',
      'fonts'
    ]
  )
})

function showErrors (error) {
  console.log(error.toString())
  this.emit('end')
}

function watchSources () {
  gulp.watch(config.paths.styles.glob, ['styles'])
  gulp.watch(config.paths.scripts.glob, ['scripts'])
  gulp.watch(config.paths.images.glob, ['images'])
  gulp.watch(config.paths.templates.glob).on('change', reload)
}

function doSynchronousLoop (data, processData, done) {
  if (data.length > 0) {
    const loop = (data, i, processData, done) => {
      processData(data[i], i, () => {
        if (++i < data.length) {
          loop(data, i, processData, done)
        } else {
          done()
        }
      })
    }
    loop(data, 0, processData, done)
  } else {
    done()
  }
}

function processCriticalCSS (element, i, callback) {
  const criticalSrc = config.urls.local + element.url
  const criticalDest = config.critical.dest + element.template + '_critical.min.css'

  fancyLog('-> Generating critical CSS: ' + chalk.cyan(criticalSrc) + ' -> ' + chalk.magenta(criticalDest))
  critical.generate({
    src: criticalSrc,
    dest: criticalDest,
    inline: false,
    ignore: [],
    base: './public/',
    css: [
      './public/assets/css/main.css',
    ],
    minify: true,
    width: 1200,
    height: 1200
  }, (err, output) => {
    callback()
  })
}
