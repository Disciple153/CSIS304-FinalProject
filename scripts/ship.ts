class Ship extends Transform {
    SPEED: number = 0.5;
    FIRE_RATE: number = 10;     // FPS
    FACT_RATE: number = 2;      // Seconds until next


    private _control: Control;
    private _fireCountdown: number = 0;
    private _factCountdown: number = 0;

    Init(world: World): void {
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
        }
    }

    Pre(world: World): void {
        let x: number = 0;
        let y: number = 0;

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
    }

    Post(world: World): void {
    }

    Fire(world: World): void {
        let bullet: Bullet = <Bullet> Game.AddTransform("Bullet");

        bullet.position.x = (this.position.x + (this.size.x / 2)) - (bullet.width / 2);
        bullet.position.y = this.position.y;
        bullet.Init(world);
    }

    GenerateCatFact(world: World): void {
        let catFact: CatFact = <CatFact> Game.AddTransform("CatFact");

        catFact.Init(world);
    }

    Collision(world: World): void {
        //CollisionTypes.Ship(world, this, this.collisions);
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

    MouseDown(world: World, x: number, y: number): void {
        this._control.fire = true;
        this._control.mouseX = x;
        this._control.mouseY = y;
    }

    MouseUp(): void {
        this._control.fire = false;
    }

    MouseMove(x: number, y: number) {
        this._control.mouseX = x;
        this._control.mouseY = y;
    }
}