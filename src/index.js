const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyDivTag = document.querySelector('#toy-collection')
// const likeBtn = document.querySelector('.like-btn')
let addToy = false

const toyTemplate = (toy) => {
  return `<div class="card">
    <h2 data-id="${toy.id}">${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p class="toy-${toy.id}">${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
}

document.addEventListener('DOMContentLoaded', ()=>{
  fetch('http://localhost:3000/toys')
  .then((response)=>{
    return response.json()
  }).then((toys)=>{
    toys.forEach((toy)=>{
      toyDivTag.innerHTML += toyTemplate(toy)
    })
  })
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', (event) => {
      let toyName = document.querySelector('input#toy-name').value
      let toyImg = document.querySelector('input#toy-image').value
      const toyObj = {
        "name": toyName,
        "image": toyImg,
        "likes": 0
      }
      createNewToy(toyObj)
      .then((toy)=>{ toyDivTag.innerHTML = toy + toyDivTag.innerHTML
      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})

toyDivTag.addEventListener('click', () => {
  if (event.target.className == "like-btn") {
    let toyId = event.target.parentElement.firstElementChild.dataset.id
    let currentLikes = parseInt(event.target.previousElementSibling.innerText.split(" ")[0])
    let newLikes = currentLikes+1
    const toyObj = {
      "likes": newLikes
    }
    updateToyLikes(toyId, toyObj)
    .then((toy)=>{document.querySelector(`.toy-${toy.id}`).innerHTML = `${toy.likes} Likes `})
  }
})

const createNewToy = (toy) => {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
  		'Content-Type': 'application/json',
  		'Accept': 'application/json'
  	},
    body: JSON.stringify(toy)
  }).then(response => {
    return response.json()
  })
}

const updateToyLikes = (id, toy) => {
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
  		'Content-Type': 'application/json',
  		'Accept': 'application/json'
  	},
    body: JSON.stringify(toy)
  }).then(response => {
    return response.json()
  })
}

const deleteToy = (id) => {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE'
  })
}
// OR HERE!
