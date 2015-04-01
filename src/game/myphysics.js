game.module(
	'game.myphysics'
).body(function () {
	var downHit = function (a, b) {
		return a.position.y + a.shape.height > b.position.y;
	};

	var upHit = function (a, b) {
		return a.position.y < b.position.y + b.shape.height;
	};

	var rightHit = function (a, b) {
		return a.position.x + a.shape.width > b.position.x;
	};

	var leftHit = function (a, b) {
		return a.position.x < b.position.x + b.shape.width;
	};

	var downMovementHit = function (a, b) {
		return a.last.y < a.position.y && downHit(a, b);
	};

	var upMovementHit = function (a, b) {
		return a.last.y > a.position.y && upHit(a, b);
	};

	var rightMovementHit = function (a, b) {
		return a.last.x < a.position.x && rightHit(a, b);
	};

	var leftMovementHit = function (a, b) {
		return a.last.x > a.position.x && leftHit(a, b);
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
			if (a.shape.width && b.shape.width &&  a.shape.height && b.shape.height && isIntersect(a, b)) {
				if (downMovementHit (a, b)) {
					return true;
				} else if (upMovementHit (a, b)) {
					return true;
				} else if (rightMovementHit(a, b)) {
					return true;
				} else if (leftMovementHit(a, b)) {
					return true;
				}
			}		

			return false;
		},
		hitResponse: function (a, b) {
			var dHit = downMovementHit(a, b);
			var uHit = upMovementHit(a, b);
			var rHit = rightMovementHit(a, b);
			var lHit = leftMovementHit(a, b);


			if (rightHit(a, b) && leftHit(a, b)) {
				if (dHit) {
					a.collide(b, 'DOWN');
				} else if (uHit) {
					a.collide(b, 'UP');
				}
			}

			if (downHit(a, b) && upHit(a, b)) {
				if (rHit) {
					a.collide(b, 'RIGHT');
				} else if (lHit) {
					a.collide(b, 'LEFT');
				}	
			}
		}
	});
});
