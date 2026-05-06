const btnAddTarefa = document.querySelector('.app__button--add-task')
const formAddTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] 
let tarefasSelecionada = null

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const p = document.createElement('p')
    p.textContent = tarefa.descricao
    p.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    const imagemBotao = document.createElement('img')

    botao.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        if (novaDescricao) {
            p.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
    }

    imagemBotao.setAttribute('src', './imagens/edit.png')
    botao.append(imagemBotao)
    
    li.append(svg)
    li.append(p)
    li.append(botao)

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(element => {
                element.classList.remove('app__section-task-list-item-active')
            })

        if (tarefasSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefasSelecionada = null
            return
        }
        
        tarefasSelecionada = tarefa
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
        
        li.classList.add('app__section-task-list-item-active')
    }

    return li
}

btnAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden')
})

formAddTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas()
    textArea.value = ''
    formAddTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});