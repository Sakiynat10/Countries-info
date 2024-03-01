
const searchInput = document.querySelector(".search-input");
const pagination = document.querySelector(".pagination");
// const activeBtn = document.querySelector(".active-btn")
let query = new URLSearchParams(location.search);
const filterByRegion = document.querySelector('.filter-by-region');

filterByRegion.addEventListener('change' , (e) => {
  async function getCountry(){
    countriesRow.innerHTML = '';
    try{
        const {data , total} = await customFetch(`${ENDPOINT}/region/${filterByRegion.value}`);
        console.log(data);
        data.map(country => {
            countryRow.innerHTML = `
            <img src=${country.flags.png} alt="">
            <div class="country-info">
                <div class="info-top">
                    <ul class="info-left">
                        <h1>${country.name.common}</h1>
                        <li>Native Name:<span>${country.name.common}</span></li>
                        <li>Population:<span>${country.population}</span></li>
                        <li>Region:<span>${country.region}</span></li>
                        <li>Sub Region:<span>${country.subregion}</span></li>
        
                    </ul>
                    <ul class="info-right">
                        <li>Top Level Domain:<span>${country.tld[0]}</span></li>
                        <li>Currencies: <span>${country.currencies?Object.values(country.currencies).map((currency) => currency.name): ''}</span></li>
                        <li>Languages: <span>${Object.values(country.languages)}</span></li>
                    </ul>
                </div>
                <div class="border-country-btns">
                    <h4>Border Countries:</h4>
                    
                </div>
            </div>
            `
            borderCountryBtns.textContent += `<button class="border-btn">${country.name.common}</button>`
        })
    } catch( err ) {

    } finally{

    }
}

getCountry();

})

let search = query.get('search') || " ";
console.log(query.get('search'));
let activePage = +query.get('page') || 1;


/*Making Cards*/
const countriesRow = document.querySelector(".countries-row");

function getCountryCard({ flags, population, name, continents, capital }) {
  return `
  <a href="./pages/country.html?countryName=${name.common}"  class="country-card">
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
    pagination.style.display = "none";
    countriesRow.innerHTML = " ";
  }else {
    let pages = Math.ceil(all.total / LIMIT);

    pagination.innerHTML = `<li onclick="getPage('-')" class="page-item"><button  ${activePage === 1 ? 'disabled' : ''} class="page-link"><<</button></li>`;

    for (let i = 1; i <= pages; i++) {
      pagination.innerHTML += `<li onclick="getPage(${i})" class="page-item"><button class="page-link ${i === activePage ? 'active-btn' : ''}">${i}</button></li>`;
    }

    pagination.innerHTML += `<li onclick="getPage('+')" class="page-item"><button  ${activePage === pages ? 'disabled' : ''} class="page-link">>></button></li>`;
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
  if(i === '+'){
    activePage++
  }else if(i === '-'){
    activePage--
  }else{
    activePage = +i;
  }
  // activePage = i;
  getCountries();
  history.pushState({}, "", `?search=${search}&page=${activePage}&limit=${LIMIT}`)
}

function addQuery(){
  history.pushState({}, "",  `?search=${search}`);
}

function getName(capital){
  console.log(capital);
  let c = capital;
  history.pushState({}, "", `&name=${c}`);
}



