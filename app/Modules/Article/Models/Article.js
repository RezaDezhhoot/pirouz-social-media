const mongoose = require('mongoose');
const shortid = require("shortid");
const Redis = require("../../../Libraries/Redis");
const {clearCache} = require('../../../../utils/helpers');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true,'عنوان الزامی می باشد'],
    },
    description: {
        type: String,
        trim: true,
    },
    image:{
        type: String,
        required: false,
        trim: true,
    },
    status:{
        type: Boolean,
        default: true,
        enum: [true,false]
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

articleSchema.statics.factory = async function() {
    return await this.create({
        title: 'title',
        description: 'description',
    });
}

articleSchema.pre('findOneAndDelete', async function(next) {
    await clearCache('articles*');
    next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;