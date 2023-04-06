var div = document.createElement("div");
div.classList.add("containerDiv");
var input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("placeholder","Enter country name");
input.setAttribute("id", "country");

var search = document.createElement("button");
search.setAttribute("type", "button");
search.classList.add("btn", "btn-Danger");
search.innerHTML = "search";
search.addEventListener("click", foo);

var population = document.createElement("div");
population.setAttribute("id", "population");

var capital = document.createElement("div");
capital.setAttribute("id", "capital");

var region=document.createElement("div");
region.setAttribute("id","region");

var Start=document.createElement("div");
Start.setAttribute("id","startOfWeek");

// Append container div and its elements to the body
div.append(input, search, population , capital,region);
document.body.append(div);

// Create table and its header row
var table = document.createElement("table");

var trHead = document.createElement("tr");

var th1 = document.createElement("th");
th1.innerHTML = "Capital";
trHead.appendChild(th1);

var th2 = document.createElement("th");
th2.innerHTML = "Populations";
trHead.appendChild(th2);

var th3 = document.createElement("th");
th3.innerHTML = "Region";
trHead.appendChild(th3);

var th4 = document.createElement("th");
th4.innerHTML = "Start Of Week";
trHead.appendChild(th4);

table.appendChild(trHead);
document.body.append(table);

async function foo() {
  try {
    var res = document.getElementById("country").value;
    var res1 = await fetch(`https://restcountries.com/v3.1/name/${res}`);
    if (res1.status === 404) {
      throw new Error('Country not found');
    }
    var res2 = await res1.json();
    console.log(res2); 

    var countryObj = null;
    for (var i = 0; i < res2.length; i++) {
      if (res2[i].name.common.toLowerCase() === res.toLowerCase()) {
        countryObj = res2[i];
        break;
      }
    }
    if (countryObj) {
   
    // Clear previous results 
   
    capital.innerHTML = "";
    population.innerHTML = "";
    region.innerHTML = "";
    Start.innerHTML="";

var tr=document.createElement("tr");

var td1=document.createElement("td");
td1.innerHTML=countryObj.capital[0];
tr.appendChild(td1);

var td2=document.createElement("td");
td2.innerHTML=countryObj.population;
tr.appendChild(td2);

var td3=document.createElement("td");
td3.innerHTML=countryObj.region;
tr.appendChild(td3);

var td4=document.createElement("td");
td4.innerHTML=countryObj.startOfWeek;
tr.appendChild(td4);

table.append(tr);
} else {
  throw new Error('Country not found');
}
  } catch (error) {
    console.log(error);
  }
}
