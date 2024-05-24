var siteName = document.getElementById('siteName');
var WebsiteUrl = document.getElementById('WebsiteUrl');
var sumbtn = document.getElementById('sumbtn');
var tbody = document.getElementById('tbody');
var overlay = document.querySelector('.overlay');
var closebtn = document.querySelector('.close-icon i');

var allproducts = [];

sumbtn.addEventListener('click', add);
closebtn.addEventListener('click', checking);

if (localStorage.getItem('allproducts') !== null) {
    allproducts = JSON.parse(localStorage.getItem('allproducts'));
    Display();
}

function add() {
    if (Valid() && validURL()) {
        var product = {
            name: siteName.value,
            URL: WebsiteUrl.value,
        };
        allproducts.push(product);
        localStorage.setItem('allproducts', JSON.stringify(allproducts));
        Display();
        clearInputs();
    } else {
        showError();
        overlay.classList.add("appear");
    }
}

function clearInputs() {
    siteName.value = "";
    WebsiteUrl.value = "";
}

function Display() {
    var box = ``;
    for (var i = 0; i < allproducts.length; i++) {
        box +=
        `
        <tr>
            <td>${i + 1}</td> 
            <td>${allproducts[i].name}</td>
            <td>
                <button class="btn btn-success" onclick="visititem(${i})">
                    <i class="fa-solid fa-eye"></i> Visit
                </button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteitem(${i})">
                    <i class="fa-solid fa-trash-can"></i> Delete
                </button>
            </td>
        </tr>
        `;
    }
    tbody.innerHTML = box;
}

function deleteitem(index) {
    allproducts.splice(index, 1);
    localStorage.setItem('allproducts', JSON.stringify(allproducts));
    Display();
    clearInputs();
}

function visititem(index) {
    window.open(allproducts[index].URL, '_blank');
}

function Valid() {
    var namergex = /^[a-zA-Z0-9\s]{1,50}$/;
    var testing = namergex.test(siteName.value);
}

function validURL() {
    var urlregex = /^www\.[-a-zA-Z0-9@:%._\+~#=]{2,256}\.com$/;
    var test = urlregex.test(WebsiteUrl.value);
}

function checking() {
    overlay.classList.remove('appear');
}

function showError() {

}
