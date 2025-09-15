let a11 = "a11", a12 = "a12", a13 = "a13", a14 = "a14", a15 = "a15", a16 = "a16", a17 = "a17",
    a21 = "a21", a22 = "a22", a23 = "a23", a24 = "a24", a25 = "a25", a26 = "a26", a27 = "a27",
    a31 = "a31", a32 = "a32", a33 = "a33", a34 = "a34", a35 = "a35", a36 = "a36", a37 = "a37",
    a41 = "a41", a42 = "a42", a43 = "a43", a44 = "a44", a45 = "a45", a46 = "a46", a47 = "a47",
    a51 = "a51", a52 = "a52", a53 = "a53", a54 = "a54", a55 = "a55", a56 = "a56", a57 = "a57",
    a61 = "a61", a62 = "a62", a63 = "a63", a64 = "a64", a65 = "a65", a66 = "a66", a67 = "a67",
    a71 = "a71", a72 = "a72", a73 = "a73", a74 = "a74", a75 = "a75", a76 = "a76", a77 = "a77";

let cruzada = [
    [a11, a12, a13, a14, a15, a16, a17],
    [a21, a22, a23, a24, a25, a26, a27],
    [a31, a32, a33, a34, a35, a36, a37],
    [a41, a42, a43, a44, a45, a46, a47],
    [a51, a52, a53, a54, a55, a56, a57],
    [a61, a62, a63, a64, a65, a66, a67],
    [a71, a72, a73, a74, a75, a76, a77]
];


const container = document.getElementById('cruzadinha-container');
let html = '<table border="1">';
for (let linha of cruzada) {
    html += '<tr>';
    for (let celula of linha) {
        html += `<td>${celula}</td>`;
    }
    html += '</tr>';
}
html += '</table>';
container.innerHTML = html;

