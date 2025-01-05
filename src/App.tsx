import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { LoginPage } from './pages/login/LoginPage'
import { RegisterPage } from './pages/register/RegisterPage'
import { ProfilePage } from './pages/profile/ProfilePage'

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={ () => <Home /> } />
            <Route path='/register' Component={ () => <RegisterPage /> } />
            <Route path='/login' Component={ () => <LoginPage /> } />
            <Route path='/profile/:username' Component={ () => <ProfilePage /> } />
            <Route path='/profile' Component={ () => <ProfilePage /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App
