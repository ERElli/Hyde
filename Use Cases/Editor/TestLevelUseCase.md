<strong> Title: </strong>
Test Level

<strong> Description: </strong>
The user is currently using the level editor, and wishes to test the level they have created by playing through it (either a specific part of the level or the whole thing)

<strong> Actors: </strong>
User

<strong> Triggers: </strong>
User decides that he/she wants to test the level they are currently editing.

<strong> Preconditions: </strong>

<ul>
<li>The user is currently editing a level.</li>
<li>This user wants to test the level.</li>
</ul>

<strong> Postconditions </strong>

<ul>
<li>The user has tested the desired section of the level.</li>
</ul>

<strong> Normal Flow </strong>

<ol>
<li>User moves the player sprite to the desired starting location for the test</li>
<li>User selects "Test Level"</li>
<li>System starts game on the level currently being edited (see separate use case for starting a game)</li>
<li>User plays level until satisfied (see separate use cases for playing game)</li>
<li>User selects "Stop Testing"</li>
<li>System returns to editing mode</li>
</ol>

<strong> Alternative Flows </strong>

&nbsp;&nbsp;1a. User has not yet added the player sprite/starting position to the level
  <ol>
    <li>User clicks "Add player"
    
  &nbsp;&nbsp;1a. User does not know how to add sprite
  <ol>
      <li>User selects "Help"</li>
      <li>System displays help menu</li>
      <li>User selects "Adding entities"</li>
      <li>System displays information on how to add various entities, including player sprite</li>
      <li>User closes help menu</li>
      <li>User adds sprite</li>
      <li>Resume at step 1 of main flow</li>
  </ol>
  </li>
    <li>System prompts user for desired location</li>
    <li>User selects desired location</li>
    <li>System ensures valid location selection, places sprite
  
  &nbsp;&nbsp;4a. System detects invalid location selection for sprite
  <ol>
      <li>System displays message that move is illegal</li>
      <li>User acknowledges error, chooses new desired location</li>
      <li>Resume at step 2 of main flow</li>
  </ol>
  </li>
 </ol>
 
