import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile';
import Clothes from './screens/Clothes';
import CartPage from './screens/CartPage';
import Home from './screens/Home';
import Design from './screens/Design';
import Deleteitem from './screens/deleteitem'
import Searchitems from './screens/searchitems'
import Showitems from './screens/showitems'
import Viewitem from './screens/viewitem'
import Checkout from './screens/checkout';
import Admin from './screens/admin_user';
import ShowDesign from './screens/admin_clothes';
import RemoveDesign from './screens/removedesigns';
import TrackOrder from './screens/trackorder';
import RemoveOrder from './screens/removeorder';

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
        <Route path='/CartPage' element={<CartPage />}/>
        <Route path='/design' element={<Design />}/>
        <Route path="/clothes" element = {<Showitems />} />
        <Route path="/clothes/details/:id" element = {<Viewitem />} />
        <Route path="/clothes/search/:searchString" element = {<Searchitems />} />
        <Route path="/clothes/delete/:id" element = {<Deleteitem />} />
        <Route path='/checkout' element={< Checkout />}/>
        <Route path='/admin_user' element={< Admin />}/>
        <Route path='/trackorder' element={< TrackOrder />}/>
        <Route path='/removeorder' element={< RemoveOrder />}/>
        <Route path='/admin_clothes' element={< ShowDesign />}/>
        <Route path='/removedesigns' element={< RemoveDesign />}/>
        

      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
// export default App

