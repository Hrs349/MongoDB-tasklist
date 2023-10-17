const { parse } = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function conectarBaseDatos() {
  try {
    await client.connect();
    const database = await client.db("ListaDeTareas");
    const collection = await database.collection("tareas");
    return collection;
  } catch (error) {
    console.log(error);
  }
}
async function ListaDeTareas() {
  try {
    const collection = await conectarBaseDatos();
    const lista = await collection.find().toArray();
    return lista;
  } catch (error) {}
}
async function consultarDb(parametro) {
  try {
    const collection = await conectarBaseDatos();
    const consultaR = await collection.find(parametro).toArray();
    console.log(parametro)
    console.log("Resultados de la búsqueda:");
    return consultaR;
    await client.close();
  } catch (error) {
    console.log(error);
  }
}
async function agregarTarea(nTask) {
  try {
    const collection = await conectarBaseDatos();
    const nueva = JSON.parse(nTask)
    const resultado = await collection.insertOne(nueva);
   return (` se inserto documento ${nueva}`);
    await client.close;
  } catch (err) {
    console.log(err);
  }
}


// editar tarea
async function editarDb(params, req) {
  try {
    const collection = await conectarBaseDatos();
    const filtro = { descripcion: params };
    const requ = JSON.parse(req);
    const actualizar = await collection.updateOne(filtro, {
      $set: requ,
    });
    console.log(`Se modificó ${actualizar.modifiedCount} documento(s)`);
    await client.close();
  } catch (err) {
    console.log(err);
  }
}
//cambiar a completa
async function completeTask(params) {
  try {
    const collection = await conectarBaseDatos();
    const filtro = { descripcion: params };
    const actualizar = await collection.updateOne(filtro, {
      $set: { completado: true },
    });
    return `la tarea ${filtro} ha sido completada `;
    await client.close();
  } catch (err) {
    console.log(err);
  }
}
//cambiar a incompleta
async function incompleteTask(params) {
  try {
    const collection = await conectarBaseDatos();
    const filtro = { descripcion: params };
    const actualizar = await collection.updateOne(filtro, {
      $set: { completado: false },
    });
    return `la tarea ${filtro} ha sido completada `;
    await client.close();
  } catch (err) {
    console.log(err);
  }
}
// eliminar tarea
async function eliminarTarea(parametro) {
  try {
    const collection = await conectarBaseDatos();
    const deleteTask = await collection.deleteOne(parametro);
    client.close();
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  conectarBaseDatos,
  agregarTarea,
  consultarDb,
  eliminarTarea,
  editarDb,
  ListaDeTareas,
  completeTask,
  incompleteTask
};