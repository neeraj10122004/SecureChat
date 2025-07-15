FROM python:3.11-slim

WORKDIR /app

COPY dht_node.py .

RUN pip install --no-cache-dir kademlia

EXPOSE 8468

CMD ["python", "dht_node.py"]