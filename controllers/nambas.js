const Namba = require('../models/namba');


module.exports = (app) => {

  app.get('/', (req, res) => {
    Namba.find({}).lean()
  .then(nambas => {
    console.log(nambas)
    res.render("namba-index", { nambas });
  })
  .catch(err => {
    console.log(err.message);
  });
 })

 // NEW
 app.get('/nambas/new/', (req, res) => {
   res.render('nambas-new', {});
 })

  // CREATE
  app.post('/nambas/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const namba = new Namba(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    namba.save((err) => {
      // REDIRECT TO THE ROOT
      console.log(err)
      return res.redirect(`/`);
    })
  });

  app.get("/nambas/:id", function(req, res) {
  // LOOK UP THE POST
  Namba.findById(req.params.id)
    .then(namba => {
      // console.log(namba)
      res.render("nambas-show", { namba });
    })
    .catch(err => {
      console.log(err.message);
    });
});

};