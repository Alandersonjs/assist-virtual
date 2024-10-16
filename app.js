//seleção de botão e elemento de saída
const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');

//inicializa a API de reconhecimento de voz (SpeechRecognition)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'pt-BR';

//evento de clique ao botão para iniciar reconhecimento de voz (SpeechRecognition)
startBtn.addEventListener('click', () => {
    output.textContent = "Estou te ouvindo... Fale agora.";
    recognition.start(); //começa o reconhecimento de voz (SpeechRecognition)
});

//evento disparado quando o reconhecimento de voz captura uma frase
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.textContent = `Você disse: "${transcript}"`;
    interpretarComando(transcript);
};

//função para interpretar os comandos de voz
function interpretarComando(comando) {
    if (comando.includes('tocar música')) {
        output.textContent = "Tocando música...";
        tocarMusica();
    } else if (comando.includes('lembrete')) {
        output.textContent = "Lembrete definido!";
        definirLembrete(comando);
    } else if (comando.includes('buscar por')) {
        output.textContent = "Buscando na web...";
        buscarNaWeb(comando);
    } else {
        output.textContent = "Comando não reconhecido.";
    }
}




