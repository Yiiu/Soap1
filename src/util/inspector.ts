import inspector from 'schema-inspector'

export default function validator (schema) {
  return function validate (data) {
    const schemaData = schema
    const { sanitization, validation } = schemaData
    inspector.sanitize(sanitization, data)
    const result = inspector.validate(validation, data)
    if (!result.valid) {
      const err = {}
      result.error.forEach(error => {
        const name = error.property.match(/@\.(\w+)/)[1]
        err[name] = {
          reason: error.reason,
          message: error.message,
          code: error.code
        }
      })
      throw new ValidationError(err)
    }
  }
}
export class ValidationError {
  private message: string
  private error: object
  constructor (error) {
    this.message = 'validation_error'
    this.error = error
  }
}
