The Game State module contains the classes that keep track of what is currently happening in the game world.
Its classes keep information about what entities exist in the game, and how they interact.
They apply laws of physics to these entities to dictate what happens in the game.
They also keep track of the terrain in the game, to decide whether the entities should stand/walk, or fall.
This module interacts with the Interface module, as the classes in Interface get the current state of the game
from this module, and display what is happening.
It also interacts with the Entity module, as it creates and manipulates entities as needed.
