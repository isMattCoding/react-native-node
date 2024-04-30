const appServer = require('./server');

const HOST = 'localhost';
const PORT = 3000;

appServer.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}`));
