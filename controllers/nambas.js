const Namba = require('../models/namba');
const User = require('../models/user');


module.exports = (app) => {

  app.get('/', (req, res) => {
    var currentUser = req.user;

    Namba.find({}).populate('author')
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
    app.post("/nambas/new", (req, res) => {
        if (req.user) {
            var namba = new Namba(req.body);
            namba.author = req.user._id;

            namba
                .save()
                .then(namba => {
                    return User.findById(req.user._id);
                })
                .then(user => {
                    user.nambas.unshift(namba);
                    user.save();
                    // REDIRECT TO THE NEW namba
                    res.redirect(`/nambas/${namba._id}`);
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });
// SHOW
  app.get("/nambas/:id", function(req, res) {
    var currentUser = req.user;
// LOOK UP THE namba
  Namba.findById(req.params.id).populate('yorums').lean()
// populate({path:'yorums', populate:{path:'author'}}).populate('author')
.then((namba) => {
  res.render('nambas-show', { namba })
  }).catch((err) => {
  console.log(err.message)
    })
  });

  // SUBREDDIT
app.get("/n/:subnamba", function(req, res) {
  var currentUser = req.user;
  Namba.find({ subnamba: req.params.subnamba }).lean()
  // populate('author')
    .then(nambas => {
      res.render("namba-index", { nambas});
    })
    .catch(err => {
      console.log(err);
    });
});

};