const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
const title = document.getElementById("title-main");
const content = document.getElementById("content-main");
const items = document.getElementById("items-num");
let cart = [];

function getData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((response) => callback(response))
    .catch((error) => console.log(error));
}

function createCards(data, id) {
  let array = data[id].products;
  let html = "";
  array.forEach((element, productId) => {
    html +=
      '<div class="card" style="width: 18rem;"><img src="' +
      element.image +
      '" class="card-img-top">' +
      '<div class="card-body d-flex flex-column">' +
      '<h5 class="card-title">' +
      element.name +
      "</h5>" +
      '<p class="card-text">' +
      element.description +
      "</p>" +
      '<b class="mt-auto">$' +
      element.price.toString() +
      "</b>" +
      '<a href="#" class="btn btn-dark mt-auto" onclick="addToCart(' +
      id +
      "," +
      productId +
      ')">Add to cart</a>' +
      "</div></div>";
  });
  return html;
}

function changeItemView(name, id) {
  title.innerHTML = name;
  getData(url, (data) => {
    content.innerHTML = createCards(data, id);
  });
}

function changeOrderView(cart) {
  title.innerText = "Order Detail";
  let total = 0;
  let html =
    '<table class="table table-striped"><thead><tr>' +
    "<th>Item</th>" +
    "<th>Qty.</th>" +
    "<th>Description</th>" +
    "<th>Unit Price</th>" +
    "<th>Amount</th></tr></thead>" +
    "<tbody>";
  if (cart.length > 0) {
    cart.forEach((element, index) => {
      html +=
        "<tr>" +
        "<td>" +
        (index + 1) +
        "</td>" +
        "<td>" +
        element.qty +
        "</td>" +
        "<td>" +
        element.description +
        "</td>" +
        "<td>" +
        element.unitPrice +
        "</td>" +
        "<td>" +
        element.amount +
        "</td>" +
        "</tr>";
      total += element.amount;
    });
  }
  html +=
    "</tbody></table>" +
    '<div class="col-2"><b>Total: $' +
    total +
    "</b></div>" +
    '<div class="col-7"></div>' +
    '<div class="col-1">' +
    '<button type="button" class="btn btn-cancel align-right" data-toggle="modal" data-target="#cancelModal">Cancel</button></div>' +
    '<div class="col-2">' +
    '<button type="button" class="btn btn-confirm" onclick="confirmOrder()">Confirm order</button></div>';
  content.innerHTML = html;
}

function containsItem(item, array) {
  let ans = false;
  array.forEach((element) => {
    if (element.description == item.name) {
      ans = true;
    }
  });
  return ans;
}

function addToCart(id, productId) {
  numItems = parseInt(items.innerText.split(" ")[0]);
  numItems++;
  items.innerText = numItems + " items";
  getData(url, (data) => {
    item = data[id].products[productId];
    if (containsItem(item, cart)) {
      cart.forEach((element, index) => {
        if (element.description == item.name) {
          cart[index].qty += 1;
          cart[index].amount += item.price;
        }
      });
    } else {
      cart.push({
        qty: 1,
        description: item.name,
        unitPrice: item.price,
        amount: item.price,
      });
    }
  });
}

function cancelOrder() {
  cart = [];
  items.innerText = "0 items";
  changeOrderView(cart);
}

function confirmOrder() {
  console.log(cart);
}

//---------- Vista inicial ----------
changeItemView("Burgers", 0);

//---------- Event listeners ----------
document
  .getElementById("burgers-nav")
  .addEventListener("click", () => changeItemView("Burgers", 0));
document
  .getElementById("tacos-nav")
  .addEventListener("click", () => changeItemView("Tacos", 1));
document
  .getElementById("salads-nav")
  .addEventListener("click", () => changeItemView("Salads", 2));
document
  .getElementById("desserts-nav")
  .addEventListener("click", () => changeItemView("Desserts", 3));
document
  .getElementById("drinks-nav")
  .addEventListener("click", () => changeItemView("Drinks & Sides", 4));

document
  .getElementById("carro-compras")
  .addEventListener("click", () => changeOrderView(cart));

document
  .getElementById("cancel-order-btn")
  .addEventListener("click", () => cancelOrder());
