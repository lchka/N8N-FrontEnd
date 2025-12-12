import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Lazy init from localStorage
  const [previousSearches] = useState(() => {
    return JSON.parse(localStorage.getItem("analysisHistory")) || [];
  });

  const visibleSearches = previousSearches.slice(0, 3);

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md shadow-md">
      <div className="w-full px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <span className="text-xl py-4 font-semibold text-gray-900">
          Skincare Advisor
        </span>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer"
          aria-label="Menu"
        >
          <FiMenu size={30} />
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

            {previousSearches.length === 0 ? (
              <p className="px-4 py-4 text-sm text-gray-400">
                No previous searches
              </p>
            ) : (
              <ul className="max-h-60 overflow-auto">
                {visibleSearches.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      navigate("/analysis", { state: item.result });
                      setOpen(false);
                    }}
                    className="px-4 py-3 text-l text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}

            {/* ALWAYS visible */}
            <div className="border-t">
              <button
                onClick={() => {
                  navigate("/history");
                  setOpen(false);
                }}
                className="w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 text-left"
              >
                View all searches
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
