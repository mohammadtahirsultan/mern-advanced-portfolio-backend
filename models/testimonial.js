import mongoose from "mongoose";


const testimonialSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Use a regular expression to check if the value contains only alphabetic characters and/or numeric values
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: props => `${props.value} is not a valid string. Only alphabetic characters and numeric values are allowed.`,
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