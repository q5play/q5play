# Auto-generated from q5play.d.ts — do not edit by hand.
# Run: bun lang/types.js

from __future__ import annotations
from typing import Any, Callable, Type, TypeVar, Generic, overload
from collections.abc import Awaitable
from q5 import *

class Q5Play:

    sprites: dict
    """
    Contains all the sprites in the sketch.

    Users should use the `allSprites` group instead
    because this object includes deleted sprites.

    The keys are the sprite's unique ids.
    """

    groups: dict
    """
    Contains all the groups in the sketch.

    The keys are the group's unique ids.
    """

    groupsCreated: float

    spritesCreated: float

    spritesDrawn: float

    palettes: list[Any]
    """
    The default color palette, at index 0 of this array,
    has all the letters of the English alphabet mapped to colors.
    """

    friendlyRounding: bool
    """
    Friendly rounding makes some Sprite getters return nice rounded numbers
    if a decimal value is within linear slop range (+/-0.005) or
    angular slop range (+/-0.000582 radians) of a whole number.

    This is because Box2D physics calculations can result in
    floating point drift, which beginners wouldn't expect.

    Setting to false can slightly improve performance.

    Default: `true`
    """

    os: dict
    """Information about the operating system being used."""

    context: str

    hasMouse: bool

    standardizeKeyboard: bool

    silent: bool
    """
    Set to true to disable q5play's console logs, warnings, and error messages.
    Severe errors will still be thrown.
    """

    quiet: bool
    """
    Set to true to disable q5play's console logs.
    Warnings and errors will still be shown, and severe errors will still be thrown.
    """

    renderStats: bool
    """
    Displays the version of q5play being used,
    the number of sprites being drawn
    and a realtime graphing of the current FPS.

    FPS in this context refers to how many frames per second your
    computer can generate, only based on the physics calculations and
    other processes necessary to generate a frame, but not
    including the delay between when frames are actually shown on
    the screen. The higher the FPS, the better your game is
    performing.

    You can use this function for approximate performance testing.
    But for the most accurate results, use your web browser's
    performance testing tools.

    Generally having less sprites and using a smaller canvas will
    make your game perform better. Also drawing images is faster
    than drawing shapes.

    Default: `false`
    """

    def splashScreen(self) -> Awaitable[None]:
        """
        "Made with q5play" [splash screen](https://en.wikipedia.org/wiki/Splash_screen)
        displayed during initial page load by default.
        """
        ...

    def update(self) -> None:
        """Runs automatically before each q5.draw function call."""
        ...

    def draw(self) -> None:
        """Runs automatically after each q5.draw function call."""
        ...

q5play: Q5Play

Box2D: Any
"""
Box2D v3 ported to WASM is used by
q5play to simulate physics.

This variable enables direct access to the Box2D API for
advanced users who want to do things that aren't wrapped
by q5play.
"""

class Shape:
    """
    Don't create Shapes directly; use `sprite.addCollider()`
    or `sprite.addSensor()` instead.
    """

    sprite: Sprite

    type: str

    geom: Any

    density: float

    def applyWind(self, speed: float, angle: float, drag: float = ..., lift: float = ...) -> None:
        ...

    def scaleBy(self, scaleX: float, scaleY: float = ...) -> None:
        ...

    def delete(self) -> None:
        ...

class Collider(Shape):
    """
    Colliders are added to a sprite's physics body to cause
    physical collisions with other sprites.

    Don't create Colliders directly; use Sprite.addCollider() instead.
    """

    friction: float

    bounciness: float

    density: float

    @property
    def rollingResistance(self) -> float:
        ...

    @rollingResistance.setter
    def rollingResistance(self, val: float) -> None: ...

    @property
    def surfaceSpeed(self) -> float:
        ...

    @surfaceSpeed.setter
    def surfaceSpeed(self, val: float) -> None: ...

class Sensor(Shape):
    """
    Sensor are added to a sprite's physics body to detect overlaps
    without causing physical collisions.

    Don't create Sensors directly; use Sprite.addSensor() instead.
    """

    _isSensor: bool

    density: float

class Visual:
    """
    A Visual object stores an image or animation(s)
    which can be displayed with respect to the camera.
    """

    @property
    def x(self) -> float:
        """Horizontal position of the visual."""
        ...

    @x.setter
    def x(self, val: float) -> None: ...

    @property
    def y(self) -> float:
        """Vertical position of the visual."""
        ...

    @y.setter
    def y(self, val: float) -> None: ...

    vx: float
    """Horizontal velocity of the visual."""

    vy: float
    """Vertical velocity of the visual."""

    @property
    def draw(self) -> Any:
        """Draws the visual on the canvas."""
        ...

    @draw.setter
    def draw(self, val: Any) -> None: ...

    @property
    def img(self) -> Image:
        """Current image or frame of animation being displayed."""
        ...

    @img.setter
    def img(self, val: str | Image) -> None: ...

    @property
    def ani(self) -> Ani:
        """Current animation."""
        ...

    @ani.setter
    def ani(self, val: Ani) -> None: ...

    @property
    def anis(self) -> Anis:
        """
        Stores animations.
        Keys are the animation label, values are Ani objects
        """
        ...

    def addAni(self, spriteSheetURL: str, frameCount: float) -> Awaitable[None]:
        """
        Adds an animation to the Sprite or Visual.

        Args:
            spriteSheetURL: the URL of the sprite sheet image
            frameCount: the number of frames in the sprite sheet

        Returns:
            A promise that fulfills when the animation is loaded
        """
        ...

    @overload
    def addAnis(self, atlases: dict) -> Awaitable[None]:
        """
        Add multiple animations to the Sprite or Visual.

        Args:
            atlases: an object with animation names as keys and an animation or animation atlas as values

        Returns:
            A promise that fulfills when the animations are loaded
        """
        ...

    @overload
    def addAnis(self, spriteSheetURL: str, atlases: dict) -> Awaitable[None]:
        """
        Add multiple animations to the Sprite or Visual.

        Args:
            spriteSheetURL: the URL of the sprite sheet image
            atlases: an object with animation names as keys and an animation or animation atlas as values

        Returns:
            A promise that fulfills when the animations are loaded
        """
        ...

    @overload
    def addAnis(self, spriteSheetURL: str, frameSize: str, atlases: dict) -> Awaitable[None]:
        """
        Add multiple animations to the Sprite or Visual.

        Args:
            spriteSheetURL: the URL of the sprite sheet image
            frameSize: the size of each frame in the sprite sheet in the format "WIDTHxHEIGHT" (example: "32x32")
            atlases: an object with animation names as keys and an animation or animation atlas as values

        Returns:
            A promise that fulfills when the animations are loaded
        """
        ...

    def addAnis(self, spriteSheetURL: str, frameSize: str, atlases: dict) -> Awaitable[None]:
        ...

    def changeAni(self, name: str) -> None:
        """
        Changes the sprite's animation. Use `addAni` to define the
        animation(s) first.

        Args:
            name: the name of the animation to switch to
        """
        ...

    def playAni(self, name: str) -> Awaitable[None]:
        """
        Plays an animation.

        You can put special modifier characters before the name:
        - "!" plays it backwards
        - ">" or "<" horizontally flips it
        - "^" vertically flips it

        Args:
            name: the name of the animation to play

        Returns:
            A promise that fulfills when the animation completes
        """
        ...

    def playAnis(self, *sequence: str) -> Awaitable[None]:
        """
        Plays a sequence of animations.

        You can put special modifier characters before each ani name:
        - "!" plays it backwards
        - ">" or "<" horizontally flips it
        - "^" vertically flips it

        You can put sequence modifiers at the end of the sequence:
        - "**" loops it indefinitely
        - ";;" stops it on the last ani's last frame

        Args:
            sequence: the names of animations

        Returns:
            A promise that fulfills when the sequence completes
        """
        ...

DYNAMIC: str

DYN: str

STATIC: str

STA: str

KINEMATIC: str

KIN: str

