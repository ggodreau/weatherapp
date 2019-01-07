const request = require('request');

let apiKey = '44751b1678aad9b6add25d891de40887';
let city = 'Austin';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

let foo = 23
let bar = 28

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('Hell yea, it\'s', 
        (parseFloat(Math.round(JSON.parse(body).main.temp-273.15)*(9/5)+32).toFixed(1)),
        'degrees in this bitch.');
  }
});




