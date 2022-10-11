# RPN Calculator

> A CLI Reverse Polish Notation calculator built in node.js

### Usage

To use this application:

- Clone this repository to your local machine (only if you haven't cloned this before)
   ```sh
   git clone https://github.com/rippley777/rpn-calc
   ```

- Move to `rpn-calc` directory
-   ```sh
    cd rpn-calc
    ```

-   ```sh
    node index.js
    ```

### Description

This solution is a purely node.js application using the readline package to emit keypress events as well as move the input cursor when necessary

### Architecture

Since this is a simple application, all logic is contained within the index.js file

### Trade-offs

To reduce code complexity, the user is somewhat expected to enter in information correctly. Error handling can be improved.
