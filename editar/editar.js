const form = document.querySelector("form");
console.log("Formulário capturado:", form);
const url = new URLSearchParams(window.location.search);
const id = url.get('id');

async function buscar_produto() {
    const resposta = await fetch(`http://localhost:3000/products/${id}`);
    const produtos = await resposta.json();
    return produtos;
}

function editar_produto() {
    const produtos = buscar_produto();
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

    let atualizado = {
        name: nome ? nome : produtos.name,
        image: imagem ? imagem : produtos.image,
        description: descricao ? descricao : produtos.description,
        price: preco ? preco : produtos.price,
        category: categoria ? categoria : produtos.category,
        rating: avaliacao ? avaliacao : produtos.rating,
        inStock: true,
    };
    console.log(atualizado);
    fetch(`http://localhost:3000/products/${id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(atualizado),
    })
    .then(response => response.json())
    .then(json => {console.log(json);
    })
    .catch(error => console.error(error));
}


form.addEventListener("submit", function (event) {
  event.preventDefault();
  editar_produto();
});