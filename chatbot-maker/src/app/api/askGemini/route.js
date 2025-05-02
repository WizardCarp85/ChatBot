const { createPrompt } = require("../helper");

async function POST(){
    try{
        const {text,context} = await req.json();
        const prompt = createPrompt({text,context});
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAAUtDVOU9sk-c-gFiAJvdqQsH6gjN6D9s`,
            {
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body:{
                    contents: [
                        {
                            parts:[{text:prompt}],
                        }
                    ]
                }
            }
        )
    }
    catch(err){

    }
}