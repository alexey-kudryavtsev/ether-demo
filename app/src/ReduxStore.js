import { generateStore, EventActions } from '@drizzle/store'
import drizzleOptions from './drizzleOptions'

const contractEventNotifier = store => next => action => {
    console.log(action)
    if (action.type === EventActions.EVENT_FIRED) {
        const contract = action.name
        const contractEvent = action.event.event
        const message = action.event.returnValues._message
        const display = `${contract}(${contractEvent}): ${message}`
        console.log("777")
    }
    return next(action)
}

const appMiddlewares = [contractEventNotifier]

export default generateStore({
    drizzleOptions,
    appMiddlewares,
    disableReduxDevTools: false
})