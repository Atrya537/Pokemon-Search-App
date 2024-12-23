const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const infoContainer = document.getElementById("info-container");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weightSpan = document.getElementById("weight");
const heightSpan = document.getElementById("height");
const imgDiv = document.getElementById("pokemon-image");
const typesDiv = document.getElementById("types");

const hpParagraph = document.getElementById("hp");
const attackParagraph = document.getElementById("attack");
const defenseParagraph = document.getElementById("defense");
const spAttackParagraph = document.getElementById("special-attack");
const spDefenseParagraph = document.getElementById("special-defense");
const speedParagraph = document.getElementById("speed");

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const resetOutput = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weightSpan.textContent = "";
  heightSpan.textContent = "";
  imgDiv.innerHTML = "";
  typesDiv.innerHTML = "";

  hpParagraph.textContent = "";
  attackParagraph.textContent = "";
  defenseParagraph.textContent = "";
  spAttackParagraph.textContent = "";
  spDefenseParagraph.textContent = "";
  speedParagraph.textContent = "";
};

const fetchData = async () => {
  try {
    const res = await fetch(
      "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
    );
    const data = await res.json();
    checkInput(data["results"]);
  } catch (err) {
    console.log(err);
  }
};

const checkInput = async (data) => {
  const validPokemon = data.find(
    (pokemon) =>
      pokemon["name"] === searchInput.value.toLowerCase() ||
      pokemon["id"] === parseInt(searchInput.value)
  );

  if (!validPokemon) {
    alert("Pokémon not found");
    return;
  }

  try {
    const res = await fetch(validPokemon["url"]);
    const data = await res.json();
    populateFields(data);
  } catch (err) {
    console.log(err);
  }
};

const populateFields = (data) => {
  pokemonName.textContent = data["name"].toUpperCase();
  pokemonId.textContent = `#${data["id"]}`;
  weightSpan.textContent = data["weight"];
  heightSpan.textContent = data["height"];
  imgDiv.innerHTML = `<img id="sprite" src="${
    data["sprites"]["front_default"]
  }" alt="Image of ${capitalize(data["name"])}">`;

  data["types"].forEach((element) => {
    typesDiv.innerHTML += `<p class="${element["type"]["name"]}">${element[
      "type"
    ]["name"].toUpperCase()}</p>`;
  });

  data["stats"].forEach((base) => {
    const { base_stat, stat } = base;
    document.getElementById(stat["name"]).textContent = base_stat;
  });

  infoContainer.style.display = "block";
};

searchButton.addEventListener("click", () => {
  resetOutput();
  fetchData();
});
