Title: Move character

Description: How the game takes user input for directional 
moving and applies the movement to their character.

Actors: User

Triggers: User input

Preconditions: The user is currently in a game level.

Postconditions: The user's character changes position and has directional acceleration based upon the input.

Normal Flow:

1. User presses input of direction they want to go.
2. Engine accepts input
3. Engine checks players transformation state.
4. Engine checks Terrain that user is currently on.
5. Engine calculates the acceleration rate of user.
6. Engine applies acceleration the users character in the desired direction.
7. Steps 2 through 6 are repeated until the user has stopped input the direction.

Alternative Flow:<br>
&nbsp;&nbsp;&nbsp;&nbsp;4a. User's character is currently not touching any terrain.<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. A constant minimal acceleration is applied to the character that is in the direction of the input.
	
&nbsp;&nbsp;&nbsp;&nbsp;6a. User is accelerating into an object.<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. The character will accelerate towards the object but will their position will not change.
	
