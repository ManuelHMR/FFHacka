from flask import Flask
from flask import request

app = Flask(__name__)
 
@app.route("/")
def home_view():
  return "Hello world!"


# FAZER ROTA POST
@app.route('/pdf', methods = ['POST'])
def pdf():
  if (request.method == 'POST'):
      data = request.form
      print(data)
