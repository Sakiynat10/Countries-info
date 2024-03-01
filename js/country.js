const countryRow = document.querySelector(".country");
// const borderCountryBtns = document.querySelector(".border-country-btns");




function customFetch( url, options ) {
    return new Promise( async ( resolve, reject ) => {
      const params = new URLSearchParams( options?.params )
  
      const res = await fetch( `${url}?${params}`, { ...options, body: JSON.stringify( options?.body ), headers: { 'Content-Type': 'application/json' } } );
  
      if ( res.ok ) {
        const data = await res.json();
        resolve( data )
      } else {
        reject( "Error" );
      }
    } )
}


const query = new URLSearchParams( location.search );

let countryName = query.get('countryName');

// console.log( countryName );




// function getCountryInfo({country}){
    
// }


async function getCountry(){
    try{
        const {data , total} = await customFetch(`${ENDPOINT}/name/${countryName}`);
        // console.log(data);
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
                    
                </div>
            </div>
            `
            const borderCountryBtns = document.querySelector(".border-country-btns");
           
            for(let i = 0; i < country.borders.length; i++){
                borderCountryBtns.innerHTML += `<button class="border-btn">${country.borders[i]}</button>`
            }
            console.log(borderCountryBtns);
        })
    } catch( err ) {

    } finally{

    }
}

getCountry();