<strong> Title: </strong>
Edit Level Background

<strong> Description: </strong>
The user is currently using the level editor, and wishes to change the background for a certain section of the level.

<strong> Actors: </strong>
User

<strong> Triggers: </strong>
User decides that he/she wants to change the level background.

<strong> Preconditions: </strong>

<ul>
<li>The user is currently editing a level.</li>
<li>This user wants to change the background for a part of the level.</li>
</ul>

<strong> Postconditions </strong>

<ul>
<li>The user has changed the background of the desired section of the level to the desired option.</li>
</ul>

<strong> Normal Flow </strong>

<ol>
<li>User selects "Change Background"</li>
<li>System displays list of available backgrounds (see EditorSelector.png for reference)</li>
<li>User selects desired background</li>
<li>System prompts user for the section of the level to which they want to apply the background</li>
<li>User selects desired section</li>
<li>System sets the background of the selected section to the selected background</li>
</ol>

<strong> Alternative Flows </strong>

5a. User selects "Return to backgrounds"
<ol>
<li>Resume at step 2 of main flow</li>
</ol>
