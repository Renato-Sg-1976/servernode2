const express = require('express');
const router = express.Router();
const characters = require('../data/characters')
// QUery
// chiedi http://localhost:7070/personaggi?colore=giallo&sesso=m
router.get('/', (req, res, next) => {


  const query = req.query
  let personaggi = characters.characters
  if ('lastname' in query) {
    personaggi = personaggi.filter((personaggio) => {
      return personaggio.lastname === query.lastname
    })
  }
  if ('firstname' in query) {
    personaggi = personaggi.filter((personaggio) => {
      return personaggio.firstname === query.firstname
    })
  }

  res.send(personaggi)
  //next()
}, (req,res, next) => {

  console.log('FIRE 2')
}


)

// Params
//http://localhost:7070/personaggi/9
router.get('/:id/', (req, res) => {
  const id = req.params.id
  console.log('ID: ', id)
  res.send(`personaggio id: ${id}`)
})

module.exports = router