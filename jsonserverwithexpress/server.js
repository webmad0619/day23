const express = require("express")
const fs = require("fs")
const app = express()

app.get("/allCities", (req, res) => {
    fs.readFile("./country-capitals.json", "utf8", (err, data) => {
        let allCitiesPayload = JSON.parse(data)
        
        allCitiesPayload = allCitiesPayload.map(city => {
            delete city.CountryCode
            delete city.ContinentName
            city.lat = +city.CapitalLatitude
            city.lng = +city.CapitalLongitude
            delete city.CapitalLatitude
            delete city.CapitalLongitude
            return city
        })

        res.json(allCitiesPayload)
    })
})

app.listen(3000)