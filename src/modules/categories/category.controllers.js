import Category from './category.model';

export async function createCategoty(req, res){
	try{
		const categoty = await Category.createCategory(res.body);
		return res.status(201).json(categoty);
	}catch(e){
		return res.status(400).json(e);
	}
}