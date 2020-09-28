const express = require('express');
const app = express();

const fs = require('fs');

const dir = __dirname + '/logs';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const port = 8080;

app.listen(port, () => {
    console.log('App listening on port 8080');
})

app.get('/', (req, res) => {
    fs.appendFileSync(`${dir}/logs.txt`, 'Un acceso a /\n');
    res.status(200).send('Hello World!');
})