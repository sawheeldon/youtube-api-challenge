$(document).ready(function () {

    //get info from user

    $("#search-form").submit(function (event) {
        //alert("here");
        event.preventDefault();
        var userInput = $("#query").val();
        getResults(userInput);
    });
    //using input make API call

    function getResults(userSearchTerm) {
        //alert(query);
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet",
                maxResults: 10,
                key: "AIzaSyAWblRjcTmS4TactzoaSQz-vhAQeXXb7as",
                q: userSearchTerm,
                type: "video"
            },
            function (data) {
                //console.log(data);
                if (data.pageInfo.totalResults == 0) {
                    alert("Nothing here try again.");
                }
                displaySearchResults(data.items);

            });
    }

    //using JSON file populate page with results

    function displaySearchResults(videoArray) {
        var buildTheHtmlOutput = "";

        $.each(videoArray, function (videoArrayKey, videoArrayValue) {
            buildTheHtmlOutput += "<li>";
            buildTheHtmlOutput += "<p>" + videoArrayValue.snippet.title + "</p>"
            buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videoArrayValue.id.videoId + "' target='_blank'>";
            buildTheHtmlOutput += "<img src='" + videoArrayValue.snippet.thumbnails.high.url + "'/>";
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += "</li>";

        });
        $("#searchResult ul").html(buildTheHtmlOutput);
    }


});
