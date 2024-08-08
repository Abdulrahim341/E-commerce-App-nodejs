import joi from 'joi'

const userchema=joi.object({
    name: joi.string().trim().required(),
    email: joi.string().required(),
    password: joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
    role: joi.string().valid('User', 'admin'),
    wishList:joi.array().items(joi.string()),
    addresses:joi.array().items(joi.string())
})

export default userchema