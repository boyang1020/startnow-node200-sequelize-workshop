const express = require('express');
const router = express.Router();
const db = require('../db/models');

router.get('/', (req, res) => {
    db.Blog
        .findAll()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    db.Blog
        .findAll({where: {featured: true}})
        .then(blogs => {
            res.status(200).json(blogs);
        });
});


router.get("/:id", (req, res) => {
    db.Blog
    .findById(req.params.id) 
    .then(blogs=> { 
        if(blogs) {
            return res.status(200).send(blogs);
        } else { 
        return res.status(404).send();
        }
        })
    });

router.post('/', (req, res)=>{
    db.Blog
        .create(req.body)
        .then(blog => {
            res.status(201).json(blog);
     }); 
});


router.put("/:id", (req, res) => {
    var id1 = req.params.id;
  
    db.Blog
      .update(req.body,
        { where: { id: { $eq: id1 } } }
      )
      .then(blogs => {
        console.log("Saved the user");
        res.status(204).send(blogs);
      });
  });

// router.delete('/:id', (req,res)=>{
//     db.Blog
//     .findById(req.param.id)
//     .then(blogs => {
//         return blogs.destroy
//     })
//     .then(blogs => {
//         res.status(200).json(blogs);
//     });
// });

router.delete("/:id", (req, res) => {
    var id1 = req.param("id");
    var id2 = id1.replace(":", "");
    db.Blog
      .findById(id2)
      .then(blogs => {
        return blogs.destroy();
      })
      .then(() => {
        console.log("Removed the user");
        res.status(200).send();
      })
      .catch(console.error);
  });

module.exports = router;

