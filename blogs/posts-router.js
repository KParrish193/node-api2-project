const express = require('express');
const Posts = require('../data/db.js')
const router = express.Router();

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Couldn't retrieve posts"
        })
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Posts.findById(id)
    .then(post => {
        !post[0]
        ? res.status(404).json({ errorMessage: "Id does not exist"}))
        : res.status(200).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Couldn't retrieve posts"
        })
    })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params

    Posts.findPostComments(id)
    .then(comment => {
        comment[0]
        ? res.status(200).json(comment)
        : res.status(404).json({ errorMessage: "Comment ID does not exist"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Couldn't retrieve comments"
        })
    })
})

