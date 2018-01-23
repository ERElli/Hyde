Title: Throwing attack

Description: Player picks up object and throws it.

Actors: User

Triggers: Player is within range of a throwable object and presses object pick up input.

Preconditions: Player is in massive form and has an object.

Postconditions: Object is thrown.

Normal Flow:

    1.Player presses pick up object input.
    2.Engine checks if player is in massive form.
    3.Engine checks if there is a throwable object within range of player.
    4.Player has object in possession.
    5.Player presses throw object input.
    6.Force is applied to object in the direction the character is facing.
    7.Object is thrown at a velocity based on its mass.
    8.Object hits target.
    9.Damage is calculated based on object momentum and applied to target.

Alternative Flow: 
2a. Player is in human form 
	1. No object pickup is attempted.

4a. Player switches forms while possessing object. 
	1. Object is dropped to the ground.

8a. Object doesnt hit any target 
	1. Object continues to decelerate until it stops.

9a. Target is resistant to thrown objects 
	1. No damage is applied. 
	2. Thrown objects bounce off enemy.
