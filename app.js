// seleção de botões e elementos
const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');
const playPauseBtn = document.getElementById('play-pause-btn');
const audioElement = document.getElementById('audio'); 

// inicializa a API de reconhecimento de voz (SpeechRecognition)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'pt-BR';

// evento de clique ao botão para iniciar reconhecimento de voz (SpeechRecognition)
startBtn.addEventListener('click', () => {
    output.textContent = "Estou te ouvindo... Fale agora.";
    recognition.start(); //começa o reconhecimento de voz (SpeechRecognition)
});

// evento disparado quando o reconhecimento de voz captura uma frase
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.textContent = `Você disse: "${transcript}"`;
    interpretarComando(transcript);
};

// função para interpretar os comandos de voz
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

function tocarMusica() {
    const audioContext = new AudioContext();
    // consegue o elemento de áudio
    const track = audioContext.createMediaElementSource(audioElement);
    track.connect(audioContext.destination);

    // evento de clique no botão de play/pause
    playPauseBtn.addEventListener('click', () => {
        // verifica se o contexto está em estado suspenso 
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        // toca ou pausa a música dependendo do estado
        if (playPauseBtn.dataset.playing === 'false') {
            audioElement.play();
            playPauseBtn.dataset.playing = 'true';
            playPauseBtn.setAttribute('aria-checked', 'true');
        } else if (playPauseBtn.dataset.playing === 'true') {
            audioElement.pause();
            playPauseBtn.dataset.playing = 'false';
            playPauseBtn.setAttribute('aria-checked', 'false');
        }
    }, false);

    // evento disparado quando a música termina
    audioElement.addEventListener('ended', () => {
        playPauseBtn.dataset.playing = 'false';
        playPauseBtn.setAttribute('aria-checked', 'false');
    }, false);
}


