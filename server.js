const express = require('express');
const app = express();
const port = 3000


const pokemon = require('./models/pokemon.js');

app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.send("Welcome to the Pokemon App!");
})


app.get('/pokemon/', (req, res) =>{
    res.render("Index", {allPokemon: pokemon});
})


app.get('/pokemon/:id', (req, res) => {
    res.render('Show', {pokemon: pokemon[req.params.id]} );
})


app.listen(3000, () => {
    console.log('listening')
});