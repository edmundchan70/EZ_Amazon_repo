import React  , {useState ,useContext ,useEffect} from 'react' ;
import "./css/Home.css";
import Product from "../component/Product";
import {UserNameContext} from "../App"
import ShowProduct from "../component/ShowProduct"
 
function Home() {
    const [load , setLoad] = useState(false);
    const [user ,setUser] = useContext(UserNameContext);
 
    useEffect(
      ()=> {
        if(user)
           setLoad(true);
      } ,[]
    )
    if(load)
        return (
          
        <div className="Home">
      
              <div className="home_container">
                  <img className='home_image' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB28684220_.jpg' alt="Banner Image"/>
                  <div className="add_product_button">     
                   </div>
              
                  <div className='home_row'>
                      <ShowProduct />
                  </div> 
                  
              </div>

        
        </div>)
      else{
        return <div>Not loaded </div>
      }
}

export default Home