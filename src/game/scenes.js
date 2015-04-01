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
			// var logo = new game.Logo(1, 1);
			// this.stage.addChild(logo.sprite);

			// creat world object
			this.world = new game.World();
			
			// adding a plane which will represent the ground
			var planeShape = new game.Solid(0, game.system.height - 20, game.system.width, 20);

			// add player
			this.player = new game.Player(100, 100 , 50 , 50);
			this.addObject(this.player);

			// add some solid box for player
			var solidBox = new game.Solid(200, game.system.height - 70, 100 , 50);
			solidBox = new game.Solid(300, game.system.height - 250, 100 , 230);


			// add some text
			this.text = new game.Text('Let\'s do some practice', {
				font: '20px bold Arial'
			});
			this.text.position.x = this.text.position.y = 100
			this.stage.addChild(this.text);
		},
		// click: function (event) {
			// console.log(event.global.x, event.global.y);
			// this.addRectangle(event.swipeX, event.swipeY);
		// },
		addRectangle: function (x, y) {
			var rect = new game.Box(x, y);
			this._rect.push(rect);
			this.addObject(rect);
		},
		keydown: function (key) {
			if (key === 'RIGHT' || key === 'LEFT' || key === 'UP') {
				this.player.move(key);
			}
		},
		keyup: function (key) {
			if (key === 'RIGHT' || key === 'LEFT' || key === 'UP') {
				this.player.stop(key);	
			}
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