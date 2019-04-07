

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
  return `<div class="card" id="${toyObject.id}">
    <h2>${toyObject.name}</h2>
    <img src= "${toyObject.image}" class="toy-avatar" />
    <p data-like-count="${toyObject.likes}"> ${toyObject.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    </div>`
}


toyCollectionDiv.addEventListener('click', (event) => {
  if (event.target.className === 'like-btn') {
      event.preventDefault();
      let currentButtonTag = event.target;
      let pTag = currentButtonTag.parentElement.querySelector('p');

      let newLikeCount = parseInt(pTag.dataset.likeCount)
      newLikeCount++;

      updateToyLikeCount(event.target.parentElement.id, newLikeCount).then(toy => {
        let likeText = `${toy.likes} Likes`;
        pTag.innerText = likeText;
      })
  }
});

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

const updateToyLikeCount = (id, likeCount) => {
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      'Accept': "application/json"
    },
    body: JSON.stringify({"likes": likeCount})
  }).then(response => {
    return response.json()
  })
}

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


// OR HERE!
