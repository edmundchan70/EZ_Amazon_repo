import React ,{useContext ,useEffect,useState} from 'react'
import "./css/Product.css"
import {UserNameContext} from "../App"
import Axios from "axios"
import {Link} from "react-router-dom"
import {FcMenu} from "react-icons/fc"
import ModifyProduct from './ModifyProduct'
import PopUp from "./ModifyProduct"
const server = "http://localhost:3002";
function Product({id, title , image , price , rating ,instock}) {  
  const [user ,setUser] = useContext(UserNameContext);
  const [modify , setModify]= useState(false);
  const [IMG ,setIMG] = useState(null);
  const [login , setLogin] = useState(true);
  
  const helper_setModify = ()=>{
    setModify(!modify)
  }

  const addToBasket = (e) =>{
    //check login 
    
    const email = user.email;
    
  if(e){  console.log("added : " , id);
    const respond =  Axios({
      method:'post', 
      url: server + "/User/addToCart" ,
      data:{
        "email":email,
        "productId":id
      }
    }).then(
      (res)=>{
        if(res.status==200){
          console.log(res)
        }
      }
    )}else{
      console.log("pageRender");
    }
  }
 if(!login){
    alert("PLEASE LOG IN ") 
    setLogin(true);
    console.log(login)
 }
 if(modify)
    return (
      <div  className="modify-product">
 {console.log(id)}
            <ModifyProduct 
        id={id} 
        title={title} 
        price= {price} 
        instock={instock} 
        image={image} 
        setModify={helper_setModify}/>
        
      </div>
    
    )
  else
  return (
    <div className="product">
          <FcMenu onClick={ ()=>
            setModify(true)
          }/>
            <div className="product_wrapper">
               <div className="productInfo">      <p>{title}</p>   </div>
               <div className="productInfo">     <small>$</small>    <strong>{price}</strong>  </div>
              
             
     
                <div className="productInfo">
                    {Array(rating)
                    .fill()
                    .map( () => (
                        <p>⭐</p>))}
                </div>
                <div className='productInfo'>
                <strong>INSTOCK: {instock}</strong>
                </div>
            </div>
     
           
           <img src={(image)} alt="Product Image" /> 
            <button onClick={(e) =>{
              e.preventDefault();
              user ?  addToBasket(e) :setLogin(false);
            }
              
             }>ADD to busket </button>
           
    </div>
  )
 
}

export default Product