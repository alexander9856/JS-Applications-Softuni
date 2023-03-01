import { html } from "../../node_modules/lit-html/lit-html.js"
import { createPair } from '../api/data.js'
let context = null;

export function createView(ctx) {
  context = ctx
  ctx.render(catalogTemp())
}

function catalogTemp() {
  return html`
    <section id="create-listing">
      <div class="container">
        <form @submit=${onCreate} id="create-form">
          <h1>Create Car Listing</h1>
          <p>Please fill in this form to create an listing.</p>
          <hr>
    
          <p>Car Brand</p>
          <input type="text" placeholder="Enter Car Brand" name="brand">
    
          <p>Car Model</p>
          <input type="text" placeholder="Enter Car Model" name="model">
    
          <p>Description</p>
          <input type="text" placeholder="Enter Description" name="description">
    
          <p>Car Year</p>
          <input type="number" placeholder="Enter Car Year" name="year">
    
          <p>Car Image</p>
          <input type="text" placeholder="Enter Car Image" name="imageUrl">
    
          <p>Car Price</p>
          <input type="number" placeholder="Enter Car Price" name="price">
    
          <hr>
          <input type="submit" class="registerbtn" value="Create Listing">
        </form>
      </div>
    </section>
    `
}

async function onCreate(ev) {
  debugger
  ev.preventDefault();
  let formData = new FormData(ev.target);
  let brand = formData.get('brand');
  let model = formData.get('model')
  let description = formData.get('description')
  let year = Number(formData.get('year'))
  let imageUrl = formData.get('imageUrl')
  let price = Number(formData.get('price'))

  if (brand && model && description && year && imageUrl && price && Number(year) >= 0 && Number(price) >= 0) {
    await createPair({ brand, model, description, year, imageUrl, price })
    context.page.redirect('/catalog')
    ev.target.reset()
  }
  else {
    alert('All fields are required!')
  }
}
