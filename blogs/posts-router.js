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
        ? res.status(404).json({ errorMessage: "ID does not exist"})
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
        : res.status(404).json({ errorMessage: "ID does not exist"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Couldn't retrieve comments"
        })
    })
})


router.post('/', (req, res) => {
    const payload = req.body

    !payload.title || !payload.contents
    ? res.status(400).json({errorMessage: "Please include Title and Content for post"})
    : Posts.insert(payload)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Error saving post"
        })
    })
})


router.post('/:id/comments', (req, res) => {
    const { id } = req.params
    const payload = {...req.body, post_id: id}

    if(payload.text){
    Posts.findById(id)
    .then(post => {
        !post[0]
        ? res.status(404).json({ errorMessage: "ID does not exist"})
        : Posts.insertComment(payload)
            .then(comment => {
            res.status(201).json(comment)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    errorMessage: "Error saving to the database"
                })
            })
    .catch (err => {
        res.status(500).json ({ errorMessage: "Couldn't be retrieved" })
    })
    })
    }else{
        res.status(400).json({errorMessage: "Please provide text for the comment"})
    }
})

router.delete("/:id", (req, res) => {
    const { id } = req.params

    Posts.remove(id)
        .then(removedPost => {
            removedPost === 1
            ? res.status(200).json(removedPost)
            : res.status(404).json({ errorMessage: "Post ID to delete doesn't exist"})
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Couldn't remove post"})
        })
})

