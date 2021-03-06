//DIY Dog Search tool using Punk API - Michael McGrorty 6/11/18
let sBrowser, sUsrAg = navigator.userAgent;

if (sUsrAg.indexOf("Trident") > -1) {

    let info = document.getElementById('info');

    info.innerHTML = "Sorry, Internet Explorer is not supported. We recommend Firefox or Chrome.";

} else {

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
    let things = document.getElementsByClassName('beers');

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
                if (beers.length == 1) {
                    beerdetails.innerHTML += `<h4>${beers.length} beer found!</h4>`;
                } else if (beers.length > 1) {
                    beerdetails.innerHTML += `<h4>${beers.length} beers found!</h4>`;
                }
                beers.forEach(function(beer){
                    console.log(beer);
        
                    beerdetails.innerHTML += `<div class="beer beergrid"><div class="one"><strong>${beer.name}</strong></div><div class="two" hidden>${beer.tagline}</div><div class="three" hidden><img src="${beer.image_url}"></div><div class="four" hidden>${beer.description}</div><div class="five" hidden>ABV: <strong>${beer.abv}</strong>%</div><div class="six" hidden>IBU: <strong>${beer.ibu}</strong></div><div class="seven" hidden>EBC: <strong>${beer.ebc}</strong></div><div class="eight" hidden>OG: <strong>${beer.target_og}</strong></div><div class="nine" hidden>FG: <strong>${beer.target_fg}</strong></div><div class="ten" hidden>pH: <strong>${beer.ph}</strong></div></div>`;
                });
                beerlist = document.getElementsByClassName('beer');
                    if (beerlist.length) {
                        for (let i = 0; i < beerlist.length; i++) {
                            beerlist[i].addEventListener('click', function() {
                                showStuff(beerlist[i]);
                            });
                        }
                    }
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

    function showStuff(elem) {
        for (let i = 1; i < elem.childNodes.length; i++) {
            if (elem.childNodes[i].hidden == true){
                elem.childNodes[i].hidden = false;
            } else if (elem.childNodes[i].hidden == false) {
                elem.childNodes[i].hidden = true;
            }
        }
    }
}