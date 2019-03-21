//aquí importamos lo que requerimos
const Discord = require('discord.js');
const {
    prefix,
    token,
    giphyToken
} = require('./config.json');
const client = new Discord.Client();

// importamos API de Giphy
var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)
// Condicional para dividir los mensajes
function subStrAfterChars(str, char, pos) {
    if (pos == 'b')
        return str.substring(str.indexOf(char) + 1);
    else if (pos == 'a')
        return str.substring(0, str.indexOf(char));
    else
        return str;
}
 //Esto toma el mensaje de todos los usuario
client.on('message', message => {
    console.log(message.content); //imprime los mensajes en terminal.

    //Caso donde repite lo que se lle pide
    if (message.content.startsWith(`${prefix}repeat`)) {

        // busqueda en giphy
        giphy.search('gifs', {
                "q": "robot"
            })
            //randomizar y escoger un gif
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];

                //imprimir respuesta y gif
                message.channel.send(subStrAfterChars(message.content, 't', 'b'), {
                    files: [responseFinal.images.fixed_height.url]
                });
            })
    }

    //Randomiza lo que se le pide
    if (message.content.startsWith(`${prefix}random`)) {
        let randomVar = subStrAfterChars(message.content, 'm', 'b').split(', ');
        console.log(randomVar); //imprime el array en terminal

        //funcion para tomar un valor random del array
        respuestaRandom = randomVar => {

            let randomFinal = randomVar[Math.floor(Math.random() * randomVar.length)];
            return randomFinal;
        }

        let respuestaRandomFinal = respuestaRandom(randomVar); //llamando la funcion

        //busqueda en giphy
        giphy.search('gifs', {
                "q": "lottery"
            })
            //randomizar y escoger un gif
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];

                //imprimir respuesta y gif
                message.channel.send(respuestaRandomFinal, {
                    files: [responseFinal.images.fixed_height.url]
                });
            })
    }
})

// aqui esta la clave de usuario
client.login(token);