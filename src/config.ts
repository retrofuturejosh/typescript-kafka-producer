import 'dotenv/config';
import { IKafkaConfig } from './types/IKafkaConfig';

const config: IKafkaConfig = {
  bootstrap: {
    servers: <string>process.env.BOOTSTRAP_SERVERS
  },
  security: {
    protocol: <'plaintext' | 'ssl' | 'sasl_plaintext' | 'sasl_ssl'>process.env.SECURITY_PROTOCOL
  },
  sasl: {
    username: <string>process.env.SASL_USERNAME,
    password: <string>process.env.SASL_PASSWORD,
    mechanisms: <string>process.env.SASL_MECHANISMS
  },
  dr_msg_cb: true,
  topic: <string>process.env.TOPIC
}

export default config
