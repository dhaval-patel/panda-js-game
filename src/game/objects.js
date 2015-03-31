game.module(
    'game.objects'
)
.body(function() {
    'use strict';

	game.createClass('MyClass', {
	    init: function() {
	    }
	});

	game.createClass('Logo', {
		init: function (x, y) {
			this.sprite = new game.Sprite('logo');
			this.sprite.position.x = x;
			this.sprite.position.y = y;
			this.sprite.scale.x = 0.1;
			this.sprite.scale.y = 0.1;
		}
	});

	game.createClass('Player', 'Body', {
		movingDirection: null,
		init: function (x, y) {
			var w = 89, h = 145;

			this._super({
				mass: 1,
				position: {
					x: x,
					y: y
				},
				collisionGroup: 2,
				collideAgainst: [0, 1]
			});

			var shape = new game.Rectangle(w, h);
			this.addShape(shape);
			this.collide.bind(this);
			game.scene.world.addBody(this);

			this.sprite = new game.Sprite('player');
			this.sprite.crop(0, 0, w, h);
			this.sprite.position.x = x;
			this.sprite.position.y = y;
			game.scene.stage.addChild(this.sprite);

			this.update();
			return this;
		},
		update: function () {
			this._super();

			this.sprite.position.x = this.position.x;
			this.sprite.position.y = this.position.y;

			if (this.movingDirection) {
				if (this.movingDirection === 'RIGHT') {
					var cropX = (this.sprite.texture.crop.x + this.shape.width)/this.shape.width <= 3 ? this.sprite.texture.crop.x + this.shape.width : 0;
					this.sprite.crop(cropX, 0, this.shape.width, this.shape.height);
				}
			}
		},
		collide: function (body, type) {
			this.stopY();
			this.removeYGravity();
			this.position.y = body.position.y - this.shape.height;
		},
		move: function (dir) {
			this.movingDirection = dir;

			if (dir === 'RIGHT') {
				this.velocity.x = 50;
				this.sprite.crop(this.shape.width, 0, this.shape.width, this.shape.height);
			} else if (dir === 'LEFT'){
				this.velocity.x = -50;
			}
		},
		stop: function (dir) {
			if (this.movingDirection === dir && (dir === 'LEFT' || dir === 'RIGHT')) {
				this.stopX();
			}
		},
		stopX: function () {
			this.velocity.x = 0;
			this.sprite.crop(0, 0, this.shape.width, this.shape.height);
			this.movingDirection = null;
			return this;
		},
		stopY: function () {
			this.velocity.y = 0;
			return this;
		},
		removeYGravity: function () {
			this.world.gravity.y = 0;
		},
		removeXGravity: function () {

		}
	});

	game.createClass('Box', {
		init: function (x, y) {
			var shape = new game.Rectangle(50, 50);
			this.body = new game.Body({
				mass: 1,
				position: {
					x: x,
					y: y
				},
			 	collideAgainst: ['0', '1'],
                collisionGroup: 1
			});

			this.body.addShape(shape);
			this.body.collide = this.collide.bind(this);

			this.graphics = new game.PIXI.Graphics();
			this.graphics.lineStyle(0, 0x000000);
           	this.graphics.beginFill(Math.random()*0xff0000);
			this.graphics.drawRect(0, 0 , shape.width, shape.height);
			game.scene.stage.addChild(this.graphics);
			game.scene.world.addBody(this.body);
			game.scene.world.addBodyCollision(this.body);

			this.update();
		},
		collide: function (body, type) {
			this.body.mass = 0;
			this.body.velocity.x = this.body.velocity.y = 0;
			this.body.position.y = body.position.y - this.body.shape.height;
		},
		update: function() {
           	this.graphics.position.x = this.body.position.x;
           	this.graphics.position.y = this.body.position.y;
		}
	});

	game.createClass('Solid', {
		init: function (x, y, w, h) {
			var shape = new game.Rectangle(w, h);
			this.body = new game.Body({
				position: {
					x: x,
					y: y
				},
			 	collisionGroup: 0
			});
			this.body.addShape(shape);
			this.graphics = new game.PIXI.Graphics();
			this.graphics.beginFill(0x000000);
			this.graphics.drawRect(0, 0, shape.width, shape.height);
			game.scene.stage.addChild(this.graphics);
			game.scene.world.addBody(this.body);
			game.scene.world.addBodyCollision(this.body);

			this.update();
		},
		update: function() { 
           	this.graphics.position.x = this.body.position.x;
           	this.graphics.position.y = this.body.position.y;
		}
	});
});
