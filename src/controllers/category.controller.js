const { validateBody } = require("../helpers/validator");
const categoryModel = require("../models/category.model");

//todo: @desc:create category
exports.createCategory = async (req, res) => {
  try {
    const { emptyBody, fieldName } = validateBody(req);
    console.log(emptyBody);
    if (emptyBody) {
      return res.status(401).json({
        msg: `${fieldName} is missing `,
      });
    }

    //isExsist categoryName
    const CategoryExsist = await categoryModel.findOne({
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    });
    if (CategoryExsist) {
      return res.status(401).json({
        msg: `${req.body.categoryName} already exsists`,
      });
    }

    console.log(req.body);

    //todo:save the category in db
    const category = new categoryModel({
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    });

    await category.save();

    if (!category) {
      return res.status(401).json({
        msg: `${req.body.categoryName} Create Failed missing `,
      });
    }

    //todo:for postman
    res.status(200).json({
      msg: "category created successfully",
    });
  } catch (error) {
    console.log("error from create category controller", error);
    res.status(401).json({
      msg: "error from create category controller",
      error: error,
    });
  }
};


//todo: @desc:get all category
exports.getAllCategory=async (_,res)=>{
    try{
      const allCategory= await categoryModel.find({})//todo:query in database and kono category r kono extra info delete korte chaile for example  find({}).select('-__v')
      if(!allCategory){
        return res.status(401).json({
            msg:"no category found"
        })
      }else{
        return res.status(200).json({
            msg:"all category found successfully",
            data:allCategory,//todo:show all category
            status:200
        })
      }

    }catch(error){

        console.log("error from get all category controller",error)

        return res.status(501).json({
            msg:'error from get all category controller',
        })

    }
}

//todo: @desc:get single category by name

exports.getSingleCategory=async(req,res)=>{

    try{

        // console.log(req.params.name);
    const {name}=req.params;
        if(!name){
            return res.status(401).json({
                msg:"category name is missing",
            })
        }

       const category= await categoryModel.findOne({categoryName:name});//query
       if(!category){
        return res.status(401).json({
            msg:`no category found with this name ${name}`
        })
       }

       return res.status(200).json({
        msg:`category found successfully !!! `,
        data:category,
        status:"ok"
       })

    }catch(error){
        console.log("error from get single category controller",error)
        return res.status(501).json({
            msg:'error from get single category controller',
            error:error
        })
    }

}


//todo:@desc:update category by id

exports.updateCategory=async(req,res)=>{
    try{
        const {id}=req.params;
        const category=await categoryModel.findOne({_id:id})
        console.log(category);


        category.categoryName=req.body.categoryName || category.categoryName
        category.categoryDescription=req.body.categoryDescription ||  category.Description
        category.isActive=req.body.isActive || category.isActive

        //todo:saving the updated info in the database
        await category.save();

        return res.status(200).json({
            msg:"category updated successfully",
            data:category,
            status:"ok"
        })
        


    }catch(error){
        console.log("error from update category controller",error)
        return res.status(501).json({
            msg:`error from update category controller`,
            error:error
        })
    }
}


//todo:@desc:delete category by id

exports.deleteCategory=async(req,res)=>{
    try{

        const {id}=req.params
        const category=await categoryModel.findOneAndDelete({_id:id})
        if(!category){
            return res.status(501).json({
                msg:`category not found with this id ${id}`,
                error:error
            })
        }else{
            return res.status(200).json({
                msg:"category deleted successfully",
                status:"ok"
            })
        }

        

    }catch(error){
        console.log('error from delete category controller',error);
        return res.status(501).json({
            msg:`error from delete category controller`,
            error:error
        })
    }
}