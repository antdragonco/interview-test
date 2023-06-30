# React Native Test Instructions

This test is designed to assess your understanding of TypeScript, React, the React Native ecosystem, as well as your proficiency in Git and GitHub. Please carefully follow the instructions below.

## Prerequisites

Before starting the test, make sure you have the following software installed on your machine:

1. Node.js > 16.x and PNPM > 8.x (Package Manager)
2. Git
3. Android Studio (for Android development)
4. Xcode (for iOS development)

## Task Overview

Your task is to create a React Native application that implements a CRUD application with multi-screen navigation flow. This application will serve as an assessment of your skills in React, React Native, TypeScript, design implementation, as well as your familiarity with Git and GitHub.

## Instructions

To complete the test, please follow these steps:

1. Fork this repository to create your own copy.

2. Create a new React Native project using the React Native CLI. Open your terminal or command prompt and execute the following command:

   ```
   npx react-native init NavigationApp
   ```

3. Navigate into the project directory:

   ```
   cd NavigationApp
   ```

4. Implement the following features in your React Native application:

   - Set up a navigation system using React Navigation.
   - Create four screens: HomeScreen, ExploreScreen, NotificationsScreen, and ProfileScreen.
   - Implement a footer tab navigation bar to navigate between the screens.
   - Each screen should display a unique and visually appealing design.
   - Add functionality to each screen based on their purpose:
     - HomeScreen: Display a list of items. Include options to add new items, mark items as complete, and delete items.
     - ExploreScreen: Display a grid or list of images. Add a search functionality to filter the images based on keywords.
     - NotificationsScreen: Display a list of notifications. Include options to mark notifications as read or delete them.
     - ProfileScreen: Display user profile information and allow users to edit their profile details.

   Implement the functionality in a way that showcases your understanding of React Native concepts and design principles.

5. Commit your changes with meaningful commit messages.

6. Push your changes to your forked repository.

7. Once your application is complete and committed, go to the original repository and create a pull request (PR) from your forked repository's branch to the main branch of the original repository. Please provide a concise description of the changes you made in the PR.

8. Congratulations! You have completed the test. Please wait for further communication from us regarding the evaluation of your submission.

## Mock Server

This application utilizes a mock server to simulate a RESTful API for data. The mock server is implemented using JSON Server, which provides a simple way to set up a mock API using a JSON file as a data source.

To run the mock server locally, follow these steps:

1. Install the necessary dependencies by running the following command:

   ```
   cd mock-server && pnpm install && cd ..
   ```

2. To start the mock server, run the following command:

   ```
   cd mock-server && pnpm run server
   ```

   The mock server will be accessible at `http://localhost:3000` and provides endpoints based on the structure of the `db.json` file.

   For example, if you have an `items` array in your `db.json` file, you can access it via the endpoint `http://localhost:3000/items`.

   JSON Server automatically generates endpoints for the CRUD operations (GET, POST, PUT, DELETE) based on the data structure in `db.json`.

## Evaluation Criteria

Your test submission will be evaluated based on the following criteria:

- Correct implementation of the multi-screen navigation flow using footer tabs.
- Proper usage of React and React Native components and concepts.
- Implementation of TypeScript typings.
- Thoughtful and visually appealing design implementation.
- Functionality and interactivity of each screen.
- Thoughtful and maintainable code organization and structure.
- Effective use of Git, including proper branching, committing, and creating a pull request.

Good luck with the test! If you have any questions, feel free to ask.
