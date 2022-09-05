import React ,{useState ,useEffect ,useContext}from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from "axios";
import Product from "../component/Product"
import "./css/CheckOut.css"
import {UserNameContext} from "../App"
const server = "http://localhost:3002"

function CheckOut() {
  const [user ,setUser] = useContext(UserNameContext);
  const [cart , setCart] = useState([]);
  const [loading , setLoading] = useState(true);
  const data = useLocation();
  const navigate = useNavigate();
  const toPay = () => {
    //clear out the shopping cart in thre database 
    const email = user.email
    const result = Axios({
      method: 'get' ,
      url: server+"/User/clear_shoppingCart/"+email ,
    })
    console.log(result)
  }
  const {email} =   data.state;
  const get_cost = (cart)=>{
    let cost = 0 ;
    cart.map((item, i)=>{
      cost+= item.price ; 
    })
  return cost ; 
  } 
  const  retrieve_shopping_cart=   ()=>{
    let all_data = []
  
      Axios.get(server+"/User/"+email) 
       .then(
        (resp)=> {
          console.log(resp)
          let product_id = resp.data[0].basket_product_id;
      
           if(product_id){
            console.log("PREODUT length ",product_id.length)
           //Axios.get( server+"/Product/"+temp)
               product_id.map(  (element) =>{
                Axios.get( server+"/Product/"+element).then(
                async (resp) =>{
                 const [data] =  resp.data; 
                 console.log("data: " , data)
                all_data.push(data)
                })
              
                console.log("ALL DATA ",all_data.length)
                setCart(all_data)
              
             
              })
     }else{
      alert('You have no product in the shoppingcart.Please select a product first');
      navigate(-1)
     }})
     .catch(err=> alert(err));

   
   
  }
  useEffect(()=> {
    retrieve_shopping_cart();
    setLoading(false);

  },[])
  
  
  
  if(loading){
    return <div> Fetching data </div>
  }
  
 
  return (
    
    <div className='Checkout'>
      <p1 className="Checkout-title">Product inside the shopping cart</p1>
         <table className='Product-list'>
       
          <tbody>
          {cart.map((item , i)=>{
              return(
                <tr className = "item-container">
                  <th className="row_item">
                      <img src={item.image} className="img-product-icon" />
                  </th>
                  <th className="row_item">
                        <small>$</small>
                        <strong> {item.price}</strong>    
                  </th>
                  <th className="row_item">
               
                      <p>id:{item.id}</p>
                  </th>
                </tr>)})}
          <div className='Summary'>
 
                <tr className='Summary-table'>
                  <th >
                     <strong>TOTAL COST IS :  {get_cost(cart)}</strong> 
                  </th>
                  <th >
                    <button className="Button_payment" onClick={toPay}>Proceed to pay</button>
                  </th>
                </tr>
          </div>
          </tbody>
        
          </table>


    </div>
      
      
    
 
  
  )
}

export default CheckOut