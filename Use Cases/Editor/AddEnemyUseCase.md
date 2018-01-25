<strong> Title: </strong> Add Enemy

<strong> Description: </strong> The User is currently using the level editor and wishes to add an enemy to the level

<strong> Actors: </strong> User and System

<strong> Triggers: </strong> User decides to add an enemy to the level

<strong> Preconditions: </strong>
<ul>
<li>User is currently using the level editor</li>
<li>User wants to add an enemy to the level</li>
</ul>

<strong> Postconditions </strong>
<ul>
<li>At least one enemy is added to the level</li>
</ul>

<strong> Normal Flow </strong>
<ol>
<li>System presents User with different types of entities to add to the play area (see CS4770/images/editor/EditorMain.png for reference)</li>
<li>User chooses to add enemies to the play area</li>
<li>System presents User with different types of enemy units</li>
<li>User picks the specific enemy unit that they wish to add to the play area</li>
<li>User brings their mouse over an empty tile on the play area</li>
<li>System shows User a preview of where the enemy unit will be placed</li>
<li>User clicks on the tile of the play area where they wish to add the enemy unit</li>
<li>The system shows the placed enemy unit on the play area</li>
</ol>

<strong> Alternative Flows </strong>
	5a. User bring the mouse over a filled tile on the play area
<ol><li>System shows User a red X to indicate that the enemy unit cannot be placed on that tile</li>
<li>Resume at step 5 of the normal flow</li></ol>
