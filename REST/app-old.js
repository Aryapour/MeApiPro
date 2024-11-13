//import { readFileSync } from 'fs';
//import { createServer } from 'http';
import express from 'express';

const app = express()
app.use(express.json());

import data from './api/data.js';
import index from './api/index.js';

app.use('/' , index)
app.use('/data' , data)


app.listen(3000 , () => {
    console.log('listen to port 3000..')
    
});

//let homepage = readFileSync ('index.html');
//let aboutPage = readFileSync ('about.html');
//let notFoundPage = readFileSync ('notFound.html');

//let server = createServer((req, res) => {

    //if(req.url == '/about')
    //    res.end('the about page')
   // else if (req.url == '/')
    //    res.end('Home page')
    //else {
    //    res.writeHead(404);
    //    res.end('notFoundPage')
  //  }

//});



