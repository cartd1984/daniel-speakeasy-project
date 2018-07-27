My project is a drink library which allow you to use CRUD operations to add, edit, and delete drinks. Each drink will have the following properties: name, description, rate, and comments. 

My personal database information has been provided. For access, type the following in the terminal from the root:

$ nodemon src/server.js

My project is listening on port 3050, which should appear in the console when you type nodemon src/server.js from the root.

Once you have access, type the following in the url

http://localhost:3050

This should retrieve all of the files contained in the database, and a blank form on the bottom of the page.

To add some styling, I have included some CSS, which is included in my public folder, this is to make the font work with the "speakeasy" theme.

To add a file, type in the name of the drink, its description, a rate (from a 1 to 5 scale, 1 being bad, 5 being excellent), and some comments about the drink. Click the submit button on the bottom, and it should appear on the list. 

To edit a file, you will click the edit button on the right side of the drink you with to edit. The form will populate the information from that particular drink. Make edits as appropriate and hit submit. The file should change.

To delete a file, click the delete button on the right of the drink you want to delete. A prompt will pop up and ask if you are sure you want to delete the file. Click yes. The file should be deleted from the webpage, and marked as "deleted" in the database.
