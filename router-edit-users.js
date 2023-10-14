const express = require("express");
const router = express.Router();
const fnUser = require("./dbController-Users");
const fnTask = require("./dbController-task");

// ROUTER USUARIOS
router
  .delete("/users/:user", async (req, res) => {
    const user = req.params.user;
    const delUser = await fnUser.deleteUser(user);
    res.status(200).json({userdeleted: user});
  })
  .post("/users", async (req, res) => {
    const usuario = req.body;
    const userjson = JSON.stringify(usuario);
    const createUser = await fnUser.addUsers(userjson);
    res.status(200).json({ createduser: usuario });
  })
  .put("/users/:user", async (req, res) => {
    const usuario = req.params.user;
    const actualizar = req.body;
    const updatejson = JSON.stringify(actualizar);
    const updateUser =await fnUser.editUsers(usuario, updatejson);
    res.status(200).json({ update :updatejson });
  });

//ROUTER TAREAS

router
  .delete("/task/:descripcion", async (req, res) => {
    const taskDelete = req.params.user;
    const delTask = await fnTask.eliminarTarea(taskDelete);
    res.status(200).json(delTask);
  })

  .put("/task/:descripcion", (req, res) => {
    const descripcion = req.params.descripcion;
    const modificacion = req.body;
    const taskedit = JSON.stringify(modificacion);
    const update = fnTask.editarDb(descripcion, taskedit);
    res.status(200).json({update: taskedit});
  })
  .put('/task/complete/:descripcion', (req, res)=>{
    const descrip = req.params.descripcion
    const complete = fnTask.completeTask(descrip)
    res.status(200).send(`la tarea ${descrip} cambio su estado a completada`)
  })
  .put('/task/incomplete/:descripcion', (req, res)=>{
    const descrip = req.params.descripcion
    const complete = fnTask.incompleteTask(descrip)
    res.status(200).send(`la tarea ${descrip} cambio su estado a incompleta`)
  })
  .post('/task', async (req, res) => {
    const task = req.body;
    const taskjson = JSON.stringify(task);
    const create = await fnTask.agregarTarea(taskjson);
    res.status(200).json({ createduser: create });
  });

module.exports = router;
