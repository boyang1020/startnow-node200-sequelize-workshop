
const express = require('express');
const router = express.Router();
const db = require('../db/models');

router.get('/', (req, res) => {
    db.Author
        .findAll()
        .then(authors => {
            res.status(200).json(authors);
        });
});

router.get("/:id", (req, res) => {
    db.Author
    .findById(req.params.id) 
    .then(authors=> { 
        if(authors) {
            return res.status(200).send(authors);
        } else { 
        return res.status(404).send();
        }
        })
    });

router.get('/:id/blogs', (req, res) => {
    db.Blog
        .findAll({where: {authorId: req.params.id}})
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.post('/', (req, res)=>{
    db.Author
        .create(req.body)
        .then(authors => {
            res.status(201).json(authors);
     }); 
});

router.put("/:id", (req, res) => {
    var id1 = req.params.id;
  
    db.Author
      .update(req.body,
        { where: { id: { $eq: id1 } } }
      )
      .then(authors => {
        console.log("Saved the user");
        res.status(204).send(authors);
      });
  });

router.delete("/:id", (req, res) => {
    var id1 = req.param("id");
    var id2 = id1.replace(":", "");
    db.Author
      .findById(id2)
      .then(authors => {
        return authors.destroy();
      })
      .then(() => {
        res.status(200).send();
      })
      .catch(console.error);
  });

module.exports = router;