import joi from 'joi'

const subcategoryschema=joi.object({
    name: joi.string().trim().min(2).max(25).required(),
    file:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required(),
    }),
    category: joi.string().hex().length(24).required(),
//     createdBy: joi.string().hex().length(24).required(),
//     updatedBy: joi.string().hex().length(24).required()
})

export default subcategoryschema