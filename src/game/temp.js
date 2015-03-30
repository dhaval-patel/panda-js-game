 game.module("game.assets").require("engine.audio").body(function() {
    game.addAsset("media/player1.png"), game.addAsset("media/player2.png"), game.addAsset("media/logo2.png"), game.addAsset("media/logo1.png"), game.addAsset("media/cloud4.png"), game.addAsset("media/cloud3.png"), game.addAsset("media/cloud2.png"), game.addAsset("media/cloud1.png"), game.addAsset("media/ground.png"), game.addAsset("media/bushes.png"), game.addAsset("media/parallax3.png"), game.addAsset("media/parallax2.png"), game.addAsset("media/parallax1.png"), game.addAsset("media/particle.png"), game.addAsset("media/particle2.png"), game.addAsset("media/bar.png"), game.addAsset("media/gameover.png"), game.addAsset("media/new.png"), game.addAsset("media/restart.png"), game.addAsset("media/madewithpanda.png"), game.addAsset("media/font.fnt"), game.addAudio("media/sound/explosion.m4a", "explosion"), game.addAudio("media/sound/jump.m4a", "jump"), game.addAudio("media/sound/score.m4a", "score"), game.addAudio("media/sound/highscore.m4a", "highscore"), game.addAudio("media/sound/music.m4a", "music")
}), game.module("game.objects").require("engine.sprite").body(function() {
    Player = game.Class.extend({jumpPower: -750,init: function() {
            var e = game.system.width / 2, t = 500;
            this.sprite = new game.MovieClip([game.Texture.fromImage("media/player1.png"), game.Texture.fromImage("media/player2.png")]), this.sprite.position.x = e, this.sprite.position.y = t, this.sprite.anchor.x = this.sprite.anchor.y = .5, this.sprite.animationSpeed = .1, this.sprite.play(), game.scene.stage.addChild(this.sprite), game.scene.addObject(this), this.body = new game.Body({position: {x: e,y: t},velocityLimit: {x: 100,y: 1e3},collideAgainst: 0,collisionGroup: 1}), this.body.collide = this.collide.bind(this);
            var i = new game.Rectangle(132, 36);
            this.body.addShape(i), game.scene.world.addBody(this.body), this.smokeEmitter = new game.Emitter({angle: Math.PI,angleVar: .1,endAlpha: 1,life: .4,lifeVar: .2,count: 2,speed: 400}), this.smokeEmitter.container = game.scene.stage, this.smokeEmitter.textures.push("media/particle.png"), game.scene.emitters.push(this.smokeEmitter), this.flyEmitter = new game.Emitter({life: 0,rate: 0,positionVar: {x: 50,y: 50},targetForce: 200,speed: 100,velocityLimit: {x: 100,y: 100},endAlpha: 1}), this.flyEmitter.container = game.scene.stage, this.flyEmitter.textures.push("media/particle2.png"), this.flyEmitter.position.x = this.sprite.position.x + 30, this.flyEmitter.position.y = this.sprite.position.y - 30, this.flyEmitter.emit(5), game.scene.emitters.push(this.flyEmitter)
        },collide: function() {
            return game.scene.ended || (game.scene.gameOver(), this.body.velocity.y = -200, this.smokeEmitter.rate = 0), this.body.velocity.x = 0, !0
        },update: function() {
            this.sprite.position.x = this.body.position.x, this.sprite.position.y = this.body.position.y, this.smokeEmitter.position.x = this.sprite.position.x - 60, this.smokeEmitter.position.y = this.sprite.position.y, this.flyEmitter.target.x = this.sprite.position.x + 30, this.flyEmitter.target.y = this.sprite.position.y - 30
        },jump: function() {
            this.body.position.y < 0 || (this.body.velocity.y = this.jumpPower, game.audio.playSound("jump"))
        }}), Gap = game.Class.extend({groundTop: 800,width: 132,minY: 150,maxY: 550,height: 232,speed: -300,init: function() {
            var e = Math.round(game.Math.random(this.minY, this.maxY)), t = e - this.height / 2;
            this.topBody = new game.Body({position: {x: game.system.width + this.width / 2,y: t / 2},velocity: {x: this.speed},collisionGroup: 0});
            var i = new game.Rectangle(this.width, t);
            this.topBody.addShape(i), game.scene.world.addBody(this.topBody);
            var r = this.groundTop - t - this.height;
            this.bottomBody = new game.Body({position: {x: game.system.width + this.width / 2,y: t + this.height + r / 2},velocity: {x: this.speed},collisionGroup: 0});
            var s = new game.Rectangle(this.width, r);
            this.bottomBody.addShape(s), game.scene.world.addBody(this.bottomBody), this.goalBody = new game.Body({position: {x: game.system.width + this.width / 2 + this.width + game.scene.player.body.shape.width,y: t + this.height / 2},velocity: {x: this.speed},collisionGroup: 1,collideAgainst: 1}), this.goalBody.collide = function() {
                return game.scene.world.removeBody(this), game.scene.addScore(), !1
            };
            var n = new game.Rectangle(this.width, this.height + game.scene.player.body.shape.height);
            this.goalBody.addShape(n), game.scene.world.addBody(this.goalBody), this.topSprite = new game.Sprite(game.system.width + this.width / 2, t, "media/bar.png", {anchor: {x: .5,y: 0},scale: {y: -1}}), game.scene.gapContainer.addChild(this.topSprite), this.bottomSprite = new game.Sprite(game.system.width + this.width / 2, t + this.height, "media/bar.png", {anchor: {x: .5,y: 0}}), game.scene.gapContainer.addChild(this.bottomSprite)
        },update: function() {
            this.topSprite.position.x = this.bottomSprite.position.x = this.topBody.position.x, this.topSprite.position.x + this.width / 2 < 0 && (game.scene.world.removeBody(this.topBody), game.scene.world.removeBody(this.bottomBody), game.scene.world.removeBody(this.goalBody), game.scene.gapContainer.removeChild(this.topSprite), game.scene.gapContainer.removeChild(this.bottomSprite), game.scene.removeObject(this))
        }}), Cloud = game.Sprite.extend({update: function() {
            this.position.x += this.speed * game.scene.cloudSpeedFactor * game.system.delta, this.position.x + this.width < 0 && (this.position.x = game.system.width)
        }}), Logo = game.Class.extend({init: function() {
            var e, t;
            this.container = new game.Container, this.container.position.y = -150, e = new game.Tween(this.container.position).to({y: 200}, 1500).delay(100).easing(game.Tween.Easing.Back.Out).start(), t = new game.Sprite(game.system.width / 2, 0, "media/logo1.png", {anchor: {x: .5,y: .5}}), this.container.addChild(t), e = new game.Tween(t.position).to({y: -20}, 1e3).easing(game.Tween.Easing.Quadratic.InOut).repeat().yoyo().start(), t = new game.Sprite(game.system.width / 2, 80, "media/logo2.png", {anchor: {x: .5,y: .5}}), this.container.addChild(t), e = new game.Tween(t.position).to({y: 100}, 1e3).easing(game.Tween.Easing.Quadratic.InOut).repeat().yoyo().start(), game.scene.stage.addChild(this.container)
        },remove: function() {
            var e = new game.Tween(this.container).to({alpha: 0}, 1e3).onComplete(this.container.remove.bind(this));
            e.start()
        }})
}), 

 game.module("game.scenes").
 require("engine.scene").body(function() {
    SceneGame = game.Scene.extend({
        backgroundColor: 11721967,
        gapTime: 1500,
        gravity: 2e3,
        score: 0,
        cloudSpeedFactor: 1,
        init: function() {
            this.addParallax(400, "media/parallax1.png", -50);
            this.addParallax(550, "media/parallax2.png", -100);
            this.addParallax(650, "media/parallax3.png", -200);
            this.addCloud(100, 100, "media/cloud1.png", -50);
            this.addCloud(300, 50, "media/cloud2.png", -30);
            this.logo = new Logo, this.addCloud(650, 100, "media/cloud3.png", -50);
            this.addCloud(700, 200, "media/cloud4.png", -40);
            this.addParallax(700, "media/bushes.png", -250);
            this.gapContainer = new game.Container, this.stage.addChild(this.gapContainer);
            this.addParallax(800, "media/ground.png", -300);
            this.player = new Player;
            
            var e = new game.Body({
                position: {
                    x: game.system.width / 2,
                    y: 850
                },
                collisionGroup: 0
            });
            t = new game.Rectangle(game.system.width, 100);
            e.addShape(t);
            this.world.addBody(e);
            this.scoreText = new game.BitmapText(this.score.toString(), {font: "Pixel"});
            this.scoreText.position.x = game.system.width / 2 - this.scoreText.textWidth / 2;
            this.stage.addChild(this.scoreText);
            var i = new game.Sprite(game.system.width / 2, game.system.height - 48, "media/madewithpanda.png", {anchor: {x: .5,y: 0}});
            this.stage.addChild(i);
            game.audio.musicVolume = .2;
            game.audio.playMusic("music")
        },spawnGap: function() {
            this.addObject(new Gap)
        },addScore: function() {
            this.score++, this.scoreText.setText(this.score.toString()), game.audio.playSound("score")
        },addCloud: function(e, t, i, r) {
            var s = new Cloud(e, t, i, {speed: r});
            this.addObject(s), this.stage.addChild(s)
        },addParallax: function(e, t, i) {
            var r = new game.TilingSprite(t);
            r.position.y = e, r.speed.x = i, this.addObject(r), this.stage.addChild(r)
        },mousedown: function() {
            this.ended || (0 === this.player.body.mass && (game.analytics.event("play"), this.player.body.mass = 1, this.logo.remove(), this.addTimer(this.gapTime, this.spawnGap.bind(this), !0)), this.player.jump())
        },showScore: function() {
            var e = new game.Sprite(game.system.width / 2, game.system.height / 2, "media/gameover.png", {anchor: {x: .5,y: .5}}), t = parseInt(game.storage.get("highScore")) || 0;
            this.score > t && game.storage.set("highScore", this.score);
            var i = new game.BitmapText(t.toString(), {font: "Pixel"});
            i.position.x = 27, i.position.y = 43, e.addChild(i);
            var r = new game.BitmapText("0", {font: "Pixel"});
            if (r.position.x = i.position.x, r.position.y = -21, e.addChild(r), game.scene.stage.addChild(e), this.restartButton = new game.Sprite(game.system.width / 2, game.system.height / 2 + 250, "media/restart.png", {anchor: {x: .5,y: .5},scale: {x: 0,y: 0},interactive: !0,mousedown: function() {
                    game.analytics.event("restart"), game.system.setScene(SceneGame)
                }}), this.score > 0) {
                var s = Math.min(100, 1 / this.score * 1e3), n = 0;
                this.addTimer(s, function() {
                    if (n++, r.setText(n.toString()), n >= game.scene.score) {
                        if (this.repeat = !1, game.scene.score > t) {
                            game.audio.playSound("highscore");
                            var i = new game.Sprite(-208, 59, "media/new.png");
                            e.addChild(i)
                        }
                        game.scene.showRestartButton()
                    }
                }, !0)
            } else
                this.showRestartButton()
        },showRestartButton: function() {
            var e = new game.Tween(this.restartButton.scale).to({x: 1,y: 1}, 200).easing(game.Tween.Easing.Back.Out);
            e.start(), this.stage.addChild(this.restartButton)
        },gameOver: function() {
            var e;
            for (this.cloudSpeedFactor = .2, this.ended = !0, this.timers.length = 0, e = 0; e < this.objects.length; e++)
                this.objects[e].speed && (this.objects[e].speed.x = 0);
            for (e = 0; e < this.world.bodies.length; e++)
                this.world.bodies[e].velocity.set(0, 0);
            this.addTimer(500, this.showScore.bind(this)), game.audio.stopMusic(), game.audio.playSound("explosion")
        }})
});
