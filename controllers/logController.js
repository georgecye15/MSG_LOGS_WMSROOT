const fs = require('fs');
const path = require('path');
const { insertLogs } = require('../services/logStorage');

exports.getLogs = async (req, res) => {
  console.log('📥 Entró al endpoint /logs');

  let parsedLogs = [];

  try {
    const logPath = path.join(__dirname, '..', 'logs', 'log.txt');
    const content = fs.readFileSync(logPath, 'utf-8');
    const lines = content.split('\n').filter(Boolean);

    console.log('🧾 Líneas leídas:', lines.length);

    const lastLines = lines.slice(-100);

    parsedLogs = lastLines.map(line => {
      //onst match = line.match(/^\[(.+?)\s*\|\s*(\w+)\s*\|\s*(.+?)\s*\|\s*\|\s*(.+?)\]\s*(.+)$/);
      //const match = line.match(/^\[(.+?)\s*\|\s*(\w+)\s*\|\s*(.*?)\s*\|\s*\|\s*(.*?)\]\s*(.+)$/);
      const match = line.match(/^\[(.+?)\s*\|\s*(\w+)\s*\|\s*(.*?)\s*\|\s*(.*?)\|\s*(.*?)\]\s*(.+)$/);


      if (!match) {
        console.warn('❌ Línea no parseada:', line);
        return null;
      }
      
      return {
        timestamp: match[1].trim(),
        nivel: match[2].trim(),
        componente: match[3].trim(),
        origen: `${match[4].trim()} | ${match[5].trim()}`,
        mensaje: match[6].trim()
      };
      
    }).filter(Boolean);

    // ✅ Enviar la respuesta al cliente solo una vez
    res.status(200).json(parsedLogs);

  } catch (err) {
    console.error('❌ Error leyendo archivo log:', err.message);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Error leyendo archivo log' });
    }
    return; // evitar caída si ya respondió
  }

  // ⚠️ Esta parte va después del res.json y no debe fallar silenciosamente
  try {
    if (parsedLogs.length > 0) {
      await insertLogs(parsedLogs);
    }
  } catch (dbErr) {
    console.error('❌ Error insertando en Oracle:', dbErr.message);
    // No hacer res.status aquí porque ya se respondió al cliente
  }
};
