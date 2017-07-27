const appendInventory = (items) => {
  $('#inventory').append(`
    <div class="card">
      <p class="card-text title">${items.title}</p>
      <p class="card-text description">${items.description}</p>
      <a class="image-link" href="${items.image}"> picture of ${items.title}</a>
      <p class="card-text title">${items.price}</p>
      <button id="addToCart" class="card-btn">Add to cart</button>
    </div>`)
}

const appendItemToCart = (title, price) => {
  $('#cart').append(`
    <div data-item-id=${Date.now()} class="cart-item"> 
      <p class="title">${title}</p>
      <p class="price">${price}</p>
    </div>`)
}

const appendToOrderHistory = (cartTotal, id) => {
  const today = new Date($.now())
  const day = today.getDate()
  const month = today.getMonth()+1
  const year = today.getFullYear()

  $('#order-history').append(`
    <div data-id=${id} class="order-item">
      <p>Order total: ${cartTotal}</p>
      <p>Purchase date: ${day}/${month}/${year}</p>
    </div>
    `)
}

const getInventory = (cartTotal) => {
  fetch('/api/v1/inventory')
  .then(response => response.json())
  .then((inventory) => {
    if (inventory.length) {
      inventory.map(items => appendInventory(items));
    }
  });
};

const addOrder = (amount) => {
  fetch('/api/v1/order', {
    method: 'POST',
    body: JSON.stringify({
      total: amount
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then((obj) => {
    appendToOrderHistory(amount, obj.id)
  })
  .catch(error => console.error(error))
}



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

$('#cart').on('click', '#purchase-btn', function() {
  const totalEl = $(this).parent().find('#cart-total')[0]
  const value = $(totalEl).find('#cart-total-value')[0].innerHTML;
  addOrder(value)
})


$('.order-btn').on('click', function() {
  const orderHistory = $(this).parent().find('#order-history');
  $(orderHistory).toggleClass('hide').toggle();
});

$('.cart-btn').on('click', function() {
  const cart = $(this).parent().find('#cart');
  $(cart).toggleClass('hide').toggle();
});

// $('.close-order').on()


