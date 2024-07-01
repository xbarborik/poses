# Contents of directory

Latex - contains files for compiling thesis document

Paper - pdfs of marked photos done by instructors

UI - all files needed for running the app

Poster

TextPrace

Video

# UI URL

If viewed from chrome on provided link, it can also be installed locally as a PWA:
https://xbarborik.github.io/poses/

# UI directory

Contains all files required to run demonstrative UI.
Implemented using vite + reactjs

# Dependencies

Requires Node.js to be installed on the system.
All other dependencies can be install via "npm install"

# Setup

Move content of UI folder to any directory.

In terminal go to the directory and run command "npm install".

After it's done installing dependencies run command: "npm run dev"

Click on the link generated in terminal.

UI was tested on Chrome. There are some incompatibilities between canvas library that the project uses and Brave browser. Therefore I recommend using up-to-date version of chrome.

Dependencies are available in package.json

## Implementation

The UI is implemented as a Vite + React project.
With libraries like React Router, Redux, React Konva.
