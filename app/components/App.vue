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
			<div class="card" v-for="parcial of parciales" :key="parcial.id">
				<header>
					<h3>{{parcial.materia}}</h3>
					<p>{{parcial.nroParcial}}° parcial</p>
				</header>
				<div>
					<label><p>{{new Date(parcial.fecha).getDay()}}/{{new Date(parcial.fecha).getMonth()}}/{{new Date(parcial.fecha).getFullYear()}}</p></label>
					<label>Nota <p>{{parcial.nota}}</p></label>
					<label v-if="parcial.recuperatorio==true" class="recu">Recuperatorio</label>
					<span>
						<button @click="remove(parcial.id)"><i class="far fa-trash-alt icon-rmv"></i></button>
						<button v-on:click="popUp('upd',true)"><i class="fas fa-pen-alt icon-edit"></i></button>
					</span>
				</div>
				<div class="update"  id="upd">
					<p>Actualizacion</p>
					<button>Actualizar</button>
					<button @click="popUp('upd',false)">Cancelar</button>
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
			popUp(id, state){
				if (state)
					document.getElementById(id).style.display = "block"
				else
					document.getElementById(id).style.display = "none"
			},
			getParciales(){
				fetch('/api/parciales',{
					method:'GET',
					headers:{
						'Accept':'application/json',
						'Content-type':'application/json'						
					}
				})
				.then(response => response.json())
				.then(data => {
					this.parciales = data
					console.log('datos obtenidos')
					console.log(this.parciales)
				})
			},
			update(id){
				fetch('/api/materias',{
					method:'PUT',
					body: JSON.stringify(this.materia)
				})
			},
			remove(id){
				console.log(id)
				 fetch('/api/materias/' + id, {
					method:'DELETE',
					headers:{
						'Accept':'application/json',
						'Content-type':'application/json'						
					}
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					this.getParciales()
				})

			},
			addMateria() {
				fetch('/api/materias',{
					method: 'POST',
					body: JSON.stringify(this.materia),
					headers:{
						'Accept':'application/json',
						'Content-type':'application/json'						
					}
				})
				.then(response => response.json())
				.then(data => {
					this.getParciales()
				})

				this.materia = new Materia()
			}
		}
		
	}
</script>