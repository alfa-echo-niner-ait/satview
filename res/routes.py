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


@app.route('/satdata')
def satdata():
    global x
    data = {
        "info": {
            "satname": "SPACE STATION",
            "satid": 25544,
            "transactionscount": 1
        },
        "positions": [
            {
                "satlatitude": -0.2998873,
                "satlongitude": -80.8313175,
                "sataltitude": 420.03,
                "azimuth": 187.21,
                "elevation": -16.36,
                "ra": 284.45243345,
                "dec": -63.96217763,
                "timestamp": 1706373743,
                "eclipsed": False
            },
            {
                "satlatitude": -0.24893754,
                "satlongitude": -80.79545146,
                "sataltitude": 420.02,
                "azimuth": 187.17,
                "elevation": -16.32,
                "ra": 284.57189794,
                "dec": -63.93917927,
                "timestamp": 1706373744,
                "eclipsed": False
            },
            {
                "satlatitude": -0.19798547,
                "satlongitude": -80.75958418,
                "sataltitude": 420.01,
                "azimuth": 187.12,
                "elevation": -16.29,
                "ra": 284.69141392,
                "dec": -63.91611721,
                "timestamp": 1706373745,
                "eclipsed": False
            },
            {
                "satlatitude": -0.14703726,
                "satlongitude": -80.72371993,
                "sataltitude": 420,
                "azimuth": 187.07,
                "elevation": -16.25,
                "ra": 284.81096728,
                "dec": -63.89299406,
                "timestamp": 1706373746,
                "eclipsed": False
            },
            {
                "satlatitude": -0.09608474,
                "satlongitude": -80.68785286,
                "sataltitude": 419.99,
                "azimuth": 187.03,
                "elevation": -16.22,
                "ra": 284.93057756,
                "dec": -63.8698059,
                "timestamp": 1706373747,
                "eclipsed": False
            },
            {
                "satlatitude": -0.04513408,
                "satlongitude": -80.65198724,
                "sataltitude": 419.98,
                "azimuth": 186.98,
                "elevation": -16.19,
                "ra": 285.05023064,
                "dec": -63.84655534,
                "timestamp": 1706373748,
                "eclipsed": False
            },
            {
                "satlatitude": 0.00581673,
                "satlongitude": -80.61612158,
                "sataltitude": 419.97,
                "azimuth": 186.93,
                "elevation": -16.15,
                "ra": 285.16993162,
                "dec": -63.82324124,
                "timestamp": 1706373749,
                "eclipsed": False
            },
            {
                "satlatitude": 0.05676768,
                "satlongitude": -80.5802558,
                "sataltitude": 419.96,
                "azimuth": 186.89,
                "elevation": -16.12,
                "ra": 285.28968083,
                "dec": -63.79986342,
                "timestamp": 1706373750,
                "eclipsed": False
            },
            {
                "satlatitude": 0.10771873,
                "satlongitude": -80.54438984,
                "sataltitude": 419.95,
                "azimuth": 186.84,
                "elevation": -16.09,
                "ra": 285.40947857,
                "dec": -63.77642168,
                "timestamp": 1706373751,
                "eclipsed": False
            },
            {
                "satlatitude": 0.15867191,
                "satlongitude": -80.50852221,
                "sataltitude": 419.95,
                "azimuth": 186.79,
                "elevation": -16.05,
                "ra": 285.52932997,
                "dec": -63.75291486,
                "timestamp": 1706373752,
                "eclipsed": False
            }
        ]
    }

    print(f"Info: {data['info']}\n")
    info = data['info']
    pos = data["positions"]
    sat_data = {
        'id': info['satid'],
        "name": info['satname'],
        'lat_start': pos[0]['satlatitude'],
        'long_start': pos[0]['satlongitude'],
        'lat_end': pos[9]['satlatitude'] + x,
        'long_end': pos[9]['satlongitude'] + x,
        'alt': pos[9]['sataltitude'],
        'ra': pos[9]['ra'],
        'dec': pos[9]['dec']
    }
    x = x+2
    return sat_data
