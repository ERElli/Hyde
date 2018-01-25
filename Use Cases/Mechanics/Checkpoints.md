Title: Trigger Checkpoint

Description: When character passes through the checkpoint it will activate, allowing the player to respawn at their furthest checkpoint if they die. The checkpoint will indicate that it has been activated.
![](https://github.com/markwindsorr/CS4770/blob/master/images/Mechanics/Checkpoint.jpg)

Actors: User

Triggers: The users location passing through the checkpoint.

Preconditions: Character must progress through the level to reach the checkpoint.

Postconditions: If player dies after the checkpoint they will be returned to the checkpoint location instead of the level start.

Normal Flow:

    1.Characters location passes through the checkpoints location.
    2.Checkpoint is toggled.
    3.Characters respawn location is set to checkpoint position.
    4.Visible Checkpoint indicator is displayed to the player.

Alternative Flows:

1a. Player passes checkpoint without passing through it.<br> 
	&nbsp;&nbsp;&nbsp;&nbsp; 1. Respawn point will be at the start of the level.
