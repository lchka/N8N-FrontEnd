const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <span className="text-lg font-semibold text-gray-900">
          Skincare Advisor
        </span>

        {/* Hamburger */}
        <div className="space-y-1 cursor-pointer">
          <span className="block w-6 h-[2px] bg-gray-900"></span>
          <span className="block w-6 h-[2px] bg-gray-900"></span>
          <span className="block w-6 h-[2px] bg-gray-900"></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
