const express = require("express");
const router = express.Router();
const ProductController = require("../controller/productController");
const controller = new ProductController;

router.post("/inventory", async (req,res)=>{
  const data = await controller.getAllProducts(req.body);
  res.json(data);
});

router.get("/inventory/:id", async (req,res)=>{
  const data = await controller.getProductById(req.params.id);
  res.json(data);
});

router.post("/add-inventory", async (req,res)=>{
  const response = await controller.createProduct(req.body);
  res.json(response);
});

router.post("/update-inventory", async (req,res)=>{
  const response = await controller.updateProductDetailById(req.body);
  res.json(response);
});

router.post("/delete-inventory", async (req,res)=>{
  const response = await controller.deleteProduct(req.body);
  res.json(response);
});

router.post("/supplier-inventory", async (req,res)=>{
  const response = await controller.getProductBySupplier(req.body);
  res.json(response);
});

module.exports = router;