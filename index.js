const express = require('express')

const postsRouter = require('./blogs/posts-router.js');

const server = express();

server.use(express.json());

server.use('api/posts', postsRouter);


server.get('/', (req, res) => {
    res.send(`Server Running`)
}) 

server.listen(5000, () => {
    console.log(`\n server listening on port 5000 \n` )
})