$(document).ready(function () {
    // global variable
    let clickCounter = 0;

    let buttonsArray = ["30 rock", "parks&rec", "drag race"];
    for (let i = 0; i < buttonsArray.length; i++) {
        let newButton = $("<button class='term'>");
        $(newButton).text(buttonsArray[i]);
        $(newButton).attr("data-count", 0)
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

    $(document).on("click", "#clear", function () {
        $("#gifs").empty();
    });

    let searchTerm = $(this).text();
    $(document).on("click", ".term", function () {
        console.log(this);
        let searchTerm = $(this).text();
        let apiKey = "F2lpt1HBohJYediBSjlg9Mlu97wiPcg1";
        let limit = 10;
        // store a click value
        console.log("clickCount: ", clickCounter)
        let offset = 10 * clickCounter;
        console.log("off: ", offset)
        clickCounter++;
        // condition to increase offset if button clicked
        let queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&lang=en&fmt=json&api_key=" + apiKey + "&q=" + searchTerm + "&offset=" + offset;
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
                let imageURL = $(newImage).attr("src", results[i].images.fixed_height_still.url);
                let dataStill = $(newImage).attr("data-still", results[i].images.fixed_height_still.url);
                let dataAnimate = $(newImage).attr("data-animate", results[i].images.fixed_height.url);
                let dataState = $(newImage).attr("data-state", "still");
                $(newImage).addClass("change-state");
                // append rating
                let printRating = $("<p>");
                let rating = "Rating: " + results[i].rating.toUpperCase();
                $(printRating).text(rating);
                //$(newImage).append(rating)
                // append image to page
                $(newImageDiv).append(printRating, newImage);
                $("#gifs").append(newImageDiv);
            }
        });
    });
    // listen for clicks on gifs
    $(document).on("click", ".change-state", function () {
        // grab state
        let currentState = $(this).attr("data-state");
        // conditional on how to react to clicks
        if (currentState === "still") {
            let animateURL = $(this).attr("data-animate");
            console.log(animateURL)
            $(this).attr("src", animateURL);
            $(this).attr("data-state", "animate");
        } else {
            let stillURL = $(this).attr("data-still");
            console.log(stillURL);
            $(this).attr("src", stillURL);
            $(this).attr("data-state", "still");
        }
    });
});