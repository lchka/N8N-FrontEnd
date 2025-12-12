import { useState } from 'react'
import { FiAlignJustify,FiMenu  } from "react-icons/fi";
const Navbar = () => {
  const [open, setOpen] = useState(false)

  const previousSearches = [
    'CeraVe Hydrating Cleanser',
    'La Roche-Posay Effaclar',
    'The Ordinary Niacinamide',
  ]

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md shadow-md">
      <div className="w-full px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <span className="text-xl py-4 font-semibold text-gray-900">
          Skincare Advisor
        </span>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="space-y-1 cursor-pointer"
          aria-label="Menu"
        >
  <FiMenu  size="30"/>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-6 top-full mt-3 w-64 rounded-xl bg-white shadow-lg border border-gray-100"
            onMouseLeave={() => setOpen(false)}
          >
            <div className="px-4 py-3 text-xl font-medium text-gray-700 border-b">
              Previously searched
            </div>

            <ul className="max-h-60 overflow-auto">
              {previousSearches.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-3 text-l  text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
