let cep = document.querySelector("#cep");
let consultarBotao = document.querySelector(".consultar-btn");
let formCard = document.querySelector(".form-card");

let cepBotao = document.querySelector(".descobrir-cep-btn");
let enderecoBotao = document.querySelector(".descobrir-endereco-btn");
let consultarCepClass = document.querySelector(".descobrir-cep");
let descobrirCepClass = document.querySelector(".descobrir-endereco");

let rua = document.querySelector("#rua");
let cidade = document.querySelector("#cidade");
let uf = document.querySelector("#estado");
let btnCep = document.querySelector("#btnBuscaCep");
let listaCep = document.querySelector("#lista-cep");


function hasP() {
  let hasP = formCard.querySelector("p");
  if (hasP) {
    formCard.removeChild(hasP);
  }
  cep.value = "";
}

// Show Form
cepBotao.addEventListener("click", () => {
  if (!descobrirCepClass.classList.contains("hide")) {
    descobrirCepClass.classList.add("hide");
  }
  consultarCepClass.classList.toggle("hide");
  hasP();

  
});

enderecoBotao.addEventListener("click", () => {
  if (!consultarCepClass.classList.contains("hide")) {
    consultarCepClass.classList.add("hide");
  }
  descobrirCepClass.classList.toggle("hide");
});

// Descobrir cep
btnCep.addEventListener("click", (e) => {
  e.preventDefault();
  urlBase = "https://viacep.com.br/ws/";
  let parametro = uf.value + "/" + cidade.value + "/" + rua.value + "/json/";
  let callback = "?callback=descobrirCepForm";
  
  let script = document.createElement("script");
  script.src = urlBase + parametro + callback;
  document.body.appendChild(script);
});

function descobrirCepForm(resposta) {
  if (!Array.isArray(resposta)) {
    alert("O Retorno não é uma lista de CEPs");
    return;
  }
  resposta.forEach((i) => {
    let li = document.createElement("li");
    let endereco =
      i.logradouro +
      " - " +
      i.bairro +
      " - " +
      i.localidade +
      " - " +
      i.uf +
      " - " +
      i.cep;
    li.setAttribute("onclick", "exibirCep(" + i.cep.replace("-", "") + ")");
    li.innerHTML = endereco;
    listaCep.appendChild(li);
  });
}

// Descobrir endereco
consultarBotao.addEventListener("click", descobrirEndereco);

function descobrirEndereco() {
  let cepValue = cep.value;
  cepValue = cepValue.replace(/[.-]/g, "");
  let script = document.createElement("script");
  script.src =
    "https://viacep.com.br/ws/" +
    cepValue +
    "/json/?callback=descobrirEnderecoForm";
  document.body.appendChild(script);

  hasP();
}

function descobrirEnderecoForm(i) {
  if ("erro" in i) {
    alert("CEP não encontrado");
  } else {
    let p = document.createElement("p");
    let endereco =
      i.logradouro + " - " + i.bairro + " - " + i.localidade + " - " + i.uf;
    p.innerHTML = endereco;
    formCard.appendChild(p);
  }
}
