const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

// Index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ben Nelson'
    })
})

// About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ben Nelson'
    })
})

// Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'This is where you can get help.',
        name: 'Ben Nelson'
    })
})

// Weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a serach term.'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

// 404 Pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Ben Nelson'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Ben Nelson'
    })
})


// Ready, set, go!
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})