class Sprite(Visual):
    """A Sprite has a Box2D physics body with a collider (by default), which can interact with other sprites in the physics simulation."""

    @overload
    @classmethod
    def new(cls, x: float = ..., y: float = ..., w: float = ..., h: float = ..., physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, x: float = ..., y: float = ..., w: float = ..., h: float = ..., roundedRadius: float = ..., physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, x: float, y: float, d: float, physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, points: list[tuple[float, float]], roundedRadius: float, physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, vertices: list[tuple[float, float]], physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, x: float, y: float, vertices: list[tuple[float, float]], physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, x: float, y: float, distAngles: list[float], physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, x: float, y: float, distAngles: list[float], roundedRadius: float, physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, x: float, y: float, sideLength: float, polygonName: str, roundedRadius: float = ..., physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, ani: str | Ani | Image, x: float = ..., y: float = ..., w: float = ..., h: float = ..., physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, ani: str | Ani | Image, x: float = ..., y: float = ..., w: float = ..., h: float = ..., roundedRadius: float = ..., physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, ani: str | Ani | Image, x: float, y: float, d: float, physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, ani: str | Ani | Image, points: list[tuple[float, float]], roundedRadius: float, physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, ani: str | Ani | Image, vertices: list[tuple[float, float]], physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, ani: str | Ani | Image, x: float, y: float, vertices: list[tuple[float, float]], physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, ani: str | Ani | Image, x: float, y: float, distAngles: list[float], physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, ani: str | Ani | Image, x: float, y: float, distAngles: list[float], roundedRadius: float, physicsType: str = ...) -> 'Sprite': ...

    @overload
    @classmethod
    def new(cls, ani: str | Ani | Image, x: float, y: float, sideLength: float, polygonName: str, roundedRadius: float = ..., physicsType: str = ...) -> 'Sprite': ...

    @classmethod
    def new(cls, ani: str | Ani | Image, x: float, y: float, sideLength: float, polygonName: str, roundedRadius: float = ..., physicsType: str = ...) -> 'Sprite':
        ...

    @overload
    def __init__(self, x: float = ..., y: float = ..., w: float = ..., h: float = ..., physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, x: float = ..., y: float = ..., w: float = ..., h: float = ..., roundedRadius: float = ..., physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, x: float, y: float, d: float, physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, points: list[tuple[float, float]], roundedRadius: float, physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, vertices: list[tuple[float, float]], physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, x: float, y: float, vertices: list[tuple[float, float]], physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, x: float, y: float, distAngles: list[float], physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, x: float, y: float, distAngles: list[float], roundedRadius: float, physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, x: float, y: float, sideLength: float, polygonName: str, roundedRadius: float = ..., physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, ani: str | Ani | Image, x: float = ..., y: float = ..., w: float = ..., h: float = ..., physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, ani: str | Ani | Image, x: float = ..., y: float = ..., w: float = ..., h: float = ..., roundedRadius: float = ..., physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, ani: str | Ani | Image, x: float, y: float, d: float, physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, ani: str | Ani | Image, points: list[tuple[float, float]], roundedRadius: float, physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, ani: str | Ani | Image, vertices: list[tuple[float, float]], physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, ani: str | Ani | Image, x: float, y: float, vertices: list[tuple[float, float]], physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, ani: str | Ani | Image, x: float, y: float, distAngles: list[float], physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, ani: str | Ani | Image, x: float, y: float, distAngles: list[float], roundedRadius: float, physicsType: str = ...) -> None: ...

    @overload
    def __init__(self, ani: str | Ani | Image, x: float, y: float, sideLength: float, polygonName: str, roundedRadius: float = ..., physicsType: str = ...) -> None: ...

    def __init__(self, ani: str | Ani | Image, x: float, y: float, sideLength: float, polygonName: str, roundedRadius: float = ..., physicsType: str = ...) -> None: ...

    @overload
    @classmethod
    def withSensor(cls, x: float = ..., y: float = ..., w: float = ..., h: float = ..., physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, x: float = ..., y: float = ..., w: float = ..., h: float = ..., roundedRadius: float = ..., physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, x: float, y: float, d: float, physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, points: list[tuple[float, float]], roundedRadius: float, physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, vertices: list[tuple[float, float]], physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, x: float, y: float, vertices: list[tuple[float, float]], physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, x: float, y: float, distAngles: list[float], physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, x: float, y: float, distAngles: list[float], roundedRadius: float, physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, x: float, y: float, sideLength: float, polygonName: str, roundedRadius: float = ..., physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, ani: str | Ani | Image, x: float = ..., y: float = ..., w: float = ..., h: float = ..., physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, ani: str | Ani | Image, x: float = ..., y: float = ..., w: float = ..., h: float = ..., roundedRadius: float = ..., physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, ani: str | Ani | Image, x: float, y: float, d: float, physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, ani: str | Ani | Image, points: list[tuple[float, float]], roundedRadius: float, physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, ani: str | Ani | Image, vertices: list[tuple[float, float]], physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, ani: str | Ani | Image, x: float, y: float, vertices: list[tuple[float, float]], physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, ani: str | Ani | Image, x: float, y: float, distAngles: list[float], physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, ani: str | Ani | Image, x: float, y: float, distAngles: list[float], roundedRadius: float, physicsType: str = ...) -> Sprite: ...

    @overload
    @classmethod
    def withSensor(cls, ani: str | Ani | Image, x: float, y: float, sideLength: float, polygonName: str, roundedRadius: float = ..., physicsType: str = ...) -> Sprite: ...

    @classmethod
    def withSensor(cls, ani: str | Ani | Image, x: float, y: float, sideLength: float, polygonName: str, roundedRadius: float = ..., physicsType: str = ...) -> Sprite:
        ...

    @property
    def physics(self) -> str:
        """
        The physics type of the sprite, which determines how it interacts with
        other sprites in the physics simulation.

        It can be set to DYNAMIC/DYN, STATIC/STA, or KINEMATIC/KIN.

        Default: `"dynamic"`
        """
        ...

    @physics.setter
    def physics(self, val: str) -> None: ...

    @property
    def physicsType(self) -> str:
        """
        The physics type of the sprite, which determines how it interacts with
        other sprites in the physics simulation.

        It can be set to DYNAMIC/DYN, STATIC/STA, or KINEMATIC/KIN.

        Default: `"dynamic"`
        """
        ...

    @physicsType.setter
    def physicsType(self, val: str) -> None: ...

    @property
    def physicsEnabled(self) -> bool:
        """
        If true, the sprite's physics body is included in the physics simulation.

        Default: `true`
        """
        ...

    @physicsEnabled.setter
    def physicsEnabled(self, val: bool) -> None: ...

    idNum: float
    """
    Each sprite has a unique id number. Don't change it!
    They are useful for debugging.
    """

    bdID: Any
    """The Box2D body id for the sprite's physics body. Don't change it!"""

    groups: list[Group]
    """
    Groups the sprite belongs to.

    Default: `[allSprites]`
    """

    animations: Anis
    """Keys are the animation label, values are Ani objects."""

    colliders: list[Collider]
    """Array of colliders that are part of the sprite's physics body."""

    sensors: list[Sensor]
    """
    Array of sensors that are part of the sprite's physics body.
    Sensors are used to detect overlaps without causing physical collisions.
    """

    joints: list[Joint]
    """
    Joints that the sprite is attached to.

    Default: `[]`
    """

    watch: bool
    """
    If set to true, q5play will record all changes to the sprite's
    properties in its `mod` array. Intended to be used to enable
    online multiplayer.

    Default: `undefined`
    """

    mod: dict
    """
    Modification tracking object.

    It has sprite property number codes as keys,
    these correspond to the index of the property in the
    Sprite.props array, and boolean values, that
    indicate which properties were changed since the last frame.

    Useful for limiting the amount of sprite data sent in netcode
    to only the sprite properties that have been modified.
    """

    @property
    def x(self) -> float:
        """The horizontal position of the sprite."""
        ...

    @x.setter
    def x(self, val: float) -> None: ...

    @property
    def y(self) -> float:
        """The vertical position of the sprite."""
        ...

    @y.setter
    def y(self, val: float) -> None: ...

    @property
    def w(self) -> float:
        """The width of the sprite."""
        ...

    @w.setter
    def w(self, val: float) -> None: ...

    @property
    def h(self) -> float:
        """The height of the sprite."""
        ...

    @h.setter
    def h(self, val: float) -> None: ...

    prevX: float
    """The sprite's x position on the previous frame."""

    prevY: float
    """The sprite's y position on the previous frame."""

    prevRotation: float
    """The sprite's rotation on the previous frame."""

    text: str
    """
    Text displayed at the center of the sprite.

    Default: `undefined`
    """

    def addCollider(self, offsetX: float, offsetY: float, w: float = ..., h: float = ..., roundedRadius: float = ...) -> None:
        """
        Adds a collider to the sprite's physics body.

        It accepts parameters in a similar format to the Sprite
        constructor except the first two parameters are x and y offsets,
        the distance new collider should be from the center of the sprite.

        This function also recalculates the sprite's mass based on the
        size of the new collider added to it. However, it does not move
        the sprite's center of mass, which makes adding multiple colliders
        to a sprite easier.

        Args:
            offsetX: distance from the center of the sprite
            offsetY: distance from the center of the sprite
            w: width of the collider
            h: height of the collider
            roundedRadius: corner radius for a rounded box collider
        """
        ...

    def addSensor(self, offsetX: float, offsetY: float, w: float = ..., h: float = ..., roundedRadius: float = ...) -> None:
        """
        Adds an overlap sensor to the sprite's physics body.

        Sensors can't displace or be displaced by colliders.
        Sensors don't have any mass or other physical properties.
        Sensors simply detect overlaps.

        This function accepts parameters in a similar format to the Sprite
        constructor except the first two parameters are x and y offsets,
        the relative distance the new sensor should be from the center of
        the sprite.

        Args:
            offsetX: distance from the center of the sprite
            offsetY: distance from the center of the sprite
            w: width of the collider
            h: height of the collider
            roundedRadius: corner radius for a rounded box sensor
        """
        ...

    @property
    def mass(self) -> float:
        """The mass of the sprite's physics body."""
        ...

    @mass.setter
    def mass(self, val: float) -> None: ...

    @property
    def centerOfMass(self) -> dict:
        """
        The center of mass of the sprite's physics body, the point at which
        the physics body is balanced and rotates around. By default it's the
        same as the sprite's position, but it can be changed with this setter.
        """
        ...

    @centerOfMass.setter
    def centerOfMass(self, val: dict) -> None: ...

    @property
    def fixedCenterOfMass(self) -> bool:
        """
        If true, the center of mass of the sprite's physics body is fixed to
        the sprite's [x, y] position.

        It prevents the center of mass from being recalculated (moved) when adding or
        removing colliders or sensors. Set it to false to allow dynamic center of mass
        recalculation.

        Default: `true`
        """
        ...

    @fixedCenterOfMass.setter
    def fixedCenterOfMass(self, val: bool) -> None: ...

    def resetMass(self) -> None:
        """
        Recalculates the sprite's mass based on its current
        density and size.
        """
        ...

    @property
    def rotation(self) -> float:
        """
        The angle of the sprite's rotation, not the direction it's moving.

        If angleMode is set to "degrees", the value will be returned in
        a range of -180 to 180.

        Default: `0`
        """
        ...

    @rotation.setter
    def rotation(self, val: float) -> None: ...

    def deleteColliders(self) -> None:
        """Removes colliders from the sprite's physics body."""
        ...

    def deleteSensors(self) -> None:
        """Removes overlap sensors from the sprite's physics body."""
        ...

    @property
    def autoUpdate(self) -> bool:
        """
        If true, a sprite is updated by q5play before each physics update.

        Default: `true`
        """
        ...

    @autoUpdate.setter
    def autoUpdate(self, val: bool) -> None: ...

    @property
    def autoDraw(self) -> bool:
        """
        If true, a sprite is drawn by q5play after each physics update.

        Default: `true`
        """
        ...

    @autoDraw.setter
    def autoDraw(self, val: bool) -> None: ...

    @property
    def allowSleeping(self) -> bool:
        """
        Controls the ability for a sprite to "sleep".

        "Sleeping" sprites are not included in the physics simulation, a
        sprite starts "sleeping" when it stops moving and doesn't collide
        with anything that it wasn't already colliding with.

        Default: `true`
        """
        ...

    @allowSleeping.setter
    def allowSleeping(self, val: bool) -> None: ...

    @property
    def bounciness(self) -> float:
        """
        The bounciness of the sprite's physics body.

        Default: `0.2`
        """
        ...

    @bounciness.setter
    def bounciness(self, val: float) -> None: ...

    @property
    def rotationSpeed(self) -> float:
        """
        The speed of the sprite's rotation in angles per frame.

        Default: `0`
        """
        ...

    @rotationSpeed.setter
    def rotationSpeed(self, val: float) -> None: ...

    @property
    def color(self) -> Color:
        """
        The sprite's current fill color.

        By default sprites get a random color.
        """
        ...

    @color.setter
    def color(self, val: Color) -> None: ...

    @property
    def colour(self) -> Color:
        """
        The sprite's current fill colour.

        By default sprites get a random color.
        """
        ...

    @colour.setter
    def colour(self, val: Color) -> None: ...

    @property
    def fill(self) -> Color:
        """
        The sprite's current fill color.

        By default sprites get a random color.
        """
        ...

    @fill.setter
    def fill(self, val: Color) -> None: ...

    @property
    def stroke(self) -> Color:
        """The sprite's stroke color."""
        ...

    @stroke.setter
    def stroke(self, val: Color) -> None: ...

    @property
    def strokeWeight(self) -> float:
        """The sprite's stroke weight, the thickness of its outline."""
        ...

    @strokeWeight.setter
    def strokeWeight(self, val: float) -> None: ...

    @property
    def textFill(self) -> Color:
        """
        The sprite's text fill color. Black by default.

        Default: `black (#000000)`
        """
        ...

    @textFill.setter
    def textFill(self, val: Color) -> None: ...

    @property
    def textSize(self) -> float:
        """The sprite's text size, the sketch's current textSize by default."""
        ...

    @textSize.setter
    def textSize(self, val: float) -> None: ...

    @property
    def textStroke(self) -> Color:
        """
        The sprite's text stroke color.
        No stroke by default, does not inherit from the sketch's stroke color.

        Default: `undefined`
        """
        ...

    @textStroke.setter
    def textStroke(self, val: Color) -> None: ...

    @property
    def textStrokeWeight(self) -> float:
        """
        The sprite's text stroke weight, the thickness of its outline.
        No stroke by default, does not inherit from the sketch's stroke weight.

        Default: `undefined`
        """
        ...

    @textStrokeWeight.setter
    def textStrokeWeight(self, val: float) -> None: ...

    @property
    def tile(self) -> str:
        """The tile character that represents the sprite in a tile map."""
        ...

    @tile.setter
    def tile(self, val: str) -> None: ...

    @property
    def bearing(self) -> float:
        """
        A bearing indicates the direction that needs to be followed to
        reach a destination.

        Setting a sprite's bearing doesn't do anything by itself.
        You can apply a force to the sprite at its bearing angle
        using the `applyForce` function.
        """
        ...

    @bearing.setter
    def bearing(self, val: float) -> None: ...

    @property
    def debug(self) -> bool:
        """
        If true, outlines of the sprite's colliders and sensors will be drawn.

        Default: `false`
        """
        ...

    @debug.setter
    def debug(self, val: bool) -> None: ...

    @property
    def density(self) -> float:
        """
        The density of the sprite's physics body.

        Default: `1`
        """
        ...

    @density.setter
    def density(self, val: float) -> None: ...

    @property
    def direction(self) -> float:
        """
        The angle of the sprite's movement.

        Can be set with directional strings like "up", "down", "left", "right",
        "upRight", "upLeft", "downRight", and "downLeft". The setter's input parser ignores
        capitalization, spaces, underscores, dashes, and cardinal direction word order.

        Default: `0 ("right")`
        """
        ...

    @direction.setter
    def direction(self, val: float | str) -> None: ...

    @property
    def drag(self) -> float:
        """
        The amount of resistance a sprite has to being moved.

        Default: `0`
        """
        ...

    @drag.setter
    def drag(self, val: float) -> None: ...

    @property
    def draw(self) -> Callable[..., Any]:
        """
        Displays the sprite.

        This function is called automatically at the end of each
        sketch `draw` function call but it can also be run
        by users to customize the order sprites are drawn in relation
        to other stuff drawn on the canvas. Also see the sprite.layer
        property.

        A sprite's draw function can be overridden with a
        custom draw function, inside this function (0, 0) is the center of
        the sprite.
        """
        ...

    @draw.setter
    def draw(self, val: Callable[..., Any]) -> None: ...

    @property
    def friction(self) -> float:
        """
        The amount the sprite's colliders resist moving
        when rubbing against other colliders.

        Default: `0.5`
        """
        ...

    @friction.setter
    def friction(self, val: float) -> None: ...

    @property
    def heading(self) -> str:
        """
        The sprite's heading. This is a string that can be set to
        "up", "down", "left", "right", "upRight", "upLeft", "downRight"

        The setter's input parser ignores capitalization, spaces,
        underscores, dashes, and cardinal direction word order.

        Default: `undefined`
        """
        ...

    @heading.setter
    def heading(self, val: str) -> None: ...

    @property
    def isSuperFast(self) -> bool:
        """
        Set this to true if the sprite goes really fast to prevent
        inaccurate physics simulation.

        Default: `false`
        """
        ...

    @isSuperFast.setter
    def isSuperFast(self, val: bool) -> None: ...

    @property
    def layer(self) -> float:
        """
        Sprites with the highest layer value get drawn first.

        By default sprites are drawn in the order they were created in.
        """
        ...

    @layer.setter
    def layer(self, val: float) -> None: ...

    @property
    def life(self) -> float:
        """
        When the physics simulation is progressed in `world.physicsUpdate`,
        each sprite's life is decreased by `world.timeScale`.

        If life becomes less than or equal to 0, the sprite will
        be removed.

        Default: `Infinity`
        """
        ...

    @life.setter
    def life(self, val: float) -> None: ...

    @property
    def opacity(self) -> float:
        """
        The sprite's opacity. 0 is transparent, 1 is opaque.

        Default: `1`
        """
        ...

    @opacity.setter
    def opacity(self, val: float) -> None: ...

    @property
    def previousX(self) -> float:
        """
        The sprite's x position on the previous frame.
        Alias for sprite.prevX.
        """
        ...

    @property
    def previousY(self) -> float:
        """
        The sprite's y position on the previous frame.
        Alias for sprite.prevY.
        """
        ...

    @property
    def previousRotation(self) -> float:
        """
        The sprite's rotation on the previous frame.
        Alias for sprite.prevRotation.
        """
        ...

    @property
    def pixelPerfect(self) -> bool:
        """
        If true, q5play will draw sprites at integer pixel precision.

        This is useful for making retro games.

        By default q5play draws sprites with subpixel rendering.

        Default: `false`
        """
        ...

    @pixelPerfect.setter
    def pixelPerfect(self, val: bool) -> None: ...

    @property
    def deleted(self) -> bool:
        """
        If the sprite has been deleted from the world.

        Default: `false`
        """
        ...

    @deleted.setter
    def deleted(self, val: bool) -> None: ...

    @property
    def rollingResistance(self) -> float:
        """
        Simulates friction that slows down a sprite rolling on another sprite,
        like a soccer ball rolling to a stop on high grass.

        Default: `0`
        """
        ...

    @rollingResistance.setter
    def rollingResistance(self, val: float) -> None: ...

    @property
    def rotationDrag(self) -> float:
        """
        The amount the sprite resists rotating.

        Default: `0`
        """
        ...

    @rotationDrag.setter
    def rotationDrag(self, val: float) -> None: ...

    @property
    def rotationLock(self) -> bool:
        """
        If true, the sprite can not rotate.

        Default: `false`
        """
        ...

    @rotationLock.setter
    def rotationLock(self, val: bool) -> None: ...

    @property
    def scale(self) -> float | dict:
        """
        Horizontal and vertical scale of the sprite.

        Components can be negative to flip/mirror the sprite on an axis.

        The `valueOf` function for `sprite.scale` returns the scale as a
        number. This enables users to do things like `sprite.scale *= 2`
        to double the sprite's scale.

        Default: `{x: 1, y: 1}`
        """
        ...

    @scale.setter
    def scale(self, val: float | list | dict) -> None: ...

    def scaleBy(self, x: float, y: float = ...) -> None:
        """
        Scales the the sprite.

        Components can be negative to flip/mirror the sprite on an axis.

        Args:
            x: horizontal scale factor or uniform scale factor for both axes
            y: vertical scale factor
        """
        ...

    @property
    def sleeping(self) -> bool:
        """
        Wake a sprite up or put it to sleep.

        "Sleeping" sprites are not included in the physics simulation, a
        sprite starts "sleeping" when it stops moving and doesn't collide
        with anything that it wasn't already colliding with.

        Default: `true`
        """
        ...

    @sleeping.setter
    def sleeping(self, val: bool) -> None: ...

    @property
    def sleepThreshold(self) -> float:
        """
        The minimum speed (in m/s) at which the sprite must be moving
        before it is considered awake.
        """
        ...

    @sleepThreshold.setter
    def sleepThreshold(self, val: float) -> None: ...

    @property
    def speed(self) -> float:
        """
        The sprite's speed.

        Setting speed to a negative value will make the sprite move
        180 degrees opposite of its current direction angle.

        Default: `0`
        """
        ...

    @speed.setter
    def speed(self, val: float) -> None: ...

    def setSpeedAndDirection(self, speed: float, direction: float) -> None:
        """Efficiently sets the sprite's speed and direction at the same time."""
        ...

    @property
    def surfaceSpeed(self) -> float:
        """
        The sprite's speed along the surface of its collider(s),
        like a conveyor belt.
        Requires friction to be greater than 1 to have an effect.

        Default: `0`
        """
        ...

    @surfaceSpeed.setter
    def surfaceSpeed(self, val: float) -> None: ...

    @property
    def tint(self) -> Color:
        """
        Tint color applied to the sprite when drawn.

        Note that this is not good for performance, you should probably
        pre-render the effect if you want to use it a lot.

        Default: `undefined`
        """
        ...

    @tint.setter
    def tint(self, val: Color) -> None: ...

    @property
    def visible(self) -> bool:
        """
        If true the sprite is shown, if set to false the sprite is hidden.

        Becomes null when the sprite is off screen but will be drawn and
        set to true again if it goes back on screen.

        Default: `true`
        """
        ...

    @visible.setter
    def visible(self, val: bool) -> None: ...

    @property
    def pos(self) -> dict:
        """
        Gets the sprite's position as a readonly object {x, y} which
        won't be updated if the sprite moves. Useful for saving
        the sprite's position at a specific moment in time.
        """
        ...

    @pos.setter
    def pos(self, val: list[float] | dict) -> None: ...

    @property
    def position(self) -> Vector:
        """The sprite's position vector."""
        ...

    @position.setter
    def position(self, val: list[float] | dict) -> None: ...

    @property
    def canvasPos(self) -> Any:
        """The sprite's absolute position on the canvas."""
        ...

    @property
    def hw(self) -> float:
        """Half the width of the sprite."""
        ...

    @hw.setter
    def hw(self, val: float) -> None: ...

    @property
    def width(self) -> float:
        """The width of the sprite."""
        ...

    @width.setter
    def width(self, val: float) -> None: ...

    @property
    def halfWidth(self) -> float:
        """Half the width of the sprite."""
        ...

    @halfWidth.setter
    def halfWidth(self, val: float) -> None: ...

    @property
    def hh(self) -> float:
        """Half the height of the sprite."""
        ...

    @hh.setter
    def hh(self, val: float) -> None: ...

    @property
    def height(self) -> float:
        """The height of the sprite."""
        ...

    @height.setter
    def height(self, val: float) -> None: ...

    @property
    def halfHeight(self) -> float:
        """Half the height of the sprite."""
        ...

    @halfHeight.setter
    def halfHeight(self, val: float) -> None: ...

    @property
    def d(self) -> float:
        """The diameter of a circular sprite."""
        ...

    @d.setter
    def d(self, val: float) -> None: ...

    @property
    def diameter(self) -> float:
        """The diameter of a circular sprite."""
        ...

    @diameter.setter
    def diameter(self, val: float) -> None: ...

    @property
    def r(self) -> float:
        """The radius of a circular sprite."""
        ...

    @r.setter
    def r(self, val: float) -> None: ...

    @property
    def radius(self) -> float:
        """The radius of a circular sprite."""
        ...

    @radius.setter
    def radius(self, val: float) -> None: ...

    @property
    def update(self) -> Callable[..., Any]:
        """
        Runs before each physics update by default.

        Set this to a custom function that handles input, directs sprite movement,
        and performs other tasks that should run before the physics update.

        Optionally, users can run this function manually in q5play's `update`
        function.
        """
        ...

    @update.setter
    def update(self, val: Callable[..., Any]) -> None: ...

    @property
    def vel(self) -> Vector:
        """
        The sprite's velocity vector {x, y}

        Default: `{x: 0, y: 0}`
        """
        ...

    @vel.setter
    def vel(self, val: list | dict | Vector) -> None: ...

    @property
    def velocity(self) -> Vector:
        """
        The sprite's velocity vector {x, y}

        Default: `{x: 0, y: 0}`
        """
        ...

    @velocity.setter
    def velocity(self, val: list | dict | Vector) -> None: ...

    @property
    def grabbable(self) -> bool:
        """Whether the sprite can be grabbed by a pointer."""
        ...

    @grabbable.setter
    def grabbable(self, val: bool) -> None: ...

    @property
    def gravityScale(self) -> float:
        """
        A ratio that defines how much the sprite is affected by gravity.

        Default: `1`
        """
        ...

    @gravityScale.setter
    def gravityScale(self, val: float) -> None: ...

    @overload
    def applyForce(self, amount: float, origin: dict = ...) -> None:
        """
        Applies a force magnitude at the sprite's current bearing.

        Args:
            amount: force magnitude
            origin: point (relative to the sprite) where the force is applied. Accepts an object with `x` and `y` properties.
        """
        ...

    @overload
    def applyForce(self, force: list[dict | float], origin: dict = ...) -> None:
        """
        Applies a force vector to the sprite.

        Args:
            force: force vector as an object with `x` and `y` properties or array of [x, y]
            origin: point (relative to the sprite) where the force is applied. Accepts an object with `x` and `y` properties.
        """
        ...

    def applyForce(self, force: list[dict | float], origin: dict = ...) -> None:
        ...

    @overload
    def applyForceScaled(self, amount: float, origin: dict = ...) -> None:
        """
        Applies a force scaled to the sprite's mass using a magnitude.

        Args:
            amount: force magnitude
            origin: point (relative to the sprite) where the force is applied. Accepts an object with `x` and `y` properties.
        """
        ...

    @overload
    def applyForceScaled(self, force: dict, origin: dict = ...) -> None:
        """
        Applies a force scaled to the sprite's mass using a vector.

        Args:
            force: force vector as an object with `x` and `y` properties
            origin: point (relative to the sprite) where the force is applied. Accepts an object with `x` and `y` properties.
        """
        ...

    def applyForceScaled(self, force: dict, origin: dict = ...) -> None:
        ...

    def applyWind(self, strength: float, angle: float, drag: float = ..., lift: float = ...) -> None:
        """
        Applies wind force to the sprite.

        Args:
            strength: the strength of the wind
            angle: the angle the wind is blowing at
            drag: the force that opposes the relative velocity
            lift: the force that is perpendicular to the relative velocity
        """
        ...

    @overload
    def attractTo(self, x: float, y: float, force: float = ...) -> None:
        """
        Applies a force to the sprite's center of mass attracting it to
        the given position.

        Args:
            x: x coordinate
            y: y coordinate
        """
        ...

    @overload
    def attractTo(self, pos: dict, force: float = ...) -> None:
        """
        Applies a force to the sprite's center of mass attracting it to
        the given position.

        Args:
            pos: object with x and y properties
        """
        ...

    def attractTo(self, pos: dict, force: float = ...) -> None:
        ...

    @overload
    def repelFrom(self, x: float, y: float, force: float = ...) -> None:
        """
        Applies a force to the sprite's center of mass repelling it from
        the given position.

        Args:
            x: x coordinate
            y: y coordinate
        """
        ...

    @overload
    def repelFrom(self, pos: dict, force: float = ...) -> None:
        """
        Applies a force to the sprite's center of mass repelling it from
        the given position.

        Args:
            pos: object with x and y properties
        """
        ...

    def repelFrom(self, pos: dict, force: float = ...) -> None:
        ...

    def applyTorque(self, torque: Any) -> None:
        """
        Apply a torque on the sprite's physics body.
        Torque is the force that causes rotation.
        A positive torque will rotate the sprite clockwise.
        A negative torque will rotate the sprite counter-clockwise.

        This function is the rotational equivalent of applyForce().
        It will not imperatively set the sprite's rotation.
        """
        ...

    @overload
    def moveTo(self, x: float | None, y: float | None, speed: float = ...) -> Awaitable[bool]:
        """
        Attempts to move the sprite to a destination at a constant speed
        and stops the sprite if it reaches the destination.

        The destination check is deferred until the sprite is estimated to be
        at the target position, based on `world.physicsTime`.

        Args:
            x: destination x, or `null` to only move on the y-axis
            y: destination y, or `null` to only move on the x-axis
            speed: movement speed in pixels per frame, defaults to the sprite's current speed or 1

        Returns:
            a lazy thenable that resolves `true` if the sprite reached the destination, or `false` if it didn't.
        """
        ...

    @overload
    def moveTo(self, pos: dict, speed: float = ...) -> Awaitable[bool]:
        """
        Attempts to move the sprite to a destination at a constant speed
        and stops the sprite if it reaches the destination.

        Args:
            pos: destination object with x and y properties
            speed: movement speed in pixels per frame, defaults to the sprite's current speed or 1

        Returns:
            a lazy thenable that resolves `true` if the sprite reached the destination, or `false` if it didn't.
        """
        ...

    def moveTo(self, pos: dict, speed: float = ...) -> Awaitable[bool]:
        ...

    @overload
    def moveTowards(self, x: float | None, y: float | None, tracking: float = ...) -> None:
        """
        Moves the sprite towards a position at a percentage of the distance
        between itself and the destination.

        Args:
            x: destination x, or `null` to only move on the y-axis
            y: destination y, or `null` to only move on the x-axis
            tracking: percent of the distance to move towards the destination as a 0-1 value, default is 0.1 (10% tracking)
        """
        ...

    @overload
    def moveTowards(self, pos: dict, tracking: float = ...) -> None:
        """
        Moves the sprite towards a position at a percentage of the distance
        between itself and the destination.

        Args:
            pos: destination object with x and y properties
            tracking: percent of the distance to move towards the destination as a 0-1 value, default is 0.1 (10% tracking)
        """
        ...

    def moveTowards(self, pos: dict, tracking: float = ...) -> None:
        ...

    @overload
    def rotateTo(self, angle: float, speed: float = ...) -> Awaitable[bool]:
        """
        Rotates the sprite to a target angle at a constant speed,
        stopping if it arrives.

        The destination check is deferred until the sprite is estimated to be
        at the target angle, based on `world.physicsTime`.

        Args:
            angle: target rotation angle
            speed: rotation speed in degrees (or radians) per frame, defaults to the sprite's current rotationSpeed or 1

        Returns:
            a lazy thenable that resolves `true` if the sprite reached the target angle, or `false` if it didn't.
        """
        ...

    @overload
    def rotateTo(self, pos: dict, speed: float = ..., facing: float = ...) -> Awaitable[bool]:
        """
        Rotates the sprite to face a position at a constant speed,
        stopping if it arrives.

        Args:
            pos: object with x and y properties
            speed: rotation speed in degrees (or radians) per frame, defaults to the sprite's current rotationSpeed or 1
            facing: rotation angle the sprite should be at when "facing" the position, default is 0

        Returns:
            a lazy thenable that resolves `true` if the sprite reached the target angle, or `false` if it didn't.
        """
        ...

    def rotateTo(self, pos: dict, speed: float = ..., facing: float = ...) -> Awaitable[bool]:
        ...

    @overload
    def rotateMinTo(self, angle: float, speed: float = ...) -> Awaitable[bool]:
        """
        Rotates the sprite by the smallest angular distance to a target angle
        at a constant speed, stopping when it arrives.

        Args:
            angle: target rotation angle
            speed: absolute rotation per frame, defaults to the sprite's current rotationSpeed or 1

        Returns:
            a lazy thenable that resolves `true` if the sprite reached the target angle, or `false` if it didn't.
        """
        ...

    @overload
    def rotateMinTo(self, pos: dict, speed: float = ..., facing: float = ...) -> Awaitable[bool]:
        """
        Rotates the sprite by the smallest angular distance to face a position
        at a constant speed, stopping when it arrives.

        Args:
            pos: object with x and y properties
            speed: absolute rotation per frame, defaults to the sprite's current rotationSpeed or 1
            facing: rotation angle the sprite should be at when "facing" the position, default is 0

        Returns:
            a lazy thenable that resolves `true` if the sprite reached the target angle, or `false` if it didn't.
        """
        ...

    def rotateMinTo(self, pos: dict, speed: float = ..., facing: float = ...) -> Awaitable[bool]:
        ...

    @overload
    def rotateTowards(self, angle: float, tracking: float = ...) -> None:
        """
        Rotates the sprite towards an angle.

        Args:
            angle: angle in degrees
            tracking: percent of the distance to rotate on each frame towards the target angle, default is 0.1 (10%)
        """
        ...

    @overload
    def rotateTowards(self, pos: dict, tracking: float = ..., facing: float = ...) -> None:
        """
        Rotates the sprite towards a position.

        Args:
            pos: object with x and y properties
            tracking: percent of the distance to rotate on each frame towards the target position, default is 0.1 (10%)
            facing: rotation angle the sprite should be at when "facing" the position, default is 0
        """
        ...

    def rotateTowards(self, pos: dict, tracking: float = ..., facing: float = ...) -> None:
        ...

    @overload
    def angleTo(self, x: float, y: float, facing: float = ...) -> float:
        """
        Finds the angle from this sprite to the given position.

        Equivalent to `atan2(y - sprite.y, x - sprite.x) + facing`.
        Returns the sprite's current rotation if the position is within 0.01 pixels.

        Can be used to set the direction of a sprite so it moves toward a position.

        Args:
            x: x coordinate
            y: y coordinate
            facing: offset angle added to the result, default is 0

        Returns:
            angle to the position
        """
        ...

    @overload
    def angleTo(self, pos: dict, facing: float = ...) -> float:
        """
        Finds the angle from this sprite to the given position.

        Args:
            pos: object with x and y properties
            facing: offset angle added to the result, default is 0

        Returns:
            angle to the position
        """
        ...

    def angleTo(self, pos: dict, facing: float = ...) -> float:
        ...

    @overload
    def angleDistTo(self, x: float, y: float, facing: float = ...) -> float:
        """
        Finds the minimum angular distance the sprite would need to rotate
        to face a position, taking into account the sprite's current rotation.

        Useful for `rotateTowards`-style logic where you need the signed delta
        rather than an absolute target angle.

        Args:
            x: x coordinate
            y: y coordinate
            facing: offset angle, default is 0

        Returns:
            the minimum angular distance to face the position
        """
        ...

    @overload
    def angleDistTo(self, pos: dict, facing: float = ...) -> float:
        """
        Finds the minimum angular distance the sprite would need to rotate
        to face a position, taking into account the sprite's current rotation.

        Args:
            pos: object with x and y properties
            facing: offset angle, default is 0

        Returns:
            the minimum angular distance to face the position
        """
        ...

    def angleDistTo(self, pos: dict, facing: float = ...) -> float:
        ...

    @overload
    def transformTowards(self, x: float, y: float, rotation: float = ..., tracking: float = ...) -> None:
        """
        Moves and rotates a sprite's physics body towards a target transform
        at a percentage of the distance on each frame.

        Uses Box2D's `b2Body_SetTargetTransform` for maximum efficiency
        compared to using `moveTowards` and `rotateTowards` separately.

        Args:
            x: destination x
            y: destination y
            rotation: target rotation angle
            tracking: percent of the distance to move towards the target as a 0-1 value, default is 0.1 (10% tracking)
        """
        ...

    @overload
    def transformTowards(self, pos: dict, rotation: float = ..., tracking: float = ...) -> None:
        """
        Moves and rotates a sprite's physics body towards a target transform
        at a percentage of the distance on each frame.

        Args:
            pos: destination object with x and y properties
            rotation: target rotation angle
            tracking: percent of the distance to move towards the target as a 0-1 value, default is 0.1 (10% tracking)
        """
        ...

    def transformTowards(self, pos: dict, rotation: float = ..., tracking: float = ...) -> None:
        ...

    def delete(self) -> None:
        """
        Deletes the Sprite from the sketch and all the groups it
        belongs to.

        When a sprite is deleted it will not be drawn or updated anymore.
        If it has a physics body, it will be deleted from the physics simulation.

        There's no way to undo this operation. If you want to hide a
        sprite use `sprite.visible = false` instead.
        """
        ...

    def toString(self) -> str:
        """
        Returns the sprite's unique identifier `sprite.idNum`.

        Returns:
            the sprite's id
        """
        ...

    def collides(self, target: Sprite | Group, callback: Callable[..., Any] = ...) -> bool:
        """
        Returns true on the first frame that the sprite collides with the
        target sprite or group.

        Custom collision event handling can be done by using this function
        in an if statement or adding a callback as the second parameter.
        """
        ...

    def colliding(self, target: Sprite | Group, callback: Callable[..., Any] = ...) -> float:
        """
        Returns a truthy value while the sprite is colliding with the
        target sprite or group. The value is the number of frames that
        the sprite has been colliding with the target.

        Returns:
            frames
        """
        ...

    def collided(self, target: Sprite | Group, callback: Callable[..., Any] = ...) -> bool:
        """
        Returns true on the first frame that the sprite no longer overlaps
        with the target sprite or group.
        """
        ...

    def overlaps(self, target: Sprite | Group, callback: Callable[..., Any] = ...) -> bool:
        """
        Returns true on the first frame that the sprite overlaps with the
        target sprite or group.

        Custom overlap event handling can be done by using this function
        in an if statement or adding a callback as the second parameter.
        """
        ...

    def overlapping(self, target: Sprite | Group, callback: Callable[..., Any] = ...) -> float:
        """
        Returns a truthy value while the sprite is overlapping with the
        target sprite or group. The value returned is the number of
        frames the sprite has been overlapping with the target.

        Returns:
            frames
        """
        ...

    def overlapped(self, target: Sprite | Group, callback: Callable[..., Any] = ...) -> bool:
        """
        Returns true on the first frame that the sprite no longer overlaps
        with the target sprite or group.
        """
        ...

    def pass_(self, target: Sprite | Group) -> None:
        """
        Sets a pass through contact relationship between the sprite
        and a target sprite or group.
        """
        ...

    def passes(self, target: Sprite | Group) -> None:
        """
        Sets a pass through contact relationship between the sprite
        and a target sprite or group.
        """
        ...

    def addDefaultSensors(self) -> None:
        """
        Creates overlap sensors that are the same size as the sprite's
        colliders. If you'd like to add more sensors to a sprite, use the
        `addSensor` function.

        Used internally if a sprite overlap detection
        function is called but the sprite has no overlap sensors.
        """
        ...

    @overload
    def distanceTo(self, x: float, y: float) -> float:
        """
        Returns the distance to another sprite, the mouse, a touch pointer,
        or any other object with x and y properties. Uses q5's `dist` function.

        Returns:
            distance
        """
        ...

    @overload
    def distanceTo(self, pos: dict) -> float:
        """
        Returns the distance to another sprite, the mouse, a touch pointer,
        or any other object with x and y properties. Uses q5's `dist` function.

        Args:
            pos: object with x and y properties

        Returns:
            distance
        """
        ...

    def distanceTo(self, pos: dict) -> float:
        ...

