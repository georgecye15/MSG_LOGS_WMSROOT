const { getConnection } = require('../db');

async function insertLogs(logs) {
  const connection = await getConnection();

  const sql = `
    INSERT INTO MSG_LOGS_WMSROOT (TIMESTAMP, NIVEL, COMPONENTE, ORIGEN, MENSAJE)
    VALUES (:timestamp, :nivel, :componente, :origen, :mensaje)
  `;

  const binds = logs.map(log => ({
    timestamp: log.timestamp,
    nivel: log.nivel,
    componente: log.componente,
    origen: log.origen,
    mensaje: log.mensaje
  }));

  const options = { autoCommit: true };

  try {
    await connection.executeMany(sql, binds, options);
    console.log(`✅ Insertados ${binds.length} logs en Oracle`);
  } catch (err) {
    console.error('❌ Error insertando logs:', err.message);
  } finally {
    await connection.close();
  }
}

module.exports = { insertLogs };
