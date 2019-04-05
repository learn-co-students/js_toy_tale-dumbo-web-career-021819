const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
const createToyCardHTML = (toy) => {
  return `<div class="card">
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar">
            <p>${toy.likes} Likes</p>
            <button class="like-btn" data-likes="${toy.likes}" data-id="${toy.id}">Like <3</button>
          </div>`
}
//creating Toy Cards



const divTag = document.querySelector('#toy-collection')

document.addEventListener('DOMContentLoaded', () =>{
  fetch('http://localhost:3000/toys')
  .then(response => {
    return response.json()})
  .then(toys => {
    // debugger
      toys.forEach(toy => {
        // debugger
        divTag.innerHTML += createToyCardHTML(toy)
      })
  })

})
// adding each toy info into the divTag


const createNewToy = (toy) => {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      'Accept': "application/json"
    },
    body: JSON.stringify(toy)
  }).then(response => {
    return response.json()
  })
}

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

//
// const likeBtn = document.querySelector('.like-btn')
//
// likeBtn.addEventListener('click', (event) => {
//   debugger
// })
const updateToyLikeCount = (id, likeCount) => {
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({"likes": likeCount})
  }).then((response) => {
    return response.json()
  })
}


const toysdiv = document.querySelector("#toy-collection")

toysdiv.addEventListener('click', (event) => {
  // debugger
	if(event.target.tagName === 'BUTTON'){
	// console.log("eat")
    // const newToyLikes = toy.likes + 1
    let newLikes = parseInt(event.target.dataset.likes)
    event.target.dataset.likes = ++newLikes
    // newLikes++
    let toysId = event.target.dataset.id

    updateToyLikeCount(toysId,newLikes).then((parseJson) => {
       let newText = `${parseJson.likes} likes`
       let pTag =event.target.parentElement.querySelector('p')
       pTag.innerText = newText // updating pTag but not my newText
       // newText = newLikes

    })


}
})

// OR HERE!

//add own compliments

//finding toyForm

// const formTag = document.querySelector('form')
//
const newToy = document.querySelector('.add-toy-form')

newToy.addEventListener('submit', (event) => {
  event.preventDefault();
  //what does this line do tho

  const toyObject = {
    "name": newToy.name.value,
    "image": newToy.image.value,
    "likes": 0
  }

  createNewToy(toyObject).then(newToy => {
    divTag.innerHTML = createToyCardHTML(newToy) + divTag.innerHTML;
  })
})