class Ani(list[Image]):

    @classmethod
    def new(cls, *args: Image) -> 'Ani':
        """
        Ani objects are an array of images
        that can be displayed by a Visual or Sprite.

        Args:
            args: the frames of the animation
        """
        ...

    def __init__(self, *args: Image) -> None: ...

    name: str
    """The name of the animation"""

    targetFrame: float

    offset: dict
    """
    The distance from the sprite or visual's position
    that the animation is drawn at.
    """

    playing: bool
    """
    True if the animation is currently playing.

    Default: `true`
    """

    visible: bool
    """
    Animation visibility.

    Default: `true`
    """

    looping: bool
    """
    If set to false the animation will stop after reaching the last frame

    Default: `true`
    """

    endOnFirstFrame: bool
    """
    Ends the loop on frame 0 instead of the last frame.
    This is useful for animations that are symmetric.
    For example a walking cycle where the first frame is the
    same as the last frame.

    Default: `false`
    """

    frameChanged: bool
    """True if frame changed during the last draw cycle"""

    onComplete: Any

    onChange: Any

    rotation: Any

    spriteSheet: Any

    @property
    def frame(self) -> float:
        """The index of the current frame that the animation is on."""
        ...

    @frame.setter
    def frame(self, val: float) -> None: ...

    @property
    def frameDelay(self) -> float:
        """
        Delay between frames in number of draw cycles.
        If set to 4 the framerate of the animation would be the
        sketch framerate divided by 4 (60fps = 15fps)

        Default: `4`
        """
        ...

    @frameDelay.setter
    def frameDelay(self, val: float) -> None: ...

    @property
    def scale(self) -> float | dict:
        """
        The animation's scale.

        Can be set to a number to scale both x and y
        or an object with x and/or y properties.

        Default: `1`
        """
        ...

    @scale.setter
    def scale(self, val: float | dict) -> None: ...

    def clone(self) -> Ani:
        """
        Make a copy of the animation, with its own playback state,
        independent of the original animation.
        """
        ...

    def update(self) -> None:
        """Updates the animation's playback state. This is called automatically"""
        ...

    def play(self, frame: Any) -> Awaitable[Any]:
        """
        Plays the animation, starting from the specified frame.

        Returns:
            [Promise] a promise that resolves when the animation completes
        """
        ...

    def pause(self, frame: Any) -> None:
        """Pauses the animation."""
        ...

    def stop(self, frame: Any) -> None:
        """Stops the animation. Alt for pause."""
        ...

    def rewind(self) -> Awaitable[Any]:
        """
        Plays the animation backwards.
        Equivalent to ani.goToFrame(0)

        Returns:
            [Promise] a promise that resolves when the animation completes rewinding
        """
        ...

    def loop(self) -> None:
        """Plays the animation forwards and loops it."""
        ...

    def noLoop(self) -> None:
        """Prevents the animation from looping"""
        ...

    def nextFrame(self) -> None:
        """Goes to the next frame and stops."""
        ...

    def previousFrame(self) -> None:
        """Goes to the previous frame and stops."""
        ...

    def goToFrame(self, toFrame: float) -> Awaitable[Any]:
        """
        Plays the animation forward or backward toward a target frame.

        Args:
            toFrame: Frame number destination (starts from 0)

        Returns:
            [Promise] a promise that resolves when the animation completes
        """
        ...

    @property
    def lastFrame(self) -> float:
        """The index of the last frame. Read only."""
        ...

    @property
    def frameImage(self) -> Image:
        """The current frame as Q5.Image. Read only."""
        ...

    @property
    def w(self) -> float:
        """Width of the animation's current frame."""
        ...

    @property
    def width(self) -> float:
        """Width of the animation's current frame."""
        ...

    @property
    def defaultWidth(self) -> Any:
        ...

    @property
    def h(self) -> float:
        """Height of the animation's current frame."""
        ...

    @property
    def height(self) -> float:
        """Height of the animation's current frame."""
        ...

    @property
    def defaultHeight(self) -> Any:
        ...

