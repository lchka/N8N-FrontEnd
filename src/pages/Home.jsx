import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-zinc-950">
      {/* main section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-6xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100">
            Welcome to your skincare advisor
          </h1>

          <p className="text-lg max-w-xl text-gray-600 dark:text-zinc-400 leading-relaxed">
            An AI-powered tool designed to help you understand cosmetic products
            and how their ingredients may interact with your skin, allergies,
            and conditions.
          </p>

          <Button
            onClick={() => navigate('/check')}
            size="lg"
            className="mt-4 text-xl shadow-xl hover:scale-110 hover:shadow-2xl active:scale-105 transition-transform"
          >
            Analyse a product
          </Button>

        </div>
      </section>
    </div>
  );
};

export default Home;
