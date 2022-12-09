require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000
const db = mongoose.connection

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("open", () => console.log("mongo connected: ", mongoURI));
db.on("close", () => console.log("mongo disconnected"));


const Pokemon = require('./models/pokemon.js');

app.use((req, res, next) => {
    console.log("I run for all routes")
    next()
})

app.use(express.urlencoded({ extended: false }))
mongoose.set("strictQuery", true)


app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())



app.get('/', (req, res) =>{
    res.send("Welcome to the Pokemon App!");
})


app.get('/pokemon/', (req, res) =>{
    Pokemon.find({}, (error, allPokemon) => {
        res.render('Index', {
            allPokemon: allPokemon
        })
    })
    // res.render("Index", {allPokemon: Pokemon});
})

app.get('/pokemon/new', (req,res) =>{
    res.render('New')
})

app.post('/pokemon', (req,res )=> {

    Pokemon.create(req.body, (error, createPokemon) =>{
        res.redirect('/pokemon')
    })
})

app.get('/pokemon/:id', (req, res) => {
    Pokemon.findById(req.params.id, (err, foundPokemon) => {
        res.render("Show", {
          pokemon: foundPokemon,
        })
      })
  
})


app.use(express.static('public'));

// const pokemon = [ //THIS IS THE CODE USED TO 
//     {name: "bulbasaur", img: "http://img.pokemondb.net/artwork/bulbasaur"},
//     {name: "ivysaur", img: "http://img.pokemondb.net/artwork/ivysaur"},
//     {name: "venusaur", img: "http://img.pokemondb.net/artwork/venusaur"},
//     {name: "charmander", img: "http://img.pokemondb.net/artwork/charmander"},
//     {name: "charizard", img: "http://img.pokemondb.net/artwork/charizard"},
//     {name: "squirtle", img: "http://img.pokemondb.net/artwork/squirtle"},
//     {name: "wartortle", img: "http://img.pokemondb.net/artwork/wartortle"}
//  ];


// Pokemon.insertMany(pokemon)
// // if database transaction succeeds
// .then((pokemon) => {
//   console.log(pokemon)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
// //  db.close()
// })

app.listen(3000, () => {
    console.log('listening')
});