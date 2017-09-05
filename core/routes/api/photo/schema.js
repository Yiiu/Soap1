export default {
  upload: {
    sanitization: {
      type: 'object',
      strict: true,
      properties: {
        title: { type: 'string', rules: ['trim'] }
      }
    },
    validation: {
      type: 'object',
      properties: {
        title: { type: 'string', optional: false }
      }
    }
  }
}
