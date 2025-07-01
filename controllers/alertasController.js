const fs = require('fs');
const path = require('path');

exports.getAlertas = (req, res) => {
  console.log('🚨 Entró al endpoint /alertas');

  try {
    const logPath = path.join(__dirname, '..', 'logs', 'log.txt');
    const content = fs.readFileSync(logPath, 'utf-8');
    const lines = content.split('\n').filter(Boolean);

    const lastLines = lines.slice(-500); // puedes ajustar la cantidad

    const errores = lastLines.map(line => {
      const match = line.match(/^\[(.+?)\s*\|\s*(\w+)\s*\|\s*(.*?)\s*\|\s*\|\s*(.*?)\]\s*(.+)$/);
      if (!match) return null;

      const log = {
        timestamp: match[1].trim(),
        nivel: match[2].trim(),
        componente: match[3].trim(),
        origen: match[4].trim(),
        mensaje: match[5].trim()
      };

      return (log.nivel === 'ERROR' || log.nivel === 'FATAL') ? log : null;
    }).filter(Boolean);

    res.status(200).json(errores);
  } catch (err) {
    console.error('❌ Error procesando alertas:', err.message);
    res.status(500).json({ error: 'Error procesando alertas' });
  }
};
