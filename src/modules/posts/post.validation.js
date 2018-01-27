import Joi from 'joi';

export default {
	createPost:{
		body: {
			title: Joi.string().min(3).required(),
			body: Joi.string().min(5).required(),
		},
	},
	updatePost:{
		body: {
			title: Joi.string().min(3),
			body: Joi.string().min(5),
		},
	},
};