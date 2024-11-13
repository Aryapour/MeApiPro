import express from 'express';
import dataRoutes from './api/data.js';

const app = express();
app.use(express.json());  

app.get('/', (req, res) => {
    res.json({ "home": "Home page" });
});

app.get('/index', (req, res) => {
    res.json({ "hello": "Hello World!" });
});

app.use('/data', dataRoutes);

app.listen(3000 , () => {
    console.log('listen to port 3000..')
    
});

export default app;  
