import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Chat from './pages/Chat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} exact/>
    <Route path='/chats' element={<Chat/>} />
    </Routes>
  
    </>
  )
}

export default App
