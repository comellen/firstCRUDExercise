function fetchHelloDataFromAPI() {
    fetch('http://localhost:3000/test/helloclient', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(function (response) {
        console.log('Fetch response:', response);
        return response.text();
    })
    .then(function (text) {
        console.log(text);
    });
}

//POST long hand: /one
function postToOne() {
    let url = 'http://localhost:3000/test/one';

    fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(response => response.text())  //turn response into text
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response)); //print response (now text) to console
}

//POST /one : Arrow Function
function postToOneArrow() {
    let url = 'http://localhost:3000/test/one';

    fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.text())
    .catch(err => console.error('Error:', err))
    .then(res => console.log('Success:', res));
}

function postData() {
    let content = { testdata: { item: 'This was saved!' } };

    let testDataAfterFetch = document.getElementById('test-data');
    let createdAtAfterFetch = document.getElementById('created-at');

    fetch('http://localhost:3000/test/seven', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })
    .then(response => response.json())
    .then(function(text) {
        console.log(text);

        testDataAfterFetch.innerHTML = text.testdata.testdata;
        createdAtAfterFetch.innerHTML = text.testdata.createdAt;
    });
}

//Get from /one - Display Data
function fetchFromOneDisplayData() {
    let url = 'http://localhost:3000/test/one';
    let dataView = document.getElementById('display-one');

    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(function(response) {
        return response.json()
    })
    .catch(function(error) {
        console.error('Error:', error)
    })
    .then(function(results) {
        let myList = document.querySelector('#getjson');
        
        for (r of results) {
            console.log('Response:', r.testdata);
            let listItem = document.createElement('li');
            listItem.innerHTML = r.testdata;
            myList.appendChild(listItem);
        }
    });
}