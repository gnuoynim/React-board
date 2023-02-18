import { useState } from 'react'
import List from './pages/list'
import View from './pages/view'
import Modify from './pages/modify'
import Write from './pages/write'
import ErrorPage from './pages/error-page'
import './App.css'

import { BrowserRouter,Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List/>}/>
        <Route path='/view/:id' element={<View/>}/>
        <Route path='/modify/:id' element={<Modify/>}/>
        <Route path='/write' element={<Write/>}/>
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
