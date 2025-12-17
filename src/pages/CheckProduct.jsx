import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analyseProduct } from "../service/analysis_service";
import Button from "../components/Button";

// Multi-step form to collect user data and analyze skincare products
const CheckProduct = () => {
  const navigate = useNavigate();
  
  // Save analysis results to localStorage for history
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

  // Form state: track current step and user inputs
  const [step, setStep] = useState(1);

  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [productName, setProductName] = useState("");

  // Loading state with countdown timer for user feedback
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [error, setError] = useState("");

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white dark:bg-black border-2 dark:border-purple-500 rounded-2xl shadow-xl p-8">
        {/* Progress */}
        <p className="text-sm text-gray-400 dark:text-purple-400 mb-6">Step {step} of 3</p>

        {/* STEP 1 — Allergies */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-cyan-400">
              What are your allergies?
            </h2>

            <p className="text-gray-500 dark:text-purple-300">
              Separate multiple allergies with commas.
            </p>

            <input
              type="text"
              placeholder="e.g. fragrance, nuts, lanolin"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="w-full border border-gray-200 dark:border-purple-500 dark:bg-black dark:text-cyan-400 dark:placeholder-purple-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-cyan-400"
            />

            <div className="flex gap-4">
              <Button onClick={() => navigate("/")} variant="secondary" fullWidth>
                Back to Home
              </Button>
              <Button onClick={nextStep} fullWidth>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2 — Conditions */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-cyan-400">
              Do you have any skin conditions?
            </h2>

            <p className="text-gray-500 dark:text-purple-300">
              This helps us give more accurate advice.
            </p>

            <input
              type="text"
              placeholder="e.g. eczema, acne, rosacea"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              className="w-full border border-gray-200 dark:border-purple-500 dark:bg-black dark:text-cyan-400 dark:placeholder-purple-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-cyan-400"
            />

            <div className="flex gap-4">
              <Button onClick={prevStep} variant="secondary" fullWidth>
                Back
              </Button>
              <Button onClick={nextStep} fullWidth>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3 — Product */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-cyan-400">
              What product do you want to analyse?
            </h2>

            <p className="text-gray-500 dark:text-purple-300">Please include the brand name.</p>

            <input
              type="text"
              placeholder="e.g. Pantene Anti-Dandruff Shampoo"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border border-gray-200 dark:border-purple-500 dark:bg-black dark:text-cyan-400 dark:placeholder-purple-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-cyan-400"
            />

            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>
            )}

            <div className="flex gap-4">
              <Button onClick={prevStep} variant="secondary" fullWidth>
                Back
              </Button>

              <Button
                disabled={loading}
                fullWidth
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
                  setCountdown(12);
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
                    setCountdown(null);
                  }
                }}
                className="w-full py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    {countdown !== null && countdown > 0 ? (
                      <>
                        Analysing ({countdown}s)
                        <span className="animate-pulse">…</span>
                      </>
                    ) : (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Finalising…
                      </>
                    )}
                  </span>
                ) : (
                  "Analyse product"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckProduct;
