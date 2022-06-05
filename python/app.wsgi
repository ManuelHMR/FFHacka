#flaskapp.wsgi
import sys
sys.path.insert(0, '/var/www/html/flask_project')
 
from wsgi import app as application