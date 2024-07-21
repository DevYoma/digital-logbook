# Building a Digital IT Logbook with React, TypeScript, and Strapi (In 3 Parts)
**What is a Digital IT Logbook and Who Uses It?**

A web application for Students on their Industrial Training(IT) semester to track their daily work experiences by logging it so as to have a centralized point of data.  
Users: Students / professionals enrolled in training programs.

This guide provides a structured approach to developing a Digital IT Logbook application using React, TypeScript, and Strapi. Here’s a breakdown of the development process:

## Part 1: Setting Up The React TypeScript Frontend

### 1. Installing and Configuring the React TypeScript Frontend App with Vite:
- **Use Vite**: Vite is ideal for modern front-end projects due to its fast build times and flexible configuration.


### 2. Initial Project Setup and Structure of the Digital Logbook App:
- **Project Folder Overview**:
  - Organize your folders to enhance maintainability:
    - `src/components`: For reusable UI components.
    - `src/pages`: For different page-level components (like Login, profile).
    - `src/services`: For API calls and business logic.
    - `src/interfaces`: For TypeScript interfaces and types.
    - `src/utils`: For utility functions.

### 3. Set Up Strapi CMS Project:
- **Install and Configure Strapi**:
  - Set up the content types you’ll need (e.g., User, Log).
  - Configure authentication and permissions in Strapi to secure your API.
  - Testing Authentication API with Postman
  - Use Strapi’s admin interface to define the data model for your logbook entries and user profiles.

## PART 2: Designing the User Interface(UI) in React

### 1. Create Pages and Components for User Authentication and CRUD Operations:
- **Authentication UI Pages**:
  - Implement login and signup forms
  - Create routes and pages for authentication flows.
- **CRUD Operations UI Pages and Component UI**:
  - Build pages for creating, viewing, updating, and deleting log entries.
  - Use React's component-based architecture to keep your UI modular and maintainable.

### 2. Implement Responsive Design and Add Navigation for Seamless User Experience:
- **Responsive Design**:
  - Use SCSS to ensure your app is responsive.

- **Navigation**:
  - Implement a navigation bar and possibly a sidebar for easier access to different parts of the app.
  - Use `react-router-dom` for client-side routing to handle page transitions smoothly.

### 3. Implement State Management:
- **Choose a State Management Solution**:
  - Depending on your app’s complexity, you might use Context API
  - Manage global state (like user authentication status) and local state (like form inputs).
  - Ensure state changes trigger appropriate re-renders and data updates.

## PART 3: Implement Features

### 1. User Management: Login, Sign Up, Profile Updates:
- **Authentication**:
  - Use Strapi’s built-in authentication mechanisms to handle user login and registration.
  - Store JWT tokens securely (e.g., in `localStorage` or cookies) and manage token expiration and renewal.
- **Profile Management**:
  - Fetch and display user profile data securely from Strapi.
  - Allow users to update their profiles (IT duration and start date included)

### 2. CRUD Operations for Logs:
- **Creating Logs**:
  - Implement a form for users to log their daily activities.
  - Validate input to ensure it aligns with your app’s rules (e.g., no logs on weekends, Cannot enter more than one log today).
- **Reading Logs**:
  - Fetch and display a list of logs associated with the logged-in user.
  - Provide a detailed view for each log entry.
- **Updating and Deleting Logs**:
  - Allow users to edit and delete their log entries.
  - Ensure these operations update the state and Strapi database accordingly.

---
