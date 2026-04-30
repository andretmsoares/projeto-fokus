const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const symbolStartOrPause = document.querySelector(".app__card-primary-butto-icon")
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const musicaPlay = new Audio('./sons/play.wav')
const musicaPause = new Audio('./sons/pause.mp3')
const musicaFinish = new Audio('./sons/beep.mp3')
const timeInScreen = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco" :
            title.innerHTML = 'Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.<strong>';
            break;
        case "descanso-curto":
            title.innerHTML = 'Que tal dar uma respirada?<strong class="app__title-strong">Faça uma pausa curta!<strong>';
            break;
        case "descanso-longo":
            title.innerHTML = 'Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.<strong>';
            break;
        default:
            break;
    }
}

const contagemRegresiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaFinish.play()
        zerar()
        alert('Tempo finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciar)

function iniciar() {
    if (intervaloId) {
        musicaPause.play()
        zerar()
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegresiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    symbolStartOrPause.setAttribute('src', './imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    pause = false
    iniciarOuPausarBt.textContent = "Começar"
    symbolStartOrPause.setAttribute('src', './imagens/play_arrow.png')
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timeInScreen.innerHTML = `${tempoFormatado}`
}

mostrarTempo()