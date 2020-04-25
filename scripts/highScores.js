function getHighScores(id, input) {
    if (input === void 0) { input = true; }
    var element = $("#" + id + " table");
    $.ajax({
        url: "https://bw4guctac9.execute-api.us-west-2.amazonaws.com/PROD",
        crossDomain: true,
        success: function (data) {
            data.sort(function (a, b) {
                return b['score']['N'] - a['score']['N'];
            });
            element.html('');
            for (var i = 0; i < data.length; i++) {
                element.append("\n                    <tr>\n                        <td><h3>" + data[i]['name']['S'] + "</h3></td>\n                        <td><h3>" + data[i]['score']['N'] + "</h3></td>\n                    </tr>\n                ");
            }
            if (input) {
                $("#ScoreSubmission").show();
            }
            $("#" + id).show();
        },
        error: function (x, y, z) {
            console.log("ERROR\n" + JSON.stringify(x) + "\n" + y + "\n" + z);
        }
    });
}
function submitHighScore() {
    var score = $("#Score").html();
    var form = document.forms['scoreForm'];
    var name = form.name.value;
    $.ajax({
        url: "https://bw4guctac9.execute-api.us-west-2.amazonaws.com/PROD",
        crossDomain: true,
        data: "name=" + name + "&score=" + score,
        success: function (data) {
            //console.log(JSON.stringify(data));
        },
        error: function (x, y, z) {
            //console.log("ERROR\n" + JSON.stringify(x) + "\n" + y + "\n" + z);
        }
    });
    $("#ScoreSubmission").hide();
    getHighScores('HighScores', false);
}
