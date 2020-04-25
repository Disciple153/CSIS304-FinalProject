
function getHighScores(id: string, input: boolean = true) {
    let element = $("#" + id + " table");

    $.ajax({
        url: "https://bw4guctac9.execute-api.us-west-2.amazonaws.com/PROD",
        crossDomain: true,
        success: function (data) {
            data.sort(function (a: any, b: any) {
                return b['score']['N'] - a['score']['N'];
            });

            element.html('');

            for (let i = 0; i < data.length; i++) {
                element.append(`
                    <tr>
                        <td><h3>${data[i]['name']['S']}</h3></td>
                        <td><h3>${data[i]['score']['N']}</h3></td>
                    </tr>
                `)
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

    getHighScores('HighScores', false);
}