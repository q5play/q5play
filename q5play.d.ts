import 'q5';

declare global {
	class Q5Play {
		/**
		 * Contains all the sprites in the sketch,
		 *
		 * Users should use the `allSprites` group instead.
		 *
		 * The keys are the sprite's unique ids.
		 */
		sprites: {
			[x: number]: Sprite;
		};
		/**
		 * Contains all the groups in the sketch,
		 *
		 * The keys are the group's unique ids.
		 */
		groups: {
			[x: number]: Group;
		};
		groupsCreated: number;
		spritesCreated: number;
		spritesDrawn: number;
		/**
		 * The default color palette, at index 0 of this array,
		 * has all the letters of the English alphabet mapped to colors.
		 */
		palettes: any[];
		/**
		 * Friendly rounding eliminates some floating point errors.
		 * @default true
		 */
		friendlyRounding: boolean;
		/**
		 * Groups that are removed using `group.remove()` are not
		 * fully deleted from `q5play.groups` by default, so their data
		 * is still accessible. Set to false to permanently delete
		 * removed groups, which reduces memory usage.
		 * @default true
		 */
		storeRemovedGroupRefs: boolean;
		/**
		 * Snaps sprites to the nearest `q5play.gridSize`
		 * increment when they are moved.
		 * @default false
		 */
		snapToGrid: boolean;
		/**
		 * The size of the grid cells that sprites are snapped to.
		 * @default 0.5
		 */
		gridSize: number;
		/**
		 * Information about the operating system being used to run
		 * q5play, retrieved from the `navigator` object.
		 */
		os: {};
		context: string;
		hasMouse: boolean;
		standardizeKeyboard: boolean;
		/**
		 * Displays the number of sprites drawn, the current FPS
		 * as well as the average, minimum, and maximum FPS achieved
		 * during the previous second.
		 *
		 * FPS in this context refers to how many frames per second your
		 * computer can generate, based on the physics calculations and any
		 * other processes necessary to generate a frame, but not
		 * including the delay between when frames are actually shown on
		 * the screen. The higher the FPS, the better your game is
		 * performing.
		 *
		 * You can use this function for approximate performance testing.
		 * But for the most accurate results, use your web browser's
		 * performance testing tools.
		 *
		 * Generally having less sprites and using a smaller canvas will
		 * make your game perform better. Also drawing images is faster
		 * than drawing shapes.
		 * @default false
		 */
		renderStats: boolean;
		/**
		 * This function is called when an image is loaded. By default it
		 * does nothing, but it can be overridden.
		 */
		onImageLoad(): void;
	}
	const q5play: Q5Play;

	/**
	 * Users do not create Shapes directly; use `sprite.addCollider()`
	 * or `sprite.addSensor()` instead.
	 */
	class Shape {
		sprite: Sprite;
		type: string;
		geom: any;
		density: number;
		scaleBy(scaleX: number, scaleY?: number): void;
		delete(): void;
	}

	/**
	 * Colliders are added to a sprite's physics body to cause
	 * physical collisions with other sprites.
	 *
	 * Users do not create Colliders directly; use Sprite.addCollider() instead.
	 */
	class Collider extends Shape {
		friction: number;
		bounciness: number;
		density: number;
	}

	/**
	 * Sensor are added to a sprite's physics body to detect overlaps 
	 * without causing physical collisions.
	 *
	 * Users do not create Sensors directly; use Sprite.addSensor() instead.
	 *
	 * @extends Shape
	 */
	class Sensor extends Shape {
		_isSensor: boolean;
		density: number;
	}

	/**
	 * Visual objects store images and animations that can be displayed
	 * with respect to the camera.
	 */
	class Visual {
		x: number;
		y: number;
		/**
		 * Current image or frame of animation being displayed.
		 */
		get img(): Q5.Image;
		set img(image: Q5.Image);
		/**
		 * Current animation.
		 */
		get ani(): Ani;
		set ani(val: Ani);
		/**
		 * Stores animations.
		 * Keys are the animation label, values are Ani objects
		 */
		get anis(): Anis;
		/**
		 * Adds an animation to the Sprite or Visual.
		 *
		 * @param spriteSheetURL the URL of the sprite sheet image
		 * @param frameCount the number of frames in the sprite sheet
		 * @returns A promise that fulfills when the animation is loaded
		 */
		addAni(spriteSheetURL: string, frameCount: number): Promise<void>;
		/**
		 * Add multiple animations to the Sprite or Visual.
		 * 
		 * @param atlases an object with animation names as keys and
		 * an animation or animation atlas as values
		 * @returns A promise that fulfills when the animations are loaded
		 */
		addAnis(...args: any[]): void;
		/**
		 * Changes the sprite's animation. Use `addAni` to define the
		 * animation(s) first.
		 *
		 * @param aniName the name of the animation to switch to
		 */
		changeAni(aniName: string): void;
		/**
		 * Plays a sequence of animations.
		 * 
		 * @param aniNames the names of animations to be played in sequence
		 * @returns A promise that fulfills when the animation sequence completes
		 */
		playSequence(...aniNames: string[]): Promise<void>;
	}

	const DYNAMIC: 'dynamic';
	const DYN: 'dynamic';
	const STATIC: 'static';
	const STA: 'static';
	const KINEMATIC: 'kinematic';
	const KIN: 'kinematic';

	class Sprite {
		/**
		 * Creates a new sprite.
		 *
		 * Input parameters are optional. A sprite's default position is in the
		 * center of the canvas [0,0] and default box collider is 50x50 pixels.
		 *
		 * @param x horizontal position
		 * @param y vertical position
		 * @param w width of the collider
		 * @param h height of the collider
		 * @param physicsType physics type is DYNAMIC by default, can be
		 * STATIC or KINEMATIC
		 */
		constructor(x?: number, y?: number, w?: number, h?: number, physicsType?: string);
		/**
		 * Creates a new sprite with an overlap sensor instead of a collider.
		 *
		 * @param x horizontal position
		 * @param y vertical position
		 * @param w width of the sensor
		 * @param h height of the sensor
		 * @param physicsType physics type is DYNAMIC by default, can be
		 * STATIC or KINEMATIC
		 */
		static withSensor(x?: number, y?: number, w?: number, h?: number, physicsType?: string): Sprite;
		/**
		 * The physics type of the sprite, which determines how it interacts with
		 * other sprites in the physics simulation.
		 *
		 * It can be set to DYNAMIC/DYN, STATIC/STA, or KINEMATIC/KIN.
		 * @default "dynamic"
		 */
		get physics(): string;
		set physics(val: string);
		/**
		 * The physics type of the sprite, which determines how it interacts with
		 * other sprites in the physics simulation.
		 *
		 * It can be set to DYNAMIC/DYN, STATIC/STA, or KINEMATIC/KIN.
		 * @default "dynamic"
		 */
		get physicsType(): string;
		set physicsType(val: string);
		/**
		 * If true, the sprite's physics body is included in the physics simulation.
		 * @default true
		 */
		get physicsEnabled(): boolean;
		set physicsEnabled(val: boolean);
		/**
		 * Each sprite has a unique id number. Don't change it!
		 * They are useful for debugging.
		 */
		idNum: number;
		/**
		 * Groups the sprite belongs to.
		 * @default [allSprites]
		 */
		groups: Group[];
		/**
		 * Keys are the animation label, values are Ani objects.
		 */
		animations: Anis;
		/**
		 * Array of colliders that are part of the sprite's physics body.
		 */
		colliders: Collider[];
		/**
		 * Array of sensors that are part of the sprite's physics body.
		 * Sensors are used to detect overlaps without causing physical collisions.
		 */
		sensors: Sensor[];
		/**
		 * Joints that the sprite is attached to.
		 * @default []
		 */
		joints: Joint[];
		/**
		 * If set to true, q5play will record all changes to the sprite's
		 * properties in its `mod` array. Intended to be used to enable
		 * online multiplayer.
		 * @default undefined
		 */
		watch: boolean;
		/**
		 * Modification tracking object.
		 *
		 * It has sprite property number codes as keys,
		 * these correspond to the index of the property in the
		 * Sprite.props array, and boolean values, that
		 * indicate which properties were changed since the last frame.
		 *
		 * Useful for limiting the amount of sprite data sent in netcode
		 * to only the sprite properties that have been modified.
		 */
		mod: {};
		/**
		 * The horizontal position of the sprite.
		 */
		get x(): number;
		set x(val: number);
		/**
		 * The vertical position of the sprite.
		 */
		get y(): number;
		set y(val: number);
		/**
		 * The width of the sprite.
		 */
		get w(): number;
		set w(val: number);
		/**
		 * The height of the sprite.
		 */
		get h(): number;
		set h(val: number);
		/**
		 * The sprite's position on the previous frame.
		 */
		prevPos: {};
		/**
		 * The sprite's rotation on the previous frame.
		 */
		prevRotation: number;
		/**
		 * Text displayed at the center of the sprite.
		 * @default undefined
		 */
		text: string;
		/**
		 * Adds a collider to the sprite's physics body.
		 *
		 * It accepts parameters in a similar format to the Sprite
		 * constructor except the first two parameters are x and y offsets,
		 * the distance new collider should be from the center of the sprite.
		 *
		 * This function also recalculates the sprite's mass based on the
		 * size of the new collider added to it. However, it does not move
		 * the sprite's center of mass, which makes adding multiple colliders
		 * to a sprite easier.
		 *
		 * @param offsetX distance from the center of the sprite
		 * @param offsetY distance from the center of the sprite
		 * @param w width of the collider
		 * @param h height of the collider
		 */
		addCollider(offsetX: number, offsetY: number, w?: number, h?: number): void;
		/**
		 * Adds an overlap sensor to the sprite's physics body.
		 *
		 * Sensors can't displace or be displaced by colliders.
		 * Sensors don't have any mass or other physical properties.
		 * Sensors simply detect overlaps.
		 *
		 * This function accepts parameters in a similar format to the Sprite
		 * constructor except the first two parameters are x and y offsets,
		 * the relative distance the new sensor should be from the center of
		 * the sprite.
		 *
		 * @param offsetX distance from the center of the sprite
		 * @param offsetY distance from the center of the sprite
		 * @param w width of the collider
		 * @param h height of the collider
		 */
		addSensor(offsetX: number, offsetY: number, w?: number, h?: number): void;
		/**
		 * The mass of the sprite's physics body.
		 */
		get mass(): number;
		set mass(val: number);
		/**
		 * The center of mass of the sprite's physics body, the point at which
		 * the physics body is balanced and rotates around. By default it's the
		 * same as the sprite's position, but it can be changed with this setter.
		 */
		get centerOfMass(): { x: number; y: number };
		set centerOfMass(val: { x: number; y: number });
		/**
		 * If true, the center of mass of the sprite's physics body is fixed to
		 * the sprite's [x, y] position.
		 *
		 * It prevents the center of mass from being recalculated (moved) when adding or
		 * removing colliders or sensors. Set it to false to allow dynamic center of mass
		 * recalculation.
		 * @default true
		 */
		get fixedCenterOfMass(): boolean;
		set fixedCenterOfMass(val: boolean);
		/**
		 * Recalculates the sprite's mass based on its current
		 * density and size.
		 */
		resetMass(): void;
		/**
		 * The angle of the sprite's rotation, not the direction it's moving.
		 *
		 * If angleMode is set to "degrees", the value will be returned in
		 * a range of -180 to 180.
		 * @default 0
		 */
		get rotation(): number;
		set rotation(val: number);
		/**
		 * Removes colliders from the sprite's physics body.
		 */
		removeColliders(): void;
		/**
		 * Removes overlap sensors from the sprite's physics body.
		 */
		removeSensors(): void;
		/**
		 * If true, a sprite is updated by q5play before each physics update.
		 * @default true
		 */
		get autoUpdate(): boolean;
		set autoUpdate(val: boolean);
		/**
		 * If true, a sprite is drawn by q5play after each physics update.
		 * @default true
		 */
		get autoDraw(): boolean;
		set autoDraw(val: boolean);
		/**
		 * Controls the ability for a sprite to "sleep".
		 *
		 * "Sleeping" sprites are not included in the physics simulation, a
		 * sprite starts "sleeping" when it stops moving and doesn't collide
		 * with anything that it wasn't already colliding with.
		 * @default true
		 */
		get allowSleeping(): boolean;
		set allowSleeping(val: boolean);
		/**
		 * The bounciness of the sprite's physics body.
		 * @default 0.2
		 */
		get bounciness(): number;
		set bounciness(val: number);
		/**
		 * The speed of the sprite's rotation in angles per frame.
		 * @default 0
		 */
		get rotationSpeed(): number;
		set rotationSpeed(val: number);
		/**
		 * The sprite's current fill color.
		 *
		 * By default sprites get a random color.
		 */
		get color(): Q5.Color;
		set color(val: Q5.Color);
		/**
		 * The sprite's current fill colour.
		 *
		 * By default sprites get a random color.
		 */
		get colour(): Q5.Color;
		set colour(val: Q5.Color);
		/**
		 * The sprite's current fill color.
		 *
		 * By default sprites get a random color.
		 */
		get fill(): Q5.Color;
		set fill(val: Q5.Color);
		/**
		 * The sprite's stroke color.
		 */
		get stroke(): Q5.Color;
		set stroke(val: Q5.Color);
		/**
		 * The sprite's stroke weight, the thickness of its outline.
		 */
		get strokeWeight(): number;
		set strokeWeight(val: number);
		/**
		 * The sprite's text fill color. Black by default.
		 * @default black (#000000)
		 */
		get textFill(): Q5.Color;
		set textFill(val: Q5.Color);
		/**
		 * The sprite's text size, the sketch's current textSize by default.
		 */
		get textSize(): number;
		set textSize(val: number);
		/**
		 * The sprite's text stroke color.
		 * No stroke by default, does not inherit from the sketch's stroke color.
		 * @default undefined
		 */
		get textStroke(): Q5.Color;
		set textStroke(val: Q5.Color);
		/**
		 * The sprite's text stroke weight, the thickness of its outline.
		 * No stroke by default, does not inherit from the sketch's stroke weight.
		 * @default undefined
		 */
		get textStrokeWeight(): number;
		set textStrokeWeight(val: number);
		/**
		 * The tile string represents the sprite in a tile map.
		 */
		get tile(): string;
		set tile(val: string);
		/**
		 * A bearing indicates the direction that needs to be followed to
		 * reach a destination.
		 *
		 * Setting a sprite's bearing doesn't do anything by itself.
		 * You can apply a force to the sprite at its bearing angle
		 * using the `applyForce` function.
		 */
		get bearing(): number;
		set bearing(val: number);
		/**
		 * If true, outlines of the sprite's colliders and sensors will be drawn.
		 * @default false
		 */
		get debug(): boolean;
		set debug(val: boolean);
		/**
		 * The density of the sprite's physics body.
		 * @default 1
		 */
		get density(): number;
		set density(val: number);
		/**
		 * The angle of the sprite's movement.
		 * @default 0 ("right")
		 */
		get direction(): number;
		set direction(val: number);
		/**
		 * The amount of resistance a sprite has to being moved.
		 * @default 0
		 */
		get drag(): number;
		set drag(val: number);
		/**
		 * Displays the sprite.
		 *
		 * This function is called automatically at the end of each
		 * sketch `draw` function call but it can also be run
		 * by users to customize the order sprites are drawn in relation
		 * to other stuff drawn to the canvas. Also see the sprite.layer
		 * property.
		 *
		 * A sprite's draw function can be overridden with a
		 * custom draw function, inside this function (0, 0) is the center of
		 * the sprite.
		 */
		get draw(): Function;
		set draw(val: Function);
		/**
		 * The amount the sprite's colliders resist moving
		 * when rubbing against other colliders.
		 * @default 0.5
		 */
		get friction(): number;
		set friction(val: number);
		/**
		 * The sprite's heading. This is a string that can be set to
		 * "up", "down", "left", "right", "upRight", "upLeft", "downRight"
		 *
		 * The setter's input parser ignores capitalization, spaces,
		 * underscores, dashes, and cardinal direction word order.
		 * @default undefined
		 */
		get heading(): string;
		set heading(val: string);
		/**
		 * True if the sprite is moving.
		 * @readonly
		 */
		get isMoving(): boolean;
		/**
		 * Set this to true if the sprite goes really fast to prevent
		 * inaccurate physics simulation.
		 * @default false
		 */
		get isSuperFast(): boolean;
		set isSuperFast(val: boolean);
		/**
		 * Sprites with the highest layer value get drawn first.
		 *
		 * By default sprites are drawn in the order they were created in.
		 */
		get layer(): number;
		set layer(val: number);
		/**
		 * When the physics simulation is progressed in `world.physicsUpdate`,
		 * each sprite's life is decreased by `world.timeScale`.
		 *
		 * If life becomes less than or equal to 0, the sprite will
		 * be removed.
		 * @default Infinity
		 */
		get life(): number;
		set life(val: number);
		/**
		 * The sprite's opacity. 0 is transparent, 1 is opaque.
		 * @default 1
		 */
		get opacity(): number;
		set opacity(val: number);
		/**
		 * Alias for sprite.prevPos
		 */
		get previousPosition(): any;
		set previousPosition(val: any);
		/**
		 * Alias for sprite.prevRotation
		 */
		get previousRotation(): number;
		set previousRotation(val: number);
		/**
		 * If true, q5play will draw sprites at integer pixel precision.
		 *
		 * This is useful for making retro games.
		 *
		 * By default q5play draws sprites with subpixel rendering.
		 * @default false
		 */
		get pixelPerfect(): boolean;
		set pixelPerfect(val: boolean);
		/**
		 * If the sprite has been removed from the world.
		 * @default false
		 */
		get removed(): boolean;
		set removed(val: boolean);
		/**
		 * Simulates friction that slows down a sprite rolling on another sprite,
		 * like a soccer ball rolling to a stop on high grass.
		 * @default 0
		 */
		get rollingResistance(): number;
		set rollingResistance(val: number);
		/**
		 * The amount the sprite resists rotating.
		 * @default 0
		 */
		get rotationDrag(): number;
		set rotationDrag(val: number);
		/**
		 * If true, the sprite can not rotate.
		 * @default false
		 */
		get rotationLock(): boolean;
		set rotationLock(val: boolean);
		/**
		 * Scale of the sprite.
		 *
		 * The `valueOf` function for `sprite.scale` returns the scale as a
		 * number. This enables users to do things like `sprite.scale *= 2`
		 * to double the sprite's scale.
		 * @default {x: 1, y: 1}
		 */
		get scale(): number | { x: number, y: number };
		set scale(val: number | [] | { x: number, y: number });
		/**
		 * Scales the the sprite.
		 * @param x scaleX or uniform scale factor
		 * @param y scaleY
		 */
		scaleBy(x: number, y?: number): void;
		/**
		 * Wake a sprite up or put it to sleep.
		 *
		 * "Sleeping" sprites are not included in the physics simulation, a
		 * sprite starts "sleeping" when it stops moving and doesn't collide
		 * with anything that it wasn't already colliding with.
		 * @default true
		 */
		get sleeping(): boolean;
		set sleeping(val: boolean);
		/**
		 * The sprite's speed.
		 *
		 * Setting speed to a negative value will make the sprite move
		 * 180 degrees opposite of its current direction angle.
		 * @default 0
		 */
		get speed(): number;
		set speed(val: number);
		/**
		 * The sprite's speed along the surface of its collider(s),
		 * like a conveyor belt.
		 * @default 0
		 */
		get surfaceSpeed(): number;
		set surfaceSpeed(val: number);
		/**
		 * Tint color applied to the sprite when drawn.
		 *
		 * Note that this is not good for performance, you should probably
		 * pre-render the effect if you want to use it a lot.
		 * @default undefined
		 */
		get tint(): Q5.Color;
		set tint(val: Q5.Color);
		/**
		 * If true the sprite is shown, if set to false the sprite is hidden.
		 *
		 * Becomes null when the sprite is off screen but will be drawn and
		 * set to true again if it goes back on screen.
		 * @default true
		 */
		get visible(): boolean;
		set visible(val: boolean);
		/**
		 * The position vector {x, y}
		 */
		get pos(): Q5.Vector;
		set pos(val: [] | { x: number; y: number } | Q5.Vector);
		/**
		 * The position vector {x, y}
		 */
		get position(): Q5.Vector;
		set position(val: [] | { x: number; y: number } | Q5.Vector);
		/**
		 * The sprite's absolute position on the canvas.
		 * @readonly
		 */
		get canvasPos(): any;
		/**
		 * Half the width of the sprite.
		 */
		get hw(): number;
		set hw(val: number);
		/**
		 * The width of the sprite.
		 */
		get width(): number;
		set width(val: number);
		/**
		 * Half the width of the sprite.
		 */
		get halfWidth(): number;
		set halfWidth(val: number);
		/**
		 * Half the height of the sprite.
		 */
		get hh(): number;
		set hh(val: number);
		/**
		 * The height of the sprite.
		 */
		get height(): number;
		set height(val: number);
		/**
		 * Half the height of the sprite.
		 */
		get halfHeight(): number;
		set halfHeight(val: number);
		/**
		 * The diameter of a circular sprite.
		 */
		get d(): number;
		set d(val: number);
		/**
		 * The diameter of a circular sprite.
		 */
		get diameter(): number;
		set diameter(val: number);
		/**
		 * The radius of a circular sprite.
		 */
		get r(): number;
		set r(val: number);
		/**
		 * The radius of a circular sprite.
		 */
		get radius(): number;
		set radius(val: number);
		/**
		 * Runs before each physics update by default.
		 *
		 * Set this to a custom function that handles input, directs sprite movement,
		 * and performs other tasks that should run before the physics update.
		 *
		 * Optionally, users can run this function manually in q5play's `update`
		 * function.
		 */
		get update(): Function;
		set update(val: Function);
		/**
		 * The sprite's velocity vector {x, y}
		 * @default {x: 0, y: 0}
		 */
		get vel(): Q5.Vector;
		set vel(val: [] | { x: number; y: number } | Q5.Vector);
		/**
		 * The sprite's velocity vector {x, y}
		 * @default {x: 0, y: 0}
		 */
		get velocity(): Q5.Vector;
		set velocity(val: [] | { x: number; y: number } | Q5.Vector);
		/**
		 * A ratio that defines how much the sprite is affected by gravity.
		 * @default 1
		 */
		get gravityScale(): number;
		set gravityScale(val: number);
		/**
		 * If this function is given a force amount, the force is applied
		 * at the angle of the sprite's current bearing. Force can
		 * also be given as a vector.
		 *
		 * @param amount
		 * @param origin The point the force is applied from, relative to the sprite's center of mass. Accepts a coordinate array or object with x and y properties. If not given, the force is applied at the center of mass.
		 */
		applyForce(amount: number, origin?: any): void;
		/**
		 * Applies a force that's scaled to the sprite's mass.
		 *
		 * @param amount
		 * @param n The point the force is applied from, relative to the sprite's center of mass. Accepts a coordinate array or object with x and y properties. If not given, the force is applied at the center of mass.
		 */
		applyForceScaled(amount: number, origin?: any): void;
		/**
		 * Applies a force to the sprite's center of mass attracting it to
		 * the given position.
		 * @param x x coordinate or coordinate array or object with x and y properties
		 * @param y
		 * @param force
		 */
		attractTo(x: number | any, y?: number, force?: number): void;
		/**
		 * Applies a force to the sprite's center of mass attracting it to
		 * the given position.
		 *
		 * Radius and easing not implemented yet!
		 *
		 * @param x x coordinate or coordinate array or object with x and y properties
		 * @param y
		 * @param force
		 */
		repelFrom(x: number | any, y?: number, force?: number): void;
		/**
		 * Apply a torque on the sprite's physics body.
		 * Torque is the force that causes rotation.
		 * A positive torque will rotate the sprite clockwise.
		 * A negative torque will rotate the sprite counter-clockwise.
		 *
		 * This function is the rotational equivalent of applyForce().
		 * It will not imperatively set the sprite's rotation.
		 *
		 * @param torque
		 */
		applyTorque(torque: any): void;
		/**
		 * Moves a sprite towards a position at a percentage of the distance
		 * between itself and the destination.
		 *
		 * @param x destination x or coordinate array or an object with x and y properties
		 * @param y destination y
		 * @param tracking percent of the distance to move towards the destination as a 0-1 value, default is 0.1 (10% tracking)
		 */
		moveTowards(x: number | any, y?: number, tracking?: number): void;
		/**
		 * Moves the sprite away from a position, the opposite of moveTowards,
		 * at a percentage of the distance between itself and the position.
		 * @param x destination x or coordinate array or an object with x and y properties
		 * @param y destination y
		 * @param repel percent of the distance to the repel position as a 0-1 value, default is 0.1 (10% repel)
		 */
		moveAway(x: number | any, y?: number, repel?: number): void;
		/**
		 * Rotates the sprite towards an angle or position
		 * with x and y properties.
		 *
		 * @param angle angle in degrees or coordinate array or an object with x and y properties
		 * @param tracking percent of the distance to rotate on each frame towards the target angle, default is 0.1 (10%)
		 * @param facing (only specify if position is given) rotation angle the sprite should be at when "facing" the position, default is 0
		 */
		rotateTowards(angle: number | any, tracking?: number): void;
		/**
		 * Finds the angle from this sprite to the given position.
		 *
		 * Can be used to change the direction of a sprite so it moves
		 * to a position or object, as shown in the example.
		 *
		 * Used internally by `moveTo` and `moveTowards`.
		 *
		 * @param x x coordinate or coordinate array or object with x and y properties
		 * @param y
		 * @returns angle
		 */
		angleTo(x: number | any, y?: number): number;
		/**
		 * Finds the rotation angle the sprite should be at when "facing"
		 * a position.
		 *
		 * @param x x coordinate or coordinate array or object with x and y properties
		 * @param y
		 * @param facing relative angle the sprite should be at when "facing" the position, default is 0
		 * @returns the rotation angle the sprite should be at when "facing" the position
		 */
		rotationToFace(x: number | any, y?: number, facing?: number): number;
		/**
		 * Finds the minimum angle distance that the sprite would have
		 * to rotate to "face" a position at a specified facing rotation,
		 * taking into account the current rotation of the sprite.
		 *
		 * Used internally by `rotateTowards`.
		 *
		 * @param x x coordinate or coordinate array or object with x and y properties
		 * @param y
		 * @param facing relative angle the sprite should be at when "facing" the position, default is 0
		 * @returns the minimum angle distance to face the position
		 */
		angleToFace(x: number | any, y?: number, facing?: number): number;
		/**
		 * Deletes the Sprite from the sketch and all the groups it
		 * belongs to.
		 *
		 * When a sprite is deleted it will not be drawn or updated anymore.
		 * If it has a physics body, it will be deleted from the physics simulation.
		 *
		 * There's no way to undo this operation. If you want to hide a
		 * sprite use `sprite.visible = false` instead.
		 */
		delete(): void;
		/**
		 * Returns the sprite's unique identifier `sprite.idNum`.
		 * @returns the sprite's id
		 */
		toString(): string;
		/**
		 * Returns true on the first frame that the sprite collides with the
		 * target sprite or group.
		 *
		 * Custom collision event handling can be done by using this function
		 * in an if statement or adding a callback as the second parameter.
		 *
		 * @param target
		 * @param callback
		 */
		collides(target: Sprite | Group, callback?: Function): boolean;
		/**
		 * Returns a truthy value while the sprite is colliding with the
		 * target sprite or group. The value is the number of frames that
		 * the sprite has been colliding with the target.
		 *
		 * @param target
		 * @param callback
		 * @return {Number} frames
		 */
		colliding(target: Sprite | Group, callback?: Function): number;
		/**
		 * Returns true on the first frame that the sprite no longer overlaps
		 * with the target sprite or group.
		 *
		 * @param target
		 * @param callback
		 * @return {Boolean}
		 */
		collided(target: Sprite | Group, callback?: Function): boolean;
		/**
		 * Returns true on the first frame that the sprite overlaps with the
		 * target sprite or group.
		 *
		 * Custom overlap event handling can be done by using this function
		 * in an if statement or adding a callback as the second parameter.
		 *
		 * @param target
		 * @param callback
		 */
		overlaps(target: Sprite | Group, callback?: Function): boolean;
		/**
		 * Returns a truthy value while the sprite is overlapping with the
		 * target sprite or group. The value returned is the number of
		 * frames the sprite has been overlapping with the target.
		 *
		 * @param target
		 * @param callback
		 * @return {Number} frames
		 */
		overlapping(target: Sprite | Group, callback?: Function): number;
		/**
		 * Returns true on the first frame that the sprite no longer overlaps
		 * with the target sprite or group.
		 *
		 * @param target
		 * @param callback
		 * @return {Boolean}
		 */
		overlapped(target: Sprite | Group, callback?: Function): boolean;
		/**
		 * Sets a pass through contact relationship between the sprite
		 * and a target sprite or group.
		 * @param target
		 */
		passes(target: Sprite | Group): void;
		/**
		 * Creates overlap sensors that are the same size as the sprite's
		 * colliders. If you'd like to add more sensors to a sprite, use the
		 * `addSensor` function.
		 *
		 * Used internally if a sprite overlap detection
		 * function is called but the sprite has no overlap sensors.
		 */
		addDefaultSensors(): void;
		/**
		 * Returns the distance to another sprite, the mouse, a touch,
		 * or any other object with x and y properties. Uses p5's `dist`
		 * function.
		 * @param o coordinate array or object with x and y properties
		 * @returns distance
		 */
		distanceTo(o: any): number;
	}

	class Ani extends Array<Q5.Image> {
		/**
		 * Ani objects are an array of images
		 * that can be displayed by a Visual or Sprite.
		 *
		 * @param args the frames of the animation
		 */
		constructor(...args: Q5.Image[]);
		/**
		 * The name of the animation
		 */
		name: string;
		targetFrame: number;
		/**
		 * The distance from the sprite or visual's position
		 * that the animation is drawn at.
		 * @prop {Number} x horizontal offset
		 * @prop {Number} y vertical offset
		 */
		offset: { x: number; y: number };
		/**
		 * True if the animation is currently playing.
		 * @default true
		 */
		playing: boolean;
		/**
		 * Animation visibility.
		 * @default true
		 */
		visible: boolean;
		/**
		 * If set to false the animation will stop after reaching the last frame
		 * @default true
		 */
		looping: boolean;
		/**
		 * Ends the loop on frame 0 instead of the last frame.
		 * This is useful for animations that are symmetric.
		 * For example a walking cycle where the first frame is the
		 * same as the last frame.
		 * @default false
		 */
		endOnFirstFrame: boolean;
		/**
		 * True if frame changed during the last draw cycle
		 */
		frameChanged: boolean;
		onComplete: any;
		onChange: any;
		rotation: any;
		spriteSheet: any;
		/**
		 * The index of the current frame that the animation is on.
		 */
		get frame(): number;
		set frame(val: number);
		/**
		 * Delay between frames in number of draw cycles.
		 * If set to 4 the framerate of the animation would be the
		 * sketch framerate divided by 4 (60fps = 15fps)
		 * @default 4
		 */
		get frameDelay(): number;
		set frameDelay(val: number);
		/**
		 * The animation's scale.
		 *
		 * Can be set to a number to scale both x and y
		 * or an object with x and/or y properties.
		 * @default 1
		 */
		get scale(): number | { x: number; y: number };
		set scale(val: number | { x: number; y: number });
		/**
		 * Make a copy of the animation, with its own playback state,
		 * independent of the original animation.
		 *
		 * @return {Ani}
		 */
		clone(): Ani;
		/**
		 * Draws the animation at coordinate x and y.
		 * Updates the frames automatically.
		 *
		 * Optional parameters effect the current draw cycle only and
		 * are not saved between draw cycles.
		 *
		 * @param x horizontal position
		 * @param y vertical position
		 * @param r rotation
		 * @param sx scale x
		 * @param sy scale y
		 */
		draw(x: number, y: number, r?: number, sx?: number, sy?: number): void;
		update(): void;
		/**
		 * Plays the animation, starting from the specified frame.
		 *
		 * @returns [Promise] a promise that resolves when the animation completes
		 */
		play(frame: any): Promise<any>;
		/**
		 * Pauses the animation.
		 */
		pause(frame: any): void;
		/**
		 * Stops the animation. Alt for pause.
		 */
		stop(frame: any): void;
		/**
		 * Plays the animation backwards.
		 * Equivalent to ani.goToFrame(0)
		 *
		 * @returns [Promise] a promise that resolves when the animation completes
		 * rewinding
		 */
		rewind(): Promise<any>;
		/**
		 * Plays the animation forwards and loops it.
		 */
		loop(): void;
		/**
		 * Prevents the animation from looping
		 */
		noLoop(): void;
		/**
		 * Goes to the next frame and stops.
		 */
		nextFrame(): void;
		/**
		 * Goes to the previous frame and stops.
		 */
		previousFrame(): void;
		/**
		 * Plays the animation forward or backward toward a target frame.
		 *
		 * @param toFrame Frame number destination (starts from 0)
		 * @returns [Promise] a promise that resolves when the animation completes
		 */
		goToFrame(toFrame: number): Promise<any>;
		/**
		 * The index of the last frame. Read only.
		 */
		get lastFrame(): number;
		/**
		 * The current frame as Q5.Image. Read only.
		 */
		get frameImage(): Q5.Image;
		/**
		 * Width of the animation's current frame.
		 */
		get w(): number;
		/**
		 * Width of the animation's current frame.
		 */
		get width(): number;
		get defaultWidth(): any;
		/**
		 * Height of the animation's current frame.
		 */
		get h(): number;
		/**
		 * Height of the animation's current frame.
		 */
		get height(): number;
		get defaultHeight(): any;
	}
	/**
	 * Stores animations.
	 * 
	 * Used internally to create `sprite.anis` and `group.anis`.
	 *
	 * In instances of this class, the keys are animation names,
	 * values are Ani objects.
	 */
	class Anis {}

	class Group extends Array<Sprite> {
		/**
		 * An array of sprites with similar traits and behaviors.
		 *
		 * Group extends Array, so you can use them in for of loops. They
		 * inherit all the functions and properties of standard arrays
		 * such as `group.length` and functions like `group.includes()`.
		 *
		 * Changing a group setting changes it for all the sprites in the
		 * group, similar to class inheritance. Groups can have subgroups,
		 * creating a hierarchy of inheritance.
		 *
		 * @param sprites the sprites to add to the group
		 */
		constructor(...sprites: Sprite[]);

		x: number;
		y: number;
		vel: number;
		velocity: number;
		rotation: number;
		rotationSpeed: number;

		autoDraw: boolean;
		allowSleeping: boolean;
		autoUpdate: number;
		bearing: number;
		bounciness: number;
		color: Q5.Color;
		d: number;
		diameter: number;
		debug: boolean;
		deleted: boolean;
		density: number;
		direction: number;
		drag: number;
		// fill is an Array method
		friction: number;
		gravityScale: number;
		heading: string;
		h: number;
		height: number;
		isSuperFast: boolean;
		layer: number;
		life: number;
		mass: number;
		physics: string;
		physicsType: string;
		physicsEnabled: boolean;
		pixelPerfect: boolean;
		rollingResistance: number;
		rotationDrag: number;
		rotationLock: boolean;
		scale: Q5.Vector;
		shape: number;
		sleeping: boolean;
		stroke: Q5.Color;
		strokeWeight: number;
		speed: number;
		surfaceSpeed: number;
		text: number;
		textFill: Q5.Color;
		textStroke: Q5.Color;
		textStrokeWeight: number;
		textSize: number;
		tile: string;
		visible: boolean;
		w: number;
		width: number;

		/**
		 * Each group has a unique id number. Don't change it!
		 * It's useful for debugging.
		 */
		idNum: number;
		/**
		 * Groups can have subgroups, which inherit the properties
		 * of their parent groups.
		 * @default []
		 */
		subgroups: {
			[x: string]: any;
		}[];
		parent: any;
		/**
		 * Keys are the animation label, values are Ani objects.
		 */
		animations: Anis;
		/**
		 * Creates a new sprite with the traits of the group and adds it to the group.
		 */
		Sprite: typeof Sprite;
		/**
		 * Creates a new subgroup that inherits the traits of the group.
		 */
		Group: typeof Group;
		/**
		 * A property of the `allSprites` group only,
		 * that controls whether sprites are automatically deleted
		 * when they are 10,000 pixels away from the camera.
		 *
		 * It only needs to be set to false once and then it will
		 * remain false for the rest of the sketch, unless changed.
		 */
		autoCull: boolean;
		/**
		 * Alias for `group.push`.
		 *
		 * Adds a sprite to the end of the group.
		 */
		add: (...sprites: Sprite[]) => number;
		/**
		 * Alias for `group.includes`.
		 *
		 * Check if a sprite is in the group.
		 */
		contains: (searchElement: Sprite, fromIndex?: number) => boolean;
		/**
		 * Reference to the group's current animation.
		 */
		get ani(): Ani;
		set ani(val: Ani);
		/**
		 * Reference to the group's current animation.
		 */
		get animation(): Ani;
		set animation(val: Ani);
		/**
		 * The group's animations.
		 */
		get anis(): Anis;
		/**
		 * Alias for `group.image`.
		 */
		get img(): Q5.Image;
		set img(val: Q5.Image);
		/**
		 * The group's image.
		 */
		get image(): Q5.Image;
		set image(img: Q5.Image);
		/**
		 * Depending on the value that the amount property is set to, the group will
		 * either add or delete sprites.
		 */
		get amount(): number;
		set amount(val: number);
		/**
		 * Returns true on the first frame that the group collides with the
		 * target group.
		 *
		 * Custom collision event handling can be done by using this function
		 * in an if statement or adding a callback as the second parameter.
		 *
		 * @param target
		 * @param callback
		 */
		collides(target: Group, callback?: Function): boolean;
		/**
		 * Returns the amount of frames that the group has been colliding
		 * with the target group for, which is a truthy value. Returns 0 if
		 * the group is not colliding with the target group.
		 *
		 * @param target
		 * @param callback
		 * @return {Number} frames
		 */
		colliding(target: Group, callback?: Function): number;
		/**
		 * Returns true on the first frame that the group no longer overlaps
		 * with the target group.
		 *
		 * @param target
		 * @param callback
		 * @return {Boolean}
		 */
		collided(target: Group, callback?: Function): boolean;
		/**
		 * Returns true on the first frame that the group overlaps with the
		 * target group.
		 *
		 * Custom overlap event handling can be done by using this function
		 * in an if statement or adding a callback as the second parameter.
		 *
		 * @param target
		 * @param callback
		 */
		overlaps(target: Group, callback?: Function): boolean;
		/**
		 * Returns the amount of frames that the group has been overlapping
		 * with the target group for, which is a truthy value. Returns 0 if
		 * the group is not overlapping with the target group.
		 *
		 * @param target
		 * @param callback
		 * @return {Number} frames
		 */
		overlapping(target: Group, callback?: Function): number;
		/**
		 * Returns true on the first frame that the group no longer overlaps
		 * with the target group.
		 *
		 * @param target
		 * @param callback
		 * @return {Boolean}
		 */
		overlapped(target: Group, callback?: Function): boolean;
		/**
		 * Sets a pass through contact relationship between the group and the target group.
		 * @param target
		 */
		passes(target: Group): void;
		applyForce(amount: number, origin?: [] | { x: number; y: number } | Q5.Vector): void;
		applyForceScaled(amount: number, origin?: [] | { x: number; y: number } | Q5.Vector): void;
		attractTo(...args: any[]): void;
		applyTorque(...args: any[]): void;
		moveTowards(x: any, y: any, tracking: any): void;
		moveAway(x: any, y: any, repel: any): void;
		repelFrom(...args: any[]): void;
		/**
		 * Alias for group.length
		 * @deprecated
		 */
		size(): number;
		/**
		 * Detects when sprites go outside the given culling boundary
		 * relative to the camera.
		 *
		 * By default, culled sprites are deleted, but a callback function
		 * can be provided to perform other operations on the culled sprites.
		 *
		 * @param top the distance that sprites can move below the canvas before they are removed
		 * @param bottom the distance that sprites can move below the canvas before they are removed
		 * @param left the distance that sprites can move beyond the left side of the canvas before they are removed
		 * @param right the distance that sprites can move beyond the right side of the canvas before they are removed
		 * @param cb the function to be run when a sprite is culled,
		 * it's given the sprite being culled, if no callback is given then the
		 * sprite is removed
		 * @return {Number} the number of sprites culled
		 */
		cull(top: number, bottom: number, left: number, right: number, cb?: Function): number;
		/**
		 * If removalCount is greater than 0, that amount of
		 * sprites starting from the start index will be removed
		 * from this group and its sub groups recursively (if any),
		 *
		 * Then any provided sprites will be added at the start index
		 * to this group and at the end of each of its parent groups recursively,
		 * if not already present in parent groups.
		 *
		 * @param start start index
		 * @param removalCount number of sprites to remove, starting from the start index
		 * @param sprites sprites to add at start index
		 * @return {Sprite[]} the removed sprites
		 */
		splice(start: number, removalCount: number, ...sprites: Sprite[]): Sprite[];
		/**
		 * Removes a sprite from this group and its sub groups (if any),
		 * but does not delete it from the world.
		 *
		 * @param item the sprite to be deleted or its index
		 * @return {Sprite} the deleted sprite or undefined if the specified sprite was not found
		 */
		remove(item: Sprite | number): Sprite;
		/**
		 * Deletes the group and all its sprites
		 * from the world and every other group they belong to.
		 *
		 * Don't attempt to use a group after deleting it.
		 */
		delete(): void;
		/**
		 * Deletes all the sprites in the group.
		 *
		 * Does not delete the group itself.
		 */
		deleteAll(): void;
		/**
		 * Updates all the sprites in the group.
		 */
		update(): void;
		/**
		 * Draws all the sprites in the group.
		 */
		draw(): void;
	}

	class World {
		mod: {};
		/**
		 * Changes the world's origin point,
		 * where (0, 0) is on the canvas.
		 * @property {Number} x
		 * @property {Number} y
		 * @default { x: 0, y: 0 }
		 */
		origin: any;
		contacts: any[];
		/**
		 * @default 8
		 */
		velocityIterations: number;
		/**
		 * @default 3
		 */
		positionIterations: number;
		/**
		 * The lowest velocity an object can have before it is considered
		 * to be at rest.
		 *
		 * Adjust the velocity threshold to allow for slow moving objects
		 * but don't have it be too low, or else objects will never sleep,
		 * which will hurt performance.
		 *
		 * @default 0.19
		 */
		get velocityThreshold(): number;
		set velocityThreshold(val: number);
		/**
		 * The time elapsed in the physics simulation in seconds.
		 */
		physicsTime: number;
		/**
		 * Represents the size of a meter in pixels.
		 *
		 * Adjusting this property changes the simulated scale of the physics world.
		 * For optimal results, it should be set such that sprites are between
		 * 0.1 and 10 meters in size in the physics simulation.
		 *
		 * The default value is 60, which means that your sprites should optimally
		 * be between 6 and 600 pixels in size.
		 * @default 60
		 */
		meterSize: number;
		/**
		 * The sprite the mouse is hovering over.
		 *
		 * If the mouse is hovering over several sprites, the mouse
		 * sprite will be the one with the highest layer value.
		 * @default null
		 */
		mouseSprite: Sprite;
		/**
		 * The sprite(s) that the mouse is hovering over.
		 * @default []
		 */
		mouseSprites: Sprite[];
		/**
		 * @default true
		 */
		autoStep: boolean;
		step: (timeStep?: number, velocityIterations?: number, positionIterations?: number) => void;
		steppedEvent: Event;
		/**
		 * Gravity force vector that affects all dynamic physics colliders.
		 * @property {Number} x
		 * @property {Number} y
		 * @default { x: 0, y: 0 }
		 */
		get gravity(): any;
		set gravity(val: any);
		/**
		 * A time scale of 1.0 represents real time.
		 * Accepts decimal values between 0 and 2.
		 * @default 1.0
		 */
		get timeScale(): number;
		set timeScale(val: number);
		/**
		 * The fixed update rate of the physics simulation in hertz.
		 *
		 * The time step, the amount of time that passes during a
		 * physics update, is calculated to be: 1 / updateRate * timeScale
		 *
		 * Setting the update rate to a value lower than 50hz is not
		 * recommended, as simulation quality will degrade.
		 * @default 60
		 */
		get updateRate(): number;
		set updateRate(val: number);
		/**
		 * Performs a physics simulation step that advances all sprites'
		 * forward in time by 1/60th of a second if no timeStep is given.
		 *
		 * This function is automatically called at the end of the draw
		 * loop, unless it was already called inside the draw loop.
		 *
		 * Setting the timeStep below 1/50th of a second will
		 * significantly degrade simulation quality, without improving
		 * performance. Decreasing `velocityIterations` and
		 * `positionIterations` will improve performance but decrease
		 * simulation quality.
		 *
		 * @param timeStep time step in seconds
		 * @param velocityIterations 8 by default
		 * @param positionIterations 3 by default
		 */
		physicsUpdate(timeStep?: number, velocityIterations?: number, positionIterations?: number): void;
		/**
		 * Experimental!
		 *
		 * Visually moves all sprites forward in time by the given
		 * time step, based on their current velocity vector and
		 * rotation speed.
		 *
		 * Does not perform any physics calculations.
		 *
		 * This function may be useful for making extrapolated frames
		 * between physics steps, if a frame rate of 100hz or more
		 * is desired.
		 * @param timeStep time step in seconds
		 */
		extrapolationUpdate(timeStep?: number): void;
		/**
		 * The real time in seconds since the world was created, including
		 * time spent paused.
		 */
		get realTime(): number;
		/**
		 * Returns the sprites at a position, ordered by layer.
		 *
		 * Sprites must have a physics body to be detected.
		 * @param x x coordinate or coordinate array or object with x and y properties
		 * @param y
		 * @param group limit results to a specific group,
		 * allSprites by default
		 * @param cameraActiveWhenDrawn limit results to
		 * sprites drawn when the camera was active, true by default
		 * @returns an array of sprites
		 */
		getSpritesAt(x: number | any, y?: number, group?: Group, cameraActiveWhenDrawn?: boolean): Sprite[];
		/**
		 * Returns the sprite at the specified position
		 * on the top most layer, drawn when the camera was on.
		 *
		 * The sprite must have a physics body to be detected.
		 * @param x x coordinate or coordinate array or object with x and y properties
		 * @param y
		 * @param group the group to search
		 * @returns a sprite
		 */
		getSpriteAt(x: number | any, y?: number, group?: Group): Sprite;
		getMouseSprites(): Sprite[];
		/**
		 * "Sleeping" sprites get temporarily ignored during physics
		 * simulation. A sprite starts "sleeping" when it stops moving and
		 * doesn't collide with anything that it wasn't already touching.
		 *
		 * This is an important performance optimization that you probably
		 * shouldn't disable for every sprite in the world.
		 * @default true
		 */
		get allowSleeping(): boolean;
		set allowSleeping(val: boolean);
		/**
		 * Finds the first sprite (with a physics body) that
		 * intersects a ray (line), excluding any sprites that intersect
		 * with the starting point.
		 * 
		 * @param startPos starting position of the ray cast
		 * @param direction direction of the ray
		 * @param maxDistance max distance the ray should check
		 * @returns The first sprite the ray hits or undefined
		 */
		rayCast(startPos: any, direction: number, maxDistance: number): Sprite;
		/**
		 * Finds sprites (with physics bodies) that intersect
		 * a line (ray), excluding any sprites that intersect the
		 * starting point.
		 * 
		 * @param startPos starting position of the ray cast
		 * @param direction direction of the ray
		 * @param maxDistance max distance the ray should check
		 * @param limiter limiter function that's run each time the ray intersects a sprite, return true to stop the ray
		 * @returns An array of sprites that the ray cast hit, sorted by distance. The sprite closest to the starting point will be at index 0.
		 */
		rayCastAll(startPos: any, direction: number, maxDistance: number, limiter?: Function): Sprite[];
	}

	class Camera {
		/**
		 * Read only. True if the camera is active.
		 * Use camera.on() to activate the camera.
		 * @default false
		 */
		isActive: boolean;
		/**
		 * The camera's position. {x, y}
		 */
		get pos(): any;
		set pos(val: any);
		/**
		 * The camera's x position.
		 */
		get x(): number;
		set x(val: number);
		/**
		 * The camera's y position.
		 */
		get y(): number;
		set y(val: number);
		/**
		 * The camera's position. Alias for pos.
		 */
		get position(): any;
		set position(val: any);
		/**
		 * Moves the camera to a position.
		 *
		 * @param x
		 * @param y
		 * @param speed
		 * @returns resolves true when the camera reaches the target position
		 */
		moveTo(x: number, y: number, speed: number): Promise<boolean>;
		/**
		 * Camera zoom.
		 *
		 * A scale of 1 will be the normal size. Setting it to 2
		 * will make everything appear twice as big. .5 will make
		 * everything look half size.
		 * @default 1
		 */
		get zoom(): number;
		set zoom(val: number);
		/**
		 * Zoom the camera at a given speed.
		 *
		 * @param target The target zoom
		 * @param speed The amount of zoom per frame
		 * @returns resolves true when the camera reaches the target zoom
		 */
		zoomTo(target: number, speed: number): Promise<boolean>;
		/**
		 * Activates the camera.
		 *
		 * The canvas will be drawn according to the camera position and scale until
		 * camera.off() is called.
		 */
		on(): void;
		/**
		 * Deactivates the camera.
		 *
		 * The canvas will be drawn normally, ignoring the camera's position
		 * and scale until camera.on() is called.
		 */
		off(): void;
	}

	class Joint {
		/**
		 * Joints are used to constrain the movement of two sprites relative
		 * to each other. They can be used to create complex physics objects.
		 *
		 * Don't use the Joint constructor directly, use one of these
		 * joint constructors instead:
		 *
		 * GlueJoint, DistanceJoint, WheelJoint, HingeJoint,
		 * SliderJoint, or GrabberJoint.
		 *
		 * @param spriteA
		 * @param spriteB
		 * @param type
		 */
		constructor(spriteA: Sprite, spriteB: Sprite, type?: string);
		/**
		 * The first sprite in the joint.
		 */
		spriteA: Sprite;
		/**
		 * The second sprite in the joint.
		 */
		spriteB: Sprite;
		/**
		 * The type of joint. Can be one of:
		 *
		 * "glue", "distance", "wheel", "hinge", "slider", or "grabber".
		 *
		 * Can't be changed after the joint is created.
		 */
		type: string;
		/**
		 * Determines whether to draw the joint if spriteA
		 * or spriteB is drawn.
		 * @default true
		 */
		visible: boolean;
		/**
		 * Offset to the joint's anchorA position from the center of spriteA.
		 *
		 * Only distance and hinge joints have an offsetA.
		 * @default {x: 0, y: 0}
		 */
		get offsetA(): Q5.Vector;
		set offsetA(val: Q5.Vector);
		/**
		 * Offset to the joint's anchorB position from the center of spriteB.
		 *
		 * Only distance, hinge, and wheel joints have an offsetB.
		 * @default {x: 0, y: 0}
		 */
		get offsetB(): Q5.Vector;
		set offsetB(val: Q5.Vector);
		/**
		 * Function that draws the joint. Can be overridden by the user.
		 */
		get draw(): Function;
		set draw(val: Function);
		/**
		 * Set to true if you want the joint's sprites to collide with
		 * each other.
		 * @default false
		 */
		get collideConnected(): boolean;
		set collideConnected(val: boolean);
		/**
		 * How much force the joint is applying to keep the two sprites together.
		 * @readonly
		 */
		get reactionForce(): any;
		/**
		 * How much torque the joint is applying to keep the two sprites together.
		 * @readonly
		 */
		get reactionTorque(): any;
		/**
		 * The amount of force that must be applied to the joint before it breaks.
		 * 
		 * Setting the threshold too high leads to instability. Use
		 * `sprite.addCollider` to simulate unbreakable bonds between shapes.
		 * @default 500
		 */
		get forceThreshold(): number;
		set forceThreshold(val: number);
		/**
		 * The amount of torque that must be applied to the joint before it breaks.
		 *
		 * Setting the threshold too high leads to instability. Use
		 * `sprite.addCollider` to simulate unbreakable bonds between shapes.
		 * @default 500
		 */
		get torqueThreshold(): number;
		set torqueThreshold(val: number);
		/**
		 * This function is run when the joint's reaction force exceeds the
		 * force threshold or its reaction torque exceeds the torque threshold.
		 * 
		 * By default, the sprites' speed and rotation speed are set to 0
		 * and the joint is deleted, simulating a break.
		 */
		onStrain(): void;
		/**
		 * Deletes the joint from the world and from each of the
		 * associated sprites' joints arrays.
		 */
		delete(): void;
	}

	class GlueJoint extends Joint {
		/**
		 * Glue joints are used to glue two sprites together.
		 *
		 * @param spriteA
		 * @param spriteB
		 */
		constructor(spriteA: Sprite, spriteB: Sprite);
		get springiness(): number;
		set springiness(val: number);
		get damping(): number;
		set damping(val: number);
	}

	class DistanceJoint extends Joint {
		/**
		 * Distance joints are used to constrain the distance
		 * between two sprites.
		 *
		 * @param spriteA
		 * @param spriteB
		 */
		constructor(spriteA: Sprite, spriteB: Sprite);
		/**
		 * The current distance between the two joint anchors.
		 * @readonly
		 */
		get currentLength(): number;
		/**
		 * The target length of the joint between the two joint anchors.
		 * 
		 * It's set to the current distance between the two sprites
		 * when the joint is created.
		 */
		get length(): number;
		set length(val: number);
		/**
		 * Whether the joint's length limits are enabled.
		 * When enabled a min/max length range constrains the joint.
		 * @default false
		 */
		get limitsEnabled(): boolean;
		set limitsEnabled(val: boolean);
		/**
		 * The minimum length allowed when limits are enabled.
		 */
		get minLength(): number;
		/**
		 * The maximum length allowed when limits are enabled.
		 */
		get maxLength(): number;
		/**
		 * Accepts an array that contains the minimum and maximum length limits.
		 */
		set range(val: [number, number]);
		/**
		 * Whether spring behavior is enabled for the joint.
		 * @default true
		 */
		get springEnabled(): boolean;
		set springEnabled(val: boolean);
		/**
		 * The springiness of the joint, a 0-1 ratio.
		 *
		 * 0 is rigid, 0.5 is bouncy, 1 is loose.
		 * @default 0
		 */
		get springiness(): number;
		set springiness(val: number);
		/**
		 * Damping is a 0-1 ratio describing how quickly the joint loses
		 * vibrational energy.
		 * 
		 * 0.0 means no damping, 1.0 means critical damping, which will stop
		 * the joint from vibrating at all.
		 *
		 * Damping only effects joints that have a
		 * springiness greater than 0.
		 * @default 0.0
		 */
		get damping(): number;
		set damping(val: number);
		/**
		 * Whether the joint's motor is enabled.
		 * @default false
		 */
		get motorEnabled(): boolean;
		set motorEnabled(val: boolean);
		/**
		 * Motor speed.
		 * @default 0
		 */
		get speed(): number;
		set speed(val: number);
		/**
		 * Maximum motor force the motor can apply.
		 */
		get maxPower(): number;
		set maxPower(val: number);
		/**
		 * The current motor force being applied by the joint.
		 * @readonly
		 */
		get power(): number;
	}

	class WheelJoint extends Joint {
		/**
		 * Wheel joints can be used to create vehicles!
		 *
		 * By default `motorEnabled` is false, `angle` is 90 degrees,
		 * `maxPower` is 1000, `springiness` is 0.1, and `damping` is 0.7.
		 *
		 * @param spriteA the vehicle body
		 * @param spriteB the wheel
		 */
		constructor(spriteA: Sprite, spriteB: Sprite);
		/**
		 * The angle at which the wheel is attached to the vehicle body.
		 *
		 * The default is 90 degrees (PI/2 in radians).
		 * @default 90
		 */
		get angle(): number;
		set angle(val: number);
		/**
		 * The current distance between the two joint anchors.
		 * @readonly
		 */
		get currentLength(): number;
		/**
		 * The target length of the joint between the two joint anchors.
		 *
		 * It's set to the current distance between the two sprites
		 * when the joint is created.
		 */
		get length(): number;
		set length(val: number);
		/**
		 * Whether the joint's length limits are enabled.
		 * When enabled a min/max length range constrains the joint.
		 * @default false
		 */
		get limitsEnabled(): boolean;
		set limitsEnabled(val: boolean);
		/**
		 * The minimum length allowed when limits are enabled.
		 */
		get minLength(): number;
		/**
		 * The maximum length allowed when limits are enabled.
		 */
		get maxLength(): number;
		/**
		 * Accepts an array that contains the minimum and maximum length limits.
		 */
		set range(val: [number, number]);
		/**
		 * Whether spring behavior is enabled for the joint.
		 * @default true
		 */
		get springEnabled(): boolean;
		set springEnabled(val: boolean);
		/**
		 * The springiness of the joint, a 0-1 ratio.
		 *
		 * 0.0 is rigid, 0.5 is bouncy, 1.0 is loose.
		 * @default 0.0
		 */
		get springiness(): number;
		set springiness(val: number);
		/**
		 * Damping is a 0-1 ratio describing how quickly the joint loses
		 * vibrational energy.
		 *
		 * 0.0 means no damping, 1.0 means critical damping, which will stop
		 * the joint from vibrating at all.
		 *
		 * Damping only effects joints that have a
		 * springiness greater than 0.
		 * @default 0.0
		 */
		get damping(): number;
		set damping(val: number);
		/**
		 * Whether the joint's motor is enabled.
		 * @default false
		 */
		get motorEnabled(): boolean;
		set motorEnabled(val: boolean);
		/**
		 * Motor speed.
		 * @default 0
		 */
		get speed(): number;
		set speed(val: number);
		/**
		 * Maximum torque the motor can apply.
		 */
		get maxPower(): number;
		set maxPower(val: number);
		/**
		 * The current torque being applied by the motor.
		 * @readonly
		 */
		get power(): number;
	}

	class HingeJoint extends Joint {
		/**
		 * Hinge joints attach two sprites together at a pivot point,
		 * constraining them to rotate around this point, like a hinge.
		 *
		 * A known as a revolute joint.
		 *
		 * @param spriteA
		 * @param spriteB
		 */
		constructor(spriteA: Sprite, spriteB: Sprite);
		/**
		 * Whether the joint's angle limits are enabled.
		 * When enabled a min/max angle range constrains the joint.
		 * @default false
		 */
		get limitsEnabled(): boolean;
		set limitsEnabled(val: boolean);
		/**
		 * The lower limit of rotation.
		 * @default undefined
		 */
		get minAngle(): number;
		/**
		 * The upper limit of rotation.
		 * @default undefined
		 */
		get maxAngle(): number;
		/**
		 * Accepts an array that contains the lower and upper limits of rotation.
		 */
		set range(val: [number, number]);
		/**
		 * Read only. The joint's current angle of rotation.
		 */
		get angle(): number;
	}

	class SliderJoint extends Joint {
		/**
		 * A slider joint constrains the motion of two sprites to sliding
		 * along a common axis, without rotation.
		 *
		 * Also known as a prismatic joint.
		 *
		 * @param spriteA
		 * @param spriteB
		 */
		constructor(spriteA: Sprite, spriteB: Sprite);
		/**
		 * The joint's range of translation. Setting the range
		 * changes the joint's upper and lower limits.
		 * @default undefined
		 */
		get range(): number;
		set range(val: number);
		/**
		 * The mathematical upper (not positionally higher)
		 * limit of translation.
		 * @default undefined
		 */
		get upperLimit(): number;
		set upperLimit(val: number);
		/**
		 * The mathematical lower (not positionally lower)
		 * limit of translation.
		 * @default undefined
		 */
		get lowerLimit(): number;
		set lowerLimit(val: number);
	}

	class RopeJoint extends Joint {
		/**
		 * A Rope joint prevents two sprites from going further
		 * than a certain distance from each other, which is
		 * defined by the max length of the rope, but they do allow
		 * the sprites to get closer together.
		 *
		 * @param spriteA
		 * @param spriteB
		 */
		constructor(spriteA: Sprite, spriteB: Sprite);
		/**
		 * The maximum length of the rope.
		 */
		get maxLength(): number;
		set maxLength(val: number);
	}

	class GrabberJoint extends Joint {
		/**
		 * A Grabber joint enables you to grab sprites and move them with
		 * a max force towards a target position.
		 *
		 * @param sprite the sprite to grab
		 */
		constructor(sprite: Sprite);
		/**
		 * The target position of the joint that the sprite will be
		 * moved towards. Can be a coordinate array or object with x and y properties.
		 */
		get target(): any;
		set target(pos: any);
		/**
		 * The maximum force that the joint can exert on the sprite.
		 * 
		 * By default it's 100 * the sprite's mass * the absolute force of gravity,
		 * if there is gravity.
		 */
		get maxForce(): number;
		set maxForce(val: number);
	}
	class Scale {
		valueOf(): number;
	}
	function colorPal(c: string, palette: number | any): string;
	function EmojiImage(emoji: string, textSize: number): Q5.Image;
	function spriteArt(txt: string, scale: number, palette: number | any): Q5.Image;
	function createSprite(...args: any[]): Sprite;
	function createGroup(...args: any[]): Group;
	function loadAnimation(...args: any[]): Ani;
	function loadAni(...args: any[]): Ani;
	function animation(ani: Ani, x: number, y: number, r: number, sX: number, sY: number): void;
	function delay(milliseconds: any): Promise<any>;
	function sleep(milliseconds: any): Promise<any>;
	function play(sound: any): Promise<any>;
	let userDisabledP5Errors: boolean;

	function resizeCanvas(w: any, h: any): void;
	function frameRate(hz: any): any;
	function background(...args: any[]): void;
	function fill(...args: any[]): void;
	function stroke(...args: any[]): void;
	function loadImage(...args: any[]): Q5.Image;
	function loadImg(...args: any[]): Q5.Image;
	/**
	 * A FriendlyError is a custom error class that extends the native JS
	 * Error class. It's used internally by q5play to make error messages
	 * more helpful.
	 *
	 * @private
	 * @param func the name of the function the error was thrown in
	 * @param errorNum the error's code number
	 * @param e an array of values relevant to the error
	 */
	class FriendlyError extends Error {
		constructor(func: any, errorNum: any, e: any);
	}
	let allSprites: Group;
	let world: World;
	let camera: Camera;

	class InputDevice {
		/**
		 * The amount of frames an input must be pressed to be considered held.
		 * @default 12
		 */
		holdThreshold: number;
		/**
		 * @param inp
		 * @returns true on the first frame that the user presses the input
		 */
		presses(inp: string): boolean;
		/**
		 * @param inp
		 * @returns the amount of frames the user has been pressing the input
		 */
		pressing(inp: string): number;
		/**
		 * Same as the `released` function, which is preferred.
		 * @param inp
		 * @returns true on the first frame that the user released the input
		 */
		pressed(inp: string): boolean;
		/**
		 * @param inp
		 * @returns true on the first frame that the user holds the input
		 */
		holds(inp: string): boolean;
		/**
		 * @param inp
		 * @returns the amount of frames the user has been holding the input
		 */
		holding(inp: string): number;
		/**
		 * @param inp
		 * @returns true on the first frame that the user released a held input
		 */
		held(inp: string): boolean;
		/**
		 * @param inp
		 * @returns true on the first frame that the user released the input
		 */
		released(inp: string): boolean;
		releases(inp: any): boolean;
	}

	class _Mouse extends InputDevice {
		/**
		 * The mouse's x position in the world.
		 */
		x: number;
		/**
		 * The mouse's y position in the world.
		 */
		y: number;
		/**
		 * The mouse's absolute position on the canvas.
		 * @property {Number} x
		 * @property {Number} y
		 */
		canvasPos: {};
		/**
		 * The mouse's left button.
		 */
		left: number;
		/**
		 * The mouse's center button.
		 */
		center: number;
		/**
		 * The mouse's right button.
		 */
		right: number;
		/**
		 * Contains the scroll status of the mouse wheel.
		 * @property {Number} x the horizontal scroll amount
		 * @property {Number} y the vertical scroll amount
		 */
		scrollDelta: {};
		/**
		 * Contains the drag status of each of the mouse's buttons.
		 */
		drag: {};
		/**
		 * True if the mouse is currently on the canvas.
		 * @default false
		 */
		isOnCanvas: boolean;
		/**
		 * True if the mouse has ever interacted with the canvas.
		 * @default false
		 */
		isActive: boolean;
		/**
		 * The mouse's position.
		 */
		get pos(): {};
		/**
		 * The mouse's position. Alias for pos.
		 */
		get position(): {};
		set cursor(val: string);
		/**
		 * The mouse's CSS cursor style.
		 * @default 'default'
		 */
		get cursor(): string;
		set visible(val: boolean);
		/**
		 * Controls whether the mouse is visible or not.
		 * @default true
		 */
		get visible(): boolean;
		/**
		 * @param inp
		 * @returns true on the first frame that the user moves the mouse while pressing the input
		 */
		drags(inp: string): boolean;
		/**
		 * @param inp
		 * @returns the amount of frames the user has been moving the mouse while pressing the input
		 */
		dragging(inp: string): number;
		/**
		 * @param inp
		 * @returns true on the first frame that the user releases the input after dragging the mouse
		 */
		dragged(inp: string): boolean;
	}
	let mouse: _Mouse;

	class _Pointer extends InputDevice {
		/**
		 * Used internally to create pointer input objects in the `pointeres` array.
		 */
		constructor(pointer: any);
		/**
		 * The pointer's x position in the physics world.
		 */
		x: number;
		/**
		 * The pointer's y position in the physics world.
		 */
		y: number;
		/**
		 * The pointer's unique identifier.
		 */
		id: number;
		/**
		 * The amount of frames the user has been pressing on the screen with the pointer.
		 */
		duration: number;
		/**
		 * The amount of frames the user has been dragging on the screen with the pointer.
		 */
		drag: number;
		/**
		 * The pointer's absolute position on the canvas.
		 */
		canvasPos: { x: number; y: number };
		/**
		 * The pointer's pressure level, from 0 to 1.
		 *
		 * Not all devices support pressure sensitivity.
		 */
		pressure: number;
	}
	let pointers: _Pointer[];

	class _Keyboard extends InputDevice {
		alt: number;
		arrowUp: number;
		arrowDown: number;
		arrowLeft: number;
		arrowRight: number;
		backspace: number;
		capsLock: number;
		control: number;
		enter: number;
		meta: number;
		shift: number;
		tab: number;
		get visible(): boolean;
		set visible(v: boolean);
		get cmd(): number;
		get command(): number;
		get ctrl(): number;
		get space(): any;
		get opt(): number;
		get option(): number;
		get win(): number;
		get windows(): number;
	}
	let kb: _Keyboard;
	let keyboard: _Keyboard;

	class Contro extends InputDevice {
		/**
		 * Stores the input status of buttons, triggers, and sticks on
		 * game controllers. Used internally to create controller objects
		 * for the `contros` array (aka `controllers`).
		 *
		 * Can also be used to create a mock controller object.
		 * @param gamepad gamepad object or id string for a mock controller
		 */
		constructor(gp: Gamepad | string);
		connected: boolean;
		a: number;
		b: number;
		x: number;
		y: number;
		l: number;
		r: number;
		lt: number;
		rt: number;
		select: number;
		start: number;
		lsb: number;
		rsb: number;
		up: number;
		down: number;
		left: number;
		right: number;
		/**
		 * Has x and y properties with -1 to 1 values which
		 * represent the position of the left analog stick.
		 *
		 * {x: 0, y: 0} is the center position.
		 */
		leftStick: any;
		/**
		 * Has x and y properties with -1 to 1 values which
		 * represent the position of the right analog stick.
		 *
		 * {x: 0, y: 0} is the center position.
		 */
		rightStick: any;
		/**
		 * Analog value 0-1 of the left trigger.
		 * @default 0
		 */
		leftTrigger: number;
		/**
		 * Analog value 0-1 of the right trigger.
		 * @default 0
		 */
		rightTrigger: number;
		/**
		 * Button names are mapped to `gamepad.buttons` indices.
		 */
		buttonMapping: any;
		/**
		 * Sticks and triggers are mapped to `gamepad.axes` indices.
		 */
		axeMapping: any;
		/**
		 * If the controller is a mock controller.
		 */
		isMock: boolean;
		gamepad: Gamepad;
		id: any;
		/**
		 * True if the controller has analog triggers.
		 * False if the controller has digital (button) triggers.
		 */
		hasAnalogTriggers: boolean;
		get cross(): number;
		get circle(): number;
		get square(): number;
		get triangle(): number;
		/**
		 * Alias for `leftStick`.
		 */
		get ls(): any;
		/**
		 * Alias for `rightStick`.
		 */
		get rs(): any;
		/**
		 * Alias for `l` (left button).
		 * `lb` is what the button is called on Xbox controllers.
		 */
		get lb(): number;
		/**
		 * Alias for `r` (right button).
		 * `rb` is what the button is called on Xbox controllers.
		 */
		get rb(): number;
		/**
		 * Alias for `l` (left button).
		 * `l1` is what the button is called on PlayStation controllers.
		 */
		get l1(): number;
		/**
		 * Alias for `r` (right button).
		 * `r1` is what the button is called on PlayStation controllers.
		 */
		get r1(): number;
		/**
		 * Alias for `lt` (digital left trigger).
		 * `zl` is what the button is called on Nintendo controllers.
		 */
		get zl(): number;
		/**
		 * Alias for `rt` (digital right trigger).
		 * `zr` is what the button is called on Nintendo controllers.
		 */
		get zr(): number;
		/**
		 * Alias for `leftTrigger` (analog left trigger).
		 * `l2` is what the trigger is called on PlayStation controllers.
		 */
		get l2(): number;
		/**
		 * Alias for `rightTrigger` (analog right trigger).
		 * `r2` is what the trigger is called on PlayStation controllers.
		 */
		get r2(): number;
		/**
		 * Verbose alias for `lsb`.
		 */
		get leftStickButton(): number;
		/**
		 * Verbose alias for `rsb`.
		 */
		get rightStickButton(): number;
		/**
		 * Alias for `lsb` (left stick button).
		 * `l3` is what the trigger is called on PlayStation controllers.
		 */
		get l3(): number;
		/**
		 * Alias for `rsb` (right stick button).
		 * `r3` is what the trigger is called on PlayStation controllers.
		 */
		get r3(): number;
	}

	class _Contros extends Array<Contro> {
		/**
		 * Used internally to create the `contros` array (aka `controllers`)
		 * of `Contro` objects, which store the input status of buttons,
		 * triggers, and sticks on game controllers.
		 */
		constructor();
		/**
		 * Swap controller positions in this controllers array.
		 * @param indexA
		 * @param indexB
		 */
		swap(indexA: number, indexB: number): void;
		/**
		 * Removes a controller from this controllers array
		 * by setting `contros[index] = null`.
		 *
		 * Newly connected controllers fill the first empty slot.
		 * @param index
		 */
		remove(index: number): void;
		/**
		 * Runs when a controller is connected. By default it
		 * always returns true. Overwrite this function to customize
		 * the behavior.
		 *
		 * For example, it could be customized to filter
		 * controllers based on their model info.
		 *
		 * Doesn't run if a controller in the `controllers` array
		 * is reconnected.
		 * @param gamepad
		 * @returns true if the controller should be added to this q5play controllers array
		 */
		onConnect(gamepad: Gamepad): boolean;
		/**
		 * Runs when a controller is disconnected. by default it
		 * always returns false. Overwrite this function to customize
		 * the behavior.
		 *
		 * Removing a controller from the `controllers` array
		 * usually is not desirable, because the controller could be
		 * reconnected later. By default, the controller is kept in
		 * the array and its state is reset.
		 * @param gamepad
		 * @returns true if the controllers should be removed from this q5play controllers array
		 */
		onDisconnect(gamepad: Gamepad): boolean;
	}
	let contros: _Contros;
	let controllers: _Contros;
	let contro: Contro;
}

export {};
