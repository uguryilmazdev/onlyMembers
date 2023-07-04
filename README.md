# OnlyMembers

### DESCRIPTION
OnlyMembers is a simple, user-friendly, responsive session-based authentication demo application. 
After users create their accounts, they can leave messages on the message board. An unauthenticated person cannot see who posted the message and when it was posted. 

PS: Don't get excited, it has nothing to do with OnlyFans :)

### BUILT WITH
* Node.js
* Express.js
* passport.js
* bcrypt
* MongoDB Atlas
* Boostrap

### GETTING STARTED
1) Clone the repository.
2) Install dependencies ```npm install```
3) Create a .env file in the root directory.
4) Add following variables:
   ```MONGODBURI```
   ```SECRET```
   ```SESSION_COLLECTION_NAME```
5) Paste your MongoDB string ```"mongodb+srv://<user>:<password>@cluster0.xxxxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority"```
6) Choose secret key ```SECRET``` for session secret.
7) Choose a collection name for your sessions in database.
8) Start the server ```npm run devstart```
9) Access the application using ```http://localhost:3000```

### SCREENSHOTS
Main page for unauthenticated person
![main-unauth](https://github.com/uguryilmazdev/onlyMembers/assets/30204158/c7b2ba64-fe03-4400-8078-ff35037afb38)

Main page for authenticated person
![main-auth](https://github.com/uguryilmazdev/onlyMembers/assets/30204158/823c4cd1-bb88-403e-88f3-d620cd7d8408)

Eight messages are displayed on each page (You can change it if you want). You can use the pagebar to navigate.
![pagebar](https://github.com/uguryilmazdev/onlyMembers/assets/30204158/418cb39d-612f-451d-91e6-a2f7982c7274)

You can view your own messages by using the "Your Messages" button, and you can view other users' messages by clicking on their usernames below the messages.
![your-messages](https://github.com/uguryilmazdev/onlyMembers/assets/30204158/d7222442-a923-4063-a74e-266eb32b0e74)

You can write a message by using the "New Message" button.
![create](https://github.com/uguryilmazdev/onlyMembers/assets/30204158/2f23a28b-f30e-4ceb-b21b-c5aacc18f156)


