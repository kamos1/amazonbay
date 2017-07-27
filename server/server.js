const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const routes = require('./routes')

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use('/', routes)

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => response.sendFile(path.join(__dirname, '../public/index.html')));

app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}`);
});

module.exports = app;