
# PROTAREAS

Protareas is a project and task management application designed to help users organize and collaborate on their projects efficiently. Similar to UpTask, Protareas provides an all-in-one platform where users can manage projects, tasks, and collaborate with team members.

## Key Features
### Project Management
Users can create projects with a name, description, and the name of the client for whom the project is being done.

### Task Creation and Management
 Within each project, users can create tasks with a name and description. Tasks can be managed with five possible statuses:

Pending: Initially assigned to new tasks.

On Hold: Tasks awaiting some action or condition.

In Progress: Tasks currently being worked on.

Under Review: Tasks that are being reviewed.

Completed: Tasks that have been finished.

Users can change the status of tasks at any time, with an automatic record of the date and the profile name of the user who made the change. Tasks can also be manually deleted.

### Project Collaboration
 Users can add collaborators to a project, provided they are registered on the platform. Collaborators can access the project and view associated tasks.

### Contact Form
 The application includes a contact page with a form that allows users to send messages and get in touch with support or administrators.

### User Profile Management
 In the profile section, users can update their name, email, and password.

### Account Registration and Recovery
 During the registration process, a token is sent to the user's email for account verification before activation. In case of forgotten passwords, a recovery token can be requested to reset the password.

## Technologies Used
Protareas is built using the following technologies and tools:

### Frontend
 React, TypeScript for user interface and interaction.
### Backend
 Node.js, Express for server logic and data management.
### Database
 MongoDB for data storage.
### Authentication and Security
 JSON Web Tokens (JWT) for session management and security.

## Deployment
```bash
# Clone the repository
git clone https://github.com/Nesus98/ProTareas.git
 #Navigate to the respective directory (frontend and backend)
cd frontend/ || cd backend//
 #Install dependecies in each directory with the same command
npm install
 #Start the development server on each terminal
 npm run dev
```

## Usage
After setting up both the frontend and backend, navigate to the frontend application in your browser. You can start creating projects, adding tasks, and managing your profile.

## Endpoints



```
  For Users
```

| URL                                      | Type     | Description     |
| :--------                                      | :------- | :-------------- |
| http://localhost:4000/api/auth/create-account  | POST     | create accout   |
| http://localhost:4000/api/auth/confirm-account | POST     | confirm account |
| http://localhost:4000/api/auth/login           | POST     | login           |
| http://localhost:4000/api/auth/request-code    | POST     | request code    |
| http://localhost:4000/api/auth/forgot-password | POST     | forgot-password |
| http://localhost:4000/api/auth/validate-token  | POST     | validate token  |
| http://localhost:4000/api/auth/profile         | PUT      | update profile  |
| http://localhost:4000/api/auth/update-password | POST     | update password |

```
  For Team Members
```

| URL                                                  | Type     | Description     |
| :--------                                                  | :------- | :-------------- |
| http://localhost:4000/api/projects/${projectId}/team/find  | GET      | find members by email|
|http://localhost:4000/api/projects/${projectId}/team        | POST     | add member by id |
|http://localhost:4000/api/projects/${projectId}/team/${userId}| DEL    | delete member by id |
|http://localhost:4000/api/projects/${projectId}/team        | GET      | get project members |


```
  For Projects
```

| URL                                       | Type     | Description     |
| :--------                                       | :------- | :-------------- |
| http://localhost:4000/api/projects              | GET      | get all project |
| http://localhost:4000/api/projects              | POST     | create project  |
| http://localhost:4000/api/projects/${projectId} | GET      | get project by id|
| http://localhost:4000/api/projects/${projectId} | PUT      | update project   |
| http://localhost:4000/api/projects/${projectId} | DEL      | delete project   |


```
  For Tasks
```

| URL                                                       | Type| Description         |
| :--------                                                       | :---| :------------       |
| http://localhost:4000/api/projects/${projectId}/tasks           | POST| create task         |
| http://localhost:4000/api/projects/${projectId}/tasks           | GET | get taskt           |
| http://localhost:4000/api/projects/${projectId}/tasks/${taskId} | GET | get task by id      |
| http://localhost:4000/api/projects/${projectId}/tasks/${taskId} | PUT | update task by id   |
| http://localhost:4000/api/projects/${projectId}/tasks/${taskId} | DEL | delete task         |
| http://localhost:4000/api/projects/${projectId}/tasks/${taskId} | POST| update task status  |




### Contribution
Contributions are welcome. To contribute:

- Fork the repository.
- Create a feature branch.
- Commit your changes and push them to your fork.
- Open a pull request.

## License
This project is licensed under the MIT License.

## Version
- Current Version: 1.0.0

## Author
- https://github.com/Nesus98

