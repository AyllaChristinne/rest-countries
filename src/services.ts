import { BorderType } from "./components/BorderButton/BorderButton";

export async function getAllCountries() {
    return await fetch('https://restcountries.com/v2/all?fields=name,population,flag,region,capital')
    .then((res) => {
        return res.json();
    }).catch(err => console.log("GET All Countries Error: ", err));
}

export async function getCountry(name: string) {
    return await fetch(`https://restcountries.com/v2/name/${name}`)
    .then((res) => {
        return res.json();
    }).then(data => {
        return data[0];
    }).catch(err => console.log("GET Country Error: ", err));
}

export async function getBordersInfo(borders: string[]) {
    return await fetch(`https://restcountries.com/v2/alpha?codes=${borders.toString()}`)
    .then((res) => { 
        return res.json(); 
    }).catch(err => console.log("GET Border Countries Error: ", err));;
}