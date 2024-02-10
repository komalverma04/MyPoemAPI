1.first initialise npm(node package manager) by npm init
2.We have to install express, axios, ejs and body-parser
3.Then touch index.js(for coding which involves defining routes for different HTTP requests and constains data ) server.js (server side coding which manages which route to be rendered on different endpoints and clicks and fetch data from API which is coded in index.js)
4.Then mkdir public(for static files (like stylesheets)) views(for layouts which are ejs files)
5.mkdir public/styles; touch public/styles/main.css
6. touch views/index.ejs(layout of main page) views/editPage.ejs(layout of edit page or add new post page)
7. Setting my express server for API that will run on 4000 port
 const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });
8.make a shayaris array of objects to store all shayaris with id, title and content
9. Make middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


