game.module(
	'game.myphysics'
).body(function () {
	var downMovementHit = function (a, b) {
		return a.last.y < a.position.y && a.position.y + a.shape.height >= b.position.y;
	};

	var isIntersect = function (a, b) {
		var aX = a.position.x;
		var aY = a.position.y;
		var aW = a.shape.width;
		var aH = a.shape.height;
		var bX = b.position.x;
		var bY = b.position.y;
		var bW = b.shape.width;
		var bH = b.shape.height;


		return !(bX > (aX + aW) || (bX + bW) <  aX || bY > (aY + aH) || (bY + bH) < aY);
	};

	game.CollisionSolver.inject({
		hitTest: function (a, b) {
			if (a.shape.width && b.shape.width &&  a.shape.height && b.shape.height) {

				if (isIntersect(a, b)) {
					var downHit = downMovementHit (a, b);

					if (downHit) {
						return true;
					}
				}
			}
		},
		hitResponse: function (a, b) {
			if (a.shape.width && b.shape.width &&  a.shape.height && b.shape.height) {
				if (downMovementHit(a, b)) {
					a.collide(b, 'DOWN');
				}
			}
		}
	});
});
