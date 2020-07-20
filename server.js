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
app.use(express.urlencoded({extended: true}));


app.get('/', renderHomepage);
app.get('/searches/new', renderNewForm);


function renderHomepage(request, response){
  response.render('pages/index');
}

function renderNewForm(request, response){
  response.render('pages/searches/new');
}


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
