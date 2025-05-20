const helper = require("../utilities/helpers");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("src/database/database.db");
let sql;


class ProductModel{

  constructor(){
    this.db = db;
    this.createTable();
  }

  createTable(){
    this.db.serialize(()=>{
      this.db.get(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='products'",
        (err,row)=>{
          if(!row){
            const product = `
              CREATE TABLE products (
                product_id INTEGER PRIMARY KEY,
                product_name,
                product_description,
                product_price,
                product_quantity,
                supplier_id,
                product_created_at,
                product_updated_at,
                product_status
              )
            `;
            this.db.run(product);
          }
        }
      );
      this.db.get(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='suppliers'",
        (err,row)=>{
          if(!row){
            const suppliers = `
              CREATE TABLE suppliers (
                suppliers_id INTEGER PRIMARY KEY,
                suppliers_name,
                suppliers_contact_person,
                suppliers_email,
                suppliers_phone,
                suppliers_address,
                suppliers_created_at,
                suppliers_updated_at,
                suppliers_status
              )
            `;
            this.db.run(suppliers);
          }
        }
      );
    });
  }

  async getAllProducts(limit,load_count){
    sql = `
      SELECT *
      FROM
        products
      WHERE
        product_status = 'active'
      ORDER BY
        product_updated_at DESC
      LIMIT ?
      OFFSET ?
    `;
    try{
      const rows = await new Promise((resolve,reject)=>{
        db.all(
          sql,
          [
            limit,
            load_count
          ],
          (err,rows)=>{
            if(err){
              reject(err.message);
              return;
            }else{
              resolve(rows);
            }
          }
        );
      });
      return helper.successResponse(rows);
    }catch(err){
      return helper.httpBadRequest(err.message);
    }
  }

  async getAllProductsCount(){
    sql = `
      SELECT COUNT(*) as total
      FROM products
      WHERE product_status = 'active'
    `;
    try{
      const rows = await new Promise((resolve,reject)=>{
        db.all(
          sql,
          [],
          (err,rows)=>{
            if(err){
              reject(err.message);
              return;
            }else{
              resolve(rows);
            }
          }
        );
      });
      return rows[0].total || 0;
    }catch(err){
      return helper.httpBadRequest(err.message);
    }
  }

  async getProductbyId(id){
    sql = `
      SELECT *
      FROM
        products
      WHERE
        product_id = ?
    `;
    try{
      const row = await new Promise((resolve,reject)=>{
        db.all(sql,[id],(err,row)=>{
          if(err){
            reject(err.message);
          }else{
            resolve(row);
          }
        });
      });
      return helper.successResponse(row);
    }catch(err){
      return helper.httpBadRequest(err.message);
    }
  }

  async updateProductDetailById(name,description,price,quantity,supplier,updatedAt,productId){
    sql = `
      UPDATE products
      SET
        product_name = ?,
        product_description = ?,
        product_price = ?,
        product_quantity = ?,
        supplier_id = ?,
        product_updated_at = ?
      WHERE
        product_id = ?
    `;
    try{
      await new Promise((resolve,reject)=>{
        db.run(sql,
          [
            name,
            description,
            price,
            quantity,
            supplier,
            updatedAt,
            productId
          ],
          (err)=>{
            if(err){
              reject(err.message);
            }else{
              resolve();
            }
          }
        );
      });
      return helper.successResponse(); 
    }catch(err){
      return helper.httpBadRequest(err.message);
    }
  }

  async updateProductStatusById(status,updatedAt,productId){
    sql = `
      UPDATE products
      SET
        product_status = ?,
        product_updated_at = ?
      WHERE
        product_id = ?
    `;
    try{
      await new Promise((resolve,reject)=>{
        db.run(sql,
          [
            status,
            updatedAt,
            productId
          ],
          (err)=>{
            if(err){
              reject(err.message);
            }else{
              resolve();
            }
          }
        );
      });
      return helper.successResponse(); 
    }catch(err){
      return helper.httpBadRequest(err.message);
    }
  }

  async insertProduct(name,description,price,quantity,supplier,createdAt,updatedAt,status){
    sql = `
      INSERT INTO products (
        product_name,
        product_description,
        product_price,
        product_quantity,
        supplier_id,
        product_created_at,
        product_updated_at,
        product_status
      ) VALUES (?,?,?,?,?,?,?,?)
    `;
    try{
      await new Promise((resolve,reject)=>{
        db.run(sql,
          [
            name,
            description,
            price,
            quantity,
            supplier,
            createdAt,
            updatedAt,
            status
          ],
          (err)=>{
            if(err){
              reject(err.message);
            }else{
              resolve();
            }
          }
        );
      });
      return helper.successResponse(); 
    }catch(err){
      return helper.httpBadRequest(err.message);
    }
  }

  async getProductBySupplier(id){
    sql = `
      SELECT *
      FROM
        products
      WHERE
        supplier_id = ? AND
        product_status = 'active'
    `;
    try{
      const row = await new Promise((resolve,reject)=>{
        db.all(sql,[id],(err,row)=>{
          if(err){
            reject(err.message);
          }else{
            resolve(row);
          }
        });
      });
      return helper.successResponse(row);
    }catch(err){
      return helper.httpBadRequest(err.message);
    }
  }

  async updateProductSupplier(id){
    sql = `
      UPDATE products
      SET
        supplier_id = NULL
      WHERE
        product_id = ?
    `;
    try{
      await new Promise((resolve,reject)=>{
        db.run(sql,
          [
            id
          ],
          (err)=>{
            if(err){
              reject(err.message);
            }else{
              resolve();
            }
          }
        );
      });
      return helper.successResponse(); 
    }catch(err){
      return helper.httpBadRequest(err.message);
    }
  }

}

module.exports = ProductModel;