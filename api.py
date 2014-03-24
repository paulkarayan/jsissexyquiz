from flask import Flask, Response
import json


import logging
from logging import StreamHandler

questions = [{"question":"Who is Prime Minister of the United Kingdom?","choices":["David Cameron","Gordon Brown","Winston Churchill","Tony Blair"],"correctAnswer":0},
{"question":"What is the landspeed of an African Swallow?","choices":["100km/hr","24mph","5mph","Tony Blair"],"correctAnswer":1},
{"question":"What is the capital of Slovenia?","choices":["Ljubljana","Maribor","Celje"],"correctAnswer":0}]

def question(qs):

    for item in qs:
      yield json.dumps(item)

q = question(questions)

file_handler = StreamHandler()
app = Flask(__name__)

app.logger.setLevel(logging.DEBUG)  # set the desired logging level here
app.logger.addHandler(file_handler)

@app.route('/')
def hello_world():

  return Response(json.dumps(questions), mimetype='application/json')




@app.route('/questiongen', methods=['GET'])

def questionroute():
  return next(q)




if __name__ == '__main__':
    app.run()