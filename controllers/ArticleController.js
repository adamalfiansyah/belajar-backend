import Article from "../models/Article.js"

const index = async (req, res) => {
    try {        
        const article = await Article.find({})

        return res.status(200).json({
            success : true,
            article
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error
        })
    }
}

const store = async (req, res) => {
    try {
        const newArticle = new Article({
            title   : req.body.title,
            content : req.body.content
        })
        
        const article = await newArticle.save()

        return res.status(200).json({
            success : true,
            message : 'Article ' + article.title + ' berhasil dibuat'
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error
        })
    }
}

export default { index, store }