const addBtn = document.querySelector('#new-toy-btn')
const toyFormDiv = document.querySelector('.container')
const toyForm = document.querySelector('#new-toy-form')

let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormDiv.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', (event) => {
    	event.preventDefault();
    	const toyName = event.target.name.value
    	const toyImage = event.target.image.value
    	fetch('http://localhost:3000/toys', {
    		method: 'POST',
    		headers: 
			{
			  "Content-Type": "application/json",
			  "Accept": "application/json"
			},
			body: JSON.stringify({
				"name": toyName,
				"image": toyImage,
				"likes": 0
			})
    	}).then(res => res.json()).then(toy => {
    		createToyCard(toy)
    	})
    })
  } else {
    toyFormDiv.style.display = 'none'
  }
})

let toyDiv = document.querySelector('#toy-collection')

const createToyCard = (toy) => {
	toyDiv.innerHTML += `
	<div class="card" data-id=${toy.id}>
	    <h2>${toy.name}</h2>
	    <img src=${toy.image} class="toy-avatar" />
	    <p><span>${toy.likes}</span> Likes </p>
	    <button class="like-btn">Like 💖</button>
  	</div>
  `
}

document.addEventListener('DOMContentLoaded', (event) => {
	fetch('http://localhost:3000/toys')
	.then(res => {
		return res.json()
	}).then(arrayOfToyObjects => {
		arrayOfToyObjects.forEach((toyObj) => {
			createToyCard(toyObj)
			// method to create a toy card
		})
	})
})
// OR HERE!
document.querySelector('#toy-collection').addEventListener('click', (event) => {
	if(event.target.className === 'like-btn') {
		const id = event.target.parentElement.dataset.id
		const spanTag = event.target.parentElement.querySelector('span')
		let likeCount = parseInt(spanTag.innerText)

		fetch(`http://localhost:3000/toys/${id}`, {
			method: 'PATCH',
			headers: 
			{
			  "Content-Type": "application/json",
			  "Accept": "application/json"
			},
			body: JSON.stringify({
				"likes": ++likeCount
			})
		}).then(res => res.json())
		.then(toy => {
			spanTag.innerText = toy.likes
		})

    }
})