# Homework manager
A homework sharing platform for students and teachers
The project is a web application which hosts a database of homework tasks.
Task and students can be added and their data manipulated in various ways to assist with managing homework and vocabulary.

This web application was designed using Next.js and MongoDB to demonstrate profficiency in the MERN stack

- This app uses an API as middleware to protect user data.
- Json Web Token, used to provide a layer of security for users.

Next.js allows for both Front and Back end to be bundled as a single project.
This fullstack application has deployed to Vercel.

[Live project link](https://homework-app.vercel.app/)
---
## Table of contents
1. Description
2. Table of contents
3. Installation
4. Usage
5. Credits
---
## Installation
- Download or moe files to your local machine.
- Make sure you have node installed on your local machine.
- Navigate to the directory.
- Run npm init to install dependencies.
- Run npm run dev and open your browser on localhost 3000.
- Additionally see the live application hosted on vercel by clicking this link.
---
## Usage
- Initially you will be prompted with this home screen on which you can choose either teacher or student.![home screen](https://github.com/Luke-up/homework-app/blob/0da0b7cd44070628f2eb1ab09b2121bb8fd3fbe7/images/home.JPG)
- To set up a new school navigate to teacher and then to 'create new school'
- Enter your details on the form, take care to choose your school name and simple joining code.![create school screen](https://github.com/Luke-up/homework-app/blob/c1381791356b964ec84f382811412e50b387d32a/images/create%20school.JPG)
- To add students to your school direct users to click ' student ' from the home screen and ' create new user '
- Enter user details into the form, take care to enter the same school name and joining code as the school.![create user screen](https://github.com/Luke-up/homework-app/blob/c1381791356b964ec84f382811412e50b387d32a/images/StudCrea.JPG)
- Once student user is created it will be shown on the teacher dashboard.![create user screen](https://github.com/Luke-up/homework-app/blob/c1381791356b964ec84f382811412e50b387d32a/images/Tdash.JPG)
- Teachers can move students in their schools to different rooms, set tasks for students and mark their tasks once submitted.
- To add new rooms, click the create new room button at the bottom of the screen.
- To add students to the room, navigate to the students individual page by chlick their name on the teacher dashboard, then choosing from a light of room names available.![student page](https://github.com/Luke-up/homework-app/blob/c1381791356b964ec84f382811412e50b387d32a/images/indiStudn.JPG)
- To add tasks to the room, navigate to tasks by clicking the menu dropdown at the top right of the screen.
- Once on the tasks page you will be shown a list of students in the current room, to switch rooms, choose from the available rooms in the dropdown menu.![student list page](https://github.com/Luke-up/homework-app/blob/c1381791356b964ec84f382811412e50b387d32a/images/TaskStudList.JPG)
- To compile the task, click new task and fill in the form details, multiple words and questions can be added, finally click submmit at the bottom of the page and the task will be sent to every student in the room.![create task screen](https://github.com/Luke-up/homework-app/blob/c1381791356b964ec84f382811412e50b387d32a/images/TaskAdd.JPG)
- Students can access the task by logging in and clicking the name of the task on the assignments page, accessed via the menu in the top right, then clicking the attempt task button.[create task screen](https://github.com/Luke-up/homework-app/blob/c1381791356b964ec84f382811412e50b387d32a/images/StudAss.JPG)
- Questions will be shown one by one and once all questions are answered the task will be submitted to the teacher for marking.
- To access the tasks for marking, the teacher can navigate to the evaluations page, by clicking the menu button at the top right and choosing evaluations from the drop down.
- A list of all submitted tasks will be shown, to mark, click the task and choose an effort symbol from the list then click submit. ![Evaluations screen](https://github.com/Luke-up/homework-app/blob/c1381791356b964ec84f382811412e50b387d32a/images/Evals.JPG)
- Additional datapoints are displayed on each menu, such as the amount of words that the student has learnt and their latest reading.![Student dashboard](https://github.com/Luke-up/homework-app/blob/c1381791356b964ec84f382811412e50b387d32a/images/StudDash.JPG)![Student wordbank](https://github.com/Luke-up/homework-app/blob/c1381791356b964ec84f382811412e50b387d32a/images/StudWord.JPG)
---
## Miscellaneous
- Type 'npm test' in the terminal once inside the project directory to run snapshot tests and unit tests for the app.

- To change the Mongo DB database, make sure to get the URI MongoDB website.
- Open the project directory and select the env.local file.
- Replace both the URI and fill in your own username and password.
- The app will now connect to your database in MongoDB.
- Ensure the file structure within MongoDB has a collection named 'homework' containing 'student' and 'teacher'.
- To use a different file structure, make sure to update the API files located in /pages/api.
---
## Credits
All works and code are attributed the author Luke Paine in conjuction with the Hyperion Dev Web development course.
