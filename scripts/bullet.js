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
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.BULLET_SPEED = 200;
        _this_1.width = 5;
        _this_1.height = 15;
        return _this_1;
    }
    Bullet.prototype.Init = function (world) {
        this.size.x = this.width;
        this.size.y = this.height;
        this.velocity.y = -this.BULLET_SPEED;
        this.velocity.x = 0;
        this.collidable = true;
    };
    Bullet.prototype.Pre = function (world) {
    };
    Bullet.prototype.Post = function (world) {
    };
    Bullet.prototype.Collision = function (world) {
        var _this = this;
        this.collisions.forEach(function (collision) {
            if (collision.transform instanceof Immovable ||
                collision.transform instanceof CatFact) {
                _this.toDelete = true;
            }
        });
    };
    return Bullet;
}(Transform));
