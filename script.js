const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 10;
const apiKey = "4gdDBq8jXDF-fs4kKlYl3F1l1EfEMmNuUeTe8bDKbHs";
// const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
function setAttributes(element, attributes) {
    for (const key in attributes){      
        element.setAttribute(key,attributes[key])
    }
}
function displayPhotos(){
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank',
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos(){
    try {
        const respose = await fetch(apiUrl);
        photosArray = await respose.json();
        // console.log(photosArray[2]);
        displayPhotos();

    } catch (error) {
        console.log(alert(error))
    }
}
window.addEventListener('scroll',() => {
    if(window.innerHeight +window.scrollY>=document.body.offsetHeight-1000) {
        getPhotos();
        console.log('load more');
    }
});
getPhotos();