
function getHighScores(id) {

    $.ajax({
        url: "https://9o9edf83h4.execute-api.us-west-2.amazonaws.com/catFactsHighScores",
        crossDomain: true,
        accepts: {
            "Origin": "https://disciple153.github.io/CSIS304-FinalProject/"
        },
        success: function (data) {
            console.log(JSON.stringify(data));
        },
        error: function (x, y, z) {
            console.log("ERROR\n" + JSON.stringify(x) + "\n" + y + "\n" + z);
        }
    });

    $.get("https://9o9edf83h4.execute-api.us-west-2.amazonaws.com/catFactsHighScores").done(function (data) {
        console.log(JSON.stringify(data));
    });
}

function submitHighScore(id) {

}