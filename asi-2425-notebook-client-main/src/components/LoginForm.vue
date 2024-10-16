<template>
  <form class="formulario">
    <div class="mb-3">
      <label for="login" class="form-label">Nombre de usuario</label>
      <input type="text" class="form-control" id="login" v-model="loginForm.login" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Contraseña</label>
      <input type="password" class="form-control" id="password" v-model="loginForm.password" />
    </div>
    <div class="d-flex justify-content-between">
      <button type="submit" class="btn btn-primary me-1" @click.prevent="login()">
        Iniciar sesión
      </button>
      <button type="button" class="btn btn-secondary" @click="register()">
        Registrarse
      </button>
    </div>
  </form>
</template>

<script>
import auth from "@/common/auth";

export default {
  data() {
    return {
      loginForm: {
        login: null,
        password: null,
      },
    };
  },
  methods: {
    async login() {
      if (!this.loginForm.login || !this.loginForm.password) {
        window.alert("Completa los campos.");
        return;
         }
      try {
        await auth.login(this.loginForm);
        this.$router.push("/notes");
      } catch (err) {
        console.error(err);
      }
    },
    async register() {
      try {
        this.$router.push("/register");
      } catch (err) {
        console.error(err);
      }
    }
  },
};
</script>

<style scoped>
.formulario {
  margin: 10px auto;
  max-width: 40%;
}

.d-flex {
  margin-top: 15px;
}
</style>
