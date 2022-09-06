const fetch = require('node-fetch');
const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path');
const ports = 3002;
const Pool = require('pg').Pool
const data = require('./config');
const { async } = require('@firebase/util');
const { TrySharp, Upload } = require('@mui/icons-material');
const fs =require('fs')
const oldPath = path.join("~/","Desktop/")
const multer = require('multer');
const picPath = path.join(__dirname.substring(0,__dirname.lastIndexOf('/')+1) ,"src" ,"component" ,"public/")
 
 
app.use(cors());
app.use(express.json());
const server = data.Server;

const pool = new Pool({
  user: 'edmundchan70',
  host: 'localhost',
  database: 'edmundchan',
  password:"233233123Lol",
  port: 5431,
});
app.listen(ports , ()=>{
  console.log('listening on port ' + ports);
})

//Product 
app.post("/Product" ,async (req,res) => {
  try{
  const {product_data} = req.body;
  
    const {selectedImage ,sellerName, productName , price  ,instock} = product_data;
    console.log(selectedImage ,sellerName, productName , price  ,instock)
    const newProduct = await pool.query(
        "INSERT INTO PRODUCT (image_url , title , price  ,instock ,seller) VALUES($1 , $2,  $3,   $4 ,$5)",
        [selectedImage , productName , price ,instock,sellerName]
    ); 
    console.log("Product created")
  }catch(err){
   // console.log(err)
  }})
app.put("/Product" ,async (req, res) =>{
  try{
      const {selectedImage , title , price , instock , id }  = req.body;
      const result = await pool.query(
        "UPDATE PRODUCT SET title=$1 ,  price=$2 , instock= $3 ,image_url=$4  WHERE id=$5",
        [title,price,instock , selectedImage , id ]
      );
      res.send("UPDATED")
  }catch(err){  
  console.log(err);
  }
} )
app.get("/Product/getProductById/:id",async (req,res) => {
  try{
   const {id} = req.params ;
   const findProduct = await pool.query(
    "SELECT * FROM PRODUCT WHERE id=$1" ,[id]
   )
   res.send(findProduct.rows)
  }catch(err){
    console.log(err)
  }
})  
app.get("/Product/getAll" ,async (req,res) => {
  try{
    const resp =  await pool.query("SELECT * FROM PRODUCT");
    res.send(resp.rows)
  }catch(err){
    console.log(err)
  }
})
app.delete("/Product/:id" ,async (req, res) =>{
try{
    const {id} = req.params ;
    console.log(id)
    const result = await pool.query(
      "Delete from product where id=$1" , [id]
    )
    console.log(result)
    req.send("SUCCESS")
}catch(err){
  console.log(err);
}
})
app.delete("/Product/all" ,async(req,res) =>{
 const resp = await pool.query(
  "Delete from PRODUCT"
 )
 res.send(resp)
})
app.get("/User/clear_shoppingCart/:email" ,async(req,res)=>{
  try{
   const {email} = req.params ;
   console.log(email)
    const clear_cart=  await pool.query(
        `update CUSTOMER set basket_product_id=null where email='${email}'`,[])
   console.log("resp: completed")
        res.send("Clear shopping cart ")
  }catch(err){
    console.log(err)
  }
})
//User 
app.post("/User" ,async(req , res)=> {
  try{
    const  {email , password, superUser} = req.body; 
 
    const findUser= await fetch(`${server}/User/${email}`, {method:'GET'})
    //If user is  resgister , send back alert message 
    //Else, add new user to database 
    if(!findUser) {
      res.send("USER: " + email + "already exists .Please Login")
    }else{
        const addUser = await pool.query(
          "INSERT INTO CUSTOMER (email ,password,super_user) values($1 , $2 ,$3) ",
          [email ,password , superUser ]
          )
        res.send(addUser);
    }
  }catch(err){
    console.log(err);
  }
})
app.get("/User/:email",async(req , res)=> {  
  try{
    
    const {email} = req.params; 
 
    const findUser = await pool.query (
      `SELECT * FROM CUSTOMER WHERE email='${email}'`, [] 
    );
  
    res.send(findUser.rows);
  }catch(err){
    console.log(err)
  }
}
)
app.post("/User/addToCart" ,async(req , res)=> {
  console.log(req.body)
  try{
    const {email , productId} = req.body;
    //if exist , append , else , create one 
      try{
       // console.log(basket_product_id , productId);
         const result=   await pool.query(
          `update CUSTOMER  set  basket_product_id= ARRAY_APPEND( basket_product_id  ,${productId} ) where email='${email}'` ,
          [])
          console.log(result)
          res.send("added")
         
      }catch(err){res.send(err)}
    
  }catch(err){
    console.log(err)
  }
})


 

/*
CREATE TABLE CUSTOMER (
  userId SERIAL PRIMARY KEY ,
  email varchar ,
  password varchar
)

*/
