const express = require('express')
const path = require('path');
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');
const { DH_UNABLE_TO_CHECK_GENERATOR } = require('constants');

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs');
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Boris'
    })
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Boris'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Weather App',
        name: 'Boris'
    })
})



app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({error:'address must be entered'})
    }

    let location = req.query.address
    geocode(location, (error, data=undefined) => {
        if(error)
        {
            return res.send( {error})
        }
        console.log(data)
        forecast(data.longitude,data.latitude, (error, forecastData)=>{
            if(error) {
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: data.location
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
      
    res.render('404', {
        title: 'Help Weather App',
        name: 'Boris',
        errormessage: 'help article not find'
    })
})

app.get('*', (req, res)=>{

    res.render('404', {
        title: 'Weather App Error',
        name: 'Boris',
        errormessage: 'My 404 page'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})