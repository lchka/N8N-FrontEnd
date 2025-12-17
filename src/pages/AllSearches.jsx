import { useNavigate } from "react-router-dom";

const AllSearches = () => {
  const navigate = useNavigate();

  const searches = JSON.parse(localStorage.getItem("analysisHistory")) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold mb-2 text-gray-900 dark:text-zinc-100">All Searches</h1>
          <p className="text-gray-600 dark:text-zinc-400">
            Review all previously analysed products
          </p>
        </div>

        {/* Empty state */}
        {searches.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center text-gray-600 dark:text-zinc-400">
            No searches found.
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow divide-y divide-gray-200 dark:divide-zinc-800">
            {searches.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  navigate("/analysis", {
                    state: {
                      product_name: item.title,
                      user_allergies: item.user_allergies || [],
                      user_conditions: item.user_conditions || [],
                      ...item.result,
                    },
                  })
                }
                className="w-full text-left px-6 py-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition flex flex-col"
              >
                <span className="font-medium text-gray-900 dark:text-zinc-100">{item.title}</span>

                {item.createdAt && (
                  <span className="text-sm text-gray-600 dark:text-zinc-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default AllSearches;
