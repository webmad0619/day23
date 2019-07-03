let allCharacters = []

// this function leaves all the form fields with blank values
function resetFormFields() {
  document.querySelector("aside form input[name=name]").value = ""
  document.querySelector("aside form input[name=occupation]").value = ""
  document.querySelector("aside form input[name=weapon]").value = ""
  document.querySelector("aside form input[name=debt]").value = ""
  document.querySelector("aside form input[name=id]").value = ""
}


// edits a characters based on their index in the allCharacters array
function edit(idx) {
  // here we get the chosen character based on the edit link the user clicked
  const chosenCharacter = allCharacters[idx]

  // here we reset all the list items containing characters to style absence
  document.querySelectorAll(`#characters-container li`).forEach(li => li.style.color = "black")

  // here we set the style of the chosen list item that you want to edit
  document.querySelector(`#characters-container li:nth-child(${idx + 1})`).style.color = "red"

  // here we populate all the form fields with the values of the character you chose
  document.querySelector("aside form input[name=id]").value = chosenCharacter._id
  document.querySelector("aside form input[name=name]").value = chosenCharacter.name
  document.querySelector("aside form input[name=occupation]").value = chosenCharacter.occupation
  document.querySelector("aside form input[name=weapon]").value = chosenCharacter.weapon
  document.querySelector("aside form input[name=debt]").value = +chosenCharacter.debt

  // here you change the button text for better UX
  document.querySelector("aside form #addNewCharacter").innerHTML = "Update chosen character"

  // here you set the button handler so you can click to confirm the character edition
  document.querySelector("#addNewCharacter").onclick = function (e) {
    // this line prevents the form submitting by default, so you can send its collected data through ajax - axios
    e.preventDefault()

    // here we collect all the data in the form (including the edited character id in the mongo db)
    const updatedCharacterJSONPayload = {
      name: document.querySelector("aside form input[name=name]").value,
      occupation: document.querySelector("aside form input[name=occupation]").value,
      weapon: document.querySelector("aside form input[name=weapon]").value,
      debt: +document.querySelector("aside form input[name=debt]").value,
      id: document.querySelector("aside form input[name=id]").value
    }

    // here we use axios.put so you can update the character, sending the form data to the corresponding
    // API endpoint (updateCharacter)
    // remember updatedCharacterJSONPayload is all the collected data from the form
    axios
      .put("http://localhost:3000/updateCharacter", updatedCharacterJSONPayload)
      .then(allCharactersPayload => {

        // once we have all the characters already loaded, including the modified one
        // we update the right hand side list with all the characters
        updateCharacters(allCharactersPayload)

        // here we reset the form fields so you have a cleared form
        resetFormFields()
      })
  }
}

// update characters receives a JSON payload with all the characters and paints it in the DOM
function updateCharacters(allCharactersPayload) {
  const characterContainerDOMEl = document.querySelector("#characters-container")

  // here we clear out all the previous list items (characters) so we always start the list from scratch
  characterContainerDOMEl.innerHTML = ""

  // here we globalize the received axios payload from our API so we use it in multiple places 
  // for example to edit (remember the function edit(idx) works with this array)
  allCharacters = allCharactersPayload.data

  // here we traverse the whole list of characters and make list items and edit links available for the user
  allCharactersPayload.data.forEach((character, idx) => {
    const liDOMEl = document.createElement("li")
    liDOMEl.innerHTML = `${character.name} ${character.occupation} ${character.weapon} ${character.debt} <a href="#" onclick="edit(${idx})">edit</a>`
    characterContainerDOMEl.appendChild(liDOMEl)
  })
}

// here we query all the characters to start-off the app in a populated state
axios
  .get("http://localhost:3000/allCharacters")
  .then(allCharactersPayload => {
    updateCharacters(allCharactersPayload)
  })

// when we click to add a new character
document.querySelector("#addNewCharacter").onclick = function (e) {
  // here we prevent the form to be submitted
  e.preventDefault()

  // here we collect all the data from the form so we can create a character accordingly
  const newCharacterJSONPayload = {
    name: document.querySelector("aside form input[name=name]").value,
    occupation: document.querySelector("aside form input[name=occupation]").value,
    weapon: document.querySelector("aside form input[name=weapon]").value,
    debt: +document.querySelector("aside form input[name=debt]").value
  }

  // here we send the JSON payload we collected in order to create a new character
  axios
    .post("http://localhost:3000/charactersGenerator", newCharacterJSONPayload)
    .then(allCharactersPayload => {
      // when the character has been created we want to update the characters list
      updateCharacters(allCharactersPayload)

      // and reset the form fields, so you can start again writing a new character
      resetFormFields()
    })
}