class Anis:
    """
    Stores animations.

    Used internally to create `sprite.anis` and `group.anis`.

    In instances of this class, the keys are animation names,
    values are Ani objects.
    """

    frameDelay: float

    offset: dict

    scale: float | dict

    looping: bool

    playing: bool

    cutFrames: bool
    """
    Cuts sprite sheet frames into separate images, instead of rendering
    sections of the sprite sheet.

    Avoids edge bleeding artifacts caused by rotation and scaling,
    but uses more memory and may cause longer load times.
    """

    endOnFirstFrame: bool

    w: float

    width: float

    h: float

    height: float

    frameSize: str
    """Frame size of the animations in the collection, in the format "WIDTHxHEIGHT", for example "32x32"."""

    spriteSheet: Image
    """The sprite sheet image used by the animations in the collection."""

_T_Visuals = TypeVar('_T_Visuals', bound=Visual)

class Visuals(list[_T_Visuals], Generic[_T_Visuals]):
    """
    A collection of and blueprint for Visual objects
    that store an image or animation(s)
    which can be displayed with respect to the camera.
    """

    def draw(self) -> None:
        """Draws the visuals on the canvas."""
        ...

    img: Image
    """Current image."""

    ani: Ani
    """Current animation."""

    @property
    def anis(self) -> Anis:
        """
        Stores animations.
        Keys are the animation label, values are Ani objects
        """
        ...

    def addAni(self, spriteSheetURL: str, frameCount: float) -> Awaitable[None]:
        """
        Adds an animation to the Group or Visuals array.

        Args:
            spriteSheetURL: the URL of the sprite sheet image
            frameCount: the number of frames in the sprite sheet

        Returns:
            A promise that fulfills when the animation is loaded
        """
        ...

    @overload
    def addAnis(self, atlases: dict) -> Awaitable[None]:
        """
        Add multiple animations to the Group or Visuals array.

        Args:
            atlases: an object with animation names as keys and an animation or animation atlas as values

        Returns:
            A promise that fulfills when the animations are loaded
        """
        ...

    @overload
    def addAnis(self, spriteSheetURL: str, atlases: dict) -> Awaitable[None]:
        """
        Add multiple animations to the Group or Visuals array.

        Args:
            spriteSheetURL: the URL of the sprite sheet image
            atlases: an object with animation names as keys and an animation or animation atlas as values

        Returns:
            A promise that fulfills when the animations are loaded
        """
        ...

    @overload
    def addAnis(self, spriteSheetURL: str, frameSize: str, atlases: dict) -> Awaitable[None]:
        """
        Add multiple animations to the Group or Visuals array.

        Args:
            spriteSheetURL: the URL of the sprite sheet image
            frameSize: the size of each frame in the sprite sheet in the format "WIDTHxHEIGHT" (example: "32x32")
            atlases: an object with animation names as keys and an animation or animation atlas as values

        Returns:
            A promise that fulfills when the animations are loaded
        """
        ...

    def addAnis(self, spriteSheetURL: str, frameSize: str, atlases: dict) -> Awaitable[None]:
        ...

    def cull(self, top: float = ..., bottom: float = ..., left: float = ..., right: float = ..., cb: Callable[..., Any] = ...) -> float:
        """
        Detects when visuals go outside the given culling boundary,
        relative to the camera.

        Args:
            top: top bound or boundary range
            bottom: bottom bound
            left: left bound
            right: right bound
            cb: the function to be run when a visual is culled, it's given the visual being culled, if no callback is given then the visual's life is set to 0

        Returns:
            the number of visuals culled
        """
        ...

    tile: str
    """The tile character that represents the Visuals or Group in a tile map."""

    def addTiles(self, tiles: list[str], x: float = ..., y: float = ..., colWidth: float = ..., rowHeight: float = ...) -> None:
        """
        Adds sprites to the group based on a tile map.

        Args:
            x: x coordinate of the top left corner of the tile map, default is -colWidth * longest row / 2
            y: y coordinate of the top left corner of the tile map, default is -rowHeight * number of rows / 2
            colWidth: column width including spacing, default is the width of the first tile
            rowHeight: row height including spacing, default is the height of the first tile
        """
        ...

