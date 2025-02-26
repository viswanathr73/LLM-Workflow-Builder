export const callTogetherAI = async (prompt, apiKey, model, maxTokens, temperature) => {
  if (!apiKey) {
    throw new Error("Together AI API key is missing");
  }

  try {
    const response = await fetch("https://api.together.xyz/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: temperature,
      }),
    });

    // Check if response is OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Together AI Error ${response.status}: ${errorData.error?.message || "Unknown error"}`);
    }

    // Parse the response
    const data = await response.json();

    // Check for valid response structure
    if (!data.choices || data.choices.length === 0) {
      throw new Error("Invalid response from Together AI. No choices returned.");
    }

    return data.choices[0].text;
  } catch (error) {
    console.error("Error calling Together AI:", error);
    throw error;
  }
};