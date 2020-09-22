# MavEval

Full Stack App Eval

## Deploy

The easiset way to get the application up and running is using docker. The application is completely containerized

### Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### How to

- Clone this Repository (https://github.com/anti-mony/MavEval.git)[https://github.com/anti-mony/MavEval.git]
- cd into the directory
- Run docker-compose up

```shell
git clone https://github.com/anti-mony/MavEval.git
cd MavEval
docker-compose up
```

Once docker finalizes the installation, you can visit _http://localhost_ to interact with the ai using the GUI

## API

Supported Routes

- /api/{p/c}/recipies {GET, POST}

  GET: Returns all the available recipes

  POST: Add a new recipie

  e.g. Recipe

  ```json
  {
    "name": "Butter Cookies",
    "description": "Quick and easy way to bake delicious butter cookies",
    "type": "Non Vegetarian",
    "category": "Snack",
    "preptime": 20,
    "servings": 12,
    "calories": 125,
    "instructions": "Preheat oven to 150 degree celcius. Mix Batter. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna porttitor, aliquam lectus quis, vulputate elit. ",
    "ingredients": [
      {
        "name": "Butter",
        "quantity": 50,
        "unit": "grams"
      },
      {
        "name": "Mix",
        "quantity": 1,
        "unit": "Box"
      },
      {
        "name": "Egg",
        "quantity": 1,
        "unit": ""
      }
    ]
  }
  ```

- /api/{p/c}/recipies/id?servings=< integer > {GET}

  GET: Returns the selected recipie
  is servings parameter is not provided, the api returns default number of servings and ingredients required.

e.g.

```js
http://localhost/p/recipies
```

p indicates Python API, c indicates C#

## GUI

The gui provides a convinient way to interact with the api. The user can add and view recipes and also scale the ingredients as per the required number of servings.

---

License: MIT
