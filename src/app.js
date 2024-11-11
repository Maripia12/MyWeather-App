function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);

  let city = searchInput.value[0].toUpperCase()
  console.log(city)

  let cityElement = document.querySelector("#weatherCity");
  cityElement.innerHTML = city + searchInput.value.slice(1);
}

let searchFormElement = document.querySelector("#search-form");
console.log(searchFormElement);

searchFormElement.addEventListener("submit", handleSearchSubmit);
