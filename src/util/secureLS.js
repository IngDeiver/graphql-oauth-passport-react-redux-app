import SecureLS from 'secure-ls'
import secrets from "../config/secrets.json";

export default new SecureLS({encodingType: 'aes', encryptionSecret:secrets["ls-secret"]})