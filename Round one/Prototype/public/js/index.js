const searchCryptos = document.querySelector('.search-cryptos');
const searchBtn = document.querySelector('.search-button');
const cryptoList = document.querySelector('.crypto-list');

document.addEventListener('DOMContentLoaded', null);

async function fetchCrypto() {
    const requestOptions = {
        headers: {
            'X-CMC_PRO_API_KEY': '14b6507f-3b1a-4b7f-bd79-184b75775da3',
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


    // const rp = require('request-promise');
    // const requestOptions = {
    //     method: 'GET',
    //     uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    //     qs: {
    //         'start': '1',
    //         'limit': '10',
    //         'convert': 'USD'
    //     },
    //     headers: {
    //         'X-CMC_PRO_API_KEY': '14b6507f-3b1a-4b7f-bd79-184b75775da3'
    //     },
    //     json: true,
    //     gzip: true
    // };

    // rp(requestOptions).then(response => {
    //     let res = [];
    //     res = JSON.parse(request.response);
    //     response.forEach(function(todo) {

    //         count++
    //         if (count > 5) return;

    //         const elementDiv = document.createElement('div');
    //         elementDiv.classList.add('crypto');
    
    //         const newCryptoPrice = document.createElement('li');
    //         newCryptoPrice.classList.add('crypto-item');
    //         newCryptoPrice.innerText = todo.name;
    //         elementDiv.appendChild(newCryptoPrice);
    
    //         cryptoList.appendChild(elementDiv);
    //     });

    // }).catch((err) => {
    //     console.log('Some error occured: ' + err.message);
    // })


    let res = [];
    let request = new XMLHttpRequest();
    request.open(
        'GET', 
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
    );
    request.setRequestHeader(
        'X-CMC_PRO_API_KEY', '14b6507f-3b1a-4b7f-bd79-184b75775da3'
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