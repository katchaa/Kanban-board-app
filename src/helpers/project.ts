import axios from 'axios'

export const findById = (resource: any, id: string | string[]) => {
	return resource.find((r: any) => r.id === id)
}

export const handlePost = async (directory: string, data: any) => {
	await axios
		.post(`http://localhost:3001/${directory}`, data)
		.then((res) => console.log(`${directory} - ${res.data}`))
		.catch((err) => console.log(err))
}

export const handleEdit = async (directory: string, id: string | string[], data: any) => {
	await axios
		.patch(`http://localhost:3001/${directory}/${id}`, data)
		.then((res) => console.log(`${directory} - ${res.data}`))
		.catch((err) => console.log(err))
}

export const handleDelete = async (directory: string, id: string | string[]) => {
	await axios
		.delete(`http://localhost:3001/${directory}/${id}`)
		.then((res) => console.log(`${directory} - ${res.data}`))
		.catch((err) => console.log(err))
}
