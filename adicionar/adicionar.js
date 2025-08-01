const form = document.querySelector("form");

async function criar_produto() {
  let nome = document.getElementById("nome").value;
  let imagem = document.getElementById("imagem").value;
  let descricao = document.getElementById("descricao").value;
  let preco = parseFloat(
    document.getElementById("preco").value.replace(",", ".")
  );
  let categoria = document.getElementById("categoria").value;
  let avaliacao = parseFloat(
    document.getElementById("avaliacao").value.replace(",", ".")
  );

  let novo = {
    name: nome,
    image: imagem,
    description: descricao,
    price: preco,
    category: categoria,
    rating: avaliacao,
    inStock: true,
  };

   await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novo),
  });

  form.reset();
}
//quando o forms for enviado
form.addEventListener("submit", function (click) {
  click.preventDefault();
  criar_produto();
});
