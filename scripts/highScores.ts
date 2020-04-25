
function getHighScores(id) {
    let element = $("#" + id + " table");


    $.ajax({
        url: "https://bw4guctac9.execute-api.us-west-2.amazonaws.com/PROD",
        crossDomain: true,
        success: function (data) {
            data.sort(function (a: any, b: any) {
                a['score']['N'] - b['score']['N'];
            });

            element.html('');

            for (let i = 0; i < data.length; i++) {
                element.append(`
                    <tr>
                        <td>${data[i]['name']['S']}</td>
                        <td>${data[i]['score']['N']}</td>
                    </tr>
                `)
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
    let score = $("#Score").html();
    let form = document.forms['scoreForm'];
    let name = form.name.value;

    $.ajax({
        url: "https://bw4guctac9.execute-api.us-west-2.amazonaws.com/PROD",
        crossDomain: true,
        data: `name=${name}&score=${score}`,
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