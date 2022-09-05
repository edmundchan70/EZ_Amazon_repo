import React  ,{useState ,useEffect}from 'react'
import "./css/ShowProduct.css"
import Axios from 'axios'
import Product from "../component/Product"
function ShowProduct() {
    const [ProductInfo, SetProduct_Info]  = useState([]);
    const server = "http://localhost:3002"

    const retreieveData = ()=> {
        Axios({
            method: 'get',
            url:server+"/Product/getAll" ,
         }) .then((resp)=> {
           const data = resp.data ;
           data.map((item, i )=>{
            SetProduct_Info((prev)=> [...prev  ,item])})})}

useEffect( ()=>{
    retreieveData();
} , [])
  return (
    <div className="home_row">
        <div>
            {ProductInfo.map((item,i) => {
            console.log(item)
            return (
                <Product 
                id={item.id}
                image={item.image_url}
                instock={item.instock}
                price={item.price}
                seller={item.seller}
                title={item.title}
                />)
 }
        )}</div>
    </div>
  )
}

export default ShowProduct