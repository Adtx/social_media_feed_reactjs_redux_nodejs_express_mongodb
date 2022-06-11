const Post = require('../models/post');
// const nanoid = require('nanoid');

// post_index, post_details, post_create_get, post_create_post, post_delete


const post_index = (req, res) => {
    Post.find().sort({ createdAt: -1 }) // descending order
        .then((result) => {
            console.log('Retrieved all posts from posts collection')
            res.json( result )
        })
        .catch((err) => console.log(err));
}

/* const post_details = (req, res) => {
    Post.findById(req.params.id)
        .then((result) => res.json( {title: 'Post Details', post: result} ))
        .catch((err) => {
            console.log(err);
            res.json({message: 'Oops can\'t find that'})
        });
}; */

/* const post_create_get = (req, res) => {
    res.json( {title: 'Create blog post'} );
}; */

const post_create_post = (req, res) => {
    let postContent = {
        ...(req.body),
        reactions: {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        },
      };
    let newPost = new Post(postContent);
    newPost.save()
           .then((result) => res.json(result))
           .catch((err) => console.log(err));
};



const post_update = (req, res) => {
    const {id, title, content, user} = req.body;
    Post.findByIdAndUpdate(
        id,
        {title, content, user},
        {new: true}
    )
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};


const post_delete = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then((result) => res.json({ redirect: '/posts'}))
        .catch((err) => console.log(err));
};

module.exports = {
    post_index,
    post_create_post,
    post_update,
    post_delete
};