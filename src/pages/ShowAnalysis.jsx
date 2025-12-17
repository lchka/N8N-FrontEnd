import { useLocation, useNavigate } from "react-router-dom";

export default function ShowAnalysis() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Safety guard (refresh / direct access)
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-zinc-400">No analysis data available.</p>
          <button
            onClick={() => navigate("/check")}
            className="px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition"
          >
            Analyse a product
          </button>
        </div>
      </div>
    );
  }

  const {
    product_name,
    user_allergies = [],
    user_conditions = [],
    summary,
    suitability_score,
    is_suitable,
    recommendation,
    explanation,
    allergy_notes,
    condition_notes,
    key_ingredients = [],
    ingredients = [],
    citations = [],
  } = state;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Product & User Context */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
              {product_name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-zinc-400">
              Analysed for your skin profile
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-zinc-400 mb-2">
                Your allergies
              </h3>
              {user_allergies.length === 0 ? (
                <p className="text-gray-500 dark:text-zinc-500 text-sm">None specified</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user_allergies.map((a) => (
                    <span
                      key={a}
                      className="bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 px-3 py-1 rounded-full text-sm"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-zinc-400 mb-2">
                Your skin conditions
              </h3>
              {user_conditions.length === 0 ? (
                <p className="text-gray-500 dark:text-zinc-500 text-sm">None specified</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user_conditions.map((c) => (
                    <span
                      key={c}
                      className="bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 px-3 py-1 rounded-full text-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Header / Verdict */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-zinc-100">
            Product Safety Analysis
          </h2>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-zinc-100">{recommendation}</p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Suitability score</p>
            </div>

            <div
              className={`text-2xl font-bold px-4 py-2 rounded-xl text-white ${
                is_suitable ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {suitability_score} / 5
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-zinc-100">Summary</h2>
          <p className="text-gray-700 dark:text-zinc-300">{summary}</p>
        </div>

        {/* Explanation */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-zinc-100">Why this matters</h2>
          <p className="text-gray-700 dark:text-zinc-300">{explanation}</p>
        </div>

        {/* Allergy & Condition Notes */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-zinc-100">Allergy Notes</h3>
            <p className="text-gray-700 dark:text-zinc-300">{allergy_notes}</p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-zinc-100">Condition Notes</h3>
            <p className="text-gray-700 dark:text-zinc-300">{condition_notes}</p>
          </div>
        </div>

        {/* Key Ingredients */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-zinc-100">
            Key Ingredients of Concern
          </h2>

          <div className="flex flex-wrap gap-2">
            {key_ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Full Ingredient List */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-zinc-100">Full Ingredient List</h2>

          <ul className="list-disc list-inside text-gray-700 dark:text-zinc-300 space-y-1">
            {ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Citations */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-zinc-100">
            Scientific References
          </h2>

          <ul className="list-decimal list-inside text-gray-600 dark:text-zinc-400 space-y-2 text-sm">
            {citations.map((citation, index) => (
              <li key={index}>{citation}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
