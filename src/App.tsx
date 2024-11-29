import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { RegisterForm } from './pages/register/RegisterForm'

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={ () => <Home /> } />
            <Route path='/register' Component={ () => <RegisterForm /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App
