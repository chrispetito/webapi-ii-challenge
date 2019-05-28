const db = require("./db");

const router = require("express").Router();

//get all posts
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(201).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

//get individual post
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      post.length > 0
        ? res.json({ post })
        : res
            .status(404)
            .json({
              message: "The post with the specified ID does not exist."
            });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//get comments for individual post
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  db.findPostComments(id)
    .then(comments => {
      comments.length > 0
        ? res.json({ comments })
        : res
            .status(404)
            .json({
              message: "The post with the specified ID does not exist."
            });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

//new post
router.post("/", (req, res) => {
  const { title, contents, created_at, updated_at } = req.body;
  db.insert({ title, contents, created_at, updated_at }).then(response => {
    res.status(201).json(response);
  });
});

//new comment
router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { text, post_id, created_at, updated_at } = req.body;
  db.insertComment({ text, post_id, created_at, updated_at }).then(response => {
    res.json(response);
  });
});

//delete individual post
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id).then(response => {
    res.json(response);
  });
});

//modify individual post
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text, post_id, created_at, updated_at } = req.body;
  db.update(id, req.body).then(response => {
    res.json(response);
  });
});

module.exports = router;
