### 2018-08-16

- **feat**:
  - add sentry to track errors.

### 2018-08-15

- **feat**:
  -  Add timestamp to validate login time.

- **fix**:
  - not logged in return 200 (now return 403).

- **improve**:
  - camelize keys of json data from server

### 2018-08-13

- **improve**:
  - Move login and register to Modals in HomeComponent.

### 2018-08-12

- **feat**:
  - add prettier,
  - add Footer,
  - add button for adding data.
- **fix**:
  - bootstrap style override custom style,
  - `npm run build` won't process postcss.
- **improve**:
  - use fa icons for editing/remove data.

### 2018-08-11

- **feat**:
  - add support for nested style,
  - use react-bootstrap components,
  - add Map to homepage.
- **fix**:
  - MatchCard details [(#24)](https://github.com/JoySR/koshien100/pull/24),
  - first side score of not started games.
- **improve**:
  - update favicon.ico.

### 2018-08-10

- **fix**:
  - MatchCard [(#23)](https://github.com/JoySR/koshien100/pull/23).

### 2018-08-09

- **feat**:
  - register new users.
- **fix**:
  - password input.

### 2018-08-08

- **feat**:
  - show games in SchoolCard.
- **fix**:
  - login error.
- **improve**:
  - extract date from gameId,
  - add home link to dashboard.

### 2018-08-07

- **feat**:
  - video id.
- **fix**:
  - `school` data cannot get `prefecture_id` correctly; `prefecture` data cannot get `area_id` correctly.
  - score like '1X' cannot be computed or rendered.
  - home team and visit team order.

### 2018-08-06

- **feat**:
  - game cards in homepage.

### 2018-08-03

- **feat**:
  - CRUD:
    - game,
    - user.

### 2018-08-02

- **feat**:
  - CRUD:
    - prefecture,
    - date,
    - school.

### 2018-08-01

- **feat**:
  - Server side.
  - CRUD - area.

### 2018-07-24

- Move client files into `client` folder, Add `server` folder.

### 2018-07-20

- Extract project to a single repo.

### 2018-07-10

- Init project with React & co.

### 2018-05-14

- Create 100 directory for Summer Koshien 100.
