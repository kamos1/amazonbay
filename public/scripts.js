const appendItem = (items) => {
  $('#inventory').append(`
    <div class="card">
      <p class="card-text title">${items.title}</p>
      <p class="card-text description">${items.description}</p>
      <a class="card-text image" href="${items.image}"> picture of ${items.title}</a>
      <p class="card-text title">${items.price}</p>
      <button id="addToCart">Add to cart</button>
    </div>`)
}

const getInventory = () => {
  fetch('/api/v1/inventory')
  .then(response => response.json())
  .then((inventory) => {
    if (inventory.length) {
      inventory.map(items => appendItem(items));
    }
  });
};


$(document).ready(() => {
  getInventory();
})