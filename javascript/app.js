$(document).ready(function () {
    console.log("hello");
    let buttonsArray = ["30 rock", "parks&rec", "drag race"];
    console.log(buttonsArray);
    for (let i = 0; i < buttonsArray.length; i++) {
        let newButton = $("<button class='term'>");
        console.log(newButton);
        $(newButton).text(buttonsArray[i]);
        $("#buttons").append(newButton);
        console.log(buttonsArray[i]);
    }

    // $(".term").on("click", function () {
    //let searchTerm = $(this).text();

    //     let apiKey = "F2lpt1HBohJYediBSjlg9Mlu97wiPcg1"
    //     let queryUrl = "https://api.giphy.com/v1/gifs/search?limit=10&lang=en&fmt=json&api_key=" + apiKey + "&q=" + searchTerm;

    //     //ajax call
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function (response) {
    //         // do this to response
    //     });

    // })
});