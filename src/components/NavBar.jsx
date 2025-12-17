import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Lazy init from localStorage
  const [previousSearches] = useState(() => {
    return JSON.parse(localStorage.getItem("analysisHistory")) || [];
  });

  const visibleSearches = previousSearches.slice(0, 3);

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md shadow-md bg-white/80 dark:bg-black/90 border-b-2 dark:border-cyan-400">
      <div className="w-full px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <span 
          onClick={() => navigate("/")}
          className="text-xl py-4 font-semibold text-gray-900 dark:text-cyan-400 cursor-pointer hover:text-gray-700 dark:hover:text-cyan-300 transition"
        >
          Skincare Advisor
        </span>

        {/* Theme Toggle & Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-purple-500/20 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun size={24} className="text-cyan-400" /> : <FiMoon size={24} className="text-gray-700" />}
          </button>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer text-gray-900 dark:text-cyan-400"
            aria-label="Menu"
          >
            <FiMenu size={30} />
          </button>
        </div>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-6 top-full mt-3 w-64 rounded-xl bg-white dark:bg-black shadow-lg border border-gray-100 dark:border-purple-500"
            onMouseLeave={() => setOpen(false)}
          >
            <div className="px-4 py-3 text-xl font-medium text-gray-700 dark:text-cyan-400 border-b dark:border-purple-500">
              Previously searched
            </div>

            {previousSearches.length === 0 ? (
              <p className="px-4 py-4 text-sm text-gray-400 dark:text-purple-400">
                No previous searches
              </p>
            ) : (
              <ul className="max-h-60 overflow-auto">
                {visibleSearches.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      navigate("/analysis", {
                        state: {
                          product_name: item.title,
                          user_allergies: item.user_allergies || [],
                          user_conditions: item.user_conditions || [],
                          ...item.result,
                        },
                      });
                      setOpen(false);
                    }}
                    className="px-4 py-3 text-l text-gray-700 dark:text-purple-300 hover:bg-gray-50 dark:hover:bg-purple-500/20 cursor-pointer"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}

            {/* ALWAYS visible */}
            <div className="border-t dark:border-purple-500">
              <button
                onClick={() => {
                  navigate("/history");
                  setOpen(false);
                }}
                className="w-full px-4 py-3 text-sm text-gray-600 dark:text-cyan-400 hover:bg-gray-50 dark:hover:bg-purple-500/20 text-left"
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