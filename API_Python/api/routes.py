from flask import Blueprint, json, jsonify, request
from api.controller import Controller
from api.database import db
recipies = Blueprint('recipies', __name__)

controller = Controller(db)


@recipies.route('/api/p/')
def getSpec():
    return jsonify({
        " Welcome": "Manage all your recipies here :)",
        "Routes Available": {
            "GET /recipies": "Returns all recipies",
            "GET /recipies/id": "Returns the recipies with the provided id",
            "GET /recipies/id?servings=1":
            "Returns the recipie with the provided id for given number of servings",
            "POST /recipies": "Add a new recipie"
        }
    }), 200


@recipies.route('/api/p/recipies', methods=['GET', 'POST'])
def getRecepies():
    """
    Request Handler for the route /recipies
    """
    if request.method == 'GET':
        response = controller.get()
        if isinstance(response, list):
            return jsonify(response), 200
        return response
    else:
        response = controller.add(request.json)
        if isinstance(response, dict):
            return response, 200
        return response


@recipies.route('/api/p/recipies/<id>', methods=['GET'])
def getRecepie(id):
    """
    request Handler for the route /recipies/<id>
    """

    servings = request.args.get('servings', None, type=int)
    response = controller.get(id, servings=servings)

    if not isinstance(response, dict):
        return response

    return response, 200