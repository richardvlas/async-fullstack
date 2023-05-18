# TODO: add the fastapi app here
import random
import time
from fastapi import FastAPI
import asyncio
import uvicorn

app = FastAPI()


@app.get("/delayed")
async def delayed_endpoint():
    # random time between 1 and 3 seconds
    delay = random.randint(1, 2)
    await asyncio.sleep(delay)
    return {"message": f"Delayed response after {delay} seconds"}


if __name__ == "__main__":
    uvicorn.run("app_fastapi:app", host="localhost", port=8000, log_level="info", reload=True, workers=4)
