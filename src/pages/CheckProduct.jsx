import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyseProduct } from "../service/analysis_service";

const CheckProduct = () => {
  const navigate = useNavigate();
  const saveAnalysisToLocalStorage = (productName, result, allergies, conditions) => {
    const existing = JSON.parse(localStorage.getItem("analysisHistory")) || [];

    const entry = {
      id: crypto.randomUUID(),
      title: productName,
      result,
      user_allergies: allergies,
      user_conditions: conditions,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "analysisHistory",
      JSON.stringify([entry, ...existing])
    );
  };

  const [step, setStep] = useState(1);

  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [productName, setProductName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        {/* Progress */}
        <p className="text-sm text-gray-400 mb-6">Step {step} of 3</p>

        {/* STEP 1 — Allergies */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              What are your allergies?
            </h2>

            <p className="text-gray-500">
              Separate multiple allergies with commas.
            </p>

            <input
              type="text"
              placeholder="e.g. fragrance, nuts, lanolin"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <button
              onClick={nextStep}
              className="w-full py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 — Conditions */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Do you have any skin conditions?
            </h2>

            <p className="text-gray-500">
              This helps us give more accurate advice.
            </p>

            <input
              type="text"
              placeholder="e.g. eczema, acne, rosacea"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="w-full py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Back
              </button>

              <button
                onClick={nextStep}
                className="w-full py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Product */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              What product do you want to analyse?
            </h2>

            <p className="text-gray-500">Please include the brand name.</p>

            <input
              type="text"
              placeholder="e.g. Pantene Anti-Dandruff Shampoo"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="w-full py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Back
              </button>

              <button
                disabled={loading}
                onClick={async () => {
                  if (!productName.trim()) {
                    setError("Please enter a product name (including brand).");
                    return;
                  }

                  const payload = {
                    product_name: productName.trim(),
                    allergies: allergies
                      .split(",")
                      .map((a) => a.trim())
                      .filter(Boolean),
                    conditions: conditions
                      .split(",")
                      .map((c) => c.trim())
                      .filter(Boolean),
                  };

                  console.log("STEP 3 → Payload sent:", payload);

                  setLoading(true);
                  setError("");

                  try {
                    const result = await analyseProduct(payload);

                    console.log("FINAL RESULT:", result);

                    const allergyArray = allergies
                      .split(",")
                      .map((a) => a.trim())
                      .filter(Boolean);
                    const conditionArray = conditions
                      .split(",")
                      .map((c) => c.trim())
                      .filter(Boolean);

                    saveAnalysisToLocalStorage(
                      productName.trim(),
                      result,
                      allergyArray,
                      conditionArray
                    );

                    navigate("/analysis", {
                      state: {
                        product_name: productName.trim(),
                        user_allergies: allergies
                          .split(",")
                          .map((a) => a.trim())
                          .filter(Boolean),
                        user_conditions: conditions
                          .split(",")
                          .map((c) => c.trim())
                          .filter(Boolean),
                        ...result,
                      },
                    });
                  } catch (err) {
                    console.error(err);
                    setError("Failed to analyse product. Please try again.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Analysing…" : "Analyse product"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckProduct;
