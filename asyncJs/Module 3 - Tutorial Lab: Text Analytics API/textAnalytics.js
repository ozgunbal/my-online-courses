const button = document.getElementById("analyse");
const output = document.getElementById("output");

function analyze () {
    const reqBody = {
        "documents": [
            {
            "language" : "en",
            "id" : 1,
            "text" : document.getElementById("input").value
            }
        ]
    };
    const myHeader = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : 'c677b10408054169b454e693b16d972e'
    });
    const initObject = {
        method : 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }
    const request = new Request('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', initObject);

    fetch(request).then(response => {
        if(response.ok) {
            return response.json();
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(response => {
        output.innerHTML = `Total Key Phrases: ${response.documents[0].keyPhrases.length} </br>
        ${response.documents[0].keyPhrases}`;
    }).catch(err => {
        alert(err);
        output.innerHTML = "";
    })

}

button.addEventListener('click', analyze);