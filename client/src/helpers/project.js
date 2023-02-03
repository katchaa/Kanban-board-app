import axios from 'axios'

export const findById = (resource, id) => {
	return resource.find((r) => r.id === id)
}

export const handlePost = async (directory, data) => {
	await axios
		.post(`http://localhost:3001/${directory}`, data)
		.then((res) => console.log(`${directory} - ${res.data}`))
		.catch((err) => console.log(err))
}

export const handleEdit = async (directory, id, data) => {
	await axios
		.patch(`http://localhost:3001/${directory}/${id}`, data)
		.then((res) => console.log(`${directory} - ${res.data}`))
		.catch((err) => console.log(err))
}

export const handleDelete = async (directory, id) => {
	await axios
		.delete(`http://localhost:3001/${directory}/${id}`)
		.then((res) => console.log(`${directory} - ${res.data}`))
		.catch((err) => console.log(err))
}
