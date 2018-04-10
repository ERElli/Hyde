<strong> Title: </strong>
Launch Level Editor

<strong> Description: </strong>
The user wants to launch the level editor. They will select "Launch Editor" from the main menu, and will be prompted for some 
basic information about the level they want to create (whether it will be a new level or a modification of an existing level, etc.),
before being taken to the level editor.

<strong> Actors: </strong>
User

<strong> Triggers: </strong>
User decides that he/she wants to use the level editor, selects this option from main menu.

<strong> Preconditions: </strong>

<ul>
<li>Level editor has been created and is available to users.</li>
<li>This user wants to use the level editor.</li>
</ul>

<strong> Postconditions </strong>

<ul>
<li>User has launched the level editor, is now able to create/modify level.</li>
</ul>

<strong> Normal Flow </strong>

<ol>
<li>User accesses the game's main menu (separate use case)</li>
<li>User selects "Level Editor" option</li>
<li>System prompts user to either create a new level, or edit an existing level</li>
<li>User selects "Create new level"</li>
<li>System launches level editor with blank level</li>
</ol>

<strong> Alternative Flows </strong>

4a. User selects "Load existing level"
<ol>
<li>System prompts user to select from either their own levels, or the default pre-programmed levels</li>
<li>User selects "My levels"

&nbsp;&nbsp;2a. User Selects "Examples"
  <ol>
      <li>System displays a list of default levels</li>
      <li>Resume at step 4 of current flow</li>
  </ol> 
  
&nbsp;&nbsp;2b. User Selects "Back"
  <ol>
      <li>Resume at step 3 of main flow</li>
  </ol>
</li>
<li>System displays a list of the user's created levels</li>
<li>User selects desired level to edit

&nbsp;&nbsp;4a. User Selects "Back"
  <ol>
      <li>Resume at step 1 of current flow</li>
  </ol> 
</li>
<li>System displays options for selected level (delete, rename, edit, etc.)</li>
<li>User selects "Edit"

&nbsp;&nbsp;6a. User selects "Back"
  <ol>
      <li>Resume at step 3 of current flow (or step 2.a.i. if 2.a. was taken to get to this point)</li>
  </ol> 
</li>
<li>System launches level editor with most recent version of selected level</li>
</ol>
