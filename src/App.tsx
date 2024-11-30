import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { LoginPage } from './pages/login/LoginPage'
import { RegisterForm } from './pages/register/RegisterForm'

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={ () => <Home /> } />
            <Route path='/register' Component={ () => <RegisterForm /> } />
            <Route path='/login' Component={ () => <LoginPage /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App
