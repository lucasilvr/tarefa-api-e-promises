let pagina = 1;

async function mostra_produtos() {
  const container = document.getElementById("container");
  const resposta = await fetch(
    `http://localhost:3000/products?_limit=${10}&_page=${pagina}`
  );
  const produtos = await resposta.json();
  const default_image = "../assets/camisa-branca.png";

  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
                <div class="parte-cima">
                    <div class="foto">
                        <img src="${
                          produto.image.includes("placeholder")
                            ? default_image
                            : produto.image
                        }">
                    </div>
                    <div class="açoes">
                        <div class="ranking">
                            <p>
                                ${produto.rating}
                                <img src="../assets/estrela.png">
                            </p>
                        </div>
                        <div class="button-container">
                            <button class="btn-delete" onclick="deletar_produto(${
                              produto.id
                            })">
                                <img src="../assets/lixeira.png">
                            </button>
                            <button class="btn-edit" onclick="window.location.href='../editar/index.html?id=${
                              produto.id
                            }'">
                                <img src="../assets/lapis.png">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="parte-baixo">
                    <div class="descricao">
                        <h2>
                            ${produto.name}
                        </h2>
                        <h3>
                            ${produto.category}
                        </h3>
                        <p>
                            ${produto.description}
                        </p>
                        <p class="preco">
                            R$ ${produto.price}
                        </p>
                    </div>
                </div>
            `;
    container.appendChild(card);
  });
}

/* isso aqui é o eventlistener de rolar a pagina, pesquisei como fazer pois nao sabia*/
window.addEventListener("scroll", async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 20) {
    pagina++; 
    await mostra_produtos(); 
  }
});

async function deletar_produto(id) {
  await fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("Produto deletado:", json);
    });
}

/* foi necessario para carregar os produtos iniciais quando o Dom estivesse pronto*/
document.addEventListener("DOMContentLoaded", mostra_produtos);
