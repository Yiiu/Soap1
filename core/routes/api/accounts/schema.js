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
        username: { type: 'string', minLength: 1, error: 'invalid_username' },
        email: { type: 'string', pattern: 'email', error: 'invalid_email' },
        password: { type: 'string', minLength: 6, maxLength: 18, error: 'invalid_password' }
      }
    }
  },
  token: {
    sanitization: {
      type: 'object',
      strict: true,
      properties: {
        userOrEmail: { type: 'string' },
        password: { type: 'string', rules: ['trim'] }
      }
    },
    validation: {
      type: 'object',
      properties: {
        userOrEmail: { type: 'string', minLength: 1, error: 'invalid_username' },
        password: { type: 'string', minLength: 6, maxLength: 18, error: 'invalid_password' }
      }
    }
  }
}

export default inspector(schema)
