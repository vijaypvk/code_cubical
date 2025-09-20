import boto3
from typing import List, Dict

class AWSEC2Tool:
    def __init__(self):
        self.ec2_client = boto3.client('ec2')

    def list_ec2_instances(self) -> List[Dict]:
        """
        Lists all EC2 instances in the AWS account.

        Returns:
            A list of dictionaries, where each dictionary represents an EC2 instance.
        """
        try:
            response = self.ec2_client.describe_instances()
            instances = []
            for reservation in response['Reservations']:
                for instance in reservation['Instances']:
                    instances.append({
                        'InstanceId': instance['InstanceId'],
                        'InstanceType': instance['InstanceType'],
                        'State': instance['State']['Name'],
                        'PublicIpAddress': instance.get('PublicIpAddress', 'N/A'),
                        'PrivateIpAddress': instance.get('PrivateIpAddress', 'N/A')
                    })
            return instances
        except Exception as e:
            return [{'Error': str(e)}]

if __name__ == '__main__':
    tool = AWSEC2Tool()
    instances = tool.list_ec2_instances()
    print(instances)
