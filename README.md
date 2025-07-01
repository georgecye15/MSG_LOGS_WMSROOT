
# Backend para Análisis de Logs WMS

Este proyecto es una API REST construida con Node.js y Express, diseñada para procesar y analizar logs generados por un sistema tipo WMS. Los logs se leen desde un archivo local y se insertan en una base de datos Oracle para su posterior consulta y análisis.


#MOCKUP DE DATA GENERADA LOCALMENTE SIMULANDO DATOS INSERTADOS Y TOMADOS DEL LOG DE ERRORES DEL SERVIDOR 
https://claude.ai/public/artifacts/e003d4ac-8819-4207-bea3-7c856ec4225c

## ⚙️ Requisitos

- Node.js >= 18
- Oracle Database (por ejemplo XE)
- Oracle Instant Client o cliente compatible

## 🚀 Instalación y ejecución

1. Clona el repositorio
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con este contenido:

   ```env
   PORT=3000
   DB_USER=SYSTEM
   DB_PASSWORD=tu_clave
   DB_CONNECT_STRING=127.0.0.1:1521/XE
   ```

4. Ejecuta el servidor:

   ```bash
   node app.js
   ```

## 📂 Estructura del proyecto

```
.
├── app.js
├── controllers/
│   ├── logController.js
│   └── alertasController.js
├── routes/
│   ├── logs.js
│   └── alertas.js
├── services/
│   └── logStorage.js
├── db.js
├── logs/
│   └── log.txt
├── .env
└── README.md
```

## 📬 Endpoints disponibles

- `GET /logs`  
  Devuelve los últimos 100 registros parseados desde el archivo de logs.

- `GET /alertas`  
  Devuelve los registros de tipo `ERROR` o `CRITICAL` desde el archivo de logs.

## 🛢 Tabla en Oracle

Tabla: `MSG_LOGS_WMSROOT`

Columnas:

- `ID` (autogenerado)
- `TIMESTAMP`
- `NIVEL`
- `COMPONENTE`
- `ORIGEN`
- `MENSAJE`
- `FECHA_INSERT`

## ✍️ Autor

George Garzón
