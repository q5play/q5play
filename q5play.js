/**
 *            /5555555            /ll
 *           | 55____/           | ll
 *   /qqqqqq | 55        /pppppp | ll  /aaaaaa  /yy   /yy
 *  /qq__  qq| 5555555  /pp__  pp| ll |____  aa| yy  | yy
 * | qq  \ qq|_____  55| pp  \ pp| ll  /aaaaaaa| yy  | yy
 * | qq  | qq /55  \ 55| pp  | pp| ll /aa__  aa| yy  | yy
 * |  qqqqqqq|  555555/| ppppppp/| ll|  aaaaaaa|  yyyyyyy
 *  \____  qq \______/ | pp____/ |__/ \_______/ \____  yy
 *       | qq          | pp                     /yy  | yy
 *       | qq          | pp                    |  yyyyyy/
 *       |__/          |__/                     \______/
 *
 * @package q5play
 * @version 4.0-alpha21
 * @author quinton-ashley
 * @license q5play License
 * @website https://q5play.org
 */

// will use semver minor after v4.0 is released
let q5play_version = 'alpha21';

if (typeof globalThis.Q5 == 'undefined') {
	console.error('q5play requires q5.js to be loaded first. Visit https://q5js.org to learn more.');
	if (typeof globalThis.p5 != 'undefined') {
		console.error('q5play is not compatible with p5.js yet.');
	}
}

