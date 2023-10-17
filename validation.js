const Joi = require("joi");

const validjson = Joi.object({
  user: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
// const { error, value } = schema.validate(data);

//   if (error) {
//     console.error('Error de validación:', error.details);
//   } else {
//     console.log('Datos válidos:', value);
//     // Aquí puedes guardar los datos en la base de datos MongoDB
//   }

// Define un esquema de validación
// const schema = Joi.object({
//     user: Joi.string().min(3).max(30).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required(),
//   });

//   // JSON que deseas validar
//   const data = {
//     user: 'usuarioEjemplo',
//     email: 'usuario@example.com',
//     password: 'contrasenia',
//   };

//   // Realiza la validación
//   const { error, value } = schema.validate(data);

//   if (error) {
//     console.error('Error de validación:', error.details);
//   } else {
//     console.log('Datos válidos:', value);
//     // Aquí puedes guardar los datos en la base de datos MongoDB
//   }
module.exports = validjson;