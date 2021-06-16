<template>
	<div id="root">
		<div class="section-a">
			<!--prevent evita que la pagina se refresque al enviar el form-->
			<form @submit.prevent="cargarDatos" class="addForm">
				<h2>Nuevo parcial</h2>
				<input type="text" placeholder="Materia" v-model="materia.nombre">
				<label> Fecha<input type="date" v-model="materia.fecha"></label>
				<label> Nro de parcial<input type="number" min="1" max="10" class="i-number" v-model="materia.nroParcial"></label>
				<label> Nota <input type="number" min="1" max="10" class="i-number" v-model="materia.nota"></label>
				<label> Recuperatorio<input type="checkbox" v-model="materia.recu"></label>
				<button class="btn">Guardar parcial</button>
				<small v-if="maxInsert===9">No se pueden insertar mas de 9 notas</small>
			</form>
		</div>
		<div class="section-b">
			<div class="card" v-for="parcial of parciales" :key="parcial.id">
				<header>
					<h3>{{parcial.materia}}</h3>
					<p>{{parcial.nroParcial}}° parcial</p>
				</header>
				<div>
					<p class="fecha">{{new Date(parcial.fecha).toLocaleDateString()/**/}}</p>
					<label v-if="parcial.nota >0">Nota <p class="nota">{{parcial.nota}}</p></label>
					<label v-else>Sin rendir</label>
					<label v-if="parcial.recuperatorio==true" class="recu">Recuperatorio</label>
					<footer>
						<button class="btn-icon" @click="remove(parcial.id)"><i class="far fa-trash-alt icon-rmv"></i></button>
						<button class="btn-icon" @click="update(parcial.id)"><i class="fas fa-pen-alt icon-edit"></i></button>
					</footer>

				</div>

			</div>
		</div>

		<template v-if="edit === true">
			<div class="popUp">
				<form @submit.prevent="cargarDatos" class="updForm">
					<h2>Actualizar</h2>
					<input type="text" placeholder="Materia" v-model="updMateria.nombre">
					<label> Fecha<input type="date" v-model="updMateria.fecha"></label>
					<label> Nro de parcial<input type="number" class="i-number" v-model="updMateria.nroParcial"></label>
					<label> Nota <input type="number" class="i-number" v-model="updMateria.nota"></label>
					<label> Recuperatorio<input type="checkbox" v-model="updMateria.recu"></label>
					<footer>
						<button class="btn act">Actualizar</button>
						<button class="btn" @click="edit=false">Cancelar</button>
					</footer>

				</form>
			</div>
		</template>
	</div>

</template>

<script>
	const header = {'Accept':'application/json','Content-type':'application/json'}
	class Materia{
			cosntructor(nombre,fecha,nota,nroParcial,recuperatorio){
				this.nombre=nombre
				this.fecha=fecha
				this.nota=nota
				this.nroParcial=nroParcial
				this.recu=recuperatorio
			}
	}
	export default{

		data(){
			return{
				materia: new Materia(),
				updMateria: new Materia(),
				parciales: [],
				edit:false,
				updId:'',
				maxInsert:0,
			}
		},
		created(){//se ejecuta al refrescar la pagina
			this.getParciales()
		},
		methods: {
			getParciales(){
				fetch('/api/materias',{
					method:'GET',
					headers: header
				})
				.then(response => response.json())
				.then(data => {
					this.parciales = data
					console.log('datos obtenidos')
					this.maxInsert = this.parciales.length
					//console.log('cantidad obtenida:',this.parciales.length)
				})
			},
			update(id){
				this.updId = id
				this.edit = !this.edit
				console.log('Modo PUT :',this.edit)
				//console.log(id)
				fetch('/api/materias/' + id,{
					method:'GET',
					headers: header
				})
				.then(res => res.json())
				.then(data => {
					this.updMateria = data
					this.updMateria.nombre = data.materia
					this.updMateria.recu = Boolean(data.recuperatorio)
					const f = new Date(data.fecha).toLocaleDateString().split('/').reverse()
					const fecha = () => {
						if(f[1]<=9  && f[2] <=9)
							return (`${f[0]}-0${f[1]}-0${f[2]}`)
						else if (f[2] <= 9)
							return (`${f[0]}-${f[1]}-0${f[2]}`)
						else if (f[1]<= 9)
							return (`${f[0]}-0${f[1]}-${f[2]}`)
					}
					console.log('debug debug')
					this.updMateria.fecha = fecha()
					console.log(this.updMateria.fecha,typeof(this.updMateria.fecha))
				})
			},
			remove(id){
				console.log(id)
				fetch('/api/materias/' + id, {
					method:'DELETE',
					headers:header
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					this.getParciales()
				})

			},
			cargarDatos() {

				//console.log('editar?: ',this.edit)
				
				if(this.edit===false && this.maxInsert <9){

					this.materia.fecha = this.materia.fecha.split('-')
					fetch('/api/materias',{
						method: 'POST',
						body: JSON.stringify(this.materia),
						headers:header
					})
					.then(response => response.json())
					.then(data => {
						this.getParciales()
					})
					this.materia = new Materia()

				}else if(this.edit){
					this.updMateria.fecha= this.updMateria.fecha.split('-')
					console.log('editar?: ',this.edit)
					console.log(this.updId)
					console.log(this.updMateria)
					fetch('/api/materias/'+this.updId,{
						method: 'PUT',
						body: JSON.stringify(this.updMateria),
						headers:header
					})
					.then(response => response.json())
					.then(data => {
						this.getParciales()
					})

					this.updMateria = new Materia()
					this.updId='';
					this.edit = false;
				}

			}
		}

	}
</script>
