const devConfig = {
	MONGO_URL: 'mongodb://localhost/blogAPI-dev',
	JWT_SECRET: 'secretfordev',
};

const testConfig = {
	MONGO_URL: 'mongodb://localhost/growthapi-test',
};

const productionConfig = {
	MONGO_URL: 'mongodb://localhost/growthapi-prod',
};

const defaultConfig = {
	PORT : process.env.PORT || 3999,
	MONGO_URL: 'mongodb://localhost/growthapi-dev',
};

function envConfig(env){
	switch (env){
		case 'development':
		return devConfig;
		case 'test':
		return testConfig;
		default:
		return productionConfig;
	}
}

export default {
	...defaultConfig,
	...envConfig(process.env.NODE_ENV),
};