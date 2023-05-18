send_sequential_requests:
	for i in {1..10}; do \
		curl http://localhost:8000/delayed & \
	done

send_parallel_requests:
	for i in $$(seq 1 10); do \
		curl -X GET "http://localhost:8000/delayed" & \
	done

start_fastapi:
	uvicorn app_fastapi:app --reload --port 8000 --workers 1

start_flask:
	python app_flask.py