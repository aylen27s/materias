require('./mongo.js')
const mongoose = require('./mongo.js')
const Materia = require('./models/Materia')
const express = require('express')
const { response, request } = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())//body parser

//archivos estaticos (js, css, img)
app.use(express.static('public'))

//rutas
app.get('/', (request, response)=>{
	response.send('<h1>Calendario de Parciales</h1>')
})

app.get('/api/parciales',(request,response)=>{
	//entre llaves: parametro de filtro
	Materia.find({})
	.then(materia =>{
		response.json(materia)
	})
})

app.post('/api/materias', (request, response)=>{
	//const postData = request.body
	const {nombre, fecha, nota, nroParcial,recu} = request.body
	console.log(nombre, fecha, nota, nroParcial,recu)

	if(nombre !== undefined && fecha !== undefined){
		const nuevaMateria = new Materia({
		materia : nombre,
		fecha: new Date(fecha),
		nota: Number(nota) || 0,
		nroParcial: Number(nroParcial)|| 1,
		recuperatorio: recu || false
		})

		nuevaMateria.save().then( savedData=>{
			console.log(`Nueva materia guardada
				${savedData}`)
				response.json({
					status: 'Documento guardado'
				})
			//mongoose.connection.close()
		})
	}else{
		console.error('request body sin los datos necesarios')
		response.json({
			status: 'No se pudo guardar el nuevo doc.'
		})
	}

})

app.delete('/api/materias/:id', (request, response)=>{
	const { id }= request.params
	console.log(id)

	//response.status(200).end()
	Materia.findByIdAndRemove({_id:id},()=>{
		if(Materia.findById({_id:id}).content){
			console.log('No se pudo borrar el doc')
			response.status(204).end()
		}			
		else{
			response.json({
				status: 'Documento eliminado'
			})
		}
			
	})
})

app.put('/api/materias/',(req, res)=>{
	const {id, updName, updDate,updNota,updNroP,updRecu} = req.body

	Materia.findByIdAndUpdate({_id:id},{
		"materia":updName,
		"fecha":new Date(updDate),
		"nota":updNota,
		"nroParcial":updNroP,
		"recuperatorio":updRecu
	})
	.then(materia => {
		console.log('-----Datos actualizados')
		console.log(materia)
		res.status(200).end()
	})
	

})

app.listen(PORT, ()=>{
	console.log(`El server corre en el puerto ${PORT}`)
})
