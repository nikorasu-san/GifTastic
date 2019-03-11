$(document).ready(function () {
    let buttonsArray = ["30 rock", "parks&rec", "drag race"];
    for (let i = 0; i < buttonsArray.length; i++) {
        let newButton = $("<button class='term'>");
        $(newButton).text(buttonsArray[i]);
        $("#buttons").append(newButton);
        console.log(buttonsArray);
    }

    //--- add a new button
    // capture user input
    // on click send to array
    $("#add-button").on("click", function () {
        let newTerm = $("#field").val();
        console.log("term: ", newTerm)
        buttonsArray.push(newTerm);
        $("#field").val("");
        $("#buttons").empty()
        for (let i = 0; i < buttonsArray.length; i++) {
            let newButton = $("<button class='term'>");
            $(newButton).text(buttonsArray[i]);
            $("#buttons").append(newButton);
            console.log(buttonsArray);
        }

    });



    let searchTerm = $(this).text();
    $(document).on("click", ".term", function () {
        $("#gifs").empty();
        console.log(this);
        let searchTerm = $(this).text();
        let apiKey = "F2lpt1HBohJYediBSjlg9Mlu97wiPcg1";
        let queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&lang=en&fmt=json&api_key=" + apiKey + "&q=" + searchTerm;
        console.log(queryURL)
        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // do this to response
            let results = response.data;
            console.log(response)
            for (let i = 0; i < results.length; i++) {
                //create elements
                let newImage = $("<img>");
                let newImageDiv = $("<div>");
                //create attributes
                console.log("url: ", results[i].images.fixed_height.url);
                let imageURL = $(newImage).attr("src", results[i].images.fixed_height.url);
                // append rating
                let printRating = $("<p>");
                let rating = "Rating: " + results[i].rating.toUpperCase();
                $(printRating).text(rating);
                //$(newImage).append(rating)
                // append image to page
                $(newImageDiv).append(printRating, newImage);
                $("#gifs").append(newImageDiv);
            }
            //
        });

    })
});