
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona os elementos da página.
    const formulario = document.getElementById("formulario");
    const mensagem = document.getElementById("mensagem");

    const email = document.getElementById("email");
    const codigo = document.getElementById("codigo");
    const senha = document.getElementById("senha");
    const confirmar = document.getElementById("confirmar");

    const aumentarFonte = document.getElementById("aumentar-fonte");
    const diminuirFonte = document.getElementById("diminuir-fonte");
    const alternarTema = document.getElementById("alternar-tema");

    // Desativa a validação automática do navegador.
    formulario.noValidate = true;

    // Mostra a mensagem de erro e aplica a tremida.
    function mostrarErro(campo, texto) {

        const grupo = campo.closest(".grupo-campo");
        let aviso = grupo.querySelector(".mensagem-erro");

        if (!aviso) {

            aviso = document.createElement("small");
            aviso.classList.add("mensagem-erro");
            aviso.id = "erro-" + campo.id;

            grupo.appendChild(aviso);
        }

        aviso.textContent = texto;

        campo.classList.add("input-erro");
        campo.setAttribute("aria-invalid", "true");
        campo.setAttribute("aria-describedby", aviso.id);

        // Reinicia a animação a cada tentativa.
        grupo.classList.remove("shake");
        void grupo.offsetWidth;
        grupo.classList.add("shake");
    }

    // Remove o erro quando o campo é corrigido.
    function limparErro(campo) {

        const grupo = campo.closest(".grupo-campo");
        const aviso = grupo.querySelector(".mensagem-erro");

        campo.classList.remove("input-erro");
        campo.removeAttribute("aria-invalid");
        campo.removeAttribute("aria-describedby");

        grupo.classList.remove("shake");

        if (aviso) {
            aviso.remove();
        }
    }

    // Valida todos os campos do formulário.
    function validarCampos() {

        let valido = true;
        let primeiroErro = null;

        [email, codigo, senha, confirmar].forEach(limparErro);

        // Verifica o e-mail.
        if (email.value.trim() === "") {

            mostrarErro(email, "Informe seu e-mail.");
            primeiroErro = primeiroErro || email;
            valido = false;

        } else if (!email.validity.valid) {

            mostrarErro(email, "Digite um e-mail válido.");
            primeiroErro = primeiroErro || email;
            valido = false;
        }

        // Verifica o código de confirmação.
        if (codigo.value.trim() === "") {

            mostrarErro(codigo, "Informe o código de verificação.");
            primeiroErro = primeiroErro || codigo;
            valido = false;
        }

        // Verifica a nova senha.
        if (senha.value === "") {

            mostrarErro(senha, "Informe sua nova senha.");
            primeiroErro = primeiroErro || senha;
            valido = false;

        } else if (senha.value.length < 8) {

            mostrarErro(senha, "A senha deve ter pelo menos 8 caracteres.");
            primeiroErro = primeiroErro || senha;
            valido = false;
        }

        // Verifica a confirmação da senha.
        if (confirmar.value === "") {

            mostrarErro(confirmar, "Confirme sua nova senha.");
            primeiroErro = primeiroErro || confirmar;
            valido = false;

        } else if (confirmar.value.length < 8) {

            mostrarErro(confirmar, "A senha deve ter pelo menos 8 caracteres.");
            primeiroErro = primeiroErro || confirmar;
            valido = false;

        } else if (confirmar.value !== senha.value) {

            mostrarErro(confirmar, "As senhas não são iguais.");
            primeiroErro = primeiroErro || confirmar;
            valido = false;
        }

        if (primeiroErro) {
            primeiroErro.focus();
        }

        return valido;
    }

    // Valida o formulário ao clicar em redefinir.
    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        mensagem.textContent = "";
        mensagem.classList.remove("sucesso", "erro");

        if (validarCampos()) {

            mensagem.classList.add("sucesso");
            mensagem.textContent =
                "Dados do formulário conferidos com sucesso!";
        }
    });

    // Remove os avisos quando os campos são alterados.
    [email, codigo, senha, confirmar].forEach(function (campo) {

        campo.addEventListener("input", function () {

            limparErro(campo);

            mensagem.textContent = "";
            mensagem.classList.remove("sucesso", "erro");

            if (campo === senha && confirmar.value !== "") {
                limparErro(confirmar);
            }
        });
    });

    // Desenhos SVG usados nos campos de senha.
    const olhoAberto = `
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
        <circle cx="12" cy="12" r="3"/>
    `;

    const olhoRiscado = `
        <path d="M10.58 5.08A10.8 10.8 0 0 1 12 5c7 0 10 7 10 7a16.6 16.6 0 0 1-3.18 4.13"/>
        <path d="M6.61 6.61C3.58 8.43 2 12 2 12s3 7 10 7a10.7 10.7 0 0 0 5.39-1.61"/>
        <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24"/>
        <line x1="2" y1="2" x2="22" y2="22"/>
    `;

    // Controla o olhinho dos dois campos de senha.
    const botoesOlho = document.querySelectorAll(".mostrar-senha");

    botoesOlho.forEach(function (botao) {

        const campo = document.getElementById(botao.dataset.campo);
        const icone = botao.querySelector("svg");

        // Define o mesmo desenho inicial nos dois campos.
        icone.innerHTML = olhoRiscado;

        botao.addEventListener("click", function () {

            if (campo.type === "password") {

                // Mostra a senha e o olho aberto.
                campo.type = "text";
                icone.innerHTML = olhoAberto;

                botao.setAttribute("aria-label", "Ocultar senha");
                botao.setAttribute("aria-pressed", "true");

            } else {

                // Esconde a senha e mostra o olho riscado.
                campo.type = "password";
                icone.innerHTML = olhoRiscado;

                botao.setAttribute("aria-label", "Mostrar senha");
                botao.setAttribute("aria-pressed", "false");
            }

        });

    });

    // Acessibilidade: tamanho da fonte.
    let tamanhoFonte = 100;

    aumentarFonte.addEventListener("click", function () {

        if (tamanhoFonte < 140) {

            tamanhoFonte += 10;
            document.documentElement.style.fontSize = tamanhoFonte + "%";
        }

    });

    diminuirFonte.addEventListener("click", function () {

        if (tamanhoFonte > 80) {

            tamanhoFonte -= 10;
            document.documentElement.style.fontSize = tamanhoFonte + "%";
        }

    });

    // Acessibilidade: tema claro e escuro.
    alternarTema.addEventListener("click", function () {

        document.body.classList.toggle("modo-escuro");

        if (document.body.classList.contains("modo-escuro")) {

            alternarTema.textContent = "☀️";
            alternarTema.setAttribute("aria-label", "Ativar tema claro");

        } else {

            alternarTema.textContent = "🌙";
            alternarTema.setAttribute("aria-label", "Ativar tema escuro");
        }

    });

});
