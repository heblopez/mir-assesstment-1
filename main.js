async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function showProduct(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  img.className = "product-card__image";
  card.appendChild(img);

  const cardContent = document.createElement("div");
  cardContent.className = "product-card__content";

  const title = document.createElement("h2");
  title.className = "product-card__title";
  title.textContent = product.title;
  cardContent.appendChild(title);

  const price = document.createElement("p");
  price.className = "product-card__price";
  price.textContent = `$${product.price}`;
  cardContent.appendChild(price);

  const description = document.createElement("p");
  description.className = "product-card__description";
  description.textContent = product.description;
  cardContent.appendChild(description);

  const category = document.createElement("p");
  category.className = "product-card__category";
  category.textContent = product.category;
  cardContent.appendChild(category);

  const timer = document.createElement("p");
  timer.className = "product-card__timer";
  cardContent.appendChild(timer);

  const button = document.createElement("button");
  button.className = "product-card__button";
  button.textContent = "Comprar";
  cardContent.appendChild(button);

  card.appendChild(cardContent);
  // container.appendChild(card);

  return {  card, timer, button };
}

function addTimer(timer, button) {
  let timeRemaining = Math.floor(Math.random() * 3 + 1) * 60;

  const updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timer.textContent = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeRemaining > 0) {
      timeRemaining--;
    } else {
      button.disabled = true;
      button.textContent = "Tiempo agotado";
      clearInterval(intervalId);
    }
  };

  updateTimer();
  const intervalId = setInterval(updateTimer, 1000);
}

async function main() {
  const productsContainer = document.querySelector("#productsContainer");
  const products = await fetchProducts();

  products.forEach((product) => {
    const { card, timer, button } = showProduct(product);
    productsContainer.appendChild(card);
    addTimer(timer, button);
  });
}

document.addEventListener("DOMContentLoaded", main);
