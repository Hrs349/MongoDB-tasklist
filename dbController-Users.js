
const { MongoClient, ServerApiVersion } = require("mongodb");
const env = require("dotenv").config()
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
//coneccion a base de datos de usuarios
async function conectarDbUsers() {
  try {
    await client.connect();
    const database = await client.db("DbUsers");
    const collection = await database.collection("Users");
    return collection;
  } catch (error) {
    console.log(error);
  }
}
// mostrar lista de usuasrios
async function ListUsers() {
  try {
    const collection = await conectarDbUsers();
    const lista = await collection.find().toArray();
    return lista;
  } catch (error) {}
}
// Agregar usuarios
async function addUsers(params) {
  try {
    const collection = await conectarDbUsers();
    const userNewData = JSON.parse(params);
    const resultado = await collection.insertOne(userNewData, function (err, res) {
      if (err) throw err;
      console.log("documento insertado");
      return resultado;
    });
    console.log(` se inserto documento ${resultado}`);
    await client.close();
  } catch (err) {
    console.log(err);
  }
}
// consulta por usuarios
async function queryUsers(user) {
  try {
    const collection = await conectarDbUsers();
    const query = { user: user };
    const queryRes = await collection.find(query).toArray();
    console.log("Resultados de la búsqueda:");
    return queryRes;
    await client.close();
  } catch (error) {
    console.log(error);
  }
}
// editar usuarios
async function editUsers(descrip, data) {
  try {
    const collection = await conectarDbUsers();
    const filter = { descripcion: descrip };
    const dataUser = JSON.parse(data);
    const updateUser = await collection.updateOne(filter, { $set: dataUser });
    console.log(`Se modificó ${dataUser.modifiedCount} documento(s)`);
    await client.close();
  } catch (err) {
    console.log(err);
  }
}
// borrar usuarios
async function deleteUser(parametro) {
  try {
    const collection = await conectarDbUsers();
    const filtro = { user: parametro };
    const deluser = await collection.deleteOne(filtro);
    console.log(`Se eliminó ${deluser.deletedCount} documento`);
    return deluser;
    await client.close();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  conectarDbUsers,
  ListUsers,
  addUsers,
  editUsers,
  deleteUser,
  queryUsers,
};
