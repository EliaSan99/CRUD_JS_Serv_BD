const controlador = {}


controlador.mostrar = (req, res) => {
    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else {
            conn.query("SELECT * FROM alumnos", (error, success) => {
                if (error)
                    res.json(error);
                else
                    res.render("alumnos.ejs", { data: success });
            });
        }
    });
};

controlador.nuevo = (req, res) => {
    res.render("alumnos_nuevo.ejs");
}

controlador.agregar = (req, res) => {
    //Se debe respetar el orden de los campos en la BD.
    const regAlumno = {
        Matricula: req.body.tfMatricula,
        Nombre: req.body.tfNombre,
        Apellidos: req.body.tfApellidos,
        Ddi: parseInt(req.body.tfDdi, 10),
        Dwi: parseInt(req.body.tfDwi, 10),
        Ecbd: parseInt(req.body.tfEcbd, 10)

    };

    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else {
            conn.query("INSERT INTO alumnos SET ?", [regAlumno], (error, success) => {
                if (error)
                    res.json(error);
                else {
                    res.redirect("/alumnos");
                }

            });
        }

    });
};


controlador.editar = (req, res) => {
    const matri = req.params.Matri;
    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else 
        {
            conn.query("SELECT * FROM alumnos WHERE Matricula=?", [matri], (error, row) => {
                if (error)
                    res.json(error);
                else {
                    res.render("alumnos_editar.ejs", { reg: row });
                }


            });
        }

    });
};

controlador.actualizar = (req, res) => {
    const matri = req.params.Matri;

    //Se debe respetar el orden de los campos en la BD.
    const regAlumno = {
                        Matricula: req.body.tfMatricula,
                        Nombre: req.body.tfNombre,
                        Apellidos: req.body.tfApellidos,
                        Ddi: parseInt(req.body.tfDdi, 10),
                        Dwi: parseInt(req.body.tfDwi, 10),
                        Ecbd: parseInt(req.body.tfEcbd, 10)

                      };

    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else 
        {
            conn.query("UPDATE alumnos SET ? WHERE Matricula=?", [regAlumno,matri], (error,updated) => {
                if (error)
                    res.json(error);
                else {
                    res.redirect("/alumnos");
                }

            });
        }

    });




};

controlador.eliminar = (req, res) => {
    const matri = req.params.Matri;

    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else 
        {
            conn.query("DELETE FROM alumnos WHERE Matricula=?", [matri], (error,deleted) => {
                if (error)
                    res.json(error);
                else {
                    res.redirect("/alumnos");
                }

            });
        }

    });
};


module.exports = controlador;