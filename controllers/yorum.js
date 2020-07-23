const Namba = require('../models/namba');
const Yorum = require('../models/yorum');
const User = require('../models/user');

 module.exports = function(app) {
  // CREATE yorum
app.post("/nambas/:nambaId/yorums", function(req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  const yorum = new Yorum(req.body);
  yorum.author = req.user._id;
  //SAVE INSTANCE OF yorum MODEL TO DB
  yorum
    .save()
    .then(yorum => {
      return Namba.findById(req.params.nambaId);
    })
    .then(namba => {
      namba.yorums.unshift(yorum);
      return namba.save();
    })
    .then(namba => {
      res.redirect(`/nambas/${namba._id}`);
    })
    .catch(err => {
      console.log(err);
    });
   });
  };

