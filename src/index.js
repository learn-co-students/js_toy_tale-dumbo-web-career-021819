const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

const createToyCardHTML = (toy) => {
  return `<div class="card" data-id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
  </div>`
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    let toyFormTag = document.querySelector(".add-toy-form")
    toyFormTag.addEventListener('submit', (event) => {
      event.preventDefault();
      let toyName = event.target.name.value;
      let toyImage = event.target.image.value;

      let toyObject = {
        name: toyName,
        image: toyImage,
        likes: 0
      }
      createNewToy(toyObject).then(newToy => {
        toyDivTag.innerHTML = createToyCardHTML(newToy) + toyDivTag.innerHTML
      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})




// OR HERE!
const toyDivTag = document.querySelector('#toy-collection')
fetch('http://localhost:3000/toys')
  .then((response) => {
    return response.json();
  }).then((toys) => {
    toys.forEach((toy) => {
      toyDivTag.innerHTML += createToyCardHTML(toy)
    })
  })

// Create a new toy sends to server
const createNewToy = (toy) => {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toy)
  }).then(response =>{
    return response.json()
  })
}

const updateToyLikes = (id, likeCount) => {
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({likes: likeCount})
  }).then((response) => {
    return response.json()
  })
}
//adding likes
toyDivTag.addEventListener('click', (event) => {
  if (event.target.className === 'like-btn'){
    const currentButtonTag = event.target;
    const currentToyLikePTag = event.target.parentElement.querySelector('p')
    let newToyLikes = parseInt(currentToyLikePTag.innerText)
    newToyLikes++;
    console.log(newToyLikes)

  let currentToyCard = event.target.parentElement
  //Changing likes on server
  updateToyLikes(currentToyCard.dataset.id, newToyLikes).then((toy) => {
    //changin the DOM
    currentToyLikePTag.innerText = `${newToyLikes} Likes`


  })

  }
})
