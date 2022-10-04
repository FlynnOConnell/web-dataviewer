"""
 Here I define the different routes for the website and specify the settings.
  The default route shows the index.html where a canvas is shown.
  The result route will show the image once a picture is drawn, based on the provided unique ID.
   The postmethod route is defined to handle the data coming from Javascript into Python via a POST call.
    The content of the POST variable are written to a CSV file which can be used again on the result page where data is loaded from this same file.
"""

from __future__ import print_function
from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for
import json
import io
import os
import base64
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import numpy as np


app = Flask(__name__)
app.secret_key = 's3cr3t'
app.debug = True
app._static_folder = os.path.abspath("app/static/")

def convert_color(color_arr: np.ndarray):
    import matplotlib.colors as mplcolors
    assert (mplcolors.is_color_like(color_arr))


@app.route('/', methods=['GET'])
def home():
    title = 'Draw something!'
    return render_template(
            'home.html',
            title=title,
    )


# @app.route('/postmethod', methods = ['POST'])
# def post_javascript_data():
#     jsdata = request.form['canvas_data']
#     fig = Figure()
#     floats = np.asarray(json.loads(jsdata)).reshape(200, 200)
#     axis = fig.add_subplot(1, 1, 1)
#     axis.axis('off')
#     axis.imshow(floats)
#     canvas = FigureCanvas(fig)
#     output = io.BytesIO()
#     canvas.print_png(output)
#     encoded = base64.b64encode(output.getvalue())
#     response = make_response(encoded)
#     response.mimetype = 'image/png'
#     return response


if __name__ == '__main__':
    app.run(debug=True)

