Title: Transforming

Description: The user wants to transform the character from the current character form to another.
![](https://github.com/markwindsorr/CS4770/blob/master/DesignDocuments/Mechanics/Transformation.jpg)
Actors: User

Triggers: User enters the transformation input.

Preconditions: User must be in a level. Character must be alive.

Postconditions: Character is now transformed into the other form.

Normal Flow:

    1.User inputs the transformation button.
    2.Interface transformation animation triggers.
    3.Character form state is toggled.
    4.Characters current attributes are changed to new forms attributes.
    5.Character is now transformed.

Alternative Flows:<br> 
&nbsp;&nbsp;&nbsp;&nbsp;2a. User inputs the transformation button while animation is in progress.<br> 
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Transformation will not occur while transformation animation is being displayed.
