README.md

Detailed instructions for creating an Alexa app. This uses example code supplied by Amazon. I uploaded all the javascript / json / plain-text here, but you should not need to use this. You won't need to write any code but you will need to cut and paste json and plain text from various AWS tutorial screens. There are a number of good YouTube tutorials that explain how Alexa works so I don't go into that here. I just tell you what to do, not why. This is best used along with some of these tutorials. One that I found helpful was "Coding the Amazon Echo (Alexa) - How to create custom Alexa skills from scratch with AWS Lambda" from Jordan Leigh at https://www.youtube.com/watch?v=zt9WdE5kR6g

This was accurate as of 10 Dec 2016. Amazon frequently updates things so things like names of screens will change over time. If there are changes that break things, look at step 29 where I give you a url but tell you where it comes from. This may need updating. Or you can use the files I uploaded here.

If things don't work or are confusing, comment on github and I will try to update and improve.

There are two main phases here. First, I setup a Lambda function to service my app.
1. Setup an aws developer account if you don't have one
2. Go to console.aws.amazon.com/lamda
3. Use button "Create a Lambda function"
4. The takes you to a 'Select blueprint' screen. In filter box put 'Alexa'
5. Select 'alexa-skills-kit-color-expert'
6. This pops up the 'Configure triggers' screen where the 'Alexa Skills Kit' has been added for you
7. Hit Next
8. This takes you to the 'Configure function' screen.
9. Put a name in the 'Name' box. I chose myColors.
10. The 'Description' and 'Runtime' are filled in for you.
11. Scroll down to the 'Lambda function code' area. 'Code entry type' has been set to 'Edit code inline'and the Lambda function code has been pasted in for you. If you were using an example that you got from somewhere else, you could change this to 'Upload a .ZIP file'. But for this example, leave as it is.
12. Scroll down, skipping the 'Enable encryption helpers' and 'Environment variables'.
13. At 'Lambda function handler and role' the 'Handler' has been filled in.
14. For 'Role' select 'Choose an existing role'. 
15. Hit the 'Existing role' drop-down and choose 'lambda_basic_execution'.
16. Scroll to the bottom, hit Next.
17. On the Review screen, scroll to the bottom and hit 'Create function'.
18. On a new screen you will see 'Congratulations! Your Lambda function "myColors" has been successfully created and configured with Alexa Skills Kit as a trigger. You can now click on the "Test" button to input a test event and test your function.'
19. In the top right is the 'ARN' (ARN is 'Amazon Resource Number'). For me it is
	arn:aws:lambda:us-east-1:484461731990:function:myColors
	Leave this screen up. You will need to return here and get the ARN in a few minutes.
20. There will be 4 tabs. The third, 'Triggers' should be selected. If not, select it.
21. The text will have a link to go to the 'Alexa Developer' portal. Open that in a new window (so you can come back here and get the ARN later).
22. This brings up a screen where you select 'Get Started' under the 'Alexa Skills Kit'
23. You should now be on a screen titled 'Building Alexa Skills with the Alexa Skills Kit'. Hit the gold button at the top right, 'Add a New Skill'.
24. On the 'Create a New Alexa Skill' you will be taken through a set of sub-screens listed on the left. The first (which should be the only one in a gold font) is 'Skill Information'.
25. In the 'Name' box put myColors (or some name of your choosing).
26. For 'Invocation Name' I chose 'my colors'. This will be the phrase used to start the app. You will say "Alexa my colors" when testing / using this app.
27. Hit Next.
28. This takes you to the 'Interaction Model' sub-screen where you will paste in json and plain text for the Intent Schema, Custom Slots and the Sample Utterances.
29. To get these, open another window and go to http://amzn.to/1LzFrj6 (This url was in the comments of the code that was pasted in the Lambda function code in step 11 above).
30. You are now at 'Creating an AWS Lambda Function for a Custom Skill'. Scroll to (near) the bottom where you see 'Sample Interaction Model for the Color Expert Blueprint'.
31. Cut the 'Intent Schema' json text from the window. Go back to the 'Interaction Model' window and paste this into the 'Intent Schema' box.
32. Hit the 'Add Slot Type' button. New boxes appear. In 'Enter Type' add 'LIST_OF_COLORS'. Go back to the 'Creating an AWS Lambda Function for a Custom Skill' from step 30 and cut the list of colors text. Return to the prior window and paste this in to the 'Enter Values' box. Press 'Save' under this box. These boxes will close.
33. Go back to the 'Creating an AWS Lambda Function for a Custom Skill' screen. Grab the 'Sample Utterances' text, return to the 'Interaction Model' screen and paste into the 'Sample Utterances' box. Press 'Save' under this box. After a bit, it should respond with 'Successfully updated the interaction model'. Hit 'Next'.
34. You are now on the Configuration screen. For 'Service Endpoint Type' hit the 'AWS Lambda ARN (Amazon Resource Number)' button.
35. Checkboxes should appear to select the region. I chose 'North America'. A new box appears labeled 'North America'. This is where you paste the ARN from step 19. Go back to the 'Lambda Management' window and get the ARN from the top right, return to the 'Configuration' sub-screen and paste this in. Hit Next.
36. Now you are on the 'Test' sub-screen and ready to test! Say "Alexa my colors" and your Echo or Dot should respond. You can also use the 'Service Simulator' at the bottom of the screen to type in any of the 'Sample Utterances'. Hit the 'Ask myColors' button and you will see the json request and response. Hit the 'Listen' button under the 'Lambda Response' box. Try the different utterances and have fun!

38. You can add new 'Sample Utterances' at the 'Interaction Model' sub-screen, but only for existing Intents.
39. Adding new Intents is more involved. What I did (not in this tutorial) is to add one called 'WhatsMyNameIntent'. This required updates in the 'Intent Schema' and 'Sample Utterances' boxes on the 'Interaction Model' sub-screen and updates in the javascript code on the 'Code' tab of the 'Lambda Management Console' screen, where I created new versions of these functions:
createFavoriteColorAttributes
setColorInSession
and added a new elseif condition in the onIntent function. Since I reused the colors functions, you can only choose a color for your name. With a bit more work, you can add a new 'Custom Slot Type' and put in a LIST_OF_NAMES. Remember to change the javascript functions to use that.
The next step would be to add yet another Intent to enable you to ask Alexa what your name is.


