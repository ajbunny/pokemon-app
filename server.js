const express = require('express');
const app = express();
const port = 3000
const fs = require('fs')

const pokemon = require('./models/pokemon.js');

app.get('/', (req, res) =>{
    res.send("Welcome to the Pokemon App!");
})

app.get('/pokemon/', (req, res) =>{
    res.send(pokemon);
})


app.listen(3000, () => {
    console.log('listening')
});