import pytest
import requests
import json
from os import getcwd

url_prefix = 'http://localhost/api/p/recipies'


@pytest.fixture
def recipe():
    return json.load(open(getcwd() + '/tests/recipie.json', 'r'))


def test_get_all():
    res = requests.get(url_prefix)
    assert res.status_code == 200


def test_get_all_length_object():
    res = requests.get(url_prefix)

    assert len(res.json()) == 1


def test_get_all_object():
    res = requests.get(url_prefix)

    assert res.json() == [{
        "calories":
        125,
        "category":
        "Snack",
        "description":
        "Quick and easy way to bake delicious butter cookies",
        "id":
        "uNX3snQBzSM7nE45qq1m",
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
        }],
        "instructions":
        "Preheat oven to 150 degree celcius. Mix Batter. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna porttitor, aliquam lectus quis, vulputate elit. Fusce id vulputate sapien, a ultricies nulla. Sed leo justo, faucibus ac mi vel, scelerisque gravida neque. Mauris dignissim luctus enim a convallis. Etiam porttitor ex non lacus gravida, vitae pretium ipsum malesuada. In pellentesque, tellus porttitor imperdiet suscipit, magna arcu lacinia dolor, sit amet imperdiet felis eros tincidunt erat. Vestibulum egestas risus non ornare aliquet. Nullam lobortis cursus ultricies",
        "name":
        "Butter Cookies",
        "preptime":
        20,
        "servings":
        12,
        "type":
        "Non Vegetarian"
    }]


def test_get_one():
    res = requests.get(url_prefix + '/uNX3snQBzSM7nE45qq1m')
    assert res.status_code == 200


def test_get_one_object():
    res = requests.get(url_prefix + '/uNX3snQBzSM7nE45qq1m')
    assert res.json() == {
        "calories":
        125,
        "category":
        "Snack",
        "description":
        "Quick and easy way to bake delicious butter cookies",
        "id":
        "uNX3snQBzSM7nE45qq1m",
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
        }],
        "instructions":
        "Preheat oven to 150 degree celcius. Mix Batter. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna porttitor, aliquam lectus quis, vulputate elit. Fusce id vulputate sapien, a ultricies nulla. Sed leo justo, faucibus ac mi vel, scelerisque gravida neque. Mauris dignissim luctus enim a convallis. Etiam porttitor ex non lacus gravida, vitae pretium ipsum malesuada. In pellentesque, tellus porttitor imperdiet suscipit, magna arcu lacinia dolor, sit amet imperdiet felis eros tincidunt erat. Vestibulum egestas risus non ornare aliquet. Nullam lobortis cursus ultricies",
        "name":
        "Butter Cookies",
        "preptime":
        20,
        "servings":
        12,
        "type":
        "Non Vegetarian"
    }


def test_get_one_servings():
    servings = 12
    res = requests.get(url_prefix +
                       '/uNX3snQBzSM7nE45qq1m?servings={}'.format(servings))
    assert res.status_code == 200


def test_get_one_servings_object():
    servings = 24
    res = requests.get(url_prefix +
                       '/uNX3snQBzSM7nE45qq1m?servings={}'.format(servings))
    assert res.json() == {
        "calories":
        125,
        "category":
        "Snack",
        "description":
        "Quick and easy way to bake delicious butter cookies",
        "id":
        "uNX3snQBzSM7nE45qq1m",
        "ingredients": [{
            "name": "Butter",
            "quantity": 100.0,
            "unit": "grams"
        }, {
            "name": "Mix",
            "quantity": 2.0,
            "unit": "Box"
        }, {
            "name": "Egg",
            "quantity": 2.0,
            "unit": ""
        }],
        "instructions":
        "Preheat oven to 150 degree celcius. Mix Batter. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna porttitor, aliquam lectus quis, vulputate elit. Fusce id vulputate sapien, a ultricies nulla. Sed leo justo, faucibus ac mi vel, scelerisque gravida neque. Mauris dignissim luctus enim a convallis. Etiam porttitor ex non lacus gravida, vitae pretium ipsum malesuada. In pellentesque, tellus porttitor imperdiet suscipit, magna arcu lacinia dolor, sit amet imperdiet felis eros tincidunt erat. Vestibulum egestas risus non ornare aliquet. Nullam lobortis cursus ultricies",
        "name":
        "Butter Cookies",
        "preptime":
        20,
        "servings":
        servings,
        "type":
        "Non Vegetarian"
    }


def test_fail_incorrectid():
    res = requests.get(url_prefix + '/uNX3snQBm')
    assert res.status_code == 404


def test_put_object(recipe):
    res = requests.post(url_prefix, json=recipe)
    assert res.status_code == 200


def test_put_object_fail(recipe):
    recipe.pop('name', None)
    res = requests.post(url_prefix, data=recipe)
    assert res.status_code == 400