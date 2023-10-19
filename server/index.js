const axios = require("axios");
const { saveTeams } = require('./src/Controllers/saveTeams.js');
const server = require("./src/server.js");
const { conn } = require('./src/db.js');
const PORT = 3011;

conn.sync({ force: true }).then(async () => {
  console.log('=================================================================================');
  await saveTeams();

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('=================================================================================');

  })
}).catch(error => console.error(error))
