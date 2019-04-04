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
// STEP 3: Add toy info to the card!

let ulTag = document.querySelector("#toy-collection");

const createToyLi = (toy) => {
  return `<li>
    <div class="card">
      <h2>${toy.name}</h2>
      <img class="toy-avatar" src="${toy.image}"/>
      <p data-like-count="${toy.likes}" data-id="${toy.id}"> Liked ${toy.likes} times </p>
      <button class="like-btn">Like <3 </button>
     </div>
    </li>`
}

fetch('http://localhost:3000/toys')
  .then((response) => {
    return response.json()
  }).then((toys) => {
    toys.forEach((toy) => {
      ulTag.innerHTML += createToyLi(toy);
    })
  })

//STEP 4: Add a new toy!

document.querySelector(".add-toy-form").addEventListener('submit', function (event) {
event.preventDefault();

let createObj = { method: 'POST', headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  }, body: JSON.stringify(
    {
      "name": `${event.target[0].value}`,
      "image": `${event.target[1].value}`,
      "likes": 0
    })
  };

const createNewToy = (object) =>{
  return fetch('http://localhost:3000/toys', object)
  .then((response) => {
    return response.json()
  })
};

createNewToy(createObj).then((newToy) => {
  ulTag.innerHTML = createToyLi(newToy) + ulTag.innerHTML;
})

});

//STEP 5: Increase toy's likes!

ulTag.addEventListener('click', function(event) {
  let likeCount = "";
  let toyId = "";
  let editObj = {};
  let par = "";

  if (event.target.className == 'like-btn') {
    par = event.target.parentElement.querySelector('p');
    likeCount = parseInt(par.dataset.likeCount) + 1;
    toyId = par.dataset.id;
    editObj = {method: 'PATCH', headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        }, body: JSON.stringify(
          {
            "likes": likeCount
          })
        };

const updateLikes = (toyId, object) => {
  return fetch(`http://localhost:3000/toys/${toyId}`, object)
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
  };

updateLikes(toyId, editObj).then((updatedToy) => {
  par.dataset.likeCount = likeCount;
  par.textContent = `Liked ${likeCount} times`;
});
}
});
