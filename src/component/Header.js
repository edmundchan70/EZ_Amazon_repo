import React ,{useState , useEffect, useContext} from 'react'
import {Link} from "react-router-dom"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import "./css/Header.css"
import {auth} from "../screens/Firebase"
import {onAuthStateChanged , signOut} from "firebase/auth"
import Axios from 'axios';
import { isEmpty } from '@firebase/util';
import {UserNameContext} from "../App"
const server = "http://localhost:3002"
function Header() {     
                const [count , setCount] =useState(0);
                const [user ,setUser] = useContext(UserNameContext);
                const [load , setLoad]= useState(false);
                const [input ,setInput ]= useState("");
                onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
                    setLoad(true);}) 
                const search = ()=>{
                 console.log(input)
                }
                const handleAuthentication = async () => {
                    if(user){
                        auth.signOut();
                    }
                }
                const CheckLogin= ()=>{
                    if(!user){
                        alert("You are not signed in ! Please sign in first!!");
                    }else{
                    //  console.log(user.email);
                    }}
                const get_shopCart_num =  ()=>{
                   console.log(count)
                    if(user){
                        const email = user.email ; 
                        let count = 0 ; 
                        const result= Axios.get(server + "/User/"+email).then(
                            (resp)=>{
                            const bracket_collection = resp.data[0].basket_product_id;
                            
                            if(bracket_collection != null)
                                 {  
                              
                                  count= bracket_collection.length
                                }
                            return count}) .then (value => setCount(value))
                    
                           
                 }
                        
                    else
                        alert("USER NOT FOUND")
                       
                    };
                if(load){
                    get_shopCart_num()
                    return (
                    <div className="header">
                        <Link to="/">
                        <img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG28.png" alt="Logo"  />
                        </Link>
                        <div className="header_search">
                            <input className='header_searchInput' input='text' value={input} onChange={(e)=>{setInput(
                                ()=>setInput(e.target.value))}} />
                            {/*  LOGO */} 
                            <SearchOutlinedIcon className="header_searchIcon" onClick={search} />
                        </div>  
                        <div className="header_nav">
                                <Link to={!user && '/login'} >
                                <div onClick={handleAuthentication}  className="header_options">
                                    <span className="header_options_line_1">Hello {!user ? "Guest" : user?.email }</span>
                                    <span className="header_options_line_2">{user ? "Sign out " : "Sign In"}</span>
                                </div>
                                </Link>
                                <Link to={!user? "/Login" : "/AddProduct"}>
                                    <div className="header_options" onClick={CheckLogin}>
                                        <span className="header_options_line_1">New Product?</span>
                                        <span className="header_options_line_2">Add new product!</span>
                                    </div>
                                </Link>
                              
                                <div className="header_options">
                                    <span className="header_options_line_1">YOUR</span>
                                    <span className="header_options_line_2">PRIME</span>
                                </div>
                            <Link to={!user ? "/Login" : "/Checkout"} state={{email: user.email}}>
                            <div className="header_options" onClick={CheckLogin}>
                                    <ShoppingBasketIcon  className='header_optionBasket' />
  
                                    <span className='shopping-cart_count' onChange={get_shopCart_num}>{count}</span>
                                </div>      
                            </Link>

                            <Link to={"/AddProduct" }>
                            <div className="header_options" onClick={CheckLogin} >


                            </div>
                            </Link>
                        </div>
                    </div>
                )}
                else{
                    return(<div>LOADING</div>)
                }
    }
export default Header;