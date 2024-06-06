import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
});

const imageModel = mongoose.model('Image', ImageSchema);

export default imageModel;
