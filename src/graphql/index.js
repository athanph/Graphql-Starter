import config from '../config'
import schema from './schema'

export default app => {
	if (config.env === 'development') {
		schema.applyMiddleware({
			app,
		})
	}
}
