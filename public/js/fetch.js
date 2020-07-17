fetch('http://localhost:3000/api/destinations')
  .then(function(response){
    return response.json();
  })
  .then(function(destinations){

  const imgList = destinations;
let imgTemplate = ''; 


const gallery = document.querySelector('.array-gallery'); 
 
imgList.forEach(function(item){
  console.log(item);
  imgTemplate += 
  `<a href="${item.url}">
  <img src="${item.fileName}" alt="${item.title}" title="${item.title}">
  </a>
  <figcaption>${item.title}!</figcaption>
        </figure>`;
});

 gallery.innerHTML = imgTemplate ;
});