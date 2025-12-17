// Footer component with dark mode support
const Footer = () => {
  return (
    <footer className="w-full py-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-zinc-950">
      <p>
        © {new Date().getFullYear()} Skincare Advisor · Built with care
      </p>
    </footer>
  )
}

export default Footer
