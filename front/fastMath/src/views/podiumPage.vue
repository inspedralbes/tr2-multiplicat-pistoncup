<template>
  <body>
    <div class="granContenidor">
      <img id="logo" src="../views/img/logo_fastmath_black.png  " alt="logoFastMath" height="200px">

      <div class="podio">
        <div class="puesto puesto2" v-if="Ranking[1]">
          <div class="posiciones">
            <h1>2</h1>
          </div>
          <div class="pilotos">
            <h2>{{ Ranking[1].username }}</h2>
            <h3>{{ Ranking[1].puntuacion }} Punts</h3>
          </div>
        </div>
        <div class="puesto puesto1" v-if="Ranking[0]">
          <div class="posiciones">
            <h1>1</h1>
          </div>
          <div class="pilotos">
            <h2>{{ Ranking[0].username }}</h2>
            <h3>{{ Ranking[0].puntuacion }} Punts</h3>
          </div>
        </div>
        <div class="puesto puesto3" v-if="Ranking[2]">
          <div class="posiciones">
            <h1>3</h1>
          </div>
          <div class="pilotos">
            <h2>{{ Ranking[2].username }}</h2>
            <h3>{{ Ranking[2].puntuacion }} Punts</h3>
          </div>
        </div>
      </div>
      <button @click="irLanding" class="tornar-button" type="button">Tornar</button>
    </div>


  </body>
</template>
  
<script>
import { useAppStore } from '../stores/app.js';

export default {
  name: 'PodiumPage',
  computed: {
    Ranking() {
      const appStore = useAppStore();
      return appStore.Ranking;
    },
  },
  methods: {
    irLanding() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  background-image: url("../views/img/fondo_podium.gif");
  background-repeat: no-repeat;
  background-size: cover;



}


.granContenidor {
  width: 60%;
  height: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  background-color: none;

}

.podio {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

}

.puesto {
  width: 200px;
  height: 200px;
  background-color: #d4af37;
  border-radius: 8px;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  padding: 50px;
  box-shadow: rgba(0, 0, 0, 0.5);
}

.puesto1 {
  font-size: 1.2em;
  background-color: #ffd700;
  color: ffd700;
  /* Oro */
}

.puesto2 {
  font-size: 1em;
  background-color: #c0c0c0;
  /* Plata */
}

.puesto3 {
  font-size: 0.9em;
  background-color: #cd7f32;
  /* Bronce */
}

.puesto h1 {
  margin: 0;
  color: var(--darkGray);
  font-weight: bolder;
}

#logo {
  margin: auto;
}

.tornar-button {
  background-color: rgb(255, 253, 253);
  color: rgb(0, 0, 0);
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  height: 30%;
  border: 2px solid rgb(48, 48, 48);
  /* Ancho del botón al 100% */
}

</style>