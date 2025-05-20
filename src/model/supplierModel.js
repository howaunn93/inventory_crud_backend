const helper = require("../utilities/helpers");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("src/database/database.db");
let sql;

class SupplierModel{

  constructor(){
    this.db = db;
  }

  async getAllSuppliersUnlimited(){
    sql = `
      SELECT *
      FROM
        suppliers
      WHERE
        suppliers_status = 'active'
      ORDER BY
        suppliers_updated_at DESC
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
      return helper.successResponse(rows);
    }catch(err){
      return helper.httpBadRequest(err.message);
    }
  }

  async getAllSuppliers(limit,load_count){
    sql = `
      SELECT *
      FROM
        suppliers
      WHERE
        suppliers_status = 'active'
      ORDER BY
        suppliers_updated_at DESC
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

  async getAllSuppliersCount(){
    sql = `
      SELECT COUNT(*) as total
      FROM suppliers
      WHERE suppliers_status = 'active'
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

  async getSupplierById(id){
    sql = `
      SELECT *
      FROM
        suppliers
      WHERE
        suppliers_id = ?
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

  async updateSupplierDetailById(name,contactPerson,email,phone,address,updatedAt,supplierId){
    sql = `
      UPDATE suppliers
      SET
        suppliers_name = ?,
        suppliers_contact_person = ?,
        suppliers_email = ?,
        suppliers_phone = ?,
        suppliers_address = ?,
        suppliers_updated_at = ?
      WHERE
        suppliers_id = ?
    `;
    try{
      await new Promise((resolve,reject)=>{
        db.run(sql,
          [
            name,
            contactPerson,
            email,
            phone,
            address,
            updatedAt,
            supplierId
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

  async updateSupplierStatusById(status,updatedAt,supplierId){
    sql = `
      UPDATE suppliers
      SET
        suppliers_status = ?,
        suppliers_updated_at = ?
      WHERE
       suppliers_id = ?
    `;
    try{
      await new Promise((resolve,reject)=>{
        db.run(sql,
          [
            status,
            updatedAt,
            supplierId
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

  async insertSupplier(name,contactPerson,email,phone,address,createdAt,updatedAt,status){
    sql = `
      INSERT INTO suppliers (
        suppliers_name,
        suppliers_contact_person,
        suppliers_email,
        suppliers_phone,
        suppliers_address,
        suppliers_created_at,
        suppliers_updated_at,
        suppliers_status
      ) VALUES (?,?,?,?,?,?,?,?)
    `;
    try{
      await new Promise((resolve,reject)=>{
        db.run(sql,
          [
            name,
            contactPerson,
            email,
            phone,
            address,
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

}

module.exports = SupplierModel;