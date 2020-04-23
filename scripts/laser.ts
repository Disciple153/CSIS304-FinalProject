class Laser extends Transform {
    SPEED: number = 1000;
    OFFSET: number = 30;

    public width = 7;
    public height = 25;

    Init(world: World, direction: number = 0, origin: Vector = new Vector(0, 0)): void {
        this.size.x = this.width;
        this.size.y = this.height;

        this.velocity.x = Math.sin(direction * (Math.PI / 180));
        this.velocity.y = -Math.cos(direction * (Math.PI / 180));

        this.position.x = origin.x + (this.velocity.x * this.OFFSET);
        this.position.y = origin.y + (this.velocity.y * this.OFFSET);

        this.velocity.x *= this.SPEED;
        this.velocity.y *= this.SPEED;

        this.element.css({'transform' : 'rotate('+ direction +'deg)'});

        this.collidable = true;
    }

    Pre(world: World): void {
    }

    Post(world: World): void {
    }

    Collision(world: World): void {
        let _this = this;

        this.collisions.forEach(function (collision) {
            if (collision.transform instanceof Immovable ||
                collision.transform instanceof CatFact) {
                _this.toDelete = true;
            }
        });
    }
}