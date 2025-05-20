const express = require("express");
const router = express.Router();
const SupplierController = require("../controller/supplierController");
const controller = new SupplierController;

router.get("/supplier-unlimited", async (req,res)=>{
  const data = await controller.getAllSuppliersUnlimited();
  res.json(data);
});

router.post("/supplier", async (req,res)=>{
  const data = await controller.getAllSuppliers(req.body);
  res.json(data);
});

router.get("/supplier/:id", async (req,res)=>{
  const data = await controller.getSupplierById(req.params.id);
  res.json(data);
});

router.post("/add-supplier", async (req,res)=>{
  const response = await controller.createSupplier(req.body);
  res.json(response);
});

router.post("/update-supplier", async (req,res)=>{
  const response = await controller.updateSupplierDetailById(req.body);
  res.json(response);
});

router.post("/delete-supplier", async (req,res)=>{
  const response = await controller.deleteSupplier(req.body);
  res.json(response);
});

module.exports = router;