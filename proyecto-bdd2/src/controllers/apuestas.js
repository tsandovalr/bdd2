const apuestasCtrl = {};


apuestasCtrl.renderApuestaForm = (req, res) => {
   res.render('apuestas/new-apuesta');
};
apuestasCtrl.createNewApuesta = async  (req, res) => {
   const { id_apuesta, id_partido, monto_apuesta, opcion, usuario } = req.body;
    
    const client = await pool.connect()
  try {
    const res = await client.query("insert into apuestas values ($1, $2, $3, $4, $5)", [id_apuesta, id_partido, monto_apuesta, opcion, usuario])
    console.log(res.rows)
  } catch (err) {
      console.log(err.stack)
    }
  finally {
   const apuesta = {id_apuesta, id_partido, monto_apuesta, opcion, usuario}
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release()
  }
   
    req.flash('success_msg', 'Apuesta creada exitosamente!');
    res.redirect('/apuestas')
};
apuestasCtrl.renderApuestas =async (req, res) => {
   const apuestas = await apuesta.lean().sort({createAt : 'desc'});
    res.render('apuestas/all-apuestas', {apuestas});
};
apuestasCtrl.renderEditForm = async(req, res) => {
   req.body;
   res.render('apuestas/new-apuesta');
};
apuestasCtrl.uptadeApuesta =async (req, res) => {
   req.body;
   res.render('apuestas/new-apuesta');
};
apuestasCtrl.deleteApuesta = async(req, res) => {
   req.body;
   res.render('apuestas/new-apuesta');
};

module.exports = apuestasCtrl;
