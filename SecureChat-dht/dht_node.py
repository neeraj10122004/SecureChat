from kademlia.network import Server
import asyncio

async def run():
    server = Server()
    await server.listen(8468)
    print("DHT BOOTSTRAP NODE RUNNING ON PORT 8468")
    await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(run())