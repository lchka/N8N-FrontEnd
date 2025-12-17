import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CheckProduct from './pages/CheckProduct'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import ShowAnalysis from './pages/ShowAnalysis'
import AllSearches from './pages/AllSearches'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<CheckProduct />} />  
        <Route path="/analysis" element={<ShowAnalysis/>}/>
        <Route path="/history" element={<AllSearches/> }/>
      </Routes>
      <Footer />
    </ThemeProvider>
  )
}

export default App
