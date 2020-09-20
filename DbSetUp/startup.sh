#!/bin/sh

sleep 60

curl -H "Content-Type: application/json" -X PUT http://database:9200/recipies -d @createIndex.json

curl -H "Content-Type: application/json" -X POST http://database:9200/recipies/_doc -d @recipie.json