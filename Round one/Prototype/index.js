const searchCryptos = document.querySelector('.search-cryptos');
const searchBtn = document.querySelector('.search-button');
const cryptoList = document.querySelector('.crypto-list');

document.addEventListener('DOMContentLoaded', null);

async function fetchCrypto() {
    const requestOptions = {
        headers: {
            'X-CMC_PRO_API_KEY': '',
            'Accept': 'application/json'
        },
        json: true,
        gzip: true
    };

    let response = await fetch(requestOptions);
    let data = await response.json;
    return data;
}

function getCryptos() {

    let res = [];
    let request = new XMLHttpRequest();
    request.open(
        'GET', 
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
    );
    request.setRequestHeader(
        'X-CMC_PRO_API_KEY', ''
    );
    request.setRequestHeader('Accept', 'application/json');

    request.send();
    request.onload = () => {
        console.log('req: ', request);
        if (request.status == 200) {
            res = JSON.parse(request.response);
            let count = 0;
            res.forEach(function(todo) {
                count++
                if (count > 5) return;

                const elementDiv = document.createElement('div');
                elementDiv.classList.add('crypto');
        
                const newCryptoPrice = document.createElement('li');
                newCryptoPrice.classList.add('crypto-item');
                newCryptoPrice.innerText = todo.title;
                elementDiv.appendChild(newCryptoPrice);
        
                cryptoList.appendChild(elementDiv);
            });
        } else {
            console.log(`error ${request.status} ${request.statusText}`);
        }
    }

}