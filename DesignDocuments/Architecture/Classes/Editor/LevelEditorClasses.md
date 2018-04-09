
![Rough WireFrame of Created Level](https://github.com/markwindsorr/CS4770/blob/master/images/createdLevelWireFrame.jpg)

![Rough WireFram of Empty Level Editor](https://github.com/markwindsorr/CS4770/blob/master/images/emptyEditorWireframe.jpg)

Level Class: the Level class is responsible for all things contained in the level. In each level, the player is able to select a background, different types of terrain in the form of Blocks(either a building or sidewalk made from 31 by pixel squares), checkpoints/weapons/enemies throughout the level and a soundtrack. The methods of this class are built around the player setting the x/y positions of objects like checkpoints, weapons, blocks, enemies and also setting the background and soundtrack.

LevelEditor Class: The LevelEditor class has one Level object whose methods must be able to save the created level to database, clear the level to start from scratch and to exit the level editor.

Weapon Class: also referenced in the entity class description class except in the level editor it needs to be a provided an x and y coordinate. The Weapon class responsibity is to provide properties of the weapon used by the player such as the firing rate, bullet speed, and damage

Checkpoint Class: A checkpoint object's responsibility is to give an x coordinate on the level that if passed by the player, the player will return to that point if he fails to complete the level

Enemy Class: also referenced in the entity class description, gives properties and behaviour of various enemies including bosses. The enemy class within the level editor must also need an x & y coordinate to specify where the enemy's starting point on the level is.

Block Class: the super class of both the building/sidewalk block class. A block is anything that the player can stand or walk on. In our game, we will be using square buildings and sidwalks as blocks. Each block of terrain will need to be given length/width and an x and y coordinate. 

Building Block Class: inherits from the block class. A building block object can take on a variety of sizes which will consist of a collection of 31 by 31 pixel squares. Contains array of building images that will be displayed based on building size. Buildings can either have breakable walls or slippery rooftops. See image for example.

Sidewalk Block Class: inherits from the block class. Contains an array of images that display different styles of sidewalk block. Sidewalk




