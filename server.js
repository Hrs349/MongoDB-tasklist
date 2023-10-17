const express = require("express");
const app = express();
const env= require('dotenv').config()

const port = process.env.PORT

const router = require("./routers");

app.use(express.json());
app.use("/users", router.routerUser);
app.use("/task", router.routerTask);



app.get('/', (req,res) =>{
  res.send('BIENVENIDOS A LA LISTA DE TAREAS DE hUMBERTO rOJAS')
})
 

app.listen(port, () => {
  console.log("servidor activo");
});
