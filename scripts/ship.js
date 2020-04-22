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
var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SPEED = 0.5;
        _this.FIRE_RATE = 10; // FPS
        _this.FACT_RATE = 2; // Seconds until next
        _this._fireCountdown = 0;
        _this._factCountdown = 0;
        return _this;
    }
    Ship.prototype.Init = function (world) {
        this.size.x = 40;
        this.size.y = 50;
        this.collidable = true;
        this._control = {
            up: false,
            left: false,
            down: false,
            right: false,
            fire: false,
            mouseX: 0,
            mouseY: 0
        };
    };
    Ship.prototype.Pre = function (world) {
        var x = 0;
        var y = 0;
        // Move
        if (this._control.left) {
            x -= 1;
        }
        if (this._control.right) {
            x += 1;
        }
        if (this._control.up) {
            y -= 1;
        }
        if (this._control.down) {
            y += 1;
        }
        this.position.x += x * this.SPEED * world.deltaTime;
        //this.position.y += y * this.SPEED * world.deltaTime;
        // Fire
        if (this._fireCountdown > 0) {
            this._fireCountdown -= world.deltaTime;
        }
        if (this._fireCountdown <= 0 && this._control.fire) {
            this._fireCountdown += (1000 / this.FIRE_RATE);
            this.Fire(world);
        }
        // Generate new CatFact
        if (this._factCountdown > 0) {
            this._factCountdown -= world.deltaTime;
        }
        if (this._factCountdown <= 0) {
            this._factCountdown += this.FACT_RATE * 1000;
            this.GenerateCatFact(world);
        }
    };
    Ship.prototype.Post = function (world) {
    };
    Ship.prototype.Fire = function (world) {
        var bullet = Game.AddTransform("Bullet");
        bullet.position.x = (this.position.x + (this.size.x / 2)) - (bullet.width / 2);
        bullet.position.y = this.position.y;
        bullet.Init(world);
    };
    Ship.prototype.GenerateCatFact = function (world) {
        var catFact = Game.AddTransform("CatFact");
        catFact.Init(world);
    };
    Ship.prototype.Collision = function (world) {
        //CollisionTypes.Ship(world, this, this.collisions);
    };
    Ship.prototype.KeyDown = function (key) {
        switch (key) {
            case "w":
                this._control.up = true;
                break;
            case "a":
                this._control.left = true;
                break;
            case "s":
                this._control.down = true;
                break;
            case "d":
                this._control.right = true;
                break;
        }
    };
    Ship.prototype.KeyUp = function (key) {
        switch (key) {
            case "w":
                this._control.up = false;
                break;
            case "a":
                this._control.left = false;
                break;
            case "s":
                this._control.down = false;
                break;
            case "d":
                this._control.right = false;
                break;
        }
    };
    Ship.prototype.MouseDown = function (world, x, y) {
        this._control.fire = true;
        this._control.mouseX = x;
        this._control.mouseY = y;
    };
    Ship.prototype.MouseUp = function () {
        this._control.fire = false;
    };
    Ship.prototype.MouseMove = function (x, y) {
        this._control.mouseX = x;
        this._control.mouseY = y;
    };
    return Ship;
}(Transform));
