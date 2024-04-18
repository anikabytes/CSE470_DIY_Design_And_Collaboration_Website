import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile';
import Clothes from './screens/Clothes';
import CartPage from './screens/CartPage';
import Home from './screens/Home';
import Design from './screens/Design';
import Additems from './screens/additems'
import Deleteitem from './screens/deleteitem'
import Searchitems from './screens/searchitems'
import Showitems from './screens/showitems'
import Viewitem from './screens/viewitem'
import Checkout from './screens/checkout';
import Search from './screens/search';
import Admin_user from './screens/admin_user';
import Admin_clothes from './screens/admin_clothes';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import UpdateProfile from './screens/UpdateProfile';

function App() {

  return (
    <div>

    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/updateProfile' element={<UpdateProfile />}/>
        <Route path='/' element={<Home />}/>
        {/* <Route path='/clothes' element={<Clothes />}/> */}
        <Route path='/CartPage' element={<CartPage />}/>
        <Route path='/design' element={<Design />}/>
        <Route path="/clothes" element = {<Showitems />} />
        <Route path="/clothes/details/:id" element = {<Viewitem />} />
        <Route path="/clothes/addproduct" element = {<Additems />} />
        <Route path="/clothes/search/:searchString" element = {<Searchitems />} />
        <Route path="/clothes/delete/:id" element = {<Deleteitem />} />
        <Route path='/checkout' element={< Checkout />}/>
        <Route path='/search' element={< Search />}/>
        <Route path='/admin_user' element={< Admin_user />}/>
        <Route path='/admin_clothes' element={< Admin_clothes />}/>
        

      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
export default App

