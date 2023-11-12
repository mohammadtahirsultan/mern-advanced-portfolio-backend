import mongoose from "mongoose";


const testimonialSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Use a regular expression to check if the value contains only alphabetic characters
                return /^[a-zA-Z]+$/.test(value);
            },
            message: props => `${props.value} is not a valid text. Only alphabetic characters are allowed.`,
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    approved: {
        type: Boolean,
        default: false
    }




})


const Testimonial = mongoose.model("Testimonial", testimonialSchema)


export default Testimonial