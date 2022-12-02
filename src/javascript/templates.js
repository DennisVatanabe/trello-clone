import {
  newTodoElement,
  confirmTodoElement,
  newModaleElement,
  newTodoTitleElement,
  newTodoInnerElement,
  newTodoNameElement,
} from "./app.js"

  import { changeContainer, showRemoveModale, callModifyModale } from './functions.js'

import { getItem, setItem } from './storageManager.js'
// const box = document.createElement("div")
// box.id = "box"
// document.body.appendChild(box)

function buildCardTemplate(task) {
  const container = document.querySelector(`#${task.category} .container`)
  newModaleElement.classList.remove('open')
  const box = document.createElement("div")
  box.id = task.id
  box.classList.add('todo__card')
  box.setAttribute('draggable', true)
  const template = `
            <div class="todo__card-title">
                <p class="card__title">${task.title}</p>
                <select class="card__select">
                  <option value="" selected disabled>Choose</option>
                  <option value="todo">TODO</option>
                  <option value="progress">IN PROGRESS</option>
                  <option value="done">DONE</option>
                </select>
                <button class="modify">Modify</button>
                <button class="todo__remove">Delete</button>
            </div>
            <div class="todo__card-text"><p>${task.description}</p></div>
            <div class="card__footer">
                <div class="todo__userName">${task.user}</div>
                <div class="todo__card-confirm-date">${task.createAt}</div>
            </div>
        `
  box.innerHTML = template

  // const element = document.createElement(template)
  container.prepend(box)
  // document.querySelector('.card__select').addEventListener('change', changeContainer)
  // document.querySelector('.modify').addEventListener('click', callModifyModale)
  // document.querySelector('.todo__remove').addEventListener('click', showRemoveModale)
}




export { buildCardTemplate }
