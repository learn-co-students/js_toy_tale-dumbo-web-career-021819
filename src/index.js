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


window.addEventListener('DOMContentLoaded', (event) => {
    const toyCollectionDiv = document.getElementById("toy-collection")

    // renderToys(toyCollectionDiv)
    fetchToys(toyCollectionDiv);
    addToyHandler(toyCollectionDiv);
    increaseLikes(toyCollectionDiv);

});

const toyCard = (toy) => {
  return `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" data-id=${toy.id}>Like <3</button>
    </div>`
}

const fetchToys = (toyCollectionDiv) => {
  fetch("http://localhost:3000/toys").then((response) => {
    return response.json()
  }).then((toys) => {
    toys.forEach((toy) => {
      toyCollectionDiv.innerHTML += toyCard(toy)
    })
  })
}

// when add submit button is clicked, fire a POST fetch request and then render new toy

// const toyCard = (toy) => {
//   return
// }

const addToyHandler = (toyCollectionDiv) => {
  let form = document.querySelector("form.add-toy-form")

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    let toyName = event.target.name.value
    let toyImage = event.target.image.value
    createNewToy(toyName, toyImage, toyCollectionDiv)
  })
}

const createNewToy = (toyName, toyImage, toyCollectionDiv) => {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  }).then((response) => {
    return response.json()
  }).then((toy) => {
    toyCollectionDiv.innerHTML += toyCard(toy)
  })
}


//////ADD AN EVENT LISTENER TO THE LIKE BUTTON, MAKE A PATCH REQUEST TO THE SERVER, AND SHOW THE TEXT ON THE PAGE TO REFLECT

const increaseLikes = (toyCollectionDiv) => {
  toyCollectionDiv.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      let likesText = event.target.parentElement.querySelector('p').innerText
      let toyLikes = parseInt(likesText.split(' ')[0])
      toyLikes++;
      let toyId = event.target.dataset.id
      // debugger;
      increaseLikesFetch(toyId, toyLikes);
      event.target.parentElement.querySelector('p').innerText = `${toyLikes} Likes`
    }
  })
}

const increaseLikesFetch = (toyId, toyLikes) => {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: toyLikes
    })
  })
}








































































































































// const addBtn = document.querySelector('#new-toy-btn')
// const toyForm = document.querySelector('.container')
// let addToy = false
//
// // YOUR CODE HERE
//
//
// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//     // submit listener here
//   } else {
//     toyForm.style.display = 'none'
//   }
// })
//
// /////////UPDATE TOY LIKE COUNT
// const updateToyLikeCount = (id, likeCount) => {
//   return fetch(`http://localhost:3000/toys/${id}`, {
//     method: 'PATCH',
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({likes: likeCount})
//   }).then((response) => {
//     return response.json()
//   })
// }
//
//
//
// // const toyCards = document.getElementById('toy-collection')
// const toyCollectionDiv = document.getElementById('toy-collection')
//
// toyCollectionDiv.addEventListener('click', (event) => {
//
//   if (event.target.tagName === 'BUTTON') {
//
//
//     let currentButtonTag = event.target;
//     let pTag = currentButtonTag.parentElement;
//
//     newLikeCount = parseInt(pTag.dataset.likeCount)
//     newLikeCount++;
//
//     updateToyLikeCount(pTag.dataset.id, newLikeCount).then((toy) => {
//       pTag.dataset.likeCount = toy.likes;
//       let likeText = `${toy.likes} Likes`;
//
//       pTag.textContent = likeText;
//     })
//   }
// })
//
// // // be able to add a "hug" to a compliment and see my hug count go up accordingly
// //
// // // we need to find all of our buttons
// // ulTag.addEventListener('click', (event) => {
// //   if (event.target.tagName === 'BUTTON') {
// //     let currentButtonTag = event.target;
// //     let citeTag = currentButtonTag.parentElement.querySelector('cite');
// //
// //     let newHugCount = parseInt(citeTag.dataset.hugCount)
// //     newHugCount++;
// //
// //     // we also need to update the server
// //     updateComplimentHugCount(citeTag.dataset.id, newHugCount).then((compliment) => {
// //       // we update the DOM here
// //       citeTag.dataset.hugCount = compliment.hug_count;
// //       let newHugText = `Hugged ${compliment.hug_count} times`;
// //
// //       citeTag.textContent = newHugText;
// //     })
// //
// //   } else if (event.target.className === 'trash') {
// //     // deletes the compliment from our server
// //     deleteCompliment(event.target.dataset.id)
// //     // removes the li from the DOM
// //     event.target.parentElement.remove()
// //
// //   } else if (event.target.classList.contains('favorite')) {
// //     event.target.parentElement.innerHTML =
// //     `<img src="https://emoji.slack-edge.com/T02MD9XTF/matt-parrot/6e11d5decd7c13f5.gif" class="matt-parrot" />` +
// //     event.target.parentElement.innerHTML
// //   }
// // })
//
//
//
//
//
// const createToyDiv = toyObject => {
//   return `<div class = "card">
//     <h2>${toyObject.name}</h2>
//     <img src= "${toyObject.image}" class="toy-avatar" />
//     <p data-id= "${toyObject.id}" data-like-count = ${toyObject.likes}>  ${toyObject.likes} Likes </p>
//     <button class="like-btn">Like <3</button>
//     </div>`
// }
//
// fetch('http://localhost:3000/toys').then(response => {
//   return response.json()
// }).then(object => {
//   object.forEach((toyObject) => {
//     toyCollectionDiv.innerHTML += createToyDiv(toyObject)
//   })
// })
//
// const formTag = document.querySelector('form')
//
// const createNewToy = toy => {
//   return fetch("http://localhost:3000/toys", {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       'Accept': "application/json"
//     },
//     body: JSON.stringify(toy)
//   }).then(response => {
//     return response.json()
//   })
// }
//
// // const createNewCompliment = (compliment) => {
// //   return fetch('http://localhost:3000/compliments/', {
// //     method: 'POST',
// //     headers: {
// //   		'Content-Type': 'application/json',
// //   		'Accept': 'application/json'
// //   	},
// //     body: JSON.stringify(compliment)
// //   }).then(response => {
// //     return response.json()
// //   })
// // }
//
//
//
//
//
//
// formTag.addEventListener('submit', (event) => {
//   event.preventDefault();
//
//   const toyName = event.target.name.value;
//   const toyImage = event.target.image.value;
//
//   const toyObject = {
//     name: toyName,
//     image: toyImage,
//     likes: 0
//   }
//
//   createNewToy(toyObject).then(newToy => {
//     toyCollectionDiv.innerHTML = createToyDiv(newToy) + toyCollectionDiv.innerHTML
//   })
// })
// // //  ----- to add my own compliments ------
// //
// // // find our form
// // const formTag = document.querySelector('form')
// // // on submit, grab whatever is in the input box in the form (the compliment)
// // formTag.addEventListener('submit', (event) => {
// //   event.preventDefault();
// //
// //   const complimentText = event.target.compliment.value;
// //
// //   const complimentObject = {
// //     message: complimentText,
// //     hug_count: 0,
// //     favorited: false
// //   }
// //   createNewCompliment(complimentObject).then(newCompliment => {
    // ulTag.innerHTML = createComplimentCardHTML(newCompliment) + ulTag.innerHTML;
// //   })
// //   // did this work?
// //   // if so, do this:
// // })