class Group(Visuals[Sprite]):
    """
    A Group is a collection of and blueprint for
    sprites with similar traits and behaviors.
    """

    @classmethod
    def new(cls, *sprites: Sprite) -> 'Group':
        """
        A Group is a collection of and blueprint for
        sprites with similar traits and behaviors.

        Group extends Visuals which extends Array,
        so you can use them in for loops. They've got
        all the functions and properties of standard arrays
        such as `group.length` and functions like `group.includes()`.

        Changing a group setting changes it for all the sprites in the
        group ("dynamic inheritance").

        All groups inherit from the base group `allSprites`.

        Groups can have subgroups, creating a hierarchy of inheritance.
        """
        ...

    def __init__(self, *sprites: Sprite) -> None: ...

    x: float
    """Horizontal position of group sprites."""

    y: float
    """Vertical position of group sprites."""

    vel: float
    """Velocity of group sprites."""

    velocity: float
    """Velocity of group sprites."""

    rotation: float
    """
    The angle of the group sprites' rotation, not the direction it's moving.

    If angleMode is set to "degrees", the value will be returned in
    a range of -180 to 180.
    """

    rotationSpeed: float
    """The speed of the group sprites' rotation in angles per frame."""

    autoDraw: bool
    """If true, group sprites are drawn by q5play after each physics update."""

    allowSleeping: bool
    """
    Controls the ability for group sprites to "sleep".

    "Sleeping" sprites are not included in the physics simulation, a
    sprite starts "sleeping" when it stops moving and doesn't collide
    with anything that it wasn't already colliding with.
    """

    autoUpdate: float
    """If true, group sprites are updated by q5play before each physics update."""

    bearing: float
    """
    A bearing indicates the direction that needs to be followed to
    reach a destination.

    Setting a group sprites' bearing doesn't do anything by itself.
    You can apply a force to the group sprites at its bearing angle
    using the `applyForce` function.
    """

    bounciness: float
    """The bounciness of the group sprites' physics body."""

    color: Color
    """
    The group sprites' current fill color.

    By default sprites get a random color.
    """

    d: float
    """The diameter of a circular sprite."""

    diameter: float
    """The diameter of a circular sprite."""

    debug: bool
    """
    If true, outlines of the group sprites' colliders and sensors will be drawn.

    Use the keyboard shortcut Command+B to toggle `allSprites.debug`.
    """

    density: float
    """The density of the group sprites' physics body."""

    direction: float
    """The angle of the group sprites' movement."""

    drag: float
    """The amount of resistance group sprites has to being moved."""

    friction: float
    """
    The amount the group sprites' colliders resist moving
    when rubbing against other colliders.
    """

    grabbable: bool
    """Whether the group sprites can be grabbed by a pointer."""

    gravityScale: float
    """A ratio that defines how much the group sprites are affected by gravity."""

    heading: str
    """
    The group sprites' heading. This is a string that can be set to
    "up", "down", "left", "right", "upRight", "upLeft", "downRight"

    The setter's input parser ignores capitalization, spaces,
    underscores, dashes, and cardinal direction word order.
    """

    h: float
    """The height of the group sprites."""

    height: float
    """The height of the group sprites."""

    isSuperFast: bool
    """
    Set this to true if the group sprites goes really fast to prevent
    inaccurate physics simulation.
    """

    layer: float
    """
    Sprites with the highest layer value get drawn first.

    By default sprites are drawn in the order they were created in.
    """

    life: float
    """
    When the physics simulation is progressed in `world.physicsUpdate`,
    each sprite's life is decreased by `world.timeScale`.

    If life becomes less than or equal to 0, the group sprites will
    be removed.
    """

    mass: float
    """The mass of the group sprites' physics body."""

    physics: str
    """
    The physics type of the group sprites, which determines how it interacts with
    other sprites in the physics simulation.

    It can be set to DYNAMIC/DYN, STATIC/STA, or KINEMATIC/KIN.
    """

    physicsType: str
    """
    The physics type of the group sprites, which determines how it interacts with
    other sprites in the physics simulation.

    It can be set to DYNAMIC/DYN, STATIC/STA, or KINEMATIC/KIN.
    """

    physicsEnabled: bool
    """If true, the group sprites' physics body is included in the physics simulation."""

    pixelPerfect: bool
    """
    If true, q5play will draw sprites at integer pixel precision.

    This is useful for making retro games.

    By default q5play draws sprites with subpixel rendering.
    """

    rollingResistance: float
    """
    Simulates friction that slows down group sprites rolling on another sprite,
    like a soccer ball rolling to a stop on high grass.
    """

    rotationDrag: float
    """The amount the group sprites resists rotating."""

    rotationLock: bool
    """If true, the group sprites can not rotate."""

    scale: float | list | dict
    """
    Horizontal and vertical scale of the group sprites.

    Components can be negative to flip/mirror the group sprites on an axis.

    The `valueOf` function for `sprite.scale` returns the scale as a
    number. This enables users to do things like `sprite.scale *= 2`
    to double the group sprites' scale.
    """

    sleeping: bool
    """
    Wake group sprites up or put it to sleep.

    "Sleeping" sprites are not included in the physics simulation, a
    sprite starts "sleeping" when it stops moving and doesn't collide
    with anything that it wasn't already colliding with.
    """

    stroke: Color
    """The group sprites' stroke color."""

    strokeWeight: float
    """The group sprites' stroke weight, the thickness of its outline."""

    speed: float
    """
    The group sprites' speed.

    Setting speed to a negative value will make the group sprites move
    180 degrees opposite of its current direction angle.
    """

    surfaceSpeed: float
    """
    The group sprites' speed along the surface of its collider(s),
    like a conveyor belt.
    """

    text: float
    """Text displayed at the center of the group sprites."""

    textFill: Color
    """The group sprites' text fill color. Black by default."""

    textStroke: Color
    """
    The group sprites' text stroke color.
    No stroke by default, does not inherit from the sketch's stroke color.
    """

    textStrokeWeight: float
    """
    The group sprites' text stroke weight, the thickness of its outline.
    No stroke by default, does not inherit from the sketch's stroke weight.
    """

    textSize: float
    """The group sprites' text size, the sketch's current textSize by default."""

    visible: bool
    """
    If true the group sprites are shown, if set to false the group sprites are hidden.

    Becomes null when the group sprites are off screen but will be drawn and
    set to true again if it goes back on screen.
    """

    w: float
    """The width of the group sprites."""

    width: float
    """The width of the group sprites."""

    idNum: float
    """
    Each group has a unique id number. Don't change it!
    It's useful for debugging.
    """

    subgroups: list[dict]
    """
    Groups can have subgroups, which inherit the properties
    of their parent groups.

    Default: `[]`
    """

    parent: Any
    """The direct parent group that this group inherits properties from."""

    Sprite: Type[Sprite]
    """Creates a new sprite with the traits of the group and adds it to the group."""

    Group: Type[Group]
    """Creates a new subgroup that inherits the traits of the group."""

    autoCull: bool
    """
    A property of the `allSprites` group only,
    that controls whether sprites are automatically deleted
    when they are 10,000 pixels away from the camera.

    It only needs to be set to false once and then it will
    remain false for the rest of the sketch, unless changed.
    """

    visualOnly: bool
    """New group sprites will not have physics bodies (can't have colliders)."""

    add: Callable[..., float]
    """
    Alias for `group.push`.

    Adds a sprite to the end of the group.
    """

    contains: Callable[..., bool]
    """
    Alias for `group.includes`.

    Check if a sprite is in the group.
    """

    @property
    def amount(self) -> float:
        """
        Depending on the value that the amount property is set to, the group will
        either add or delete sprites.
        """
        ...

    @amount.setter
    def amount(self, val: float) -> None: ...

    def collides(self, target: Group, callback: Callable[..., Any] = ...) -> bool:
        """
        Returns true on the first frame that the group collides with the
        target group.

        Custom collision event handling can be done by using this function
        in an if statement or adding a callback as the second parameter.
        """
        ...

    def colliding(self, target: Group, callback: Callable[..., Any] = ...) -> float:
        """
        Returns the amount of frames that the group has been colliding
        with the target group for, which is a truthy value. Returns 0 if
        the group is not colliding with the target group.

        Returns:
            frames
        """
        ...

    def collided(self, target: Group, callback: Callable[..., Any] = ...) -> bool:
        """
        Returns true on the first frame that the group no longer overlaps
        with the target group.
        """
        ...

    def overlaps(self, target: Group, callback: Callable[..., Any] = ...) -> bool:
        """
        Returns true on the first frame that the group overlaps with the
        target group.

        Custom overlap event handling can be done by using this function
        in an if statement or adding a callback as the second parameter.
        """
        ...

    def overlapping(self, target: Group, callback: Callable[..., Any] = ...) -> float:
        """
        Returns the amount of frames that the group has been overlapping
        with the target group for, which is a truthy value. Returns 0 if
        the group is not overlapping with the target group.

        Returns:
            frames
        """
        ...

    def overlapped(self, target: Group, callback: Callable[..., Any] = ...) -> bool:
        """
        Returns true on the first frame that the group no longer overlaps
        with the target group.
        """
        ...

    def pass_(self, target: Group) -> None:
        """Sets a pass through contact relationship between the group and the target group."""
        ...

    def passes(self, target: Group) -> None:
        """Sets a pass through contact relationship between the group and the target group."""
        ...

    @overload
    def applyForce(self, amount: float, origin: dict = ...) -> None:
        """Applies a force magnitude to the group at its bearing."""
        ...

    @overload
    def applyForce(self, force: dict, origin: dict = ...) -> None:
        """Applies a force vector to the group."""
        ...

    def applyForce(self, force: dict, origin: dict = ...) -> None:
        ...

    @overload
    def applyForceScaled(self, amount: float, origin: dict = ...) -> None:
        """Applies a force scaled to member masses using a magnitude."""
        ...

    @overload
    def applyForceScaled(self, force: dict, origin: dict = ...) -> None:
        """Applies a force scaled to member masses using a vector."""
        ...

    def applyForceScaled(self, force: dict, origin: dict = ...) -> None:
        ...

    def applyWind(self, speed: float, angle: float, drag: float = ..., lift: float = ...) -> None:
        ...

    @overload
    def attractTo(self, x: float, y: float, force: float = ...) -> None:
        """
        Applies a force to the group's center of mass attracting it to
        the given position.
        """
        ...

    @overload
    def attractTo(self, pos: dict, force: float = ...) -> None:
        """
        Applies a force to the group's center of mass attracting it to
        the given position.
        """
        ...

    def attractTo(self, pos: dict, force: float = ...) -> None:
        ...

    def applyTorque(self, torque: Any) -> None:
        ...

    @overload
    def moveTo(self, x: float | None, y: float | None, speed: float = ...) -> Awaitable[bool]:
        """
        Moves each sprite in the group to a destination at a constant speed,
        maintaining their relative offsets from the group's centroid.
        """
        ...

    @overload
    def moveTo(self, pos: dict, speed: float = ...) -> Awaitable[bool]:
        """
        Moves each sprite in the group to a destination at a constant speed,
        maintaining their relative offsets from the group's centroid.
        """
        ...

    def moveTo(self, pos: dict, speed: float = ...) -> Awaitable[bool]:
        ...

    @overload
    def moveTowards(self, x: float | None, y: float | None, tracking: float = ...) -> None:
        """Moves the group towards a position."""
        ...

    @overload
    def moveTowards(self, pos: dict, tracking: float = ...) -> None:
        """Moves the group towards a position."""
        ...

    def moveTowards(self, pos: dict, tracking: float = ...) -> None:
        ...

    @overload
    def rotateTo(self, angle: float, speed: float = ...) -> Awaitable[bool]:
        """
        Rotates each sprite in the group to a target angle. The sign of `speed`
        determines direction: positive = CW, negative = CCW.
        """
        ...

    @overload
    def rotateTo(self, pos: dict, speed: float = ..., facing: float = ...) -> Awaitable[bool]:
        """
        Rotates each sprite in the group to face a position. The sign of `speed`
        determines direction: positive = CW, negative = CCW.
        """
        ...

    def rotateTo(self, pos: dict, speed: float = ..., facing: float = ...) -> Awaitable[bool]:
        ...

    def rotate(self, angle: float, speed: float = ...) -> Awaitable[bool]:
        """Rotates each sprite in the group by the given angle amount at the given speed."""
        ...

    @overload
    def rotateMinTo(self, angle: float, speed: float = ...) -> Awaitable[bool]:
        """
        Rotates each sprite in the group by the smallest angular distance to
        a target angle, stopping when they arrive.
        """
        ...

    @overload
    def rotateMinTo(self, pos: dict, speed: float = ..., facing: float = ...) -> Awaitable[bool]:
        """
        Rotates each sprite in the group by the smallest angular distance to
        face a position, stopping when they arrive.
        """
        ...

    def rotateMinTo(self, pos: dict, speed: float = ..., facing: float = ...) -> Awaitable[bool]:
        ...

    @overload
    def rotateTowards(self, angle: float, tracking: float = ...) -> None:
        """Rotates each sprite in the group towards an angle."""
        ...

    @overload
    def rotateTowards(self, pos: dict, tracking: float = ..., facing: float = ...) -> None:
        """Rotates each sprite in the group towards a position."""
        ...

    def rotateTowards(self, pos: dict, tracking: float = ..., facing: float = ...) -> None:
        ...

    @overload
    def transformTowards(self, x: float, y: float, rotation: float = ..., tracking: float = ...) -> None:
        """
        Moves and rotates each sprite in the group towards a target transform,
        maintaining their relative offsets from the group's centroid.
        """
        ...

    @overload
    def transformTowards(self, pos: dict, rotation: float = ..., tracking: float = ...) -> None:
        """
        Moves and rotates each sprite in the group towards a target transform,
        maintaining their relative offsets from the group's centroid.
        """
        ...

    def transformTowards(self, pos: dict, rotation: float = ..., tracking: float = ...) -> None:
        ...

    @overload
    def repelFrom(self, x: float, y: float, force: float = ...) -> None:
        """Applies a repelling force from a position."""
        ...

    @overload
    def repelFrom(self, pos: dict, force: float = ...) -> None:
        """Applies a repelling force from a position."""
        ...

    def repelFrom(self, pos: dict, force: float = ...) -> None:
        ...

    def cull(self, top: float = ..., bottom: float = ..., left: float = ..., right: float = ..., cb: Callable[..., Any] = ...) -> float:
        """
        Detects when sprites go outside the given culling boundary
        relative to the camera.

        By default, culled sprites are deleted, but a callback function
        can be provided to perform other operations on the culled sprites.

        Args:
            top: the distance that sprites can move below the canvas before they are removed
            bottom: the distance that sprites can move below the canvas before they are removed
            left: the distance that sprites can move beyond the left side of the canvas before they are removed
            right: the distance that sprites can move beyond the right side of the canvas before they are removed
            cb: the function to be run when a sprite is culled, it's given the sprite being culled, if no callback is given then the sprite is removed

        Returns:
            the number of sprites culled
        """
        ...

    def splice(self, start: float, removalCount: float, *sprites: Sprite) -> list[Sprite]:
        """
        If removalCount is greater than 0, that amount of
        sprites starting from the start index will be removed
        from this group and its sub groups recursively (if any),

        Then any provided sprites will be added at the start index
        to this group and at the end of each of its parent groups recursively,
        if not already present in parent groups.

        Args:
            start: start index
            removalCount: number of sprites to remove, starting from the start index
            sprites: sprites to add at start index

        Returns:
            the removed sprites
        """
        ...

    def remove(self, item: Sprite | float) -> Sprite:  # type: ignore[override]
        """
        Removes a sprite from this group and its sub groups (if any),
        but does not delete it from the world.

        Args:
            item: the sprite to be deleted or its index

        Returns:
            the deleted sprite or undefined if the specified sprite was not found
        """
        ...

    def removeAll(self) -> list[Sprite]:
        """
        Removes all sprites from this group without deleting them.

        Returns:
            the removed sprites
        """
        ...

    def delete(self) -> None:
        """
        Deletes the group and all its sprites
        from the world and every other group they belong to.

        Don't attempt to use a group after deleting it.
        """
        ...

    def deleteAll(self) -> None:
        """
        Deletes all the sprites in the group.

        Does not delete the group itself.
        """
        ...

    def update(self) -> None:
        """Updates all the sprites in the group."""
        ...

    def draw(self) -> None:
        """Draws all the sprites in the group."""
        ...

