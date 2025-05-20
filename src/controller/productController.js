const helper = require("../utilities/helpers");
const ProductModel = require("../model/productModel");
const model = new ProductModel;

class ProductController{

  async getAllProducts(req){
    const {limit,load_count} = req;
    const data = await model.getAllProducts(limit,load_count);
    const total_data = await model.getAllProductsCount();
    data.total = total_data;
    return data;
  }

  createProduct(req){
    const {name,description,price,quantity,supplier} = req;
    return model.insertProduct(
      name,
      description,
      price,
      quantity,
      supplier,
      helper.currentDatetime(),
      helper.currentDatetime(),
      'active'
    );
  }

  getProductById(id){
    const data = model.getProductbyId(id);
    return data;
  }

  updateProductDetailById(req){
    const {name,description,price,quantity,supplier,productId} = req;
    const data = model.updateProductDetailById(
      name,
      description,
      price,
      quantity,
      supplier,
      helper.currentDatetime(),
      productId
    );
    return data;
  }

  deleteProduct(req){
    const {id} = req;
    const data = model.updateProductStatusById(
      'deleted',
      helper.currentDatetime(),
      id
    );
    return data;
  }

  getProductBySupplier(req){
    const {id} = req;
    const data = model.getProductBySupplier(id);
    return data;
  }

}

module.exports = ProductController;