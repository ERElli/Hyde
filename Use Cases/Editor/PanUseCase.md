<strong> Title: </strong>
Pan (move screen)

<strong> Description: </strong>
The user is currently using the level editor, and wishes to view a different part of the level (i.e. "move the camera")

<strong> Actors: </strong>
User

<strong> Triggers: </strong>
User decides that he/she wants to move the camera.

<strong> Preconditions: </strong>

<ul>
<li>The user is currently editing a level.</li>
<li>This user wants to view a different part of the level.</li>
</ul>

<strong> Postconditions </strong>

<ul>
<li>The user has moved the camera to the desired spot.</li>
</ul>

<strong> Normal Flow </strong>

<ol>
<li>User selects "Pan" option</li>
<li>User clicks and drags in the desired direction</li>
<li>System moves camera as appropriate (opposite direction of mouse)</li>
<li>User reaches desired position, stops moving</li>
</ol>

<strong> Alternative Flows </strong>

&nbsp;&nbsp;1a. User uses keyboard to pan
  <ol>
    <li>User clicks arrow key for desired direction</li>
    <li>System moves camera as appropriate (right for right-arrow, etc.)</li>
    <li>Resume at step 4 of main flow</li>
  </ol>
  
&nbsp;&nbsp;1b. User does not know how to pan
  <ol>
    <li>User selects "Help"</li>
    <li>System displays help menu</li>
    <li>User selects "Camera Movement"</li>
    <li>System displays 2 graphics, 1 for each way to move the camera (mouse and keyboard)</li>
    <li>User closes help menu</li>
    <li>Resume at step 1 of main flow</li>
  </ol>
