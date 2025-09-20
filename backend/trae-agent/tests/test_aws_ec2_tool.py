import requests
import json

class AwsMCPClient:
    def __init__(self, mcp_url="http://127.0.0.1:8000/mcp"):
        self.mcp_url = mcp_url
        self.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream"
        }
        self.session_id = "3e6b3406b9924f4099bb51c43cd02270"
        self.create_session()

    def create_session(self):
        """Create a new MCP session and store the session_id"""
        # Create session without requiring existing session_id first
        payload = {
            "jsonrpc": "2.0",
            "id": "create-session",
            "method": "CreateSessionRequest",
            "params": {}
        }
        # Don't include session_id in the payload initially
        response = requests.post(self.mcp_url, json=payload, headers=self.headers)
        if response.status_code == 200:
            data = response.json()
            # Extract session_id from server response
            server_session_id = data.get("result", {}).get("session_id")
            if server_session_id:
                self.session_id = server_session_id
                print(f"✅ Session created: {self.session_id}")
            else:
                # If server doesn't provide session_id, keep the pre-generated one
                print(f"✅ Session created with pre-generated ID: {self.session_id}")
        else:
            raise RuntimeError(f"Failed to create session: {response.text}")

    def send_request(self, method, params=None):
        """Send an MCP request with automatic session handling"""
        if not self.session_id:
            self.create_session()

        payload = {
            "jsonrpc": "2.0",
            "id": f"req-{method}",
            "method": method,
            "params": params or {},
            "session_id": self.session_id
        }

        response = requests.post(self.mcp_url, json=payload, headers=self.headers)
        if response.status_code == 200:
            return response.json()
        else:
            raise RuntimeError(f"MCP request failed ({response.status_code}): {response.text}")

    # Example helper method
    def list_ec2_instances(self, region="us-east-1"):
        return self.send_request("ListInstancesRequest", {"region": region})

    def start_ec2_instance(self, instance_id, region="us-east-1"):
        return self.send_request("StartInstanceRequest", {"region": region, "instance_id": instance_id})

    def stop_ec2_instance(self, instance_id, region="us-east-1"):
        return self.send_request("StopInstanceRequest", {"region": region, "instance_id": instance_id})


# ===== Example usage =====
if __name__ == "__main__":
    client = AwsMCPClient()

    # List EC2 instances
    instances = client.list_ec2_instances()
    print("✅ EC2 Instances:")
    print(json.dumps(instances, indent=4))

    # Example: Start or stop instance (uncomment to test)
    # start_response = client.start_ec2_instance("i-0123456789abcdef0")
    # print("Start instance:", json.dumps(start_response, indent=4))
