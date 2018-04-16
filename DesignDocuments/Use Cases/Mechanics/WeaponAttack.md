Title: Weapon attack

Description: Human form weapon attack.
![](https://github.com/markwindsorr/CS4770/blob/master/DesignDocuments/Mechanics/HumanAttack.jpg)

Actors: User

Triggers: Player is in human form and presses attack input.

Preconditions: Player is in human form.

Postconditions: Player weapon attack is used.

Normal Flow:

    1.Player presses attack input.
    2.Engine checks current player weapon.
    3.Engine uses current weapon attack.
    4.Engine subtracts 1 ammo from current weapon.
    5.Repeat step 1-4
    6.Weapon attack hits target.
    7.Weapon damage is applied to target.

Alternative Flow:<br> 
&nbsp;&nbsp;&nbsp;&nbsp;4a. Player is using basic weapon.<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. No ammo is subtracted.<br>

&nbsp;&nbsp;&nbsp;&nbsp;5a. Weapon runs out of ammo.<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. Player's current weapon is switched to basic weapon.<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. Basic weapon stats are applied.<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3. Steps 1-4 are repeated with basic weapon.<br>

&nbsp;&nbsp;&nbsp;&nbsp;5b. Player picks up new weapon.<br> 
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. Player's weapon replaced by new weapon.<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. New weapon stats are applied.<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3. Steps 1-4 are repeated.<br>

&nbsp;&nbsp;&nbsp;&nbsp;7a. Target is resistant to weapon damage.<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. No damage is applied.<br>
