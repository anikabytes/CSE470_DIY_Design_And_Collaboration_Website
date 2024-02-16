import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile';
import Clothes from './screens/Clothes';
import Purchase from './screens/Purchase';
import Home from './screens/Home';
import Navbar from './component/Navbar';


import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import UpdateProfile from './screens/UpdateProfile';

function App() {
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

    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/updateProfile' element={<UpdateProfile />}/>
        {/* <Route path='/home' element={<Home />}/>
        <Route path='/purchase' element={<Purchase />}/>
        <Route path='/clothes' element={<Clothes />}/> */}

      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

