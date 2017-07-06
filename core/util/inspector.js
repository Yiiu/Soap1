import inspector from 'schema-inspector'


export default function validator (schema) {
  return function validate (type, data) {
    let schemaData = schema[type]
    let { sanitization, validation } = schemaData
    inspector.sanitize(sanitization, data)
    let result = inspector.validate(validation, data)
    if (!result.valid) {
      let err = {}
      result.error.forEach(error => {
        let name = error.property.match(/@\.(\w+)/)[1]
        err[name] = {
          reason: error.reason,
          message: error.message,
          code: error.code
        }
      })
      throw err
    }
  }
}