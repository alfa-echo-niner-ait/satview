import requests, random
from flask import render_template, redirect, jsonify
from res import app, x


@app.route('/')
def index():
    msg = "Hello From Flask!"
    return render_template('index.html', msg=msg)

@app.route('/cord')
def cord():
    global x
    x1 = -75.25 + x
    x2 = -0.07 + x
    x = x+3
    return [x1, x2]