class World:
    """The World is the Box2D physics simulation."""

    @property
    def gravity(self) -> Any:
        """
        Gravity force vector that affects all dynamic physics colliders.

        Default: `{ x: 0, y: 0 }`
        """
        ...

    @gravity.setter
    def gravity(self, val: Any) -> None: ...

    @property
    def bounceThreshold(self) -> float:
        """
        The lowest velocity an object can have before it is considered
        to be at rest.

        Adjust the bounce threshold to allow for slow moving objects
        but don't have it be too low, or else objects will never sleep,
        which will hurt performance.

        Default: `0.19`
        """
        ...

    @bounceThreshold.setter
    def bounceThreshold(self, val: float) -> None: ...

    physicsTime: float
    """The time elapsed in the physics simulation in seconds."""

    meterSize: float
    """
    Represents the size of a meter in pixels.

    Adjusting this property changes the simulated scale of the physics world.
    For optimal results, it should be set such that sprites are between
    0.1 and 10 meters in size in the physics simulation.

    The default value is 60, which means that your sprites should optimally
    be between 6 and 600 pixels in size.

    Default: `60`
    """

    autoStep: bool
    """

    Default: `true`
    """

    def physicsUpdate(self, timeStep: float = ...) -> None:
        """
        Performs a physics simulation step that advances all sprites
        forward in time by 1 / updateRate * timeScale if no timeStep is given.
        """
        ...

    @property
    def timeScale(self) -> float:
        """
        A time scale of 1.0 represents real time.
        Accepts decimal values between 0 and 2.

        Default: `1.0`
        """
        ...

    @timeScale.setter
    def timeScale(self, val: float) -> None: ...

    @property
    def updateRate(self) -> float:
        """
        The fixed update rate of the physics simulation in hertz.

        The time step, the amount of time that passes during a
        physics update, is calculated to be: 1 / updateRate * timeScale

        Setting the update rate to a value lower than 50hz is not
        recommended, as simulation quality will degrade.

        Default: `60`
        """
        ...

    @updateRate.setter
    def updateRate(self, val: float) -> None: ...

    @property
    def realTime(self) -> float:
        """
        The real time in seconds since the world was created, including
        time spent paused.
        """
        ...

    @overload
    def getSpritesAt(self, x: float, y: float, radius: float = ..., group: Group = ..., cameraActiveWhenDrawn: bool = ...) -> list[Sprite]:
        """
        Returns the sprites at a position, ordered by layer.

        Sprites must have a physics body to be detected.

        Args:
            x: x coordinate or object with x and y properties
            radius: the distance from the point that sprites can be detected at, default is 0 (only sprites that overlap the point will be detected)
            group: limit results to a specific group, allSprites by default
            cameraActiveWhenDrawn: limit results to sprites drawn when the camera was active, true by default

        Returns:
            an array of sprites
        """
        ...

    @overload
    def getSpritesAt(self, pos: dict, radius: float = ..., group: Group = ..., cameraActiveWhenDrawn: bool = ...) -> list[Sprite]:
        """
        Returns the sprites at a position, ordered by layer.

        Sprites must have a physics body to be detected.

        Args:
            pos: object with x and y properties
            radius: the distance from the point that sprites can be detected at, default is 0 (only sprites that overlap the point will be detected)
            group: limit results to a specific group, allSprites by default
            cameraActiveWhenDrawn: limit results to sprites drawn when the camera was active, true by default

        Returns:
            an array of sprites
        """
        ...

    def getSpritesAt(self, pos: dict, radius: float = ..., group: Group = ..., cameraActiveWhenDrawn: bool = ...) -> list[Sprite]:
        ...

    @overload
    def getSpriteAt(self, x: float, y: float, radius: float = ..., group: Group = ...) -> Sprite:
        """
        Returns the sprite at the specified position
        on the top most layer, drawn when the camera was on.

        The sprite must have a physics body to be detected.

        Args:
            x: x coordinate or object with x and y properties
            radius: the distance from the point that sprites can be detected at, default is 0 (only sprites that overlap the point will be detected)
            group: the group to search

        Returns:
            a sprite
        """
        ...

    @overload
    def getSpriteAt(self, pos: dict, radius: float = ..., group: Group = ...) -> Sprite:
        """
        Returns the sprite at the specified position
        on the top most layer, drawn when the camera was on.

        The sprite must have a physics body to be detected.

        Args:
            pos: object with x and y properties
            radius: the distance from the point that sprites can be detected at, default is 0 (only sprites that overlap the point will be detected)
            group: the group to search

        Returns:
            a sprite
        """
        ...

    def getSpriteAt(self, pos: dict, radius: float = ..., group: Group = ...) -> Sprite:
        ...

    @property
    def allowSleeping(self) -> bool:
        """
        "Sleeping" sprites get temporarily ignored during physics
        simulation. A sprite starts "sleeping" when it stops moving and
        doesn't collide with anything that it wasn't already touching.

        This is an important performance optimization that you probably
        shouldn't disable for every sprite in the world.

        Default: `true`
        """
        ...

    @allowSleeping.setter
    def allowSleeping(self, val: bool) -> None: ...

    @overload
    def rayCast(self, startPos: list[dict | float], direction: float, maxDistance: float = ...) -> Sprite:
        """
        Finds the first sprite (with a physics body) that
        intersects a ray (line).

        Args:
            startPos: starting position of the ray cast, object with x and y properties or array [x, y]
            direction: direction angle of the ray
            maxDistance: max distance the ray should check, default 10000

        Returns:
            The first sprite the ray hits or undefined
        """
        ...

    @overload
    def rayCast(self, startPos: list[dict | float], endPos: list[dict | float]) -> Sprite:
        """
        Finds the first sprite (with a physics body) that
        intersects a ray from startPos to endPos.

        Args:
            startPos: starting position of the ray cast
            endPos: end position of the ray cast

        Returns:
            The first sprite the ray hits or undefined
        """
        ...

    def rayCast(self, startPos: list[dict | float], endPos: list[dict | float]) -> Sprite:
        ...

    @overload
    def rayCastAll(self, startPos: list[dict | float], direction: float, maxDistance: float = ..., limiter: Callable[..., Any] = ...) -> list[Sprite]:
        """
        Finds all sprites (with physics bodies) that intersect
        a ray (line), sorted by distance.

        Args:
            startPos: starting position of the ray cast, object with x and y properties or array [x, y]
            direction: direction angle of the ray
            maxDistance: max distance the ray should check, default 10000
            limiter: callback run each time the ray hits a sprite; return true to stop the ray

        Returns:
            An array of sprites that the ray cast hit, sorted by distance. The sprite closest to the starting point will be at index 0. If a limiter is provided, this array includes the sprite that caused the ray to stop.
        """
        ...

    @overload
    def rayCastAll(self, startPos: list[dict | float], endPos: list[dict | float], limiter: Callable[..., Any] = ...) -> list[Sprite]:
        """
        Finds all sprites (with physics bodies) that intersect
        a ray from startPos to endPos, sorted by distance.

        Args:
            startPos: starting position of the ray cast
            endPos: end position of the ray cast
            limiter: callback run each time the ray hits a sprite; return true to stop the ray

        Returns:
            An array of sprites that the ray cast hit, sorted by distance.
        """
        ...

    def rayCastAll(self, startPos: list[dict | float], endPos: list[dict | float], limiter: Callable[..., Any] = ...) -> list[Sprite]:
        ...

    def circleCast(self, startPos: list[dict | float], endPos: list[dict | float], radius: float) -> Sprite:
        """
        Finds the first sprite (with a physics body) that
        intersects a swept circle (capsule cast) from startPos to endPos.

        Args:
            startPos: starting position of the cast, object with x and y properties or array [x, y]
            endPos: end position of the cast
            radius: radius of the circle

        Returns:
            The first sprite hit or undefined
        """
        ...

    def circleCastAll(self, startPos: list[dict | float], endPos: list[dict | float], radius: float, limiter: Callable[..., Any] = ...) -> list[Sprite]:
        """
        Finds all sprites (with physics bodies) that intersect
        a swept circle (capsule cast) from startPos to endPos, sorted by distance.

        Args:
            startPos: starting position of the cast
            endPos: end position of the cast
            radius: radius of the circle
            limiter: callback run each time the cast hits a sprite; return true to stop the cast

        Returns:
            An array of sprites hit, sorted by distance.
        """
        ...

    @overload
    def explodeAt(self, x: float, y: float, radius: float = ..., magnitude: float = ..., falloff: float = ...) -> None:
        """
        Applies an explosive force to sprites within the radius of the explosion.

        Args:
            x: x coordinate or object with x and y properties of the center of the explosion
            radius: the distance from the center of the explosion that sprites can be affected by the explosion
            magnitude: the strength of the explosion force, default is 1
            falloff: how much the explosion force decreases as sprites are farther from the center of the explosion, default is 0.1 (10% decrease per pixel)
        """
        ...

    @overload
    def explodeAt(self, pos: dict, radius: float = ..., magnitude: float = ..., falloff: float = ...) -> None:
        ...

    def explodeAt(self, pos: dict, radius: float = ..., magnitude: float = ..., falloff: float = ...) -> None:
        ...

    @property
    def awakeBodies(self) -> float:
        """The number of physics bodies currently awake in the world."""
        ...

    @property
    def hitThreshold(self) -> float:
        """The minimum impact velocity needed for a hit event to be fired."""
        ...

    @hitThreshold.setter
    def hitThreshold(self, val: float) -> None: ...

    @property
    def profile(self) -> Any:
        """Box2D world performance profile data."""
        ...

    @property
    def debugInfo(self) -> Any:
        """Box2D world counter/statistics data."""
        ...

    subSteps: float
    """
    The number of sub-steps per physics update.
    More sub-steps increases accuracy at the cost of performance.

    Default: `4`
    """

    def step(self, timeStep: float = ...) -> None:
        """Alias for `physicsUpdate`."""
        ...

    wID: Any
    """The Box2D world ID. Don't change it!"""

class Camera:
    """The Camera controls the position and zoom of the view of the world that is drawn on the canvas."""

    isActive: bool
    """
    Read only. True if the camera is active.
    Use camera.on() to activate the camera.

    Default: `false`
    """

    @property
    def x(self) -> float:
        """The camera's x position."""
        ...

    @x.setter
    def x(self, val: float) -> None: ...

    @property
    def y(self) -> float:
        """The camera's y position."""
        ...

    @y.setter
    def y(self, val: float) -> None: ...

    @property
    def pos(self) -> dict:
        """
        Gets the camera's position as a readonly {x, y} object that
        won't be updated if the camera moves. Useful for saving the
        camera's position at a specific moment in time.
        """
        ...

    @pos.setter
    def pos(self, val: list[float] | dict) -> None: ...

    @property
    def position(self) -> Vector:
        """The camera's position vector."""
        ...

    @position.setter
    def position(self, val: list[float] | dict) -> None: ...

    def moveTo(self, x: float, y: float, speed: float) -> Awaitable[bool]:
        """
        Moves the camera to a position.

        Returns:
            resolves true when the camera reaches the target position
        """
        ...

    @property
    def zoom(self) -> float:
        """
        Camera zoom.

        A scale of 1 will be the normal size. Setting it to 2
        will make everything appear twice as big. .5 will make
        everything look half size.

        Default: `1`
        """
        ...

    @zoom.setter
    def zoom(self, val: float) -> None: ...

    def zoomTo(self, target: float, speed: float) -> Awaitable[bool]:
        """
        Zoom the camera at a given speed.

        Args:
            target: The target zoom
            speed: The amount of zoom per frame

        Returns:
            resolves true when the camera reaches the target zoom
        """
        ...

    def on(self) -> None:
        """
        Activates the camera.

        The canvas will be drawn according to the camera position and scale until
        camera.off() is called.
        """
        ...

    def off(self) -> None:
        """
        Deactivates the camera.

        The canvas will be drawn normally, ignoring the camera's position
        and scale until camera.on() is called.
        """
        ...

