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
			planeShape = new game.Solid(0, 0, game.system.width, 20);
			planeShape = new game.Solid(0, 20, 20, game.system.height - 40);
			planeShape = new game.Solid(game.system.width - 20, 20, 20, game.system.height - 40);

			// add player
			this.player = new game.Player(100, 40 , 50 , 50);
			// this.addObject(this.player);

			// add some solid box for player
			var solidBox = new game.Solid(100, 150, 100 , 50);
			solidBox = new game.Solid(350, game.system.height - 150, 100, 130);
			solidBox = new game.Solid(500, game.system.height - 150, 100, 130);
			solidBox = new game.Solid(600, game.system.height - 250, 100, 230);

			solidBox = new game.Solid(game.system.width - 200, game.system.height - 150, 100 , 50);


			// add some text
			var text = new game.Text('Let\'s do some practice', {
				font: '20px bold Arial'
			});
			text.position.x = game.system.width - 500;
			text.position.y = 100
			this.stage.addChild(text);

			text = new game.Text('Start', {
				font: '20px bold Arial',
				fill: '#ffffff'
			});
			text.position.x = 105;
			text.position.y = 155;
			this.stage.addChild(text);

			text = new game.Text('End', {
				font: '20px bold Arial',
				fill: '#ffffff'
			});
			text.position.x = game.system.width - 195;
			text.position.y = game.system.height - 145;
			this.stage.addChild(text);
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
			if (key === 'RIGHT' || key === 'LEFT' || key === 'UP'  || key === 'SPACE') {
				this.player.move(key);
			}
		},
		keyup: function (key) {
			if (key === 'RIGHT' || key === 'LEFT') {
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