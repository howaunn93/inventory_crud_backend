const helper = require("../utilities/helpers");
const SupplierModel = require("../model/supplierModel");
const model = new SupplierModel;
const ProductModel = require("../model/productModel");
const productModel = new ProductModel;

class SupplierController{

  getAllSuppliersUnlimited(){
    const data = model.getAllSuppliersUnlimited();
    return data;
  }

  async getAllSuppliers(req){
    const {limit,load_count} = req;
    const data = await model.getAllSuppliers(limit,load_count);
    const total_data = await model.getAllSuppliersCount();
    data.total = total_data;
    return data;
  }

  createSupplier(req){
    const {name,contact_person,email,phone,address} = req;
    return model.insertSupplier(
      name,
      contact_person,
      email,
      phone,
      address,
      helper.currentDatetime(),
      helper.currentDatetime(),
      'active'
    );
  }

  getSupplierById(id){
    const data = model.getSupplierById(id);
    return data;
  }

  updateSupplierDetailById(req){
    const {name,contact_person,email,phone,address,suppliers_id} = req;
    const data = model.updateSupplierDetailById(
      name,
      contact_person,
      email,
      phone,
      address,
      helper.currentDatetime(),
      suppliers_id
    );
    return data;
  }

  async deleteSupplier(req){
    const {id} = req;
    const data = await model.updateSupplierStatusById(
      'deleted',
      helper.currentDatetime(),
      id
    );
    const getProductBySupplier = await productModel.getProductBySupplier(id);
    const product = getProductBySupplier.data;
    for(let i = 0; i < product.length;i++){
      await productModel.updateProductSupplier(product[i].product_id);
    }
    return data;
  }
  
}

module.exports = SupplierController;