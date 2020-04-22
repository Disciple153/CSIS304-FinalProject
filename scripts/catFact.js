var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CatFact = /** @class */ (function (_super) {
    __extends(CatFact, _super);
    function CatFact() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.FALL_VELOCITY = 100;
        return _this_1;
    }
    CatFact.prototype.Init = function (world) {
        this.size.y = 20;
        this.position.x = 20;
        this.position.y = -50;
        this.velocity.y = this.FALL_VELOCITY;
        this.collidable = false;
        this.element.css("width", "auto");
        //"https://cat-fact.herokuapp.com/facts/random"
        $.ajax({
            url: "https://cat-fact.herokuapp.com/facts/random",
            jsonpCallback: "logResult",
            //dataType: "jsonp",
            data: { accept: "application/json" },
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
    };
    CatFact.prototype.Pre = function (world) {
        if (!this._sizeAdjusted) {
            this.size.x = this.element.width();
            this._sizeAdjusted = true;
            this.position.x = Math.floor(Math.random() * (MAX_WIDTH - this.size.x));
        }
        if (this.position.y > 0) {
            this.collidable = true;
        }
    };
    CatFact.prototype.Post = function (world) {
    };
    CatFact.prototype.Collision = function (world) {
        var _this = this;
        this.collisions.forEach(function (collision) {
            if (collision.transform instanceof Bullet) {
                _this._hp--;
                if (_this._hp <= 0) {
                    _this.toDelete = true;
                }
            }
        });
    };
    return CatFact;
}(Transform));
function logResult(json) {
    console.log(json);
}
