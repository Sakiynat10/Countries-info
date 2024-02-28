const darkMode = document.querySelector(".dark-mode");
const lightMode = document.querySelector(".light-mode");
const ModeStorage = localStorage.getItem("darkMode");
const searchInput = document.querySelector(".search-input");
const pagination = document.querySelector(".pagination");

let query = new URLSearchParams(location.search);

let search = query.get('search') || " ";
console.log(query.get('search'));
let activePage = +query.get('page') || 1;
if (ModeStorage) {
  document.body.classList.add("mode");
  lightMode.classList.toggle("hidden");
  darkMode.classList.toggle("hidden");
}

function toggleModeBtn() {
  lightMode.classList.toggle("hidden");
  darkMode.classList.toggle("hidden");
  document.body.classList.toggle("mode");
}

/* Mode*/
darkMode.addEventListener("click", function () {
  toggleModeBtn();
  localStorage.setItem("darkMode", "mode");
});

lightMode.addEventListener("click", function () {
  toggleModeBtn();
  localStorage.setItem("darkMode", "");
});

/*Making Cards*/
const countriesRow = document.querySelector(".countries-row");

function getCountryCard({ flags, population, name, continents, capital }) {
  return `
  <a href="./pages/country.html" class="country-card">
    <img src=${flags.png} alt="flag png">
    <div class="card-info">
      <h3>${name.common}</h3>
      <p class="population-title">Population: <span class="population-info">${population}</span></p>
      <p class="population-title">Region: <span class="population-info">${continents}</span></p>
      <p class="population-title">Capital: <span class="population-info">${capital}</span></p>
    </div>
  </a>
  `;
}

async function getCountries() {
  // countriesRow.innerHTML = "...Loading";
  countriesRow.innerHTML = "";

  if (!search) {
    
    
    var all = await getData(`${ENDPOINT}/all?page=${activePage}&limit=${LIMIT}`);
    countriesRow.innerHTML = "";
    all.data.map((res) => {
      countriesRow.innerHTML += getCountryCard(res);
    });
  } else {
    var all = await getData(`${ENDPOINT}/name/${search}?page=${activePage}&limit=${LIMIT}`);
    countriesRow.innerHTML = "";
    all.data.map((res) => {
      countriesRow.innerHTML += getCountryCard(res);
    });
    // activePage = 1
    // console.log(all.total);
  }
  

  if(all.total === 0){
    pagination.innerHTML = ""
    countriesRow.innerHTML = " ";
  }else {
    let pages = Math.ceil(all.total / LIMIT);

    pagination.innerHTML = `<li class="page-item"><button class="page-link">Previous</button></li>`;

    for (let i = 1; i <= pages; i++) {
      pagination.innerHTML += `<li onclick="getPage(${i})" class="page-item"><button class="${i === activePage ? "active-btn": " "} page-link">${i}</button></li>`;
    }

    pagination.innerHTML += `<li class="page-item"><button class="page-link">Next</button></li>`;
  }
  
}

getCountries();

/*Making Search*/
searchInput.addEventListener("keyup", function () {
  search = this.value;
  activePage = 1;
  getCountries();
  history.pushState({}, "", `?search=${search}&page=${activePage}&limit=${LIMIT}`);
  // history.pushState({}, "", `/${search}`);
});

/*Making Pagination */
function getPage(i){
  activePage = i;
  getCountries();
  history.pushState({}, "", `?search=${search}&page=${activePage}&limit=${LIMIT}`)
}

function addQuery(){
  history.pushState({}, "",  `?search=${search}`)
}