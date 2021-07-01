const app = require('express')();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

const INDEX = '/index.html';
const MUSE = '/muse.js';
const INDEXJS = '/index.js';
const CSS = '/styles.css';

app.get('/', (req, res) => {
    res.sendFile(__dirname + INDEX, (err) => {
        if (err) console.log(err);
    });
})

app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + CSS, (err) => {
        if (err) console.log(err);
    });
})

app.get('/images/feather1.png', (req, res) => {
    res.sendFile(__dirname + '/images/feather1.png', (err) => {
        if (err) console.log(err);
    });
})

app.get('/images/feather2.png', (req, res) => {
    res.sendFile(__dirname + '/images/feather2.png', (err) => {
        if (err) console.log(err);
    });
})

app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + INDEXJS, (err) => {
        if (err) console.log(err);
    });
})

app.get('/muse.js', (req, res) => {
    res.sendFile(__dirname + MUSE, (err) => {
        if (err) console.log(err);
    });
})

server.listen(PORT, () => {
    console.log('Web server is running');
});

