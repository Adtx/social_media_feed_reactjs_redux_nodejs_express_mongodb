const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: false
    },
    reactions: Schema.Types.Mixed
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;