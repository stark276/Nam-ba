const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var exphbs = require('express-handlebars');


// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Set db
require('./data/namba-db');

require('./controllers/nambas.js')(app);


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})