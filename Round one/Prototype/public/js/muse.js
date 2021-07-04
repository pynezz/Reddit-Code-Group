const API_URL = "https://api.datamuse.com/words?";
//const resultList = document.querySelector('.result-list');

//* Get the HTML tags that we'll attach the returned API data to:
const nounResultList = document.querySelector(".result-list-nouns");
const rhymesResultList = document.querySelector(".result-list-rhymes");
const similarResultList = document.querySelector(".result-list-similar");
const antonymsResultList = document.querySelector(".result-list-antonyms");
const hyponymsResultList = document.querySelector(".result-list-hyponyms");
const spanishResultList = document.querySelector(".result-list-spanish");

//* Get the other neccessary HTML tags:
const inputField = document.querySelector(".input-field");
const searchButton = document.querySelector(".search-word");

//* Add listeners to wait for events 
searchButton.addEventListener("click", afterClick);    
inputField.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {   // Keycode 13 = Enter key
    runAPI();                   // If enter key is pressed call the API
    return false;               // Preventing accidental multiple calls 
  }
});

/*
            ? |---  DOCUMENTATION  ---| ?
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

//* The parameters to tell the API what data we want
// It's not in use for the moment. 
// I placed them in <input value=""> instead.
// From there it's easy to access it from JS with checkBox.value 
var Choices = {
  SIMILAR: "ml",
  POPULAR_NOUNS: "rel_jja",
  POPULAR_ADJ: "rel_jjb",
  SYNONYMS: "rel_syn",
  ANTONYMS: "rel_ant",
  KINDOF: "rel_spc",
  GENERAL: "rel_gen",
  COMPRISED: "rel_com",
  RHYMES: "rel_rhy",
};

// Checkboxes that we need to check if is checked
// 
const nounsCheckBox = document.getElementById("noun");
const similarCheckBox = document.getElementById("similar");
const rhymesCheckBox = document.getElementById("rhymes");
const antonymsCheckBox = document.getElementById("antonyms");
const hyponymsCheckBox = document.getElementById("hyponyms");
const spanishCheckBox = document.getElementById("spanish");

// This is an array of (not bools) checkBoxElements. 
// We access these to check if they're checked or not
let checks = [nounsCheckBox, similarCheckBox, rhymesCheckBox];

function useChecks(search) {
  checks.forEach((element) => {          // For every element in 'checks'               
    if (element.checked) {               // If an element is checked (true)
      let res = "no results";            // Create a string variable with default value "no results" 
      //console.log(element);            // Checking if it works
      let req = new XMLHttpRequest();    // Make a new request:
      req.open("GET", `${API_URL}${element.value}=${search}&max=12`, search);
      req.setRequestHeader("Accept", "application/json");              
      req.send();                        // Send the request to the API with the checkbox's value as a parameter
      req.onload = () => {               // When the request is done
        if (req.status == 200) {         // If the status is 200 (no problems)
          res = req.response;            // Assign the response to the string variable 'res' 
        }
        generateHTML(res, element.value);// And lastly, generate the HTML
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
