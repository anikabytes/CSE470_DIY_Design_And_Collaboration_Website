import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile';
import Clothes from './screens/Clothes';
import Purchase from './screens/Purchase';
import Home from './screens/Home';
import ShowItems from './screens/showitems'
import additems from './screens/additems'
import deleteitem from './screens/deleteitem'
import searchitems from './screens/searchitems'
import viewitem from './screens/viewitem'

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
        <Route path='/purchase' element={<Purchase />}/>
        


      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

