<strong> Title: </strong> Add Boss

<strong> Description: </strong> The User is currently using the level editor and wishes to add a boss to the level

<strong> Actors: </strong> User and System

<strong> Triggers: </strong> User decides to add a boss to the level

<strong> Preconditions: </strong>
<ul>
<li>User is currently using the level editor.</li>
<li>User wants to add a boss to the level.</li>
</ul>

<strong> Postconditions </strong>
<ul>
<li>At least one boss unit is added to the level</li>
</ul>

<strong> Normal Flow </strong>
<ol>
<li>The system presents User with different types of entities to add to the play area
	![test](CS4770/images/editor/EditorMain.png)</li>
<li>User chooses to add obstacles to the play area</li>
<li>The system presents User with different types of boss units</li>
<li>User picks the specific boss unit that they wish to add to the play area</li>
<li>User brings their mouse over an empty tile on the play area</li>
<li>The system shows User a preview of where the boss unit will be placed</li>
<li>User clicks on the tile of the play area where they wish to add the boss unit</li>
<li>The system shows the placed boss unit on the play area</li>
</ol>

<strong> Alternative Flows </strong>
	5a. User bring their mouse over a filled tile on the play area
<ol>
<li>System shows User a red X to indicate that the boss unit cannot be placed on that tile</li>
<li>Resume at 5 of the regular flow</li></ol>