// called when a new instance of Q5 is created
async function q5playPreSetup() {
	const $ = this, // the q5 instance that called this function
		log = console.log,
		Box2DFactory = await import('box2d3-wasm'),
		Box2D = await Box2DFactory.default({ pthreadCount: 0 });

	const {
		b2Vec2,
		b2Rot,
		b2MakeRot,
		b2AABB,
		b2Transform,
		b2QueryFilter,
		TaskSystem,
		b2ComputeHull,
		DebugDrawCommandBuffer,

		b2Rot_identity,
		b2InvMulRot,

		/* World */
		b2DefaultWorldDef,
		b2CreateWorld,
		b2DestroyWorld,
		b2World_Step,
		b2World_Draw,
		b2World_GetContactEvents,
		b2World_GetSensorEvents,
		b2World_GetJointEvents,
		b2World_EnableSleeping,
		b2World_IsSleepingEnabled,
		b2World_GetAwakeBodyCount,
		b2World_GetRestitutionThreshold,
		b2World_SetRestitutionThreshold,
		b2World_GetHitEventThreshold,
		b2World_SetHitEventThreshold,
		b2World_GetProfile,
		b2World_GetCounters,
		b2World_OverlapAABB,
		b2World_CastRay,
		b2World_CastRayClosest,
		b2World_SetCustomFilterCallback,
		b2World_GetGravity,
		b2World_SetGravity,
		b2World_Explode,

		/* Explosion */
		b2DefaultExplosionDef,

		/* Shape */
		b2DefaultShapeDef,
		b2MakeBox,
		b2MakeRoundedBox,
		b2MakeOffsetBox,
		b2MakeOffsetRoundedBox,
		b2MakePolygon,
		b2MakeOffsetRoundedPolygon,
		b2Circle,
		b2Capsule,
		b2Segment,

		b2DefaultChainDef,
		b2CreateChain,

		b2CreatePolygonShape,
		b2CreateCircleShape,
		b2CreateCapsuleShape,
		b2CreateSegmentShape,
		b2DestroyShape,

		b2Shape_IsValid,
		b2Shape_TestPoint,
		b2Shape_RayCast,
		b2Shape_SetDensity,
		b2Shape_SetFriction,
		b2Shape_SetRestitution,
		b2Shape_GetSurfaceMaterial,
		b2Shape_SetSurfaceMaterial,
		b2Shape_EnableContactEvents,
		b2Shape_EnableSensorEvents,
		b2Shape_EnableHitEvents,
		b2Shape_GetCircle,
		b2Shape_SetCircle,
		b2Shape_GetCapsule,
		b2Shape_SetCapsule,
		b2Shape_GetPolygon,
		b2Shape_SetPolygon,
		b2Shape_GetSegment,
		b2Shape_SetSegment,
		b2Shape_GetChainSegment,
		b2Shape_GetParentChain,
		b2Shape_GetAABB,
		b2Shape_GetContactCapacity,
		b2Shape_GetContactData,

		// get closest point on the shape to a target point
		b2Shape_GetClosestPoint,

		/* Body */
		b2BodyType,
		b2DefaultBodyDef,
		b2CreateBody,
		b2DestroyBody,
		b2Body_GetPosition,
		b2Body_GetRotation,
		b2Body_GetTransform,
		b2Body_SetTransform,
		b2Body_SetTargetTransform,
		b2Body_GetLocalPoint,
		b2Body_GetWorldPoint,
		b2Body_GetLocalVector,
		b2Body_GetWorldVector,
		b2Body_GetMass,
		b2Body_GetLocalCenterOfMass,
		b2Body_SetMassData,
		b2Body_GetMassData,
		b2Body_ApplyMassFromShapes,
		b2Body_GetLinearVelocity,
		b2Body_SetLinearVelocity,
		b2Body_GetAngularVelocity,
		b2Body_SetAngularVelocity,
		b2Body_ApplyForce,
		b2Body_ApplyForceToCenter,
		b2Body_ApplyTorque,
		b2Body_GetLinearDamping,
		b2Body_SetLinearDamping,
		b2Body_GetAngularDamping,
		b2Body_SetAngularDamping,
		b2Body_GetGravityScale,
		b2Body_SetGravityScale,
		b2Body_SetType,
		b2Body_IsAwake,
		b2Body_SetAwake,
		b2Body_Enable,
		b2Body_Disable,
		b2Body_IsSleepEnabled,
		b2Body_EnableSleep,
		b2Body_GetSleepThreshold,
		b2Body_SetSleepThreshold,
		b2Body_IsBullet,
		b2Body_SetBullet,
		b2Body_ComputeAABB,
		b2Body_GetWorld,
		b2Body_SetMotionLocks,

		b2MotionLocks,

		/* Joint */
		b2DefaultWeldJointDef, // glue joint
		b2CreateWeldJoint,
		b2DefaultDistanceJointDef,
		b2CreateDistanceJoint,
		b2DefaultMotorJointDef,
		b2CreateMotorJoint,
		b2DefaultPrismaticJointDef,
		b2CreatePrismaticJoint,
		b2DefaultRevoluteJointDef,
		b2CreateRevoluteJoint,
		b2DefaultWheelJointDef,
		b2CreateWheelJoint,

		b2Joint_IsValid,
		b2Joint_WakeBodies,
		b2Joint_SetLocalFrameA,
		b2Joint_SetLocalFrameB,
		b2Joint_GetCollideConnected,
		b2Joint_SetCollideConnected,
		b2Joint_GetConstraintForce,
		b2Joint_GetConstraintTorque,
		b2Joint_GetForceThreshold,
		b2Joint_SetForceThreshold,
		b2Joint_GetTorqueThreshold,
		b2Joint_SetTorqueThreshold,
		b2DestroyJoint
	} = Box2D;

	$.Box2D = Box2D;

	let friendlyRounding = true;

	$.Q5Play = class {
		constructor() {
			this.version = q5play_version;
			this.sprites = {};
			this.groups = {};
			this.groupsCreated = 0;
			this.spritesCreated = 0;
			this.spritesDrawn = 0;
			this.images = {};
			this.palettes = [];
			this.storeDeletedGroupRefs = true;
			this.snapToGrid = false;
			this.gridSize = 0.5;
			this.os = {};
			this.context = 'web';

			if (window.matchMedia) this.hasMouse = window.matchMedia('(any-hover: none)').matches ? false : true;
			else this.hasMouse = true;
			this.standardizeKeyboard = false;

			if (typeof navigator == 'object') {
				let idx = navigator.userAgent.indexOf('iPhone OS');
				if (idx > -1) {
					let version = navigator.userAgent.substring(idx + 10, idx + 12);

					this.os.platform = 'iOS';
					this.os.version = version;
				} else {
					let pl = navigator.userAgentData?.platform;
					if (!pl && navigator.platform) {
						pl = navigator.platform.slice(3);
						if (pl == 'Mac') pl = 'macOS';
						else if (pl == 'Win') pl = 'Windows';
						else if (pl == 'Lin') pl = 'Linux';
					}
					this.os.platform = pl;
				}
			}

			this.renderStats = false;
			this._renderStats = {
				x: 10,
				y: 10,
				font: 'monospace',
				fontSize: 14,
				gap: 22,
				chartWidth: 100,
				chartHeight: 40
			};
			this._fps = 60;
			this._fpsArr = [60];

			/*
			 * Ledgers for contact relationship callback functions.
			 *
			 * Doing this:
			 * group1.collides(group2, cb1);
			 * let sprite0 = new group1.Sprite(...);
			 * sprite0.collides(sprite1, cb0);
			 *
			 * Would result in this:
			 * q5play._collides = {
			 *   1: {
			 *     2: cb1
			 *   },
			 *   1000: {
			 *     2: cb1,
			 *     1001: cb0
			 *   }
			 * };
			 */
			this._collides = {};
			this._colliding = {};
			this._collided = {};
			this._overlaps = {};
			this._overlapping = {};
			this._overlapped = {};
			this._passes = {};
		}

		get friendlyRounding() {
			return friendlyRounding;
		}

		set friendlyRounding(val) {
			friendlyRounding = val;
		}

		onImageLoad() {}
	};

	$.q5play = new $.Q5Play();
	delete $.Q5Play;

	let using_p5v1 = !$._q5 && p5.VERSION[0] == 1;
	let using_p5v2 = !$._q5 && p5.VERSION[0] == 2;

	// in q5play the default angle mode is degrees
	const DEGREES = $.DEGREES;
	$.angleMode(DEGREES);

	$.rectMode($.CENTER);
	$.imageMode($.CENTER);

	const ZERO_ROT = b2MakeRot(0);

	let meterSize = 60;

	// scale to box2d coordinates from q5 coordinates
	const scaleTo = (x, y) => new b2Vec2(x / meterSize, y / meterSize);

	// scale from box2d coordinates to q5 coordinates
	const scaleFrom = (x, y) => ({ x: x * meterSize, y: y * meterSize });

	const linearSlop = 0.005,
		angularSlop = 0.000582;

	const isSlop = (val) => Math.abs(val) <= linearSlop;
	const fixRound = (val) => {
		const v = Math.round(val);
		return Math.abs(val - v) <= linearSlop ? v : val;
	};
	const fixRoundAngular = (val) => {
		const v = Math.round(val);
		return Math.abs(val - v) <= angularSlop ? v : val;
	};

	const minAngleDist = (ang, rot) => {
		let full = $._angleMode == DEGREES ? 360 : $.TWO_PI;
		let dist1 = (ang - rot) % full;
		let dist2 = (full - Math.abs(dist1)) * -Math.sign(dist1);
		return (Math.abs(dist1) < Math.abs(dist2) ? dist1 : dist2) || 0;
	};

	let wID,
		usePhysics = true,
		cameraOn = false,
		timeScale = 1,
		shapeDict = {},
		jointDict = {},
		tileDict = {};

	const eventTypes = {
		_collisions: ['_collides', '_colliding', '_collided'],
		_overlappers: ['_overlaps', '_overlapping', '_overlapped']
	};

	$.DYN = $.DYNAMIC = 'dynamic';
	$.STA = $.STATIC = 'static';
	$.KIN = $.KINEMATIC = 'kinematic';

	let bodyTypes = [b2BodyType.b2_dynamicBody, b2BodyType.b2_staticBody, b2BodyType.b2_kinematicBody];

	const Shape = class {
		constructor(sprite) {
			this.sprite = sprite;

			this.def = new b2DefaultShapeDef();
			this.def.enableCustomFiltering = true;
		}

		_init(id, type, geom) {
			// Box2D shape ID pointer object
			this.id = id;

			// ['box', 'polygon', 'roundedPolygon', 'circle', 'capsule', 'segment', 'chain', 'capsuleChain']
			this.type = type;

			this.geom = geom;
		}

		_packData() {
			// workaround that packs:
			// - sprite's unique ID
			// - sensor flag
			// - first shape flag
			// into a single unsigned 32-bit integer, customColor,
			// the only custom property Box2D exposes in debug draw
			const pack24 = this.sprite._uid,
				pack25 = this._isSensor ? 1 : 0,
				pack26 = this._isFirstShape ? 1 : 0,
				packedData = (pack26 << 26) | (pack25 << 25) | pack24;
			// could use other bits for other flags later

			this.def.material.customColor = packedData;
		}

		delete() {
			b2DestroyShape(this.id);
			const s = this.sprite;
			s._shapes.splice(s._shapes.indexOf(this), 1);
			if (this._isSensor) {
				s.sensors.splice(s.sensors.indexOf(this), 1);
			} else {
				s.colliders.splice(s.colliders.indexOf(this), 1);
			}
			delete shapeDict[this.id.index1];

			if (s._massUndef && s.colliders.length) b2Body_ApplyMassFromShapes(s.bdID);
		}

		scaleBy(scaleX, scaleY) {
			if (scaleY === undefined) scaleY = scaleX;

			let id = this.id,
				type = this.type,
				geom = this.geom;

			if (type == 0) {
				let hw = geom._hw * scaleX,
					hh = geom._hh * scaleY,
					rr;

				if (!geom._rr) geom = b2MakeBox(hw, hh);
				else {
					rr = geom._rr * Math.min(scaleX, scaleY);
					geom = b2MakeRoundedBox(hw, hh, rr);
				}
				b2Shape_SetPolygon(id, geom);
				geom._hw = hw;
				geom._hh = hh;
				geom._rr = rr;
				this.geom = geom;
			} else if (type == 3) {
				geom.radius *= scaleX;
				b2Shape_SetCircle(id, geom);
				this.geom = geom;
			}
		}

		_enableContactEvents(val = true) {
			if (!this._areContactEventsEnabled) {
				b2Shape_EnableContactEvents(this.id, val);
				this._areContactEventsEnabled = val;
			}
		}

		_enableSensorEvents(val = true) {
			if (!this._areSensorEventsEnabled) {
				b2Shape_EnableSensorEvents(this.id, val);
				this._areSensorEventsEnabled = val;
			}
		}

		get density() {
			return this._density;
		}
		set density(val) {
			this._density = val;
			b2Shape_SetDensity(this.id, val);
		}
	};

	const Sensor = class extends Shape {
		constructor(sprite) {
			super(sprite);
			this.def.isSensor = this._isSensor = true;
			this._isCollider = false;
			this.def.density = this._density = 0.00000000001;
			this.def.enableSensorEvents = this._areSensorEventsEnabled = true;
		}
	};

	const Collider = class extends Shape {
		constructor(sprite) {
			super(sprite);
			this._isSensor = false;
			this._isCollider = true;

			this._density = sprite.density || 1;
			this._friction = sprite.friction || 0.5;
			this._restitution = sprite.bounciness || 0;
			this._rollingResistance = 0;
			this._tangentSpeed = 0;

			this.def.isSensor = false;
			this.def.density = this._density;
			this.def.material.friction = this._friction;
			this.def.material.restitution = this._restitution;
			this.def.material.rollingResistance = 0;
			this.def.material.tangentSpeed = 0;
		}

		get bounciness() {
			return this._restitution;
		}
		set bounciness(val) {
			this._restitution = val;
			b2Shape_SetRestitution(this.id, val);
		}

		get friction() {
			return this._friction;
		}
		set friction(val) {
			this._friction = val;
			b2Shape_SetFriction(this.id, val);
		}

		get rollingResistance() {
			return this._rollingResistance;
		}
		set rollingResistance(val) {
			const material = b2Shape_GetSurfaceMaterial(this.id);
			material.rollingResistance = this._rollingResistance = val;
			b2Shape_SetSurfaceMaterial(this.id, material);
		}

		get surfaceSpeed() {
			return this._tangentSpeed;
		}
		set surfaceSpeed(val) {
			const material = b2Shape_GetSurfaceMaterial(this.id);
			material.tangentSpeed = this._tangentSpeed = val;
			b2Shape_SetSurfaceMaterial(this.id, material);
		}
	};

	$.Visual = class {
		constructor(x = 0, y = 0) {
			this._isVisual = true;

			this.x = x;
			this.y = y;

			this.ani = null;
			this._img = null;
			this._hasImagery = false;
			this._aniChangeCount = 0;
		}

		get anis() {
			if (!this._anis) {
				this._anis = new $.Anis();
			}
			return this._anis;
		}
		set anis(val) {
			this._anis = val;
		}

		get img() {
			return this._img || this.ani?.frameImage;
		}
		set img(val) {
			if (typeof val == 'string') {
				if (!val.includes('.')) {
					val = new $.EmojiImage(val, this.w || 50);
				} else val = $.loadImage(val);
			}
			this._img = this._extendImage(val);
			this._hasImagery = true;
		}

		get image() {
			return this._img || this.ani?.frameImage;
		}
		set image(val) {
			this.img = val;
		}

		_extendImage(img) {
			img.offset ??= { x: 0, y: 0 };
			img._scale ??= { x: 1, y: 1 };
			if (!img.scale) {
				Object.defineProperty(img, 'scale', {
					get: () => img._scale,
					set: (val) => {
						if (typeof val == 'number') val = { x: val, y: val };
						img._scale = val;
					}
				});
			}
			return img;
		}

		addAni() {
			let args = [...arguments];
			let ani, name;
			if (args[0] instanceof $.Ani) {
				if (args.length == 1) {
					ani = args[0];
					name = ani.name;
				}
			} else if (args.length >= 2 && typeof args[0] == 'string' && args[1] instanceof $.Ani) {
				name = args[0];
				ani = args[1];
				if (ani._addedToSpriteOrGroup) ani = ani.clone();
				ani.name = name;
			} else {
				ani = new $.Ani(this, ...args);
				name = ani.name;
			}

			if (this._anis) {
				this._anis[name] = ani;
			} else if (this.ani) {
				// Only create anis object if this is not the first animation
				this._anis = new $.Anis();
				// Add the previously added animation to anis
				this._anis[this.ani.name] = this.ani;
			}

			this.ani = ani;
			this._hasImagery = true;
			ani._addedToSpriteOrGroup = true;

			// this works if the image(s) used for the animation already loaded
			if (this._dimensionsUndef && (ani.w != 1 || ani.h != 1)) {
				if (this.w !== undefined) this.w = ani.w;
				if (this.h !== undefined) this.h = ani.h;
			}
			return ani.promise;
		}

		addAnis(spriteSheet, frameSize, atlases) {
			let args = [...arguments];

			if (args.length == 3) {
				this.anis.frameSize = frameSize;
			}
			if (args.length >= 2) {
				this.anis.spriteSheet = spriteSheet;
			}
			atlases = args.at(-1);

			let loaders = [];
			for (let name in atlases) {
				let atlas = atlases[name];
				loaders.push(this.addAni(name, atlas));
			}
			return Promise.all(loaders);
		}

		async changeAni(label) {
			this.playSequence(label);
		}

		async playSequence(seq) {
			if (arguments.length > 1) seq = [...arguments];
			else if (seq instanceof $.Ani) {
				if (seq == this.ani) return;
				seq = [seq];
			} else if (!Array.isArray(seq)) {
				if (seq == this.ani?.name) return;
				seq = [seq];
			}

			this._aniChangeCount++;
			let loop, stopOnLastAni;
			for (let i = 0; i < seq.length; i++) {
				let phase = seq[i];
				if (typeof phase == 'string') {
					phase = { name: phase };
					seq[i] = phase;
				}
				if (phase.name.length > 1) {
					if (phase.name[0] == '!') {
						phase.name = phase.name.slice(1);
						phase.start = -1;
						phase.end = 0;
					}
					if (phase.name[0] == '<' || phase.name[0] == '>') {
						phase.name = phase.name.slice(1);
						phase.flipX = true;
					}
					if (phase.name[0] == '^') {
						phase.name = phase.name.slice(1);
						phase.flipY = true;
					}
					if (phase.name == '**') {
						loop = true;
						seq = seq.slice(0, -1);
					}
					if (phase.name == ';;') {
						stopOnLastAni = true;
						seq = seq.slice(0, -1);
					}
				}
			}
			let count = this._aniChangeCount;

			do {
				for (let phase of seq) {
					if (!phase.start && seq.length > 1) phase.start = 0;
					await this._playPhase(phase);
				}
			} while (loop && count == this._aniChangeCount);
			if (seq.length != 1 && stopOnLastAni) this.ani.stop();
		}

		_playPhase(phase) {
			return new Promise((resolve) => {
				let { name, start, end, flipX, flipY } = phase;
				this._changeAni(name);

				let ani = this.ani;

				if (flipX) ani.scale.x = -ani.scale.x;
				if (flipY) ani.scale.y = -ani.scale.y;

				if (start < 0) start = ani.length + start;
				if (start !== undefined) ani._frame = start;

				if (end !== undefined) ani.goToFrame(end);
				else if (ani._frame == ani.lastFrame) resolve();

				ani._onComplete = ani._onChange = () => {
					if (flipX) ani.scale.x = -ani.scale.x;
					if (flipY) ani.scale.y = -ani.scale.y;
					ani._onComplete = ani._onChange = null;
					resolve();
				};
			});
		}

		_changeAni(label) {
			let ani = this._anis?.[label];
			if (!ani) {
				for (let g of this.groups || []) {
					ani = g._anis?.[label] || g._anis?.[label];
					if (ani) {
						ani = ani.clone();
						break;
					}
				}
				if (!ani) {
					console.error('Ani not found: ' + label);
					return;
				}
			}
			// reset to frame 0 of that animation
			if (this.resetAnimationsOnChange) ani._frame = 0;
			ani.name = label;
			this.ani = ani;
		}

		draw() {
			if (this.ani) $.animation(this.ani, this.x, this.y);
			else if (this._img) $.image(this._img, this.x, this.y);
		}
	};

	$.Sprite = class extends $.Visual {
		constructor(x, y, w, h, physicsType) {
			super(); // Call Visual constructor

			// using boolean flags is faster than instanceof checks
			this._isSprite = true;

			this.idNum; // not set until the input params are validated

			let args = [...arguments];

			let withSensor = false;
			if (args[0] == null) {
				withSensor = true;
				args.splice(0, 1);
			}

			let group, ani;

			// first arg was a group to add the sprite to
			// used internally by the group.Sprite class
			if (args[0] !== undefined && args[0]._isGroup) {
				group = args[0];
				args.splice(0, 1);
			}

			// first arg is a Ani, animation name, or Q5.Image
			if (
				args[0] !== undefined &&
				(typeof args[0] == 'string' || args[0] instanceof $.Ani || args[0] instanceof Q5.Image)
			) {
				ani = args[0];
				args.splice(0, 1);
			}

			// invalid
			if (args.length == 1 && typeof args[0] == 'number') {
				throw new FriendlyError('Sprite', 0, [args[0]]);
			}

			// last arg is collider type
			let lastArg = args.at(-1);
			if (typeof lastArg == 'string' && isPhysicsType(lastArg)) {
				physicsType = args.pop();
			} else physicsType = undefined;

			if (!Array.isArray(args[0])) {
				// valid use for creating a box collider:
				// new Sprite(x, y, w, h)
				x = args[0];
				y = args[1];
				w = args[2];
				h = args[3];
			} else {
				// valid use for creating chain/polygon using vertex mode:
				// new Sprite([[x1, y1], [x2, y2], ...])
				x = undefined;
				y = undefined;
				if (Array.isArray(args[1])) {
					throw new FriendlyError('Sprite', 1, [`[[${w}], [${h}]]`]);
				}
				this._vertexMode = true;
			}

			this.idNum = $.q5play.spritesCreated;
			this._uid = 1000 + this.idNum;
			$.q5play.sprites[this._uid] = this;
			$.q5play.spritesCreated++;

			this.groups = [];

			this.joints = [];
			this.joints.deleteAll = () => {
				while (this.joints.length) {
					this.joints.at(-1).delete();
				}
			};

			this.watch;
			this.mod = {};

			this._deleted = false;
			this._life = Infinity;
			this._visible = true;
			this._pixelPerfect = false;
			this._aniChangeCount = 0;

			// the relationship type this sprite has with other sprites
			// 0 = collides, 1 = passes, 2 = overlaps
			this._relation = {};

			this._collisions = {};
			this._overlappers = {};

			group ??= $.allSprites;

			this._tile = '';

			this._posX = x;
			this._posY = y;
			this._pos = $.createVector.call($);

			let _this = this;
			Object.defineProperties(this._pos, {
				x: {
					get() {
						return _this.x;
					},
					set(val) {
						_this.x = val;
					}
				},
				y: {
					get() {
						return _this.y;
					},
					set(val) {
						_this.x = val;
					}
				}
			});

			this._canvasPos = $.createVector.call($);

			Object.defineProperties(this._canvasPos, {
				x: {
					get() {
						let x = _this.x - $.camera.x;
						if ($._c2d) x += $.canvas.hw / $.camera._zoom;
						return x;
					}
				},
				y: {
					get() {
						let y = _this.y - $.camera.y;
						if ($._c2d) y += $.canvas.hh / $.camera._zoom;
						return y;
					}
				}
			});

			this._direction = 0;
			this._velX = 0;
			this._velY = 0;
			this._velSynced = true;
			this._vel = $.createVector.call($);
			this._vel._useCache = true;

			this._syncVel = () => {
				let v = b2Body_GetLinearVelocity(this.bdID);
				this._velX = v.x;
				this._velY = v.y;
				this._velSynced = true;
			};

			Object.defineProperties(this._vel, {
				x: {
					get() {
						if (!_this._velSynced && _this._physicsEnabled) {
							_this._syncVel();
						}
						return _this._velX;
					},
					set(val) {
						if (_this._physicsEnabled) {
							b2Body_SetLinearVelocity(_this.bdID, new b2Vec2(val, this.y));
						}
						_this._velX = val;
						this._magCached = this._directionCached = false;
					}
				},
				y: {
					get() {
						if (!_this._velSynced && _this._physicsEnabled) {
							_this._syncVel();
						}
						return _this._velY;
					},
					set(val) {
						if (_this._physicsEnabled) {
							b2Body_SetLinearVelocity(_this.bdID, new b2Vec2(this.x, val));
						}
						_this._velY = val;
						this._magCached = this._directionCached = false;
					}
				}
			});

			this._heading = 'right';

			if (group._layer) this.layer = group._layer;
			else this._layer = $.allSprites._topLayer += 1;

			physicsType ??= group.physics || group.physicsType || 0;
			this.physics = physicsType;

			if (!group.visualOnly) {
				const def = new b2DefaultBodyDef();
				def.type = bodyTypes[this._phys];
				this.bdID = b2CreateBody(wID, def);
				this._physicsEnabled = true;

				this._shapes = [];
				this.colliders = [];
				this.sensors = [];
				this._hasSensors = false;
			}

			x ??= group.x;
			if (x === undefined) {
				if ($._c2d) x = $.canvas.hw;
				else x = 0;
			}
			y ??= group.y;
			if (y === undefined) {
				if ($._c2d) y = $.canvas.hh;
				else y = 0;
			}

			let forcedBoxShape = false;
			if (w === undefined) {
				w = group.w || group.width || group.d || group.diameter;
				if (!h && !group.d && !group.diameter) {
					h = group.h || group.height;
					forcedBoxShape = true;
				}
			}

			if (typeof x == 'function') x = x(group.length);
			if (typeof y == 'function') y = y(group.length);
			if (typeof w == 'function') w = w(group.length);
			if (typeof h == 'function') h = h(group.length);

			this.pos = { x, y };

			if (!group._isAllSpritesGroup) {
				if (!ani) {
					for (let _ani in group._anis) {
						ani = _ani;
						break;
					}
					// Fallback to group image
					if (!ani) {
						ani = group._img;
						if (typeof ani == 'function') {
							ani = ani(group.length);
						}
						if (ani) this._img = true;
					}
				}
			} // temporarily add all the groups the sprite belongs to,
			// since the next section of code could potentially load an
			// animation from one of the sprite's groups
			for (let g = group; g; g = $.q5play.groups[g.parent]) {
				this.groups.push(g);
			}
			this.groups.reverse();

			if (ani) {
				this._hasImagery = true;

				if (this._img || ani instanceof Q5.Image) {
					if (typeof ani != 'string') this.image = ani;
					else this.image = new $.EmojiImage(ani, w);

					if (!w && (this._img.w != 1 || this._img.h != 1)) {
						w = this._img.defaultWidth || this._img.w;
						h ??= this._img.defaultHeight || this._img.h;
					}
				} else {
					if (typeof ani == 'string') this._changeAni(ani);
					else this.ani = ani.clone();

					if (!w && (this.ani.w != 1 || this.ani.h != 1)) {
						w = this.ani.defaultWidth || this.ani.w;
						h ??= this.ani.defaultHeight || this.ani.h;
					}
				}
			}

			// make groups list empty, the sprite will be "officially" added
			// to its groups after its collider is potentially created
			this.groups = [];

			this._rotation = 0;
			this._rotationSpeed = 0;
			this._bearing = 0;

			this._scale = new Scale();
			this._shouldScale = false;

			Object.defineProperty(this._scale, 'x', {
				get() {
					return this._x;
				},
				set(val) {
					if (val == this._x) return;
					if (_this.watch) _this.mod[26] = true;
					let scaleX = Math.abs(val / this._x);
					_this.scaleBy(scaleX, 1);
					this._x = val;
					this._avg = (this._x + this._y) * 0.5;
					_this._shouldScale = this._avg != 1;
				}
			});

			Object.defineProperty(this._scale, 'y', {
				get() {
					return this._y;
				},
				set(val) {
					if (val == this._y) return;
					if (_this.watch) _this.mod[26] = true;
					let scaleY = Math.abs(val / this._y);
					_this.scaleBy(1, scaleY);
					this._y = val;
					this._avg = (this._x + this._y) * 0.5;
					_this._shouldScale = this._avg != 1;
				}
			});

			this.fixedCenterOfMass = true;
			this._massUndef = true;
			if (w === undefined) {
				this._dimensionsUndef = true;
				this._widthUndef = true;
				w = 50;
				if (h === undefined) this._heightUndef = true;
			}

			if (forcedBoxShape) h ??= 50;

			if (!group.visualOnly) {
				if (!this._vertexMode) {
					args[0] = 0;
					args[1] = 0;
					args[2] = w;
					args[3] = h;
				}
				if (withSensor) this.addSensor(...args);
				else this.addCollider(...args);
			}

			this.prevPos = { x, y };
			this.prevRotation = 0;
			this._dest = { x, y };
			this._destIdx = 0;
			this._debug = false;

			this.text;

			if (!group._isAllSpritesGroup) $.allSprites.push(this);
			group.push(this);

			let gvx = group.vel.x || 0;
			let gvy = group.vel.y || 0;
			if (typeof gvx == 'function') gvx = gvx(group.length - 1);
			if (typeof gvy == 'function') gvy = gvy(group.length - 1);
			if (gvx || gvy) this.vel = { x: gvx, y: gvy };

			this.scale = { x: group._scale._x, y: group._scale._y };

			// inherit properties from group in the order they were added
			// skip props that were already set above
			for (let prop of spriteStdInheritedProps) {
				let val = group[prop];
				if (val === undefined) continue;
				if (typeof val == 'function' && isArrowFunction(val)) {
					val = val.call(this, group.length - 1);
				}
				if (typeof val == 'object') {
					if (val instanceof p5.Color) {
						// make a copy of the color
						this[prop] = $.color(val);
					} else {
						this[prop] = Object.assign({}, val);
					}
				} else {
					this[prop] = val;
				}
			}

			// add custom props
			for (let g of this.groups) {
				// Use cached customKeys if present; otherwise compute once and cache it.
				let keys = g.customKeys;

				if (!keys) {
					keys = [];
					for (let prop in g) {
						if (!Object.prototype.hasOwnProperty.call(g, prop)) continue;
						let c = prop.charCodeAt(0);
						// exclude numeric array indices, built-in group keys, and private internals
						if ((c >= 48 && c <= 57) || groupKeys[prop] || prop[0] == '_') {
							continue;
						}
						keys.push(prop);
					}
					g.customKeys = keys;
				}

				for (let prop of keys) {
					let val = g[prop];
					if (val === undefined) continue;
					if (typeof val == 'function' && isArrowFunction(val)) {
						val = val.call(this, g.length - 1);
					}
					if (typeof val == 'object') {
						this[prop] = Object.assign({}, val);
					} else {
						this[prop] = val;
					}
				}
			}

			{
				let r = $.random(0.12, 0.96);
				let g = $.random(0.12, 0.96);
				let b = $.random(0.12, 0.96);

				if ($._colorFormat != 1) {
					r *= 255;
					g *= 255;
					b *= 255;
				}

				// "random" color that's not too dark or too light
				this.color ??= $.color(r, g, b);
			}

			this._textFill ??= $.color(0);
			this._textSize ??= $.canvas ? $.textSize() : 12;
		}

		static withSensor(x, y, w, h, physicsType) {
			return new $.Sprite(null, ...arguments);
		}

		addCollider(offsetX, offsetY, w, h) {
			if (this._deleted) {
				console.error("Can't add colliders to a sprite that was deleted.");
				return;
			}

			if (this.watch) this.mod[19] = true;

			let center;
			if (this.fixedCenterOfMass) center = b2Body_GetLocalCenterOfMass(this.bdID);

			this._add(false, ...arguments);

			if (this.fixedCenterOfMass) this._fixCenterOfMass(center);
		}

		addSensor(offsetX, offsetY, w, h) {
			if (this._deleted) {
				console.error("Can't add sensors to a sprite that was deleted.");
				return;
			}

			let center;
			if (this.fixedCenterOfMass) center = b2Body_GetLocalCenterOfMass(this.bdID);

			this._add(true, ...arguments);

			if (this.fixedCenterOfMass) this._fixCenterOfMass(center);
		}

		_fixCenterOfMass(center) {
			const data = b2Body_GetMassData(this.bdID);
			data.center = center;
			b2Body_SetMassData(this.bdID, data);
		}

		// adds a collider or sensor to the sprite
		// composed of a single shape, several shapes, or a chain
		_add(isSensor, a0, a1, a2, a3, a4) {
			let offsetX, offsetY, w, h, path;
			let rr; // rounded radius
			let id, geom, vertexMode, originMode;
			let shapes = this._shapes;
			// Track how many shapes existed before
			let startingShapeCount = shapes.length;
			let bdID = this.bdID;

			let shape;
			if (isSensor) shape = new Sensor(this);
			else shape = new Collider(this);

			shape._isFirstShape = startingShapeCount === 0;
			shape._packData();

			if (a2 !== undefined) {
				offsetX = a0;
				offsetY = a1;
			} else {
				offsetX = 0;
				offsetY = 0;
				a2 = a0;
				a3 = a1;
				vertexMode = true;
			}

			if (typeof a3 == 'string') {
				path = getRegularPolygon(a2, a3);
				rr = a4;
			} else if (Array.isArray(a2)) {
				path = a2;
				rr = a3;
				if (Array.isArray(path[0])) originMode = 'start';
			} else {
				w = a2;
				h = a3;
				rr = a4;
			}
			rr ??= 0;

			// if (w is vertex array) or (side length and h is a
			// collider type or the name of a regular polygon)
			if (path) {
				let isPolygon = false;
				let vecs = [{ x: 0, y: 0 }];
				let vert = { x: 0, y: 0 };
				let min = { x: 0, y: 0 };
				let max = { x: 0, y: 0 };

				vecs.isLoop = false;

				// if the path is an array of position arrays
				let usesVertices = Array.isArray(path[0]);

				function checkVert() {
					if (vert.x < min.x) min.x = vert.x;
					if (vert.y < min.y) min.y = vert.y;
					if (vert.x > max.x) max.x = vert.x;
					if (vert.y > max.y) max.y = vert.y;
				}

				let x, y;
				if (usesVertices) {
					if (vertexMode) {
						x = path[0][0];
						y = path[0][1];
						// log(x, y);

						// TODO: implement this so that adding multiple colliders
						// to a sprite in vertex mode works correctly
						// if (!this.colliders.length || !this._relativeOrigin)
						this.x = x;
						this.y = y;
						// } else {
						// 	x = this.x - this._relativeOrigin.x;
						// 	y = this.y - this._relativeOrigin.y;
						// 	vecs.pop();
						// }
					}
					for (let i = 0; i < path.length; i++) {
						if (vertexMode) {
							if (i == 0 && !this.colliders.length) continue;
							// verts are relative to the first vert
							vert.x = path[i][0] - x;
							vert.y = path[i][1] - y;
						} else {
							vert.x += path[i][0];
							vert.y += path[i][1];
						}
						vecs.push({ x: vert.x, y: vert.y });

						checkVert();
					}
				} else {
					let rep = 1;
					if (path.length % 2) rep = path[path.length - 1];
					let mod = rep > 0 ? 1 : -1;
					rep = Math.abs(rep);
					let ang = 0;
					for (let i = 0; i < rep; i++) {
						for (let j = 0; j < path.length - 1; j += 2) {
							let len = path[j];
							ang += path[j + 1];
							vert.x += len * $.cos(ang);
							vert.y += len * $.sin(ang);
							vecs.push({ x: vert.x, y: vert.y });

							checkVert();
						}
						ang *= mod;
					}
				}

				let isConvex = false;
				if (
					isSlop(Math.abs(vecs[0].x) - Math.abs(vecs[vecs.length - 1].x)) &&
					isSlop(Math.abs(vecs[0].y) - Math.abs(vecs[vecs.length - 1].y))
				) {
					isPolygon = true;
					originMode = 'center';
					vecs.isLoop = true;
					if (this._isConvexPoly(vecs.slice(0, -1))) isConvex = true;
				}

				w = max.x - min.x;
				h = max.y - min.y;

				if (originMode == 'start') {
					for (let i = 0; i < vecs.length; i++) {
						vecs[i] = scaleTo(vecs[i].x, vecs[i].y);
					}
				} else {
					// the center relative to the first vertex
					let centerX = 0;
					let centerY = 0;
					// use centroid of a triangle method to get center
					// average of all vertices
					let sumX = 0;
					let sumY = 0;

					let vl = vecs.length;
					// last vertex is same as first
					if (isPolygon || isConvex) vl--;
					for (let i = 0; i < vl; i++) {
						sumX += vecs[i].x;
						sumY += vecs[i].y;
					}
					centerX = sumX / vl;
					centerY = sumY / vl;

					if (!this.colliders.length) {
						this._relativeOrigin = { x: centerX, y: centerY };
					}

					if (vertexMode && usesVertices) {
						// if (!this.colliders.length) {
						// repositions the sprite's x, y coordinates
						// to be in the center of the shape
						this.x += centerX;
						this.y += centerY;
						// } else {
						// 	centerX = this._relativeOrigin.x;
						// 	centerY = this._relativeOrigin.y;
						// }
					}

					for (let i = 0; i < vecs.length; i++) {
						let vec = vecs[i];
						vecs[i] = scaleTo(vec.x + offsetX - centerX, vec.y + offsetY - centerY);
					}
				}

				if (!isConvex || vecs.length - 1 > 8) {
					isPolygon = false;
				}

				if (isPolygon) {
					let hull = b2ComputeHull(vecs);
					geom = b2MakePolygon(hull, 0);

					id = b2CreatePolygonShape(bdID, shape.def, geom);
					shape._init(id, 1, geom);
				} else {
					if (vecs.length == 2) {
						if (!rr) {
							geom = new b2Segment();
							geom.point1 = vecs[0];
							geom.point2 = vecs[1];
							id = b2CreateSegmentShape(bdID, shape.def, geom);
							shape._init(id, 5, geom);
						} else {
							geom = new b2Capsule();
							geom.center1 = vecs[0];
							geom.center2 = vecs[1];
							geom.radius = rr / meterSize;
							id = b2CreateCapsuleShape(bdID, shape.def, geom);
							shape._init(id, 4, geom);
						}
					} else if (this._phys != 1) {
						// create several capsules to approximate a hollow shape (closed chain)
						for (let i = 1; i < vecs.length; i++) {
							geom = new b2Capsule();
							geom.center1 = vecs[i - 1];
							geom.center2 = vecs[i];
							geom.radius = 0.12;
							id = b2CreateCapsuleShape(bdID, shape.def, geom);
							let shapePart = new Collider(this);
							shape._init(id, 7, geom);
							shapes.push(shapePart);
							shapeDict[id.index1] = shapePart;
						}
						shape = null;
						this.isSuperFast = true;
					} else {
						let def = new b2DefaultChainDef();
						def.SetPoints([vecs[0], ...vecs, vecs.at(-1)]);
						def.isLoop = vecs.isLoop;
						def.SetMaterials([{ customColor: this._uid }]);

						id = b2CreateChain(bdID, def);
						shape._init(id, 6, geom);
					}
				}
			} else {
				w ??= 50;
				h ??= w;

				if (a3 === undefined) {
					geom = new b2Circle();
					geom.center = scaleTo(offsetX, offsetY);
					geom.radius = (w * 0.5) / meterSize;

					id = b2CreateCircleShape(bdID, shape.def, geom);
					shape._init(id, 3, geom);
				} else {
					let hw = (w * 0.5) / meterSize;
					let hh = (h * 0.5) / meterSize;
					rr /= meterSize;

					if (!rr) {
						hw = Math.max(hw - rr, 0.001);
						hh = Math.max(hh - rr, 0.001);
					}

					if (offsetX || offsetY) {
						let offset = scaleTo(offsetX, offsetY);

						if (!rr) geom = b2MakeOffsetBox(hw, hh, offset, ZERO_ROT);
						else {
							geom = b2MakeOffsetRoundedBox(hw, hh, offset, ZERO_ROT, rr);
						}
					} else {
						if (!rr) geom = b2MakeBox(hw, hh);
						else geom = b2MakeRoundedBox(hw, hh, rr);
					}

					geom._hw = hw;
					geom._hh = hh;
					geom._rr = rr;

					id = b2CreatePolygonShape(bdID, shape.def, geom);
					shape._init(id, 0, geom);
				}

				// TODO: use AABB to get extents for multiple shapes
				this._w = w;
				this._hw = w * 0.5;
				this._h = h;
				this._hh = h * 0.5;
			}

			if (shape) {
				shapes.push(shape);
				shapeDict[id.index1] = shape;
			}

			// Categorize all newly created shapes into colliders or sensors arrays
			for (let i = startingShapeCount; i < shapes.length; i++) {
				let newShape = shapes[i];
				if (newShape._isSensor) {
					this.sensors.push(newShape);
					this._hasSensors = true;
				} else {
					this.colliders.push(newShape);
				}
			}
		}

		deleteColliders() {
			while (this.colliders.length) {
				this.colliders.at(-1).delete();
			}
			this.mass = 0;
		}

		deleteSensors() {
			while (this.sensors.length) {
				this.sensors.at(-1).delete();
			}
			this._hasSensors = false;
		}

		/*
		 * Clones the collider's props to be transferred to a new collider.
		 */
		_cloneBodyProps() {
			let body = {};
			let props = [
				'bounciness',
				'density',
				'drag',
				'friction',
				'heading',
				'isSuperFast',
				'rotation',
				'rotationDrag',
				'rotationLock',
				'rotationSpeed',
				'scale',
				'vel',
				'x',
				'y'
			];
			// if mass or dimensions were defined by the user,
			// then the mass setting should be copied to the new body
			// else the new body's mass should be calculated based
			// on its dimensions
			if (!this._massUndef || !this._dimensionsUndef) {
				props.push('mass');
			}
			for (let prop of props) {
				if (typeof this[prop] == 'object') {
					body[prop] = Object.assign({}, this[prop]);
				} else {
					body[prop] = this[prop];
				}
			}
			return body;
		}

		get autoUpdate() {
			return this._autoUpdate;
		}
		set autoUpdate(val) {
			this._autoUpdate = val;
		}

		get autoDraw() {
			return this._autoDraw;
		}
		set autoDraw(val) {
			this._autoDraw = val;
		}

		get allowSleeping() {
			return b2Body_IsSleepEnabled(this.bdID);
		}
		set allowSleeping(val) {
			if (this.watch) this.mod[5] = true;
			b2Body_EnableSleep(this.bdID, val);
		}

		get bounciness() {
			if (!this.colliders.length) return 0;
			return this.colliders[0].bounciness;
		}
		set bounciness(val) {
			if (this.watch) this.mod[7] = true;
			for (let collider of this.colliders) {
				collider.bounciness = val;
			}
		}

		get physicsEnabled() {
			return this._physicsEnabled;
		}
		set physicsEnabled(val) {
			if (this.watch) this.mod[20] = true;
			if (val) b2Body_Enable(this.bdID);
			else b2Body_Disable(this.bdID);
			this._physicsEnabled = val;
		}

		get physicsType() {
			return this.physics;
		}
		set physicsType(val) {
			this.physics = val;
		}

		get physics() {
			return $.Sprite.types[this._phys];
		}
		set physics(val) {
			if (val == this._phys) return;

			if (typeof val == 'string') {
				val = val.toLowerCase();
				let c = val[0];
				if (c == 'd') val = 0;
				if (c == 's') val = 1;
				if (c == 'k') val = 2;
			}

			if (val == this._phys) return;

			if (this._deleted) {
				throw new Error('Cannot change the collider type of a sprite that was deleted.');
			}

			if (this.watch) this.mod[8] = true;

			if (this.bdID) b2Body_SetType(this.bdID, bodyTypes[val]);
			this._phys = val;
		}

		_parseColor(val) {
			// false if color was copied with Object.assign
			if (val instanceof p5.Color) {
				return val;
			} else if (typeof val != 'object' && val.length == 1) {
				return $.colorPal(val);
			}
			return $.color(val);
		}

		get color() {
			return this._color;
		}
		set color(val) {
			if (this.watch) this.mod[9] = true;
			this._color = this._parseColor(val);
		}

		get colour() {
			return this._color;
		}
		set colour(val) {
			this.color = val;
		}

		get fill() {
			return this._color;
		}
		set fill(val) {
			this.color = val;
		}

		get stroke() {
			return this._stroke;
		}
		set stroke(val) {
			if (this.watch) this.mod[29] = true;
			this._stroke = this._parseColor(val);
		}

		get strokeWeight() {
			return this._strokeWeight;
		}
		set strokeWeight(val) {
			if (this.watch) this.mod[30] = true;
			this._strokeWeight = val;

			const sw = val * meterSize,
				hsw = sw * 0.5,
				qsw = sw * 0.25,
				hswScaled = val * 0.5;
			this._strokeWeightData = [sw, hsw, qsw, hswScaled];
		}

		get textColor() {
			return this._textFill;
		}
		set textColor(val) {
			if (this.watch) this.mod[32] = true;
			this._textFill = this._parseColor(val);
		}
		get textColour() {
			return this._textFill;
		}
		set textColour(val) {
			this.textColor = val;
		}
		get textFill() {
			return this._textFill;
		}
		set textFill(val) {
			this.textColor = val;
		}

		get textStroke() {
			return this._textStroke;
		}
		set textStroke(val) {
			if (this.watch) this.mod[34] = true;
			this._textStroke = this._parseColor(val);
		}

		get textStrokeWeight() {
			return this._textStrokeWeight;
		}
		set textStrokeWeight(val) {
			if (this.watch) this.mod[35] = true;
			this._textStrokeWeight = val;
		}

		get textSize() {
			return this._textSize;
		}
		set textSize(val) {
			if (this.watch) this.mod[33] = true;
			this._textSize = val;
		}

		get tile() {
			return this._tile;
		}
		set tile(val) {
			if (this.watch) this.mod[36] = true;
			this._tile = val;
			tileDict[val] = this;
		}

		get bearing() {
			return this._bearing;
		}
		set bearing(val) {
			if (this.watch) this.mod[6] = true;
			this._bearing = val;
		}

		get debug() {
			return this._debug;
		}
		set debug(val) {
			if (this.watch) this.mod[10] = true;
			this._debug = val;
		}

		get deleted() {
			return this._deleted;
		}
		set deleted(val) {
			if (!val || this._deleted) return;
			if (this.watch) this.mod[23] = true;
			this._deleted = true;
			this._delete();
		}

		get density() {
			if (!this._shapes.length) return 1;
			return this._shapes[0].density;
		}
		set density(val) {
			if (this.watch) this.mod[11] = true;
			for (let shape of this._shapes) {
				shape.density = val;
			}
		}

		_getDirectionAngle(name) {
			name = name.toLowerCase().replaceAll(/[ _-]/g, '');
			let dirs = {
				up: -90,
				down: 90,
				left: 180,
				right: 0,
				upright: -45,
				rightup: -45,
				upleft: -135,
				leftup: -135,
				downright: 45,
				rightdown: 45,
				downleft: 135,
				leftdown: 135,
				forward: this.rotation,
				backward: this.rotation + 180
			};
			let val = dirs[name];
			if ($._angleMode == 'radians') val *= $._DEGTORAD;
			return val;
		}

		get direction() {
			return this._vel.direction();
		}
		set direction(val) {
			if (this.watch) this.mod[12] = true;
			if (typeof val == 'string') {
				this._heading = val;
				val = this._getDirectionAngle(val);
			}
			const speed = this._vel.mag();
			if (speed) {
				this._setVel($.cos(val) * speed, $.sin(val) * speed);
				this._vel._magCached = false;
			}
			this._vel._direction = val;
			this._vel._directionCached = true;
		}

		get drag() {
			return b2Body_GetLinearDamping(this.bdID);
		}
		set drag(val) {
			if (this.watch) this.mod[13] = true;
			b2Body_SetLinearDamping(this.bdID, val);
		}

		get draw() {
			return this._display;
		}
		set draw(val) {
			this._draw = val;
		}

		get friction() {
			if (!this.colliders.length) return 0.5;
			return this.colliders[0].friction;
		}
		set friction(val) {
			if (this.watch) this.mod[14] = true;
			for (let collider of this.colliders) {
				collider.friction = val;
			}
		}

		get heading() {
			return this._heading;
		}
		set heading(val) {
			this.direction = val;
		}

		get isMoving() {
			return this.vel.x != 0 || this.vel.y != 0;
		}

		get isSuperFast() {
			return b2Body_IsBullet(this.bdID);
		}
		set isSuperFast(val) {
			if (this.watch) this.mod[16] = true;
			b2Body_SetBullet(this.bdID, val);
		}

		get layer() {
			return this._layer;
		}
		set layer(val) {
			if (this.watch) this.mod[17] = true;
			this._layer = val;

			if (val > $.allSprites._topLayer) {
				$.allSprites._topLayer = val;
			}
		}

		get life() {
			return this._life;
		}
		set life(val) {
			if (this.watch) this.mod[18] = true;
			this._life = val;
		}

		get mass() {
			return b2Body_GetMass(this.bdID);
		}
		set mass(val) {
			if (this.watch) this.mod[19] = true;
			const data = b2Body_GetMassData(this.bdID);
			data.mass = val > 0 ? val : 0.00000001;
			b2Body_SetMassData(this.bdID, data);
			delete this._massUndef;
		}

		resetMass() {
			if (this.watch) this.mod[19] = true;
			const center = b2Body_GetLocalCenterOfMass(this.bdID);
			b2Body_ApplyMassFromShapes(this.bdID);

			const data = b2Body_GetMassData(this.bdID);
			data.center = center;
			b2Body_SetMassData(this.bdID, data);
		}

		get centerOfMass() {
			const data = b2Body_GetMassData(this.bdID);
			return data.center;
		}
		set centerOfMass(val) {
			const data = b2Body_GetMassData(this.bdID);
			data.center = scaleTo(val[0] ?? val.x, val[1] ?? val.y);
			b2Body_SetMassData(this.bdID, data);
		}

		get opacity() {
			return this._opacity ?? 1;
		}
		set opacity(val) {
			if (this.watch) this.mod[41] = true;
			this._opacity = val;
		}

		get previousPosition() {
			return this.prevPos;
		}
		set previousPosition(val) {
			this.prevPos = val;
		}

		get previousRotation() {
			return this.prevRotation;
		}
		set previousRotation(val) {
			this.prevRotation = val;
		}

		get pixelPerfect() {
			return this._pixelPerfect;
		}
		set pixelPerfect(val) {
			if (this.watch) this.mod[22] = true;
			this._pixelPerfect = val;
		}

		get rollingResistance() {
			if (!this.colliders.length) return 0;
			return this.colliders[0].rollingResistance;
		}
		set rollingResistance(val) {
			if (this.watch) this.mod[43] = true;
			for (let collider of this.colliders) {
				collider.rollingResistance = val;
			}
		}

		get rotation() {
			if (!this._physicsEnabled || !usePhysics) return this._rotation || 0;
			let val = b2Body_GetRotation(this.bdID).GetAngle();
			if (friendlyRounding) val = fixRoundAngular(val);
			return $._angleMode == DEGREES ? $.degrees(val) : val;
		}
		set rotation(val) {
			this._rotation = val;

			if (this._physicsEnabled) {
				if ($._angleMode == DEGREES) val = (val % 360) * $._DEGTORAD;
				b2Body_SetTransform(this.bdID, b2Body_GetPosition(this.bdID), b2MakeRot(val));
			}
		}

		get rotationDrag() {
			return b2Body_GetAngularDamping(this.bdID);
		}
		set rotationDrag(val) {
			if (this.watch) this.mod[24] = true;
			b2Body_SetAngularDamping(this.bdID, val);
		}

		get rotationLock() {
			return this._rotationLock;
		}
		set rotationLock(val) {
			if (this.watch) this.mod[25] = true;

			// let mass = this.mass;

			// TODO: not working, shape is ignored by physics sim after this
			let locks = new b2MotionLocks();
			locks.linearX = false;
			locks.linearY = false;
			locks.angularZ = val;
			b2Body_SetMotionLocks(this.bdID, locks);

			// this.mass = mass;
		}

		get rotationSpeed() {
			if (this._physicsEnabled) {
				let val = b2Body_GetAngularVelocity(this.bdID) / 60;
				return $._angleMode == DEGREES ? $.degrees(val) : val;
			}
			return this._rotationSpeed;
		}
		set rotationSpeed(val) {
			if (this._physicsEnabled) {
				val *= 60;
				if ($._angleMode == DEGREES) val *= $._DEGTORAD;
				b2Body_SetAngularVelocity(this.bdID, val);
			} else this._rotationSpeed = val;
		}

		scaleBy(x, y) {
			if (y === undefined) y = x;

			for (let shape of this._shapes) {
				shape.scaleBy(x, y);
			}

			this._w *= x;
			this._hw *= x;
			if (this._h) {
				this._h *= y;
				this._hh *= y;
			}
		}

		get scale() {
			return this._scale;
		}
		set scale(val) {
			let sc = this._scale;

			let x, y;

			if (typeof val == 'number') {
				x = val || 0.01;
				y = val || 0.01;
			} else {
				x = val.x ?? val[0] ?? sc._x;
				y = val.y ?? val[1] ?? sc._y;
			}

			if (x == sc._x && y == sc._y) return;

			if (this.watch) this.mod[26] = true;

			let scaleX = Math.abs(x / sc._x);
			let scaleY = Math.abs(y / sc._y);

			this.scaleBy(scaleX, scaleY);

			sc._x = x;
			sc._y = y;
			sc._avg = (x + y) * 0.5;
			this._shouldScale = sc._avg != 1;
		}

		get sleeping() {
			return !b2Body_IsAwake(this.bdID);
		}
		set sleeping(val) {
			if (this.watch) this.mod[28] = true;
			b2Body_SetAwake(this.bdID, !val);
		}

		get sleepThreshold() {
			return b2Body_GetSleepThreshold(wID);
		}
		set sleepThreshold(val) {
			b2Body_SetSleepThreshold(wID, val);
		}

		get speed() {
			return this._vel.mag();
		}
		set speed(val) {
			if (!val) this._setVel(0, 0);
			else {
				const mag = this._vel.mag();
				if (mag > 0) {
					this._setVel((this._vel.x / mag) * val, (this._vel.y / mag) * val);
				} else {
					const dir = this._vel.direction();
					this._setVel($.cos(dir) * val, $.sin(dir) * val);
				}
			}
			this._vel._mag = val;
			this._vel._magCached = true;
		}

		setSpeedAndDirection(speed, direction) {
			this._setVel($.cos(direction) * speed, $.sin(direction) * speed);
			this._vel._mag = speed;
			this._vel._direction = direction;
			this._vel._magCached = this._vel._directionCached = true;
		}

		get surfaceSpeed() {
			if (!this.colliders.length) return 0;
			return this.colliders[0].surfaceSpeed;
		}
		set surfaceSpeed(val) {
			if (this.watch) this.mod[21] = true;
			for (let collider of this.colliders) {
				collider.surfaceSpeed = val;
			}
		}

		get tint() {
			return this._tint;
		}
		set tint(val) {
			if (this.watch) this.mod[38] = true;
			this._tint = this._parseColor(val);
		}

		get tintColor() {
			return this._tint;
		}
		set tintColor(val) {
			this.tint = val;
		}

		get visible() {
			return this._visible;
		}
		set visible(val) {
			if (this.watch) this.mod[39] = true;
			this._visible = val;
		}

		get x() {
			// let val = this._posX : b2Body_GetPosition(this.bdID).x;
			let val = this._posX;
			return friendlyRounding ? fixRound(val) : val;
		}
		set x(val) {
			this._posX = val;

			if (this._physicsEnabled) {
				let pos = scaleTo(val, this.y);
				b2Body_SetTransform(this.bdID, pos, b2Body_GetRotation(this.bdID));
			}
		}

		get y() {
			let val = this._posY;
			return friendlyRounding ? fixRound(val) : val;
		}
		set y(val) {
			this._posY = val;

			if (this._physicsEnabled) {
				let pos = scaleTo(this.x, val);
				b2Body_SetTransform(this.bdID, pos, b2Body_GetRotation(this.bdID));
			}
		}

		get pos() {
			return this._pos;
		}
		set pos(val) {
			if (this._physicsEnabled) {
				b2Body_SetTransform(this.bdID, scaleTo(val.x, val.y), b2Body_GetRotation(this.bdID));
			}
			this._posX = val[0] ?? val.x;
			this._posY = val[1] ?? val.y;
		}

		get position() {
			return this._pos;
		}
		set position(val) {
			this.pos = val;
		}

		get canvasPos() {
			return this._canvasPos;
		}

		get w() {
			return this._w;
		}
		set w(val) {
			if (val < 0) val = 0.01;
			if (val == this._w) return;
			if (this.watch) this.mod[40] = true;

			this.scaleBy(val / this._w, 1);
			delete this._widthUndef;
			delete this._dimensionsUndef;
		}

		get hw() {
			return this._hw;
		}
		set hw(val) {
			throw new FriendlyError('Sprite.hw');
		}

		get width() {
			return this._w;
		}
		set width(val) {
			this.w = val;
		}

		get halfWidth() {
			return this.hw;
		}
		set halfWidth(val) {
			throw new FriendlyError('Sprite.hw');
		}

		get h() {
			return this._h || this._w;
		}
		set h(val) {
			if (val < 0) val = 0.01;
			if (val == this._h) return;
			if (this.watch) this.mod[15] = true;
			this.scaleBy(1, val / this._h);
			delete this._heightUndef;
			delete this._dimensionsUndef;
		}

		get hh() {
			return this._hh || this._hw;
		}
		set hh(val) {
			throw new FriendlyError('Sprite.hh');
		}

		get height() {
			return this.h;
		}
		set height(val) {
			this.h = val;
		}

		get halfHeight() {
			return this.hh;
		}
		set halfHeight(val) {
			throw new FriendlyError('Sprite.hh');
		}

		get d() {
			return this._w;
		}
		set d(val) {
			if (val < 0) val = 0.01;
			if (this._w == val) return;

			if (this.watch) this.mod[40] = true;

			if (this._dimensionsUndef) {
				// TODO change this
				for (let shape of this._shapes) b2DestroyShape(shape.id, false);
				this._add(false, 0, 0, val);
				this._dimensionsUndef = false;
				this._w = val;
				this._hw = val * 0.5;
			} else {
				this.scaleBy(val / this._w);
			}
		}

		get diameter() {
			return this._w;
		}
		set diameter(val) {
			this.d = val;
		}

		get r() {
			return this._hw;
		}
		set r(val) {
			this.d = val * 2;
		}

		get radius() {
			return this._hw;
		}
		set radius(val) {
			this.d = val * 2;
		}

		/*
		 * Validates convexity.
		 */
		_isConvexPoly(vecs) {
			loopk: for (let k = 0; k < 2; k++) {
				if (k == 1) vecs = vecs.reverse();
				for (let i = 0; i < vecs.length; ++i) {
					const i1 = i;
					const i2 = i < vecs.length - 1 ? i1 + 1 : 0;
					const p = vecs[i1];
					const e = { x: vecs[i2].x - p.x, y: vecs[i2].y - p.y };

					for (let j = 0; j < vecs.length; ++j) {
						if (j == i1 || j == i2) {
							continue;
						}

						const v = { x: vecs[j].x - p.x, y: vecs[j].y - p.y };
						const c = e.x * v.y - e.y * v.x;
						if (c < 0.0) {
							if (k == 0) continue loopk;
							else return false;
						}
					}
				}
				break;
			}
			return true;
		}

		get update() {
			return this._update;
		}
		set update(val) {
			this._customUpdate = val;
		}

		get postDraw() {
			return this._postDraw;
		}
		set postDraw(val) {
			this._customPostDraw = val;
		}

		get vel() {
			return this._vel;
		}
		set vel(val) {
			this._setVel(val[0] ?? val.x, val[1] ?? val.y);
			this._vel._magCached = this._vel._directionCached = false;
		}

		_setVel(x, y) {
			if (this._physicsEnabled) {
				b2Body_SetLinearVelocity(this.bdID, new b2Vec2(x, y));
			}
			this._velX = x;
			this._velY = y;
			this._velSynced = true;
		}

		get velocity() {
			return this._vel;
		}
		set velocity(val) {
			this.vel = val;
		}

		get gravityScale() {
			return b2Body_GetGravityScale(this.bdID);
		}
		set gravityScale(val) {
			if (this.watch) this.mod[42] = true;
			b2Body_SetGravityScale(this.bdID, val);
		}

		_update() {
			if (this._customUpdate) this._customUpdate();
			if (this.autoUpdate) this.autoUpdate = null;
		}

		_step() {
			this.life -= timeScale;
			if (this._life <= 0) {
				this.delete();
			} else if (!this._physicsEnabled || !usePhysics) {
				this._posX += this._velX * timeScale;
				this._posY += this._velY * timeScale;
				this._rotation += this._rotationSpeed * timeScale;
			}

			if (this.watch) {
				if (this._posX != this.prevX) this.mod[0] = this.mod[2] = true;
				if (this._posY != this.prevY) this.mod[1] = this.mod[2] = true;
				if (this.rotation != this.prevRotation) {
					this.mod[3] = this.mod[4] = true;
				}
			}

			if (!this._physicsEnabled && !this._deleted) return;

			this.__step();
		}

		//      a -> b
		// sprite -> sprite
		// sprite -> group
		//  group -> group
		__step() {
			// for each type of collision and overlap event
			const a = this;
			let b;
			for (const event in eventTypes) {
				const ledgerA = a[event];
				for (const k in ledgerA) {
					if (k >= 1000) {
						// if a is group or a is sprite and a._uid >= k
						if (a._isGroup || a._uid >= k) continue;
						b = $.q5play.sprites[k];
					} else {
						// if a is group and a._uid >= k
						if (a._isGroup && a._uid >= k) continue;
						b = $.q5play.groups[k];
					}

					const ledgerB = b[event];

					const v = ledgerA[k] + 1;
					if (!b || v == 0 || v == -2) {
						delete ledgerA[k];
						if (b) delete ledgerB[a._uid];
						continue;
					}
					ledgerA[k] = v;
					ledgerB[a._uid] = v;
				}
			}
		}

		___step() {
			const a = this;
			let b, contactType, checkOverlaps, cb;
			let checkCollisions = true;
			for (const event in eventTypes) {
				const ledgerA = a[event];
				for (const k in ledgerA) {
					if (k >= 1000) {
						if (a._isGroup || a._uid >= k) continue;
						b = $.q5play.sprites[k];
					} else {
						if (a._isGroup && a._uid >= k) continue;
						b = $.q5play.groups[k];
					}

					// contact callbacks can only be called between sprites
					if (a._isGroup || b?._isGroup) continue;

					// is there even a chance that a contact callback exists?
					checkOverlaps = a._relation[b._uid] == 2 || b._relation[a._uid] == 2;
					if ((checkCollisions && checkOverlaps !== false) || (!checkCollisions && checkOverlaps !== true)) {
						continue;
					}

					const v = ledgerA[k];
					for (let i = 0; i < 3; i++) {
						if (i == 0 && v != 1 && v != -3) continue;
						if (i == 1 && v == -1) continue;
						if (i == 2 && v >= 1) continue;
						contactType = eventTypes[event][i];

						const ledger = $.q5play[contactType];

						const la = ledger[a._uid];
						if (la) {
							cb = la[b._uid];
							if (cb) cb.call(a, a, b, v);
							for (const g of b.groups) {
								cb = la[g._uid];
								if (cb) cb.call(a, a, b, v);
							}
						}

						const lb = ledger[b._uid];
						if (lb) {
							cb = lb[a._uid];
							if (cb) cb.call(b, b, a, v);
							for (const g of a.groups) {
								cb = lb[g._uid];
								if (cb && (!la || cb != la[g._uid])) {
									cb.call(b, b, a, v);
								}
							}
						}
					}
				}
				checkCollisions = false;
			}

			// all of q5play's references to a deleted sprite can be deleted
			// only if the sprite was not colliding or overlapping with
			// anything or its last collided and overlapped events were handled
			if (this._deleted) {
				if (Object.keys(this._collisions).length == 0 && Object.keys(this._overlappers).length == 0) {
					if (this._isSprite) delete $.q5play.sprites[this._uid];
					else if (!$.q5play.storeDeletedGroupRefs) delete $.q5play.groups[this._uid];

					// remove contact events
					for (let eventType in eventTypes) {
						for (let contactType of eventTypes[eventType]) {
							delete $.q5play[contactType][this._uid];
						}
					}
				}
			}
		}

		/*
		 * Applies translation, rotation, and scaling
		 * before the sprite's `draw` function is called.
		 */
		_display() {
			for (let j of this.joints) {
				if (!j.visible) {
					j.visible ??= true;
					continue;
				}
				if (this._uid == j.spriteA._uid) {
					if (!j.spriteB._visible || this.layer <= j.spriteB.layer) {
						j._display();
					}
				} else if (!j.spriteA._visible || this.layer < j.spriteA.layer) {
					j._display();
				}
			}

			if (!this._hasImagery) return;

			let x = this._posX,
				y = this._posY;

			if (this._pixelPerfect) {
				let w, h;
				if (this.ani?.length) {
					w = this.ani[this.ani._frame].w;
					h = this.ani[this.ani._frame].h;
				} else if (this._img) {
					w = this._img._w;
					h = this._img._h;
				} else {
					return;
				}
				if (w % 2 == 0) x = Math.round(x);
				else x = Math.round(x - 0.5) + 0.5;
				if (h % 2 == 0) y = Math.round(y);
				else y = Math.round(y - 0.5) + 0.5;
			}

			if (this._opacity == 0) return;

			if (cameraOn) $.pushMatrix();

			$.translate(x, y);

			let rot = this._rotation;
			if (rot) {
				$.rotate(rot);
			}

			if (this._shouldScale) {
				$.scale(this._scale._x, this._scale._y);
			}

			if (this._tint) $.tint(this._tint);
			if (this._opacity) $.opacity(this._opacity);

			this._draw();

			if (cameraOn) $.popMatrix();
			else $.resetMatrix();

			if (this._tint) $.noTint();
			if (this._opacity) $.opacity(1);

			this._cameraActiveWhenDrawn = cameraOn;
			if (!$.camera.isActive) $.camera._wasOff = true;

			this._visible = true;
			$.q5play.spritesDrawn++;
			if (this.autoDraw) this.autoDraw = null;
		}

		// default draw
		_draw() {
			let g = this.ani || this._img;

			let shouldScale = g._scale._avg != 1;

			if (shouldScale) $.scale(g._scale._x, g._scale._y);

			let ox = g.offset.x;
			let oy = g.offset.y;

			if (this.ani) $.animation(g, ox, oy);
			else $.image(g, ox, oy);
		}

		_postDraw() {
			for (let prop in this.mouse) {
				if (this.mouse[prop] == -1) this.mouse[prop] = 0;
			}

			if (this._customPostDraw) this._customPostDraw();

			this.autoDraw ??= true;
			this.autoUpdate ??= true;
		}

		_args2Vec(x, y) {
			if (Array.isArray(x)) {
				return { x: x[0], y: x[1] };
			} else if (typeof x == 'object') {
				y = x.y;
				x = x.x;
			}
			return { x: x || 0, y: y || 0 };
		}

		_parseForceArgs() {
			let args = arguments;
			if (typeof args[0] == 'number' && (args.length == 1 || typeof args[1] != 'number')) {
				args[3] = args[2];
				args[2] = args[1];
				args[1] = $.sin(this._bearing) * args[0];
				args[0] = $.cos(this._bearing) * args[0];
			} else if (args.length == 2 && typeof args[1] != 'number') {
				args[2] = args[1];
				args[1] = undefined;
			}
			let o = {};
			o.forceVector = new b2Vec2(args[0], args[1]);
			if (args[2] !== undefined) {
				o.poa = this._args2Vec(args[2], args[3]);
				o.poa = scaleTo(o.poa.x, o.poa.y);
			}
			return o;
		}

		applyForce(amount, origin) {
			let { forceVector, poa } = this._parseForceArgs(...arguments);
			if (!poa) b2Body_ApplyForceToCenter(this.bdID, forceVector, true);
			else b2Body_ApplyForce(this.bdID, forceVector, poa, true);
		}

		// TODO applyForceScaled possible in Box2D v3?

		attractTo(x, y, force, radius, easing) {
			if (this._phys != 0) {
				console.error('attractTo can only be used on sprites with dynamic physics bodies');
				return;
			}
			if (typeof x != 'number') {
				let obj = x;
				if (!obj || (obj == $.mouse && !$.mouse.isActive)) return;
				force = y;
				y = obj.y;
				x = obj.x;
			}
			if (this.x == x && this.y == y) return;

			let a = y - this.y;
			let b = x - this.x;
			let c = Math.sqrt(a * a + b * b);

			let percent = force / c;

			let forceVector = new b2Vec2(b * percent, a * percent);
			b2Body_ApplyForceToCenter(this.bdID, forceVector, true);
		}

		repelFrom(x, y, force, radius, easing) {
			if (this._phys != 0) {
				console.error('repelFrom can only be used on sprites with dynamic colliders');
				return;
			}
			if (typeof x != 'number') {
				let obj = x;
				if (!obj || (obj == $.mouse && !$.mouse.isActive)) return;
				force = y;
				y = obj.y;
				x = obj.x;
			}
			this.attractTo(x, y, -force, radius, easing);
		}

		applyTorque(val) {
			b2Body_ApplyTorque(this.bdID, val, true);
		}

		angleTo(x, y) {
			if (typeof x == 'object') {
				let obj = x;
				if (obj == $.mouse && !$.mouse.isActive) return 0;
				if (obj.x === undefined || obj.y === undefined) {
					console.error(
						'sprite.angleTo ERROR: rotation destination not defined, object given with no x or y properties'
					);
					return 0;
				}
				y = obj.y;
				x = obj.x;
			}
			return $.atan2(y - this.y, x - this.x);
		}

		rotationToFace(x, y, facing) {
			if (typeof x == 'object') {
				facing = y;
				y = x.y;
				x = x.x;
			}
			// if the sprite is too close to the position, don't rotate
			if (Math.abs(x - this.x) < 0.01 && Math.abs(y - this.y) < 0.01) {
				return 0;
			}
			return this.angleTo(x, y) + (facing || 0);
		}

		angleToFace(x, y, facing) {
			let ang = this.rotationToFace(x, y, facing);
			return minAngleDist(ang, this._rotation);
		}

		moveTowards(x, y, tracking) {
			if (x === undefined) return;

			if (typeof x != 'number' && x !== null) {
				let pos = x;
				if (pos == $.mouse && !$.mouse.isActive) return;
				tracking = y;
				y = pos[0] ?? pos.y;
				x = pos[1] ?? pos.x;
			}
			tracking ??= 0.1;

			let velX, velY;

			if (x !== null) {
				let diffX = x - this.x;
				if (!isSlop(diffX)) {
					velX = diffX * tracking;
				} else velX = 0;
			} else velX = this._velX;
			if (y !== null) {
				let diffY = y - this.y;
				if (!isSlop(diffY)) {
					velY = diffY * tracking;
				} else velY = 0;
			} else velY = this._velY;

			if (velX || velY) {
				this._setVel(velX, velY);
			}
		}

		_setTargetTransform(x, y, rotation) {
			let t = new b2Transform();
			t.p = scaleTo(x, y);
			t.q = b2MakeRot(rotation);
			b2Body_SetTargetTransform(this.bdID, t, $.world._timeStep);
		}

		delete() {
			this.deleted = true;
		}

		_delete() {
			b2DestroyBody(this.bdID);

			// when deleted from the world also remove all the sprite
			// from all its groups
			for (let g of this.groups) {
				g.remove(this);
			}
		}

		toString() {
			return 's' + this.idNum;
		}

		_setContactCB(target, cb, contactType, eventType) {
			let type;
			if (contactType == 0) type = eventTypes._collisions[eventType];
			else type = eventTypes._overlappers[eventType];

			let ledger = $.q5play[type];

			let l = (ledger[this._uid] ??= {});

			if (l[target._uid] == cb) return;
			l[target._uid] = cb;

			l = ledger[target._uid];
			if (!l || !l[this._uid]) return;
			delete l[this._uid];
			if (Object.keys(l).length == 0) {
				delete ledger[target._uid];
			}
		}

		_validateCollideParams(target, cb) {
			if (!target) {
				throw new FriendlyError('Sprite.collide', 2);
			}
			if (!target._isSprite && !target._isGroup) {
				throw new FriendlyError('Sprite.collide', 0, [target]);
			}
			if (cb && typeof cb != 'function') {
				throw new FriendlyError('Sprite.collide', 1, [cb]);
			}
		}

		/**
		 * What should happen when this sprite
		 * contacts the target sprite/group?
		 * @param r the relationship value:
		 * - collide is 0 or undefined (default)
		 * - pass is 1
		 * - overlap is 2
		 */
		_ensureContactRelationship(target, r) {
			if (this._relation[target._uid] !== r) {
				this._relation[target._uid] = r;
			}
			if (target._relation[this._uid] !== r) {
				target._relation[this._uid] = r;
				if (target._isGroup) {
					for (let s of target) {
						s._relation[this._uid] = r;
						this._relation[s._uid] = r;
					}
				}
			}
		}

		_ensureCollide(target) {
			this._ensureContactRelationship(target, 0);

			if (!this._areContactEventsEnabled) {
				for (let collider of this.colliders) {
					collider._enableContactEvents();
				}
			}
			if (!target._areContactEventsEnabled) {
				if (target._isGroup) {
					for (let s of target) {
						for (let collider of s.colliders) {
							collider._enableContactEvents();
						}
					}
				} else {
					for (let collider of target.colliders) {
						collider._enableContactEvents();
					}
				}
			}
		}

		collide(target, callback) {
			return this.collides(target, callback);
		}

		collides(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 0);
			return this._collisions[target._uid] == 1 || this._collisions[target._uid] <= -3;
		}

		colliding(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 1);
			let val = this._collisions[target._uid];
			if (val <= -3) return 1;
			return val > 0 ? val : 0;
		}

		collided(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 2);
			return this._collisions[target._uid] <= -1;
		}

		_validateOverlapParams(target, cb) {
			if (!target) {
				throw new FriendlyError('Sprite.overlap', 2);
			}
			if (!target._isSprite && !target._isGroup) {
				throw new FriendlyError('Sprite.overlap', 0, [target]);
			}
			if (cb && typeof cb != 'function') {
				throw new FriendlyError('Sprite.overlap', 1, [cb]);
			}
		}

		pass(target) {
			this._ensureContactRelationship(target, 1);
		}

		passes(target) {
			this._ensureContactRelationship(target, 1);
		}

		_ensureOverlap(target) {
			this._ensureContactRelationship(target, 2);

			if (!this._hasSensors) this.addDefaultSensors();

			if (!target._hasSensors) {
				if (target._isSprite) {
					target.addDefaultSensors();
				} else {
					for (let s of target) {
						if (!s._hasSensors) s.addDefaultSensors();
					}
					target._hasSensors = true;
				}
			}
		}

		overlap(target, callback) {
			return this.overlaps(target, callback);
		}

		overlaps(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 0);
			return this._overlappers[target._uid] == 1 || this._overlappers[target._uid] <= -3;
		}

		overlapping(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 1);
			let val = this._overlappers[target._uid];
			if (val <= -3) return 1;
			return val > 0 ? val : 0;
		}

		overlapped(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 2);
			return this._overlappers[target._uid] <= -1;
		}

		addDefaultSensors() {
			if (this.colliders.length == 0) return this.addSensor(0, 0, 50, 50);

			let bdID = this.bdID;
			for (let collider of this.colliders) {
				let shape = new Sensor(this);
				shape._packData();

				let type = collider.type,
					geom = collider.geom,
					id;
				if (type == 0) {
					id = b2CreatePolygonShape(bdID, shape.def, geom);
					shape._init(id, 0, geom);
				} else if (type == 3) {
					id = b2CreateCircleShape(bdID, shape.def, geom);
					shape._init(id, 3, geom);
				}

				this._shapes.push(shape);
				this.sensors.push(shape);
				shapeDict[id.index1] = shape;
			}
			this._hasSensors = true;
		}

		distanceTo(o) {
			return $.dist(this.x, this.y, o.x, o.y);
		}
	};

	// only used by the q5play-pro Netcode class to convert sprite data to binary
	$.Sprite.propTypes = {
		x: 'Float64', // 0
		y: 'Float64', // 1
		vel: 'Vec2', // 2
		rotation: 'number', // 3
		rotationSpeed: 'number', // 4
		allowSleeping: 'boolean', // 5
		bearing: 'number', // 6
		bounciness: 'number', // 7
		type: 'Uint8', // 8
		color: 'color', // 9
		debug: 'boolean', // 10
		density: 'number', // 11
		direction: 'number', // 12
		drag: 'number', // 13
		friction: 'number', // 14
		h: 'number', // 15 (height)
		isSuperFast: 'boolean', // 16
		layer: 'number', // 17
		life: 'Int32', // 18
		mass: 'number', // 19
		physicsEnabled: 'boolean', // 20
		surfaceSpeed: 'number', // 21
		pixelPerfect: 'boolean', // 22
		deleted: 'boolean', // 23
		rotationDrag: 'number', // 24
		rotationLock: 'boolean', // 25
		scale: 'Vec2', // 26
		shape: 'Uint8', // 27
		sleeping: 'boolean', // 28
		stroke: 'color', // 29
		strokeWeight: 'number', // 30
		text: 'string', // 31
		textColor: 'color', // 32
		textSize: 'number', // 33
		textStroke: 'color', // 34
		textStrokeWeight: 'number', // 35
		tile: 'string', // 36
		tileSize: 'number', // 37
		tint: 'color', // 38
		visible: 'boolean', // 39
		w: 'number', // 40 (width)
		opacity: 'number', // 41
		gravityScale: 'number', // 42
		rollingResistance: 'number' // 43
	};

	$.Sprite.props = Object.keys($.Sprite.propTypes);

	// includes duplicates of some properties
	$.Sprite.propsAll = $.Sprite.props.concat([
		'autoDraw',
		'autoUpdate',
		'colour',
		'd',
		'diameter',
		'fill',
		'height',
		'heading',
		'resetAnimationsOnChange',
		'speed',
		'spriteSheet',
		'textColour',
		'textFill',
		'width'
	]);

	$.Sprite.types = [$.DYN, $.STA, $.KIN];

	// exclude props that are inherited in a special way or not traits
	const spriteStdInheritedProps = $.Sprite.props.filter(
		(p) => !['ani', 'tile', 'h', 'physics', 'scale', 'w', 'vel', 'x', 'y'].includes(p)
	);

	let groupKeys = {};

	{
		const props = $.Sprite.propsAll.concat([
			'add',
			'ani',
			'anis',
			'autoCull',
			'contains',
			'Group',
			'idNum',
			'length',
			'mod',
			'mouse',
			'p',
			'parent',
			'Sprite',
			'subgroups',
			'velocity'
		]);

		for (let prop of props) {
			groupKeys[prop] = true;
		}
	}

	$.Ani = class extends Array {
		constructor() {
			super();
			this._isAni = true;

			let args = [...arguments];

			let owner;

			if (
				typeof args[0] == 'object' &&
				(args[0]._isVisual || args[0]._isSprite || args[0]._isVisuals || args[0]._isGroup)
			) {
				owner = args[0];
				args = args.slice(1);
				this._addedToSpriteOrGroup = true;
			}
			owner ??= $.allSprites;

			let anis = owner._anis;

			if (!anis && owner._isSprite) {
				anis = owner.groups[0]._anis;
			}

			if (typeof args[0] == 'string' && (args[0].length == 1 || !args[0].includes('.'))) {
				this.name = args[0];
				args = args.slice(1);
			} else {
				this.name = 'default';
			}

			// loading promise
			this.promise = new Promise((resolve) => {
				this._resolve = resolve;
			});

			this._frame = 0;
			this._cycles = 0;
			this.targetFrame = -1;
			this._scale = new Scale();
			this.offset = { x: anis?.offset._x ?? 0, y: anis?.offset._y ?? 0 };
			this.rotationLock = anis?.rotationLock ?? false;
			this.frameDelay = anis?.frameDelay || 4;
			this.looping = anis?.looping ?? true;
			this.frameChanged = false;
			this.endOnFirstFrame = anis?.endOnFirstFrame ?? false;

			this._spriteSheetDemo = anis?._spriteSheetDemo ?? false;
			this._onComplete = this._onChange = null;

			if (!args.length) return;

			// list mode images can be added as a list of arguments or an array
			if (Array.isArray(args[0]) && typeof args[0][0] == 'string') {
				args = [...args[0]];
			}

			// sequence mode - frames parameter must be a string
			if (args.length == 2 && typeof args[0] == 'string' && typeof args[1] == 'string' && !args[1].includes('.')) {
				let from = args[0],
					to = args[1],
					num2,
					extIndex = from.lastIndexOf('.'),
					digits1 = 0,
					digits2 = 0;

				// start from ext "."
				// work backwards to find where the numbers end
				for (let i = extIndex - 1; i >= 0; i--) {
					if (!isNaN(from.charAt(i))) digits1++;
					else break;
				}

				if (to) {
					for (let i = to.length - 5; i >= 0; i--) {
						if (!isNaN(to.charAt(i))) digits2++;
						else break;
					}
				}

				let ext = from.slice(extIndex);
				let prefix1 = from.slice(0, extIndex - digits1);

				let num1 = parseInt(from.slice(extIndex - digits1, extIndex), 10);
				num2 ??= parseInt(to.slice(extIndex - digits2, extIndex), 10);

				// swap if inverted
				if (num2 < num1) {
					let t = num2;
					num2 = num1;
					num1 = t;
				}

				let fileName;
				if (!to || digits1 == digits2) {
					// load all images
					for (let i = num1; i <= num2; i++) {
						// Use nf() to number format 'i' into the amount of digits
						// ex: 14 with 4 digits is 0014
						fileName = prefix1 + $.nf(i, digits1) + ext;
						this.push($.loadImage(fileName));
					}
				} // case: case img1, img2
				else {
					for (let i = num1; i <= num2; i++) {
						// Use nf() to number format 'i' into four digits
						fileName = prefix1 + i + ext;
						this.push($.loadImage(fileName));
					}
				}
			} // end sequence mode

			// spriteSheet mode
			else if (typeof args[1] != 'string') {
				let atlas,
					sheet = anis?.spriteSheet;

				if (typeof args[0] == 'string' || args[0] instanceof Q5.Image) {
					sheet = args[0];
					args = args.slice(1);
				}

				if (typeof args[0] == 'number') {
					atlas = { frames: args[0] };
					if (args[1]) atlas.frameSize = args[1];
				} else {
					atlas = args[0];
				}

				const findFrames = () => {
					this.spriteSheet = sheet;

					if (Array.isArray(atlas)) {
						if (typeof atlas[0] == 'object') {
							atlas = { frames: atlas };
						} else if (atlas.length == 4) {
							atlas = { pos: atlas.slice(0, 2), size: atlas.slice(2) };
						} else {
							atlas = { pos: atlas };
						}
					}

					let { row, col, frames, frameSize, frameDelay } = atlas;

					if (frameDelay) this.frameDelay = frameDelay;
					let framesAmt = frames?.length || frames || 1;
					frameSize ??= anis?.frameSize;

					let w, h;

					if (frameSize) {
						if (typeof frameSize == 'string') {
							let dims = frameSize.toLowerCase().split('x');
							w = parseInt(dims[0]);
							h = parseInt(dims[1]);
						} else {
							w = frameSize[0];
							h = frameSize[1];
						}
					}

					if (!w || !h) {
						if (framesAmt) {
							w ??= sheet.width / framesAmt;
							h ??= sheet.height;
						} else {
							if (sheet.width < sheet.height) {
								w = h = sheet.width;
							} else {
								w = h = sheet.height;
							}
						}

						// sprites will be given default dimensions, but groups
						// are not, _dimensionsUndef is only for sprites
						// if (!owner._dimensionsUndef && owner.w && owner.h) {
						// 	w ??= owner.w;
						// 	h ??= owner.h;
						// }
					}

					let x = 0,
						y = 0;

					// add all the frames in the animation to the frames array
					if (!Array.isArray(frames)) {
						if (col) x = col * w;
						if (row) y = row * h;

						for (let i = 0; i < framesAmt; i++) {
							let f = { x, y, w, h };
							f.defaultWidth = w * $._defaultImageScale;
							f.defaultHeight = h * $._defaultImageScale;
							this.push(f);
							x += w;
							if (x >= sheet.width) {
								x = 0;
								y += h;
								if (y >= sheet.height) y = 0;
							}
						}
					} else {
						let sw = Math.round(sheet.width / w);
						for (let frame of frames) {
							let f;
							if (typeof frame == 'number') {
								y = Math.floor(frame / sw) * h;
								x = (frame % sw) * w;
								f = { x, y, w, h };
							} else {
								if (frame.length == 2) {
									x = frame[0] * w;
									y = frame[1] * h;
									f = { x, y, w, h };
								} else {
									f = {
										x: frame[0],
										y: frame[1],
										w: frame[2],
										h: frame[3]
									};
								}
							}
							f.defaultWidth = f.w * $._defaultImageScale;
							f.defaultHeight = f.h * $._defaultImageScale;
							this.push(f);
						}
					}

					this.cutFrames = atlas.cutFrames ?? anis?.cutFrames;

					if (this.cutFrames) {
						for (let i = 0; i < this.length; i++) {
							let f = this[i];
							// create a new image object for each frame
							this[i] = sheet.get(f.x, f.y, f.w, f.h);
						}
					}
				};

				if (sheet instanceof Q5.Image && sheet.width != 1 && sheet.height != 1) {
					findFrames();
					this._resolve(this);
				} else {
					if (typeof sheet == 'string') {
						sheet = $.loadImage(sheet);
					}
					sheet.promise.then(() => {
						findFrames();

						if (this._clones) {
							// propagate frame data to all clones
							for (let clone of this._clones) {
								for (let i = 0; i < this.length; i++) {
									clone.push(this[i]);
								}
							}
						}

						this._resolve(this);
					});
				}
			} // end SpriteSheet mode

			// list of images
			else {
				for (let i = 0; i < args.length; i++) {
					if (args[i] instanceof Q5.Image) this.push(args[i]);
					else this.push($.loadImage(args[i]));
				}
			}

			if (anis) anis[this.name] = this;
			owner.ani = this;

			if (this.name.length == 1) {
				tileDict[this.name] = this;
			}

			// play by default but a single frame ani doesn't need to play
			this.playing = this.length != 1;
		}

		// make loading Ani objects awaitable
		// then(resolve, reject) {
		// 	return this.promise.then(resolve, reject);
		// }

		get frame() {
			return this._frame;
		}
		set frame(val) {
			// Allow setting frame even if not loaded yet (will be clamped on load)
			if (this.length > 0 && (val < 0 || val >= this.length)) {
				throw new FriendlyError('Ani.frame', [val, this.length]);
			}
			this._frame = val;
			this._cycles = 0;
		}

		/*
		 * TODO frameChange
		 * Set the animation's frame delay in seconds.
		 */
		// get frameChange() {

		// }
		// set frameChange(val) {

		// }

		get scale() {
			return this._scale;
		}
		set scale(val) {
			if (typeof val == 'number') {
				val = { x: val, y: val };
			}
			this._scale._x = val.x;
			this._scale._y = val.y;
			this._scale._avg = val.x;
		}

		clone() {
			let ani = new $.Ani();
			ani.spriteSheet = this.spriteSheet;

			// if frames are loaded, copy them immediately
			if (this.length) {
				for (let i = 0; i < this.length; i++) {
					ani.push(this[i]);
				}
			} else {
				// lazy clone: register with root parent to receive frames when loaded
				// Use the root parent's _clones array (in case this is already a clone)
				let root = this._clonesRoot || this;
				root._clones ??= [];
				root._clones.push(ani);
				ani._clonesRoot = root;
				ani.promise = root.promise;
			}

			ani.name = this.name;
			ani.offset.x = this.offset.x;
			ani.offset.y = this.offset.y;
			ani.frameDelay = this.frameDelay;
			ani.playing = this.playing;
			ani.looping = this.looping;
			return ani;
		}

		play(frame) {
			this.playing = true;
			if (frame !== undefined && this._frame != frame) {
				this._frame = frame;
				this._cycles = 0;
			}
			this.targetFrame = -1;
			return new Promise((resolve) => {
				this._onComplete = () => {
					this._onComplete = null;
					resolve();
				};
			});
		}

		pause(frame) {
			this.playing = false;
			if (frame) this._frame = frame;
		}

		stop(frame) {
			this.playing = false;
			if (frame) this._frame = frame;
		}

		rewind() {
			this.looping = false;
			return this.goToFrame(0);
		}

		loop() {
			this.looping = true;
			this.playing = true;
		}

		noLoop() {
			this.looping = false;
		}

		nextFrame() {
			if (this._frame < this.length - 1) this._frame = this._frame + 1;
			else if (this.looping) this._frame = 0;

			this.targetFrame = -1;
			this.playing = false;
			this._cycles = 0;
		}

		previousFrame() {
			if (this._frame > 0) this._frame = this._frame - 1;
			else if (this.looping) this._frame = this.length - 1;

			this.targetFrame = -1;
			this.playing = false;
			this._cycles = 0;
		}

		goToFrame(toFrame) {
			if (toFrame < 0 || toFrame >= this.length) {
				return;
			}

			// targetFrame gets used by the update() method to decide what frame to
			// select next.  When it's not being used it gets set to -1.
			this.targetFrame = toFrame;
			this._cycles = 0;

			if (this.targetFrame !== this._frame) {
				this.playing = true;
			}
			return new Promise((resolve) => {
				this._onComplete = () => {
					this._onComplete = null;
					resolve();
				};
			});
		}

		get lastFrame() {
			return this.length - 1;
		}

		get frameImage() {
			let f = this._frame;
			let img = this[f];
			if (img instanceof Q5.Image) return img;

			let { x, y, w, h } = img; // image info

			let image = $.createImage(w, h);
			image.copy(this.spriteSheet, this.offset.x, this.offset.y, w, h, x, y, w, h);
			return image;
		}

		get w() {
			return this.width;
		}

		get width() {
			let frameInfo = this[this._frame];
			if (frameInfo instanceof Q5.Image) return frameInfo.width;
			return frameInfo?.w || 1;
		}
		get defaultWidth() {
			return this[this._frame]?.defaultWidth || 1;
		}

		get h() {
			return this.height;
		}

		get height() {
			let frameInfo = this[this._frame];
			if (frameInfo instanceof Q5.Image) return frameInfo.height;
			return frameInfo?.h || 1;
		}
		get defaultHeight() {
			return this[this._frame]?.defaultHeight || 1;
		}
	};

	$.Ani.props = [
		'frameSize',
		'frameDelay',
		'offset',
		'scale',
		'rotationLock',
		'looping',
		'endOnFirstFrame',
		'_spriteSheetDemo'
	];

	$.Anis = class {
		#_ = {};
		constructor() {
			let _this = this;

			let props = $.Ani.props;
			let vecProps = ['offset', 'scale'];

			for (let prop of props) {
				Object.defineProperty(this, prop, {
					get() {
						return _this.#_[prop];
					},
					set(val) {
						_this.#_[prop] = val;

						// change the prop in all the sprites of this group
						for (let k in _this) {
							let x = _this[k];
							if (!(x instanceof $.Ani)) continue;
							x[prop] = val;
						}
					}
				});
			}

			for (let vecProp of vecProps) {
				this.#_[vecProp] = {
					_x: 0,
					_y: 0
				};
				for (let prop of ['x', 'y']) {
					Object.defineProperty(this.#_[vecProp], prop, {
						get() {
							return _this.#_[vecProp]['_' + prop];
						},
						set(val) {
							_this.#_[vecProp]['_' + prop] = val;

							for (let k in _this) {
								let x = _this[k];
								if (!(x instanceof $.Ani)) continue;
								x[vecProp][prop] = val;
							}
						}
					});
				}
			}
		}

		get width() {
			return this.w;
		}
		set width(val) {
			this.w = val;
		}
		get height() {
			return this.h;
		}
		set height(val) {
			this.h = val;
		}
	};

	$.Visuals = class extends Array {
		constructor(...args) {
			super(...args);
			this._isVisuals = true;

			this._anis = null;
			this.ani = null;
			this._img = null;
		}

		get anis() {
			if (!this._anis) {
				this._anis = new $.Anis();
			}
			return this._anis;
		}
		set anis(val) {
			this._anis = val;
		}

		get img() {
			return this._img;
		}
		set img(val) {
			if (typeof val == 'function') {
				this._img = val;
				return;
			}
			if (typeof val == 'string') {
				if (!val.includes('.')) {
					val = new $.EmojiImage(val, this.w || this.width || this.d || this.diameter);
				} else val = $.loadImage(val);
			}
			this._img = $.Visual.prototype._extendImage(val);
		}

		get image() {
			return this._img;
		}
		set image(val) {
			this.img = val;
		}

		draw() {
			for (let v of this) {
				v.draw();
			}
		}
	};

	$.Group = class extends $.Visuals {
		constructor(...args) {
			let parent;
			if (args[0] instanceof $.Group) {
				parent = args[0];
				args = args.slice(1);
			}
			super(...args);

			if (typeof args[0] == 'number') return;
			for (let s of this) {
				if (!(s instanceof $.Sprite)) {
					throw new Error('A group can only contain sprites');
				}
			}

			this._isGroup = true;

			if ($.q5play.groupsCreated < 999) {
				this.idNum = $.q5play.groupsCreated;
			} else {
				// find the first empty slot in the groups array
				for (let i = 1; i < $.q5play.groups.length; i++) {
					if (!$.q5play.groups[i]?.deleted) {
						this.idNum = i;
						break;
					}
				}
				if (!this.idNum) {
					console.warn(
						'ERROR: Surpassed the limit of 999 groups in memory. Try setting `q5play.storeDeletedGroupRefs = false`. Use less groups or delete groups from the q5play.groups array to recycle ids.'
					);
					// if there are no empty slots, try to prevent a crash by
					// finding the first slot that has a group with no sprites in it
					for (let i = 1; i < $.q5play.groups.length; i++) {
						if (!$.q5play.groups[i]?.length) {
							this.idNum = i;
							break;
						}
					}
					this.idNum ??= 1;
				}
			}

			this._uid = this.idNum;
			$.q5play.groups[this._uid] = this;
			$.q5play.groupsCreated++;

			// if the allSprites group doesn't exist yet,
			// this group must be the allSprites group!
			if (!$.allSprites) {
				this._isAllSpritesGroup = true;
				this._topLayer = 0;
			}

			this.subgroups = [];

			if (parent instanceof $.Group) {
				parent.subgroups.push(this);
				let p = parent;
				do {
					p = $.q5play.groups[p.parent];
					p.subgroups.push(this);
				} while (!p._isAllSpritesGroup);
				this.parent = parent._uid;
			} else if (!this._isAllSpritesGroup) {
				$.allSprites.subgroups.push(this);
				this.parent = 0;
			}

			this._relation = {};
			this._collisions = {};
			this._overlappers = {};

			let _this = this;

			this.Sprite = class extends $.Sprite {
				constructor() {
					super(_this, ...arguments);
				}
			};

			this.Group = class extends $.Group {
				constructor() {
					super(_this, ...arguments);
				}
			};

			this.mouse = {
				presses: null,
				pressing: null,
				pressed: null,
				holds: null,
				holding: null,
				held: null,
				released: null,
				hovers: null,
				hovering: null,
				hovered: null
			};
			for (let state in this.mouse) {
				this.mouse[state] = function (inp) {
					for (let s of _this) {
						if (s.mouse[state](inp)) return true;
					}
					return false;
				};
			}

			let skipProps = ['ani', 'tile', 'scale', 'velocity', 'width', 'height', 'diameter'];

			for (let prop of $.Sprite.propsAll) {
				if (skipProps.includes(prop)) continue;

				Object.defineProperty(this, prop, {
					get() {
						let val = _this['_' + prop];
						if (val === undefined && !_this._isAllSpritesGroup) {
							let parent = $.q5play.groups[_this.parent];
							if (parent) {
								val = parent[prop];
							}
						}
						return val;
					},
					set(val) {
						_this['_' + prop] = val;

						// propagate the change to all of this group's subgroups
						for (let g of _this.subgroups) {
							g['_' + prop] = val;
						}

						// change the prop in all the sprites in this group
						for (let i = 0; i < _this.length; i++) {
							let s = _this[i];
							let v = val;
							if (typeof val == 'function') v = val(i);
							s[prop] = v;
						}
					}
				});
			}

			let vecProps = ['scale', 'vel'];

			for (let vecProp of vecProps) {
				vecProp = '_' + vecProp;
				if (vecProp != 'vel') this[vecProp] = {};
				else this[vecProp] = $.createVector.call($);
				this[vecProp]._x = 0;
				this[vecProp]._y = 0;
				for (let prop of ['x', 'y']) {
					Object.defineProperty(this[vecProp], prop, {
						get() {
							let val = _this[vecProp]['_' + prop];
							let i = _this.length - 1;
							if (val === undefined && !_this._isAllSpritesGroup) {
								let parent = $.q5play.groups[_this.parent];
								if (parent) {
									val = parent[vecProp][prop];
									i = parent.length - 1;
								}
							}
							return val;
						},
						set(val) {
							_this[vecProp]['_' + prop] = val;

							// change the prop in all the sprite of this group
							for (let i = 0; i < _this.length; i++) {
								let s = _this[i];
								let v = val;
								if (typeof val == 'function') v = val(i);
								s[vecProp][prop] = v;
							}
						}
					});
				}
			}

			this._scale._x = 1;
			this._scale._y = 1;

			if (this._isAllSpritesGroup) {
				this.autoCull = true;
				this.autoDraw = true;
				this.autoUpdate = true;
			}

			this.add = this.push;

			this.contains = this.includes;
		}

		addTiles(tiles, x = 0, y = 0, colGap, rowGap) {
			if (typeof tiles == 'string') {
				if (tiles[0] == '\n') tiles = tiles.slice(1);
				tiles = tiles.replaceAll('\t', '  ');
				tiles = tiles.split('\n');
			}

			for (let row = 0; row < tiles.length; row++) {
				for (let col = 0; col < tiles[row].length; col++) {
					let t = tiles[row][col],
						tile = tileDict[t];

					if (!tile) continue;

					if (colGap === undefined) {
						colGap = tile.w || tile.ani.w;
						rowGap = tile.h || tile.ani.h;
					}

					let tileX = x + col * colGap;
					let tileY = y + row * rowGap;

					if (tile._isAni) {
						let ani = tile;
						let sprite;
						if (ani.owner._isGroup) {
							let g = ani.owner;
							sprite = new g.Sprite(ani, tileX, tileY);
							this.push(sprite);
							continue;
						} else {
							tile = ani.owner;
						}
					}

					if (tile._isGroup) {
						let g = tile;
						let sprite = new g.Sprite(tileX, tileY);
						this.push(sprite);
					} else if (tile._isSprite) {
						let sprite = tile;
						sprite.pos = [tileX, tileY];
						this.push(sprite);
					}
				}
			}
		}

		get scale() {
			return this._scale;
		}
		set scale(val) {
			let x = val.x ?? val[0] ?? val;
			let y = val.y ?? val[1] ?? val;

			this._scale._x = x;
			this._scale._y = y;

			for (let g of this.subgroups) {
				g['_' + prop] = val;
			}
			for (let i = 0; i < this.length; i++) {
				let s = this[i];
				let v = val;
				if (typeof val == 'function') v = val(i);
				s[prop] = v;
			}
		}

		get amount() {
			return this.length;
		}
		set amount(val) {
			let diff = val - this.length;
			let shouldAdd = diff > 0;
			diff = Math.abs(diff);
			for (let i = 0; i < diff; i++) {
				if (shouldAdd) new this.Sprite();
				else this[this.length - 1].remove();
			}
		}

		get diameter() {
			return this.d;
		}
		set diameter(val) {
			this.d = val;
		}

		get width() {
			return this.w;
		}
		set width(val) {
			this.w = val;
		}

		get height() {
			return this.h;
		}
		set height(val) {
			this.h = val;
		}

		get tile() {
			return this._tile;
		}
		set tile(val) {
			this._tile = val;
			tileDict[val] = this;
		}

		get velocity() {
			return this.vel;
		}
		set velocity(val) {
			this.vel = val;
		}

		_resetCentroid() {
			let x = 0;
			let y = 0;
			for (let s of this) {
				x += s.x;
				y += s.y;
			}
			this.centroid = { x: x / this.length, y: y / this.length };
			return this.centroid;
		}

		_resetDistancesFromCentroid() {
			for (let s of this) {
				s.distCentroid = {
					x: s.x - this.centroid.x,
					y: s.y - this.centroid.y
				};
			}
		}

		_validateCollideParams(target, cb) {
			if (cb && typeof cb != 'function') {
				throw new FriendlyError('Group.collide', 1, [cb]);
			}
			if (!target) {
				throw new FriendlyError('Group.collide', 2);
			}
			if (!target._isGroup && !target._isSprite) {
				throw new FriendlyError('Group.collide', 0, [target]);
			}
		}

		_setContactCB(target, cb, contactType, eventType) {
			if (target._isSprite) {
				let reversedCB = function (a, b, v) {
					return cb.call(b, b, a, v);
				};
				target._setContactCB(this, reversedCB, contactType, eventType);
				return;
			}

			let type;
			if (contactType == 0) type = eventTypes._collisions[eventType];
			else type = eventTypes._overlappers[eventType];

			let ledger = $.q5play[type];

			let l = (ledger[this._uid] ??= {});

			if (l[target._uid] == cb) return;
			l[target._uid] = cb;
			for (let s of this) {
				let c2 = (ledger[s._uid] ??= {});
				c2[target._uid] = cb;
			}

			if (this._uid == target._uid) return;

			l = ledger[target._uid];
			if (!l || !l[this._uid]) return;
			if (this._uid != target._uid) delete l[this._uid];
			for (let s of target) {
				l = ledger[s._uid];
				if (!l || !l[this._uid]) continue;
				delete l[this._uid];
				if (Object.keys(l).length == 0) {
					delete ledger[s._uid];
				}
			}
			if (Object.keys(l).length == 0) {
				delete ledger[target._uid];
			}
		}

		_ensureContactRelationship(target, r) {
			if (this._relation[target._uid] !== r && this._uid != target._uid) {
				this._relation[target._uid] = r;
				for (let s of this) {
					s._relation[target._uid] = r;
					target._relation[s._uid] = r;
				}
			}
			if (target._relation[this._uid] !== r) {
				target._relation[this._uid] = r;
				if (target._isGroup) {
					for (let s of target) {
						s._relation[this._uid] = r;
						this._relation[s._uid] = r;
						for (let s2 of this) {
							s._relation[s2._uid] = r;
							s2._relation[s._uid] = r;
						}
					}
				}
			}
		}

		_ensureCollide(target) {
			this._ensureContactRelationship(target, 0);

			if (!this._areContactEventsEnabled) {
				for (let s of this) {
					for (let collider of s.colliders) {
						collider._enableContactEvents();
					}
				}
				this._areContactEventsEnabled = true;
			}
			if (!target._areContactEventsEnabled) {
				if (target._isGroup) {
					for (let s of target) {
						for (let collider of s.colliders) {
							collider._enableContactEvents();
						}
					}
				} else {
					for (let collider of target.colliders) {
						collider._enableContactEvents();
					}
				}
				target._areContactEventsEnabled = true;
			}
		}

		collide(target, callback) {
			return this.collides(target, callback);
		}

		collides(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 0);
			return this._collisions[target._uid] == 1 || this._collisions[target._uid] <= -3;
		}

		colliding(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 1);
			let val = this._collisions[target._uid];
			if (val <= -3) return 1;
			return val > 0 ? val : 0;
		}

		collided(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 2);
			return this._collisions[target._uid] <= -1;
		}

		_validateOverlapParams(target, cb) {
			if (cb && typeof cb != 'function') {
				throw new FriendlyError('Group.overlap', 1, [cb]);
			}
			if (!target) {
				throw new FriendlyError('Group.overlap', 2);
			}
			if (!target._isGroup && !target._isSprite) {
				throw new FriendlyError('Group.overlap', 0, [target]);
			}
		}

		pass(target) {
			this._ensureContactRelationship(target, 1);
		}

		passes(target) {
			this._ensureContactRelationship(target, 1);
		}

		_ensureOverlap(target) {
			this._ensureContactRelationship(target, 2);

			if (!this._hasSensors) {
				for (let s of this) {
					if (!s._hasSensors) s.addDefaultSensors();
				}
				this._hasSensors = true;
			}
			if (!target._hasSensors) {
				if (target._isSprite) {
					target.addDefaultSensors();
				} else {
					for (let s of target) {
						if (!s._hasSensors) s.addDefaultSensors();
					}
					target._hasSensors = true;
				}
			}
		}

		overlap(target, callback) {
			return this.overlaps(target, callback);
		}

		overlaps(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 0);
			return this._overlappers[target._uid] == 1 || this._overlappers[target._uid] <= -3;
		}

		overlapping(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 1);
			let val = this._overlappers[target._uid];
			if (val <= -3) return 1;
			return val > 0 ? val : 0;
		}

		overlapped(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 2);
			return this._overlappers[target._uid] <= -1;
		}

		applyForce() {
			for (let s of this) {
				s.applyForce(...arguments);
			}
		}

		// TODO: implement
		// applyForceScaled() {
		// 	for (let s of this) {
		// 		s.applyForceScaled(...arguments);
		// 	}
		// }

		attractTo() {
			for (let s of this) {
				s.attractTo(...arguments);
			}
		}

		repelFrom() {
			for (let s of this) {
				s.repelFrom(...arguments);
			}
		}

		applyTorque() {
			for (let s of this) {
				s.applyTorque(...arguments);
			}
		}

		_resetCentroid() {
			let x = 0;
			let y = 0;
			for (let s of this) {
				x += s.x;
				y += s.y;
			}
			this.centroid = { x: x / this.length, y: y / this.length };
			return this.centroid;
		}

		_resetDistancesFromCentroid() {
			for (let s of this) {
				s.distCentroid = {
					x: s.x - this.centroid.x,
					y: s.y - this.centroid.y
				};
			}
		}

		moveTowards(x, y, tracking) {
			if (x === undefined) return;

			if (typeof x != 'number') {
				let pos = x;
				if (pos == $.mouse && !$.mouse.isActive) return;
				tracking = y;
				y = pos[0] ?? pos.y;
				x = pos[1] ?? pos.x;
			}
			tracking ??= 0.1;

			this._resetCentroid();

			for (let s of this) {
				if (s.distCentroid === undefined) {
					this._resetDistancesFromCentroid();
				}
				s.moveTowards(s.distCentroid.x + x, s.distCentroid.y + y, tracking);
			}
		}

		size() {
			return this.length;
		}

		toString() {
			return 'g' + this.idNum;
		}

		cull(top = 0, bottom, left, right, cb) {
			if (left === undefined) {
				let size = top;
				cb = bottom;
				top = bottom = left = right = size;
			}
			if (isNaN(top) || isNaN(bottom) || isNaN(left) || isNaN(right)) {
				throw new TypeError('The culling boundary must be defined with numbers');
			}
			if (cb && typeof cb != 'function') {
				throw new TypeError('The callback to group.cull must be a function');
			}

			let cx = $.camera.x - $.canvas.hw / $.camera.zoom;
			let cy = $.camera.y - $.canvas.hh / $.camera.zoom;

			let minX = -left + cx;
			let minY = -top + cy;
			let maxX = $.canvas.w + right + cx;
			let maxY = $.canvas.h + bottom + cy;

			let culled = 0;
			for (let i = 0; i < this.length; i++) {
				let s = this[i];

				// TODO: if sprite has a chain shape, never cull it
				// if (s.shape == 'chain') continue;

				if (s._posX < minX || s._posY < minY || s._posX > maxX || s._posY > maxY) {
					culled++;
					if (cb) cb(s, culled);
					else s.delete();
					if (s._deleted) i--;
				}
			}

			if (this._isAllSpritesGroup) this.autoCull = null;

			return culled;
		}

		push(...sprites) {
			this.splice(this.length, 0, ...sprites);
			return this.length;
		}

		splice(start, removalCount, ...sprites) {
			if (this.deleted) {
				console.warn(
					'Edited group' +
						this._uid +
						" that was deleted. Use `group.deleteAll()` to remove all of a group's sprites without deleting the group itself. Restoring the group to q5play's memory."
				);
				$.q5play.groups[this._uid] = this;
				this.deleted = false;
			}

			// filter out non-sprites and log a warning
			sprites = sprites.filter((s) => {
				if (!(s instanceof $.Sprite)) {
					console.warn('Only sprites can be added to a group, skipping:', s);
					return false;
				}
				if (s.deleted) {
					console.warn("Can't add a deleted sprite to a group, skipping:", s);
					return false;
				}
				return true;
			});

			let removed = super.splice(start, removalCount, ...sprites);

			// removals
			if (removalCount) {
				for (let s of removed) {
					if (s == undefined) continue;
					for (let g of this.subgroups) {
						// recursive removal
						let i = g.indexOf(s);
						if (i >= 0) g.splice(i, 1);
					}
					s.groups = s.groups.filter((g) => g._uid != this._uid);
				}

				// Only check contacts of removed sprites to find which group contacts need updating
				// This is much faster than checking all sprites for all contacts
				let a = this;
				for (let eventType in eventTypes) {
					let contactsToCheck = new Set();

					// Collect unique contacts from removed sprites
					for (let s of removed) {
						if (!s) continue;
						for (let b_uid in s[eventType]) {
							if (s[eventType][b_uid] > 0) {
								contactsToCheck.add(b_uid);
							}
						}
					}

					// Only check if group is still in contact with entities that removed sprites were touching
					for (let b_uid of contactsToCheck) {
						if (!a[eventType][b_uid] || a[eventType][b_uid] == 0) continue;

						// Check if any remaining sprite is still in contact
						let stillInContact = false;
						for (let s of a) {
							if (s[eventType][b_uid] > 0) {
								stillInContact = true;
								break;
							}
						}

						if (!stillInContact) {
							let b;
							if (b_uid >= 1000) b = $.q5play.sprites[b_uid];
							else b = $.q5play.groups[b_uid];
							if (b) {
								a[eventType][b_uid] = -2;
								b[eventType][a._uid] = -2;
							}
						}
					}
				}
			}

			// addition
			if (sprites.length > 0) {
				let b, rel, contactTypes, ledger, lg, ls;
				for (let s of sprites) {
					for (let tuid in this._relation) {
						rel = this._relation[tuid];

						if (rel == 2 && !s._hasSensors) {
							s.addDefaultSensors(); // TODO: implement
						}
						if (tuid >= 1000) b = $.q5play.sprites[tuid];
						else b = $.q5play.groups[tuid];

						if (!b || b.deleted) continue;

						if (rel == 0) b._ensureCollide(s);
						else if (rel == 1) b._ensureContactRelationship(s, 1); // passes
						else if (rel == 2) b._ensureOverlap(s);
					}
					for (let event in eventTypes) {
						contactTypes = eventTypes[event];
						for (let contactType of contactTypes) {
							ledger = $.q5play[contactType];
							lg = ledger[this._uid];
							if (!lg) continue;

							ls = ledger[s._uid] ??= {};
							for (let b_uid in lg) {
								ls[b_uid] = lg[b_uid];
							}
						}
					}
				}
			}

			// add recursively to parent groups, excluding allSprites (id is 0)
			if (this.parent && sprites.length) {
				let g = $.q5play.groups[this.parent];
				// only add sprites that are not already in the group
				let uniqueSprites = sprites.filter((s) => !g.includes(s));
				if (uniqueSprites.length) g.splice(g.length, 0, ...uniqueSprites);
			}

			for (let s of sprites) {
				// only add this group to the sprite's group list if not already present
				if (!s.groups.some((g) => g._uid === this._uid)) {
					s.groups.push(this);
				}
			}

			return removed;
		}

		_splice(start, removalCount, ...sprites) {
			return super.splice(start, removalCount, ...sprites);
		}

		pop() {
			return this.splice(this.length - 1, 1)[0];
		}

		shift() {
			return this.splice(0, 1)[0];
		}

		unshift(...sprites) {
			this.splice(0, 0, ...sprites);
			return this.length;
		}

		remove(item) {
			let idx;
			if (typeof item == 'number') {
				idx = item;
				if (item < 0) idx += this.length;
			} else {
				idx = this.lastIndexOf(item);
			}

			if (idx < 0 || idx >= this.length) return;

			return this.splice(idx, 1)[0];
		}

		removeAll() {
			return this.splice(0, this.length);
		}

		delete() {
			this.deleteAll();
			if (!this._isAllSpritesGroup) this.deleted = true;
		}

		deleteAll() {
			while (this.length > 0) {
				this.at(-1).delete();
			}
		}

		_step() {
			this.__step();
		}

		update() {
			for (let s of this) {
				if (s.autoUpdate) {
					s.update();
				}
			}
			if (this._autoUpdate) this._autoUpdate = null;
		}

		draw() {
			let g = [...this];
			g.sort((a, b) => a._layer - b._layer);
			for (let s of g) {
				if (s._visible !== false && s.autoDraw) {
					s.draw();
				}
			}
			if (this._autoDraw) this._autoDraw = null;
		}

		postDraw() {
			for (let s of this) {
				s.postDraw();
			}
		}
	};

	$.Group.prototype.__step = $.Sprite.prototype.__step;
	$.Group.prototype.___step = $.Sprite.prototype.___step;

	$.Visuals.prototype.addAni = $.Group.prototype.addAni = $.Sprite.prototype.addAni;
	$.Visuals.prototype.addAnis = $.Group.prototype.addAnis = $.Sprite.prototype.addAnis;

	$.World = class {
		constructor() {
			this.mod = {};

			const def = b2DefaultWorldDef();
			def.gravity.Set(0, 0);

			this.wID = wID = b2CreateWorld(def);

			let _this = this;
			this._gravity = {
				get x() {
					return b2World_GetGravity(wID).x;
				},
				set x(val) {
					val = Math.round(val || 0);
					_this.mod[0] = true;
					for (let s of $.allSprites) s.sleeping = false;
					b2World_SetGravity(wID, new b2Vec2(val, this.y));
				},
				get y() {
					return b2World_GetGravity(wID).y;
				},
				set y(val) {
					val = Math.round(val || 0);
					_this.mod[0] = true;
					for (let s of $.allSprites) s.sleeping = false;
					b2World_SetGravity(wID, new b2Vec2(this.x, val));
				}
			};

			this._timeScale = 1;
			this._updateRate = 60;
			this._syncedToFrameRate = true;
			this._lastStepTime = 0;
			this._setTimeStep();
			this.bounceThreshold = 0.19;
			this.physicsTime = 0;
			this.mouseTracking ??= true;
			this.mouseSprite = null;
			this.mouseSprites = [];
			this.autoStep = true;
			this.subSteps = 4;

			this.step = this.physicsUpdate;

			b2World_SetCustomFilterCallback(wID, (shapeIdA, shapeIdB) => {
				const shapeA = shapeDict[shapeIdA.index1],
					shapeB = shapeDict[shapeIdB.index1],
					isSensorA = shapeA._isSensor,
					isSensorB = shapeB._isSensor,
					spriteA = shapeA.sprite,
					spriteB = shapeB.sprite;

				// If both shapes are sensors, generate overlap events,
				// or if both are colliders that shouldn't overlap,
				// generate collision events.
				// Otherwise, this returns false to ignore
				// contact between sensors and colliders, also
				// to let colliders pass through each other.
				return (
					(isSensorA && isSensorB) ||
					(!isSensorA && !isSensorB && !(spriteA._relation[spriteB._uid] ?? spriteB._relation[spriteA._uid]))
				);
			});
		}

		_processContacts(events, t, idA, idB) {
			for (let i = 0; i < events.beginCount; i++) {
				const evt = events.GetBeginEvent(i),
					shapeA = shapeDict[evt[idA].index1],
					shapeB = shapeDict[evt[idB].index1],
					a = shapeA.sprite,
					b = shapeB.sprite,
					ledgerA = a[t],
					ledgerB = b[t];

				ledgerA[b._uid] = 0;
				ledgerB[a._uid] = 0;

				for (const g of b.groups) {
					if (!ledgerA[g._uid] || ledgerA[g._uid] < 0) {
						ledgerA[g._uid] = 0;
						g[t][a._uid] = 0;
					}
				}

				for (const g of a.groups) {
					if (!ledgerB[g._uid] || ledgerB[g._uid] < 0) {
						ledgerB[g._uid] = 0;
						g[t][b._uid] = 0;
					}
					for (const g2 of b.groups) {
						if (!g[t][g2._uid] || g[t][g2._uid] < 0) {
							g[t][g2._uid] = 0;
							g2[t][g._uid] = 0;
						}
					}
				}
			}

			for (let i = 0; i < events.endCount; i++) {
				const evt = events.GetEndEvent(i),
					shapeA = shapeDict[evt[idA].index1],
					shapeB = shapeDict[evt[idB].index1],
					a = shapeA.sprite,
					b = shapeB.sprite,
					ledgerA = a[t],
					ledgerB = b[t];

				ledgerA[b._uid] = ledgerA[b._uid] != 0 ? -2 : -4;
				ledgerB[a._uid] = ledgerB[a._uid] != 0 ? -2 : -4;

				for (const g of b.groups) {
					let inContact = false;
					for (const s of g) {
						if (s[t][a._uid] >= 0) {
							inContact = true;
							break;
						}
					}
					if (!inContact) {
						g[t][a._uid] = g[t][a._uid] != 0 ? -2 : -4;
						ledgerA[g._uid] = ledgerA[g._uid] != 0 ? -2 : -4;
					}
				}

				for (const g of a.groups) {
					let inContact = false;
					for (const s of g) {
						if (s[t][b._uid] >= 0) {
							inContact = true;
							break;
						}
					}
					if (!inContact) {
						g[t][b._uid] = g[t][b._uid] != 0 ? -2 : -4;
						ledgerB[g._uid] = ledgerB[g._uid] != 0 ? -2 : -4;
						for (const g2 of b.groups) {
							g[t][g2._uid] = g[t][g2._uid] != 0 ? -2 : -4;
							g2[t][g._uid] = g2[t][g._uid] != 0 ? -2 : -4;
						}
					}
				}
			}
		}

		_processJoints(events) {
			for (let i = 0; i < events.count; i++) {
				const evt = events.GetJointEvent(i),
					j = jointDict[evt.jointId.index1];

				j.onStrain();
			}
		}

		get allowSleeping() {
			return b2World_IsSleepingEnabled(wID);
		}
		set allowSleeping(val) {
			b2World_EnableSleeping(wID, val);
		}

		get awakeBodies() {
			return b2World_GetAwakeBodyCount(wID);
		}

		get bounceThreshold() {
			return b2World_GetRestitutionThreshold(wID);
		}
		set bounceThreshold(val) {
			b2World_SetRestitutionThreshold(wID, val);
		}

		get debugInfo() {
			return b2World_GetCounters(wID);
		}

		get gravity() {
			return this._gravity;
		}
		set gravity(val) {
			b2World_SetGravity(wID, new b2Vec2(val[0] ?? val.x, val[1] ?? val.y));
		}

		get hitThreshold() {
			return b2World_SetHitEventThreshold(wID);
		}
		set hitThreshold(val) {
			b2World_GetHitEventThreshold(wID, val);
		}

		get meterSize() {
			return meterSize;
		}
		set meterSize(val) {
			meterSize = val;
		}

		get profile() {
			return b2World_GetProfile();
		}

		get timeScale() {
			return this._timeScale;
		}
		set timeScale(val) {
			if (val < 0 || val > 2) {
				return console.error('world.timeScale must be between 0 and 2');
			}
			if (this._timeScale == val) return;
			this._timeScale = val;
			this._setTimeStep();
		}

		get updateRate() {
			return this._updateRate;
		}
		set updateRate(val) {
			this._updateRate = val;
			this._syncedToFrameRate = val == $._targetFrameRate;
			this._setTimeStep();
		}

		_setTimeStep() {
			this._timeStep = (1 / this._updateRate) * this._timeScale;
		}

		delete() {
			b2DestroyWorld(wID);
		}

		explodeAt(x, y, radius, magnitude = 1, falloff = 0.1) {
			if (x.x) {
				falloff = magnitude;
				magnitude = radius;
				radius = y;
				y = x.y;
				x = x.x;
			}
			let e = b2DefaultExplosionDef();
			e.position = scaleTo(x, y);
			e.radius = radius / meterSize;
			e.impulsePerLength = magnitude;
			e.falloff = falloff;
			b2World_Explode(wID, e);
		}

		getSpritesAt(x, y, group, cameraActiveWhenDrawn = true) {
			if (x.x) {
				cameraActiveWhenDrawn = group ?? true;
				group = y;
				y = x.y;
				x = x.x;
			}
			const point = new b2Vec2(x / meterSize, y / meterSize);
			const filter = new b2QueryFilter();

			// TODO
			return [];

			// Query the world for fixture AABBs that overlap the point AABB
			// narrowing down the number of fixtures to check with
			// the more expensive testPoint method
			let fxts = [];
			b2World_OverlapPoint(wID, point, this._origin, filter, (fxt) => {
				// we need to make sure the point is actually within the shape
				if (fxt.getShape().testPoint(fxt.getBody().getTransform(), point)) {
					fxts.push(fxt);
				}
				return true;
			});
			if (fxts.length == 0) return [];

			group ??= $.allSprites;
			let sprites = [];
			for (let fxt of fxts) {
				const s = fxt.m_body.sprite;
				if (s._cameraActiveWhenDrawn == cameraActiveWhenDrawn) {
					if (!sprites.find((x) => x._uid == s._uid)) sprites.push(s);
				}
			}
			sprites.sort((a, b) => (a._layer - b._layer) * -1);
			return sprites;
		}

		getSpriteAt(x, y, group) {
			const sprites = this.getSpritesAt(x, y, group);
			return sprites[0];
		}

		getMouseSprites() {
			let sprites = this.getSpritesAt($.mouse.x, $.mouse.y);
			if ($.camera._wasOff) {
				let uiSprites = this.getSpritesAt($.mouse.canvasPos.x, $.mouse.canvasPos.y, $.allSprites, false);
				if (uiSprites.length) sprites = [...uiSprites, ...sprites];
			}
			return sprites;
		}

		physicsUpdate(timeStep) {
			usePhysics = true;
			timeScale = this._timeScale;
			timeStep ??= this._timeStep;

			b2World_Step(wID, timeStep, this.subSteps);
			this.taskSystem?.ClearTasks();

			const collideEvents = b2World_GetContactEvents(wID),
				overlapEvents = b2World_GetSensorEvents(wID),
				jointEvents = b2World_GetJointEvents(wID);

			this._processContacts(collideEvents, '_collisions', 'shapeIdA', 'shapeIdB');
			this._processContacts(overlapEvents, '_overlappers', 'sensorShapeId', 'visitorShapeId');
			this._processJoints(jointEvents);

			this.physicsTime += timeStep;

			let sprites = Object.values($.q5play.sprites);
			let groups = Object.values($.q5play.groups);

			for (let s of sprites) s._step();
			for (let g of groups) g._step();

			for (let s of sprites) {
				s.___step();
			}
			for (let g of groups) {
				g.___step();
			}

			if (this.autoStep) this.autoStep = null;
		}

		get realTime() {
			return $.millis() / 1000;
		}

		rayCast(startPos, direction, maxDistance) {
			let sprites = this.rayCastAll(startPos, direction, maxDistance, () => true);
			return sprites[0];
		}

		rayCastAll(startPos, direction, maxDistance, limiter) {
			let start = scaleTo(startPos.x, startPos.y);

			let end;
			if (typeof arguments[1] == 'number') {
				end = scaleTo(startPos.x + maxDistance * $.cos(direction), startPos.y + maxDistance * $.sin(direction));
			} else {
				let endPos = arguments[1];
				limiter ??= arguments[2];
				end = scaleTo(endPos.x, endPos.y);
			}

			let results = [];
			let maxFraction = 1;

			super.rayCast(start, end, function (fixture, point, normal, fraction) {
				let sprite = fixture.getBody().sprite;

				let shouldLimit = limiter && limiter(sprite);

				// TODO provide advanced info: point and angle of intersection
				results.push({
					sprite,
					// point,
					// normal,
					fraction
				});

				// limit the ray cast so it can't go beyond this sprite
				if (shouldLimit) {
					if (fraction < maxFraction) {
						maxFraction = fraction;
					}
					return fraction;
				}
				return 1; // keep casting the full length of the ray
			});

			// sort results by the distance from the starting position
			results.sort((a, b) => a.fraction - b.fraction);

			let sprites = [];

			for (let res of results) {
				if (res.fraction <= maxFraction) {
					sprites.push(res.sprite);
				}
			}

			return sprites;
		}
	};

	$.Camera = class {
		constructor() {
			// camera position
			this._pos = $.createVector.call($);

			// camera translation
			this.__pos = { x: 0, y: 0, rounded: {} };

			this.isActive = false;

			this.bound = {
				min: { x: 0, y: 0 },
				max: { x: 0, y: 0 }
			};

			this._zoomIdx = -1;

			this._zoom = 1;

			this._destIdx = 0;
		}

		get pos() {
			return this._pos;
		}
		set pos(val) {
			this.x = val[0] ?? val.x;
			this.y = val[1] ?? val.y;
		}

		get position() {
			return this._pos;
		}
		set position(val) {
			this.x = val[0] ?? val.x;
			this.y = val[1] ?? val.y;
		}

		_calcBoundsX(val) {
			let mod = $.canvas.hw / this._zoom;
			this.bound.min.x = val - mod;
			this.bound.max.x = val + mod;
		}

		_calcBoundsY(val) {
			let mod = $.canvas.hh / this._zoom;
			this.bound.min.y = val - mod;
			this.bound.max.y = val + mod;
		}

		get x() {
			return this._pos.x;
		}
		set x(val) {
			if (val === undefined || isNaN(val)) return;
			this._pos.x = val;
			let x = -val;
			if ($._c2d) x += $.canvas.hw / this._zoom;
			this.__pos.x = x;
			if ($.allSprites.pixelPerfect) {
				this.__pos.rounded.x = Math.round(x);
			}
			this._calcBoundsX(val);
		}

		get y() {
			return this._pos.y;
		}
		set y(val) {
			if (val === undefined || isNaN(val)) return;
			this._pos.y = val;
			let y = -val;
			if ($._c2d) y += $.canvas.hh / this._zoom;
			this.__pos.y = y;
			if ($.allSprites.pixelPerfect) {
				this.__pos.rounded.y = Math.round(y);
			}
			this._calcBoundsY(val);
		}

		moveTo(x, y, speed) {
			if (x === undefined) return;
			if (isNaN(x)) {
				speed = y;
				y = x.y;
				x = x.x;
			}
			speed ??= 1;
			if (speed <= 0) {
				console.warn('camera.moveTo: speed should be a positive number');
				return Promise.resolve(false);
			}
			let a = y - this.y;
			let b = x - this.x;
			let c = Math.sqrt(a * a + b * b);
			let percent = speed / c;
			let velX = b * percent;
			let velY = a * percent;

			this._destIdx++;
			let destIdx = this._destIdx;
			let steps = Math.ceil(c / speed);

			// TODO: change position in camera.update()
			return (async () => {
				for (let i = 0; i < steps; i++) {
					this.x += velX;
					this.y += velY;

					await $.delay(16);
					if (destIdx != this._destIdx) return false;
				}
				this.x = x;
				this.y = y;
				return true;
			})();
		}

		get zoom() {
			return this._zoom;
		}
		set zoom(val) {
			if (val === undefined || isNaN(val)) return;
			this._zoom = val;
			let x = -this._pos.x;
			if ($._c2d) x += $.canvas.hw / val;
			let y = -this._pos.y;
			if ($._c2d) y += $.canvas.hh / val;
			this.__pos.x = x;
			this.__pos.y = y;
			if ($.allSprites.pixelPerfect) {
				this.__pos.rounded.x = Math.round(x);
				this.__pos.rounded.y = Math.round(y);
			}
			this._calcBoundsX(this._pos.x);
			this._calcBoundsY(this._pos.y);
		}

		zoomTo(target, speed) {
			if (target == this._zoom) return Promise.resolve(true);
			speed ??= 0.1;
			let delta = Math.abs(target - this._zoom);
			let frames = Math.round(delta / speed);
			if (target < this.zoom) speed = -speed;

			this._zoomIdx++;
			let zoomIdx = this._zoomIdx;

			// TODO: change zoom in camera.update()
			return (async () => {
				for (let i = 0; i < frames; i++) {
					if (zoomIdx != this._zoomIdx) return false;
					this.zoom += speed;
					await $.delay(16);
				}
				this.zoom = target;
				return true;
			})();
		}

		on() {
			if (!this.isActive) {
				$.push();
				$.scale(this._zoom);
				if (!$.allSprites.pixelPerfect) {
					$.translate(this.__pos.x, this.__pos.y);
				} else {
					this.__pos.rounded.x ??= Math.round(this.__pos.x);
					this.__pos.rounded.y ??= Math.round(this.__pos.y);
					$.translate(this.__pos.rounded.x, this.__pos.rounded.y);
				}
				this.isActive = cameraOn = true;
			}
		}

		off() {
			if (this.isActive) {
				$.pop();
				this.isActive = cameraOn = false;
			}
		}
	}; //end camera class

	$.Joint = class {
		constructor(spriteA, spriteB, type) {
			let a = spriteA,
				b = spriteB;

			if (!a?._isSprite || !b?._isSprite) {
				throw new Error('The Joint constructor requires two sprites as input.');
			}

			this.spriteA = a;
			this.spriteB = b;
			this.type = type ??= 'glue';
			this.visible = true;

			if (!a._shapes.length) a.addDefaultSensors();
			if (!b._shapes.length) b.addDefaultSensors();

			this._oAx = this._oAy = this._oBx = this._oBy = 0;

			let _this = this;

			// if (type != 'slider' && type != 'rope') {

			if (type != 'wheel') {
				this._offsetA = {};

				Object.defineProperty(this._offsetA, 'x', {
					get() {
						let val = _this._oAx;
						return friendlyRounding ? fixRound(val) : val;
					},
					set(val) {
						_this._setOffsetA(val, _this._oAy);
					}
				});

				Object.defineProperty(this._offsetA, 'y', {
					get() {
						let val = _this._oAy;
						return friendlyRounding ? fixRound(val) : val;
					},
					set(val) {
						_this._setOffsetA(_this._oAx, val);
					}
				});
			}

			this._offsetB = {};

			Object.defineProperty(this._offsetB, 'x', {
				get() {
					let val = _this._oBx;
					return friendlyRounding ? fixRound(val) : val;
				},
				set(val) {
					_this._setOffsetB(val, _this._oBy);
				}
			});

			Object.defineProperty(this._offsetB, 'y', {
				get() {
					let val = _this._oBy;
					return friendlyRounding ? fixRound(val) : val;
				},
				set(val) {
					_this._setOffsetB(_this._oBx, val);
				}
			});

			a.joints.push(this);
			if (a != b) b.joints.push(this);

			if (type != 'glue') return;

			let j = this._init(b2DefaultWeldJointDef());
			this.jID = b2CreateWeldJoint(wID, j);
			jointDict[this.jID.index1] = this;

			this.forceThreshold = 500;
			this.torqueThreshold = 500;
		}

		_init(j) {
			let a = this.spriteA,
				b = this.spriteB;

			j.base.bodyIdA = a.bdID;
			j.base.bodyIdB = b.bdID;

			j.base.localFrameB.p = b2Body_GetLocalPoint(b.bdID, scaleTo(a.x, a.y));

			let qA = b2Body_GetRotation(a.bdID);
			let qB = b2Body_GetRotation(b.bdID);
			j.base.localFrameA.q = b2InvMulRot(qA, qB);

			return j;
		}

		_display() {
			this._draw(
				this.spriteA.x + this._oAx,
				this.spriteA.y + this._oAy,
				this.spriteB.x + this._oBx,
				this.spriteB.y + this._oBy
			);
			this.visible = null;
		}

		_draw(xA, yA, xB, yB) {
			if (xB) $.line(xA, yA, xB, yB);
			else $.point(xA, yA);
		}

		get draw() {
			return this._display;
		}
		set draw(val) {
			this._draw = val;
		}

		get collideConnected() {
			return b2Joint_GetCollideConnected(this.jID);
		}
		set collideConnected(val) {
			b2Joint_SetCollideConnected(this.jID, val);
		}

		get constraintForce() {
			return b2Joint_GetConstraintForce(this.jID);
		}

		get constraintTorque() {
			return b2Joint_GetConstraintTorque(this.jID);
		}

		get forceThreshold() {
			return b2Joint_GetForceThreshold(this.jID);
		}
		set forceThreshold(val) {
			b2Joint_SetForceThreshold(this.jID, val);
		}

		get torqueThreshold() {
			return b2Joint_GetTorqueThreshold(this.jID);
		}
		set torqueThreshold(val) {
			b2Joint_SetTorqueThreshold(this.jID, val);
		}

		onStrain() {
			this.spriteA.speed = 0;
			this.spriteA.rotationSpeed = 0;

			this.spriteB.speed = 0;
			this.spriteB.rotationSpeed = 0;

			this.delete();
		}

		_setOffsetA(x, y) {
			const a = this.spriteA,
				vec = scaleTo(a.x + x, a.y + y),
				t = new b2Transform();

			t.p = b2Body_GetLocalPoint(a.bdID, vec);
			b2Joint_SetLocalFrameA(this.jID, t);
			b2Joint_WakeBodies(this.jID);

			this._oAx = x;
			this._oAy = y;
		}

		_setOffsetB(x, y) {
			const a = this.spriteA,
				vec = scaleTo(a.x + x, a.y + y),
				t = new b2Transform();

			t.p = b2Body_GetLocalPoint(this.spriteB.bdID, vec);
			b2Joint_SetLocalFrameB(this.jID, t);
			b2Joint_WakeBodies(this.jID);

			this._oBx = x;
			this._oBy = y;
		}

		get offsetA() {
			return this._offsetA;
		}
		set offsetA(val) {
			const x = val[0] ?? val.x,
				y = val[1] ?? val.y;

			this._setOffsetA(x, y);
		}

		get offsetB() {
			return this._offsetB;
		}
		set offsetB(val) {
			const x = val[0] ?? val.x,
				y = val[1] ?? val.y;

			this._setOffsetB(x, y);
		}

		_springMap(val) {
			if (val > 0) {
				if (val < 0.1) {
					val = $.map(val, 0, 0.1, 30, 4);
				} else if (val < 0.5) {
					val = $.map(val, 0.1, 0.5, 4, 2.5);
				} else if (val < 0.8) {
					val = $.map(val, 0.5, 0.8, 2.5, 1);
				} else if (val < 0.9) {
					val = $.map(val, 0.8, 0.9, 1, 0.5);
				} else {
					val = $.map(val, 0.9, 1.0, 0.5, 0.2);
				}
			}
			return val;
		}

		delete() {
			if (this._deleted) return;

			const a = this.spriteA,
				b = this.spriteB;

			a.joints.splice(a.joints.indexOf(this), 1);
			b.joints.splice(b.joints.indexOf(this), 1);

			b2DestroyJoint(this.jID, true);

			this._deleted = true;
		}
	};

	$.GlueJoint = class extends $.Joint {
		constructor(spriteA, spriteB) {
			super(spriteA, spriteB, 'glue');
		}

		get springiness() {
			return Box2D.b2WeldJoint_GetLinearHertz(this.jID);
		}
		set springiness(val) {
			val = this._springMap(val);
			Box2D.b2WeldJoint_SetLinearHertz(this.jID, val);
			Box2D.b2WeldJoint_SetAngularHertz(this.jID, val);
		}

		get damping() {
			return Box2D.b2WeldJoint_GetLinearDampingRatio(this.jID);
		}
		set damping(val) {
			Box2D.b2WeldJoint_SetLinearDampingRatio(this.jID, val);
			Box2D.b2WeldJoint_SetAngularDampingRatio(this.jID, val);
		}
	};

	$.DistanceJoint = class extends $.Joint {
		constructor(spriteA, spriteB) {
			super(spriteA, spriteB, 'distance');

			let j = this._init(b2DefaultDistanceJointDef());
			this.jID = b2CreateDistanceJoint(wID, j);
			jointDict[this.jID.index1] = this;

			this.length = $.dist(spriteA.x, spriteA.y, spriteB.x, spriteB.y);
			this.springEnabled = true;
		}

		get currentLength() {
			return Box2D.b2DistanceJoint_GetCurrentLength(this.jID) * meterSize;
		}

		get length() {
			return Box2D.b2DistanceJoint_GetLength(this.jID) * meterSize;
		}
		set length(val) {
			Box2D.b2DistanceJoint_SetLength(this.jID, val / meterSize);
		}

		get limitEnabled() {
			return Box2D.b2DistanceJoint_IsLimitEnabled(this.jID);
		}
		set limitEnabled(val) {
			return Box2D.b2DistanceJoint_EnableLimit(this.jID, val);
		}

		get minLength() {
			return Box2D.b2DistanceJoint_GetMinLength(this.jID) * meterSize;
		}

		get maxLength() {
			return Box2D.b2DistanceJoint_GetMaxLength(this.jID) * meterSize;
		}

		set lengthRange(val) {
			this.limitEnabled = true;
			Box2D.b2DistanceJoint_SetLengthRange(this.jID, val[0] / meterSize, val[1] / meterSize);
		}

		get springEnabled() {
			return Box2D.b2DistanceJoint_IsSpringEnabled(this.jID);
		}
		set springEnabled(val) {
			return Box2D.b2DistanceJoint_EnableSpring(this.jID, val);
		}

		get springiness() {
			return Box2D.b2DistanceJoint_GetSpringHertz(this.jID);
		}
		set springiness(val) {
			val = this._springMap(val);
			Box2D.b2DistanceJoint_SetSpringHertz(this.jID, val);
		}

		get damping() {
			return Box2D.b2DistanceJoint_GetSpringDampingRatio(this.jID);
		}
		set damping(val) {
			Box2D.b2DistanceJoint_SetSpringDampingRatio(this.jID, val);
		}

		get motorEnabled() {
			return Box2D.b2DistanceJoint_IsMotorEnabled(this.jID);
		}
		set motorEnabled(val) {
			Box2D.b2DistanceJoint_EnableMotor(this.jID, val);
		}

		get speed() {
			return Box2D.b2DistanceJoint_GetMotorSpeed(this.jID) * meterSize;
		}
		set speed(val) {
			Box2D.b2DistanceJoint_SetMotorSpeed(this.jID, val / meterSize);
		}

		get maxPower() {
			return Box2D.b2DistanceJoint_GetMaxMotorForce(this.jID) * meterSize;
		}
		set maxPower(val) {
			Box2D.b2DistanceJoint_SetMaxMotorForce(this.jID, val / meterSize);
		}

		get motorForce() {
			return Box2D.b2DistanceJoint_GetMotorForce(this.jID) * meterSize;
		}
	};

	$.WheelJoint = class extends $.Joint {
		constructor(spriteA, spriteB) {
			super(spriteA, spriteB, 'wheel');

			let j = pl.WheelJoint(
				{
					maxMotorTorque: 1000,
					frequencyHz: 4,
					dampingRatio: 0.7
				},
				spriteA.body,
				spriteB.body,
				spriteB.body.getWorldCenter(),
				new b2Vec2(0, 1)
			);
			this._createJoint(j);
			this._angle = $._angleMode == DEGREES ? 90 : 1.5707963267948966;
		}

		_display() {
			let xA = this.spriteA.x;
			let yA = this.spriteA.y;

			let xB, yB;
			if (!this.offsetB.x && !this.offsetB.y) {
				xB = this.spriteB.x;
				yB = this.spriteB.y;
			} else {
				let ancB = this.spriteB.body.getWorldPoint(this._j.m_localAnchorB);
				ancB = scaleFrom(ancB.x, ancB.y);
				xB = ancB.x;
				yB = ancB.y;
			}

			// Calculate the slopes of the lines
			let slopeA = $.tan(this.spriteA.rotation);
			let slopeB = $.tan(this._angle + this.spriteA.rotation);

			// Calculate the intersection point
			let xI = (yB - yA + slopeA * xA - slopeB * xB) / (slopeA - slopeB);
			let yI = slopeA * (xI - xA) + yA;

			this._draw(xI, yI, xB, yB);
			this.visible = null;
		}

		get angle() {
			return this._angle;
		}
		set angle(val) {
			if (val == this._angle) return;
			this._angle = val;
			this._j.m_localXAxisA = new b2Vec2($.cos(val), $.sin(val));
			this._j.m_localXAxisA.normalize();
			this._j.m_localYAxisA = b2Vec2.crossNumVec2(1.0, this._j.m_localXAxisA);
		}
	};

	$.HingeJoint = class extends $.Joint {
		constructor(spriteA, spriteB) {
			super(spriteA, spriteB, 'hinge');

			let j = pl.RevoluteJoint({}, spriteA.body, spriteB.body, spriteA.body.getWorldCenter());
			this._createJoint(j);
		}

		_display() {
			const offsetAx = this.offsetA.x;
			const offsetAy = this.offsetA.y;
			const rotationA = this.spriteA.rotation;

			const rotatedOffsetAx = offsetAx * $.cos(rotationA) - offsetAy * $.sin(rotationA);
			const rotatedOffsetAy = offsetAx * $.sin(rotationA) + offsetAy * $.cos(rotationA);

			this._draw(this.spriteA.x + rotatedOffsetAx, this.spriteA.y + rotatedOffsetAy);
			this.visible = null;
		}

		get range() {
			return this.upperLimit - this.lowerLimit;
		}
		set range(val) {
			val /= 2;
			this.upperLimit = val;
			this.lowerLimit = -val;
		}

		get lowerLimit() {
			let val = this._j.getLowerLimit();
			if ($._angleMode == 'radians') return val;
			return $.degrees(val);
		}
		set lowerLimit(val) {
			if (!this._j.isLimitEnabled()) {
				this._j.enableLimit(true);
			}
			this.spriteA.body.setAwake(true);
			this.spriteB.body.setAwake(true);
			if ($._angleMode == DEGREES) val *= $._DEGTORAD;
			this._j.m_lowerAngle = val;
		}

		get upperLimit() {
			let val = this._j.getUpperLimit();
			if ($._angleMode == 'radians') return val;
			return $.degrees(val);
		}
		set upperLimit(val) {
			if (!this._j.isLimitEnabled()) {
				this._j.enableLimit(true);
			}
			this.spriteA.body.setAwake(true);
			this.spriteB.body.setAwake(true);
			if ($._angleMode == DEGREES) val *= $._DEGTORAD;
			this._j.m_upperAngle = val;
		}

		get angle() {
			let ang = this._j.getJointAngle();
			if ($._angleMode == 'radians') return ang;
			return ang * $._DEGTORAD;
		}
	};
	$.RevoluteJoint = $.HingeJoint;

	$.SliderJoint = class extends $.Joint {
		constructor(spriteA, spriteB) {
			super(spriteA, spriteB, 'slider');

			let j = pl.PrismaticJoint(
				{
					lowerTranslation: -1,
					upperTranslation: 1,
					enableLimit: true,
					maxMotorForce: 50,
					motorSpeed: 0,
					enableMotor: true
				},
				spriteA.body,
				spriteB.body,
				spriteA.body.getWorldCenter(),
				new b2Vec2(1, 0)
			);
			this._createJoint(j);
			this._angle = 0;
		}

		get angle() {
			return this._angle;
		}
		set angle(val) {
			if (val == this._angle) return;
			this._angle = val;
			this._j.m_localXAxisA = new b2Vec2($.cos(val), $.sin(val));
			this._j.m_localXAxisA.normalize();
			this._j.m_localYAxisA = b2Vec2.crossNumVec2(1.0, this._j.m_localXAxisA);
		}

		get range() {
			return this.upperLimit - this.lowerLimit;
		}
		set range(val) {
			val /= 2;
			this.upperLimit = val;
			this.lowerLimit = -val;
		}

		get lowerLimit() {
			return this._j.getLowerLimit() * meterSize;
		}
		set lowerLimit(val) {
			if (!this._j.isLimitEnabled()) {
				this._j.enableLimit(true);
			}
			val = val / meterSize;
			this._j.setLimits(val, this._j.getUpperLimit());
		}

		get upperLimit() {
			return this._j.getUpperLimit() * meterSize;
		}
		set upperLimit(val) {
			if (!this._j.isLimitEnabled()) {
				this._j.enableLimit(true);
			}
			val = val / meterSize;
			this._j.setLimits(this._j.getLowerLimit(), val);
		}
	};
	$.PrismaticJoint = $.SliderJoint;

	$.RopeJoint = class extends $.Joint {
		constructor(spriteA, spriteB) {
			super(spriteA, spriteB, 'rope');

			let j = pl.RopeJoint(
				{
					maxLength: 1
				},
				spriteA.body,
				spriteB.body,
				spriteA.body.getWorldCenter()
			);
			this._createJoint(j);
			this._j.m_localAnchorB.x = 0;
			this._j.m_localAnchorB.y = 0;
		}

		get maxLength() {
			return this._j.getMaxLength() * meterSize;
		}
		set maxLength(val) {
			this._j.setMaxLength(val / meterSize);
		}
	};

	$.GrabberJoint = class extends $.Joint {
		constructor(sprite) {
			super(sprite, sprite, 'grabber');

			let bd = b2DefaultBodyDef();
			bd.type = bodyTypes[2]; // KIN
			bd.enableSleep = false;

			this._target = { x: 0, y: 0, bdID: b2CreateBody(wID, bd) };

			let j = b2DefaultMotorJointDef();
			j.base.bodyIdA = this._target.bdID;
			j.base.bodyIdB = sprite.bdID;
			j.linearHertz = 7.5;
			j.linearDampingRatio = 1.0;

			let data = b2Body_GetMassData(sprite.bdID);

			let mg = data.mass * Math.abs($.world.gravity.y);
			j.maxSpringForce = 100 * mg;

			if (data.mass) {
				let lever = Math.sqrt(data.rotationalInertia / data.mass);
				j.maxVelocityTorque = 0.25 * lever * mg;
			}

			this.jID = b2CreateMotorJoint(wID, j);
		}

		_draw() {
			$.line(this.spriteA.x, this.spriteA.y, this._target.x, this._target.y);
		}

		get target() {
			return this._target;
		}
		set target(pos) {
			let x = pos[0] ?? pos.x ?? 0,
				y = pos[1] ?? pos.y ?? 0;

			this._target.x = x;
			this._target.y = y;

			let t = new b2Transform();
			t.p = scaleTo(x, y);
			t.q = ZERO_ROT;

			b2Body_SetTargetTransform(this._target.bdID, t, $.world._timeStep);

			// b2Body_SetTransform(this._target.bdID, scaleTo(x, y), b2Rot_identity);
		}

		get maxForce() {
			return Box2D.b2MotorJoint_GetMaxSpringForce(this.jID);
		}
		set maxForce(val) {
			Box2D.b2MotorJoint_SetMaxSpringForce(this.jID, val);
		}
	};

	class Scale {
		constructor() {
			let _this = this;
			Object.defineProperties(this, {
				x: {
					get() {
						return _this._x;
					},
					set(val) {
						if (val == _this._x) return;
						_this._x = val;
						_this._avg = (_this._x + _this._y) * 0.5;
					},
					configurable: true,
					enumerable: true
				},
				y: {
					get() {
						return _this._y;
					},
					set(val) {
						if (val == _this._y) return;
						_this._y = val;
						_this._avg = (_this._x + _this._y) * 0.5;
					},
					configurable: true,
					enumerable: true
				},
				_x: {
					value: 1,
					enumerable: false,
					writable: true
				},
				_y: {
					value: 1,
					enumerable: false,
					writable: true
				},
				_avg: {
					value: 1,
					enumerable: false,
					writable: true
				}
			});
		}

		valueOf() {
			return this._avg;
		}
	}

	function isArrowFunction(fn) {
		return !/^(?:(?:\/\*[^(?:\*\/)]*\*\/\s*)|(?:\/\/[^\r\n]*))*\s*(?:(?:(?:async\s(?:(?:\/\*[^(?:\*\/)]*\*\/\s*)|(?:\/\/[^\r\n]*))*\s*)?function|class)(?:\s|(?:(?:\/\*[^(?:\*\/)]*\*\/\s*)|(?:\/\/[^\r\n]*))*)|(?:[_$\w][\w0-9_$]*\s*(?:\/\*[^(?:\*\/)]*\*\/\s*)*\s*\()|(?:\[\s*(?:\/\*[^(?:\*\/)]*\*\/\s*)*\s*(?:(?:['][^']+['])|(?:["][^"]+["]))\s*(?:\/\*[^(?:\*\/)]*\*\/\s*)*\s*\]\())/.test(
			fn.toString()
		);
	}

	/*
	 * Checks if the given string is a valid physics body type.
	 */
	function isPhysicsType(t) {
		if (t == 'd' || t == 's' || t == 'k') return true;
		let abr = t.slice(0, 2);
		return abr == 'dy' || abr == 'st' || abr == 'ki';
	}

	/*
	 * Returns an array with the line length, angle, and number of sides
	 * of a regular polygon, which is used internally to create a Sprite
	 * using line mode.
	 */
	function getRegularPolygon(lineLength, name) {
		let l = lineLength;
		let n = name.toLowerCase();
		if (n == 'triangle') l = [l, -120, 3];
		else if (n == 'square') l = [l, -90, 4];
		else if (n == 'pentagon') l = [l, -72, 5];
		else if (n == 'hexagon') l = [l, -60, 6];
		else if (n == 'septagon') l = [l, -51.4285714286, 7];
		else if (n == 'octagon') l = [l, -45, 8];
		else if (n == 'enneagon') l = [l, -40, 9];
		else if (n == 'decagon') l = [l, -36, 10];
		else if (n == 'hendecagon') l = [l, -32.7272727273, 11];
		else if (n == 'dodecagon') l = [l, -30, 12];
		if (l == lineLength) throw new Error('Invalid, not a regular polygon: ' + name);
		return l;
	}

	// default color palettes
	$.q5play.palettes = [
		{
			a: 'aqua',
			b: 'black',
			c: 'crimson',
			d: 'darkviolet',
			e: 'peachpuff',
			f: 'olive',
			g: 'green',
			h: 'hotpink',
			i: 'indigo',
			j: 'navy',
			k: 'khaki',
			l: 'lime',
			m: 'magenta',
			n: 'brown',
			o: 'orange',
			p: 'pink',
			q: 'turquoise',
			r: 'red',
			s: 'skyblue',
			t: 'tan',
			u: 'blue',
			v: 'violet',
			w: 'white',
			x: 'gold',
			y: 'yellow',
			z: 'gray'
		}
	];

	$.colorPal = (c, palette) => {
		if (c instanceof p5.Color) return c;
		if (typeof palette == 'number') {
			palette = $.q5play.palettes[palette];
		}
		palette ??= $.q5play.palettes[0];
		let clr = palette[c];
		if (!clr) return $.color(0, 0, 0, 0);
		return $.color(clr);
	};

	$.EmojiImage = function (emoji, textSize) {
		textSize *= $.q5play.emojiScale;
		let size = textSize * 1.25;
		let g = $.createGraphics(size, size, $.P2D);
		g.textSize(textSize);
		g.textAlign($.CENTER);
		g.textFont(!$.canvas.webgpu ? $.textFont() : $._g.textFont());
		g.text(emoji, size / 2, textSize);

		// same code as img.trim() in q5.js
		let ctx = g.drawingContext;
		let pd = g._pixelDensity || 1;
		let w = g.canvas.width;
		let h = g.canvas.height;
		let data = ctx.getImageData(0, 0, w, h).data;
		let left = w,
			right = 0,
			top = h,
			bottom = 0;

		let i = 3;
		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				if (data[i] !== 0) {
					if (x < left) left = x;
					if (x > right) right = x;
					if (y < top) top = y;
					if (y > bottom) bottom = y;
				}
				i += 4;
			}
		}
		top = Math.floor(top / pd);
		bottom = Math.floor(bottom / pd);
		left = Math.floor(left / pd);
		right = Math.floor(right / pd);

		g = g.get(left, top, right - left + 1, bottom - top + 1);
		g.src = emoji;
		return g;
	};

	$.spriteArt = (txt, scale, palette) => {
		scale ??= 1;
		if (typeof palette == 'number') {
			palette = $.q5play.palettes[palette];
		}
		palette ??= $.q5play.palettes[0];
		let lines = txt; // accepts 2D arrays of characters
		if (typeof txt == 'string') {
			txt = txt.trim();
			txt = txt.replace(/\r*\n\t+/g, '\n'); // trim leading tabs
			txt = txt.replace(/\s+$/g, ''); // trim trailing whitespace
			lines = txt.split('\n');
		}
		let w = 0;
		for (let line of lines) {
			if (line.length > w) w = line.length;
		}
		let h = lines.length;
		let img = $.createImage(w * scale, h * scale);
		img.loadPixels();

		for (let i = 0; i < lines.length; i++) {
			for (let j = 0; j < lines[i].length; j++) {
				for (let sX = 0; sX < scale; sX++) {
					for (let sY = 0; sY < scale; sY++) {
						let c = this.colorPal(lines[i][j], palette);
						img.set(j * scale + sX, i * scale + sY, c);
					}
				}
			}
		}
		img.updatePixels();
		img.w = img.width;
		img.h = img.height;
		$.q5play.onImageLoad(img);
		return img; // return the p5 graphics object
	};

	$.parseTextureAtlas = function (xml) {
		let doc = xml.DOM || (xml instanceof Document ? xml : new DOMParser().parseFromString(xml.text || xml, 'text/xml'));
		let subTextures = doc.querySelectorAll('SubTexture'),
			atlas = {};
		for (let st of subTextures) {
			// remove file extension
			let name = st.getAttribute('name').replace(/\.[^/.]+$/, '');
			atlas[name] = {
				x: Number(st.getAttribute('x')),
				y: Number(st.getAttribute('y')),
				width: Number(st.getAttribute('width')),
				height: Number(st.getAttribute('height'))
			};
		}
		return atlas;
	};

	$.animation = function (ani, dx, dy, dw, dh) {
		// Draw the current frame
		let img = ani[ani._frame];
		if (img !== undefined) {
			if (ani.spriteSheet) {
				let { x, y, w, h } = img; // image info
				if (!ani._spriteSheetDemo) {
					$.image(ani.spriteSheet, dx, dy, dw || img.defaultWidth || w, dh || img.defaultHeight || h, x, y, w, h);
				} else {
					$.image(
						ani.spriteSheet,
						dx,
						dy,
						dw || ani.spriteSheet.w,
						dh || ani.spriteSheet.h,
						x - ani.spriteSheet.w / 2 + w / 2,
						y - ani.spriteSheet.h / 2 + h / 2
					);
				}
			} else $.image(img, dx, dy, dw, dh);
		} else {
			console.warn(
				'q5play: "' +
					ani.name +
					'"' +
					' animation not loaded yet or frame ' +
					ani._frame +
					" doesn't exist. Load this animation in the preload function if you need to use it at the start of your program."
			);
		}

		// don't update if paused or no frames
		if (!ani.playing || !ani.length) return;

		ani._cycles++;

		if (ani._cycles % ani.frameDelay == 0) {
			ani._cycles = 0;
			ani.frameChanged = true;

			if ((ani.targetFrame == -1 && ani._frame == ani.lastFrame) || ani._frame == ani.targetFrame) {
				if (ani.endOnFirstFrame) ani._frame = 0;
				if (ani.looping) ani.targetFrame = -1;
				else ani.playing = false;
				if (ani._onComplete) ani._onComplete();
				if (!ani.looping) return;
			}

			//going to target frame up
			if (ani.targetFrame > ani._frame && ani.targetFrame !== -1) {
				ani._frame++;
			}
			//going to target frame down
			else if (ani.targetFrame < ani._frame && ani.targetFrame !== -1) {
				ani._frame--;
			} else if (ani.targetFrame === ani._frame && ani.targetFrame !== -1) {
				ani.playing = false;
			} else if (ani.looping) {
				//advance frame
				//if next frame is too high
				if (ani._frame >= ani.lastFrame) {
					ani._frame = 0;
				} else ani._frame++;
			} else {
				//if next frame is too high
				if (ani._frame < ani.lastFrame) ani._frame++;
			}
		} else {
			ani.frameChanged = false;
		}
	};

	$.delay = (milliseconds) => {
		if (!milliseconds) return new Promise(requestAnimationFrame);
		// else it wraps setTimeout in a Promise
		return new Promise((resolve) => {
			setTimeout(resolve, milliseconds);
		});
	};

	async function playIntro() {
		if (document.getElementById('made-with-q5play')) return;
		if (!using_p5v2) $._incrementPreload();
		let d = document.createElement('div');
		d.id = 'made-with-q5play';
		d.style = 'position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 1000; background-color: black;';
		let logo = document.createElement('img');
		logo.style = `position: absolute; top: 50%; left: 50%; width: 80vmin; height: 40vmin; margin-left: -40vmin; margin-top: -20vmin; z-index: 1001; opacity: 1; scale: 1; transition: scale 1.5s, opacity 0.4s ease-in-out;`;
		logo.onerror = () => {
			logo.style.imageRendering = 'pixelated';
			logo.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACACAYAAADktbcKAAABc2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAACiRfZC9S8NQFMWPVSloHUSHDg6ZxCFqaQW7OLQViiIYqoLVKU2/hCQ+kohU3MRVCv4HVnAWHCwiFVwcHATRQUQ3p04KXbQ870uUdNH7uLwfh3MP710gEFYZ03sAGKZjZdJJaTW7JgXf0EXHLVWzWUJRFgT/3h1Frtaj570fF1nNdu0gvp++Ns4uF3eewpP4v/ryBVuj+4s6ojHLoUiZWNl2mOBd4mGLHkVcFVzy+FhwzuNz17OcSRHfEktaWc0TN4nlXIde6mBD39L8PyBUMFeWRA71CGaxARsMOlRUIEFB7A//lOtPYZPcFVg0V0IZDs0kSBEJBeI5mNAwAZk4igh1VOzZi2s9/OxP9rW9V2CmwTm/8LX5BnA6TSur+9pYHBjsB27qTLVUV+qmDhSLwPsJMJAFhu5oZt0uxqLe60NJoPeF849RIHgItKucfx5x3q7R8DNwZX4DGP5qvdREziwAAAn3SURBVHic7Z29cqQ6EIXF1s1uuvm+jvN9zsnndZw7dcwNbHwxBqm71X9C56ty1dbODGqEzlFLCFEKAAAAAOZjiQ4AAAnruq7RMWwsyzKsjoYNHMxJJuEfGdEIhgsYzEtm8W+MZgJDBQvmZQTxb4xkAsMECuZlJPFvjGICQwQJ5mVE8W+MYAL/RAcAwBUs8f/71zCSHe8Pn3KcSO9QYF6aBuAl+isIZpA9C/gVHQAAZ6QXf5YYOoEBgPHIJLxGLNnnMGAAAEwMDACkI3uveSdgAGAsMqX/GwMPA2AAAEwMDACkInNveUdgAGAcMqb/G4MOA2AAAEwMDACkIWsveWdgAGAMMqf/GwMOA/AwELgNz1fbB3Ve/gxgQkyQAYAU9PaO1uL3KsMbGADITyO19hRms6zBhgEwABBONlFYk+l8SXMAmQIGIJrn66N7PkBLU737DVQzgPWTngIA6CJR+k/G8Y5Fr0ZPMwCIHoCx2DTLzQh+ZAAQPwBtUmYeha/fbwYA8YNUjJj+bwQuXOLo+GsIAPGDu/Lym/f955tNHBn5VQrED8AeqmFkzkComr7NUuD93Med/SzdeQalulTxcXt/VSzrhrAl+bqua2tS8DYGMBrH65JCzBxGeDjnzmz13/mikl9I/wH4yTDDgM6lx8gAEpIuzT8S3PsPkf4PAgwgiJTCBtOBh4EAj4nG/jMMA8gZwDEtrU1icSa4zr7bSoGlE2g9E2/UmKjxUv6vddyrY98ZpP+6iIYAVw211oiPDfPq7kTtroXkN5TfcUVzdj6UzyRlteLglh9FeC9pjNb5ee86pDoEkIjXmrMekmpGx99Ry+AeWxuzMoXp/8ji984kxHUlHAaIDeBMSJTPSjlvoBa/Ofv+2b8lSETfKvPsfCj1nLHH34gQ/+jpv2ediQygJiSJyLx+syzLtz8ulPE99TNtMpsAyAvuAnSgNRE6BIL0f+TUPxpR3QmGAVMZwD5lPv5xjsH5f+CLRfo/+pCiRgoD2PeW1LRZ8puzY0iHAxxgDiArIQZwNZauCVHym+PveucAarFQPhuWQdJ/y546IgvwGAaEZQCSVFqafvd+3mI6Q5iUOw4FyAuBpI1cW9BWJsClV/Se9XlnvEW5lXeXXYMWPA4Mqhim/3fsUTlQTUS0OrCyT8B+k5AUk4AAAD/2nT4MAICJgQGAa5D+m2L6uDHx2sEAAJiQbRgAAwBgYmAA4JxBFv+MTvQwAAYA3MH4Pwfruq4wAAAmBgYAfjLRxp8ZiBwGwACACrj9NyYwAAAmBi8G4XCVTnW+n20mtvXvyAQ+4D5U9Hx9qO4cjAwAhHCXp+l6yFAHeTIAycRTkp4XvZqM59u8dSYVv/Z7A5ABgJ84GuvzLUdP6IX7+Tau5dAGMFvjcYVpAr090wzXsfcc2XVMuIZDGwAwJsAE7moEGcW/LMvSPwdQG7vvgzh+zyrNrJVDjdUCStln36l9dvwOp1zq+b4/WPMzW0PteS7gTnMD7sIvhdWW5QZAaRSdK8pUHi6hxrB9T9sIqPVkYUBaK/qYJlDKR8Od3QQyi3/bFkxmAAoNK+3MuaYYOfV08d2veqqIkFuXz9dHKdz6p2QiB3qzgbRtpIHGMMYi5T+DbwAB68TdG4CGCTjWU29vywLZQJXMvf7GflNQngE4i/+yMjxuU/WYgFU9ccRnea2E2QD2C6jj0esvhzfiqC4E2l9g1slwG2uHODkxWvQ8RxFoLezYBNaK99v5956b4wThSFmABGvxH4W/Qb8N2LjQx4tq7vYKO9a0Ynz585ef0lXiOiuPXU9JVj9+IYhHezVbFiTp/8ufv2HiL0VpHcCPXu33p1tH3lo7EBbjRflWMTzfyvVkoWbvv+f94b5mICPcOhUJX1H8pRg8CyBqWJ8ndeWg1YoSDAe4MWqnn1apd/g4WzAkmHUfgYjx/hmqKwGtLtLz9VFtKJzU624NiYpZ738k2xDlDgh6fYr4S8n0NGDpa5ijTBKpxVjJAsIR3CW4Cy+/aR0S6bl+o15/j0oGcHkinFtWxz9lumO0Kt8xhlKcTbLRgGdN/y3g9Pp76AbQuJg/Gnhvo/YwAeadDRKVejo1AQfxh80LTJgBRCAR/obuEED7gu8n+LSOHd0oNcsXrMoD9qgOA4zhDQGsJnhaT7Mx761r4DZpZkzW80D6T4Bg7j29fynYD8AGz5nwrLPuyEyGgG8AEVnABVa9m8pxEwgza+8/A6Yv+1BElgEIViRRj0upkNa6ACnqxyWez1b2LCD9Z2CcSfVNAr4//n9mezeZIX4oqHxOoHz+/uqYZ79pcRUT67iNFYtXx6jVx/4zzVc/hfb+SP/dWNd1Db0LsM14avZg1GNKG7bVcVvHo55T1WAgrtsReTdA5TbgXjD7xtsjJItj1o7LObY0hr0R1I7Xe46Zx/4Z0n/pdedCvR3YxGrLuJLlYaCAY1oeN2u5LiTOUK7EOOrWYxs9wwDcBrwZmXv/SEgLc266JXkNGMBNsLozoklUfBxhR72bIKpu7J8GFMycD1VeMFcNJ6T3V0z/NdLynjbQ+3SpevtrzANIhwGpHgcGBAgGd6fUXypEDQFGlu3FUsqHe0QHAnh4zWSzIGQAPakuab2HkfjIK/s6yu/dH0CSAcAAgA7E9L93rFsTonXPa1k2eR1AxQTE+wH0PlEEABWrtwh7pN1WZWstApJ05F/CRxYAumBOAGrMeqsttAksW3tzUG5n/u3LMAEgomP2P/utSyu6en3FYcC3dQAYCgBvotbAi17IoVh2Fk4Fj0wAsNB4W7RTJnAlvujyWShmANUvwwgACc0FQIZCbL4LMrBsFl4GcASGAC5JbgIcAWqX7yX+UowNAMxNtQMweApQ5U6BUHxaJqA+3ocBgCiaGWAyE+hecxBY9ilWKwEBoDKCCWiLL7r8UgppQxAYADCHPA8UZARWt9jCyibuBIQNQYAL5IZmsIVVS2CW99dDynbYWh4ZABARmQmU0rfzdCml65Vz3WVTYIi/ZwEfDACIYd0WzrRX4FFcmWNr0Lt6FwYAuhjKBFriyh7fAY2l+zAA0A17gViE0KjiijKBAPGXAgMASqQ2Aclkmld8QcL/Op7mwQBINSTonUVPFp/F07owAKBOimxA6xZaktisHtWHAQATwkzA6t55UHzWe3TAAIAprkMC64UzzvF5bNADAwDmuGQDDqvmSilusXntzgUDAC6YmYCSuLLE570tHwwAuKIqNGVxqZtAcvGXAgMAAYh2ltqLzTil7jIC4VAkakNeGAAIw2uLOYm4MsemWn5k4QBYCq1XXNYmEC3+UmAAIAEWQtMUl3Z8GYS/kSYQALSEZiGwzLH1kCoYAHqE5iEuaXzZhL+RMigAOEKLEFf2+KikDQyAUupCyyCsq/gyxAYAAFX+AyqVmTiXMeeKAAAAAElFTkSuQmCC`;
		};
		let src = window._q5play_intro_image;
		if (src == '' || src?.includes('made_with_q5play')) {
			if (src.includes('bit.') || src.includes('pixel')) {
				logo.style.imageRendering = 'pixelated';
			}
			logo.src = src;
		} else {
			logo.src = 'https://q5play.org/assets/made_with_q5play.webp';
		}
		await new Promise((r) => (logo.onload = r));
		d.append(logo);
		document.body.append(d);
		await $.delay();
		logo.offsetHeight; // trigger css reflow
		logo.style.scale = 1.2;
		await $.delay(1100);
		logo.style.opacity = 0;
		await $.delay(400);
		d.style.display = 'none';
		d.remove();
		document.getElementById('made-with-q5play')?.remove();
		if (!using_p5v2) $._decrementPreload();
	}

	if (window.location) {
		let lh = location.hostname;
		switch (lh) {
			case '':
			case '127.0.0.1':
			case 'localhost':
			case 'q5play.org':
			case 'q5play-web.pages.dev':
			case 'editor.p5js.org':
			case 'codepen.io':
			case 'aug4th.com':
			case 'cdpn.io':
			case 'glitch.com':
			case 'replit.com':
			case 'stackblitz.com':
			case 'jsfiddle.net':
			case 'codevre.com':
			case 'preview.codevre.com':
			case 'quintos-org.github.io':
				break;
			default:
				if (
					/^[\d\.]+$/.test(lh) ||
					lh.endsWith('.lan') ||
					lh.endsWith('.local') ||
					lh.endsWith('stackblitz.io') ||
					lh.endsWith('glitch.me') ||
					lh.endsWith('replit.dev') ||
					lh.endsWith('openprocessing.org') ||
					location.origin.endsWith('preview.p5js.org')
				) {
					break;
				}
				playIntro();
		}
	}

	let userDisabledP5Errors = p5.disableFriendlyErrors;
	p5.disableFriendlyErrors = true;

	let didCreateCanvas = false;

	const _createCanvas = $.createCanvas;

	$.createCanvas = function () {
		let args = [...arguments];

		// prevent p5.js v1 overriding the user's canvas with a new default canvas
		if (didCreateCanvas && args[0] == 100 && args[1] == 100) return;

		let display, renderQuality, displayScale;
		if (typeof args[0] == 'string') {
			if (args[0].includes(':')) {
				let ratio = args[0].split(':');
				let rW = Number(ratio[0]);
				let rH = Number(ratio[1]);
				let w = window.innerWidth;
				let h = window.innerWidth * (rH / rW);
				if (h > window.innerHeight) {
					w = window.innerHeight * (rW / rH);
					h = window.innerHeight;
				}
				args[0] = Math.round(w);
				args.splice(1, 0, Math.round(h));
				display = 'maxed';
			} else {
				args = [0, 0, ...args];
			}
		}
		if (!args[0]) {
			args[0] = window.innerWidth;
			args[1] = window.innerHeight;
			display = 'maxed';
		}
		if (typeof args[2] == 'string') {
			let rend = args[2].toLowerCase().split(' ');
			if (rend[0] == 'pixelated') {
				renderQuality = 'pixelated';
				if (!rend[1]) display = 'maxed';
				else {
					display = 'centered';
					displayScale = Number(rend[1].slice(1));
				}
				args.splice(2, 1);
			} else if (rend[0] == 'maxed') {
				display = 'maxed';
				args.splice(2, 1);
			}
		}
		let rend = _createCanvas.call($, ...args);
		$.ctx = $.drawingContext;
		let c = rend.canvas || rend;
		window.canvas = c; // for p5 v2
		if (rend.GL) {
			c.renderer = 'webgl';
			$._webgl = true;
		} else if (!$._webgpu) $._c2d = true;
		c.tabIndex = 0;
		c.w = args[0];
		c.h = args[1];
		if (c.addEventListener) {
			c.addEventListener('keydown', function (e) {
				if (
					e.key == ' ' ||
					e.key == '/' ||
					e.key == 'ArrowUp' ||
					e.key == 'ArrowDown' ||
					e.key == 'ArrowLeft' ||
					e.key == 'ArrowRight'
				) {
					e.preventDefault();
				}
			});
			c.addEventListener('mouseover', () => {
				$.mouse.isOnCanvas = true;
				$.mouse.isActive = true;
			});
			c.addEventListener('mouseleave', () => {
				$.mouse.isOnCanvas = false;
			});
			c.addEventListener('wheel', (e) => {
				$.mouse.scrollDelta.x = e.deltaX;
				$.mouse.scrollDelta.y = e.deltaY;
			});
			c.addEventListener('touchstart', (e) => e.preventDefault());
			// this stops the right click menu from appearing
			c.addEventListener('contextmenu', (e) => e.preventDefault());
		}
		c.save ??= $.saveCanvas.bind($);
		c.resize ??= $.resizeCanvas.bind($);
		c.hw = c.w * 0.5;
		c.hh = c.h * 0.5;
		c.mouse = { x: $.mouseX, y: $.mouseY };
		if ($._c2d) {
			$.camera.x = $.camera.ogX = c.hw;
			$.camera.y = $.camera.ogY = c.hh;
		} else {
			$.camera.x = 0;
			$.camera.y = 0;
			if ($._webgpu) {
				let rs = $.q5play._renderStats;
				rs.x = -c.hw + 10;
				rs.y = -c.hh + 20;
			}
		}
		p5.disableFriendlyErrors = userDisabledP5Errors;

		$.displayMode(display, renderQuality, displayScale);

		let pointer = window.PointerEvent ? 'pointer' : 'mouse';
		c.addEventListener(pointer + 'down', onpointerdown);
		if (window) {
			window.addEventListener(pointer + 'move', onpointermove);
			window.addEventListener(pointer + 'up', onpointerup);
		}

		didCreateCanvas = true;
		return rend;
	};

	$.canvas = $.canvas;

	const _resizeCanvas = $.resizeCanvas;

	$.resizeCanvas = (w, h) => {
		w ??= window.innerWidth;
		h ??= window.innerHeight;
		_resizeCanvas.call($, w, h);
		let c = $.canvas;
		c.w = c.width / $.pixelDensity();
		c.h = c.height / $.pixelDensity();
		c.hw = c.w * 0.5;
		c.hh = c.h * 0.5;
		if (c.maxed) {
			if (c.w / c.h > window.innerWidth / window.innerHeight) {
				c.style.width = '100%!important';
				c.style.height = 'auto!important';
			} else {
				c.style.width = 'auto!important';
				c.style.height = '100%!important';
			}
		}
		if (c.c2d) {
			$.camera.x = c.hw;
			$.camera.y = c.hh;
		} else {
			$.camera.x = 0;
			$.camera.y = 0;
		}
	};

	const _frameRate = $.frameRate;

	$.frameRate = function (hz) {
		let ret = _frameRate.call($, hz);
		if (hz) $.world._setTimeStep();
		return ret;
	};

	let errMsgs = {
		generic: [
			'Ah! I found an error',
			'Oh no! Something went wrong',
			'Oof! Something went wrong',
			'Houston, we have a problem',
			'Whoops, having trouble here'
		],
		Sprite: {
			constructor: {
				base: "Sorry I'm unable to make a new Sprite",
				0: "What is $0 for? If you're trying to specify the x position of the sprite, please specify the y position as well.",
				1: "If you're trying to specify points for a chain Sprite, please use an array of position arrays.\n$0",
				2: 'Invalid input parameters: $0'
			},
			hw: {
				0: "I can't change the halfWidth of a Sprite directly, change the sprite's width instead."
			},
			hh: {
				1: "I can't change the halfHeight of a Sprite directly, change the sprite's height instead."
			},
			rotate: {
				0: "Can't use this function on a sprite with a static collider, try changing the sprite's collider type to kinematic.",
				1: 'Can\'t use "$0" for the angle of rotation, it must be a number.'
			},
			rotateTo: {},
			rotateMinTo: {},
			rotateTowards: {},
			changeAnimation: `I can't find any animation named "$0".`,
			collide: {
				0: "I can't make that sprite collide with $0. Sprites can only collide with another sprite or a group.",
				1: 'The collision callback has to be a function.',
				2: "You're trying to check for an collision with a sprite or group that doesn't exist!"
			},
			overlap: {
				0: "I can't make that sprite overlap with $0. Sprites can only overlap with another sprite or a group.",
				1: 'The overlap callback has to be a function.',
				2: "You're trying to check for an overlap with a sprite or group that doesn't exist!"
			}
		},
		Ani: {
			constructor: {
				base: "I tried to make a new Ani but couldn't",
				1: 'The name of the animation must be the first input parameter.',
				2: 'Make sure to set the sprite sheet image before adding animations from it.'
			},
			frame: 'Index $0 out of bounds. That means there is no frame $0 in this animation. It only has $1 frames!'
		},
		Group: {
			constructor: {
				base: "Hmm awkward! Well it seems I can't make that new Group you wanted"
			}
		}
	};
	errMsgs.Group.collide = errMsgs.Sprite.collide;
	errMsgs.Group.overlap = errMsgs.Sprite.overlap;
	errMsgs.Sprite.rotateTo[0] =
		errMsgs.Sprite.rotateMinTo[0] =
		errMsgs.Sprite.rotateTowards[0] =
			errMsgs.Sprite.rotate[0];

	class FriendlyError extends Error {
		constructor(func, errorNum, e) {
			super();

			if (typeof func != 'string') {
				e = errorNum;
				errorNum = func;
				func = this.stack.match(/\n\s*at ([^\(]*)/)[1];
				func = func.slice(0, -1);
			}
			if (typeof errorNum != 'number') {
				e = errorNum;
				errorNum = undefined;
			}
			if (func.slice(0, 3) == 'new') func = func.slice(4);
			func = func.split('.');
			let className = func[0];
			func = func[1] || 'constructor';

			let ln = this.stack.match(/\/([^p\/][^5][^\/:]*:[^\/:]+):/);
			if (ln) {
				ln = ln[1].split(':');
				ln = ' in ' + ln[0] + ' at line ' + ln[1];
			}
			ln = ' using ' + className + '.' + func + '. ';

			e = e || [];

			let m = errMsgs[className][func];
			let msg;
			if (m.base) msg = m.base + ln;
			else msg = errMsgs.generic[Math.floor(Math.random() * errMsgs.generic.length)] + ln;
			if (errorNum !== undefined) m = m[errorNum];
			if (m) {
				m = m.replace(/\$([0-9]+)/g, (m, n) => {
					return e[n];
				});
				msg += m;
			}

			Q5._friendlyError(msg, func);
		}
	}

	$.allSprites = new $.Group();
	$.world = new $.World();
	$.camera = new $.Camera();

	$.InputDevice = class {
		constructor() {
			this.holdThreshold = 12;

			this._default = 0;
		}

		/*
		 * Attempt to auto-correct the user's input. Inheriting classes
		 * override this method.
		 */
		_ac(inp) {
			return inp;
		}

		presses(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			return this[inp] == 1 || this[inp] == -3;
		}

		pressing(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			if (this[inp] == -3) return 1;
			return this[inp] > 0 ? this[inp] : 0;
		}

		pressed(inp) {
			return this.released(inp);
		}

		holds(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			return this[inp] == this.holdThreshold;
		}

		holding(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			return this[inp] >= this.holdThreshold ? this[inp] : 0;
		}

		held(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			return this[inp] == -2;
		}

		released(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			return this[inp] <= -1;
		}

		releases(inp) {
			return this.released(inp);
		}
	};

	$._Mouse = class extends $.InputDevice {
		constructor() {
			super();
			this._default = 'left';
			this._visible = true;
			this._cursor = 'default';
			this._ogX = 0;
			this._ogY = 0;

			this.x = 0;
			this.y = 0;
			this.canvasPos = {};
			this.isOnCanvas = false;
			this.isActive = false;
			this.left = 0;
			this.center = 0;
			this.right = 0;
			this.scroll = 0;
			this.scrollDelta = { x: 0, y: 0 };

			let _this = this;

			// this.x and this.y store the actual position values of the mouse
			this._pos = $.createVector.call($);

			Object.defineProperty(this._pos, 'x', {
				get() {
					return _this.x;
				},
				set(val) {
					_this.x = val;
				}
			});

			Object.defineProperty(this._pos, 'y', {
				get() {
					return _this.y;
				},
				set(val) {
					_this.y = val;
				}
			});

			this.drag = {
				left: 0,
				center: 0,
				right: 0
			};
			this._dragFrame = {
				left: false,
				center: false,
				right: false
			};
		}

		_ac(inp) {
			inp = inp.toLowerCase();
			if (inp.slice(0, 4) == 'left') inp = 'left';
			else if (inp.slice(0, 5) == 'right') inp = 'right';
			else if (inp.slice(0, 6) == 'middle') inp = 'center';
			return inp;
		}

		_update() {
			$.mouse.canvasPos.x = $.mouseX;
			$.mouse.canvasPos.y = $.mouseY;

			if ($.camera.x == $.camera.ogX && $.camera.y == $.camera.ogY && $.camera.zoom == 1) {
				this.x = $.mouseX;
				this.y = $.mouseY;
			} else if (!$._webgpu) {
				this.x = ($.mouseX - $.canvas.hw) / $.camera.zoom + $.camera.x;
				this.y = ($.mouseY - $.canvas.hh) / $.camera.zoom + $.camera.y;
			} else {
				this.x = $.mouseX / $.camera.zoom + $.camera.x;
				this.y = $.mouseY / $.camera.zoom + $.camera.y;
			}
		}

		get pos() {
			return this._pos;
		}
		get position() {
			return this._pos;
		}

		get cursor() {
			return $.canvas.style.cursor;
		}
		set cursor(val) {
			if (val != this._cursor) {
				$.cursor(val);
				this._cursor = val;
			}
		}

		get visible() {
			return this._visible;
		}
		set visible(val) {
			this._visible = val;
			if (val) $.canvas.style.cursor = 'default';
			else $.canvas.style.cursor = 'none';
		}

		drags(inp) {
			inp ??= this._default;
			return this.drag[inp] == 1;
		}
		dragging(inp) {
			inp ??= this._default;
			return this.drag[inp] > 0 ? this.drag[inp] : 0;
		}
		dragged(inp) {
			inp ??= this._default;
			return this.drag[inp] <= -1;
		}
	};

	$.mouse = new $._Mouse();

	let pressAmt = 0;

	let onpointerdown = function (e) {
		if (!$._setupDone) return;
		pressAmt++;

		if (!$._isQ5 && $.userStartAudio) $.userStartAudio();

		let btn = 'left';
		if (e.button === 1) btn = 'center';
		else if (e.button === 2) btn = 'right';

		$.mouse.isActive = true;
		$.mouse[btn]++;
		if ($.world.mouseSprites.length) {
			let msm = $.world.mouseSprite?.mouse;
			// old mouse sprite didn't have the mouse released on it
			if (msm) {
				msm[btn] = 0;
				msm.hover = 0;
				msm.drag[btn] = 0;
			}
			let ms = $.world.mouseSprites[0];
			$.world.mouseSprite = ms;
			msm = ms.mouse;
			msm[btn] = 1;
			if (msm.hover <= 0) msm.hover = 1;
		}
	};

	let onpointermove = function (e) {
		if (!$._setupDone) return;

		let btn = 'left';
		if (e.button === 1) btn = 'center';
		else if (e.button === 2) btn = 'right';

		let m = $.mouse;
		if (m[btn] > 0) m._dragFrame[btn] = true;
	};

	let onpointerup = function (e) {
		if (!$._setupDone) return;
		if (pressAmt > 0) pressAmt--;
		else return;

		let btn = 'left';
		if (e.button === 1) btn = 'center';
		else if (e.button === 2) btn = 'right';

		let m = $.mouse;
		if (m[btn] >= m.holdThreshold) m[btn] = -2;
		else if (m[btn] > 1) m[btn] = -1;
		else m[btn] = -3;

		if (m.drag[btn] > 0) m.drag[btn] = -1;

		let msm = $.world.mouseSprite?.mouse;
		if (!msm) return;

		if (msm.hover > 1) {
			if (msm[btn] >= $.mouse.holdThreshold) msm[btn] = -2;
			else if (msm[btn] > 1) msm[btn] = -1;
			else msm[btn] = -3;

			if (msm.drag[btn] > 0) msm.drag[btn] = -1;
		} else {
			msm[btn] = 0;
			msm.drag[btn] = 0;
		}
	};

	$._Touch = class extends $.InputDevice {
		constructor(touch) {
			super();

			this.x;

			this.y;

			this.id = touch.identifier;
			this._default = 'duration';

			this.holdThreshold = $.touches.holdThreshold;

			this.duration = 1;

			this.drag = 0;
			this._dragFrame = false;

			this.canvasPos = {};
			this._update(touch);
		}

		_update(v) {
			let c = $.canvas;
			const rect = c.getBoundingClientRect();
			const sx = c.scrollWidth / c.w || 1;
			const sy = c.scrollHeight / c.h || 1;
			const x = (this.canvasPos.x = (v.clientX - rect.left) / sx);
			const y = (this.canvasPos.y = (v.clientY - rect.top) / sy);
			if ($.camera.x == c.hw && $.camera.y == c.hh && $.camera.zoom == 1) {
				this.x = x;
				this.y = y;
			} else {
				this.x = (x - c.hw) / $.camera.zoom + $.camera.x;
				this.y = (y - c.hh) / $.camera.zoom + $.camera.y;
			}
			this.force = v.force;
		}
	};

	$.touches = [];
	$.touches.holdThreshold = 12;

	$._ontouchstart = function (e) {
		if (!$._setupDone) return;

		if ($.getAudioContext && $.getAudioContext()?.state == 'suspended') $.userStartAudio();

		for (let touch of e.changedTouches) {
			$.touches.push(new $._Touch(touch));

			if ($.touches.length == 1) {
				$.mouseX = $.touches[0].x;
				$.mouseY = $.touches[0].y;
				$.mouse._update();
				$.world.mouseSprites = $.world.getMouseSprites();
				if (using_p5v1) $._onmousedown(e);
			}
		}
		if ($.touchStarted && !$.touchStarted(e)) e.preventDefault();
	};

	$._ontouchmove = function (e) {
		if (!$._setupDone) return;

		for (let touch of e.changedTouches) {
			let t = $.touches.find((t) => t.id == touch.identifier);
			t._update(touch);
			t._dragFrame = true;
			if (t.id == $.touches[0].id) {
				$.mouseX = $.touches[0].x;
				$.mouseY = $.touches[0].y;
				$.mouse._update();
				if (using_p5v1) $._onmousemove(e);
			}
		}
		if ($.touchMoved && !$.touchMoved(e)) e.preventDefault();
	};

	$._ontouchend = function (e) {
		if (!$._setupDone) return;

		for (let touch of e.changedTouches) {
			let t = $.touches.find((t) => t.id == touch.identifier);
			t._update(touch);

			if (t.duration >= t.holdThreshold) t.duration = -2;
			else if (t.duration > 1) t.duration = -1;
			else t.duration = -3;

			if (t.drag > 0) t.drag = -1;

			if (t.id == $.touches[0].id) {
				$.mouseX = $.touches[0].x;
				$.mouseY = $.touches[0].y;
				$.mouse._update();
				if (using_p5v1) $._onmouseup(e);
			}
		}
		if ($.touchEnded && !$.touchEnded(e)) e.preventDefault();
	};

	$._Keyboard = class extends $.InputDevice {
		constructor() {
			super();
			this._default = ' ';

			this.alt = 0;
			this.arrowUp = 0;
			this.arrowDown = 0;
			this.arrowLeft = 0;
			this.arrowRight = 0;
			this.backspace = 0;
			this.capsLock = 0;
			this.control = 0;
			this.enter = 0;
			this.meta = 0;
			this.shift = 0;
			this.tab = 0;

			let k = (this._simpleKeyControls = {
				arrowUp: 'up',
				arrowDown: 'down',
				arrowLeft: 'left',
				arrowRight: 'right'
			});

			k.w = k.W = 'up';
			k.s = k.S = 'down';
			k.a = k.A = 'left';
			k.d = k.D = 'right';

			k.i = k.I = 'up2';
			k.k = k.K = 'down2';
			k.j = k.J = 'left2';
			k.l = k.L = 'right2';
		}

		get visible() {
			return this._inp == document.activeElement;
		}
		set visible(v) {
			if (!this._inp) {
				this._inp = Object.assign(document.createElement('input'), {
					type: 'text',
					style: 'position: fixed; height: 0; padding: 0; border: none; opacity: 0.0001; pointer-events: none;'
				});
				document.body.appendChild(this._inp);
			}
			this._visible = v;
			v ? this._inp.focus() : this._inp.blur();
		}

		_ac(inp) {
			if (inp.length != 1) {
				if (!isNaN(inp)) {
					if (inp == 38) return 'arrowUp';
					if (inp == 40) return 'arrowDown';
					if (inp == 37) return 'arrowLeft';
					if (inp == 39) return 'arrowRight';
					if (inp >= 10) {
						throw new Error('Use key names with the keyboard input functions, not keyCode numbers!');
					}
					return inp;
				}
				inp = inp.replaceAll(/[ _-]/g, '');
			}
			inp = inp.toLowerCase();
			if (inp.length != 1) {
				if (inp == 'arrowup') return 'arrowUp';
				if (inp == 'arrowdown') return 'arrowDown';
				if (inp == 'arrowleft') return 'arrowLeft';
				if (inp == 'arrowright') return 'arrowRight';
				if (inp == 'capslock') return 'capsLock';
			}
			return inp;
		}

		_pre(k) {
			if (!this[k] || this[k] < 0) {
				this[k] = 1;
			}
		}

		_rel(k) {
			if (this[k] >= this.holdThreshold) this[k] = -2;
			else if (this[k] > 1) this[k] = -1;
			else this[k] = -3;
		}

		get cmd() {
			return this['meta'];
		}
		get command() {
			return this['meta'];
		}
		get ctrl() {
			return this['control'];
		}
		get space() {
			return this[' '];
		}
		get spacebar() {
			return this[' '];
		}
		get opt() {
			return this['alt'];
		}
		get option() {
			return this['alt'];
		}
		get win() {
			return this['meta'];
		}
		get windows() {
			return this['meta'];
		}
	};

	$.kb = new $._Keyboard();

	$.keyboard = $.kb;

	if (typeof navigator == 'object' && navigator.keyboard) {
		const keyboard = navigator.keyboard;
		if (window == window.top) {
			keyboard.getLayoutMap().then((keyboardLayoutMap) => {
				const key = keyboardLayoutMap.get('KeyW');
				if (key != 'w') $.q5play.standardizeKeyboard = true;
			});
		} else {
			$.q5play.standardizeKeyboard = true;
		}
	} else {
		// Firefox and Safari don't have navigator.keyboard
		// so just make them use key codes
		$.q5play.standardizeKeyboard = true;
	}

	function _getKeyFromCode(e) {
		let code = e.code;
		if (code.length == 4 && code.slice(0, 3) == 'Key') {
			return code[3].toLowerCase();
		}
		return e.key;
	}

	let onkeydown = function (e) {
		let key = e.key;
		if (this.q5play.standardizeKeyboard) {
			key = _getKeyFromCode(e);
		}
		// convert PascalCase key names into camelCase
		// which is more common for JavaScript properties
		if (key.length > 1) {
			key = key[0].toLowerCase() + key.slice(1);
		} else {
			let lower = key.toLowerCase();
			let upper = key.toUpperCase();
			if (lower != upper) {
				if (key != upper) this.kb._pre(upper);
				else this.kb._pre(lower);
			}
		}
		this.kb._pre(key);

		let k = this.kb._simpleKeyControls[key];
		if (k) this.kb._pre(k);
	};

	let onkeyup = function (e) {
		let key = e.key;
		if (this.q5play.standardizeKeyboard) {
			key = _getKeyFromCode(e);
		}
		if (key.length > 1) {
			key = key[0].toLowerCase() + key.slice(1);
		} else {
			let lower = key.toLowerCase();
			let upper = key.toUpperCase();
			if (lower != upper) {
				if (key != upper) this.kb._rel(upper);
				else this.kb._rel(lower);
			}
		}
		this.kb._rel(key);

		let k = this.kb._simpleKeyControls[key];
		if (k) this.kb._rel(k);

		if (e.shiftKey) {
			// if user is pressing shift but released another key
			let k = key.toLowerCase();
			if (this.kb[k] > 0) this.kb._rel(k);
		}
	};

	if (window) {
		window.addEventListener('keydown', onkeydown.bind(this));
		window.addEventListener('keyup', onkeyup.bind(this));
	}

	$.Contro = class extends $.InputDevice {
		constructor(gp) {
			super();
			this._default = 'a';
			this.connected = true;

			this.a = 0;
			this.b = 0;
			this.x = 0;
			this.y = 0;
			this.l = 0;
			this.r = 0;
			this.lt = 0;
			this.rt = 0;
			this.select = 0;
			this.start = 0;
			this.lsb = 0;
			this.rsb = 0;
			this.up = 0;
			this.down = 0;
			this.left = 0;
			this.right = 0;

			this.leftStick = {
				x: 0,
				y: 0
			};

			this.rightStick = {
				x: 0,
				y: 0
			};

			this.leftTrigger = 0;

			this.rightTrigger = 0;

			this.buttonMapping = {
				a: 0,
				b: 1,
				x: 2,
				y: 3,
				l: 4,
				r: 5,
				lt: 6,
				rt: 7,
				select: 8,
				start: 9,
				lsb: 10,
				rsb: 11,
				up: 12,
				down: 13,
				left: 14,
				right: 15,
				home: 16,
				capture: 17,
				lsl: 18,
				lsr: 19,
				rsl: 20,
				rsr: 21
			};

			this.axeMapping = {
				leftStick: {
					x: 0,
					y: 1
				},
				rightStick: {
					x: 2,
					y: 3
				},
				leftTrigger: 4,
				rightTrigger: 5
			};

			this.isMock = false;

			if (typeof gp != 'string') {
				this.gamepad = gp;
				this.id = gp.id;
			} else {
				this.gamepad = {};
				this.id = gp;
				this.isMock = true;
			}

			this._axeTriggers = this.gamepad.axes && this.gamepad.axes[this.axeMapping.leftTrigger] !== undefined;

			this.hasAnalogTriggers = this._axeTriggers || undefined;

			this.isNintendo = false;

			// corrects button mapping for GuliKit KingKong 2 Pro controllers
			// which have a Nintendo Switch style button layout
			// https://www.aliexpress.com/item/1005003624801819.html
			if (this.id.includes('Joy-Con') || this.id.includes('Nintendo') || this.id.includes('GuliKit')) {
				this.buttonMapping.a = 1;
				this.buttonMapping.b = 0;
				this.buttonMapping.x = 3;
				this.buttonMapping.y = 2;
				this.isNintendo = true;
			}
		}

		_ac(inp) {
			inp = inp.toLowerCase();
			if (inp == 'lb') inp = 'l';
			else if (inp == 'rb') inp = 'r';
			else if (inp == 'leftstickbutton') inp = 'lsb';
			else if (inp == 'rightstickbutton') inp = 'rsb';
			return inp;
		}

		_update() {
			if (this.isMock) return;

			this.gamepad = navigator.getGamepads()[this.gamepad.index];
			if (!this.gamepad?.connected) return;

			let pad = this.gamepad;

			// buttons
			for (let name in this.buttonMapping) {
				let idx = this.buttonMapping[name];
				let b = pad.buttons[idx];
				if (!b) continue;
				if (b.pressed) this[name]++;
				else this[name] = this[name] > 0 ? -1 : 0;
			}

			// sticks
			this.leftStick.x = pad.axes[this.axeMapping.leftStick.x];
			this.leftStick.y = pad.axes[this.axeMapping.leftStick.y];

			this.rightStick.x = pad.axes[this.axeMapping.rightStick.x];
			this.rightStick.y = pad.axes[this.axeMapping.rightStick.y];

			// triggers
			if (this._axeTriggers) {
				this.leftTrigger = pad.axes[this.axeMapping.leftTrigger];
				this.rightTrigger = pad.axes[this.axeMapping.rightTrigger];
			} else {
				this.leftTrigger = pad.buttons[this.buttonMapping.lt].value;
				this.rightTrigger = pad.buttons[this.buttonMapping.rt].value;

				// only needs to be checked once
				if (this.hasAnalogTriggers === undefined && (this.leftTrigger || this.rightTrigger)) {
					this.hasAnalogTriggers = !Number.isInteger(this.leftTrigger) || !Number.isInteger(this.rightTrigger);
				}
			}
			return true; // update completed
		}

		_reset() {
			for (let name in this.buttonMapping) {
				this[name] = 0;
			}
			this.leftStick.x = 0;
			this.leftStick.y = 0;
			this.rightStick.x = 0;
			this.rightStick.y = 0;
			this.leftTrigger = 0;
			this.rightTrigger = 0;
		}
		// aliases for playstation face buttons
		get cross() {
			return this.a;
		}
		get circle() {
			return this.b;
		}
		get square() {
			return this.x;
		}
		get triangle() {
			return this.y;
		}

		get ls() {
			return this.leftStick;
		}

		get rs() {
			return this.rightStick;
		}

		get lb() {
			return this.l;
		}

		get rb() {
			return this.r;
		}

		get l1() {
			return this.l;
		}

		get r1() {
			return this.r;
		}

		get zl() {
			return this.lt;
		}

		get zr() {
			return this.rt;
		}

		get l2() {
			return this.leftTrigger;
		}

		get r2() {
			return this.rightTrigger;
		}

		get leftStickButton() {
			return this.lsb;
		}

		get rightStickButton() {
			return this.rsb;
		}

		get l3() {
			return this.lsb;
		}

		get r3() {
			return this.rsb;
		}

		get leftSideLeft() {
			return this.lsl;
		}

		get leftSideRight() {
			return this.lsr;
		}

		get rightSideLeft() {
			return this.rsl;
		}

		get rightSideRight() {
			return this.rsr;
		}
	};

	$._Contros = class extends Array {
		constructor() {
			super();
			if (window) {
				window.addEventListener('gamepadconnected', (e) => {
					this._onConnect(e.gamepad);
				});
				window.addEventListener('gamepaddisconnected', (e) => {
					this._onDisconnect(e.gamepad);
				});
			}

			// test if the browser supports the HTML5 Gamepad API
			// all modern browsers do, this is really just to prevent
			// q5play's Jest tests from failing
			if (typeof navigator != 'object' || !navigator.getGamepads) return;

			// if the page was not reloaded, but q5play sketch was,
			// then gamepads could be already connected
			// so they need to be added as Contro objects
			let gps = navigator.getGamepads();
			for (let gp of gps) {
				if (gp) this._onConnect(gp);
			}
		}

		swap(indexA, indexB) {
			let tmp = this[indexA];
			this[indexA] = this[indexB];
			this[indexB] = tmp;
			if (indexA == 0 || indexB == 0) {
				$.contro = this[0];
				if (!$._q5 && $._isGlobal) {
					window.contro = this[0];
				}
			}
		}

		remove(index) {
			this[index] = null;
		}

		onConnect(gamepad) {
			return true;
		}

		onDisconnect(gamepad) {
			return false;
		}

		onChange(index) {}

		_onConnect(gp) {
			if (!gp) return;
			for (let i = 0; i < this.length; i++) {
				if (gp.index == this[i].gamepad?.index) {
					this[i].connected = true;
					log('contros[' + i + '] reconnected: ' + gp.id);
					return;
				}
			}
			log(gp);
			if (this.onConnect(gp)) {
				let c = new $.Contro(gp);

				// get the index of the next available slot
				let index = 0;
				for (let i = 0; i <= this.length; i++) {
					if (!this[i]) {
						index = i;
						break;
					}
				}
				this[index] = c;
				log('contros[' + index + '] connected: ' + gp.id);
				if (index == 0) {
					$.contro = c;
					if ($._isGlobal) window.contro = c;
				}
				this.onChange(index);
			}
		}

		_onDisconnect(gp) {
			if (!gp) return;
			for (let i = 0; i < this.length; i++) {
				if (this[i].gamepad?.index === gp.index) {
					this[i].connected = false;
					log('contros[' + i + '] disconnected: ' + gp.id);
					if (this.onDisconnect(gp)) {
						this.remove(i);
						this.onChange(i);
					} else this[i]._reset();
					return;
				}
			}
		}

		/*
		 * Updates the state of all controllers.
		 */
		_update() {
			for (let c of this) {
				if (c.connected) c._update();
			}
		}
	};

	$.contros = new $._Contros();
	$.controllers = $.contros;

	$.contro = new $.Contro('mock0');

	$.getFPS ??= () => $.q5play._fps;

	let fpsHistory = new Array(180).fill(60),
		fpsPos = 0,
		fpsMin = 60,
		fpsMax = 240;
	let statsColor = $.color('lime');

	$.renderStats = () => {
		let rs = $.q5play._renderStats;

		let fps = $.frameRate();
		if (fps > 55) fps = $.getFPS();

		// Update FPS history using circular buffer
		fpsHistory[fpsPos] = fps;
		fpsPos = (fpsPos + 1) % fpsHistory.length;

		// Update stats every 30 frames
		if ($.frameCount % 30 == 1) {
			let min = Infinity,
				max = 0,
				sum = 0;
			for (let fps of fpsHistory) {
				min = Math.min(min, fps);
				max = Math.max(max, fps);
				sum += fps;
			}
			$.q5play.fpsMin = Math.round(min);
			$.q5play.fpsMax = Math.round(max);
			$.q5play.fpsAvg = Math.round(sum / fpsHistory.length);

			fpsMin = Math.floor(min / 20) * 20;
			fpsMax = Math.ceil(max / 20) * 20;
		}

		// Update stats every 10 frames
		if ($.frameCount % 10 == 1) {
			// Calculate min FPS from last 10 frames
			let recentMin = Infinity;
			for (let i = 0; i < 10; i++) {
				const idx = (fpsPos - i + fpsHistory.length) % fpsHistory.length;
				recentMin = Math.min(recentMin, fpsHistory[idx]);
			}

			// Update color based on recent performance
			statsColor = recentMin > 55 ? $.color('lime') : recentMin > 25 ? $.color('orange') : $.color('red');
		}

		// Draw background and stats
		$.push();
		$.fill(0, 0, 0, $._colorFormat / 2);
		$.rectMode($.CORNER);
		$.rect(rs.x, rs.y, rs.chartWidth + 30, rs.gap * 3 + rs.chartHeight);

		$.fill(statsColor);
		$.textAlign($.LEFT, $.TOP);
		$.textSize(rs.fontSize);
		if (rs.font) $.textFont(rs.font);

		let x = rs.x + 6,
			y = rs.y + 2;
		$.text('q5play ' + $.q5play.version, x, y);
		$.text('sprites ' + $.q5play.spritesDrawn, x, y + rs.gap);

		// Draw chart
		const chartX = x + 25;
		const chartY = y + rs.gap * 2;
		const range = fpsMax - fpsMin;

		// Draw axis labels
		$.textAlign($.RIGHT);
		$.textSize(rs.fontSize * 0.8);
		$.text(fpsMax, chartX - 5, chartY);
		$.text('FPS', chartX - 5, chartY + rs.chartHeight / 2);
		$.text(fpsMin, chartX - 5, chartY + rs.chartHeight);

		// Plot FPS line
		$.noFill();
		$.stroke(statsColor);
		$.strokeWeight(1.1);
		$.beginShape();
		const len = fpsHistory.length;
		const startIdx = fpsPos % len;

		for (let i = 0; i < len; i++) {
			const idx = (startIdx + i) % len;
			const px = chartX + (i * rs.chartWidth) / len;
			const py = chartY + rs.chartHeight - ((fpsHistory[idx] - fpsMin) * rs.chartHeight) / range;
			$.vertex(px, py);
		}
		$.endShape();

		$.pop();
	};

	function transformPoint(xf, v) {
		let x = xf.p.x + xf.q.c * v.x - xf.q.s * v.y,
			y = xf.p.y + xf.q.s * v.x + xf.q.c * v.y;
		v.x = x;
		v.y = y;
	}

	let drawCmds = new DebugDrawCommandBuffer();
	let jointStack = [];
	let shapeStack = [];

	$._syncWorld = () => {
		jointStack = [];
		shapeStack = [];
		b2World_Draw(wID, drawCmds.GetDebugDraw());
		let cmdPtr = drawCmds.GetCommandsData();
		let cmdSize = drawCmds.GetCommandsSize();
		let cmdStride = drawCmds.GetCommandStride();

		// Collect commands with their associated sprites
		let offset = cmdPtr;
		let s;

		for (let i = 0; i < cmdSize; i++, offset += cmdStride) {
			// workaround that unpacks data from
			// the shape material's customColor
			const customColor = Box2D.HEAPU32[(offset + 4) >> 2];

			const uid = customColor & 0xffffff,
				isSensor = (customColor >>> 25) & 0x1,
				isFirstShape = (customColor >>> 26) & 0x1;

			s = $.q5play.sprites[uid];

			if (s && !s.visible) {
				continue;
			}

			let type = Box2D.HEAPU8[offset];

			if (type == 7) {
				continue;
			}

			let vertexCount = Box2D.HEAPU16[(offset + 8) >> 1];

			let dataLen = 4;
			if (type == 1) dataLen = 5 + vertexCount * 2;
			else if (type == 3 || type == 4) dataLen = 5;
			let data = new Float32Array(Box2D.HEAPU8.buffer, offset + 12, dataLen);

			if (!s) {
				if (type == 0) jointStack.push(...data);
				continue;
			}

			// low performance cost to always sync position
			// actually way better than retrieving it when needed
			s._posX = data[0] * meterSize;
			s._posY = data[1] * meterSize;

			s._velSynced = false;
			s._vel._magCached = false;

			if (s._hasImagery) {
				s._rotation = Math.atan2(data[2], data[3]) * $._RADTODEG;
			}

			// if (!this._syncedToFrameRate) {
			// 	for (let s of $.allSprites) s._syncWithPhysicsBody();
			// }

			if (!s._hasImagery || s.debug) {
				shapeStack.push({ type, sprite: s, isSensor, isFirstShape, data, vertexCount });
			}
		}
	};

	const colorMax = $._colorFormat,
		debugGreen = $.color(0, colorMax, 0, colorMax * 0.9),
		debugGreenFill = $.color(0, colorMax, 0, colorMax * 0.1),
		debugYellow = $.color(colorMax, colorMax, 0, colorMax * 0.9),
		debugYellowFill = $.color(colorMax, colorMax, 0, colorMax * 0.1);

	$._debugDraw = () => {
		$.scale(meterSize);

		let ogStroke = $._getStrokeIdx(),
			strokeChanged = false,
			strokeWeightChanged = false;

		let swData = $._getStrokeWeight();
		let ogSW = [...swData];
		for (let i = 0; i < swData.length; i++) {
			swData[i] /= meterSize;
		}
		$._setStrokeWeight(swData);

		for (let i = 0; i < jointStack.length; i += 8) {
			$.line(jointStack[i], jointStack[i + 1], jointStack[i + 4], jointStack[i + 5]);
		}

		// Sort by layer
		shapeStack.sort((a, b) => a.sprite.layer - b.sprite.layer);

		let v = { x: 0, y: 0 };
		let xf = {
			p: { x: 0, y: 0 },
			q: { s: 0, c: 1 }
		};
		let rr;

		for (let cmd of shapeStack) {
			const s = cmd.sprite,
				isSensor = cmd.isSensor,
				isFirstShape = cmd.isFirstShape;

			if (!s.debug) {
				if (isSensor) continue;
				$.fill(s.fill);
				if (s.stroke) {
					$.stroke(s.stroke);
					strokeChanged = true;
				} else if (strokeChanged) {
					$._setStrokeIdx(ogStroke);
					strokeChanged = false;
				}
				if (s._strokeWeight != undefined) {
					$._setStrokeWeight(s._strokeWeightData);
					strokeWeightChanged = true;
				} else if (strokeWeightChanged) {
					$._setStrokeWeight(swData);
					strokeWeightChanged = false;
				}
			} else {
				$.fill(isSensor ? debugYellowFill : debugGreenFill);
				$.stroke(isSensor ? debugYellow : debugGreen);
				strokeChanged = true;
			}

			xf.p.x = cmd.data[0];
			xf.p.y = cmd.data[1];
			xf.q.s = cmd.data[2];
			xf.q.c = cmd.data[3];

			if (cmd.data.length >= 4) rr = cmd.data[4];
			else rr = 0;

			if (cmd.type == 0) {
				$.line(cmd.data[0], cmd.data[1], cmd.data[2], cmd.data[3]);
			}
			// draw a polygon
			else if (cmd.type == 1) {
				if (rr > 0) {
					$._setStrokeIdx($._getFillIdx());
					$.strokeWeight(rr * 2);
					$.strokeJoin('round');
				} else {
					$.strokeJoin('none');
				}
				$.beginShape();
				let len = 5 + cmd.vertexCount * 2;
				for (let i = 5; i < len; i += 2) {
					v.x = cmd.data[i];
					v.y = cmd.data[i + 1];
					transformPoint(xf, v);
					$.vertex(v.x, v.y);
				}
				$.endShape(true);
				if (rr > 0) {
					$._setStrokeWeight(swData);
					$._setStrokeIdx(ogStroke);
				}
			}
			// draw a circle
			else if (cmd.type == 3) {
				$.circle(cmd.data[0], cmd.data[1], cmd.data[4] * 2);
			}
			// draw a capsule
			else if (cmd.type == 4) {
				if ($.capsule) {
					$.capsule(cmd.data[0], cmd.data[1], cmd.data[2], cmd.data[3], cmd.data[4]);
				} else {
					$.strokeJoin('round');
					$.strokeWeight(cmd.data[4] * 2);
					$.line(cmd.data[0], cmd.data[1], cmd.data[2], cmd.data[3]);
					$._setStrokeWeight(swData);
				}
			}
			// draw a line segment
			else if (cmd.type == 5) {
				$.line(cmd.data[0], cmd.data[1], cmd.data[2], cmd.data[3]);
			}

			if (isFirstShape) {
				$.q5play.spritesDrawn++;
			}
			// draw a triangle at the shape's center to indicate rotation
			if (s.debug && cmd.type < 5) {
				$._setFillIdx($._getStrokeIdx());
				$._doFill();
				$.noStroke();
				if (!isSensor && isFirstShape) {
					$.beginShape();
					let a = 0.05,
						b = 0.03;
					let tri = [-b, -b, -b, b, a, 0];
					for (let i = 0; i < 6; i += 2) {
						v.x = tri[i];
						v.y = tri[i + 1];
						transformPoint(xf, v);
						$.vertex(v.x, v.y);
					}
					$.endShape(true);
				} else {
					$.circle(cmd.data[0], cmd.data[1], 0.03);
				}
			}

			// TODO: draw sprite text
			// if (!s.debug && this.text !== undefined) {
			// 	$.textAlign($.CENTER, $.CENTER);
			// 	$.fill(this._textFill);
			// 	if (this._textStrokeWeight) $.strokeWeight(this._textStrokeWeight);
			// 	if (this._textStroke) $.stroke(this._textStroke);
			// 	else $.noStroke();
			// 	$.textSize(this.textSize);
			// 	$.text(this.text, 0, 0);
			// }
		}

		drawCmds.ClearCommands();
		$.resetMatrix();
		$._setStrokeIdx(ogStroke);
		$._setStrokeWeight(ogSW);
	};

	if ($.q5play.background) {
		$.update = () => {
			background($.q5play.background);
		};
	}

	// prettier-ignore
	let q5playGlobals = ['q5play','Box2D','DYN','DYNAMIC','STA','STATIC','KIN','KINEMATIC','Sprite','Ani','Anis','Group','Visual','Visuals','World','world','createCanvas','Canvas','canvas','MAXED','SMOOTH','PIXELATED','displayMode','Camera','camera','Tiles','Joint','GlueJoint','DistanceJoint','WheelJoint','HingeJoint','SliderJoint','RopeJoint','GrabberJoint','kb','keyboard','mouse','touches','allSprites','camera','contro','contros','controllers','spriteArt','EmojiImage','getFPS','animation'];

	// manually propagate q5play stuff to the global window object
	if ($._isGlobal) {
		for (let p of q5playGlobals) {
			window[p] = $[p];
		}
	}
}

// called once after setup
function q5playPostSetup() {
	const $ = this;

	if ($._isGlobal && window.update) {
		$.update = window.update;
		// p5.js won't run the draw loop without a draw function defined
		if (!$._q5) window.draw = () => {};
	}

	$.update ??= () => {};

	$._setupDone = true;
}

// called before each draw function call
function q5playPreDraw() {
	const $ = this;

	if (!$._q5) {
		$.q5play._preDrawFrameTime = performance.now();
	}
	$.q5play.spritesDrawn = 0;

	$.mouse._update();
	$.contros._update();

	$.update();

	if ($.allSprites._autoUpdate) {
		$.allSprites.update();
	}
	$.allSprites._autoUpdate ??= true;

	if ($.world.autoStep && $.world.timeScale > 0) {
		$.world.physicsUpdate();
		$._syncWorld();
	}
	$.world.autoStep ??= true;

	// TODO: cull with shape casting
	if ($.allSprites.autoCull) {
		$.allSprites.cull(10000);
	}
	$.allSprites.autoCull ??= true;

	if ($.camera.__pos.x != 0 || $.camera.__pos.y != 0 || $.camera._zoom != 1) {
		$.camera.on();
	}
}

// called after each draw function call
function q5playPostDraw() {
	const $ = this;

	$.q5play._inPostDraw = true;

	if ($.allSprites._autoDraw) {
		let ogImgMode = $._imageMode || $._getImageMode();
		$.imageMode($.CENTER);

		$.allSprites.draw();
		$._debugDraw();

		$.imageMode(ogImgMode);
	}
	$.allSprites._autoDraw ??= true;

	if ($.camera.isActive) $.camera.off();

	$.allSprites.postDraw();

	if ($.q5play.renderStats) $.renderStats();

	for (let k in $.kb) {
		if (k == 'holdThreshold') continue;
		if ($.kb[k] < 0) $.kb[k] = 0;
		else if ($.kb[k] > 0) $.kb[k]++;
	}

	for (let i = 0; i < $.touches.length; i++) {
		let t = $.touches[i];
		t.duration++;
		if (t._dragFrame) {
			t.drag++;
			t._dragFrame = false;
		} else if (t.drag < 0) {
			t.drag = 0;
		}
		if (t.duration <= 0) {
			$.touches.splice(i, 1);
			i--;
		}
	}

	let m = $.mouse;
	let msm = $.world.mouseSprite?.mouse;

	m.scrollDelta.x = 0;
	m.scrollDelta.y = 0;

	for (let btn of ['left', 'center', 'right']) {
		if (m[btn] < 0) m[btn] = 0;
		else if (m[btn] > 0) m[btn]++;
		if (msm?.hover) msm[btn] = m[btn];

		if (m._dragFrame[btn]) {
			m.drag[btn]++;
			if (msm) msm.drag[btn] = m.drag[btn];
			m._dragFrame[btn] = false;
		} else if (m.drag[btn] < 0) {
			m.drag[btn] = 0;
			if (msm) msm.drag[btn] = 0;
		}
	}

	if ($.world.mouseTracking && $.mouse.isActive) {
		let sprites = $.world.getMouseSprites();

		for (let i = 0; i < sprites.length; i++) {
			let s = sprites[i];
			if (i == 0) s.mouse.hover++;
			else if (s.mouse.hover > 0) s.mouse.hover = -1;
			else if (s.mouse.hover < 0) s.mouse.hover = 0;
		}

		// if the user is not pressing any mouse buttons
		if (m.left <= 0 && m.center <= 0 && m.right <= 0) {
			$.world.mouseSprite = null;
		}

		let ms = $.world.mouseSprite;

		let isDragging = m.drag.left > 0 || m.drag.center > 0 || m.drag.right > 0;

		for (let s of $.world.mouseSprites) {
			// if the mouse stopped hovering over the sprite
			if (!sprites.includes(s)) {
				let sm = s.mouse;
				if (sm.hover > 0) {
					sm.hover = -1;
					sm.left = sm.center = sm.right = 0;
				}
				// if mouse is not dragging and the sprite is the current mouse sprite
				if (!isDragging && s == ms) $.world.mouseSprite = ms = null;
			}
		}
		if (ms) {
			// if the user is dragging on a sprite, but not currently hovering
			// over it, the mouse sprite should still be added to the mouseSprites array
			if (!sprites.includes(ms)) sprites.push(ms);
			msm.x = ms.x - m.x;
			msm.y = ms.y - m.y;
		}
		$.world.mouseSprites = sprites;
	}

	if (!$._q5) {
		$.q5play._postDrawFrameTime = performance.now();
		$.q5play._fps = Math.round(1000 / ($.q5play._postDrawFrameTime - $.q5play._preDrawFrameTime)) || 1;
	}
	$.q5play._inPostDraw = false;
}

Q5.addHook('presetup', q5playPreSetup);
Q5.addHook('postsetup', q5playPostSetup);
Q5.addHook('predraw', q5playPreDraw);
Q5.addHook('postdraw', q5playPostDraw);
