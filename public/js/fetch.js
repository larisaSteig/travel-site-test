// Since the execution of this `app.js` script will be long finished by the time the following `fetch()` call returns data, we need to put our loop inside the second .then(). Check out this CSS Tricks article for the details about what's going on here. 
// https://css-tricks.com/using-fetch/

// fetch('https://assign2wendy-heroku-atlas.herokuapp.com/api/destinations')
fetch('http://localhost:3000/api/destinations')
.then(function (response) {
  return response.json()
})
.then(function (data) {
      // const imgList = destinations;
      // const imgList = destinations;
      // Variable where we will store our img tags

    let imgTemplate = ''; 

    // Flex container for images
    const destinations = document.querySelector('.array-gallery'); 
    
    data.forEach(function(item){
      console.log(item);
      console.log (item.id)
      imgTemplate += 
      `<figure>
    <a href=${item.title}>
      <img src="http://picsum.photos/id/${item.id}/250" alt="${item.title}">
    </a>
      <figcaption>WELCOME to <a href=${item.url}>${item.id}</a></figcaption>
    </figure>`
  })
    //   `<figure>
    //   <a href="${item.url}">
    //   <img src="http://picsum.photos/id/${item.id}/250" alt="${item.title}" title="${item.title}">
    //   </a>
    //   <figcaption>${item.title}</figcaption>
    //         </figure>`;
    // });

    destinations.innerHTML = imgTemplate ;
    });

