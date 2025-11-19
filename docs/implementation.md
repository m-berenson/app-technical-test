# Implementation Documentation

## Overview

This document outlines the implementation process and architectural decisions for the technical challenge.

### Tech Stack

Beyond the initial project setup, I used the following tools and libraries:

- [Jest](https://jestjs.io/): For unit tests in general.
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/): For testing the UI components.
- [react-native-sse](https://github.com/binaryminds/react-native-sse): For the SSE connection.

### Approach and decisions

Below I outline a summary of the approach and decisions I made for the implementation of the project in the order I made the changes.

#### Project Structure

I started the project by defining the structure and scaffolding. Despite this project being small, I wanted to have a good structure and solid foundation so it's easy to extend and maintain.
The detailed project structure documentation and reasoning can be found in the [project-structure.md](./project-structure.md) file.

> Here I've used Cursor to generate the project structure and the files.

#### UI Components

I started the project by creating the UI components following the atomic design pattern. I've been working with this pattern for a while, creating components in a library to be reused, and I think it's a good approach to have extensible and testable components.

When creating the components, I tried to specify only the props that are needed for the component to work, and pass in a variant that knows how to render the component with the correct styles. In my experience, being very prescriptive with the props and the variants allows us to have a more consistent and predictable component behavior. However, at the same time it could be a bit painful if we need to make changes that affect a specific prop but not the entire variant.

#### Theme

I created the theme file to define the design tokens and the shared styling for the app. I think creating a theme file to define the design tokens and the shared styling for the app that reflects the design system is a good way to have a consistent styling across the different components. For components or global style changes, like colors, this allows us to make changes in one place and have it reflected in all the places where the component is used.

One thing that is missing but would be beneficial to implement is to have views to understand directly the theme tokens without having to map internally the tokens to the styles. This could be solved with libraries like [restyle](https://github.com/Shopify/restyle) or similar. I didn't want to add a dependency for this to avoid extra complexity.

> For UI components and theme, I created a plan using Cursor Plan mode. I iterated it a few times until I was happy with the result and then switched to Agent Mode and asked Cursor to generate the code based on the plan. After the first result, I made some changes to the components created to polish until I got the desired result.

#### Testing

After creating the basic set of components and the theme, I added tests for the atoms. For UI tests, I preferred to test in most scenarios with snapshot tests to easily catch regressions and changes in the UI.

> Cursor was very helpful generating a test suite for the components, then I had to manually update the tools used. For example, the press actions were using a different approach than the one suggested by React Native Testing Library.

#### Model and utils

At this point I already had a basic UI, so I decided to start modeling the different event types that the SSE would return and creating and parsing them to a type that would be easy to handle in the components. Here the challenge was to create types and type utils that let me handle the props correctly while trying to avoid type assertions.

Then, once I had the types defined, I created the utils to validate the events have the props that they should based on the documentation. Once I had those utils to validate the events, I created functions to build the messages and map them to the type I defined for the UI. In those functions, I took into account the existing messages as all the events were missing the context of the message they were part of, and I also added some validation to avoid errors when building the messages.

Finally, I've added unit tests for those utils functions.

#### Initial implementation with mocked data

With the previous setup I created a first version of the bubble components to have something to display. Then I created mocked data to test the components.

> I've generated the mocked data using Cursor.

#### State management

Once I had a result that I was happy with, I started to implement the state management for the chat. Here I preferred to use a React Context with a Reducer to manage the state of the chat. I preferred that over other state management libraries like Zustand, Redux, etc. because I think for this use case the state management was isolated to one screen and I didn't need to have that context over the entire app. Adding state management to the entire app would add complexity that I didn't need for this use case.

Currently, the provider is wrapping the chat screen only, but if we want to, we can make it accessible to the entire app by wrapping the app in the provider.

For the reducer actions, I created one action for each event type that the SSE would return and two more actions to manage the connection states and to reset the chat. In these actions, I called the utils functions to build the components and catch the errors. The builder functions were in charge of validating the events, and if an error occurred, I set the error state in the chat state.

#### SSE connection

Once I had the state management implemented, I started to implement the SSE connection. I used the [react-native-sse](https://github.com/binaryminds/react-native-sse) library to handle the SSE connection.

Following the project structure, I decided to create a custom hook to handle the SSE connection. This hook is responsible for starting and stopping the connection, handling the events and updating the state without having knowledge of any implementation in specific. It encapsulates the logic of the SSE connection and provides a simple API to start and stop the connection.

#### UI enhancements

After all the implementation was done, I started to enhance the UI with some tweaks and animations to make it more user friendly.

### Missing features

There are a few features that are missing and I didn't handle in this implementation:

- **Error handling**: Error handling is being implemented at validation and building message level. However, the UI is not handling the errors yet.
- **Missing events**: If there are missing events, due to connection reasons or some other reason, we check for text to have the right index but we immediately update the state of the chat to error state. This should be handled more gracefully and probably with better logic.
- **Connection issues**: The implementation is not handling connection issues yet like reconnection, timeout, or connection lost.
