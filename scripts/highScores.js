function getHighScores(id) {
    var element = $("#" + id + " table");
    $.ajax({
        url: "https://bw4guctac9.execute-api.us-west-2.amazonaws.com/PROD",
        crossDomain: true,
        success: function (data) {
            data.sort(function (a, b) {
                a['score']['N'] - b['score']['N'];
            });
            element.html('');
            for (var i = 0; i < data.length; i++) {
                element.append("\n                    <tr>\n                        <td>" + data[i]['name']['S'] + "</td>\n                        <td>" + data[i]['score']['N'] + "</td>\n                    </tr>\n                ");
            }
            $("#ScoreSubmission").show();
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
    return false;
}
