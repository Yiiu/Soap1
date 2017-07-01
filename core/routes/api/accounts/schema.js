import inspector from 'core/util/inspector'

const schema = {
  signup: {
    sanitization: {
      type: 'object',
      strict: true,
      properties: {
        username: { type: 'string' },
        email: { type: 'string', rules: ['trim', 'lower'] },
        password: { type: 'string', rules: ['trim'] }
      }
    },
    validation: {
      type: 'object',
      properties: {
        username: { alias: 'username', type: 'string', minLength: 1, error: 'invalid_username' },
        email: { alias: 'email', type: 'string', pattern: 'email', error: 'invalid_email' },
        password: { alias: 'password', type: 'string', minLength: 6, maxLength: 18, error: 'invalid_password' }
      }
    }
  }
}

export default inspector(schema)
