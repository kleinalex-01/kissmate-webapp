import { Outlet } from 'react-router-dom'
import Footer from './footer'
import Navbar from './Navbar'
import PWAPrompt from './PWAPrompt'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PWAPrompt />
      <Footer />
    </div>
  )
}

export default Layout