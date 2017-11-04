module.exports = {
  urls: {
    production: 'http://domain.com/',
    staging: 'http://staging.domain.com/',
    development: 'http://domain.builtbymighty.com/',
    local: 'http://domain.local/'
  },
  paths: {
    clean: [
      './public/assets/',
      './templates/_assets/css/'
    ],
    styles: {
      entry: './src/stylesheets/main.scss',
      glob: './src/stylesheets/**/*.scss',
      dest: 'public/assets/css'
    },
    scripts: {
      webpack: {
        main: [
          './src/javascripts/main'
        ]
        // Include page specific JS files below:
        // homepage: './src/javascripts/pages/homepage'
      },
      // The scripts glob and dest are used by gulp
      // to trigger browsersync reload on change
      glob: './src/javascripts/**/*.js',
      dest: './public/assets/js'
    },
    images: {
      glob: './src/images/**/*',
      dest: './public/assets/img'
    },
    static: {
      glob: './src/static/*',
      dest: './public'
    },
    fonts: {
      glob: './src/fonts/*',
      dest: './public/assets/fonts'
    },
    templates: {
      glob: './templates/**/*.twig'
    }
  },
  critical: {
    init: false,
    dest: './templates/_assets/css/',
    pages: [
      {
        url: '',
        template: 'index'
      },
      {
        url: '404',
        template: '404'
      }
    ]
  }
}
