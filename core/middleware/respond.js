function err (res, status) {
  if (status instanceof Array) {
    res.status(status[0]).json(status[1])
    console.error(status[1])
  } else if (status instanceof Object) {
    res.status(400).json(status)
    console.error(status)
  } else {
    res.status(400).json({ message: status })
    console.error({ message: status })
  }
}

function suc (res, status) {
  res.json(status)
}

export default (res, status, success) => {
  res.format({
    json: () => {
      success ? suc(res, status) : err(res, status)
    }
  })
}
