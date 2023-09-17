export async function getAllCountries() {
  return await fetch(
    "https://restcountries.com/v2/all?fields=name,population,flag,region,capital"
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error("GET All Countries Error: ", err);
    });
}

export async function getCountryByName(name: string) {
  return await fetch(`https://restcountries.com/v2/name/${name}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error("GET Country Error: ", err);
    });
}

export async function getBordersInfo(borders: string[]) {
  return await fetch(
    `https://restcountries.com/v2/alpha?codes=${borders.toString()}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error("GET Border Countries Error: ", err);
    });
}

export async function getCountriesByRegion(region: string) {
  return await fetch(`https://restcountries.com/v2/region/${region}`)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error("GET Countries By Region Error: ", err);
    });
}
