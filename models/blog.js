import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    title: String,
    author: {
        type: String,
        default: "0x56e1Bc1192937B25cb8bdc4Ac23d6F63E8F88321"
    },
    shortDescription: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
            required: true
        }
    }
})


const Blog = mongoose.model("blog", blogSchema)


export default Blog