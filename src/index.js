const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

const toyCollectionDiv = document.getElementById('toy-collection')

const createToyDiv = toyObject => {
  return `<div class = "card">
    <h2>${toyObject.name}</h2>
    <img src= "${toyObject.image}" class="toy-avatar" />
    <p>${toyObject.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    </div>`
}

fetch('http://localhost:3000/toys').then(response => {
  return response.json()
}).then(object => {
  object.forEach((toyObject) => {
    toyCollectionDiv.innerHTML += createToyDiv(toyObject)
  })
})

const formTag = document.querySelector('form')

const createNewToy = toy => {
  return fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Accept': "application/json"
    },
    body: JSON.stringify(toy)
  }).then(response => {
    return response.json()
  })
}

// const createNewCompliment = (compliment) => {
//   return fetch('http://localhost:3000/compliments/', {
//     method: 'POST',
//     headers: {
//   		'Content-Type': 'application/json',
//   		'Accept': 'application/json'
//   	},
//     body: JSON.stringify(compliment)
//   }).then(response => {
//     return response.json()
//   })
// }

formTag.addEventListener('submit', (event) => {
  event.preventDefault();

  const toyName = event.target.name.value;
  const toyImage = event.target.image.value;

  const toyObject = {
    name: toyName,
    image: toyImage,
    likes: 0
  }

  createNewToy(toyObject).then(newToy => {
    toyCollectionDiv.innerHTML = createToyDiv(newToy) + toyCollectionDiv.innerHTML
  })



})
// //  ----- to add my own compliments ------
//
// // find our form
// const formTag = document.querySelector('form')
// // on submit, grab whatever is in the input box in the form (the compliment)
// formTag.addEventListener('submit', (event) => {
//   event.preventDefault();
//
//   const complimentText = event.target.compliment.value;
//
//   const complimentObject = {
//     message: complimentText,
//     hug_count: 0,
//     favorited: false
//   }
//   createNewCompliment(complimentObject).then(newCompliment => {
//     ulTag.innerHTML = createComplimentCardHTML(newCompliment) + ulTag.innerHTML;
//   })
//   // did this work?
//   // if so, do this:
// })
