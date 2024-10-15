<template>
    <ul id="example-1">
        <label for="select" class="form-label">Usuarios:</label>
        <ul v-for="autor in users" :key="autor.id" :value="autor">
            <h3>
                Ver notas de 
                <router-link :to="{ name: 'UserView', params: { id: autor.login } }">
                    {{ autor.login }}
                </router-link>
                <button type="submit" class="btn btn-danger me-2" v-if="admin()" @click.prevent="borrar(autor)">
                    Eliminar
                </button>
                <button type="submit" class="badge bg-warning" v-if="autor.active" @click="desactivar(autor)">
                    Desactivar
                </button>
                <button type="submit" class="btn btn-primary" v-if="!autor.active" @click="activar(autor)">
                    Activar
                </button>
            </h3>
        </ul>
    </ul>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";
import auth from "@/common/auth";

export default {

    data() {
        return {
            users: [],
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        admin() {
            return auth.isAdmin();
        },
        async fetchData() {
            this.users = await UserRepository.findAll();
        },

        async borrar(autor) {
            if (confirm(`¿Estás seguro de que deseas eliminar al usuario?`)) {
                try {
                    await UserRepository.delete(autor.id);
                    window.alert("Autor Eliminado");
                    location.reload();
                } catch (err) {
                    console.error(err);
                }
            }
        },
        async desactivar(autor) {
            if (confirm(`¿Estás seguro de que deseas desactivar al usuario?`)) {
                try {
                    await UserRepository.desactivate(autor.id);
                    window.alert("Autor Desactivado");
                    location.reload();
                } catch (err) {
                    console.error(err);
                }
            }
        },
        async activar(autor) {
            if (confirm(`¿Estás seguro de que deseas activar al usuario?`)) {
                try {
                    await UserRepository.activate(autor.id);
                    window.alert("Autor Activado");
                    location.reload();
                } catch (err) {
                    console.error(err);
                }
            }
        },
    },
};
</script>