const express = require('express')
const { success, getUniqueId } =require('./helper.js')

const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
let pokemons = require('./mock-pokemon')
const app=express()
const port = 3000
const logger = (req, res, next) =>
{ console.log(`URL ${req.url}'}`)
 next() 
}
app.use(favicon(__dirname + '/download.ico'))
.use(morgan('dev'))
.use(bodyParser.json())
//app.use(logger);
app.get('/', (req,res)=> res.send('Hello, Express nodemo, !'))
app.get('/api/pokemons/:id',(req,res)=> {
     const id = parseInt(req.params.id);
     const pokemon = pokemons.find(pokemon => pokemon.id === id)
     const message = 'un pokemon trouve'
     res.json(success(message,pokemon))
   
    
})
app.get('/api/pokemons',(req,res)=> {
    const id = parseInt(req.params.id);
    var nbpokemon = pokemons.length;

    const message = `il y a ${nbpokemon}`
       res.json(success(message,pokemons))
})
app.post('/api/pokemons', (req,res)=> {
    const id = getUniqueId(pokemons)
    
    const pokemonCreated = {...req.body, ...{id, created : new Date()}}
    pokemons.push(pokemonCreated)
    const message = `le pokemon ${pokemonCreated.name} a été créé`
    res.json(success(message,pokemonCreated))

})
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
     return pokemon.id === id ? pokemonUpdated : pokemon
    })
     
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
   });
   app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
  });
   
app.listen(port, () => console.log(`Note application est démarré sur htp://localhos:${port}`))