const getDatabase = () => {
	const { database } = getInfraServices()
	return database
}

export { getDatabase }
