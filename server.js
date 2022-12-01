const express = require('express');
const app = express();
const port = 3000
const fs = require('fs')

app.get('/', (req, res) =>{
    res.send("Welcome to the Ppokemon App!");
})

app.listen(3000, () => {
    console.log('listening')
});