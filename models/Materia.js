const {Schema, model} = require('mongoose')

const materiaSchema = new Schema({
	materia: String,
	nroParcial: Number,
	fecha: Date,
	nota: Number,
	recuperatorio: Boolean
})

materiaSchema.set('toJSON',{
	transform:(document, returnedObject)=>{
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Materia = model('Materia', materiaSchema)
module.exports = Materia

