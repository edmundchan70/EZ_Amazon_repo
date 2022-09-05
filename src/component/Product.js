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
  function importAll(r) {
    return r.keys().map(r);
  }
  const helper_setModify = ()=>{
    setModify(!modify)
  }
   
  const addToBasket = () =>{
    const email = user.email;
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
    )
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
            <div className="product_info">
                <p>{title}</p>
                <small>$</small>
                <strong>{price}</strong>
     
                <div className="product_rating">
                    {Array(rating)
                    .fill()
                    .map( () => (
                        <p>⭐</p>))}
                </div>
                <div className='instock'>
                <strong>INSTOCK: {instock}</strong>
                </div>
            </div>
     
           
           <img src={(image)} alt="Product Image" /> 
            <button onClick={addToBasket}>ADD to busket </button>
           
    </div>
  )
 
}

export default Product