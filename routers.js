const express = require("express");
const routerUser = express.Router();
const routerTask = express.Router();
const fnUser = require("./dbController-Users");
const fnTask = require("./dbController-task");
const validar = require("./validation");
const { ObjectId } = require('mongodb')

// ROUTER USUARIOS
routerUser
  .get("/", async (req, res) => {
    try {
      const lista = await fnUser.ListUsers();
      res.status(200).json(lista);
    } catch (error) {
      console.log(error);
    }
  })
  .get("/:user", async (req, res) => {
    const user = req.params.user;
    const usuario = await fnUser.queryUsers(user);
    console.error(usuario);
    res.status(200).json(usuario);
  })

  .delete("/:user", async (req, res) => {
    const user = req.params.user;
    const delUser = await fnUser.deleteUser(user);
    res.status(200).json({ userdeleted: user });
  })
  .post("/",async (req, res) => {
    const usuario = req.body;
    const userjson = JSON.stringify(usuario);
    const createUser = await fnUser.addUsers(userjson);
    res.status(200).json({ createduser: usuario });
  })
  .put("/:user", async (req, res) => {
    const usuario = req.params.user;
    const actualizar = req.body;
    const updatejson = JSON.stringify(actualizar);
    const updateUser = await fnUser.editUsers(usuario, updatejson);
    res.status(200).json({ update: updatejson });
  });

//ROUTER TAREAS

routerTask
  .get("/:id", async (req, res) => {
    try{
    const id = {_id: new ObjectId(req.params.id)};
    console.log(id)
    const tarea = await fnTask.consultarDb(id);
    console.error(tarea);
    res.status(200).json(tarea);}
    catch (error) {
      console.log(error)

    }
  })
  .get( '/', async (req, res) => {
    try {
      const lista = await fnTask.ListaDeTareas();
      res.status(200).json(lista);
    } catch (error) {
      console.log(error);
    }
  })
 
  .delete("/:id", async (req, res) => {
    try {
    const id = {_id: new ObjectId(req.params.id)}
    console.log(id)
    const delTask = await fnTask.eliminarTarea(id);
    res.status(200).json(delTask);
    } catch (error) {
      res.send("Tarea no encontrada")
      console.log(error)
    }
  })

  .put("/:id", (req, res) => {
    const idTask = {_id: new ObjectId(req.params.id)};
    const modificacion = req.body
    const taskedit = JSON.stringify(modificacion);
    const update = fnTask.editarDb(idTask, taskedit);
    res.status(200).json({ update: taskedit });
  })
  .put("/complete/:id", (req, res) => {
    const descrip = {_id: new ObjectId(req.params.id)};
    const complete = fnTask.completeTask(descrip);
    res.status(200).send(`la tarea ${descrip} cambio su estado a completada`);
  })
  .put("/incomplete/:id", (req, res) => {
    const descrip = {_id: new ObjectId(req.params.id)};
    const complete = fnTask.incompleteTask(descrip);
    res.status(200).send(`la tarea ${descrip} cambio su estado a incompleta`);
  })
  .post( async (req, res) => {
    const task = req.body;
    const taskjson = JSON.stringify(task);
    const create = await fnTask.agregarTarea(taskjson);
    res.status(200).json({ createduser: create });
  });

module.exports = { routerUser, routerTask };
