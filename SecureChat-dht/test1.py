# bitchat.py

import argparse, os, asyncio, socket
from nacl.public import PrivateKey, PublicKey, SealedBox
from kademlia.network import Server

BOOTSTRAP_IP = "10.30.5.77"  # Replace with your public DHT node IP
BOOTSTRAP_PORT = 8468
LISTEN_PORT = 5000

KEY_DIR = "keys"
PUB_FILE = os.path.join(KEY_DIR, "public.key")
PRIV_FILE = os.path.join(KEY_DIR, "private.key")

# ---------- Key Generation ----------
def generate_keys():
    os.makedirs(KEY_DIR, exist_ok=True)
    private_key = PrivateKey.generate()
    public_key = private_key.public_key

    with open(PRIV_FILE, "wb") as f:
        f.write(private_key.encode())
    with open(PUB_FILE, "wb") as f:
        f.write(public_key.encode())

    print("✅ Keys generated in 'keys/'")

# ---------- UPnP Port Mapping ----------
def try_upnp():
    try:
        import miniupnpc
        upnp = miniupnpc.UPnP()
        upnp.discoverdelay = 200
        upnp.discover()
        upnp.selectigd()
        upnp.addportmapping(LISTEN_PORT, 'TCP', upnp.lanaddr, LISTEN_PORT, 'BitChat', '')
        print(f"🌐 Port {LISTEN_PORT} mapped via UPnP at {upnp.externalipaddress()}")
        return upnp.externalipaddress()
    except Exception as e:
        print("❌ Port mapping unavailable (UPnP failed).")
        return None

# ---------- DHT Register ----------
async def register(username, ip="127.0.0.1", port=LISTEN_PORT):
    with open(PUB_FILE, "rb") as f:
        pub_hex = f.read().hex()

    record = f"{ip}:{port}:{pub_hex}"
    server = Server()
    await server.listen(0)
    await server.bootstrap([(BOOTSTRAP_IP, BOOTSTRAP_PORT)])
    await server.set(username, record)
    print(f"📢 Registered as '{username}' with value {record}")

# ---------- DHT Lookup ----------
async def lookup(username):
    server = Server()
    await server.listen(0)
    await server.bootstrap([(BOOTSTRAP_IP, BOOTSTRAP_PORT)])
    value = await server.get(username)
    if value:
        print(f"🔍 Found: {value}")
    else:
        print("❌ Not found.")

# ---------- Message Send ----------
def send_message(ip, port, pubkey_hex, message):
    pubkey = PublicKey(bytes.fromhex(pubkey_hex))
    box = SealedBox(pubkey)
    encrypted = box.encrypt(message.encode())

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((ip, int(port)))
        s.sendall(encrypted)
        print("📤 Message sent!")

# ---------- Message Receive ----------
def receive():
    # Try UPnP
    try_upnp()

    with open(PRIV_FILE, "rb") as f:
        private_key = PrivateKey(f.read())
    box = SealedBox(private_key)

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', LISTEN_PORT))
        s.listen()
        print(f"📥 Listening on port {LISTEN_PORT}...")

        while True:
            conn, addr = s.accept()
            with conn:
                data = conn.recv(4096)
                try:
                    message = box.decrypt(data).decode()
                    print(f"💬 [{addr[0]}]: {message}")
                except Exception as e:
                    print("❌ Decryption failed:", e)

# ---------- CLI Interface ----------
def main():
    parser = argparse.ArgumentParser(description="BitChat CLI (decentralized encrypted chat)")
    sub = parser.add_subparsers(dest="command")

    sub.add_parser("generate-keys", help="Generate key pair")
    sub.add_parser("receive", help="Start message listener")

    reg = sub.add_parser("register", help="Register username to DHT")
    reg.add_argument("username")

    look = sub.add_parser("lookup", help="Lookup peer in DHT")
    look.add_argument("username")

    send = sub.add_parser("send", help="Send encrypted message")
    send.add_argument("username")
    send.add_argument("message")

    args = parser.parse_args()

    if args.command == "generate-keys":
        generate_keys()

    elif args.command == "receive":
        receive()

    elif args.command == "register":
        # Use UPnP to try and get public IP
        ip = try_upnp() or "127.0.0.1"
        asyncio.run(register(args.username, ip))

    elif args.command == "lookup":
        asyncio.run(lookup(args.username))

    elif args.command == "send":
        async def lookup_and_send():
            server = Server()
            await server.listen(0)
            await server.bootstrap([(BOOTSTRAP_IP, BOOTSTRAP_PORT)])
            value = await server.get(args.username)
            if not value:
                print("❌ User not found.")
                return
            ip, port, pubkey_hex = value.split(":")
            send_message(ip, port, pubkey_hex, args.message)

        asyncio.run(lookup_and_send())

    else:
        parser.print_help()

if __name__ == "__main__":
    main()
