# cybersafety_webapp
This is a web app that will demonstrate and assist in the analysis of cyber-requirements for large, complex equipment using the STAMP-based (System-Theoretic Accident Model and Processes) Cybersafety method.

The website can be accessed here https://stamp-webapp.web.app/

All the packages used for this web tool are listed in package.json

This web tool uses the Datta-Able Bootstrap Theme (found at 
https://github.com/codedthemes/datta-able-bootstrap-dashboard) for the sidebar and navigation bar

How to Use for CREDC:
1. Since this web tool relies on Firebase for a lot of its components. you will need to use the account created for testing, where the email is "mitsloancredccat@gmail.com" and the password is "credccat123".
2. Now install this project to your computer and open it in an IDE like WebStorm, where running the website will be a bit more user-friendly. There should also be a popup in the bottom right corner that will install all of the dependencies for you!
3. After that, you need to initialize Firebase in the terminal. Type "firebase login" in the terminal and follow the steps to log in with the aforementioned email and password. Just to be sure you are using the right project, use the command "firebase use cattestproject-f2693". Then type "firebase init" in the terminal and follow the steps to initialize the app. The important thing to note is that when initializing the app, hosting, database, and storage must be chosen, and that any yes/no questions can be answered with No. When the question asking about the public directory shows up, make sure to replace (public) with build.
4. With that, the web tool should now run when running the command "npm build" in the
terminal, and then "npm start", which will let you navigate the tool without making it publicly accessible.
5. All of the data has already been added to the firebase account, so you can log in and check out the database, authentication, and storage settings.
6. With that completed, you can use the example project that was created by logging in and clicking on the button to the right of "Your Projects". From there, you can explore the rest of the web tool without needing to enter your own test data!

If there are any questions with the setup, please email naseemhamed100@gmail.com
