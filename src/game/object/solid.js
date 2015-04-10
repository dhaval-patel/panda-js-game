game.module(
	'game.object.solid'
).body(function () {
	'use strict';
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

	game.createClass('End', 'Solid', {
		collisionGroup: 3,
		init: function (x, y, w, h) {
			this._super(x, y, w, h);
		}
	});
});