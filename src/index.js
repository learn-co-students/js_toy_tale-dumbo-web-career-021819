const addBtn = document.querySelector('#new-toy-btn');
const toyFormDiv = document.querySelector('.container');
let addToy = false;
const toysDiv = document.querySelector('#toy-collection');
const toyForm = document.querySelector('#new-toy');
let newToyImg = toyForm.querySelector('#toy-img').value;
let newToyName = toyForm.querySelector('#toy-name').value;

function createNewToy(toy) {
  return fetch('http://localhost:3000/toys/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  },
  body: JSON.stringify(toy)
}).then( (response) => {
    return response.json();
  });
};

function addToyLike(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: 'PATCH',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  },
  body: JSON.stringify({
    likes: toy.likes
  })
}).then( (response) => {
    return response.json();
  });
};


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormDiv.style.display = 'block'
  } else {
    toyFormDiv.style.display = 'none'
  };
});

toyForm.addEventListener('submit', function(e){
  let newToy = {
    name: toyForm.querySelector('#toy-name').value,
    image: toyForm.querySelector('#toy-img').value,
    likes: 0
  };
  createNewToy(newToy).then((toy) => {
    toysDiv.innerHTML += `<div data-toy-id="${toy['id']}" data-likes-count='${toy['likes']}' class="card">
    <h2>${toy['name']}</h2>
    <img src=${toy['image']} class="toy-avatar" />
    <p>${toy['likes']} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
  });

});

fetch("http://localhost:3000/toys/")
.then((response) => {
  return response.json();
})
.then((toys) => {
  toys.forEach(function(toy) {
    toysDiv.innerHTML += `<div data-toy-id="${toy['id']}" data-likes-count='${toy['likes']}' class="card">
    <h2>${toy['name']}</h2>
    <img src=${toy['image']} class="toy-avatar" />
    <p>${toy['likes']} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
  });
});

toysDiv.addEventListener('click', function(e){
  if (e.target.className === "like-btn"){
    let thisToyDiv = e.target.parentElement;
    let likePhrase = e.target.parentElement.querySelector('p');
    let toy = {
      id: thisToyDiv.dataset.toyId,
      likes: parseInt(thisToyDiv.dataset.likesCount)+1
    };
    addToyLike(toy).then( (toy) => {
      thisToyDiv.dataset.likesCount = `${toy.likes}`;
      likePhrase.innerText = `${toy.likes} Likes`;
    });
  };
});
