import { createPrompt } from "../../helper";

export async function POST(req){
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
                body: JSON.stringify({
                    contents: [
                        {
                            parts:[{text:prompt}],
                        }
                    ]
                })
            }
        )
        const data = await response.json();
        return new Response(JSON.stringify({response:data}),{
            status:201,
            headers:{
                "Content-Type" : "application/json"
            }
        })
    }
    catch(err){
        console.log(err)
        return new Response(JSON.stringify({err: "Internal Server Error"}),{
            status:500,
            headers:{
                "Content-Type" : "application/json"
            }
        })
    }
}