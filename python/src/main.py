import os
import uuid
from flask import Flask, request, jsonify

from .Includes.fazProcessamento import fazProcessamento
from .Includes.convertDfToJson import convertDfToJson


app = Flask(__name__)
 
@app.route("/")
def home_view():
  return "Hello world!"


# FAZER ROTA POST
@app.route('/pdf', methods = ['POST'])
def pdf():
  if (request.method == 'POST'):
    try:
      filepath = f'./tmp/{str(uuid.uuid4())}.pdf'

      with open(filepath,'wb') as f:
        f.write(request.data)
      
      # Processa
      retorno = fazProcessamento(filepath)

      # Remove arquivo temporário
      os.remove(filepath)
      if not retorno:
        return 'erro', 404

      res = [] 
      for tbl in retorno:
        res.append({
          'title': "",
          'page': tbl.page,
          'bbox': tbl._bbox,
          'isSelected': False,
          'data': convertDfToJson(tbl.df),
          'headers': [*tbl.df.columns]
        })

      return jsonify(res)
    except:
      os.remove(filepath)
      return 'erro',404
