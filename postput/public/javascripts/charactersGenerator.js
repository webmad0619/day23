let allCharacters = []

function resetFormFields() {
  document.querySelector("aside form input[name=name]").value = ""
  document.querySelector("aside form input[name=occupation]").value = ""
  document.querySelector("aside form input[name=weapon]").value = ""
  document.querySelector("aside form input[name=debt]").value = ""
  document.querySelector("aside form input[name=id]").value = ""
}

function edit(idx) {
  const chosenCharacter = allCharacters[idx]

  document.querySelectorAll(`#characters-container li`).forEach(li => li.style.color = "black")
  document.querySelector(`#characters-container li:nth-child(${idx + 1})`).style.color = "red"

  document.querySelector("aside form input[name=id]").value = chosenCharacter._id
  document.querySelector("aside form input[name=name]").value = chosenCharacter.name
  document.querySelector("aside form input[name=occupation]").value = chosenCharacter.occupation
  document.querySelector("aside form input[name=weapon]").value = chosenCharacter.weapon
  document.querySelector("aside form input[name=debt]").value = +chosenCharacter.debt

  document.querySelector("aside form #addNewCharacter").innerHTML = "Update chosen character"

  document.querySelector("#addNewCharacter").onclick = function (e) {
    e.preventDefault()

    const updatedCharacterJSONPayload = {
      name: document.querySelector("aside form input[name=name]").value,
      occupation: document.querySelector("aside form input[name=occupation]").value,
      weapon: document.querySelector("aside form input[name=weapon]").value,
      debt: +document.querySelector("aside form input[name=debt]").value,
      id: document.querySelector("aside form input[name=id]").value
    }

    axios
      .put("http://localhost:3000/updateCharacter", updatedCharacterJSONPayload)
      .then(allCharactersPayload => {
        updateCharacters(allCharactersPayload)

        resetFormFields()
      })

  }
}

function updateCharacters(allCharactersPayload) {
  const characterContainerDOMEl = document.querySelector("#characters-container")
  characterContainerDOMEl.innerHTML = ""

  allCharacters = allCharactersPayload.data

  allCharactersPayload.data.forEach((character, idx) => {
    const liDOMEl = document.createElement("li")
    liDOMEl.innerHTML = `${character.name} ${character.occupation} ${character.weapon} ${character.debt} <a href="#" onclick="edit(${idx})">edit</a>`
    characterContainerDOMEl.appendChild(liDOMEl)
  })
}

axios
  .get("http://localhost:3000/allCharacters")
  .then(allCharactersPayload => {
    updateCharacters(allCharactersPayload)
  })

document.querySelector("#addNewCharacter").onclick = function (e) {
  e.preventDefault()

  // <input type="text" name="name" placeholder="name">
  // <input type="text" name="occupation" placeholder="occupation">
  // <input type="text" name="weapon" placeholder="weapon">
  // <input type="text" name="debt" placeholder="debt">

  const newCharacterJSONPayload = {
    name: document.querySelector("aside form input[name=name]").value,
    occupation: document.querySelector("aside form input[name=occupation]").value,
    weapon: document.querySelector("aside form input[name=weapon]").value,
    debt: +document.querySelector("aside form input[name=debt]").value
  }

  axios
    .post("http://localhost:3000/charactersGenerator", newCharacterJSONPayload)
    .then(allCharactersPayload => {
      updateCharacters(allCharactersPayload)

      resetFormFields()
    })
}