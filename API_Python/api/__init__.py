from flask import Flask
from elasticsearch import Elasticsearch
from api.routes import recipies

"""
Initialize the app and add route blueprints
"""

app = Flask(__name__)
app.register_blueprint(recipies)