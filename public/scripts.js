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
  const id = Date.now();
  const item = `
    <div data-item-id=${id} class="cart-item"> 
      <p class="title">${title}</p>
      <p class="price">$${price}.00</p>
    </div>`;

  $('#cart').append(`${item}`)
  addToLocalStorage(id, item)
}

const appendToOrderHistory = (cartTotal, id) => {
  const today = new Date($.now())
  const day = today.getDate()
  const month = today.getMonth()+1
  const year = today.getFullYear()

  $('#order-history').append(`
    <div data-order-id=${id} class="order-item">
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

const getOrder = () => {
  fetch('/api/v1/order')
  .then(response => response.json())
  .then((order) => {
    if (order.length) {
      order.map(items => appendOrder(items));
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

const addToLocalStorage = (id, item) => {
  localStorage.setItem(id, JSON.stringify(item));
}

const retrieveLocalStorage = () => {
  for(let key in localStorage) {
    const data = JSON.parse(localStorage[key])
    $('#cart').append(`${data}`)
  }
}

const appendOrder = (item) => {
  $('#order-history').append(`
    <div>
    <p>Order Total: ${item.total}</p>
    <p>Order Date: ${item.created_at}</p>
    </div>`)
}r

$(document).ready(() => {
  getInventory();
  retrieveLocalStorage();
  getOrder();
})

$('#inventory').on('click', '#addToCart', function() {
  const card = $(this).parent().children()
  const menuEl = $(this).parent().parent().parent().children()[0];
  const cartMenu = $(menuEl).children()[1];
  const cart = $(cartMenu).children()[1]
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



