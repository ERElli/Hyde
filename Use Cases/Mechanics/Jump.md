Title:Jump

Description: Player enters input to make character jump.

Actors: User

Triggers: Player enters jump input.

Preconditions: Character must be alive in level and in a jumpable state.

Postconditions: Characters vertical acceleration is applied.

Normal Flow:

    1.Player presses jump input button.
    2.Engine checks if player is in a jumpable state.
    3.Engine checks users current form.
    4.Engine applies upward acceleration to character

Alternative Flows: 
2a. Character is not in a jumpable state. 
	1.No upward acceleration is applied to the character.
