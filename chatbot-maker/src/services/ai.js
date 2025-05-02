export const askGemini = async ({text, context}) => {
    const response = await fetch("/api/ai/askGemini", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, context }),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch response from Gemini");
    }
    return response;
}
