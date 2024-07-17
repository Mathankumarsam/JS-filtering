document.addEventListener("DOMContentLoaded", function () {
  let productsData; 

  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      productsData = responseData; 
      displayProducts(productsData); 
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  function displayProducts(data) {
    let HTMLData = document.querySelector(".bottom");
    HTMLData.innerHTML = "";

    data.forEach((value) => {
      let userdata = document.createElement("div");
      let dataHtml = `<div class="prod">
              <div class="image">
                  <img src="${value.image}" alt="img" class="imag">
              </div>
              <div class="cont">
                  <a href="#" class="title">${value.title}</a>
                  <a href="#" class="rating">${value.rating.rate}</a>
              </div>
              <p class="price">${value.price} Rs</p>
              <button> BUY NOW</button>
          </div>`;
      userdata.innerHTML = dataHtml;
      HTMLData.append(userdata);
    });
  }

  function filterItems(category) {
    if (category === "all") {
      displayProducts(productsData); 
    } else {
      const filteredData = productsData.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      displayProducts(filteredData); 
    }
  }

  // Event listener for category filter dropdown
  document
    .getElementById("categorySelect")
    .addEventListener("change", function () {
      const selectedCategory = this.value;
      filterItems(selectedCategory);
    });
});
