const appendInventory = (items) => {
  $('#inventory').append(`
    <div class="card">
      <p class="card-text title">${items.title}</p>
      <p class="card-text description">${items.description}</p>
      <a class="card-text image" href="${items.image}"> picture of ${items.title}</a>
      <p class="card-text title">${items.price}</p>
      <button id="addToCart">Add to cart</button>
    </div>`)
}

const appendItemToCart = (title, price) => {
  $('#cart').append(`
    <div class="cart-item"> 
      <p class="title">${title}</p>
      <p class="price">${price}</p>
    </div>`)
}


const getInventory = () => {
  fetch('/api/v1/inventory')
  .then(response => response.json())
  .then((inventory) => {
    if (inventory.length) {
      inventory.map(items => appendInventory(items));
    }
  });
};


$(document).ready(() => {
  getInventory();
})

$('#inventory').on('click', '#addToCart', function() {
  const card = $(this).parent().children()
  const cart = $(this).parent().parent().parent().children()[2];
  const title = card[0].innerHTML;
  const price = parseInt(card[3].innerHTML);
  const totalEl = $(cart).find('#cart-total')[0]
  let value = parseInt($(totalEl).find('#cart-total-value')[0].innerHTML) + price;
  appendItemToCart(title, price);
  $(totalEl).find('#cart-total-value')[0].innerHTML = value;
})