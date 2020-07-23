'use strict';

const express = require('express');
const app = express();
const pg = require('pg');
const methodOverride = require('method-override');

require('dotenv').config();
require('ejs');

const superagent = require('superagent');

//below sets the view engine, now its looking for the views folder
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3001;

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => {
  console.log('ERROR', error);
});

//middleware
// below tells express that any static sites being served are coming from public folder
app.use(express.static('./public'));
//the below parses the form (body parser)
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.get('/', getAllBooks);
app.get('/searches/new', renderNewForm);
app.get('/books/detail/:books_id', getDetailsPage);
app.post('/searches', collectSearchResults);
app.post('/add', addNewBook);
app.put('/detail/:id', updateBookDetails);
app.delete('/detail/:id', deleteBookFromBookshelf);

app.post('/error', errorHandler);


function getAllBooks(request, response){
  let sql = 'SELECT * FROM books;';

  client.query(sql)
    .then(results => {
      let books = results.rows;
      response.status(200).render('pages/index.ejs', {book: books});
    })

}

function renderNewForm(request, response){
  response.render('pages/searches/new');
}

function getDetailsPage(request, response){
  let id = request.params.books_id;

  let sql = 'SELECT * FROM books WHERE id=$1;';
  let safeValues = [id];

  client.query(sql, safeValues)
    .then(results => {
      let theChosenBook = results.rows[0];

      response.status(200).render('pages/books/show', {book: theChosenBook});
    })
}

function collectSearchResults(request, response){
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


function addNewBook(request, response){

  let formData = request.body;

  let sql = 'INSERT INTO books (author, title, isbn, image_url, description) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
  let safeValues = [formData.authors, formData.title, formData.isbn, formData.image_url, formData.description];

  client.query(sql, safeValues)
    .then(results => {
      let id = results.rows[0].id;

      response.status(200).redirect(`books/detail/${id}`);
    }).catch((error) => {
      console.log('ERROR', error);
      response.render('pages/error');
    })
}


function updateBookDetails(request, response){
  let id = request.params.id;

  let {authors, title, isbn, description, bookshelf} = request.body;

  let sql = 'UPDATE books SET author=$1, title=$2, isbn=$3, description=$4, bookshelf=$5 WHERE id=$6;';


  let safeValues = [authors, title, isbn, description, bookshelf, id];

  client.query(sql, safeValues)
    .then(result => {
      response.status(200).redirect('/');
    })

}

function deleteBookFromBookshelf(request, response){
  let id = request.params.id;
  let sql = 'DELETE FROM books WHERE id=$1;';
  let safeValue = [id];
  
  client.query(sql, safeValue)
    .then(result => {
      response.status(200).redirect('/');
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
  this.isbn = obj.industryIdentifiers ? obj.industryIdentifiers[0].identifier : 'No ISBN available';
}



client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  })