class Joint:
    """
    A Joint is used to constrain the movement of two sprites relative
    to each other, which can lead to nuanced physics interactions.
    """

    @classmethod
    def new(cls, spriteA: Sprite, spriteB: Sprite, type_: str = ...) -> 'Joint':
        """
        Don't use the Joint constructor directly, use one of these
        joint constructors instead:

        GlueJoint, DistanceJoint, WheelJoint, HingeJoint,
        SliderJoint, or GrabberJoint.
        """
        ...

    def __init__(self, spriteA: Sprite, spriteB: Sprite, type_: str = ...) -> None: ...

    spriteA: Sprite
    """The first sprite in the joint."""

    spriteB: Sprite
    """The second sprite in the joint."""

    type: str
    """
    The type of joint. Can be one of:

    "glue", "distance", "wheel", "hinge", "slider", or "grabber".

    Can't be changed after the joint is created.
    """

    visible: bool
    """
    Determines whether to draw the joint if spriteA
    or spriteB is drawn.

    Default: `true`
    """

    @property
    def offsetA(self) -> Vector:
        """
        Offset to the joint's anchorA position from the center of spriteA.

        Only distance and hinge joints have an offsetA.

        Default: `{x: 0, y: 0}`
        """
        ...

    @offsetA.setter
    def offsetA(self, val: list | dict | Vector) -> None: ...

    @property
    def offsetB(self) -> Vector:
        """
        Offset to the joint's anchorB position from the center of spriteB.

        Only distance, hinge, and wheel joints have an offsetB.

        Default: `{x: 0, y: 0}`
        """
        ...

    @offsetB.setter
    def offsetB(self, val: list | dict | Vector) -> None: ...

    @property
    def draw(self) -> Callable[..., Any]:
        """Function that draws the joint. Can be overridden by the user."""
        ...

    @draw.setter
    def draw(self, val: Callable[..., Any]) -> None: ...

    @property
    def collideConnected(self) -> bool:
        """
        Set to true if you want the joint's sprites to collide with
        each other.

        Default: `false`
        """
        ...

    @collideConnected.setter
    def collideConnected(self, val: bool) -> None: ...

    @property
    def reactionForce(self) -> Any:
        """How much force the joint is applying to keep the two sprites together."""
        ...

    @property
    def reactionTorque(self) -> Any:
        """How much torque the joint is applying to keep the two sprites together."""
        ...

    @property
    def forceThreshold(self) -> float:
        """
        The amount of force that must be applied to the joint before it breaks.

        Setting the threshold too high leads to instability. Use
        `sprite.addCollider` to simulate unbreakable bonds between shapes.

        Default: `500`
        """
        ...

    @forceThreshold.setter
    def forceThreshold(self, val: float) -> None: ...

    @property
    def torqueThreshold(self) -> float:
        """
        The amount of torque that must be applied to the joint before it breaks.

        Setting the threshold too high leads to instability. Use
        `sprite.addCollider` to simulate unbreakable bonds between shapes.

        Default: `500`
        """
        ...

    @torqueThreshold.setter
    def torqueThreshold(self, val: float) -> None: ...

    def onStrain(self) -> None:
        """
        This function is run when the joint's reaction force exceeds the
        force threshold or its reaction torque exceeds the torque threshold.

        By default, the sprites' speed and rotation speed are set to 0
        and the joint is deleted, simulating a break.
        """
        ...

    def delete(self) -> None:
        """
        Deletes the joint from the world and from each of the
        associated sprites' joints arrays.
        """
        ...

    jID: Any
    """The Box2D joint ID. Don't change it!"""

class GlueJoint(Joint):

    def __init__(self, spriteA: Sprite, spriteB: Sprite) -> None: ...

    @property
    def springiness(self) -> float:
        ...

    @springiness.setter
    def springiness(self, val: float) -> None: ...

    @property
    def damping(self) -> float:
        ...

    @damping.setter
    def damping(self, val: float) -> None: ...

class DistanceJoint(Joint):

    def __init__(self, spriteA: Sprite, spriteB: Sprite) -> None: ...

    @property
    def currentLength(self) -> float:
        """The current distance between the two joint anchors."""
        ...

    @property
    def length(self) -> float:
        """
        The target length of the joint between the two joint anchors.

        It's set to the current distance between the two sprites
        when the joint is created.
        """
        ...

    @length.setter
    def length(self, val: float) -> None: ...

    @property
    def limitsEnabled(self) -> bool:
        """
        Whether the joint's length limits are enabled.
        When enabled a min/max length range constrains the joint.

        Default: `false`
        """
        ...

    @limitsEnabled.setter
    def limitsEnabled(self, val: bool) -> None: ...

    @property
    def minLength(self) -> float:
        """The minimum length allowed when limits are enabled."""
        ...

    @property
    def maxLength(self) -> float:
        """The maximum length allowed when limits are enabled."""
        ...

    @property
    def range(self) -> Any:
        """
        Accepts a number to set a symmetric range
        or an array with the minimum and maximum length limits.
        """
        ...

    @range.setter
    def range(self, val: tuple[float, float] | float) -> None: ...

    @property
    def springEnabled(self) -> bool:
        """
        Whether spring behavior is enabled for the joint.

        Default: `true`
        """
        ...

    @springEnabled.setter
    def springEnabled(self, val: bool) -> None: ...

    @property
    def springiness(self) -> float:
        """
        The springiness of the joint, a 0-1 ratio.

        0 is rigid, 0.5 is bouncy, 1 is loose.

        Default: `0`
        """
        ...

    @springiness.setter
    def springiness(self, val: float) -> None: ...

    @property
    def damping(self) -> float:
        """
        Damping is a 0-1 ratio describing how quickly the joint loses
        vibrational energy.

        0.0 means no damping, 1.0 means critical damping, which will stop
        the joint from vibrating at all.

        Damping only effects joints that have a
        springiness greater than 0.

        Default: `0.0`
        """
        ...

    @damping.setter
    def damping(self, val: float) -> None: ...

    @property
    def motorEnabled(self) -> bool:
        """
        Whether the joint's motor is enabled.

        Default: `false`
        """
        ...

    @motorEnabled.setter
    def motorEnabled(self, val: bool) -> None: ...

    @property
    def speed(self) -> float:
        """
        Motor speed.

        Default: `0`
        """
        ...

    @speed.setter
    def speed(self, val: float) -> None: ...

    @property
    def maxPower(self) -> float:
        """Maximum motor force the motor can apply."""
        ...

    @maxPower.setter
    def maxPower(self, val: float) -> None: ...

    @property
    def power(self) -> float:
        """The current motor force being applied by the joint."""
        ...

class WheelJoint(Joint):

    def __init__(self, spriteA: Sprite, spriteB: Sprite) -> None: ...

    @property
    def angle(self) -> float:
        """
        The angle at which the wheel is attached to the vehicle body.

        The default is 90 degrees (PI/2 in radians).

        Default: `90`
        """
        ...

    @angle.setter
    def angle(self, val: float) -> None: ...

    @property
    def limitsEnabled(self) -> bool:
        """
        Whether the joint's suspension limits are enabled.
        When enabled a min/max distance from resting constrains the joint.

        Default: `false`
        """
        ...

    @limitsEnabled.setter
    def limitsEnabled(self, val: bool) -> None: ...

    @property
    def lowerLimit(self) -> float:
        """
        The minimum distance the wheel's suspension can contract
        from 0, which represents the resting position,
        when limits are enabled.
        """
        ...

    @property
    def upperLimit(self) -> float:
        """
        The maximum distance the wheel's suspension can extend
        from 0, which represents the resting position,
        when limits are enabled.
        """
        ...

    @property
    def range(self) -> Any:
        """
        The distance the wheel's suspension can contract or extend
        from 0, which represents the resting position.

        Accepts a number to set a symmetric range
        or an array with the minimum and maximum length limits.
        """
        ...

    @range.setter
    def range(self, val: tuple[float, float] | float) -> None: ...

    @property
    def springEnabled(self) -> bool:
        """
        Whether the wheel joint has suspension,
        which can make it ride smoother over bumps.

        Default: `true`
        """
        ...

    @springEnabled.setter
    def springEnabled(self, val: bool) -> None: ...

    @property
    def springiness(self) -> float:
        """
        The springiness of the joint, a 0-1 ratio.

        0.0 is rigid, 0.5 is bouncy, 1.0 is loose.

        Default: `0.0`
        """
        ...

    @springiness.setter
    def springiness(self, val: float) -> None: ...

    @property
    def damping(self) -> float:
        """
        Damping is a 0-1 ratio describing how quickly the joint loses
        vibrational energy.

        0.0 means no damping, 1.0 means critical damping, which will stop
        the joint from vibrating at all.

        Damping only effects joints that have a
        springiness greater than 0.

        Default: `0.0`
        """
        ...

    @damping.setter
    def damping(self, val: float) -> None: ...

    @property
    def motorEnabled(self) -> bool:
        """
        Whether the joint's motor is enabled.

        Default: `false`
        """
        ...

    @motorEnabled.setter
    def motorEnabled(self, val: bool) -> None: ...

    @property
    def speed(self) -> float:
        """
        Motor speed.

        Default: `0`
        """
        ...

    @speed.setter
    def speed(self, val: float) -> None: ...

    @property
    def maxPower(self) -> float:
        """Maximum torque the motor can apply."""
        ...

    @maxPower.setter
    def maxPower(self, val: float) -> None: ...

    @property
    def power(self) -> float:
        """The current torque being applied by the motor."""
        ...

class HingeJoint(Joint):

    def __init__(self, spriteA: Sprite, spriteB: Sprite) -> None: ...

    @property
    def limitsEnabled(self) -> bool:
        """
        Whether the joint's angle limits are enabled.
        When enabled a min/max angle range constrains the joint.

        Default: `false`
        """
        ...

    @limitsEnabled.setter
    def limitsEnabled(self, val: bool) -> None: ...

    @property
    def minAngle(self) -> float:
        """The lower limit of rotation."""
        ...

    @property
    def maxAngle(self) -> float:
        """The upper limit of rotation."""
        ...

    @property
    def range(self) -> Any:
        """
        Accepts a number to set a symmetric range
        or an array with the lower and upper limits of rotation.
        """
        ...

    @range.setter
    def range(self, val: tuple[float, float] | float) -> None: ...

    @property
    def angle(self) -> float:
        """The joint's current angle of rotation."""
        ...

    @property
    def springEnabled(self) -> bool:
        """
        Whether spring behavior is enabled.

        Default: `false`
        """
        ...

    @springEnabled.setter
    def springEnabled(self, val: bool) -> None: ...

    @property
    def springiness(self) -> float:
        """
        The springiness of the joint, a 0-1 ratio.

        0 is rigid, 0.5 is bouncy, 1 is loose.

        Default: `0`
        """
        ...

    @springiness.setter
    def springiness(self, val: float) -> None: ...

    @property
    def damping(self) -> float:
        """
        Damping ratio, 0-1. Higher values reduce oscillation faster.

        Default: `0`
        """
        ...

    @damping.setter
    def damping(self, val: float) -> None: ...

    @property
    def motorEnabled(self) -> bool:
        """
        Whether the joint's motor is enabled.

        Default: `false`
        """
        ...

    @motorEnabled.setter
    def motorEnabled(self, val: bool) -> None: ...

    @property
    def speed(self) -> float:
        """
        Motor speed.

        Default: `0`
        """
        ...

    @speed.setter
    def speed(self, val: float) -> None: ...

    @property
    def maxPower(self) -> float:
        """Maximum torque the motor can apply."""
        ...

    @maxPower.setter
    def maxPower(self, val: float) -> None: ...

    @property
    def power(self) -> float:
        """The current torque being applied by the motor."""
        ...

class SliderJoint(Joint):

    def __init__(self, spriteA: Sprite, spriteB: Sprite) -> None: ...

    @property
    def translation(self) -> float:
        """The current displacement of spriteB along the slide axis."""
        ...

    @property
    def limitsEnabled(self) -> bool:
        """
        Whether the joint's translation limits are enabled.

        Default: `false`
        """
        ...

    @limitsEnabled.setter
    def limitsEnabled(self, val: bool) -> None: ...

    @property
    def lowerLimit(self) -> float:
        """The mathematical lower limit of translation."""
        ...

    @property
    def upperLimit(self) -> float:
        """The mathematical upper limit of translation."""
        ...

    @property
    def range(self) -> Any:
        """
        Accepts a number to set a symmetric range
        or an array with the lower and upper translation limits.
        """
        ...

    @range.setter
    def range(self, val: tuple[float, float] | float) -> None: ...

    @property
    def springEnabled(self) -> bool:
        """
        Whether spring behavior is enabled.

        Default: `false`
        """
        ...

    @springEnabled.setter
    def springEnabled(self, val: bool) -> None: ...

    @property
    def springiness(self) -> float:
        """
        The springiness of the joint, a 0-1 ratio.

        0 is rigid, 0.5 is bouncy, 1 is loose.

        Default: `0`
        """
        ...

    @springiness.setter
    def springiness(self, val: float) -> None: ...

    @property
    def damping(self) -> float:
        """
        Damping ratio, 0-1. Higher values reduce oscillation faster.

        Default: `0`
        """
        ...

    @damping.setter
    def damping(self, val: float) -> None: ...

    @property
    def motorEnabled(self) -> bool:
        """
        Whether the joint's motor is enabled.

        Default: `true`
        """
        ...

    @motorEnabled.setter
    def motorEnabled(self, val: bool) -> None: ...

    @property
    def speed(self) -> float:
        """
        Motor speed.

        Default: `0`
        """
        ...

    @speed.setter
    def speed(self, val: float) -> None: ...

    @property
    def maxPower(self) -> float:
        """
        Maximum force the motor can apply.

        Default: `10`
        """
        ...

    @maxPower.setter
    def maxPower(self, val: float) -> None: ...

    @property
    def power(self) -> float:
        """The current motor force being applied."""
        ...

    @property
    def energy(self) -> float:
        """The current sliding speed of the joint."""
        ...

