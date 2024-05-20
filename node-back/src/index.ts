const appServer = require('./server');
const dotenv = require('dotenv');
dotenv.config();

let PORT = process.env.PORT;

const HOST = 'localhost';

appServer.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}`));
