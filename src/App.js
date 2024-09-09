import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom';
import { MainComponent } from './components/main-component';
import { UserRegister } from './components/user-register';
import { UserLogin } from './components/user-login';
import { UserDashboard } from './components/user-dashboard';
import { useCookies } from 'react-cookie';
import { UserLogout } from './components/user-logout';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { AddVideo } from './components/add-video';
import { EditVideo } from './components/edit-video';
import { DeleteVideo } from './components/delete-video';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies("username");
  return (
    <div className="container-fluid bg-dark text-white overflow-auto" style={{height:"100vh"}}>
      <BrowserRouter>
        <header className='d-flex justify-content-between p-3'>
          <div>
            <span className='h1'><Link to="/" className='text-white text-decoration-none'>Video Library</Link></span>
          </div>
          <div>
            {
              (cookies["username"] === undefined)? <Link to="/userlogin" className='btn btn-light me-2'>Sign in</Link> : <UserLogout />
            }
            <Link to="/adminlogin" className='btn btn-light'><span className='bi bi-person-fill'></span>Admin Login</Link>
          </div>
        </header>
        <section>
          <Routes>
            <Route path='/' element={<MainComponent />}/>
            <Route path='userregister' element={<UserRegister />}/>
            <Route path='userlogin' element={<UserLogin />}/>
            <Route path='userdashboard' element={<UserDashboard />}/>
            <Route path='adminlogin' element={<AdminLogin />}/>
            <Route path='admindashboard' element={<AdminDashboard />}/>
            <Route path='addvideo' element={<AddVideo />}/>
            <Route path='editvideo/:id' element={<EditVideo />}/>
            <Route path='deletevideo/:id' element={<DeleteVideo />}/>
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
