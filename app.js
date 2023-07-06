require("dotenv").config()
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
const gpt = require("./gpt");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("ready", () => {
  console.log("Estamo en vivo");
});
client.on("message", (message) => {
    gpt(message.body).then((data) => {
      const respuesta = data.data.choices[0].text.trim()
      if(respuesta.length == 0) return client.sendMessage(message.from,"No hemos conseguido la respuesta")
      return client.sendMessage(message.from,data.data.choices[0].text.trim())
    })
});

client.initialize();
