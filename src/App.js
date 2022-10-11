 import React  , {useEffect, useState}from 'react';
 import { BrowserRouter as Router , Routes  , Route } from 'react-router-dom';
 import Header from "./component/Header"
 import Login from "./screens/Login"
 import Home from "./screens/Home"
 import Checkout from "./screens/CheckOut";
 import AddProduct from "./screens/AddProduct" ; 
 import ModifyProduct  from './component/ModifyProduct';
 export const UserNameContext = React.createContext();
 function App() {
  const [user , setUser] = useState({});
   const [click , setClick] = useState(true);
  
  return (
    <UserNameContext.Provider value={[user,setUser]}>
    <Router>
          <div className="app">
          <Header  />
            <Routes>
              <Route path="/login" element={<>       <Login /> </>}/>
              <Route path="/" element={<>       <Home clicked={click} setClicked={setClick}/> </>} /> 
              <Route path="/addProduct" element={<>          <AddProduct /> </>} />
              <Route path="/Checkout" element={<>         <Checkout /> </>}/>
              <Route path="/ModifyProduct" element={<>        <Header /> <ModifyProduct /> </>} />
            </Routes>
          </div>

      </Router>

    </UserNameContext.Provider>
  
  );
}

export default App;
