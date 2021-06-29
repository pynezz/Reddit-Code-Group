/**
 * Here goes all the stuff that interacts with the datamuse API. 
 * app.js may use this file to get data to display on index.html
 * 
 * Nothing about node goes here.
 */

const API_URL = 'https://api.datamuse.com/words?';
const resultList = document.querySelector('.result-list');

export function FindWords(word, params) {
    let request = new XMLHttpRequest();
    let res;

    request.open('GET',`${API_URL}${params}=${search}`);
    request.setRequestHeader('Accept', 'application/json');
    request.send();

    request.onload = () => {
        // I have done loading the stuff you asked for, now take the data I got
        if (request.status !== 200) {
           res = "Error fetching data...";
           return; 
        } else { 
            
        }
    }
    return res;
}