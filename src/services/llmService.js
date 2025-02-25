export const callOpenAI = async (prompt, apiKey, model, maxTokens, temperature) => {
  if (!apiKey) {
    throw new Error("API key is missing. Please set it in .env.local");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature: temperature,
      }),
    });

    // Check if response is OK first
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI Error ${response.status}: ${errorData.error?.message || "Unknown error"}`);
    }

    // Only parse the JSON after confirming response is OK
    const data = await response.json();

    // Prevent TypeError by checking if `choices` exists
    if (!data.choices || data.choices.length === 0) {
      throw new Error("Invalid response from OpenAI. No choices returned.");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
};