Title: Momentum attack 

Description: The massive form's momentum attack to damage enemies and objects.

Actors: User

Triggers: Character is in massive form and comes into contact with destructible object or enemy.

Preconditions: Character must be alive and in massive form while moving.

Postconditions: Attack was a success or failure.

Normal Flow:
1. Player accelerates toward target in massive form
2. Character contacts target.
3. Player's momentum is checked and compared to targets resistance.
4. Player's damage to target is calculated.
5. Damage is applied to target.
6. Player's velocity and momentum is reduced by targets resistance.


Alternative Flow:
2a. Player is in human form.
	2. Attack attempt does not occur.

3a. Player momentum is too low to pass momentum check.
	1. Player takes damage based on current momentum.
	2. Player's velocity and momentum is set to 0.
	3. Target takes no damage.

5a. Target is a breakable object
	1. Object health is less then calculated damage output.
		i) Object destroyed.
		ii) Player maintains current momentum.
	2. Object health is greater then calculated damage output.
		i) Player takes damage based on momentum.
		ii) Player's velocity and momentum is set to 0.
		
