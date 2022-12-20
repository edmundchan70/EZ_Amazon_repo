const fetch = require('node-fetch');
const express = require('express')
const app = express();
const cors = require('cors');
const Axios = require('axios');
 
const ports = 3002;
const Pool = require('pg').Pool
const data = require('./config');
const { popoverClasses } = require('@mui/material');
 
 
app.use(cors());
app.use(express.json());
const server = data.Server;

const pool = new Pool({
  user: 'edmundchan70',
    host: 'db.bit.io',
    database: 'edmundchan70/online-shop', // public database 
    password: 'v2_3x9QE_mejNavfitcwbPYczfyv6mWf', // key from bit.io database page connect menu
    port: 5432,
    ssl: true,
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
    res.send("CREATED")
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
    res.send("SUCCESS")
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
app.get("/Product/Minus_Inventory/:id/:number",async(req,res) =>{
  try{
    const {id} = req.params ;
    const {number} = req.params;
    const  resp = await pool.query("SELECT  instock  FROM  PRODUCT WHERE id=$1",[id]) 
    const data = resp.rows;
    
    const {instock} = data[0];
    console.log(instock)
    if(instock <1)
      res.send("error");
    else {
      const newInstock= instock - number ; 
      //  `update CUSTOMER set basket_product_id=null where email='${email}'`,[])
      const resp = await pool.query("Update product set instock=$1 where id=$2",[newInstock,id]) ;
      res.send(resp.command);
    }

  
  }catch(err){
    console.log(err);
  }

  })

//User 
 
app.get("/User/paid/:email" ,async (req, res) =>{
try{
  const {email } = req.params;
  /*
  1. read email 
  2. get basket_product_id
  3.create obj for basket_product_id
  */
 
  console.log(email); 
  const resp = await pool.query(`Select  basket_product_id from Customer  where email='${email}' `, [])
  console.log(resp.rows);  
  const  {basket_product_id} = resp.rows[0];
  console.log(basket_product_id);
  let tempObj = {}; 
  basket_product_id.map(
     (item ,i ) => {
      //contain key , add 1 
      //else , add key set 
      if(Object.keys(tempObj).includes(''+item)){
        tempObj[item] +=1 ; 
      }else{
        tempObj[item] = 1 ; 
      }
     }
    
  )
  console.log(tempObj);
  const keys = Object.keys(tempObj); 
  keys.map(
    async (key,i) => {
      console.log(key);
      console.log(tempObj[key]);
      const resp = await pool.query(`Update product set instock = instock - ${tempObj[key]} where id=${key}` );
    }
  )
  res.send(resp);

  
  
}catch(err) {
  console.log(err)
}
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
