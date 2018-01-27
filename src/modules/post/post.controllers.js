import Post from './post.model';
import HTTPStatus from 'http-status';

export async function createPost(req, res){
	try{
		const post = await Post.createPost(res.body);
		return res.status(HTTPStatus.CREATED).json(post);
	}catch(e){
		return res.status(400).json(e);
	}
}

export async function getPostById(req, res){
	try{
		const post = await Post.findById(req.params.id);
		return res.status(201).json(post);
	}catch(e){
		return res.status(400).json(e);
	}
}

export async function getPostsList(req, res){
	const limit = parseInt(req.query.limit,0);
	const skip = parseInt(req.query.skip,0);
	try{
		const posts = await Post.list({skip, limit});
		return res.status(201).json(posts);
	}catch(e){
		return res.status(400).json(e);
	}
}

export async function updatePost(req, res){
	try{
		const post = await Post.findById(res.params.id);
		//Control right on the post
		if(!post.user.equals(req.user_id)){ //Post user = currentUser
			return res.sendStatus(HTTPStatus.UNAUTHORIZED);
		}
		Object.keys(req.body).forEach(key => {
			post[key] = req.body[key];
		}); //Object to array
		return res.status(HTTPStatus.OK).json(await post.save()); //Persist in the database
	}catch(e){
		return res.status(400).json(e);
	}
}

export async function removePostById(req, res){
	try{
		const post = await Post.findById(res.params.id);
		//Control right on the post
		if(!post.user.equals(req.user_id)){ //Post user = currentUser
			return res.sendStatus(HTTPStatus.UNAUTHORIZED);
		}
		await post.remove();
		return res.sendStatus(HTTPStatus.OK);
	}catch(e){
		return res.status(400).json(e);
	}
}