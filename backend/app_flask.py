import random
from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import threading

app = Flask(__name__)
# Allow cross-origin requests from the frontend server
# (localhost:3000) to the backend server (localhost:5000)
# This code enables CORS only for routes that match the
# /api/* pattern and only for requests from http://localhost:3000.
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
CORS(
    app,
    resources={
        r"/api/short_request": {"origins": "http://localhost:3000"},
        r"/api/long_request": {"origins": "http://localhost:3000"},
    },
)


@app.route("/api/short_request", methods=["GET"])
def short_request():
    num_threads = threading.active_count() - 1
    print(f"Number of active threads: {num_threads}")
    time.sleep(0.1)
    return jsonify({"message": "Short request: Response received!"})


@app.route("/api/long_request", methods=["GET"])
def long_request():
    request_id = request.args.get("request_id")
    time.sleep(random.randint(1, 4))
    return jsonify(
        {
            "message": "Long request: Response received!",
            "request_id": request_id,
            "backend_thread_count": threading.active_count() - 1,
        }
    )


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
