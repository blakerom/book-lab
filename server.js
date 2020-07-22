'use strict';

const express = require('express');
const app = express();
const pg = require('pg');

require('dotenv').config();
require('ejs');

const superagent = require('superagent');

//below sets the view engine, now its looking for the views folder
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3001;

// DATABASE_URL=postgres://jkfbgyafvvmedg:242edfde8c06b212a7f34f6206d46a1c1487131eca241c51c2a231507096ea07@ec2-54-234-44-238.compute-1.amazonaws.com:5432/d8092skbfpsrqb
// DATABASE_URL=postgres://bromero:272727@localhost:5432/books_app

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => {
  console.log('ERROR', error);
});

//middleware
// below tells express that any static sites being served are coming from public folder
app.use(express.static('./public'));
//the below parses the form (body parser)
app.use(express.urlencoded({extended: true}));

app.get('/', getAllBooks);
app.get('/searches/new', renderNewForm);
app.get('/books/detail/:books_id', getDetailsPage);
app.post('/searches', collectSearchResults);
app.post('/error', errorHandler);


function getAllBooks(request, response){
  let sql = 'SELECT * FROM books;';

  client.query(sql)
    .then(results => {
      let books = results.rows;
      response.status(200).render('pages/index.ejs', {book: books});
    })

}

// function renderHomepage(request, response){
//   response.render('pages/index');
// }

function renderNewForm(request, response){
  response.render('pages/searches/new');
}

function getDetailsPage(request, response){
  let id = request.params.books_id;

  let sql = 'SELECT * FROM books WHERE id=$1;';
  let safeValues = [id];

  client.query(sql, safeValues)
    .then(results => {
      console.log('this is the chosen book! ', results.rows);
      let theChosenBook = results.rows[0];

      response.status(200).render('pages/books/show', {book: theChosenBook});
    })
}

function collectSearchResults(request, response){

  console.log('data from form:', request.body);
  let search = request.body.search[0];
  let searchCategory = request.body.search[1];
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  //maxResults default is 10 items

  if(searchCategory === 'title'){url += `+intitle:${search}`}
  if(searchCategory === 'author'){url += `+inauthor:${search}`}

  superagent.get(url)
    .then(results => {
      let bookReturn = results.body.items;

      const bookArray = bookReturn.map(books => {
        return new Book(books.volumeInfo);
      })
      response.render('pages/searches/show.ejs', {searchResults: bookArray})
    })
    .catch((error) => {
      console.log('ERROR', error);
      response.render('pages/error');
    })
}

function errorHandler(request, response){
  response.render('pages/error');
}

function Book(obj){

  let regex = /^http:\/\//i;

  this.thumbnail = obj.imageLinks.thumbnail ? obj.imageLinks.thumbnail.replace(regex, 'https://') : 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = obj.title ? obj.title : 'Title not available';
  this.authors = obj.authors ? obj.authors : 'Author(s) not available';
  this.description = obj.description ? obj.description : 'Description not available';
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
  });
})
