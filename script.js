const source = "http://167.71.69.158"

async function getData(){
    const images = fetch(`${source}/static/test.json`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    
    return images
}

async function showTermsOfUse(termsOfUse) {
    const modalContainer = document.querySelector(".modal-content")

    termsOfUse.forEach(term => modalContainer.innerHTML += `<h4>${term.title}.</h4><p>${term.content}</p>`)
}

function closeModal() {
    var modal = document.getElementById("termsOfUse")
    modal.style.display = "none"
}

function addImages(imagesData){
    const imagesContainer = document.querySelector(".images")
    
    imagesData.forEach(image => {
        imagesContainer.innerHTML += 
        `<img class="image" src="${source+image.image_url}"/>
        <input type="button" id="${source+image.image_url}"
                value="Download" />
        <a id="${source+image.image_url}" onclick=downloadImage("${source+image.image_url}")>Download</button>`
        
        var downloadButton = document.getElementById(`${source+image.image_url}`)
        downloadButton.addEventListener("click", function() {         
            download(source+image.image_url);
        }, false);
    })
} 
//  function downloadImage(imageSrc) {
//     fetch(imageSrc).then(response => {
//         console.log(response)
//             const image = response.json()
//             const imageURL = URL.createObjectURL(image)
  
//             const link = document.createElement('a')
//             link.href = imageURL
//             link.download = 'test-image'
//             document.body.appendChild(link)
//             link.click()
//             document.body.removeChild(link)
//     })
// }

async function start(){
    const data = await getData()
    
    const termsOfUse = data.terms_of_use.paragraphs
    await showTermsOfUse(termsOfUse)
    var acceptButton = document.getElementById("accept")
    acceptButton.addEventListener('click', closeModal)
    
    const imagesData = data.images;
    addImages(imagesData)
}

start()