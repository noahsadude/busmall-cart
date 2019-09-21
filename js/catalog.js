/* global Product, Cart */

'use strict';

var selectElement = document.getElementById('items');
var cartContents = document.getElementById('cartContents');
var itemsInCart = 0;
// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.

function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  for (var i = 0; i<Product.allProducts.length;i++) {
    var optionEl = document.createElement('option');
    optionEl.textContent = Product.allProducts[i].name;
    selectElement.appendChild(optionEl);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  var item = selectElement.options[selectElement.selectedIndex].value;
  var qty = document.getElementById('quantity').value;
  console.log(`${item}, ${qty}`);
  new CartItem(item,qty);
  cart.items = cartItemsArr;

}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var qty = parseInt(document.getElementById('quantity').value);
  itemsInCart += qty;
  renderTotalItems.textContent = `Items in cart: ${itemsInCart}`;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var item = selectElement.options[selectElement.selectedIndex].value;
  var qty = document.getElementById('quantity').value;
  var itemRender = renderElements('tr',cartTable,);
  renderElements('td',itemRender,item);
  renderElements('td',itemRender,qty);
}

var renderTotalItems = renderElements('p',cartContents,`Items in cart: ${itemsInCart}`); 
var cartTable = renderElements('table',cartContents);
var tableHeader = renderElements('tr',cartTable);
renderElements('td',tableHeader,'Item');
renderElements('td',tableHeader,'Quantity');

function renderElements(element,parent,content){
  var el = document.createElement(element);
  el.textContent = content;
  parent.appendChild(el);
  return el;
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();