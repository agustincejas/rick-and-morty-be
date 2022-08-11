const mongoose = require('mongoose');

const MongooseFactory = {
    init: async () => {

        // logger.info('Initializing db connection');

        //const config = await getConfig();

        //TODO CHECK configs
        // mongoose.set('useNewUrlParser', true);
        // mongoose.set('useFindAndModify', false);
        // mongoose.set('useCreateIndex', true);
        // mongoose.set('useUnifiedTopology', true);
        // mongoose.Promise = global.Promise;

        // logger.info(`Non-Prod DB connection string other: ${process.env.dbString}`);
        try {
            await mongoose.connect(process.env.DB_STRING);
            console.log(`Connected to ${process.env.DB_STRING}`);
            console.log(`Database explorer available at: ${process.env.BASE_URL}:8081/db/rick-morty-explorer/`);
        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = MongooseFactory;
