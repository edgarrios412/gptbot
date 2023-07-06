require("dotenv").config()
const apiKey = process.env.API
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

module.exports = async (msg) => {
    const prompt = `Pregunta: ${msg} \nRespuesta:`
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        n:1,
        temperature: 0,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
      return response
}