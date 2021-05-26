<template>
	<div id="root">
		<div class="section-a">
			<nav class="nav">
				<a href="/">Home</a>
				<a href="/api/parciales">Parciales</a>
			</nav>
			<!--prevent evita que la pagina se refresque al enviar el form-->
			<form @submit.prevent="addMateria" class="addForm">
				<h2>Nuevo parcial</h2>
				<input type="text" placeholder="Materia" v-model="materia.nombre">
				<label> Fecha<input type="date" v-model="materia.fecha"></label>
				<label> Nro de parcial<input type="number" class="i-number" v-model="materia.nroParcial"></label>	
				<label> Nota <input type="number" class="i-number" v-model="materia.nota"></label>
				<label> Recuperatorio<input type="checkbox" v-model="materia.recu"></label>
				<button class="btn-save">Guardar parcial</button>
			</form>
		</div>
		<div class="section-b">
			<div class="card" v-for="parcial of parciales">
				<header>
					<h3>{{parcial.materia}}</h3>
					<p>{{parcial.nroParcial}}° parcial</p>
				</header>
				<div>
					<label><p>{{new Date(parcial.fecha).getDay()}}/{{new Date(parcial.fecha).getMonth()}}/{{new Date(parcial.fecha).getFullYear()}}</p></label>
					<label>Nota <p>{{parcial.nota}}</p></label>
					<label v-if="parcial.recuperatorio==true" class="recu">Recuperatorio</label>
				</div>
			</div>
		</div>
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
				materia: new Materia(),
				parciales: []
			}
		},
		created(){//se ejecuta al refrescar la pagina
			this.getParciales()
		},
		methods: {
			getParciales(){
				fetch('/api/parciales')
				.then(response => response.json())
				.then(data => {
					this.parciales = data
					console.log(new Date(data[0].fecha))
				})
			},
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