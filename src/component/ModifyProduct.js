import React , {useState }from 'react'
import "./css/ModifyProduct.css"
import {useNavigate} from "react-router-dom"
import Axios from "axios";
import { maxHeight, maxWidth } from '@mui/system';
function ModifyProduct( {title,image,price ,instock ,id , setModify}) {
  
  const server ="http://localhost:3002"
 
    const [product_data , setProduct_data] = useState({
        selectedImage:image ,
        title:title,
        price:price, 
        instock:instock,
        id:id
    })
 const deleteProduct= ()=>{
    const result=  Axios({
    method: 'delete' ,
    url:server + "/Product/"+id ,
 
  }).then(
    (resp) =>{
     console.log(resp);
    }
  )
 }
    const confirmChanges = ()=>{
        Axios({
        method:'PUT' , 
        url: server+ "/Product", 
        data:product_data})
        .then(
          (resp) =>{
            console.log(resp);
            setModify() ; })}
  return (
    <form className="pop-up"> 
        <p1 className="title">Modify product information</p1>
        <p5 className="product_tag">Product Title: 
          <input type="text" placeholder={title} onChange={(e) => setProduct_data(
          prevState => ({
              ...prevState , 
              productName:e.target.value})
        )}/></p5>
     
      
        <p5 className="price">Price: 
        <input type="text" placeholder={price} onChange={(e) => setProduct_data(
          prevState => ({
              ...prevState , 
              price:e.target.value})
        )}/>
        
        </p5>
        <p5 className="instock">Instock : 
        <input type="text" placeholder={instock} onChange={(e) => setProduct_data(
          prevState => ({
              ...prevState , 
              instock:e.target.value})
        )}/>
        </p5>

    
        <img src={product_data.selectedImage}  /> 
       
        <p5>↑ Current Image ↑</p5>
        <p5 >New Imag Url :  
            <input type='text' palceholder ={product_data.selectedImage} onChange={(e) => {
            setProduct_data(
                prevState => ({
                ...prevState  , 
                selectedImage:e.target.value}))
        
          }}
          /> 
        </p5>
        <br />
        <br /> 

        <div className="button_options">
          <button className="remove" onClick={
            (e)=>{
              e.preventDefault();
             return deleteProduct();
            }
            }>REMOVE ITEM !!!</button>

          <button onClick={
            (e)=>{
              e.preventDefault()
             return confirmChanges()}}>Confirm changes</button>
        </div>
    </form>
  )
}

export default ModifyProduct