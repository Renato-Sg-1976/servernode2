const express = require('express')
const app = express()

const users = require('./routes/users')
const personaggi = require('./routes/personaggi')
let port = process.argv[2] || 8080




const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://dbUser:test@cluster0-aa1jo.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });


client.connect(err => {
    if (err){
    console.log('Error occured while connecting to MongoDB Atlas\n',err);
  } 
  console.log('Connected');

  const db = client.db("servernode");
  const collection = db.collection("personaggi");
  
  // read
  client.db("servernode").collection("personaggi").find().toArray(function(err, result){
    if (err) throw err
    const personaggi = result
    console.log(result)
  })

  // insert
  client.db("servernode").collection('personaggi', function(err, collection){  
    const mario = {name:'Arya', lastname:'Stark'};
    collection.insertOne(mario);
    client.db("servernode").collection('personaggi').countDocuments(function (err,count){
      if (err) throw err
      
      console.log('Total Rows: ' + count);
    });
  });


  //update
  client.db("servernode").collection('personaggi', function(err, collection){
    const newOne =  {name:'Pippo', lastname:'Stark', vivo:false, datanascita: '23/02/1976'};
    collection.updateOne({_id: ObjectId("5cd536cd1c9d4400000269df")}, { $set: newOne },
    function(err,result){
      if (err) throw err;
      console.log('Document Update Successfully');
    });
  });


  //delete
  client.db("servernode").collection('personaggi').deleteOne({_id:ObjectId("5cd536cd1c9d4400000269df")},{w:1}, function(err, result){
    if (err) throw err;
    console.log(`Docment removed Successfully: ${result}`);
  });
  client.close();
});
  
  

//sintassi vecchia della versione express v.3 :
app.use(express.urlencoded({extended:false}))

const myLogger =  (req, res, next) =>{
    console.log('LOGGED');
    
  //QUI non POSSO COMMENTARE IL NEXT()
  // e' obbligatorio!
   next ();
  }

app.use(myLogger)
// GLOBALE SU diversi metodi: get, post , delete etc.
app.use('/v0.1/users', users)
app.use('/v0.1/personaggi', personaggi)
app.use('/v0.2/personaggi', personaggi)
//app.use('/v0.2/admin', admin)


app.use((req, res) =>{
    res.status(404).send('what ???')
})



app.listen(port)

console.log(`server running at http://127.0.0.1/${port}`);
