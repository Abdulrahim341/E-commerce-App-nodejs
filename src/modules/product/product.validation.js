import joi from 'joi'

const productschema=joi.object({
    title: joi.string().trim().min(2).max(25).required(),
    describtion:joi.string().trim().min(3).max(2500).required(),
    price:joi.number().min(0).required(),
    priceAfterDiscount:joi.number().required(),
    stock:joi.number().min(0).required(),
    sold:joi.number().min(0).default(0),
    rateCount:joi.number().min(0).default(0),
    rateAverage:joi.number().min(0).default(0),
    category: joi.string().hex().length(24).required(),
    subcategory: joi.string().hex().length(24).required(),
    brand: joi.string().hex().length(24).required(),
    // createdBy: joi.string().hex().length(24).required(),
    // updatedBy: joi.string().hex().length(24).required(),
    files:joi.object({
        mainImage:joi.array().items(joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required()
        })),
        coverImages:joi.array().items(joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required()
        }))
    })
}).required()

export default productschema