// Tags
const addBtn = document.querySelector('#new-toy-btn');
const toyFormContainer = document.querySelector('.container');
const divTag = document.querySelector('div#toy-collection');
const likeBtn = document.querySelector('button#like-btn');
const deleteBtn = document.querySelector('button#delete-btn');
const formTag = document.querySelector('form.add-toy-form');


// The form will only show when you hit the button
let addToy = false;


// Helper Functions

const pluralizeLikes = (toyObj) => {
  let likesCount = toyObj["likes"];
  if (likesCount === 0 || likesCount > 1) {
    return `${likesCount} Likes`;
  } else {
    return "1 Like";
  };
};


const createToyCardHTML = (toyObj) => {
  return `<div class="card" data-id="${toyObj["id"]}" data-likes-count="${toyObj["likes"]}">
            <button id="delete-btn">️🗑️</button>
            <h2>${toyObj["name"]}</h2>
            <img class="toy-avatar" src=${toyObj["image"]}>
            <p id="likes">${pluralizeLikes(toyObj)}</p>
            <button id="like-btn">👍</button>
          </div>`;
};


const createToy = (toyObj) => {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyObj)
  }).then(response => {
    return response.json();
  });
};


const updateLikesCount = (id, likesCount) => {
  return fetch(`http://localhost:3000/toys/${id}`, {
  	method: 'PATCH',
  	headers: {
  		'Content-Type': 'application/json',
  		'Accept': 'application/json'
  	},
  	body: JSON.stringify({"likes": likesCount})
  }).then(response => {
    return response.json();
  });
};


const deleteToy = (id) => {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE'
  });
};


document.addEventListener('DOMContentLoaded', (event) => {

  // The following happen after the page has loaded

  // Making a card for each toy
  const toysUrl = "http://localhost:3000/toys";
  fetch(toysUrl).then(response => {
    return response.json();
  }).then(arrayOfToyObjects => {
    arrayOfToyObjects.forEach(toyObj => {
      divTag.innerHTML += createToyCardHTML(toyObj);
    });
  });

  // Adding a toy
  addBtn.addEventListener('click', (event) => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = 'block';
      // submit listener here
      formTag.addEventListener('submit', event => {
        event.preventDefault();
        const toyName = event.target.name.value;
        const toyUrl = event.target.image.value;
        const toyObj = {
          "name": toyName,
          "image": toyUrl,
          "likes": 0
        };
        createToy(toyObj).then(newToy => {
          divTag.innerHTML = createToyCardHTML(newToy) + divTag.innerHTML;
        });
      });
    } else {
      toyFormContainer.style.display = 'none';
    };
  });


  divTag.addEventListener('click', (event) => {

    // Updating the likes count of a toy
    if (event.target.id === 'like-btn') {
      let currentButton = event.target;
      let divCardTag = currentButton.parentElement;
      let likesCount = parseInt(divCardTag.dataset.likesCount);
      likesCount++;
      // update the server
      updateLikesCount(divCardTag.dataset.id, likesCount).then(toyObj => {
        // update the DOM
        divCardTag.dataset.likesCount = toyObj["likes"];
        let pLikesTag = divCardTag.querySelector('p#likes');
        let newLikesText = pluralizeLikes(toyObj);
        pLikesTag.innerText = newLikesText;
      });

    // Deleting a toy
    } else if (event.target.id === 'delete-btn') {
      // delete the toy from the server
      let currentButton = event.target;
      let divCardTag = currentButton.parentElement;
      deleteToy(divCardTag.dataset.id);
      // remove the element from the DOM
      divCardTag.remove();
    };
  });

});
