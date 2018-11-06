let api = 'https://api.punkapi.com/v2/beers/random';
let submit = document.getElementById('submit');
let beerdetails = document.getElementById('beerdetails');

submit.addEventListener('click', function(){
    request();
})

function request() {
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