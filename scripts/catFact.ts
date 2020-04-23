class CatFact extends Transform {
    FALL_VELOCITY: number = 300;
    SPEED: number = 100;
    ROTATION_SPEED: number = 0.01;
    FIRE_RATE: number = 2;
    FIRE_ROTATE: number = 0.05;

    private _sizeAdjusted: boolean;
    private _maxHp: number;
    private _hp: number;
    private _player: Ship;
    private _currentDirection: number = 0;
    private _targetDirection: number = 0;
    private _fireDirection: number = 0;
    private _numGuns: number = 0;
    private _fireCountdown: number = 0;

    Init(world: World, player: Ship = null): void {
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
    }

    Pre(world: World): void {
        // Adjust size once text is loaded.
        if (!this._sizeAdjusted) {
            this.size.x = this.element.width();
            this._sizeAdjusted = true;

            this.position.x =  Math.floor(Math.random() * (MAX_WIDTH - this.size.x));
        }

        // Enable fact once it has reached a point.
        if (!this.collidable && this.position.y > MAX_HEIGHT / 4) {
            this.collidable = true;
        }

        if (this.collidable) {
            this.Rotate(world);
            this.Fire(world);
        }


    }

    Post(world: World): void {
    }

    Collision(world: World): void {
        let _this = this;

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
    }

    Rotate(world: World) {
        // Determine the direction the CatFact is to turn
        if ((this._currentDirection - this._targetDirection + 360) % 360 < 180){
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
    }

    Fire(world: World) {
        let bullet: Bullet;
        let pos: Vector;

        this._fireDirection += (this.FIRE_ROTATE * world.deltaTime) % 360;
        this._fireCountdown -= world.deltaTime;

        pos = new Vector(this.position.x + (this.size.x / 2),
            this.position.y + (this.size.y / 2));

        if (this._fireCountdown <= 0) {
            this._fireCountdown += 1000 / this.FIRE_RATE;

            for (let i = 0; i < this._numGuns; i++) {
                bullet= <Bullet> Game.AddTransform("Bullet");
                bullet.Init(
                    world,
                    (this._fireDirection + ((i * 360) / this._numGuns)) % 360,
                    pos);
            }
        }
    }
}