//DIY Dog Search tool using Punk API - Michael McGrorty 6/11/18

let api = 'https://api.punkapi.com/v2/beers';
let query = document.getElementById('query');
let random = document.getElementById('random');
let search = document.getElementById('search');
let beerdetails = document.getElementById('beerdetails');

random.addEventListener('click', function(){
    request(api + '/random');
})

search.addEventListener('click', function(){
    request(api + '?beer_name=' + query.value);
})

function request(api) {
    fetch(api)
    .then(function(response) {
        return response.json();
    })
    .then(function(beer) {
        let name = beer[0].name;
        let img = beer[0].image_url;
        let tagline = beer[0].tagline;
        console.log(beer);

        beerdetails.innerHTML = '<h4>' + name + '</h4>';
        beerdetails.innerHTML += '<h5>' + tagline + '</h5>';
        beerdetails.innerHTML += '<img src="' + img + '">';
    });
}