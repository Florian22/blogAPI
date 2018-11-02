import express from 'express';
import cors from 'cors';
import constants from './config/constants';
import './config/dbconfig';
import middlewaresConfig from './config/middlewares';
import apiRoutes from './modules';

const app = express();
app.use(cors());
middlewaresConfig(app);

app.get('/', (req,res) => {
	res.send('Hello world!');
});

apiRoutes(app);

app.listen(constants.PORT, err => {
 if(err){
 	throw err;
 }else{
 	console.log(`
 			Server running on port: ${constants.PORT}
 			------
 			Running on ${process.env.NODE_ENV}
 		`)
 }
});