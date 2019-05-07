const express = require('express')
const app = express()
const {settings} = require('./settings.js')
const users = require('./routes/users')
const personaggi = require('./routes/personaggi')
let port = process.argv[2] || 8080


const myLogger =  (req, res, next) =>{
    console.log('LOGGED');
    
  //QUI non POSSO COMMENTARE IL NEXT()
  // e' obbligatorio!
   next ();
  }

  
app.use(myLogger)



app.use('/v0.1/users', users)
app.use('/v0.1/personaggi', personaggi)
app.use('/v0.2/personaggi', personaggi)


app.use((req, res) =>{
    res.status(404).send('what ???')
})



app.listen(port)

console.log(`server running at http://127.0.0.1/${port}`);
