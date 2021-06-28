const API_URL = 'https://api.datamuse.com/words?ml=ringing+in+the+ears';

function findWords() {
    let request = new XMLHttpRequest();
    let params = {

    }
    let res;
    request.open('GET', API_URL);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            res = request.response;
        }
        console.log(res);
    }
}

findWords();
