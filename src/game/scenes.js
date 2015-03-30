game.module(
	'game.scenes'
)
.require(
	'game.objects'
)
.body(function() {
	'use strict';

	var MainScene = {
		backgroundColor: 0xf0f0f0,
		_rect: [],
		worldScale: 1,
		init: function () {
			var logo = new game.Logo(1, 1);
			this.stage.addChild(logo.sprite);

			// creat world object
			this.world = new game.World();
			
			// adding a plane which will represent the ground
			var planeShape = new game.Solid(0, game.system.height - 20, game.system.width, 20);
		},
		click: function (event) {
			console.log(event.global.x, event.global.y);
			this.addRectangle(event.swipeX, event.swipeY);
		},
		addRectangle: function (x, y) {
			var rect = new game.Box(x, y);
			this._rect.push(rect);
			this.addObject(rect);
		}
	};

	game.createScene('Main', MainScene);

	var EndScene = {
		backgroundColor: 0xff0000,
		init: function () {

		}
	};

	game.createScene('End', EndScene);
});