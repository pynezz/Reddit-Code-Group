const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

const INDEX = '/index.html';

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + INDEX, (err) => {
        if (err) console.log(err);
    });
})

server.listen(PORT, () => {
    console.log('Web server is running');
});

