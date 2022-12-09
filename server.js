require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000
const db = mongoose.connection

//Code added from Hadia (worked)
const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

//Code added from Hadia (worked)
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("open", () => console.log("mongo connected: ", mongoURI));
db.on("close", () => console.log("mongo disconnected"));


const Pokemon = require('./models/pokemon.js');

app.use((req, res, next) => {
    console.log("I run for all routes")
    next()
})

////This needs explained to me//////
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
  
})

app.get('/pokemon/new', (req,res) =>{
    res.render('New')
})


app.post('/pokemon', (req,res )=> {
    let pokemonBody = req.body
    pokemonBody.img = pokemonBody.name

    Pokemon.create(req.body, (error, createPokemon) =>{
        res.redirect('/pokemon')
    })
})

//Show Route
app.get('/pokemon/:id', (req, res) => {
    Pokemon.findById(req.params.id, (err, foundPokemon) => {
        res.render("Show", {
          pokemon: foundPokemon,
        })
      })
  
})


app.use(express.static('public'));

// const pokemon = [ //THIS IS THE CODE USED TO CONNECT DATA TO MONGO DB
//     {name: "bulbasaur", img: "http://img.pokemondb.net/artwork/bulbasaur"},
//     {name: "ivysaur", img: "http://img.pokemondb.net/artwork/ivysaur"},
//     {name: "venusaur", img: "http://img.pokemondb.net/artwork/venusaur"},
//     {name: "charmander", img: "http://img.pokemondb.net/artwork/charmander"},
//     {name: "charizard", img: "http://img.pokemondb.net/artwork/charizard"},
//     {name: "squirtle", img: "http://img.pokemondb.net/artwork/squirtle"},
//     {name: "wartortle", img: "http://img.pokemondb.net/artwork/wartortle"}
//  ];

//THIS CODE WAS ALSO USED TO CONNECT DATA TO MONGO DB
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