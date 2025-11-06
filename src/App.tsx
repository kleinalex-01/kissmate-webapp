import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/home'
import Services from './components/services'
import Prices from './components/prices'
import Contact from './components/contact'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="prices" element={<Prices />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
