import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';
import db from './../models'

const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 3000);

db.sequelize.sync().then(() => {
    server.listen(port, () => {
        logger.info(serverStartMsg + port);
    });
})



