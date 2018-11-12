//DIY Dog Search tool using Punk API - Michael McGrorty 6/11/18

let api = 'https://api.punkapi.com/v2/beers';
let randomButton = document.getElementById('random');
let searchButton = document.getElementById('search');
let beerdetails = document.getElementById('beerdetails');
let form = document.getElementById('form');
let counter = 0;
let requeststring = '';
let plusButtons = [];
let searchType = '';
let searchTerm = '';

randomButton.addEventListener('click', function(){
    requeststring = api + '/random';
    console.log(requeststring);
    beerdetails.innerHTML = '';
    request(requeststring);
})

searchButton.addEventListener('click', function(){
    requeststring = api;
    for (let i = 1; i <= counter; i++) {
        if (i == 1)
            requeststring += '?';
        else 
            requeststring += '&';
        searchType = document.getElementById('searchtype' + [i]);
        searchTerm = document.getElementById('query' + [i]);
        requeststring += searchType.value += searchTerm.value; 
    }
    console.log(requeststring);
    beerdetails.innerHTML = '';
    request(requeststring);
})

function request(api) {
    fetch(api)
    .then(function(response) {
        return response.json();
    })
    .then(function(beers) {
        if (beers.length) {
            beerdetails.innerHTML += '<ul>';
            beers.forEach(function(beer){
                let name = beer.name;
                let img = beer.image_url;
                let tagline = beer.tagline;
    
                beerdetails.innerHTML += '<li><p>' + name + '</p></li>';
                //beerdetails.innerHTML += '<p class="hidden">' + tagline + '</p>';
                //beerdetails.innerHTML += '<img class="hidden" src="' + img + '">'  + '</div></li>'; 
            })
            beerdetails.innerHTML += '</ul>';
        } else {
            beerdetails.innerHTML = '<h4>No beers found</h4>';
        }
    });
}

function addRow() {
    counter++;

    let newRow = document.getElementById('formrow').cloneNode(true);
    newRow.id = '';
    newRow.style.display = 'block';
    let aNewRow = newRow.childNodes;
    for (var i=0; i < aNewRow.length ;i++) {
		var id = aNewRow[i].id
		if (id)
			aNewRow[i].id = id + counter;
    }
    var insertHere = document.getElementById('form');
    insertHere.parentNode.insertBefore(newRow, insertHere);

    for (let i = counter; i <= counter; i++) {
        plusButtons[i] = document.getElementById('plus' + [i]);
        plusButtons[i].addEventListener('click', function() {
            addRow();
        })
    }
}

window.onload = addRow;