import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { LoginPage } from './pages/login/LoginPage'
import { RegisterPage } from './pages/register/RegisterPage'

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={ () => <Home /> } />
            <Route path='/register' Component={ () => <RegisterPage /> } />
            <Route path='/login' Component={ () => <LoginPage /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App
