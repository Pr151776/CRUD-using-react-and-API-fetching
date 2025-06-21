import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Addusers from './components/Addusers'
import { useState } from 'react';
import EditUser from './components/EditUser';

function App() {
  const [users, setUsers] = useState([]);
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home users={users} setUsers={setUsers} />} />
        <Route path='/adduser' element={<Addusers users={users} setUsers={setUsers} />} />
        <Route path='/edituser/:id' element={ <EditUser/> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;