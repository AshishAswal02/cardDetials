import Home from './Home'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './Dashboard'
import Error from './Error'
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home /> } />
      <Route path='dashboard' element={<Dashboard /> } />
      <Route path='*' element={<Error />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
