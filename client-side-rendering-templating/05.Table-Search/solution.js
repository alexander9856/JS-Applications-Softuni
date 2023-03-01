import { getData } from './api.js';
import { html, render } from './node_modules/lit-html/lit-html.js';
let tbody = document.querySelector('tbody')

async function displayData() {
   let data = await getData()
   let trs = Object.values(data);
   render(trs.map(template), tbody)
}
displayData();

function template(tr) {
   return html`
   <tr>
      <td>${tr.firstName} ${tr.lastName}</td>
      <td>${tr.email}</td>
      <td>${tr.course}</td>
   </tr>
   `
}
function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   async function onClick(ev) {
      Array.from(document.getElementsByClassName('select')).forEach(el => el.classList.remove('select'))
      let serchedItem = document.getElementById('searchField')
      let trs = document.querySelector('tbody').children
      let searchPattern = serchedItem.value.toLowerCase();
      if(serchedItem.value){
         Array.from(trs).forEach(tr => {
            for (let td of tr.children) {
               let tdLower = td.textContent.toLowerCase();
               if (tdLower.includes(searchPattern)) {
                  tr.classList.add('select')
                  break
               }
   
            }
         })
      }
      
   }
}
solve()
