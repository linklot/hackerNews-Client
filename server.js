const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
	app.use(express.static('static'));
	res.sendFile(path.join(__dirname + '/static/index.html'))
});

app.listen(8090);
