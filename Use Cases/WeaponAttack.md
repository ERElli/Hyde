Title: Weapon attack

Description: Human form weapon attack.

Actors: User

Triggers: Player is in human form and presses attack input.

Preconditions: Player is in human form.

Postconditions: Player weapon attack is used.

Normal Flow:
1. Player presses attack input.
2. Engine checks current player weapon.
3. Engine uses current weapon attack.
4. Engine subtracts 1 ammo from current weapon.
5. Repeat step 1-4
6. Weapon attack hits target.
7. Weapon damage is applied to target.

Alternative Flow:
4a. Player is using basic weapon.
	1. No ammo is subrtacted.

5a. Weapon runs out of ammo.
	1. Player's current weapon is switched to basic weapon.
	2. Basic weapon stats are applied.
	3. Steps 1-4 are repeated with basic weapon.

5b. Player picks up new weapon.
	1. Player's weapon replaced by new weapon.
	2. New weapon stats are applied.
	3. Steps 1-4 are repeated.

7a. Target is resistant to weapon damage.
	1. No damage is applied.

	
