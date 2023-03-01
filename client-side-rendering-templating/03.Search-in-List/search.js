import { towns } from './towns.js'
import { html, render } from './node_modules/lit-html/lit-html.js'
let container = document.getElementById('towns')
let ul = document.createElement('ul')
let input = document.getElementById('searchText');
let res = document.getElementById('result')

function template(town) {
   return html`
   <li>${town}</li>
   `
}
render(towns.map(template), ul);
container.appendChild(ul)
document.querySelector('button').addEventListener('click', search)
function search(ev) {
   let counter = 0;
   [...ul.children].forEach(li => {
      debugger
      // let liLow = li.textContent.toLowerCase()
      // let inputLow = input.value.toLowerCase();
      if (input.value) {
         if (li.textContent.includes(input.value)) {
            li.classList.add('active')
            counter++
         }
         else {
            li.classList.remove('active')

         }
      }
      else{
         li.classList.remove('active')
      }
   })
   input.value = ''
   function templateRes(counter) {
      return html`${counter} matches found`
   }
   render(templateRes(counter), res)
}
