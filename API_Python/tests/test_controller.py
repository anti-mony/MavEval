import pytest
from api.controller import Controller
from os import getcwd
import json
from unittest.mock import patch, MagicMock
from elasticsearch.helpers import scan
from elasticsearch.exceptions import NotFoundError


class MockDatabase:
    def index(self, body, index='recipies', **kwargs):

        if index is None:
            raise Exception('Es Error')

        if body is None:
            raise Exception('Es error')

        return {"success": "true"}

    def get(self, index, id):
        if index is None:
            raise Exception('Es Error')
        if id == 'NO':
            raise NotFoundError(404, 'ES error')
        return {
            "_source": {
                "key1": "A",
                "key2": "B",
                "servings": 6,
                "ingredients": [{
                    "name": "X",
                    "quantity": 10,
                    "unit": "l"
                }]
            },
            "_id": id
        }


@pytest.fixture
def db():
    schema = json.load(open(getcwd() + '/api/schema.json', 'r'))
    db = Controller(MockDatabase(), schema)
    return db


@pytest.fixture
def recipe():
    return {
        "name":
        "Butter Cookies",
        "description":
        "Quick and easy way to bake delicious butter cookies",
        "type":
        "Non Vegetarian",
        "category":
        "Snack",
        "preptime":
        20,
        "servings":
        12,
        "calories":
        125,
        "instructions":
        "Preheat oven to 150 degree celcius. Mix Batter. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna porttitor, aliquam lectus quis, vulputate elit. Fusce id vulputate sapien, a ultricies nulla. Sed leo justo, faucibus ac mi vel, scelerisque gravida neque. Mauris dignissim luctus enim a convallis. Etiam porttitor ex non lacus gravida, vitae pretium ipsum malesuada. In pellentesque, tellus porttitor imperdiet suscipit, magna arcu lacinia dolor, sit amet imperdiet felis eros tincidunt erat. Vestibulum egestas risus non ornare aliquet. Nullam lobortis cursus ultricies",
        "ingredients": [{
            "name": "Butter",
            "quantity": 50,
            "unit": "grams"
        }, {
            "name": "Mix",
            "quantity": 1,
            "unit": "Box"
        }, {
            "name": "Egg",
            "quantity": 1,
            "unit": ""
        }]
    }


# Everything correct
def test_add_passes(db, recipe):
    res = db.add(recipe, index='index')
    assert isinstance(res, dict)


def test_add_fails_none_index(db, recipe):
    res = db.add(recipe, index=None)
    assert res[1] == 500


def test_add_fails_incorrect_schema_object(db, recipe):
    recipe.pop('name', None)
    res = db.add({"key1": "A", "key2": "B"}, index='index')
    assert res[1] == 400


def test_get_passes_id(db):
    res = db.get(id='idhash1')
    assert res == {
        "key1": "A",
        "key2": "B",
        "id": "idhash1",
        "servings": 6,
        "ingredients": [{
            "name": "X",
            "quantity": 10,
            "unit": "l"
        }]
    }


def test_get_fails(db):
    res = db.get(id=None, index=None)
    assert res[1] == 500


def test_get_fails_id(db):
    res = db.get(id='idhash1', index=None)
    assert res[1] == 500


def test_get_fails_id_notexist(db):
    res = db.get(id="NO")
    assert res[1] == 404


def test_get_fails_id_servings(db):
    res = db.get(id="idhash1", servings=6)
    assert res == {
        "id": "idhash1",
        "key1": "A",
        "key2": "B",
        "servings": 6,
        "ingredients": [{
            "name": "X",
            "quantity": 10.0,
            "unit": "l"
        }]
    }


def test_get_fails_id_servings_scaleup(db):
    res = db.get(id="idhash1", servings=12)
    assert res == {
        "id": "idhash1",
        "key1": "A",
        "key2": "B",
        "servings": 12,
        "ingredients": [{
            "name": "X",
            "quantity": 20.0,
            "unit": "l"
        }]
    }


def test_get_fails_id_servings_scaledown(db):
    res = db.get(id="idhash1", servings=3)
    assert res == {
        "id": "idhash1",
        "key1": "A",
        "key2": "B",
        "servings": 3,
        "ingredients": [{
            "name": "X",
            "quantity": 5.0,
            "unit": "l"
        }]
    }