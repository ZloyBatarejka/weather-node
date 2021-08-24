const express = require('express');
const path = require('path');
const hbs = require('hbs');
const e = require('express');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;
/** app cinfig */
const app = express();
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/** setup express */
app.use(express.static(publicDirectory));
app.set('views', viewsPath)
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

/** index render */
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ruslan'
    });
})
/** about render */
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ruslan'
    });
})
/** help render */
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'You shall find no help here',
        name: 'Ruslan'
    });
})

/** weather render */
app.get('/products', (req, res) => {
    if (!req.query.games) {
        return res.send({
            error: 'no search message'
        })
    } 
    res.send({
        prducts: []
    });
    
});

/** weather render */
app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'You must provide adress'
        })
    } 
    geoCode(req.query.adress, (error, geoData = {}) => {
        if (error) {
            return res.send({
                error: error,
            });
        } else {
            forecast(geoData, (error, forecastData = {}) => {
                if (error) {
                    return res.send({
                        error: error,
                    });
                } else {
                    return res.send({
                        geoData,
                        forecastData,
                    });
                }  
            });
        }
    })
    // res.send({
    //     adress: req.query.adress
    // });
});


/** 404 render */
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not Found',
        name: 'Ruslan'
    });
});

/** start */
app.listen(port, () => {
    console.log('Server is running on' + port)
});