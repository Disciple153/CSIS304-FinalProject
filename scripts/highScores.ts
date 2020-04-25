
function getHighScores(id) {
    $.get("https://9o9edf83h4.execute-api.us-west-2.amazonaws.com/catFactsHighScores",
        function (data) {
            console.log(JSON.stringify(data));
        });
}

function submitHighScore(id) {

}