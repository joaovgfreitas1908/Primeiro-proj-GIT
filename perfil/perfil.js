const intensidade = document.getElementById("intensidade");

function atualizarBarra() {
    const min = Number(intensidade.min);
    const max = Number(intensidade.max);
    const valor = Number(intensidade.value);

    const porcentagem = ((valor - min) / (max - min)) * 100;

    intensidade.style.setProperty("--posicao", porcentagem + "%");
}

intensidade.addEventListener("input", atualizarBarra);

atualizarBarra();