const Home = () => {
  return (
    <div className="">
      {/* Hero section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-6xl font-semibold tracking-tight text-gray-900">
            Welcome to your skincare advisor
          </h1>

          <p className="text-lg max-w-xl text-gray-500 leading-relaxed">
            An AI-powered tool designed to help you understand cosmetic products
            and how their ingredients may interact with your skin, allergies,
            and conditions.
          </p>
        </div>
      </section>

    </div>
  )
}

export default Home
