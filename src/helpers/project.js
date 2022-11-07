export const findById = (resource, id) => {
	return resource.find((r) => r.id === id)
}
