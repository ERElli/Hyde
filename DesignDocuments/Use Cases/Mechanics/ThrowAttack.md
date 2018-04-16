Title: Throwing attack

Description: Player picks up object and throws it.
![](https://github.com/markwindsorr/CS4770/blob/master/DesignDocuments/Mechanics/ThrowAttack.jpg)
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

Alternative Flow:<br> 
&nbsp;&nbsp;&nbsp;&nbsp;2a. Player is in human form<br> 
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. No object pickup is attempted.<br>

&nbsp;&nbsp;&nbsp;&nbsp; 4a. Player switches forms while possessing object. <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. Object is dropped to the ground.<br>

&nbsp;&nbsp;&nbsp;&nbsp; 8a. Object doesnt hit any target <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. Object continues to decelerate until it stops.<br>

&nbsp;&nbsp;&nbsp;&nbsp;9a. Target is resistant to thrown objects <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. No damage is applied. <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Thrown objects bounce off enemy.<br>
