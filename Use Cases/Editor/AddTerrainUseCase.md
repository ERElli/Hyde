<strong> Title: </strong> Add Terrain

<strong> Description: </strong> The User is currently using the level editor and wishes to add a terrain block to the level.

<strong> Actors: </strong> User and System

<strong> Triggers: </strong> User decides to add terrain tiles to the level

<strong> Preconditions: </strong>

<ul>
<li>User is currently using the level editor.</li>
<li>User wants to add terrain blocks to the level.</li>
</ul>

<strong> Postconditions </strong>

<ul>
<li>At least one terrain block is added to the level</li>
</ul>

<strong> Normal Flow </strong>

<ol>
<li> System presents User with different types of entities to add to the play area (see CS4770/images/editor/EditorMain.png for reference)</li>
<li>User chooses to add terrain blocks to the play area</li>
<li>System presents User with different options for terrain blocks</li>
<li>User picks the specific terrain block that they wish to add to the play area</li>
<li>User brings their mouse over an empty tile on the</li>
<li>System shows User a preview of where the terrain block will be placed</li>
<li>User clicks on the tile of the play area where they wish to add the terrain block</li>
<li>System shows the placed block on the play area</li>
</ol>

<strong> Alternative Flows </strong>
5a. User brings the mouse over a filled tile on the on the level 
<ol>
<li>System shows User a red X to indicate that the terrain block cannot be placed there</li>
<li>Resume at step 5 of the normal flow</li>
</ol>

7a. User left clicks on a tile and drags the terrain block to add it to each of the tiles they move the mouse over
<ol><li>User releases the left mouse button to stop placing terrain blocks</li>
<li>Resume at step 8 of the normal flow</li></ol> 

