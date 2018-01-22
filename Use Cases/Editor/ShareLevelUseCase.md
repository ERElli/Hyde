<strong> Title: </strong>
Share Level

<strong> Description: </strong>
The user is currently using the level editor, and wishes to share/publish the level they have created.

Note: The user must complete the level they are sharing before they are able to share it. This will ensure that the level is beatable, 
even if it is only beatable by a very specific sequence of actions that the creator memorizes.

<strong> Actors: </strong>
User

<strong> Triggers: </strong>
User decides that he/she wants to share the level they are currently editing.

<strong> Preconditions: </strong>

<ul>
<li>The user is currently editing a level.</li>
<li>This user wants to share the level.</li>
</ul>

<strong> Postconditions </strong>

<ul>
<li>The user has shared/published the level, and has a way to view the published level (ie a level code)</li>
</ul>

<strong> Normal Flow </strong>

<ol>
<li>User selects "Share Level"</li>
<li>System ensures that the level includes necessary components (player starting point, level end, level name)</li>
<li>System starts game on the level currently being edited (see separate use case for starting a game)</li>
<li>User plays through the level (separate use case)</li>
<li>User completes the level</li>
<li>System generates new Level ID and adds level to game database</li>
<li>System makes level playable online for other users, accessed by its level ID</li>
<li>System displays success message to creator, including the new level ID, and a prompt to exit the editor.</li>
<li>User exits the editor</li>
</ol>

<strong> Alternative Flows </strong>

&nbsp;&nbsp;2a. Level does not include player starting point
  <ol>
    <li>User clicks "Add player"
    
  &nbsp;&nbsp;1a. User does not know how to add sprite
  <ol>
      <li>User selects "Help"</li>
      <li>System displays help menu</li>
      <li>User selects "Adding entities"</li>
      <li>System displays information on how to add various entities, including player sprite (Open entity menu, click desired entity, click desired position)</li>
      <li>User closes help menu</li>
      <li>Resume at step 1 of alternative flow 2a</li>
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
 
 &nbsp;&nbsp;2b. Level does not include ending point/finish line
  <ol>
  <li>Same as alternative flow 2a, but with ending point instead of starting point / sprite.</li>
  </ol>
 
 &nbsp;&nbsp;2c. Level has no name
  <ol>
    <li>User opens Settings
    
  &nbsp;&nbsp;1a. User does not know how to name the level
  <ol>
      <li>User selects "Help"</li>
      <li>System displays help menu</li>
      <li>User selects "Level Info"</li>
      <li>System displays a menu for help with various aspects of the level information</li>
      <li>User selects "Naming your level"</li>
      <li>System displays blurb on how to name the level (Open settings, click "Level Name" text box, type name, press Enter</li>
      <li>User closes help menu</li>
      <li>Resume at step 2 of alternative flow 2c.</li>
  </ol>
  </li>
    <li>System displays settings menu, which includes a prompt for level name</li>
    <li>User enters desired level name</li>
    <li>System updates level name</li>
 </ol>
