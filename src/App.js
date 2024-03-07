import {Routes,Route} from "react-router-dom"
import Home from "./pages/home/Home";
import Collection from "./pages/collection/Collection";
import ProductDetail from "./pages/productDetail/ProductDetail";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "./redux/categorySlice";
import Payments from "./components/payments/Payments";




function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
       dispatch(fetchCategories())
  },[])
  return (
    <div className="App">
      <NavBar/>
      <Routes>
              <Route path="/" element = {<Home/>}/>
              <Route path="/category/:categoryId?" element = {<Collection/>}/>
              <Route path="/product/:productId" element = {<ProductDetail/>}/>
              <Route
                        path="/payments/:status"
                        element={<Payments />}
                    />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
