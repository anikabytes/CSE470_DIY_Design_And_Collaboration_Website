import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile';
import Clothes from './screens/Clothes';
import Purchase from './screens/Purchase';
import Home from './screens/Home';
<<<<<<< Updated upstream
import Navbar from './component/Navbar';

=======
>>>>>>> Stashed changes

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import UpdateProfile from './screens/UpdateProfile';

function App() {
<<<<<<< Updated upstream
  let component 

  switch (window.location.pathname) {
    // case "/" :
    //   component = <App />
    //   break;
    case "/home":
      component = <Home />
      break;
    case "/clothes":
      component = <Clothes />
      break;
    case "/purchase":
      component = <Purchase />
      break;
    case "/profile":
      component = <Profile />
      break;

    // default:
    //   break;
  }

  return (
    <div className="bg-orange-300">
    <>
      <Navbar />
      {component}
    </>
=======

  return (
    <div>
>>>>>>> Stashed changes

    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/updateProfile' element={<UpdateProfile />}/>
<<<<<<< Updated upstream
        {/* <Route path='/home' element={<Home />}/>
        <Route path='/purchase' element={<Purchase />}/>
        <Route path='/clothes' element={<Clothes />}/> */}
=======
        <Route path='/' element={<Home />}/>
        <Route path='/clothes' element={<Clothes />}/>
        <Route path='/purchase' element={<Purchase />}/>

>>>>>>> Stashed changes

      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

