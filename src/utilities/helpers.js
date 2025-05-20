
module.exports.httpBadRequest = (message) => {
  return {
    status: 400,
    success: false,
    message: message
  }
}

module.exports.httpMultipleResponse = (message) => {
  return {
    status: 300,
    success: false,
    message: message
  }
}

module.exports.successResponse = (message="") => {
  return {
    status: 200,
    success: true,
    data: message
  }
}

module.exports.currentDatetime = () => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}
