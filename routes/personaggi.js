const express = require('express');
const router = express.Router();
const characters = require('../data/characters')



const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://dbUser:test@cluster0-aa1jo.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });




// QUery
// chiedi http://localhost:7070/personaggi?colore=giallo&sesso=m
router.get('/', (req, res, next) => {
  client.connect((err) => {
    if(err){
      console.log('err');
    }
    
    console.log('conn');
  })
  
  const db = client.db("servernode");
  const collection = db.collection("personaggi");
  

  


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
  //QUI POSSO COMMENTARE IL NEXT
  //next()
}, (req,res, next) => {

  console.log('FIRE 2')
}


)

// Params
//http://localhost:7070/personaggi/9
router.get('/:id/', (req, res) => {
  
  const id = Number(req.params.id)
  res.json(characters.characters.filter(personaggio => personaggio.id===id))
})


router.post('/form', (req, res) => {
  
  const body = req.body
  const {nome, cognome, occupazione, telefono, indirizzo} = req.body

  const status = {}
  console.log(nome, cognome, occupazione, telefono, indirizzo)

  if (nome) {
    status.code = 'ok'
    status.message = `Benvenuto ${nome}`
  }
  else {
    status.code = 'error'
    status.message = 'nome non valido'
    status.campo = 'nome'
  }
  res.send(status)
})



module.exports = router