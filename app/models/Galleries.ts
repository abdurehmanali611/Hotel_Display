import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
    image: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    galleryType: {type: String, required: true, enum: [
        "First Gallery",
        "Second Gallery", 
        "Third Gallery",
        "Fourth Gallery",
        "Fifth Gallery",
        "Sixth Gallery"
    ]}
}, {timestamps: true})

export default mongoose.models.Galleries || mongoose.model("Galleries", GallerySchema)