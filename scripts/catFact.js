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
        _this_1.FALL_VELOCITY = 300;
        _this_1.SPEED = 100;
        _this_1.ROTATION_SPEED = 0.01;
        _this_1.FIRE_RATE = 2;
        _this_1.FIRE_ROTATE = 0.05;
        _this_1._currentDirection = 0;
        _this_1._targetDirection = 0;
        _this_1._fireDirection = 0;
        _this_1._numGuns = 0;
        _this_1._fireCountdown = 0;
        return _this_1;
    }
    CatFact.prototype.Init = function (world, player) {
        if (player === void 0) { player = null; }
        this._player = player;
        this.size.y = 20;
        this.position.x = 20;
        this.position.y = -50;
        this.velocity.y = this.FALL_VELOCITY;
        this.collidable = false;
        this.element.css("width", "auto");
        //"https://cat-fact.herokuapp.com/facts/random"
        //$.ajax({
        //    url: "https://cat-fact.herokuapp.com/facts/random",
        //    dataType: "jsonp",
        //    data: {accept: "application/json"},
        //    success: function (x, y, z) {
        //        console.log("SUCCESS\n" + x + "\n" + y + "\n" + z);
        //    },
        //    error: function (x, y, z) {
        //        console.log("ERROR\n" + JSON.stringify(x) + "\n" + y + "\n" + z);
        //    }
        //});
        this.element.html("SAMPLE CAT FACT");
        this._sizeAdjusted = false;
        this._maxHp = this.element.html().length;
        this._hp = this._maxHp;
        this._numGuns = Math.floor((this._maxHp / 10) + 1);
        // Make sure that this ship was created correcly:
        if (player == null) {
            this.toDelete = true;
        }
    };
    CatFact.prototype.Pre = function (world) {
        // Adjust size once text is loaded.
        if (!this._sizeAdjusted) {
            this.size.x = this.element.width();
            this._sizeAdjusted = true;
            this.position.x = Math.floor(Math.random() * (MAX_WIDTH - this.size.x));
        }
        // Enable fact once it has reached a point.
        if (!this.collidable && this.position.y > MAX_HEIGHT / 4) {
            this.collidable = true;
        }
        if (this.collidable) {
            this.Rotate(world);
            this.Fire(world);
        }
    };
    CatFact.prototype.Post = function (world) {
    };
    CatFact.prototype.Collision = function (world) {
        var _this = this;
        this.collisions.forEach(function (collision) {
            if (collision.transform instanceof Laser) {
                _this._hp--;
                _this._player.AddPoints(1);
                if (_this._hp <= 0) {
                    _this._player.AddPoints(_this._maxHp);
                    _this.toDelete = true;
                }
            }
        });
    };
    CatFact.prototype.Rotate = function (world) {
        // Determine the direction the CatFact is to turn
        if ((this._currentDirection - this._targetDirection + 360) % 360 < 180) {
            // decrease currentDirection
            this._currentDirection -= world.deltaTime * this.ROTATION_SPEED;
        }
        else {
            // increase currentDirection
            this._currentDirection += world.deltaTime * this.ROTATION_SPEED;
        }
        // normalize the current direction
        this._currentDirection = (this._currentDirection + 360) % 360;
        // If the currentDirection has reached the targetDirection:
        if (Math.abs((this._currentDirection - this._targetDirection + 360) % 360) <
            world.deltaTime * this.ROTATION_SPEED) {
            // Generate new targetDirection
            this._targetDirection = Math.random() * 360;
        }
        // Generate a velocity based on the currentDirection
        this.velocity.x = Math.sin(this._currentDirection * (Math.PI / 180)) * this.SPEED;
        this.velocity.y = Math.cos(this._currentDirection * (Math.PI / 180)) * this.SPEED;
    };
    CatFact.prototype.Fire = function (world) {
        var bullet;
        var pos;
        this._fireDirection += (this.FIRE_ROTATE * world.deltaTime) % 360;
        this._fireCountdown -= world.deltaTime;
        pos = new Vector(this.position.x + (this.size.x / 2), this.position.y + (this.size.y / 2));
        if (this._fireCountdown <= 0) {
            this._fireCountdown += 1000 / this.FIRE_RATE;
            for (var i = 0; i < this._numGuns; i++) {
                bullet = Game.AddTransform("Bullet");
                bullet.Init(world, (this._fireDirection + ((i * 360) / this._numGuns)) % 360, pos);
            }
        }
    };
    return CatFact;
}(Transform));
