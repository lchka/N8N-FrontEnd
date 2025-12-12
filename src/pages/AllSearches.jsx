import { useNavigate } from "react-router-dom";

const AllSearches = () => {
  const navigate = useNavigate();

  const searches =
    JSON.parse(localStorage.getItem("analysisHistory")) || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">
            All Searches
          </h1>
          <p className="text-zinc-400">
            Review all previously analysed products
          </p>
        </div>

        {/* Empty state */}
        {searches.length === 0 ? (
          <div className="bg-zinc-900 rounded-2xl p-8 text-center text-zinc-400">
            No searches found.
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-2xl shadow divide-y divide-zinc-800">
            {searches.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  navigate("/analysis", { state: item.result })
                }
                className="w-full text-left px-6 py-4 hover:bg-zinc-800 transition flex flex-col"
              >
                <span className="font-medium text-zinc-100">
                  {item.title}
                </span>

                {item.createdAt && (
                  <span className="text-sm text-zinc-400">
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
          className="mt-6 px-6 py-3 rounded-full bg-white text-black hover:bg-zinc-200 transition"
        >
          Back to home
        </button>

      </div>
    </div>
  );
};

export default AllSearches;
