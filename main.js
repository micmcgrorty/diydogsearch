//DIY Dog Search tool using Punk API - Michael McGrorty 6/11/18

let api = 'https://api.punkapi.com/v2/beers';
let query = document.getElementById('query');
let random = document.getElementById('random');
let search = document.getElementById('search');
let searchtype = document.getElementById('searchtype');
let beerdetails = document.getElementById('beerdetails');

random.addEventListener('click', function(){
    beerdetails.innerHTML = '';
    request(api + '/random');
})

search.addEventListener('click', function(){
    beerdetails.innerHTML = '';
    request(api + searchtype.value + query.value);
})

function request(api) {
    fetch(api)
    .then(function(response) {
        return response.json();
    })
    .then(function(beers) {
        if (beers.statusCode != 400) {
            beers.forEach(function(beer){
                let name = beer.name;
                let img = beer.image_url;
                let tagline = beer.tagline;
    
                beerdetails.innerHTML += '<h4>' + name + '</h4>';
                beerdetails.innerHTML += '<h5>' + tagline + '</h5>';
                beerdetails.innerHTML += '<img src="' + img + '">'; 
            })
        } else {
            beerdetails.innerHTML = '<h4>No beers found</h4>';
        }
    });
}