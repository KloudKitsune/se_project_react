# Weather Wardrobe App

This project is a React app that lets users check the weather and manage a wardrobe based on the current conditions. You can add clothing items, view them by weather type, and switch between Fahrenheit and Celsius for the temperature display.

This project was built as part of Sprint 11 in the TripleTen Software Engineering course.

---

## Features Implemented in Sprint 11

### Temperature Unit Toggle

- Users can switch between Fahrenheit (F) and Celsius (C).
- The toggle uses a custom `ToggleSwitch` component and is controlled via React Context.
- Temperature data from OpenWeatherMap is converted to both F and C so the display updates dynamically.

### Profile Page

- A hardcoded profile page shows all clothing items in the app state.
- Includes a sidebar with the username and avatar.
- Uses React Router for navigation:
  - `/` for the main page
  - `/profile` for the profile page
- Header logo links to `/` and profile info links to `/profile`.

### Add Item Modal

- Users can add new clothing items with:
  - Name
  - Image URL
  - Weather type (hot/warm/cold)
- Form is controlled using a custom `useForm` hook.
- Submission updates the app state immediately so the new item appears at the top of the list.

### Delete Item Functionality

- Users can delete clothing items from the ItemModal.
- After deletion, the app state is updated and the modal closes.

---

## Tech Stack

- React (hooks, context)
- React Router v6
- Context API
- CSS modules
- OpenWeatherMap API

---

## How to Run

1. Clone the repo:

```bash
git clone <your-repo-url>
cd project-folder
```

## Install Dependicies

npm install

## Add your OpenWeatherMap API key in a .env file:

REACT_APP_WEATHER_API_KEY=yourKeyHere

## Start the app

npm start

## Video Overview

Here is a link to the video overview of the project.
https://drive.google.com/file/d/1VeELrabrND1OigCX4vy3-FEObiZXH5n2/view?usp=drive_link
