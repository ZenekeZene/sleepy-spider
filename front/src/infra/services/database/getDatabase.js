import { getInfraServices } from '@/infra/infra'

const getDatabase = () => {
	const { database } = getInfraServices()
	return database
}

export { getDatabase }
