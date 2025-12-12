import { useLocation, useNavigate } from "react-router-dom";

export default function ShowAnalysis() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Safety guard (refresh / direct access)
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="text-center space-y-4">
          <p className="text-zinc-400">No analysis data available.</p>
          <button
            onClick={() => navigate("/check")}
            className="px-6 py-3 rounded-full bg-white text-black"
          >
            Analyse a product
          </button>
        </div>
      </div>
    );
  }

  const {
    summary,
    suitability_score,
    is_suitable,
    recommendation,
    explanation,
    allergy_notes,
    condition_notes,
    key_ingredients,
    ingredients,
    citations,
  } = state;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header / Verdict */}
        <div className="rounded-2xl bg-zinc-900 p-6 shadow">
          <h1 className="text-2xl font-semibold mb-2">
            Product Safety Analysis
          </h1>

          <p className="text-zinc-400 text-sm mb-4">
            AI-assisted evaluation based on ingredients, allergies, and skin conditions
          </p>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-medium">{recommendation}</p>
              <p className="text-sm text-zinc-400">Suitability score</p>
            </div>

            <div
              className={`text-2xl font-bold px-4 py-2 rounded-xl ${
                is_suitable ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {suitability_score} / 5
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl bg-zinc-900 p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="text-zinc-300">{summary}</p>
        </div>

        {/* Explanation */}
        <div className="rounded-2xl bg-zinc-900 p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Why this matters</h2>
          <p className="text-zinc-300">{explanation}</p>
        </div>

        {/* Allergy & Condition Notes */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-zinc-900 p-6 shadow">
            <h3 className="font-semibold mb-2">Allergy Notes</h3>
            <p className="text-zinc-300">{allergy_notes}</p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6 shadow">
            <h3 className="font-semibold mb-2">Condition Notes</h3>
            <p className="text-zinc-300">{condition_notes}</p>
          </div>
        </div>

        {/* Key Ingredients */}
        <div className="rounded-2xl bg-zinc-900 p-6 shadow">
          <h2 className="text-lg font-semibold mb-3">
            Key Ingredients of Concern
          </h2>

          <div className="flex flex-wrap gap-2">
            {key_ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Full Ingredient List */}
        <div className="rounded-2xl bg-zinc-900 p-6 shadow">
          <h2 className="text-lg font-semibold mb-3">Full Ingredient List</h2>

          <ul className="list-disc list-inside text-zinc-300 space-y-1">
            {ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Citations */}
        <div className="rounded-2xl bg-zinc-900 p-6 shadow">
          <h2 className="text-lg font-semibold mb-3">Scientific References</h2>

          <ul className="list-decimal list-inside text-zinc-400 space-y-2 text-sm">
            {citations.map((citation, index) => (
              <li key={index}>{citation}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
