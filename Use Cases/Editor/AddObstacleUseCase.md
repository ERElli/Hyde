<strong> Title: </strong> Add Obstacle

<strong> Description: </strong> The User is currently using the level editor and wishes to add an obstacle to the level.

<strong> Actors: </strong> User and System

<strong> Triggers: </strong> User decides to add obstacles to the level

<strong> Preconditions: </strong>
<ul>
<li>User is currently using the level editor.</li>
<li>User wants to add obstacles to the level.</li>
</ul>

<strong> Postconditions </strong>
<ul>
<li>At least one obstacle is added to the level</li>
</ul>

<strong> Normal Flow </strong>
<ol>
<li>The system presents User with different types of entities to add to the play area</li>
<li>User chooses to add obstacles to the play area</li>
<li>System presents User with different types of obstacles</li>
<li>User picks the specific obstacle that they wish to add to the play area</li>
<li>User brings their mouse over an empty tile on the play area</li>
<li>System shows User a preview of where the obstacle will be placed</li>
<li>User clicks on the tile of the play area where they wish to add the obstacle</li>
<li>System shows the placed obstacle on the play area</li>
</ol>

<strong> Alternative Flows </strong>
	5a. The user brings their mouse over a filled tile on the play area
	<ol><li>System shows User a red X to indicate that the obstacle cannot be placed on that tile</li><li>Resume at step 5 of the normal flow</li></ol>
	
7a. User left clicks on a tile and drags the obstacle to add it to each of the tiles they move the mouse over
<ol><li>User releases the left mouse button to stop placing terrain blocks</li>
<li>Resume at step 8 of the normal flow</li></ol> 

