<strong> Title: </strong>
Set Level Music

<strong> Description: </strong>
The user is currently using the level editor, and wishes to change the music for a certain section of the level.

<strong> Actors: </strong>
User

<strong> Triggers: </strong>
User decides that he/she wants to change the level music.

<strong> Preconditions: </strong>

<ul>
<li>The user is currently editing a level.</li>
<li>This user wants to change the music for a part of the level.</li>
</ul>

<strong> Postconditions </strong>

<ul>
<li>The user has changed the music of the desired section of the level to the desired option.</li>
</ul>

<strong> Normal Flow </strong>

<ol>
<li>User selects "Change Music" (see EditorMain.png for reference)</li>
<li>System displays list of available tracks</li>
<li>User selects desired track</li>
<li>System plays track (as a sample) and prompts user for the section of the level to which they want to apply the music</li>
<li>User selects desired section</li>
<li>System sets the music of the selected section to the selected track</li>
</ol>

<strong> Alternative Flows </strong>

5a. User selects "Return to tracks"
<ol>
<li>Resume at step 2 of main flow</li>
</ol>
