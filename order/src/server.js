import app from "./app";
import logger from "./util/logger";
import configs from "./config";
import connect from "./util/database.connection";

const PORT = configs.port;
const ENVIRONMENT = configs.environment;
const MONGO_URI = configs.mongodb.uri;

// Start the Server
app.listen(PORT, () => {
	logger.info(`✨ Starting on ${ENVIRONMENT} Environment`);
	logger.info(`🔗 ${MONGO_URI}`);
	connect();
	logger.info(`🚀 Order API up and running on PORT ${PORT}`);
});