class GrabberJoint(Joint):

    def __init__(self, pointer: Any, sprite: Sprite) -> None: ...

    sprite: Sprite
    """The sprite being grabbed by the joint."""

    @property
    def target(self) -> Any:
        """
        The target position of the joint that the sprite will be
        moved towards. Can be a coordinate array or object with x and y properties.
        """
        ...

    @target.setter
    def target(self, val: Any) -> None: ...

    @property
    def maxForce(self) -> float:
        """
        The maximum spring force that the joint can exert on the sprite.

        By default it's 500 * the sprite's mass.
        """
        ...

    @maxForce.setter
    def maxForce(self, val: float) -> None: ...

    @property
    def maxTorque(self) -> float:
        """
        The maximum torque that the joint can exert on the sprite.

        By default it's 0.25 * the sprite's mass * the square root
        of the rotational inertia divided by the sprite's mass.
        """
        ...

    @maxTorque.setter
    def maxTorque(self, val: float) -> None: ...

class CastInfo:

    sprite: Sprite
    """The sprite that was hit by the ray or circle cast."""

    distance: float
    """The distance from the start of the cast to the intersection point."""

    @property
    def intersect(self) -> dict:
        """The intersection point of the cast with the sprite's shape."""
        ...

    @property
    def incidence(self) -> float:
        """The angle of incidence of the cast at the intersection point."""
        ...

class Scale:

    def valueOf(self) -> float:
        ...

class FriendlyError(Exception):
    """
    A FriendlyError is a custom error class that extends the native JS
    Error class. It's used internally by q5play to make error messages
    more helpful.
    """

    @classmethod
    def new(cls, func: Any, errorNum: Any, e: Any) -> 'FriendlyError':
        ...

    def __init__(self, func: Any, errorNum: Any, e: Any) -> None: ...

class InputDevice:

    holdThreshold: float
    """
    The amount of frames an input must be pressed to be considered held.

    Default: `12`
    """

    def presses(self, inp: str = ...) -> bool:
        """

        Returns:
            true on the first frame that the user presses the input
        """
        ...

    def pressing(self, inp: str = ...) -> float:
        """

        Returns:
            the amount of frames the user has been pressing the input
        """
        ...

    def pressed(self, inp: str = ...) -> bool:
        """
        Same as the `released` function, which is preferred.

        .. deprecated::

        Returns:
            true on the first frame that the user released the input
        """
        ...

    def holds(self, inp: str = ...) -> bool:
        """

        Returns:
            true on the first frame that the user holds the input
        """
        ...

    def holding(self, inp: str = ...) -> float:
        """

        Returns:
            the amount of frames the user has been holding the input
        """
        ...

    def held(self, inp: str = ...) -> bool:
        """

        Returns:
            true on the first frame that the user released a held input
        """
        ...

    def released(self, inp: str = ...) -> bool:
        """

        Returns:
            true on the first frame that the user released the input
        """
        ...

    def releases(self, inp: Any = ...) -> bool:
        ...

class _Mouse(InputDevice):

    x: float
    """The mouse's x position in the world."""

    y: float
    """The mouse's y position in the world."""

    left: float
    """The mouse's left button."""

    center: float
    """The mouse's center button."""

    right: float
    """The mouse's right button."""

    scrollDelta: dict
    """Contains the scroll status of the mouse wheel."""

    drag: dict
    """Contains the drag status of each of the mouse's buttons."""

    isOnCanvas: bool
    """
    True if the mouse is currently on the canvas.

    Default: `false`
    """

    isActive: bool
    """
    True if the mouse has ever interacted with the canvas.

    Default: `false`
    """

    @property
    def pos(self) -> dict:
        """
        Gets the mouse's current position in the world as a readonly object {x, y}
        that won't updated if the mouse moves.
        """
        ...

    @property
    def position(self) -> dict:
        """The mouse's current position."""
        ...

    @property
    def cursor(self) -> str:
        """
        The mouse's CSS cursor style.

        Default: `'default'`
        """
        ...

    @cursor.setter
    def cursor(self, val: str) -> None: ...

    @property
    def visible(self) -> bool:
        """
        Controls whether the mouse is visible or not.

        Default: `true`
        """
        ...

    @visible.setter
    def visible(self, val: bool) -> None: ...

    def drags(self, inp: str = ...) -> bool:
        """

        Returns:
            true on the first frame that the user moves the mouse while pressing the input
        """
        ...

    def dragging(self, inp: str = ...) -> float:
        """

        Returns:
            the amount of frames the user has been moving the mouse while pressing the input
        """
        ...

    def dragged(self, inp: str = ...) -> bool:
        """

        Returns:
            true on the first frame that the user releases the input after dragging the mouse
        """
        ...

    def scrolls(self) -> bool:
        """

        Returns:
            true on the first frame that the user scrolls the mouse wheel
        """
        ...

    def scrolling(self) -> float:
        """

        Returns:
            the amount of frames the user has been scrolling the mouse wheel
        """
        ...

    def scrolled(self) -> bool:
        """

        Returns:
            true on the first frame that the user stops scrolling the mouse wheel
        """
        ...

class _Pointer(InputDevice):

    @classmethod
    def new(cls, pointer: Any) -> '_Pointer':
        ...

    def __init__(self, pointer: Any) -> None: ...

    x: float
    """The pointer's x position in the physics world."""

    y: float
    """The pointer's y position in the physics world."""

    id: float
    """The pointer's unique identifier."""

    duration: float
    """The amount of frames the pointer has been active for."""

    canvasPos: dict
    """The pointer's absolute position on the canvas."""

    pressure: float
    """
    The pointer's pressure level, from 0 to 1.

    On devices that do not support pressure sensitivity,
    the value is 0.5 when the pointer is pressing.
    """

    press: float
    """
    The amount of frames the user has been clicking, touching,
    or drawing on the screen with the pointer.
    """

    def grabs(self) -> bool:
        """

        Returns:
            true on the first frame that the pointer grabs a sprite
        """
        ...

    def grabbing(self) -> float:
        """

        Returns:
            the amount of frames the pointer has been grabbing a sprite
        """
        ...

    def grabbed(self) -> bool:
        """

        Returns:
            true on the first frame that the pointer releases a grabbed sprite
        """
        ...

    def overlaps(self, sprite: Sprite) -> bool:
        """

        Returns:
            true on the first frame that the pointer overlaps the sprite
        """
        ...

    def overlapping(self, sprite: Sprite) -> float:
        """

        Returns:
            the amount of frames the pointer has been overlapping the sprite
        """
        ...

    def overlapped(self, sprite: Sprite) -> bool:
        """

        Returns:
            true on the first frame that the pointer stops overlapping the sprite
        """
        ...

class _Keyboard(InputDevice):

    alt: float

    arrowUp: float

    arrowDown: float

    arrowLeft: float

    arrowRight: float

    backspace: float

    capsLock: float

    control: float

    enter: float

    meta: float

    shift: float

    tab: float

    @property
    def visible(self) -> bool:
        ...

    @visible.setter
    def visible(self, val: bool) -> None: ...

    @property
    def cmd(self) -> float:
        ...

    @property
    def command(self) -> float:
        ...

    @property
    def ctrl(self) -> float:
        ...

    @property
    def space(self) -> Any:
        ...

    @property
    def opt(self) -> float:
        ...

    @property
    def option(self) -> float:
        ...

    @property
    def win(self) -> float:
        ...

    @property
    def windows(self) -> float:
        ...

class Contro(InputDevice):

    @classmethod
    def new(cls, gp: Any | str) -> 'Contro':
        """
        Stores the input status of buttons, triggers, and sticks on
        game controllers. Used internally to create controller objects
        for the `contros` array (aka `controllers`).

        Can also be used to create a mock controller object.
        """
        ...

    def __init__(self, gp: Any | str) -> None: ...

    connected: bool

    a: float

    b: float

    x: float

    y: float

    l: float
    """Left shoulder button."""

    r: float
    """Right shoulder button."""

    lt: float
    """Digital left trigger."""

    rt: float
    """Digital right trigger."""

    select: float

    start: float

    lsb: float
    """
    Left stick button.
    Activated by pressing down on the left analog stick.
    """

    rsb: float
    """
    Right stick button.
    Activated by pressing down on the right analog stick.
    """

    up: float

    down: float

    left: float

    right: float

    leftStick: Any
    """
    Has x and y properties with -1 to 1 values which
    represent the position of the left analog stick.

    {x: 0, y: 0} is the center position.
    """

    rightStick: Any
    """
    Has x and y properties with -1 to 1 values which
    represent the position of the right analog stick.

    {x: 0, y: 0} is the center position.
    """

    leftTrigger: float
    """
    Analog value 0-1 of the left trigger.

    Default: `0`
    """

    rightTrigger: float
    """
    Analog value 0-1 of the right trigger.

    Default: `0`
    """

    buttonMapping: Any
    """Button names are mapped to `gamepad.buttons` indices."""

    axeMapping: Any
    """Sticks and triggers are mapped to `gamepad.axes` indices."""

    isMock: bool
    """If the controller is a mock controller."""

    gamepad: Any

    id: Any

    hasAnalogTriggers: bool
    """
    True if the controller has analog triggers.
    False if the controller has digital (button) triggers.
    """

    @property
    def cross(self) -> float:
        ...

    @property
    def circle(self) -> float:
        ...

    @property
    def square(self) -> float:
        ...

    @property
    def triangle(self) -> float:
        ...

    @property
    def ls(self) -> Any:
        """Alias for `leftStick`."""
        ...

    @property
    def rs(self) -> Any:
        """Alias for `rightStick`."""
        ...

    @property
    def lb(self) -> float:
        """
        Alias for `l` (left shoulder button).
        `lb` is what it's called on Xbox controllers.
        """
        ...

    @property
    def rb(self) -> float:
        """
        Alias for `r` (right shoulder button).
        `rb` is what it's called on Xbox controllers.
        """
        ...

    @property
    def l1(self) -> float:
        """
        Alias for `l` (left shoulder button).
        `l1` is what it's called on PlayStation controllers.
        """
        ...

    @property
    def r1(self) -> float:
        """
        Alias for `r` (right shoulder button).
        `r1` is what it's called on PlayStation controllers.
        """
        ...

    @property
    def zl(self) -> float:
        """
        Alias for `lt` (digital left trigger).
        `zl` is what it's called on Nintendo controllers.
        """
        ...

    @property
    def zr(self) -> float:
        """
        Alias for `rt` (digital right trigger).
        `zr` is what it's called on Nintendo controllers.
        """
        ...

    @property
    def l2(self) -> float:
        """
        Alias for `leftTrigger` (analog left trigger).
        `l2` is what it's called on PlayStation controllers.
        """
        ...

    @property
    def r2(self) -> float:
        """
        Alias for `rightTrigger` (analog right trigger).
        `r2` is what it's called on PlayStation controllers.
        """
        ...

    @property
    def leftStickButton(self) -> float:
        """Verbose alias for `lsb`."""
        ...

    @property
    def rightStickButton(self) -> float:
        """Verbose alias for `rsb`."""
        ...

    @property
    def l3(self) -> float:
        """
        Alias for `lsb` (left stick button).
        `l3` is what it's called on PlayStation controllers.
        """
        ...

    @property
    def r3(self) -> float:
        """
        Alias for `rsb` (right stick button).
        `r3` is what it's called on PlayStation controllers.
        """
        ...

class _Contros(list[Contro]):

    @classmethod
    def new(cls) -> '_Contros':
        """
        Used internally to create the `contros` array (aka `controllers`)
        of `Contro` objects, which store the input status of buttons,
        triggers, and sticks on game controllers.
        """
        ...

    def __init__(self) -> None: ...

    def swap(self, indexA: float, indexB: float) -> None:
        """Swap controller positions in this controllers array."""
        ...

    def remove(self, index: float) -> None:  # type: ignore[override]
        """
        Removes a controller from this controllers array
        by setting `contros[index] = null`.

        Newly connected controllers fill the first empty slot.
        """
        ...

    def onConnect(self, gamepad: Any) -> bool:
        """
        Runs when a controller is connected. By default it
        always returns true. Overwrite this function to customize
        the behavior.

        For example, it could be customized to filter
        controllers based on their model info.

        Doesn't run if a controller in the `controllers` array
        is reconnected.

        Returns:
            true if the controller should be added to this q5play controllers array
        """
        ...

    def onDisconnect(self, gamepad: Any) -> bool:
        """
        Runs when a controller is disconnected. by default it
        always returns false. Overwrite this function to customize
        the behavior.

        Removing a controller from the `controllers` array
        usually is not desirable, because the controller could be
        reconnected later. By default, the controller is kept in
        the array and its state is reset.

        Returns:
            true if the controllers should be removed from this q5play controllers array
        """
        ...

def colorPal(c: str, palette: list[dict | str]) -> str:
    ...

def EmojiImage(emoji: str, textSize: float) -> Image:
    ...

def spriteArt(txt: str, scale: float, palette: list[dict | str]) -> Image:
    ...

def animation(ani: Ani, x: float, y: float, dW: float, dH: float) -> None:
    """
    Draws an animation.

    Args:
        ani: the animation
        x: x coordinate to draw the animation at
        y: y coordinate to draw the animation at
        dW: display width
        dH: display height
    """
    ...

def delay(milliseconds: float = ...) -> Awaitable[None]:
    """

    Args:
        milliseconds: if not specified, delays until the next frame draw

    Returns:
        resolves after the delay
    """
    ...

allSprites: Group

world: World

camera: Camera

mouse: _Mouse

pointers: list[_Pointer]

pointer: _Pointer

kb: _Keyboard

keyboard: _Keyboard

contros: _Contros

controllers: _Contros

contro: Contro

