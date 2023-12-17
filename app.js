const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select ");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");
const message = document.querySelector('.msg');
// querySelectorall return array of select elements
// we are looping to all the option elements
for (let select of dropdowns) {
  //console.log(select);

  // here we are looping to all the api country code and create
  // new option element and add all country code in that

  for (let currCode in countryList) {
    // we are creating option element and assign to newOption
    let newOption = document.createElement("option");
    // console.log(newOption);
    newOption.innerText = currCode;
    newOption.value = currCode;

    // HERE WE ARE APPLYING LOGIC FOR CURRENCY CODE BY DEFAULT IS USD AND INR
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  // here we are calling updateFlag function when user select any other country code

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

//FUNCTION TO UPDATE FLAG

const updateFlag = (element) => {
  //here we are storing value of option element in currCode
  let currCode = element.value;
  // here we are storing country list api into country code
  let countryCode = countryList[currCode]; // IN,USD,EURO
  // here we are changing the flag name to country code
  let newSrc = ` https://flagsapi.com/${countryCode}/flat/64.png`;
  // here we are selecting img
  let img = element.parentElement.querySelector("img");
  // here we are changing the img value
  img.src = newSrc;
};

//  we are handling click event on button
btn.addEventListener("click", async (e) => {
  // preventDefault means any default behavior of form button will stop
  e.preventDefault();
  // accessing the value of input elements
  let amount = document.querySelector(".amount input");
  let amtValue = amount.value;
  if (amtValue === " " && amtValue < 1) {
    amtValue = 1;
    amount.value = "1";
  }
  console.log(fromCurr.value, toCurr.value);
  //const BASE_URL =
  //"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{fromcurr.value}/{toCurr.value}.json";
  const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()]
  let finalAmout = amtValue*rate;
  message.innerText=`${amtValue} ${fromCurr.value} =${finalAmout} ${toCurr.value} `
  console.log(rate);
});
