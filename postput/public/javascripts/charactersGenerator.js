function updateCharacters(allCharactersPayload) {
  const characterContainerDOMEl = document.querySelector("#characters-container")
  characterContainerDOMEl.innerHTML = ""

  allCharactersPayload.data.forEach(character => {
    const liDOMEl = document.createElement("li")
    liDOMEl.innerHTML = `${character.name} ${character.occupation} ${character.weapon} ${character.debt}`
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

      document.querySelector("aside form input[name=name]").value = ""
      document.querySelector("aside form input[name=occupation]").value = ""
      document.querySelector("aside form input[name=weapon]").value = ""
      document.querySelector("aside form input[name=debt]").value = ""
    })
}