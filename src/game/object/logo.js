game.module(
	'game.object.logo'
).body(function () {
	'use strict';
	game.createClass('Logo', {
		init: function (x, y) {
			this.sprite = new game.Sprite('logo');
			this.sprite.position.x = x;
			this.sprite.position.y = y;
			this.sprite.scale.x = 0.1;
			this.sprite.scale.y = 0.1;
		}
	});
});
