const partidosCtrl = {};



partidosCtrl.renderPartidos =async (req, res) => {
   const client = await req.pool.connect()
    try {
    const partidos = await Partido.query('SELECT * FROM partidos WHERE status = $1 order by fecha asc', [0,1,2,3,4,5])
     var id_partido = res.rows[db_row].id_partido
     var nombre_local = res.rows[db_row].nombre_local
     var nombre_visitante = res.rows[db_row].nombre_visitante
     var fecha = res.rows[db_row].fecha
     partidos={id_partido, nombre_local, nombre_visitante, fecha}
     res.render('partidos/all-partidos', {partidos});
    } catch (err) {
        console.log(err.stack)
      }
    finally {
      // Make sure to release the client before any error handling,
      // just in case the error handling itself throws an error.
      client.release()
    }
};


module.exports = partidosCtrl;
