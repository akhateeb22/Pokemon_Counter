const express = require('express')
const app = express()
const port = 3000
const hostname = '0.0.0.0'
const pokemonPath = './src/pokemons.json'
const pokedexPath = './src/pokedex.json'
const cors = require('cors');
const fs = require('fs')
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())

app.listen(port, hostname, () => {
  console.log(`Example app listening on ${hostname}:${port}`)
})

app.get('/pokedex', (req, res) => {
  res.send(getFile(pokedexPath))
})

app.get('/pokemons', (req, res) => {
  res.send(getFile(pokemonPath).pokemons)
})

app.post('/pokemons', (req, res) => {
  if (!req.body) {
    return
  }

  let err = false
  fs.writeFile(pokemonPath, JSON.stringify({ "pokemons": req.body }), (error) => {
    err = error
  })
  
  res.send(err)
})

function getFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}