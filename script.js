const searchcountry = async (searchBox) => {
  const res = await fetch("../data/countries.json");
  const countries = await res.json();

  let fits = countries.filter((country) => {
    const regex = new RegExp(`^${searchBox}`, "gi");
    return country.name.match(regex) || country.abbr.match(regex);
  });

  if (searchBox.length === 0) {
    fits = [];
    countryList.innerHTML = "";
  }

  outputHtml(fits);
};

const outputHtml = (fits) => {
  if (fits.length > 0) {
    const html = fits
      .map(
        (fit) => `
     <div class="row">
     <div class="col s12">
       <div class="card  grey darken-4 darken-1">
         <div class="card-content white-text">
           <h4 class="card-title m1">${fit.name} (${fit.abbr})</h4>
      </div>
         </div>
       </div>
     </div>
   </div>
     `
      )
      .join("");

    document.getElementById("countryList").innerHTML = html;
  }
};

document
  .getElementById("search")
  .addEventListener("input", () => searchcountry(search.value));
