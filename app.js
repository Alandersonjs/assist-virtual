
// seleção de botões e elementos
const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');
const playPauseBtn = document.getElementById('play-pause-btn');
const audioElement = document.getElementById('audio'); 

function obterSaudacao() {
    const agora = new Date();
    const horas = agora.getHours();

    if (horas < 12) {
        return "Bom dia, magnata!";
    } else if (horas < 18) {
        return "Boa tarde!";
    } else {
        return "Boa noite!";
    }
}

// função para falar em voz alta
function falarTexto(texto) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    synth.speak(utterance);
}
// inicializa a API de reconhecimento de voz (SpeechRecognition)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'pt-BR';

// evento de clique ao botão para iniciar reconhecimento de voz (SpeechRecognition)
startBtn.addEventListener('click', () => {
    const saudacao = obterSaudacao();
    output.textContent = `${saudacao} Estou te ouvindo... Fale agora.`;
    falarTexto(saudacao);
    recognition.start(); //começa o reconhecimento de voz (SpeechRecognition)
});

// evento disparado quando o reconhecimento de voz captura uma frase
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.textContent = `Você disse: "${transcript}"`;
    interpretarComando(transcript);
};

// função para interpretar os comandos de voz
async function interpretarComando(comando) {
    if (comando.includes('tocar música')) {
        output.textContent = "Tocando música...";
        tocarMusica();
    } else if (comando.startsWith('pesquisar por')) {
        const termo = comando.replace('pesquisar por', '').trim();
        buscarNaWeb(termo);
    } else if (comando.includes('abrir youtube')) {
            abrirYoutube();
        } else {
            output.textContent = 'Comando não reconhecido.';
        }
}


function tocarMusica() {
    const audioElement = document.getElementById('audio');
    audioElement.play().catch(error => {
        console.error('Erro ao tentar tocar a música:', error);
    });
}

function buscarNaWeb(termo) {
    const url = `https://www.google.com/search?q=${encodeURIComponent(termo)}`;
    window.open(url, '_blank');  // Nova aba aberta
}

function abrirYoutube() {
    output.textContent = "Abrindo YouTube...";
    const url = "https://www.youtube.com";
    window.open(url, '_blank');
}