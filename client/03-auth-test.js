function fetchAllFromAuthRoute() {
    const fetch_url = 'http://localhost:3000/authtest/getall';
    const accessToken = localStorage.getItem('SessionToken');

    const response = fetch(fetch_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

//FETCH/POST to Auth/Create
function postToAuthRouteCreate() {
    const fetch_url = 'http://localhost:3000/authtest/create';
    const accessToken = localStorage.getItem('SessionToken');

    let authTestDataInput = document.getElementById('authTestDataInput').value;

    let authInputData = { authtestdata: { item: authTestDataInput } };

    const response = fetch(fetch_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData)
    })
        .then(response => response.json())
        .then(data => console.log(data))
}

//GET Item by User
function getOneByUser() {
    let postIDNumber = document.getElementById('getNumber').value;

    const fetch_url = `http://localhost:3000/authtest/${postIdNumber}`;
    const accessToken = localStorage.getItem('SessionToken');

    const response = fetch(fetch_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            let myItem = document.getElementById('getItemValue');
            myItem.innerHTML = response.authtestdata;
        })
}

//PUT to authtest/updat/:id
function updateItem() {
    let postIdNumber = document.getElementById('updateNumber').value;
    let authTestDataInput = document.getElementById('updateValue').value;

    const fetch_url = `http://localhost:3000/authtest/update/${postIdNumber}`;
    const accessToken = localStorage.getItem('SessionToken');

    let authInputData = { authtestdata: { item: authTestDataInput } };
    const response = fetch(fetch_url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData)
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            let myItem = document.getElementById('newItemValue');
            myItem.innerHTML = data.authtestdata;
            fetchAllFromAuthRoute();
        })
}

function showCurrentData(e) {
    const fetch_url = `http://localhost:3000/authtest/${e.value}`;
    const accessToken = localStorage.getItem('SessionToken');

    fetch(fetch_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => response.json())
        .then(function (response) {
            console.log(response);
            let myItem = document.getElementById('updateValue');
            if (!response) return;
            else myItem.value = response.authtestdata;
        })
}

function deleteItem() {
    let postIdNumber = document.getElementById("deletNumber").value;

    const fetch_url = `http://localhost:3000/authtest/delete/${postIdNumber}`;
    const accessToken = localStorage.getItem('SessionToken');

    const response = fetch(fetch_url, {
        method: 'DELTE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => {
            console.log(response);
            fetchAllFromAuthRoute();
        })
}

function fetchFromOneDisplayData() {
    const url = 'http://localhost:3000/authtest/getall';
    const accessToken = localStorage.getItem('SessionToken');

    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken
        })
    })
        .then(
            function (response) {
                return response.json()
            })
        .catch(
            function (error) {
                console.log('Error:' error)
            })
        .then(
            function (response) {
                let text = '';
                let myList = document.querySelector('ul#fourteen');
                while (myList.firstChild) {
                    myList.removeChild(myList.firstChild)
                }

                console.log(response);
                for (r of response) {
                    let listItem = document.createElement('li');
                    let textData = r.id + ' ' + r.authtestdata;
                    listItem.innerHtml = textData
                    listItem.setAttribute('id', r.id);
                    myList.appendChild(listItem);
                    myList.addEventListener('click', removeItem);
                }
            })
}

function removeItem(e) {
    console.log(e);
    let target = e.target;
    if (target.tagName !== 'LI') return;
    else target.parentNode.removeChild(target);

    let x = target.getAttribute("id");
    deleteItemById(x);
    console.log("The number for this item is " + x);
}

function deleteItemById(paramNum) {
    const fetch_url = `http://localhost:3000/authtest/delete/${paramNum}`;
    const accessToken = localStorae.getItem('SessionToken');

    const response = fetch(fetch_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => {
            console.log(response);
            fetchAllFromAuthRoute();
        })
}