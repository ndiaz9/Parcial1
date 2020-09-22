const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
const title = document.getElementById("title-main");

fetch(url).then(response => response.json()).then(response => console.log(response)).catch(error => console.log(error));

function fillBurgers(){
    title.innerHTML = "Burgers";
}

function fillTacos(){
    title.innerHTML = "Tacos";
}

function fillSalads(){
    title.innerHTML = "Salads";
}

function fillDesserts(){
    title.innerHTML = "Desserts";
}

function fillDrinks(){
    title.innerHTML = "Drinks & Sides";
}
