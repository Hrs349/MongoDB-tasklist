const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

const router = require("./router-edit-users");

app.use(express.json());
app.use("/users", router.routerUser);
app.use("/task", router.routerTask);



app.get('/', (req,res) =>{
  res.send('BIENVENIDOS A LA LISTA DE TAREAS DE hUMBERTO rOJAS')
})
 

app.listen(port, () => {
  console.log("servidor activo");
});
