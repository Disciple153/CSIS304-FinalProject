class Bullet extends Transform {
    BULLET_SPEED: number = 200;

    public width = 5;
    public height = 15;

    Init(world: World): void {
        this.size.x = this.width;
        this.size.y = this.height;

        this.velocity.y = -this.BULLET_SPEED;
        this.velocity.x = 0;

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