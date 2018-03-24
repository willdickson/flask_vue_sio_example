from __future__ import print_function

import eventlet 
eventlet.monkey_patch()

from flask import Flask, render_template
from flask_socketio import SocketIO, emit


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def on_connect():
    print('client connected!!!')

@socketio.on('ping-msg')
def on_ping_msg(msg): 
    print('got a ping!!, msg =  ', msg)
    rsp_data = {'data': 2*msg['count']}
    print('sending response: ', rsp_data)
    emit('ping-rsp', rsp_data)


def py_timer():
    dt = 0.5 
    t = 0
    while True:
        data = {'t': t}
        socketio.emit('py-time', data)
        eventlet.sleep(dt)
        t+= dt
        print('py_timer: ', data)

eventlet.spawn(py_timer)

# -----------------------------------------------------------------------------
if __name__ == '__main__':

    socketio.run(app)



