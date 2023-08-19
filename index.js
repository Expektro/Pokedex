const nome = document.querySelector(".nome");
const id = document.querySelector(".id");
const imagem = document.querySelector("#ima");
const form = document.querySelector(".form");
const search = document.querySelector(".Pesquisar");
const anterior = document.querySelector(".anterior");
const proximo = document.querySelector(".proximo");
var num = 1;

const fetchPoke = async (pokemon) => {
  const RespostaAPI = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (RespostaAPI.status === 200) {
    const data = await RespostaAPI.json();
    return data;
  }
};
const Pokemon = async (pokemon) => {
  nome.innerHTML = "Carregando...";
  id.innerHTML = "";
  const data = await fetchPoke(pokemon);
  if (data) {
    imagem.style.display = "block";
    nome.innerHTML = `Nome: ${data.name}`;
    id.innerHTML = `ID: ${data.id}`;

    imagem.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    search.value = "";
    num = data.id;
  } else {
    nome.innerHTML = "-Not Found :C";
    imagem.style.display = "none";
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  Pokemon(search.value.toLowerCase());
});
anterior.addEventListener("click", () => {
  if (num > 1) {
    num -= 1;
    Pokemon(num);
  }
});
proximo.addEventListener("click", () => {
  num += 1;
  Pokemon(num);
});
Pokemon(num);
