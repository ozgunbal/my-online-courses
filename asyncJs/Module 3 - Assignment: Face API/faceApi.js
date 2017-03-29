const button = document.getElementById("analyse");
const inputBox = document.querySelector("#input-box");
const image = document.querySelector("#image");
const output = document.querySelector('#output');

function analyze () {
    const url = inputBox.value;
    const reqBody = {"url" : url};
    const myHeader = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : '211d7b5028034ac78ef95ff465d114d9'
    });
    const initObject = {
        method : 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    const request = new Request('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender', initObject);

    fetch(request).then(response => {
        if(response.ok) {
            return response.json();
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(response => {
        console.log(response);
        image.setAttribute("src", inputBox.value);
        output.innerHTML = `Age: ${response[0].faceAttributes.age} </br>
        Gender: ${response[0].faceAttributes.gender}
        `;
    }).catch(err => {
        alert(err);
        image.removeAttribute("src");
        output.innerHTML = "No Faces Detected";
    })
}

button.addEventListener('click', analyze)