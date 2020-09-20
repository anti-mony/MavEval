from api.database import db
from elasticsearch.exceptions import NotFoundError
from elasticsearch.helpers import scan
from jsonschema import validate, ValidationError
from os import getcwd
from sys import stderr
import json

# Validation Schema
schema = json.load(open(getcwd() + '/api/schema.json', 'r'))


def add(recipie, index='recipies'):
    """
    Add a new object to the index in the database

    :param recipie: The new recipie to be added 
    :param index: Index in which the new recipie is to be added (Default: recipies)
    :returns: Response from adding the document to the index
              In case of an exception the method returns 
              a tuple of error message and http code
    """
    try:
        validate(instance=recipie, schema=schema)
        response = db.index(index=index, body=recipie)
        return response
    except ValidationError as e:
        return ("Validation Error, there was an error in the object received",
                400)
    except Exception as e:
        print(e, file=stderr)
        return ("Internal Server Error", 500)


def get(id=None, index='recipies', servings=None):
    """
    Get a document from the index

    :param id: The object to be fetched from the db (default : None) 
    :param index: Index in which the new recipie is to be added (Default: recipies)
    :returns: If no id is given, all documents in the index are returned otherwise the document itself
              In case of an exception the method returns 
              a tuple of error message and http code
    """
    if id is None:
        try:
            response = scan(db,
                            index=index,
                            query={"query": {
                                "match_all": {}
                            }})
            result = []
            for item in response:
                item['_source']['id'] = item['_id']
                result.append(item['_source'])
            return result
        except Exception as e:
            print(e, file=stderr)
            return ("Internal Server Error", 500)

    try:
        result = db.get(index, id)
        result['_source']['id'] = result['_id']
    except NotFoundError as e:
        print(e, file=stderr)
        return ("ID provided is not present in the index", 404)
    except Exception as e:
        print(e, file=stderr)
        return ("Internal Server Error", 500)

    if servings is not None:
        if not isinstance(servings, int):
            return ("Servings needs to be of type integer", 400)
        givenServings = result['_source']['servings']
        for ingredient in result['_source']['ingredients']:
            ingredient['quantity'] = (ingredient['quantity'] /
                                      givenServings) * servings
        result['_source']['servings'] = servings

    return result['_source']