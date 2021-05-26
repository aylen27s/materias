require('./mongo.js')
const mongoose = require('./mongo.js')
const Materia = require('./models/Materia')
const express = require('express')
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
		console.log(materia)
	})
})

app.post('/api/materias', (request, repsonse)=>{
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
			//mongoose.connection.close()
		})
	}else{
		console.error('request body sin los datos necesarios')
	}

})


app.listen(PORT, ()=>{
	console.log(`El server corre en el puerto ${PORT}`)
})
