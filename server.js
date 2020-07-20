'use strict';

const express = require('express');
const app = express();

require('dotenv').config();
require('ejs');

const superagent = require('superagent');

//below sets the view engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3001;

//middleware
app.use(express.static('./public'));
//if css isnt rendering, try public/styles
app.use(express.urlencoded({extended: true}));


app.get('/hello', renderHello);

function renderHello(request, response){
  response.render('pages/index');
}


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
