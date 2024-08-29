import { genAI, supabase } from './config.js';

const form = document.getElementById("questionForm")
const firstResponse = document.getElementById("form1")
const secondResponse = document.getElementById("form2")
const thirdResponse = document.getElementById("form3")
const btn = document.getElementById("go-btn")

btn.addEventListener("click", (e) => {
    e.preventDefault()
    const response =  `${firstResponse.value} ${secondResponse.value} ${thirdResponse.value}`
    main(response)
})

async function main(input) {
    try {
        form.innerHTML = `<div class="mainDiv">
         <div class="resultDiv"><p class="result">Thinking...</p></div></div>`
        const embedding = await createEmbedding(input);
        const match = await findNearestMatch(embedding);
        await getChatCompletion(match, input);
    } catch (error) {
         console.error('Error in main function.', error.message);
         form.innerHTML = `<div class="mainDiv">
         <div class="resultDiv"><p class="result">Sorry, 
         something went wrong. Please try again.</p></div></div>`;
    }
}
async function createEmbedding(input) {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004"})

    const text = input

    const result = await model.embedContent(text)
    const embed = result.embedding
    return embed.values
}

async function findNearestMatch(embedding) {
    const { data } = await supabase.rpc('match_films', {
        query_embedding: embedding,
        match_threshold: 0.4,
        match_count: 4
    });
    console.log(data)
    // Manage multiple returned matches
    const match = data.map(obj => obj.content).join('\n');
    console.log(match)
    return match
}

const chatMessages = 
    `You are an enthusiastic movie expert who loves recommending movies 
    to people. You will be given two pieces of information - some context 
    about movies and user query. 
    Your main job is to formulate a short answer using the provided context 
    and query. The answer should start with the movie and 
    year followed by the description. If you are unsure and 
    cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer. 
    Always speak as if you were chatting to a friend.`

async function getChatCompletion(text, query) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: chatMessages,
        generationConfig: {
            temperature: 0.65,
            maxOutputTokens: 120
        }
    })
    const prompt = `Context: ${text} Query: ${query}`
    const result = await model.generateContent(prompt)
    const response = await result.response
    const answer = response.text()
    form.innerHTML = `<div class="mainDiv"><div class="resultDiv"><p class="result">${answer}</p>
    <button id="again-btn" class=".btn">Go Again</button></div></div>`
}

async function getImage(data) {
    
}