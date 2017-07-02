import inspector from 'schema-inspector'


export default function validator (schema) {
  return function validate (type, data) {
    let schemaData = schema[type]
    let { sanitization, validation } = schemaData
    inspector.sanitize(sanitization, data)
    let result = inspector.validate(validation, data)
    if (!result.valid) {
      throw new Error(result.error[0].message)
    }
  }
}
