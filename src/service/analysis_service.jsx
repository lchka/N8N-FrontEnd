import axios from "axios"

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL

export const analyseProduct = async (payload) => {
  const response = await axios.post(N8N_WEBHOOK_URL, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  return response.data   // 🔥 THIS IS THE FIX
}
