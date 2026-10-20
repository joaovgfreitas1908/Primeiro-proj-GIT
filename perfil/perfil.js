
document.addEventListener("DOMContentLoaded", function () {

  // Seleciona os elementos da página.
  const formulario = document.getElementById("form-perfil");
  const intensidade = document.getElementById("intensidade");
  const aumentarFonte = document.getElementById("aumentar-fonte");
  const diminuirFonte = document.getElementById("diminuir-fonte");
  const alternarTema = document.getElementById("alternar-tema");

  if (!formulario) return;

  const frequencias = formulario.querySelectorAll('input[type="radio"]');
  const metodo = document.getElementById("metodo-preparo");
  const sabores = formulario.querySelectorAll('input[type="checkbox"]');
  const comentario = document.getElementById("comentario");


  // Atualiza a parte preenchida da barra de intensidade.
  function atualizarBarra() {
    if (!intensidade) return;

    const min = Number(intensidade.min);
    const max = Number(intensidade.max);
    const valor = Number(intensidade.value);

    const porcentagem = ((valor - min) / (max - min)) * 100;

    intensidade.style.setProperty("--posicao", porcentagem + "%");
  }


  // Mostra o valor da intensidade selecionada pelo usuário.
  const valorIntensidade = document.createElement("span");
  valorIntensidade.style.display = "block";
  valorIntensidade.style.marginTop = "5px";

  const legenda = document.querySelector(".legenda-intensidade");

  function atualizarIntensidade() {
    if (!intensidade) return;

    valorIntensidade.textContent =
      "Intensidade selecionada: " + intensidade.value;
  }

  if (intensidade) {
    (legenda || intensidade).insertAdjacentElement(
      "afterend", valorIntensidade
    );

    intensidade.addEventListener("input", function () {
      atualizarBarra();
      atualizarIntensidade();
    });

    atualizarBarra();
    atualizarIntensidade();
  }


  // Configura o aumento e a diminuição do tamanho das fontes.
  let escalaFonte = 1;

  const textos = document.querySelectorAll(
    "h1, h2, h3, h4, p, label, input, button, a, small, span, textarea, select"
  );

  textos.forEach(function (elemento) {
    elemento.dataset.fonteOriginal =
      parseFloat(getComputedStyle(elemento).fontSize);
  });

  function atualizarFonte() {
    textos.forEach(function (elemento) {
      const tamanhoOriginal = Number(elemento.dataset.fonteOriginal);

      elemento.style.fontSize =
        (tamanhoOriginal * escalaFonte) + "px";
    });
  }

  if (aumentarFonte) {
    aumentarFonte.addEventListener("click", function () {
      if (escalaFonte < 1.4) {
        escalaFonte = Math.round((escalaFonte + 0.1) * 10) / 10;
        atualizarFonte();
      }
    });
  }

  if (diminuirFonte) {
    diminuirFonte.addEventListener("click", function () {
      if (escalaFonte > 0.8) {
        escalaFonte = Math.round((escalaFonte - 0.1) * 10) / 10;
        atualizarFonte();
      }
    });
  }


  // Alterna entre o tema claro e o tema escuro.
  if (alternarTema) {
    alternarTema.addEventListener("click", function () {
      document.body.classList.toggle("modo-escuro");

      alternarTema.textContent =
        document.body.classList.contains("modo-escuro")
          ? "Claro"
          : "Escuro";
    });
  }


  // Limita os comentários a 300 caracteres e atualiza o contador.
  const contador = document.createElement("small");
  contador.style.display = "block";
  contador.style.marginTop = "5px";

  function atualizarContador() {
    if (!comentario) return;

    contador.textContent =
      comentario.value.length + "/300 caracteres";
  }

  if (comentario) {
    comentario.maxLength = 300;
    comentario.insertAdjacentElement("afterend", contador);

    comentario.addEventListener("input", atualizarContador);
    atualizarContador();
  }


  // Exibe mensagens de erro abaixo dos campos obrigatórios.
  function mostrarErro(elemento, id, mensagem) {
    let erro = document.getElementById(id);

    if (!erro) {
      erro = document.createElement("small");
      erro.id = id;
      erro.style.color = "#c62828";
      erro.style.display = "block";
      erro.style.marginTop = "5px";
      erro.style.marginBottom = "8px";
      erro.setAttribute("role", "alert");

      elemento.insertAdjacentElement("afterend", erro);
    }

    erro.textContent = mensagem;
  }


  // Remove a mensagem de erro quando o campo é corrigido.
  function limparErro(id) {
    const erro = document.getElementById(id);

    if (erro) {
      erro.remove();
    }
  }


  // Identifica onde as mensagens de erro serão exibidas.
  const ultimoRadio = frequencias[frequencias.length - 1];

  const campoFrequencia =
    ultimoRadio.nextElementSibling?.tagName === "LABEL"
      ? ultimoRadio.nextElementSibling
      : ultimoRadio;

  const campoSabores = formulario.querySelector(".sabores");


  // Remove os avisos quando o usuário seleciona uma opção.
  frequencias.forEach(function (radio) {
    radio.addEventListener("change", function () {
      limparErro("erro-frequencia");
    });
  });

  sabores.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      limparErro("erro-sabores");
    });
  });

  metodo.addEventListener("change", function () {
    limparErro("erro-metodo");
    metodo.style.border = "";
  });


  // Cria a mensagem de confirmação do formulário.
  const sucesso = document.createElement("p");
  sucesso.style.color = "#2e7d32";
  sucesso.style.fontWeight = "bold";
  sucesso.style.marginTop = "15px";
  sucesso.setAttribute("role", "status");

  formulario.appendChild(sucesso);


  // Verifica os campos obrigatórios quando o usuário clica em Enviar.
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let formularioValido = true;
    sucesso.textContent = "";


    // Verifica se a frequência de consumo foi selecionada.
    const frequenciaSelecionada = Array.from(frequencias).some(
      function (radio) {
        return radio.checked;
      }
    );

    if (!frequenciaSelecionada) {
      mostrarErro(
        campoFrequencia,
        "erro-frequencia",
        "Selecione a frequência com que você toma café."
      );

      formularioValido = false;
    } else {
      limparErro("erro-frequencia");
    }


    // Verifica se o método de preparo foi escolhido.
    if (metodo.value === "") {
      mostrarErro(
        metodo,
        "erro-metodo",
        "Selecione seu método de preparo favorito."
      );

      metodo.style.border = "2px solid #c62828";
      formularioValido = false;
    } else {
      limparErro("erro-metodo");
      metodo.style.border = "";
    }


    // Verifica se pelo menos um sabor foi selecionado.
    const saborSelecionado = Array.from(sabores).some(
      function (checkbox) {
        return checkbox.checked;
      }
    );

    if (!saborSelecionado) {
      mostrarErro(
        campoSabores,
        "erro-sabores",
        "Selecione pelo menos um sabor favorito."
      );

      formularioValido = false;
    } else {
      limparErro("erro-sabores");
    }


    // Exibe a confirmação quando todos os campos estão corretos.
    if (formularioValido) {
      sucesso.textContent =
        "Suas preferências foram preenchidas com sucesso!";
    }
  });


  // Limpa os avisos e restaura os valores ao redefinir o formulário.
  formulario.addEventListener("reset", function () {
    limparErro("erro-frequencia");
    limparErro("erro-metodo");
    limparErro("erro-sabores");

    metodo.style.border = "";
    sucesso.textContent = "";

    setTimeout(function () {
      atualizarBarra();
      atualizarIntensidade();
      atualizarContador();
    }, 0);
  });

});

