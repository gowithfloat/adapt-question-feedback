adapt-question-feedback
=================
The **Question Feedback Component** provides a component for displaying feedback for a question. Instead of displaying feedback in an alert view, the feedback is displayed right on the page and conforms to the styling of all the other components.

The component will display the body text until the question is answered. Then the body text will be replaced with the feedback specified in the question. Additionally, if there is item-level feedback provided, that will also be displayed.

Consider using with the [Trickle](https://github.com/adaptlearning/adapt-contrib-trickle) extension to hide the feedback component until the question is answered.

Don't forget to disable [Tutor](https://github.com/adaptlearning/adapt-contrib-tutor) and the [Detailed Feedback](https://github.com/gowithfloat/adapt-detailed-feedback) extensions!

Settings
--------
### Attributes
**_component (string)**: This value must be: `question-feedback`.

> **displayTitle (string)**: The title to display above the feedback.

> **body (string, optional)**: A message to display before feedback is shown. When the question is answered, this text will be replaced with feedback for the question.

> **_classes (string)**: CSS class name to be applied to the button's containing div. The class must be predefined in one of the Less files. Separate multiple classes with a space.

> **_layout (string)**: This defines the horizontal position of the component in the block. Acceptable values are full, left or right.

> **_questionId (string, optional)**: Manually specify the ID of the question for which to show feedback. If empty, the component will try to find the question automatically by first looking in the same block, then looking for the immediately preceding question.

> **_hideSelectedItem (boolean, default=false)**: Enable to hide the labels for the selected items when showing the selection-specific feedback.

> **_hideDuplicateFeedback (boolean, default=false)**: Enable to hide feedback with duplicate text.

Limitations
-----------
No known limitations.

-----------
The **Question Feedback Component** is a plugin for the Adapt Framework. [Adapt](https://www.adaptlearning.org) is a free and easy to use e-learning authoring tool that creates fully responsive, multi-device, HTML5 e-learning content using the award-winning Adapt developer framework.
