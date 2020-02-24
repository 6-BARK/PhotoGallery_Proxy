const express = require('express')
const axios = require('axios')
const path = require('path');
const morgan = require('morgan');

const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/seed', (req, res) => {
//   axios.get('http://18.223.108.8:3003/seed')
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.log(err)
//     })
// });

app.get('/houses/:id', (req, res) => {
  const houseid = req.params.id
  axios.get(`http://localhost:3004/houses/${houseid}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err)
    })
});

app.get('/user/:userid/UsersSavedHouses/', (req, res) => {
  const userid = req.params.userid
  axios.get(`http://localhost:3004/user/${userid}/UsersSavedHouses/`)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err)
    })
});

app.post('/user/:userid/UsersSavedHouses/house/:houseid', (req, res) => {
  const userid = req.params.userid
  const houseid = req.params.houseid
  axios.post(`http://localhost:3004/user/${userid}/UsersSavedHouses/house/${houseid}`)
  .then(response => {
    res.send(response.data);
  })
  .catch(err => {
    console.log(err)
  })
})

app.post('/user/:userid/houses/:houseid/images/', (req, res) => {
  const userid = req.params.userid
  const houseid = req.params.houseid
  const imgid = Math.floor((Math.random() * 999) + 1);
  axios.post(`http://localhost:3004/user/${userid}/houses/${houseid}/images/`, { imageurl: `https://sdchouseimages.s3-us-west-1.amazonaws.com/SDCimages/${imgid}.jpg` })
  .then(response => {
    res.send(response.data);
  })
  .catch(err => {
    console.log(err)
  })
})
// app.get('/houses', (req, res) => {
//   axios.get('http://18.144.88.205:3004/houses')
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.log(err)
//     })
// });

// app.get('/listings', (req, res) => {
//   axios.get('http://52.53.150.79:3001/listings')
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.log(err)
//     })
// });

// app.get('/api/summary/data/:id', (req, res) => {
//   const id = req.params.id;
//   axios.get(`http://3.17.76.247:3002/api/summary/data/${id}`)
//   .then((response) => {
//     res.send(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))