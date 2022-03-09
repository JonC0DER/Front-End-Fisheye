async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    /* const photographersData = [
        {
            "name": "Ma data test",
            "id": 1,
            "city": "Paris",
            "country": "France",
            "tagline": "Ceci est ma data test",
            "price": 400,
            "portrait": "account.png"
        },
        {
            "name": "Autre data test",
            "id": 2,
            "city": "Londres",
            "country": "UK",
            "tagline": "Ceci est ma data test 2",
            "price": 500,
            "portrait": "account.png"
        },
    ]*/
    const photographersData = fetch('data/photographers.json')
    // et bien retourner le tableau photographers seulement une fois
    .then( res => res.json() )
    .catch(err => console.error(err));
    
    return (photographersData)
    //return({photographers:[...photographersData]})
}
