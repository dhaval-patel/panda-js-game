game.module(
    'game.objects',
    'engine.core'
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

	});

	game.createClass('Box', {
		init: function (x, y) {
			var shape = new game.Rectangle(50, 50);
			this.body = new game.Body({
				mass: 1,
				position: {
					x: x/2,
					y: y/2
				},
			 	collideAgainst: 0,
                collisionGroup: 1
			});
			this.body.addShape(shape);
			this.body.collide = this.collide.bind(this);

			this.graphics = new game.PIXI.Graphics();
			this.graphics.lineStyle(2/game.scene.worldScale,0x000000);
           	this.graphics.beginFill(Math.random()*0xff0000);
			this.graphics.drawRect(this.body.position.x, this.body.position.y , shape.width, shape.height);
			game.scene.stage.addChild(this.graphics);
			game.scene.world.addBody(this.body);
			game.scene.world.addBodyCollision(this.body);
		},
		collide: function () {
			console.log('collide');
		},
		update: function() {
			// very unoptimized way to remove the graphics when a body is destroyed
			if(this.body.world==null){
               	if(!this.removeGraphics){
                    	this.removeGraphics=true;
               	}
               	else{
					game.scene.container.removeChild(this.graphics);
                    	game.scene.removeObject(this);
                    }
			}
			// update graphics
          	else{
               	this.graphics.position.x = this.body.position.x;
               	this.graphics.position.y = this.body.position.y;
			}
		},
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
			this.graphics.drawRect(this.body.position.x, this.body.position.y, shape.width, shape.height);
			game.scene.stage.addChild(this.graphics);
			game.scene.world.addBody(this.body);
			game.scene.world.addBodyCollision(this.body);
		},
		update: function() { 
           	this.graphics.position.x = this.body.position.x;
           	this.graphics.position.y = this.body.position.y;
		}
	});

});
