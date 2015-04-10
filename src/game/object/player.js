game.module(
	'game.object.player'
).body(function () {
	'use strict';

	game.createClass('Player', 'Body', {
		movingDirection: {
			x: null,
			y: null
		},
		movingTimer: null,
		init: function (x, y) {
			var w = 49, h = 80;

			this._super({
				mass: 1,
				position: {
					x: x,
					y: y
				},
				collisionGroup: 2,
				collideAgainst: [0, 3]
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

			// this.toString();
		},
		collide: function (body, type) {
			// console.log(type);
			if (type === 'DOWN') {
				this.stopY();
				this.position.y = body.position.y - this.shape.height;

				if (this.movingDirection.x === null) {
					this.velocity.y = 0;
					this.removeYGravity();
				}
			} else if (type === 'RIGHT') {
				// this.stop(type);
				this.position.x = body.position.x - this.shape.width;
			} else if (type === 'LEFT') {
				// this.stop(type);
				this.position.x = body.position.x + body.shape.width;
			} else if (type === 'UP' && this.movingDirection.y) {
				this.position.y = body.position.y + body.shape.height;
				this.velocity.y = 0;
			}

			this.toString();
		},
		move: function (dir) {
			if (dir === 'RIGHT' || dir === 'LEFT') {
				this.moveX(dir);
			} else if (dir === 'UP' || dir === 'SPACE') {
				dir = 'UP';
				this.moveY(dir);
			}
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
		changePlayerSprite: function (x, y) {
			this.sprite.crop(x, y, this.shape.width, this.shape.height);
		},
		moveX: function (dir) {
			if (this.movingDirection.x && this.movingDirection.x != dir) {
				stop(this.movingDirection.x);
			}

			this.movingDirection.x = dir;

			if (dir === 'RIGHT') {
				this.velocity.x = 300;
				this.sprite.crop(this.shape.width, 0, this.shape.width, this.shape.height);
			} else {
				this.velocity.x = -300;
				this.sprite.crop(this.shape.width, this.shape.height, this.shape.width, this.shape.height);
			}

			this.movingTimer = game.scene.addTimer(300, (function () {
				this.changePlayerSprite(this.calNextSprite (dir), this.sprite.texture.crop.y);				
			}).bind(this), true);

			this.resetYGravity();
		},
		moveY: function (dir) {
			if (dir === 'UP') {
				this.resetYGravity();
				this.velocity.y = -600;
				this.movingDirection.y = dir;
			}

			this.movingDirection.y = dir;
		},
		stop: function (dir) {
			if (dir === 'LEFT' || dir === 'RIGHT') {
				this.stopX(dir);
			} else if (dir === 'UP' || dir === 'LEFT') {
				this.stopY(dir);
			}
		},
		stopX: function (dir) {
			this.velocity.x = 0;
			this.movingDirection.x = null;


			if (this.movingTimer) {
				game.scene.removeTimer(this.movingTimer);
				this.movingTimer = null;
			}

			if (dir === 'RIGHT') {
				this.sprite.crop(0, 0, this.shape.width, this.shape.height);
			} else {
				this.sprite.crop(0, this.shape.height, this.shape.width, this.shape.height);
			}

			return this;
		},
		stopY: function () {
			this.velocity.y = 0;
			this.movingDirection.y = null;
			return this;
		},
		removeYGravity: function () {
			this.world.gravity.y = 0;
		},
		resetYGravity: function () {
			this.world.gravity.y = 980;
		},
		toString: function () {
			console.log(this.position.x, this.position.y, this.position.x + this.shape.width, this.position.y + this.shape.height);
		}
	});

});	
