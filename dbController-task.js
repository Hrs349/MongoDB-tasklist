const { parse } = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://HRS349:123456789-@cluster0.qmulumk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

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

async function consultarDb(parametro) {
  try {
    const collection = await conectarBaseDatos();
    const consulta = { id: parametro };
    const consultaR = await collection.find(consulta).toArray();
    console.log("Resultados de la búsqueda:");
    return consultaR;
    await client.close();
  } catch (error) {
    console.log(error);
  }
}
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
async function eliminarTarea(parametro) {
  try {
    const collection = await conectarBaseDatos();
    const filtro = { id: parametro };
    const deleteTask = await collection.deleteOne(filtro);
    console.log(`Se eliminó ${deleteTask.deletedCount} documento`);
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
