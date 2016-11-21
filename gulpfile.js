var gulp = require('gulp');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');
var axios = require("axios");


// Create a server for socket.io
var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client) {
    // URLS for api
    var currencyURL = 'http://api.fixer.io/latest?base=USD&symbols=AUD,CAD,CNY,GBP,HKD,JPY,USD',
        assetURL = './dist/data/data.json';
    client.on('fetch_currency', function() {
        new Promise((resolve) => {
            var data = fetchData(assetURL);
            if (data) resolve(data);
        }).then((arg) => {
            client.emit('emit_currency', arg);
        });
    });

    client.on('fetch_assets', function() {
        new Promise((resolve) => {
            var data = fetchData(assetURL);
            console.log(data);
            if (data) resolve(data);
        }).then((arg) => {
            client.emit('emit_assets', arg);
        });
    });

    client.on('disconnect', function() {
        console.log("user disconnected");
    });
});
server.listen(3000);

// Watch all files when changing live 
gulp.task('default', function() {
    browserSync.init({
        browser: 'google chrome',
        port: 3000,
        server: {
            baseDir: './dist',
            middleware: [historyApiFallback()],
        }
    });
    gulp.watch('./src/js/**/*.js', ['js-watch']);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('public', function() {
    browserSync.init({
        browser: "google chrome",
        server: "./dist"
    });
});

var jsSrc = 'src/js/bundle.js';
gulp.task('react', function() {
    return gulp.src(jsSrc)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js/'));
});

//Only runs after react & minify is complete
gulp.task('js-watch', ['react'], function(done) {
    browserSync.reload();
    done();
});

// Fetch
function fetchData(url) {
    return axios.get(url)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}
