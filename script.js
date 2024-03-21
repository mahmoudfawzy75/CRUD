var title = document.getElementById('title');
var price = document.getElementById('price');
var taxes = document.getElementById('taxes');
var ads = document.getElementById('ads');
var discount = document.getElementById('discount');
var total = document.getElementById('total');
var count = document.getElementById('count');
var category = document.getElementById('category');
var submit = document.getElementById('submit');
var mood = 'creat'
var tmp;
var userInputs = document.querySelectorAll('input:not([type="search"])')
var productRegex = /^[A-Z][a-z]{3,8}$/
var priceRegax = /^[0-9]{2,6}^/
// var submitBtn = document.querySelector('button')


// console.log(tital, price , taxes , ads , discount , total, count, category ,submit);
const submitButton = document.getElementById('submit');

// Function to check the validity of input fields
function checkValidity() {
    let isValid = true;

    for (let i = 0; i < userInputs.length; i++) {
        if (userInputs[i].value === "0") {
            userInputs[i].nextElementSibling.innerHTML = `${userInputs[i].name} Required`;
            isValid = false;
        } else {
            userInputs[i].nextElementSibling.innerHTML = "";
        }
    }

    if (title.value.length > 0 && title.value.length < 3) {
        title.nextElementSibling.innerHTML = `Add at least 3 letters`;
        isValid = false;
    } else {
        title.nextElementSibling.innerHTML = "";
    }
    if (price.value.length > 0 && price.value.length < 2) {
        price.nextElementSibling.innerHTML = `Add at least 2 numbers`;
        isValid = false;
    } else {
        price.nextElementSibling.innerHTML = "";
    }
    if (category.value.length > 0 && category.value.length < 3) {
        category.nextElementSibling.innerHTML = `Add at least 3 letters`;
        isValid = false;
    } else {
        category.nextElementSibling.innerHTML = "";
    }

    return isValid;
}

// Enable or disable the submit button based on the validity of input fields
function updateButtonState() {
    submitButton.disabled = !checkValidity();
}

// Check validity on input events
userInputs.forEach(input => {
    input.addEventListener('input', updateButtonState);
});
title.addEventListener('input', updateButtonState);
price.addEventListener('input', updateButtonState);
category.addEventListener('input', updateButtonState);

// Check initial validity when the page loads
updateButtonState();





//get total

function getTotal(){
    if(price.value!= ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green'
    }else{
        total.innerHTML= ''
        total.style.background= 'red'
    }
}
//creat product
var dataPro;
  if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
  }else{
      var dataPro = [];
  }


   submit.onclick = function () {
    let newPro ={
      title: title.value.toLowerCase(), 
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount : discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != '' && category.value !='' && count.value<=100 ){
        if(mood === 'creat'){
         if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro)   
        }
    }else{
        dataPro.push(newPro)
        }
    }else{
        dataPro[tmp] = newPro;
        mood = 'creat' 
        submit.innerHTML = 'Creat'    }
     clearDate()
    }
       
    
   


    showData()
   //save local storage 
    localStorage.setItem('product' , JSON.stringify(dataPro)  );
    

   }

//clear inputs

function clearDate(){
    title.value= ''
    price.value = ''
    ads.value = ''
    taxes.value= ''
    discount.value= ''
    total.innerHTML= ''
    count.value = ''
    category.value= ''

}
//read

function showData(){
    let x = ''
    getTotal()
    for (let i = 0; i < dataPro.length; i++) {
        x += `<tr>
        <th>${i+1}</th>
        <th >${dataPro[i].title}</th>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td> ${dataPro[i].ads}</td>
        <td> ${dataPro[i].discount}</td>
        <td> ${dataPro[i].total}</td>
        <td> ${dataPro[i].category}</td>
        <td><button onclick='ubdateDate(${i})' id="ubdete">Ubdate</button></td>
        <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
    </tr>`
        
    }
    document.getElementById('tbody').innerHTML = x

    var btnDelete = document.getElementById('DeletAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML= '<button onclick= "deleteAll()" >DELETE ALL</button>'
    }else{
        btnDelete.innerHTML= ''
    }
}

showData()

//delete
function deleteData(i){
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro);
    showData()

}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
//ubdate
function ubdateDate(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;

    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML= 'ubdate';
    mood = 'ubdate';
    tmp = i;

    scroll({
        top: 0,
        behavior: "smooth",
    })
}
//search

var searchMood = 'title'

function getSearchMood(id){
    var search = document.getElementById('search')
    if(id == 'searchTitle'){
        searchMood= 'title';
        search.placeholder= 'Search By Title';
    }else{
        searchMood= 'category';
        search.placeholder= 'Search By Category';

    }
    search.focus()
    search.value = ''
    showData()
}

function searchData(value){
    let x = ''
    if(searchMood == 'title'){
        for (let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].title.includes(value.toLowerCase())){
                x += `<tr>
                <th>${i}</th>
                <th >${dataPro[i].title}</th>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td> ${dataPro[i].ads}</td>
                <td> ${dataPro[i].discount}</td>
                <td> ${dataPro[i].total}</td>
                <td> ${dataPro[i].category}</td>
                <td><button onclick='ubdateDate(${i})' id="ubdete">Ubdate</button></td>
                <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
            </tr>`
            }
        }
    }else{
        for (let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].category.includes(value.toLowerCase())){
                x += `<tr>
                <th>${i}</th>
                <th >${dataPro[i].title}</th>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td> ${dataPro[i].ads}</td>
                <td> ${dataPro[i].discount}</td>
                <td> ${dataPro[i].total}</td>
                <td> ${dataPro[i].category}</td>
                <td><button onclick='ubdateDate(${i})' id="ubdete">Ubdate</button></td>
                <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
            </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = x

}

