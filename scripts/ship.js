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
            right: false
        };
    };
    Ship.prototype.Pre = function (world) {
        var x = 0;
        var y = 0;
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
    };
    Ship.prototype.Post = function (world) {
    };
    Ship.prototype.Collision = function (world) {
        CollisionTypes.Box(world, this, this.collisions);
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
    Ship.prototype.Click = function (x, y) {
    };
    return Ship;
}(Transform));
