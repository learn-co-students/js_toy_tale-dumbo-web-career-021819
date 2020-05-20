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
                 let createButtonClicked = document.querySelector('input.submit')
         createButtonClicked.addEventListener('click', (event) => {
    	        let newToy = {}
    	         newToy.name = event.target.form[0].value
    	         newToy.image = event.target.form[1].value
    	         newToy.likes = 0
                 

                  fetch('http://localhost:3000/toys', { 
                  	method:'POST',
                  	 headers: {
        	          'Content-Type': 'application/json',
        	          'Accept': 'application/json'  },
        	                          body: JSON.stringify(newToy) 
            
                                                      })
                  .then((response) => {console.log(response.json)})

                                                                 })
     }
           
   else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
// STEP 2 & 3: Fetch Andy's Toys!
// On the index.html page, there is a div with the id "toy-collection"

// When the page loads, make a 'GET' request to fetch all the toy objects.
// With the response data, make a <div class="card"> 
//for each toy and add it to the toy-collection div.
const createToyStoryHTML = (object) => {
	return `<center>
	<h2>${object.name} </h2>
	<img src=${object.image} width="200" height="200" class="toy-avatar">  </img>
	<p> ${object.likes} Likes</p>
	<button class="like-btn" data-likes=${object.likes} data-id=${object.id}>Like 👌</button>
		</center>`
}


let toyCollectionDiv = document.querySelector('#toy-collection')

let ObjUrl = "http://localhost:3000/toys"
let ObjPromise = fetch(ObjUrl)
let jsonArray = ObjPromise.then((response) => {return response.json()})
jsonArray.then((objects) => {
//create a loop to write the html updates using the object array
	objects.forEach((object) => {
		toyCollectionDiv.innerHTML = createToyStoryHTML(object) + toyCollectionDiv.innerHTML
	})})

toyCollectionDiv.addEventListener('click', (event) => {
	if (event.target.classList.value == 'like-btn') {
	    let id = event.target.dataset.id
	    let likes = event.target.dataset.likes
	    likes = parseInt(likes)
	    likes += 1
		console.log(`like button with id${id} clicked`)
         
		//like button clicked works
        patchLikesForToys(id,likes)
        
        event.target.dataset.likes = likes
        event.target.parentElement.querySelector('p').innerHTML = `${likes} Likes`
	}

 })


function patchLikesForToys(id,likes) {
	fetch(`http://localhost:3000/toys/${id}`, { 
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json",
            Accept: "application/json"
        },
        body:  JSON.stringify({
                      "likes": `${likes}`
                       })
           
    })
}

// STEP 5: Increase toy's likes!
// When a user clicks on a toy's like button, two things should happen:

// Conditionally increase the toy's like count
// Send a patch request to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
// Headers and body are provided below. If your request isn't working, make sure your header and keys match the documentation.

// PATCH http://localhost:3000/toys/:id
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }
 
// body:
// {
//   "likes": <new number>
// }


