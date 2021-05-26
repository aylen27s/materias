<template>
	<div>
		<nav>
			<a href="/">Home</a>
			<a href="/api/parciales">Parciales</a>
		</nav>
		<!--prevent evita que la pagina se refresque al enviar el form-->
		<form @submit.prevent="addMateria" class="addForm">
			<h2>Nuevo parcial</h2>
			<input type="text" placeholder="Materia" v-model="materia.nombre">
			<label>Nro de parcial<input type="number" v-model="materia.nroParcial"></label>
			<label>Fecha <input type="date" v-model="materia.fecha"></label>
			<label>Nota <input type="number" class="input" v-model="materia.nota"></label>
			<label>Recuperatorio <input type="checkbox" v-model="materia.recu"></label>
			<button>Guardar parcial</button>
		</form>
	</div>
	
</template>
<script>
	class Materia{
			cosntructor(nombre,fecha,nota,nroParcial,recu){
				this.nombre=nombre
				this.fecha=fecha
				this.nota=nota
				this.nroParcial=nroParcial
				this.recu=recu
			}
	}
	export default{
		
		data(){
			return{
				materia: new Materia()
			}
		},
		methods: {
			addMateria() {
				console.log(this.materia)

				fetch('/api/materias',{
					method: 'POST',
					body: JSON.stringify(this.materia),
					headers:{
						'Content-type':'application/json',
						'Accept':'application/json'
					}
				})
				.then(response => response.json())
				.then(data => console.log(data))

				this.materia = new Materia()
			}
		}
		
	}
</script>