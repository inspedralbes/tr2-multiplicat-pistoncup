<template>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  </head>

  
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 link-secondary">Overview</a></li>
          <li><a href="#" class="nav-link px-2 link-body-emphasis">Inventory</a></li>
          <li><a href="#" class="nav-link px-2 link-body-emphasis">Customers</a></li>
          <li><a href="#" class="nav-link px-2 link-body-emphasis">Products</a></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
        </form>

        <div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  
  <div class="granContenidor" v-if="fetchedData">
    <div class="canva">
      <h1>canva</h1>
      <canvas></canvas>
    </div>

    <div class="pregunta" v-if="currentQuestionIndex < fetchedData.preguntas.length">
      <h1>{{ `Pregunta ${currentQuestionIndex + 1}/${fetchedData.preguntas.length}` }}</h1>
      <h1>{{ fetchedData.preguntas[currentQuestionIndex].enunciado }}</h1>
      <img :src="fetchedData.preguntas[currentQuestionIndex].imagen" alt="">
      <div class="respostes">
        <button v-for="(respuesta, i) in fetchedData.preguntas[currentQuestionIndex].respuestas" :key="i" class="resposta" @click="readAnswer(i)">
          {{ respuesta.opcion }}
        </button>
      </div>
      <button @click="nextQuestion">Siguiente Pregunta</button>
    </div>

    <div v-else>
      <h1>¡Fin del cuestionario!</h1>
    </div>
  </div>

</template>



<script src="">
import { ref, onMounted } from 'vue';

export default {
  data() {
    return {
      fetchedData: null,
      currentQuestionIndex: 0,
      respuestas: [],
      autoNextTimer: null,
    };
  },
  methods: {
    onMounted() {
      fetch('../../datos.json')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error de red - ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.fetchedData = data;
          this.startAutoNextTimer();
        })
        .catch(error => {
          console.error('Error al obtener el JSON:', error);
        });
    },
    startAutoNextTimer() {
      if (this.autoNextTimer) {
        clearTimeout(this.autoNextTimer);
      }
      this.autoNextTimer = setTimeout(() => {
        this.nextQuestion();
      }, 10000);
    },
    nextQuestion() {
      this.currentQuestionIndex += 1;
      this.startAutoNextTimer();
    },
    readAnswer(respuestaIndex) {
      const preguntaIndex = this.currentQuestionIndex;
      const pregunta = this.fetchedData.preguntas[preguntaIndex].enunciado;
      const respuesta = this.fetchedData.preguntas[preguntaIndex].respuestas[respuestaIndex].opcion;
      this.respuestas.push({ pregunta, respuesta });
      console.log(this.respuestas);
    },
  },
  mounted() {
    this.onMounted();
  },
};
</script>
