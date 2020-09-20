from os import environ
from elasticsearch import Elasticsearch

db = Elasticsearch(['database:9200'])


