const { logService, eventService } = require('../services')

exports.test = (socket) => {
  socket.on('test', (data) => {
    console.log('test')
    console.log(data)
  })
}

exports.registerLog = (socket) => {
  socket.on('system_info', (payload) => {
    logService.registerWorkstationLog(payload)
    const data = JSON.parse(payload)
    socket.broadcast.emit('system_info_ram', data)
  })
}

exports.emitEvent = (socket) => {
  socket.on('incident', (payload) => {
    eventService.incidentHandler(payload, socket)
  })
}
