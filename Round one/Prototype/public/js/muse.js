const API_URL = "https://api.datamuse.com/words?";
//const resultList = document.querySelector('.result-list');

const nounResultList = document.querySelector(".result-list-nouns");
const rhymesResultList = document.querySelector(".result-list-rhymes");
const similarResultList = document.querySelector(".result-list-similar");
const inputField = document.querySelector(".input-field");
const searchButton = document.querySelector(".search-word");
searchButton.addEventListener("click", afterClick);
inputField.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    runAPI();
    return false;
  }
});

/*
Params:
    ml = similar words
    rel_[code] = related word

Related word codes: (ex: rel_jja)
    jja = Popular nouns modified by the given adjective, per Google Books Ngrams
        ex: gradual -> increase

    jjb = Popular adjectives used to describe the given noun, per Google Books Ngrams
        ex: beach -> sandy

    syn = Synonyms (same meaning)
    ant = Antonyms (opposite meaning)

    spc = "Kind of" (direct hypernyms, per WordNet) - more general words associated with the word
        ex: gondola -> boat

    gen = "More general(more specific?) than" (direct hyponyms, per WordNet)
        ex: boat -> gondola
    
    com = "Comprises" (direct holonyms, per WordNet) 
        ex: car -> accelerator

    rhy = Rhymes    
*/

var Choices = {
  SIMILAR: "ml",
  POPULAR_NOUNS: "jja",
  POPULAR_ADJ: "jjb",
  SYNONYMS: "syn",
  ANTONYMS: "ant",
  KINDOF: "spc",
  GENERAL: "gen",
  COMPRISED: "com",
  RHYMES: "rhy",
};

// Checkboxes that we need to check if is checked
const nounsCheckBox = document.getElementById("noun");
const similarCheckBox = document.getElementById("similar");
const rhymesCheckBox = document.getElementById("rhymes");

// This is an array of bools
let checks = [nounsCheckBox, similarCheckBox, rhymesCheckBox];

function useChecks(search) {
  checks.forEach((element) => {
    // If an element is checked (true)
    if (element.checked) {
      // ...then create a request for that checkbox
      let res = "no results";
      console.log(element);
      let req = new XMLHttpRequest();
      req.open("GET", `${API_URL}${element.value}=${search}&max=12`, search);
      req.setRequestHeader("Accept", "application/json");
      req.send();
      req.onload = () => {
        if (req.status == 200) {
          res = req.response;
        }
        generateHTML(res, element.value); // And generate the corresponding html (element.value is the parameter)
      };
    }
  });
}

// function findWords(params, search) {
//     let request = new XMLHttpRequest();
//     let res;
//     request.open('GET', `${API_URL}${params}=${search}`);
//     request.setRequestHeader('Accept', 'application/json');
//     request.send();
//     request.onload = () => {
//         if (request.status == 200) {
//             res = request.response;
//         }
//         generateHTML(res);
//     }
// }

function generateHTML(json, tag) {
  const resultHTML = document.getElementById(tag);

  const result = JSON.parse(json);
  const elementDiv = document.createElement("div");
  elementDiv.classList.add("wordresult");
  const header = document.createElement("h3");
  header.innerText = resultHTML.title;
  elementDiv.appendChild(header);

  result.forEach((element) => {
    const newWordElement = document.createElement("li");
    newWordElement.classList.add("word-item");
    newWordElement.classList.add("result-display");
    newWordElement.innerText = element.word;
    elementDiv.appendChild(newWordElement);
  });
  resultHTML.appendChild(elementDiv);
}

function runAPI(event) {
  removeOldData(nounResultList);
  removeOldData(rhymesResultList);
  removeOldData(similarResultList);
  //findWords('ml', inputField.value);
  useChecks(inputField.value);
  inputField.scrollIntoView();
}

function removeOldData(parent) {
  if (parent.childNodes.length > 0) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}

///////////// MY CHANGES //////////////////////////////

const inputBox = document.getElementById("inp");
inputBox.focus();

let checked = document.querySelectorAll("input:checked");

const alertDiv = document.querySelector(".alert");

function afterClick() {
  if (checked.length === 0 || inputBox.value.length === 0) {
    // there are no checked checkboxes
    alertDiv.style.opacity = "1";
  } else {
    // there are some checked checkboxes
    runAPI();
  }
}
