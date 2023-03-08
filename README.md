# STUDENT DATABASE APP

The code challenge aims to make it easy to search for any student's latest information and view their profiles along with the courses they're taking. 

## Priorities in this Challenge

1. Ensure fundamental usability of the intended outcome
2. Ensure completeness of the code
3. With limited time, features addressing user objective will be priority

The key user journey and expectation is to be able to easily find students, sort based on certain criter and easily search through the database. Afterwards, the user may intend to deep dive into the student's profile including their course enlistments, current status and fees.

## The Building Blocks

1. For CSS, the project uses SCSS/SASS for preprocessing.
2. For Frontend JS Library, the project uses React JS for user interfaces and component management.
3. For deployment, Vercel is used for live production.
4. For version control system, Git Hub is used for cloud git management.
5. For APIs, the API used are the challenge links and the Currency Exchange API (exchangerate-api.com)
6. For API fetching, Axios is used for fetching some API.
7. Most requested features are built with javascript from scratch without using external libraries, at most only resorting to pre-built react libraries.


## The Components and Features

The listed requirements for the technical projects are implemented as follow: 

Students Page Priorities
- [x] All student profile with the important data points are visible.
- [x] The total course count for each student is also taken from the Course API. 
- [x] The student status is also implemented using a javascript component. 
- [x] Sorting feature is implemented, enabling sorting against Name, Major and Status.
- [x] Fuzzy Search is also implemented, enabling searches across the database while allowing a certain leeway for spelling and flexible case sensitivity. 

Profile Page Priorities
- [x] The student profile with the important data points are visible.
- [x] All courses taken by the student are rendered. Duplicates are also removed.
- [x] The course fees are visible and summarized.
- [x] An exchange rate feature is also implemented. 


## To run in a local environment:

### In the project directory, you can run: `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

Please note that console may contain a lot of logs used in the development phase. 
