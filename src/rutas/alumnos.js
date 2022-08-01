const express = require('express');
const route = express.Router();
const controladorAlumno = require("../controladores/controladorAlumno");

route.get("/",                     controladorAlumno.mostrar);
route.get("/nuevo",                  controladorAlumno.nuevo);
route.post("/agregar",             controladorAlumno.agregar);
route.get("/editar/:Matri",         controladorAlumno.editar); //localhost:8000/alumnos/editar/5714000155
route.post("/actualizar/:Matri", controladorAlumno.actualizar);
route.get("/eliminar/:Matri",      controladorAlumno.eliminar);

module.exports= route; 