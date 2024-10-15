<template>
  <form class="formulario" @submit.prevent="register">
    <div class="mb-3">
      <label for="login" class="form-label">Nombre de usuario</label>
      <input type="text" class="form-control" id="login" v-model="loginForm.login" required />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Contraseña</label>
      <input type="password" class="form-control" id="password" v-model="loginForm.password" required />
    </div>
    <div class="mb-3">
      <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
      <input type="password" class="form-control" id="confirmPassword" v-model="loginForm.confirmPassword" required />
      <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
    </div>
    <div class="d-flex justify-content-between">
      <button type="button" class="btn btn-secondary me-2" @click="goToLogin()">
        Atrás
      </button>
      <button type="submit" class="btn btn-primary">
        Registrarse
      </button>
    </div>
  </form>
</template>

<script>
import AccountRepository from "@/repositories/AccountRepository";
import auth from "@/common/auth";

export default {
  data() {
    return {
      loginForm: {
        login: null,
        password: null,
        confirmPassword: null,
      },
      passwordError: '',
    };
  },
  methods: {
    async register() {
      
      if (this.loginForm.password !== this.loginForm.confirmPassword) {
        this.passwordError = 'Las contraseñas no coinciden.';
        return;
      } else {
        this.passwordError = '';
      }
      if((this.loginForm.confirmPassword.length || this.loginForm.passwordError.length) < 5) {
        this.passwordError = 'La contraseña tiene que tener mínimo 5 caracteres';
        return;
      }else {
        this.passwordError = '';
      }

      try {
        
        await AccountRepository.registerAccount(this.loginForm);
        console.log("Registro exitoso");

        try {
          await auth.login(this.loginForm);
          this.$router.push("/notes");
        } catch (err) {
          console.error(err);
        }
        console.log("Inicio de sesión exitoso:");
      } catch (err) {
        console.error(err);
      }
    },

    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.formulario {
  margin: 10px auto;
  max-width: 40%;
}

.text-danger {
  color: red;
}
</style>
