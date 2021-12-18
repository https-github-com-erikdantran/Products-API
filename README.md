# Project Catwalk Products API

A RESTful API for Project Catwalk, a shopping application.

## Installation

Install the API dependencies with npm

```bash
  cd api
  npm install
```

To start

```bash
  npm start
```

Study IO requires MySQL. To locally load mock data:

```bash
  Change the filepaths in schema.sql to where your locally stored .csv files are
  In your terminal, run psql -h localhost -f schema.sql
```

## API Reference

### TOPICS
#### Get all topics

```javascript
  GET /topics
```

Response:
```javascript
[
    {
        "id": 1,
        "name": "math",
        "url": "https://via.placeholder.com/200x200"
    },
    {
        "id": 2,
        "name": "science",
        "url": "https://via.placeholder.com/200x200"
    },
    ...
]
```
