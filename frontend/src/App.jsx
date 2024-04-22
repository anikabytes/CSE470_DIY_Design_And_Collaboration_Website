import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile';
import Home from './screens/Home';
import Design from './screens/Design';
import Cart from './screens/Cart';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import UpdateProfile from './screens/UpdateProfile';
import Clothes from './screens/Clothes';
import UserProfiles from './screens/UserProfiles';
import Message from './screens/Message';

function App() {
    return(
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/updateProfile' element={<UpdateProfile />}/>
        <Route path='/design' element={<Design />}/>
        <Route path='/clothes' element={<Clothes />}/>
        <Route path='/getusers' element={<UserProfiles />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/message' element={<Message />}/>
        <Route path='/' element={<Home />}/>


      </Routes>
    </BrowserRouter>
  )
}

export default App

