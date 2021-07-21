const express = require('express');
const app = express();
const port = 3000;
const data = require('./favorites.json');
const fs = require('fs');

app.use(express.static('public'));
app.use(express.json());


app.post('/api/v1/favorites', (req, res) => {
    console.log('I got a post request');
    if (!req.body.data) {
        return res.json({ success: false });
    }
    const updatedData = data;
    updatedData.favorites.push(req.body.data);
    fs.writeFile('./server/favorites.json', JSON.stringify(updatedData), err => {
        if (err) throw err;
        console.log('Received a post fetch request for a new favorite');
        res.json({ success: true });
    });
});
app.get('/api/v1/favorites', (req, res) => {
    console.log('I got a get request');
    res.json({ data });
});

app.get('/', (req, res) => {
    res.send('index.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});