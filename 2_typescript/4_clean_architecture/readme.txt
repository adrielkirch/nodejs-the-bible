Welcome to the Node.js Clean Architecture Task Manager project challenge!

In this challenge, you will embark on building a robust task management application using clean architecture principles. 
Your goal is to implement features for user authentication, task management, and comments associated with tasks. 
Each task should have a remind scheduler using I/O concepts in others
To ensure a clean and scalable codebase, you will apply test-driven development (TDD) methodology alongside, unsure to mock database functions

Folder Structure:

The project structure will be organized into three main layers:

    Application Layer:
        This layer will house the use cases or application-specific business logic.
        It acts as an intermediary between the domain layer and the infrastructure layer, orchestrating the flow of data and operations.

    Domain Layer:
        This layer represents the core business logic and entities of the application.
        It defines the data structures and rules governing the application's behavior.
        Entities such as User, Task, and Comment will reside in this layer.

    Infrastructure Layer:
        The infrastructure layer manages external concerns such as databases, external APIs, and frameworks.
        It provides implementations for interfaces defined in the application layer.
        This layer handles data persistence, authentication mechanisms, and other external interactions.

Features:

    User Authentication:
        Users can securely sign up, sign in, and sign out.
        Passwords will be securely hashed and stored in the database.
        Implement token-based authentication for secure access to protected routes.

    Task Management:
        Users can perform CRUD operations on tasks (Create, Read, Update, Delete).
        Tasks will include properties like title, description, status, deadline, etc.
        Allow tasks to be assigned to specific users.

    Comments Associated with Tasks:
        Users can add comments to tasks.
        Comments will include properties like content, timestamp, and author.
        Comments will be associated with specific tasks.

Implementation Guidelines:

    Utilize TypeScript for type safety and a better development experience.
    Implement dependency injection to decouple components and facilitate testing.
    Implement validation and error handling mechanisms for robustness.
    Follow RESTful API design principles for defining endpoints.
    Write comprehensive unit and integration tests to ensure functionality and reliability.
    