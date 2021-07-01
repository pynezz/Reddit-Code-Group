const API_URL = 'https://api.datamuse.com/words?';
const resultList = document.querySelector('.result-list');
const inputField = document.querySelector('.input-field');
const searchButton = document.querySelector('.search-word');
searchButton.addEventListener('click', runAPI);
inputField.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        console.log('Submit');
        runAPI();
        return false;
    }
})

function findWords(params, search) {
    let request = new XMLHttpRequest();
    let res;
    request.open('GET', `${API_URL}${params}=${search}`);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            res = request.response;
        }
        generateHTML(res);
    }
}

function generateHTML(json) {
    const result = JSON.parse(json);
    const elementDiv = document.createElement('div');
    elementDiv.classList.add('wordresult');

    result.forEach(element => {
        const newWordElement = document.createElement('li');
        newWordElement.classList.add('word-item');
        newWordElement.innerText = element.word;
        elementDiv.appendChild(newWordElement);
    });
    resultList.appendChild(elementDiv);
}

function runAPI(event) {
    removeOldData(resultList);
    findWords('ml', inputField.value);
}

function removeOldData(parent) {
    if (resultList.childNodes.length > 0) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}
