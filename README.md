# Example Typescript Kafka Producer
This was built based off of [an example from Confluent](https://github.com/confluentinc/examples/blob/6.2.1-post/clients/cloud/nodejs/producer.js)

## Getting Started

### Step 1
Clone repo and `npm install`

### Step 2
Create a free tier Kafka Cluster in [Confluent Cloud](https://confluent.cloud/)

### Step 3
Create an API Key for your cluster.

In Confluent UI, go to Data Integration > API Keys > Add Key

Save your key/secret in a secure location (Do not commit to repo)

### Step 4
Create .env file in root folder of project with the following properties
```
BOOTSTRAP_SERVERS=<FOUND_IN_CONFLUENT_UI>
SECURITY_PROTOCOL=SASL_SSL
SASL_MECHANISMS=PLAIN
SASL_USERNAME=<API_KEY>
SASL_PASSWORD=<API_SECRET>
TOPIC=testTopic
```

### Step 5
Run application

``` npm start ```
