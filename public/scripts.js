const appendInventory = (items) => {
  $('#inventory').append(`
    <div class="card">
      <p class="card-text title">${items.title}</p>
      <p class="card-text description">${items.description}</p>
      <a class="image-link" href="${items.image}"> picture of ${items.title}</a>
      <p class="card-text title">${items.price}</p>
      <button id="addToCart" class="card-btn">Add to cart</button>
    </div>`);
};

const appendItemToCart = (obj) => {
  if (obj.hasOwnProperty('id')) {
    $('#cart').append(`
      <div data-item-id=${obj.id} class="cart-item"> 
        <p class="title">${obj.title}</p>
        <p class="price">$${obj.price}.00</p>
      </div>`);
    $('#cart-total-value')[0].innerHTML = obj.value;
  } else {
    const id = Date.now();
    $('#cart').append(`
      <div data-item-id=${id} class="cart-item"> 
        <p class="title">${obj.title}</p>
        <p class="price">$${obj.price}.00</p>
      </div>`);
  }  
};

const appendToOrderHistory = (cartTotal, id) => {
  const today = new Date($.now());
  const day = today.getDate();
  const month = today.getMonth()+1;
  const year = today.getFullYear();

  $('#order-history').append(`
    <div data-order-id=${id} class="order-item">
      <p>Order total: ${cartTotal}</p>
      <p>Purchase date: ${day}/${month}/${year}</p>
    </div>`);
};

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
    appendToOrderHistory(amount, obj.id);
  })
  .catch(error => console.error(error));
};

const addToLocalStorage = (id, item) => {
  localStorage.setItem(id, JSON.stringify(item));
};

const retrieveLocalStorage = () => {
  for (let key in localStorage) {
    const data = JSON.parse(localStorage[key])
    appendItemToCart(data)
  }
};

const deleteLocalStorage = () => {
  for (let key in localStorage) {
    localStorage.removeItem(key)
  }
};

const appendOrder = (item) => {
  $('#order-history').append(`
    <div>
    <p>Order Total: ${item.total}</p>
    <p>Order Date: ${new Date(item.created_at).toLocaleString()}</p>
    </div>`);
};

$(document).ready(() => {
  getInventory();
  retrieveLocalStorage();
  getOrder();
})

$('#inventory').on('click', '#addToCart', function() {
  const id = Date.now();
  const card = $(this).parent().children();
  const title = card[0].innerHTML;
  const price = parseInt(card[3].innerHTML);
  const menuEl = $(this).parent().parent().parent();
  const cartMenu = $(menuEl).children()[2];
  const cart = $(cartMenu).children()[1];
  const totalEl = $(cart).find('#cart-total')[0];
  let value = parseInt($(totalEl).find('#cart-total-value')[0].innerHTML) + price;
  const cartObj = {title: title, price: price};
  const localObj = {id: id, title: title, price: price, value: value};
  appendItemToCart(cartObj);
  addToLocalStorage(id, localObj);
  $(totalEl).find('#cart-total-value')[0].innerHTML = value;
})

$('#cart').on('click', '#purchase-btn', function() {
  const totalEl = $(this).parent().find('#cart-total')[0];
  const value = $(totalEl).find('#cart-total-value')[0].innerHTML;
  const cartEl = $(this).parent()[0];
  const item = $(cartEl).find('.cart-item');
  addOrder(value);
  item.detach();
  $(totalEl).find('#cart-total-value')[0].innerHTML = 0;
  deleteLocalStorage();
})

$('.order-btn').on('click', function() {
  const orderHistory = $(this).parent().find('#order-history');
 
  if($(orderHistory).is(":visible")) {
     $(orderHistory).animate({
      width: "toggle"
    }, 200);
   } else {
    $(orderHistory).animate({
      width: "toggle"
    }, 200);
   }
});

$('.cart-btn').on('click', function() {
  const cart = $(this).parent().find('#cart');

  if($(cart).is(":visible")) {
     $(cart).animate({
      width: "toggle"
    }, 200);
   } else {
    $(cart).animate({
      width: "toggle"
    }, 200);
   }
});



