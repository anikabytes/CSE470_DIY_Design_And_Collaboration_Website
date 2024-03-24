import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile';
import Clothes from './screens/Clothes';
import CartPage from './screens/CartPage';
import Home from './screens/Home';
import Design from './screens/Design';

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
        <Route path='/clothes' element={<Clothes />}/>
        <Route path='/CartPage' element={<CartPage />}/>
        <Route path='/design' element={<Design />}/>
        <Route path="/dress" element = {<Showitems />} />
        <Route path="/dress/details/:id" element = {<Viewitem />} />
        <Route path="/dress/addproduct" element = {<Additems />} />
        <Route path="/dress/colaborate/:id" element = {<Colaborate />} />
        <Route path="/dress/search/:searchString" element = {<Searchitems />} />
        <Route path="/dress/delete/:id" element = {<Deleteitem />} />


      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

