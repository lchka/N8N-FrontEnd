// Reusable button component with variants, sizes, and hover effects
const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
}) => {
  // Base styles: rounded, animated, with hover scale effect
  const baseStyles = "font-medium rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-105 active:scale-95";

  // Button color variants with neon theme for dark mode
  const variants = {
    primary: "bg-gray-900 dark:bg-cyan-500 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-cyan-400 dark:shadow-lg dark:shadow-cyan-500/50",
    secondary: "border-2 border-gray-300 dark:border-purple-500 text-gray-700 dark:text-purple-400 hover:bg-gray-50 dark:hover:bg-purple-500/20",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  // Button size options
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
