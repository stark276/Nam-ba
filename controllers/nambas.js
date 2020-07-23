const Namba = require('../models/namba');


module.exports = (app) => {

  app.get('/', (req, res) => {
    var currentUser = req.user;

    Namba.find({}).lean()
  .then(nambas => {
    res.render("namba-index", { nambas, currentUser });
  })
  .catch(err => {
    console.log(err.message);
  });
 })

 // NEW FORM
 app.get('/nambas/new/', (req, res) => {
   res.render('nambas-new', {});
 })

  // CREATE
  app.post('/nambas/new', (req, res) => {
    if (req.user) {
    // INSTANTIATE INSTANCE OF POST MODEL
    const namba = new Namba(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    namba.save((err) => {
      // REDIRECT TO THE ROOT
      console.log(err)
      return res.redirect(`/`);
    })
    } else {
    return res.status(401); // UNAUTHORIZED
  }
  });

  app.get("/nambas/:id", function(req, res) {
  // LOOK UP THE POST
  // LOOK UP THE POST
Namba.findById(req.params.id).populate('yorums').then((namba) => {
  res.render('nambas-show', { namba })
  }).catch((err) => {
  console.log(err.message)
    })
  });

  // SUBREDDIT
app.get("/n/:subnamba", function(req, res) {
  Namba.find({ subnamba: req.params.subnamba })
    .then(nambas => {
      res.render("namba-index", { nambas});
    })
    .catch(err => {
      console.log(err);
    });
});

};