const { eventService } = require('../services')

exports.getEvents = async (req, res) => {
  try {
    console.log(req.query)
    const result = await eventService.getEvents(req.query)
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

exports.createEvent = async (req, res) => {
  try {
    const existingItem = { itemAlias: 'MOCK_ITEM' }
    if (!existingItem)
      return res.status(400).json({ message: 'Item not found' })

    const result = await eventService.createEvent({
      itemAlias: existingItem.itemAlias,
      ...req.body,
    })
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

exports.deleteEvent = async (req, res) => {
  try {
    const result = await eventService.deleteEvent(req.body)
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

exports.updateEvent = async (req, res) => {
  try {
    const result = await eventService.updateEvent({ ...req.query, ...req.body })
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}