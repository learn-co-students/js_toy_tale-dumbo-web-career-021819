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


// OR HERE!
const toyCollectDiv = document.querySelector('div#toy-collection')

const createNewToy = (toy) => {
  return ` <div class="card">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p data-id="${toy.id}" data-like-count="${toy.likes}">${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
</div>`
}

fetch('http://localhost:3000/toys')
  .then((response) => {
    return response.json()
  }).then((toys) => {
    toys.forEach((toy) => {
      toyCollectDiv.innerHTML += createNewToy(toy)
    })
  })

    //   let div = document.createElement('div')
    //   div.setAttribute('class', 'card')
    //   let h2Tag = document.createElement('h2')
    //   let imgTag = document.createElement('img')
    //   let pTag = document.createElement('p')
    //   let buttonTag = document.createElement('button')
    //   buttonTag.setAttribute('class', 'like-btn')
    //   h2Tag.innerText = toy.name 
    //   imgTag.src = toy.image
    //   // imgTag.className = "toy-avatar"
    //   imgTag.setAttribute('class', 'toy-avatar')
    //   pTag.innerText = `${toy.likes} Likes `
    //   buttonTag.innerText = "Like <3"
    //   div.appendChild(h2Tag)
    //   div.appendChild(imgTag)
    //   div.appendChild(pTag)
    //   div.appendChild(buttonTag)
    //   toyCollectDiv.appendChild(div)

const addNewToy = (toy) => {
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

const formTag = document.querySelector('form.add-toy-form')

formTag.addEventListener('submit', (event) => {
  event.preventDefault();
debugger
  const toyName = event.target.name.value
  const toyImg = event.target.image.value
  const toyObj = {
    name: toyName,
    image: toyImg,
    likes: 0
  }
  addNewToy(toyObj).then((newToy) => {
    let newToyObj = `
    <div class="card">
      <h2> ${newToy.name} </h2>
      <img src=${newToy.image}/>
      <p> ${newToy.likes} Likes </p>
      <button class="like-btn"> Like <3 </button>
    </div>`
    toyCollectDiv.innerHTML += newToyObj
  })
})

const buttonTag = document.querySelector('button.like-btn')

const updateLikeCount = (id, likeCount) => {
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

toyCollectDiv.addEventListener('click', (event) => {
  if(event.target.className === 'like-btn') {
    let currentButtonTag = event.target;
    let currentPTag = currentButtonTag.parentElement.querySelector('p');
    let newLikeCount = parseInt(currentPTag.dataset.likeCount)
    newLikeCount++;
    

    updateLikeCount(currentPTag.dataset.id, newLikeCount).then((toy) => {
      currentPTag.dataset.likeCount = toy.likes;
      let newLikeText = `${toy.likes} Likes`;
      currentPTag.textContent = newLikeText;
    })
  }

})

// find the buttonTag that has the innerText - like <3
// then add the udate fetch
// Patch request
