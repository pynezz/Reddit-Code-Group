/**
 * In this file goes all the logic for the node backend. No interaction with 
 * the site can be done here. Only serve files(route), run the server, etc.
 */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = 3000 || process.env.PORT;

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname }, (err) => {
        if (err) console.log(err.message);
    });
})



app.get('/styles.css', (req, res) => {
    res.sendFile('./styles.css', { root: __dirname }, (err) => {
        if (err) console.log(err.message);
    });
})

app.get('/api.js', (req, res) => {
    res.sendFile('./api.js', { root: __dirname }, (err) => {
        if (err) console.log(err.message);
    });
})

server.listen(PORT, () => {
    console.log('Listening to port 3000');
})

