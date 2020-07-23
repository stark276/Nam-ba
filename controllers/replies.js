var Namba = require("../models/namba");
var Yorum = require("../models/yorum");
var User = require("../models/user");

module.exports = app => {
  // NEW REPLY
  app.get("/nambas/:nambaId/yorums/:yorumId/replies/new", (req, res) => {
    let namba;
    Namba.findById(req.params.nambaId)
      .then(p => {
        namba = p;
        return Yorum.findById(req.params.yorumId);
      })
      .then(yorum => {
        res.render("replies-new", { namba, yorum });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  /// CREATE REPLY
app.post("/nambas/:nambaId/yorums/:yorumId/replies", (req, res) => {
    const reply = new Yorum(req.body);
    reply.author = req.user._id
    Namba.findById(req.params.nambaId)
        .then(namba => {
            Promise.all([
                reply.save(),
                Yorum.findById(req.params.yorumId),
            ])
                .then(([reply, yorum]) => {
                    yorum.yorums.unshift(reply._id);

                    return Promise.all([
                        yorum.save(),
                    ]);
                })
                .then(() => {
                    res.redirect(`/nambas/${req.params.nambaId}`);
                })
                .catch(console.error);
            return namba.save();
        })
});
};