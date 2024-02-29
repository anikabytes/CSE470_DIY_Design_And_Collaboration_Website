import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile';
import Clothes from './screens/Clothes';
import Purchase from './screens/Purchase';
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
        <Route path='/purchase' element={<Purchase />}/>
        <Route path='/design' element={<Design />}/>


      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

