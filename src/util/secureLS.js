import SecureLS from 'secure-ls'

export default new SecureLS({encodingType: 'aes', encryptionSecret: process.env.REACT_APP_LS_SECRET})