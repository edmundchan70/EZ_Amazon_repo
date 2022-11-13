import React , {useState} from 'react'
import "./css/Login.css"
import {Link ,useNavigate} from "react-router-dom"
import {auth} from "./Firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"

function Login() {
const naviage = useNavigate();
const [email , setEmail] = useState('')
const [password  , setPassword] = useState('')
const submit = async (e) =>{
    e.preventDefault();
    try{
        const user = await signInWithEmailAndPassword(auth , email , password);
        if(auth){
            naviage("/");
        }
        console.log(user);
        }catch(err){
        alert(err.message)}}
const register = async (e) => {
    e.preventDefault()
    try{
        const user = await createUserWithEmailAndPassword(auth , email , password);
        console.log(user);
        }catch(err){
        alert(err.message)
    }}
  return (
    <div className="Login">
        {console.log("RENDER")}
       
         <img className="Login_logo" src={require("./public/amazon_PNG12.png")}
         onClick={()=> naviage("/")} />
     
        <div className="Login_container" >
            <h1>Sign-in</h1>
            <h5>Email</h5>
            <input input="text"  value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <h5>Password</h5>
            <input type="password" value={password} onChange={(e)=> {setPassword(e.target.value)}}/> 
            <button type="submit" onClick={submit} className="Login_signInButton">SIGN-IN</button>
            <p>
                THIS IS A CLONE WEBSITE  .
            </p>
            <button onClick= {register} className="Login_createAccountButton">Click to Create Account </button>
       
        </div>
    </div>
  )
}

export default Login