import React ,{useState ,useEffect ,useContext }from 'react';
import { useNavigate  ,useLocation} from 'react-router-dom';
import Axios from "axios";
import "./css/CheckOut.css"
import Product from "../component/Product"
import "./css/CheckOut.css"
import Header from "../component/Header"
import {UserNameContext} from "../App"
const server = "http://localhost:3002"
function CheckOut() {
  const [user ,setUser] = useContext(UserNameContext);
  const email = user.email;
  
 
 
  const nav = useNavigate();
  const [homePage , setHomePage] = useState(false)
  const [cart , setCart] = useState([]);
  const Info  = () => {
    Axios({
      method:"GET" , 
      url: server +"/User/"+email
    }) .then(
      (resp) => {
        const {basket_product_id}  = resp.data[0]
       basket_product_id.map(
        (item , i )=>{
          Axios({
            method:"GET" , 
            url: server +"/Product/getProductById/"+item
          }) .then (resp =>{
            const data = resp.data[0];
            console.log(data)
            setCart (
              prevState => [...prevState , data]
              )
          })
        }
       )
     
      
      }
      
      )
  }
  useEffect(
    Info
   ,[user]
  )
  const Pay = ()=>{
      Axios({
        method:"GET"  ,
        url: server +"/User/clear_shoppingCart/"+email 
      }) .then(resp =>{

        console.log(resp.data)
 
        setHomePage(true);
      })

  }
  
  const checkCost = ()=>{
    var cost = 0 ;
    cart.map(
      (item, i )=>{
             cost += item.price
      }
    )
    return cost 
  }
  if(!homePage){
    return(
    
      <div className='Check-Out'>
        {cart.map(
          (item , i )=>{
            const {id , image_url , title , price ,seller} = item;
            return (
                <div className="item">
                    <p5 className="id">id : {id}</p5>
                    <img src={image_url} className="image"></img>
                    <p5 className="title">title : {title}</p5>
                    <p5 className="price">price: : {price}</p5>
                    <p5 className="seller">seller : {seller}</p5>
                </div>
            )
          }
        )}
     
        <div className="cost">
        
          <p5>Total Cost : {checkCost()}  </p5>
          <button onClick={Pay} > Pay </button>
        </div>
     
        
     
      
      </div>
    )
  }
  else{
 
      nav('/')
   
    
  }
  
}
export default CheckOut