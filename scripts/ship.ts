class Ship extends Transform {
    SPEED: number = 0.5;

    private _control: Control;

    Init(world: World): void {
        this.size.x = 40;
        this.size.y = 50;
        this.collidable = true;

        this._control = {
            up: false,
            left: false,
            down: false,
            right: false
        }
    }

    Pre(world: World): void {
        let x: number = 0;
        let y: number = 0;

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
    }

    Post(world: World): void {
    }

    Collision(world: World): void {
        CollisionTypes.Box(world, this, this.collisions);
    }

    KeyDown(key: string): void {
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
    }

    KeyUp(key: string):void {
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
    }

    Click(x, y): void {

    }
}