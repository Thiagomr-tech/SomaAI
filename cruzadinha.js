const container = document.getElementById('cruzadinha-container');
const respostasContainer = document.getElementById('respostas-container');

// 🔹 Fases do jogo (matriz sempre 13x13)
let fases = [
    {
        cruzada: [
            [" ", " ", " ", " ", "1", "+", "3", "=", 0, " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", "3", " ", " ", " ", " ", " ", " "],
            ["1", "+", "3", "=", 0, " ", "2", "+", "3", "=", 0, " ", " ", " "],
            [" ", " ", " ", " ", "+", " ", " ", " ", " ", " ", " ", " ", " "],
            ["1", " ", " ", " ", "1", "+", "4", "=", 0, " ", " ", " ", " "],
            ["+", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            ["1", " ", " ", "2", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            ["=", " ", " ", "+", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [0, " ", " ", "1", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", "=", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", 0, " ", " ", " ", " ", " ", " ", " ", " ", " "],
            ["2", "+", "2", "=", 0, " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
        ],
        respostas: [4, 5, 5, 4, 2]
    }
];

// 🔹 Fase atual
let faseAtual = 0;

// 🔹 Função para carregar uma fase
function carregarFase(n) {
    faseAtual = n;
    let { cruzada, respostas } = fases[n];

    let html = '<table style="border-collapse: collapse; text-align: center; border:none;">';

    for (let linha of cruzada) {
        html += '<tr>';
        for (let celula of linha) {
            if (celula === 0) {
                // Dropzone (resposta)
                html += `<td class="dropzone" 
              ondrop="drop(event)" 
              ondragover="allowDrop(event)" 
              style="width:40px;height:40px;background:#f9f9f9;border:1px solid #ccc;"></td>`;
            } else if (celula === " ") {
                // Espaço vazio transparente sem borda
                html += `<td style="width:40px;height:40px;background:transparent;border:none;"></td>`;
            } else {
                // Parte fixa da conta
                html += `<td style="width:40px;height:40px;font-weight:bold;border:1px solid #ccc;">${celula}</td>`;
            }


        }
        html += '</tr>';
    }
    html += '</table>';
    container.innerHTML = html;

    // Respostas arrastáveis
    respostasContainer.innerHTML = respostas.map((r, i) =>
        `<div class="resposta" draggable="true" 
        ondragstart="drag(event)" 
        ondragend="dragend(event)"
        id="resp-${n}-${i}" 
        style="display:inline-block;margin:5px;padding:10px;
               border:1px solid black;background:#fff;cursor:grab;">
        ${r}
   </div>`
    ).join("");

}

// 🔹 Funções drag and drop

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    // Oculta o item enquanto está sendo arrastado
    setTimeout(() => {
        ev.target.style.display = "none";
    }, 0);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let resposta = document.getElementById(data);

    if (!ev.target.hasChildNodes()) {
        // Coloca a resposta definitiva na célula
        ev.target.innerHTML = `<div style="font-weight:bold;">${resposta.innerText}</div>`;
        resposta.remove(); // remove de vez
    } else {
        // Se já tiver algo, o item volta para as opções
        resposta.style.display = "inline-block";
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function dragend(ev) {
    // Se não foi solto em lugar válido, volta a aparecer
    if (document.getElementById(ev.target.id)) {
        ev.target.style.display = "inline-block";
    }
}



// 🔹 Carregar primeira fase
carregarFase(0);
