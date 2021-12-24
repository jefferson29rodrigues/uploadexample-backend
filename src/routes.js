const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const Post = require("./models/Post");

routes.get('/welcome', async (req, res) => {
    const welcome = { message: "Hello World! Seja bem vindo!!!" };

    return res.json(welcome);
});

routes.get('/posts', async (req, res) => {
    const posts = await Post.find();

    return res.json(posts);
});

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname, size, key, location: url = "" } = req.file;
    
    const post = await Post.create({
        name: originalname,
        size: size,
        key,
        url,
    });


    return res.json(post);
});

routes.delete('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
});

module.exports = routes;