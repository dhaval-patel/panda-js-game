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
		movingTimer: null,
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
		},
		collide: function (body, type) {
			if (type === 'DOWN') {
				this.stopY();
				// this.removeYGravity();
				this.position.y = body.position.y - this.shape.height;
			} else if (type === 'RIGHT') {
				this.stop(type);
				this.position.x = body.position.x - this.shape.width;
			} else if (type === 'LEFT') {
				this.stop(type);
				this.position.x = body.position.x + body.shape.width;
			}
		},
		changePlayerSprite: function (x, y) {
			this.sprite.crop(x, y, this.shape.width, this.shape.height);
		},
		move: function (dir) {
			if ((dir === 'RIGHT' && this.movingDirection === 'LEFT') || (dir === 'LEFT' && this.movingDirection === 'RIGHT')) {
				this.stop(this.movingDirection);
			}
 
			if (dir === 'RIGHT') {
				this.velocity.x = 100;
				this.sprite.crop(this.shape.width, 0, this.shape.width, this.shape.height);
				this.moveX(dir);
			} else if (dir === 'LEFT'){
				this.velocity.x = -100;
				this.sprite.crop(this.shape.width, this.shape.height, this.shape.width, this.shape.height);
				this.moveX(dir);
			} else if (dir === 'UP') {
				this.world.gravity.y = 980;
				this.velocity.y = -600;
			}

			this.movingDirection = dir;
		},
		calNextSprite: function (dir) {
			var cropX = null;
		
			if (dir === 'RIGHT') {
				cropX = (this.sprite.texture.crop.x + this.shape.width)/this.shape.width <= 3 ?
														 this.sprite.texture.crop.x + this.shape.width : 0;
			} else {
				cropX = (this.sprite.texture.crop.x - this.shape.width) < 0 ?
														 3 * this.shape.width : (this.sprite.texture.crop.x - this.shape.width);
			}

			return cropX;
		},
		moveX: function (dir) {
			this.movingTimer = game.scene.addTimer(300, (function () {
				this.changePlayerSprite(this.calNextSprite (dir), this.sprite.texture.crop.y);				
			}).bind(this), true);

		},
		stop: function (dir) {
			if (dir === 'LEFT' || dir === 'RIGHT') {
				this.stopX(dir);

				if (this.movingTimer) {
					game.scene.removeTimer(this.movingTimer);
					this.movingTimer = null;
				}
			}

		},
		stopX: function (dir) {
			this.velocity.x = 0;

			if (dir === 'RIGHT') {
				this.sprite.crop(0, 0, this.shape.width, this.shape.height);
			} else {
				this.sprite.crop(0, this.shape.height, this.shape.width, this.shape.height);
			}

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
