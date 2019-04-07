const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const divClassToyCollectionTag = document.querySelector('div#toy-collection')

let addToy = false

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/toys')
    .then(response => {
      return response.json()
    })
    .then(parsedJson => {
      for (let objElem of parsedJson) {
        divClassToyCollectionTag.innerHTML += makeNewCard(objElem);

        // `<div class="card">
        // <h2>${objElem.name}</h2>
        // <img src=${objElem.image} class='toy-avatar'/>
        // <p>${objElem.likes} Likes</p>
        // <button class="like-btn">Like <3</button>
        //  </div>`
      }
    })
})
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    const formTag = document.querySelector('form.add-toy-form');
    formTag.addEventListener('submit', event => {
      event.preventDefault();
      const nameValue = event.target.name.value;
      const imageValue = event.target.image.value;

      const formInfoObject = {
        "name": nameValue,
        "image": imageValue,
        "likes": 0
      }

      createNewToy(formInfoObject)
        .then(formInfoObjectWithID => {
          divClassToyCollectionTag.innerHTML = makeNewCard(formInfoObjectWithID) + divClassToyCollectionTag.innerHTML
        })
      event.target.name.value = '';
      event.target.image.value = '';
    })
  } else {
    toyForm.style.display = 'none'
  }
})

const makeNewCard = (formInfoObjectWithID) => {
  return `<div class="card">
  <h2>${formInfoObjectWithID.name}</h2>
  <img src=${formInfoObjectWithID.image} class='toy-avatar'/>
  <p data-id="${formInfoObjectWithID.id}" data-likes-count="${formInfoObjectWithID.likes}">${formInfoObjectWithID.likes} Likes</p>
  <button class="like-btn">Like <3</button>
  </div>`
};
// OR HERE!
const createNewToy = (formInfoObject) => {
  return fetch('http://localhost:3000/toys',
  { method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formInfoObject)
    })
    .then(response => {
      return response.json();
  })
}



divClassToyCollectionTag.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    let currentLikeButton = event.target;
    let pTag = currentLikeButton.parentElement.querySelector('p');

    let newLikes = parseInt(pTag.dataset.likesCount);
    newLikes++;

    pTag.dataset.likesCount = newLikes;
    updateToyLikes(pTag.dataset.id, newLikes)
      .then(thingWithNewLikes => {
        pTag.dataset.likesCount = thingWithNewLikes.likes;
        let newLikeText = `${thingWithNewLikes.likes} likes`;

        pTag.innerHTML = newLikeText;
    })
  }
})

const updateToyLikes = (id, newLikes) => {
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({"likes": newLikes})
  })
    .then(response => {
      return response.json();
    })
}
