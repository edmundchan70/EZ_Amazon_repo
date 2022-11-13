 import React  , {useEffect, useState}from 'react';
 import { BrowserRouter as Router , Routes  , Route } from 'react-router-dom';
 import Header from "./component/Header"
 import Login from "./screens/Login"
 import Home from "./screens/Home"
 import Checkout from "./screens/CheckOut";
 import AddProduct from "./screens/AddProduct" ; 
 import ModifyProduct  from './component/ModifyProduct';
 export const UserNameContext = React.createContext();
 export const CountContext = React.createContext();
 function App() {
  const [user , setUser] = useState({});
  const [count,setCount]= useState(0);
 
  return (
    <UserNameContext.Provider value={[user,setUser]}>
      <CountContext.Provider value={[count,setCount]} >
        <Router>
            <div className="app">
            <Header  />
              <Routes>
                <Route path="/login" element={<>       <Login /> </>}/>
                <Route path="/" element={<>       <Home /> </>} /> 
                <Route path="/addProduct" element={<>          <AddProduct /> </>} />
                <Route path="/Checkout" element={<>         <Checkout /> </>}/>
                <Route path="/ModifyProduct" element={<>        <Header /> <ModifyProduct /> </>} />
              </Routes>
            </div>

        </Router>
      </CountContext.Provider>
  

    </UserNameContext.Provider>
  
  );
}

export default App;
