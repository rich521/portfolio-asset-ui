const gulp = require('gulp'),
    webpack = require('webpack-stream'),
    browserSync = require('browser-sync'),
    historyApiFallback = require('connect-history-api-fallback'),
    axios = require("axios");

// MongoDB
const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/portfolios';

// Create a server for socket.io
const server = require('http').createServer(),
    io = require('socket.io')(server);

server.listen(3000);

// On client connection
io.on('connection', (client) => {
    client.on('fetch_assets', () => {
        const dataArr = [];
        promise(client, currencyURL, 'emit_currency');
        // Fetch data from mongoDBdatabase after connecting to socket
        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            console.log("Connected to mongodb server");
            const cursor = db.collection('userData').find();
            cursor.forEach((doc, err) => {
                assert.equal(null, err);
                dataArr.push(doc);
            }, () => {
                // console.log(dataArr);
                processAssets(dataArr, client);
                db.close();
            });
        });
    });


    // URLS for api
    const currencyURL = 'http://api.fixer.io/latest?base=USD&symbols=AUD,CAD,CNY,GBP,HKD,JPY,USD',
        assetURL = 'https://rawgit.com/richardstrutt/portfolio-asset-ui/master/dist/data/data.json';

    client.on('fetch_currency', () => {
        promise(client, currencyURL, 'emit_currency');
    });

});

function processAssets(arg, client) {
    // current market price URL
    const marketPriceURL = 'https://rawgit.com/richardstrutt/portfolio-asset-ui/master/dist/data/marketPrice.json';


    // new Promise((resolve) => {
    //     const data = fetchData(marketPriceURL);


    //     // Portfolio A
    //     // for (var key in pa) {

    //     // }

    //     // Resolve when the new market price is fetched
    //     if (data) resolve(data);
    // }).then((arg) => {

    // });

    client.emit('emit_assets', arg);
}

// Promise & fetch data
function promise(client, url, id) {
    new Promise((resolve) => {
        const data = fetchData(url);
        if (data) resolve(data);
    }).then((arg) => {
        client.emit(id, arg);
    });
}

// Fetch
function fetchData(url) {
    return axios.get(url)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}


// Watch all files when changing live 
gulp.task('default', () => {
    browserSync.init({
        browser: 'google chrome',
        open: false,
        port: 3000,
        server: {
            baseDir: './dist',
            middleware: [historyApiFallback()],
        }
    });
    gulp.watch('./src/js/**/*.js', ['js-watch']);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('public', () => {
    browserSync.init({
        browser: "google chrome",
        server: "./dist"
    });
});

var jsSrc = 'src/js/bundle.js';
gulp.task('react', () => {
    return gulp.src(jsSrc)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js/'));
});

//Only runs after react & minify is complete
gulp.task('js-watch', ['react'], (done) => {
    browserSync.reload();
    done();
});
