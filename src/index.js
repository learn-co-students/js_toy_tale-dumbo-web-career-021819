const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  toggleAddForm()
})

function toggleAddForm() {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
}


// OR HERE!

const toyCollection = document.getElementById('toy-collection')

fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(toyArray => toyArray.forEach (toy => {
    toyCollection.innerHTML += `
  <div class="card" id="${toy.id}">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`}))

const addToyForm = document.getElementsByClassName('add-toy-form')[0]

addToyForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const nameText = e.target.name.value;
  const imageText = e.target.image.value;
  const toyObject = {
      name: nameText,
      image: imageText,
      likes: 0
  };
  toggleAddForm();
  createNewToy(toyObject)
  .then(toy => {
    toyCollection.innerHTML += `
    <div class="card" id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>`
  })
  e.target.name.value = ''
  e.target.image.value = ''
})

const createNewToy = (toyObj) => {
  return fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toyObj)
  }).then(response => response.json())
}

toyCollection.addEventListener('click', function(e) {
  if (e.target.className === 'like-btn') {
      let currentButton = e.target;
      let likeHTML = currentButton.parentElement.querySelector('p');
      likeCount = /\d+/.exec(likeHTML.innerText)[0];
      likeCount++
      increaseLikes(e.target.parentElement.id, likeCount)
      likeHTML.innerText = `${likeCount} Likes`
}})

const increaseLikes = (id, likeCount) => {
  fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({"likes": `${likeCount}`})
  }).then(resp => resp.json())
}