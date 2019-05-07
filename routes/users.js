const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ciao, utenti')
})

// router.get('/personaggi', (req, res) => {
//   res.send('personaggi')
// })

module.exports = router