import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { LoginSignup } from './Pages/LoginSignup';
import { Cart } from './Pages/Cart';
import { Shop } from './Pages/Shop';
import { Footer } from './Components/Footer/Footer';

function App() {
  return (
    <div >
      <BrowserRouter>
        <div className="bg-decor bg-decor-1"></div>
        <div className="bg-decor bg-decor-2"></div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route path='/mens' element={<ShopCategory category="men" />}></Route>
          <Route path='/womens' element={<ShopCategory category="women" />}></Route>
          <Route path='/kids' element={<ShopCategory category="kid" />}></Route>
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />}></Route>
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<LoginSignup />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>


    </div>
  );
}

export default App;
