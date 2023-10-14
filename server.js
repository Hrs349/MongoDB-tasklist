const express = require("express");
const app = express();
const port = 3000;
const fnTask = require("./dbController-task");
const fnUser = require("./dbController-Users");
const router = require("./router-edit-users");

app.use(express.json());
app.use(router);
app.get("/users", async (req, res) => {
  try {
    const lista = await fnUser.ListUsers();
    res.status(200).json(lista);
  } catch (error) {
    console.log(error);
  }gi
});
app.get("/task", async (req, res) => {
  try {
    const lista = await fnTask.ListaDeTareas();
    res.status(200).json(lista);
  } catch (error) {
    console.log(error);
  }
});

app
  .get("/task/:id", async (req, res) => {
    const id = req.params.id;
    const tarea = await fnTask.consultarDb(id);
    console.error(tarea);
    res.status(200).json(tarea);
  })
  .get("/users/:user", async (req, res) => {
    const user = req.params.user;
    const usuario = await fnUser.queryUsers(user);
    console.error(usuario);
    res.status(200).json(usuario);
  });

app.listen(port, () => {
  console.log("servidor activo");
});
