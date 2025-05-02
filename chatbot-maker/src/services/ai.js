const askGemini = async (text, context) => {
    try {
        const response = await fetch('/api/ai/askGemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                 text,
                  context 
                }),
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching askGemini API:', error);
        throw error;
    }
};
export { askGemini };