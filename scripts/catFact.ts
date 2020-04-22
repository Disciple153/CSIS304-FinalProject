class CatFact extends Transform {
    FALL_VELOCITY: number = 100;

    private _sizeAdjusted: boolean;
    private _hp: number;

    Init(world: World): void {
        this.size.y = 20;

        this.position.x = 20;
        this.position.y = -50;

        this.velocity.y = this.FALL_VELOCITY

        this.collidable = false;

        this.element.css("width", "auto");

        //"https://cat-fact.herokuapp.com/facts/random"


        $.ajax({
            method: "GET",
            url: "https://cat-fact.herokuapp.com/facts/random",
            jsonpCallback: "logResult",
            //dataType: "jsonp",
            data: {accept: "application/json"},
            success: function (response) {
                alert(response);
            }
        });

        //$.ajax({
        //    url: "https://cat-fact.herokuapp.com/facts/random",
        //    crossDomain: true,
        //    type: "GET",
        //    dataType: "json",
        //    data: {accept: "application/json"},
        //    success: function (data, x, y) {
        //        alert(data);
        //        alert(x);
        //        alert(y);
        //    },
        //    error: function (error, other, x) {
        //        alert(JSON.stringify(error));
        //        alert(other);
        //        alert(x);
        //        alert(JSON.stringify(this));
//
        //    }
        //});

        //let xhr = new XMLHttpRequest();
        //xhr.addEventListener("load", function() {
        //    alert(this);
        //});
        //xhr.responseType = "json";
        //xhr.open("GET", "https://cat-fact.herokuapp.com/facts/random");
        //xhr.send();

        this.element.html("SAMPLE CAT FACT");
        this._sizeAdjusted = false;

        this._hp = this.element.html().length;
    }

    Pre(world: World): void {
        if (!this._sizeAdjusted) {
            this.size.x = this.element.width();
            this._sizeAdjusted = true;

            this.position.x =  Math.floor(Math.random() * (MAX_WIDTH - this.size.x));
        }

        if (this.position.y > 0) {
            this.collidable = true;
        }
    }

    Post(world: World): void {
    }

    Collision(world: World): void {
        let _this = this;

        this.collisions.forEach(function (collision) {
            if (collision.transform instanceof Bullet) {
                _this._hp--;


                if (_this._hp <= 0) {
                    _this.toDelete = true;
                }
            }
        });
    }

}

function logResult(json){
    console.log(json);
}