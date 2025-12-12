import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CheckProduct from './pages/CheckProduct'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import ShowAnalysis from './pages/ShowAnalysis'
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<CheckProduct />} />  
        <Route path="/analysis" element={<ShowAnalysis/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
