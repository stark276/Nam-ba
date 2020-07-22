const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// Set db
require('./data/namba-db');

require('./controllers/nambas.js')(app);
require('./controllers/yorum.js')(app);


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})