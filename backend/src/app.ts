import 'dotenv/config';
import app from './server/server';
import { sequelize } from './models/connectionDb';

import env from './config/env';

(async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log(`Connection to ${env.dbDataBaseName} has been established successfully`);

    app.listen(app.get('port'), () => {
      console.log(`Express Server 🚀 running on PORT ${app.get('port')} - Worker ${process.pid}`);
    });
  } catch (err) {
    console.error('Unable to connect to database', err);
  }
})();
