const request = require('request');
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 3000

// reference the template index.ejs
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.set('title', 'gregs amazing site')
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))

app.post('/', (req, res) => { 
  console.log(req.body.city);
  let apiKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  request(url, function (err, response, body, city) {
    if(err){
      console.log('error:', error);
    } else {
      console.log('Hell yea, it\'s', 
          (parseFloat(Math.round(JSON.parse(body).main.temp-273.15)*(9/5)+32).toFixed(1)),
          'degrees in this bitch.');
    }
  });
});

app.get('/greg', (req, res) => res.send('greg route'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))





