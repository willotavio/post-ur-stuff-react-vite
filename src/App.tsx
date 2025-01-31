import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { LoginPage } from './pages/login/LoginPage'
import { RegisterPage } from './pages/register/RegisterPage'
import { ProfilePage } from './pages/profile/ProfilePage'
import { ConfigurationPage } from './pages/configuration/ConfigurationPage'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' Component={ () => <Home /> } />
          <Route path='/register' Component={ () => <RegisterPage /> } />
          <Route path='/login' Component={ () => <LoginPage /> } />
          <Route path='/profile/:username' Component={ () => <ProfilePage /> } />
          <Route path='/profile' Component={ () => <ProfilePage /> } />
          <Route path='/configuration' Component={ () => <ConfigurationPage /> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
