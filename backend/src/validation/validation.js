const Joi = require('joi');

// Define Joi validation schema for contact details
const contactSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username:Joi.string().required(),
    email   :Joi.string().required(),
    password: Joi.string().required(), 
    email: Joi.string().email().required(),
  
});

module.exports = { contactSchema };
