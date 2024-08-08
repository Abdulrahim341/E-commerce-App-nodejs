import joi from 'joi'

const reviewschema=joi.object({
    comment: joi.string(),
    rate: joi.string().min(0).max(5).required(),
    // user: joi.string().hex().length(24).required(),
    product: joi.string().hex().length(24).required()

})

export default reviewschema