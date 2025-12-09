export const sendMessageToAI = async (messages) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer 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`,
                "HTTP-Referer": window.location.origin, // Required by OpenRouter
                "X-Title": "PM-AJAY Portal", // Required by OpenRouter
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "qwen/qwen-2.5-72b-instruct",
                "messages": messages
            })
        });

        if (!response.ok) {
            throw new Error(`AI API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error sending message to AI:", error);
        throw error;
    }
};
