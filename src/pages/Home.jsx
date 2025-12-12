import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-6xl font-semibold tracking-tight text-gray-900">
            Welcome to your skincare advisor
          </h1>

          <p className="text-lg max-w-xl text-gray-500 leading-relaxed">
            An AI-powered tool designed to help you understand cosmetic products
            and how their ingredients may interact with your skin, allergies,
            and conditions.
          </p>

          <button
  onClick={() => navigate('/check')}
  className="
    mt-4 px-12 py-4 rounded-full
    bg-gray-900 text-white text-xl font-medium
    shadow-xl
    cursor-pointer
    transition-all duration-300 ease-out
    hover:scale-110
    hover:shadow-2xl
    hover:bg-gray-800
    active:scale-105
  "
>
  Analyse a product
</button>

        </div>
      </section>
    </div>
  );
};

export default Home;
