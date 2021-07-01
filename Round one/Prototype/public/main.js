const express = require('express');
const { env } = require('process');
const app = express();
const server = require('http').createServer(app);
const PORT = 3000 || env.PORT;

const INDEX = '/index.html';
const MUSE = '/muse.js';
const INDEXJS = '/index.js';
const CSS = '/styles.css';

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(INDEX, { root : __dirname }, (err) => {
        if (err) console.log(err);
    });
})

// app.get('/styles.css', (req, res) => {
//     res.sendFile(CSS, {root : __dirname }, (err) => {
//         if (err) console.log(err);
//     });
// })

// app.get('/images/feather1.png', (req, res) => {
//     res.sendFile('/images/feather1.png', { root : __dirname }, (err) => {
//         if (err) console.log(err);
//     });
// })

// app.get('/images/feather2.png', (req, res) => {
//     res.sendFile('/images/feather2.png', { root : __dirname }, (err) => {
//         if (err) console.log(err);
//     });
// })

// app.get('/index.js', (req, res) => {
//     res.sendFile(INDEXJS, {root : __dirname }, (err) => {
//         if (err) console.log(err);
//     });
// })

// app.get('/muse.js', (req, res) => {
//     res.sendFile(MUSE, {root : __dirname }, (err) => {
//         if (err) console.log(err);
//     });
// })

server.listen(PORT, () => {
    console.log('Web server is running');
});

