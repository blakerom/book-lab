# Book Lab

**Author**: Tia Low & Blake Romero

**Version**: 1.11.02 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
We are building an application that allows a user to search book titles from the Google Books API and display the relevant information back to them in a simple and easy to read way. 

## Getting Started
- User should install libraries
- Create .env file to hold keys, see envSamples for what's needed
- Create database postgresql
- Setup database table books.sql:
  - CREATE TABLE books(
      id SERIAL PRIMARY KEY,
      author VARCHAR(255),
      title VARCHAR(255),
      isbn VARCHAR(255),
      image_url VARCHAR(255),
      description TEXT,
      bookshelf TEXT);
- 


## Architecture
Libraries:
  - express
  - dotenv
  - superagent
  - ejs

## Change Log
07-20-2020 2:45pm - Scaffolded file structure and a basic server.js and index.ejs. Added simple css to test funcitonality, successfully deployed to Heroku. 

07-20-2020 3:15pm - Added functionality and route for search form, deploying to Heroku to check functionality.  

07-20-2020 5:55pm - Added functionality and route for a book search using a request to the Google Books API. Rendered results to page, deploying to Heroku to check functionality. 

07-20-2020 9:56pm - Added styling to pages and fixed pathing issues.

<!-- 07-20-2020 :pm -  -->



## Credits and Collaborations
- Using regex to prevent mixed content
  - https://stackoverflow.com/questions/5491196/rewriting-http-url-to-https-using-regular-expression-and-javascript



## Feature Tasks - Time Estimates

1. Lab 11 - Quick UI

Estimate of time needed to complete: 1 hr

Start time: 2:15pm

Finish time: 2:45pm

Actual time needed to complete: 30 mins
<hr>


2. Lab 11 - Google Books API Search

Estimate of time needed to complete: 45 mins

Start time: 2:50pm

Finish time: 3:15pm

Actual time needed to complete: 25 mins
<hr>


3. Lab 11 - Display Search Results

Estimate of time needed to complete: 1 hr

Start time: 3:35pm

Finish time: 5:55pm

Actual time needed to complete: 2 hrs 20 mins
<hr>


4. Lab 11 - Error Messages

Estimate of time needed to complete: 30 min

Start time: 6:05pm

Finish time: 6:45pm

Actual time needed to complete: 40 min
<hr>


5. Lab 11 - Cleanup UI

Estimate of time needed to complete: 45 min

Start time: 6:50 pm

Finish time: 9:55pm

Actual time needed to complete: 
<hr>


6. Lab 11 - Homepage

Estimate of time needed to complete: 15min

Start time: 9:55pm

Finish time: 9:56pm

Actual time needed to complete: 1 min
<hr>


7. Lab 12 - Save Books

Estimate of time needed to complete: 90min

Start time: 

Finish time: 

Actual time needed to complete: 
<hr>


8. Lab 12 - View Details Page

Estimate of time needed to complete: 90min

Start time: 

Finish time: 

Actual time needed to complete: 
<hr>


9. Lab 12 - Add Books to DB

Estimate of time needed to complete: 60min

Start time: 

Finish time: 

Actual time needed to complete: 
<hr>


10. Lab 12 - App consistency

Estimate of time needed to complete: 90min

Start time: 

Finish time: 

Actual time needed to complete: 
<hr>


11. Lab 12 - Clean UI

Estimate of time needed to complete: 30min

Start time: 

Finish time: 

Actual time needed to complete: 
<hr>

