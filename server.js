const request = require('request');
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 3000
let content = 'foo';

// reference the template index.ejs
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.set('title', 'gregs amazing site')
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index', {temp: null, content: null}))
app.post('/', (req, res) => { 
  console.log(req.body.city);
  let apiKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  request(url, function (err, response, body, city) {
    if(err){
      res.render('error');
    } else {
      let content = JSON.stringify(JSON.parse(body));
      let temp = 'its' + (parseFloat(Math.round(JSON.parse(body).main.temp-273.15)*(9/5)+32).toFixed(1)) + 'degrees F in this bitch.'
      console.log(temp, content);
        if(temp == undefined){
          res.render('error');
        }
        else {
          res.render('index', {temp: temp, content: content});
        }
      }
  });
});

app.get('/greg', (req, res) => res.send('greg route'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))





