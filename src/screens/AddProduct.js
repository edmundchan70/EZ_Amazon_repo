import React  , {useContext, useEffect, useState}from 'react'
import {UserNameContext} from "../App"
import Axios from 'axios'
import "./css/AddProduct.css"
import { useNavigate } from 'react-router-dom'
const server = "http://localhost:3002"
function AddProduct() {
    const [user , setUser] = useContext(UserNameContext)
    const [redirect , setRedirect]  = useState(false);
    const nav = useNavigate();
    const [product_data , setProduct_data] = useState({
        sellerName:"",
        selectedImage:null ,
        productName:"",
        price:null, 
        instock:null 
    })

    const handleSubmit =  ()=>{
        console.log(product_data)
     Axios({
        method:'POST' , 
        url: server+ "/Product", 
        data:{
           product_data}})
        .then(
            (resp) =>{
                console.log(resp);
                setRedirect(true)
            }
           )  }

     if(!redirect)
        return (
            <div className="add-product">
                
            <div className="add_product_content">

                <div className="product_name">
                    <h5>Product Name
                    <input type="text" className = "input-text" value={product_data.productName} onChange={(e) => {setProduct_data(
                        (prevState => ({
                            ...prevState,
                            productName:e.target.value})))}}/> </h5>
                     
                </div>
                
                <div className="seller_name">
                    <h5>Seller Name : 
                    <input type="text"  value={product_data.sellerName} placeholder={user.email} onChange={(e) => {setProduct_data
                        (prevState => ({
                            ...prevState,
                            sellerName:e.target.value}))}}/>
                    </h5>
                 
                </div>
               
               <div className="image">
                    {product_data.selectedImage&&(
                          <div>
                             <img className="choice_pic"src={product_data.selectedImage} ></img>
                            </div>
                       
                    )}    
                
                    <div>
                 </div>
                  </div>

                  <h5>Picture URL :<input type="text" onChange={(e)=>{setProduct_data(prevState=>({
                        ...prevState,
                        selectedImage:e.target.value 
                    }))}}/></h5>
               <h5>PRICE : $  <input type="text"  value={product_data.price}  onChange={(e) => {setProduct_data (
                (prevState => ({    
                    ...prevState,
                    price:e.target.value})))}} /> </h5>
             
                   <h5>Instock:   <input type="text"   value={product_data.instock}  onChange={(e) => {setProduct_data (
                (prevState => ({    
                    ...prevState,
                    instock:e.target.value})))}} /> </h5>
           
            
            <br />
            <br />
            <button onClick={handleSubmit}>Submit</button>
                    <></>
            </div>
            </div>
        )
     else{
        console.log("YES")
        nav("/")
        }
}

export default AddProduct