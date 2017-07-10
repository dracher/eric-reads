This is a project for udacity rect-developer NANO degree class

## Instruction

1. clone the repository
2. `npm install && npm start`


## Project Rubric

### Application Setup

- [x] The application was created with create-react-app and requires only npm install and npm start to get it installed and launched.
- [x] A README is included with the project. The README includes clear instructions for installing and launching the project.

### Main Page

- [x] The main page shows 3 shelves for books.
- [x] The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance.
- [x] When the browser is refreshed, the same information is displayed on the page.

### Search Page

- [x] The search page has a search input field. As the user types into the search field, books that match the query are displayed on the page.
- [x] Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.
- [x] When an item is categorized on the search page, and the user navigates to the main page, it appears on that shelf in the main page.

### Routing

- [x] The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search.
- [x] The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.

### Code Functionality

- [x] Component state is passed down from parent components to child components. The state variable is not modified directly - setState() function is used correctly. Books have the same state on both the search page and the main application page: If a book is on a bookshelf, that is reflected in both locations.
- [x] All JSX code is formatted properly and functional.
