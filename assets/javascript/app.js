$(document).ready(function () {
    // global variable
    let clickCounter = 0;
    // default buttons
    let topics = ["30 rock", "parks&rec", "drag race", "arrow", "supergirl", "charmed", "umbrella academy", "good girls nbc", "the voice", "american idol", "supernatural", "bob's burgers", "good place", "queer eye"];
    for (let i = 0; i < topics.length; i++) {
        let newButton = $("<button class='term'>");
        $(newButton).text(topics[i]);
        // $(newButton).attr("data-count", 0)
        $("#buttons").append(newButton);
    }

    // Add a new button from user input
    $("#add-button").on("click", function () {
        // capture user input if not blank
        let newTerm = $("#field").val();
        if (newTerm !== "" && newTerm.trim() !== "") {
            // push to array and clear buttons div
            topics.push(newTerm);
            $("#field").val("");
            $("#buttons").empty()
            // push the new aray to buttons div
            for (let i = 0; i < topics.length; i++) {
                let newButton = $("<button class='term'>");
                $(newButton).text(topics[i]);
                $("#buttons").append(newButton);
            }
        }
    });

    // Clear Results Button
    $(document).on("click", "#clear", function () {
        $("#gifs").empty();
    });

    // Pulling From Giphy API on button click
    let searchTerm = $(this).text();
    $(document).on("click", ".term", function () {
        let searchTerm = $(this).text();
        let apiKey = "F2lpt1HBohJYediBSjlg9Mlu97wiPcg1";
        let limit = 10;
        // store a click value
        let offset = 10 * clickCounter;
        clickCounter++;
        // condition to increase offset if button clicked
        let queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&lang=en&fmt=json&api_key=" + apiKey + "&q=" + searchTerm + "&offset=" + offset;
        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // do this to response
            let results = response.data;
            for (let i = 0; i < results.length; i++) {
                //create elements
                let newImage = $("<img>");
                let newImageDiv = $("<div>");
                //create attributes
                let imageURL = $(newImage).attr("src", results[i].images.fixed_height_still.url);
                let dataStill = $(newImage).attr("data-still", results[i].images.fixed_height_still.url);
                let dataAnimate = $(newImage).attr("data-animate", results[i].images.fixed_height.url);
                let dataState = $(newImage).attr("data-state", "still");
                $(newImage).addClass("change-state");
                $(newImageDiv).addClass("result")
                // append rating
                let printRating = $("<p>");
                let rating = "Rating: " + results[i].rating.toUpperCase();
                $(printRating).text(rating);
                // append title
                let printTitle = $("<p>");
                let title = "Title: " + results[i].title;
                $(printTitle).text(title);
                // post image to page, prepend the newImageDiv so that any new 10 sets push to top
                $(newImageDiv).append(printTitle, printRating, newImage);
                $("#gifs").prepend(newImageDiv);
            }
        });
    });
    // Allow clicks to toggle betwen static and animated
    $(document).on("click", ".change-state", function () {
        // grab state
        let currentState = $(this).attr("data-state");
        // conditional on how to react to clicks
        if (currentState === "still") {
            let animateURL = $(this).attr("data-animate");
            $(this).attr("src", animateURL);
            $(this).attr("data-state", "animate");
        } else {
            let stillURL = $(this).attr("data-still");
            $(this).attr("src", stillURL);
            $(this).attr("data-state", "still");
        }
    });
});