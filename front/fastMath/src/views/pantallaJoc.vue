<template>
  <navBar />

  <div id="graellaPosicions" v-if="fetchedData">
    <div id="cont">

    </div>
    <div id="barraPosiciones" v-if="fetchedData">
      <div class="carrusel-container">
        <div class="carrusel" ref="carrusel">
          <div class="posicion" v-for="(posicion, i) in fetchedData.preguntas" :key="i">
            <div class="numero">{{ i + 1 }}</div>
            <div class="punto" :class="{ 'punto-verde': i < currentQuestionIndex }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="granContenidor">


    <div class="canva">
      <h1>canva</h1>
      <img
        src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.thebestf1.es%2Fwp-content%2Fuploads%2F2018%2F06%2Ff1-logo-negro-750x354.jpg&tbnid=R6cdCE8NbQd5pM&vet=12ahUKEwjvydPU2OuCAxU4dqQEHUdhCQ8QMygFegQIARBN..i&imgrefurl=https%3A%2F%2Fwww.thebestf1.es%2Fla-formula-1-podria-verse-obligada-cambiar-nuevo-logotipo%2F&docid=GRG8fzSZDsiePM&w=750&h=354&q=f1%20logo&hl=ca&safe=active&ved=2ahUKEwjvydPU2OuCAxU4dqQEHUdhCQ8QMygFegQIARBN"
        alt="">
      <canvas>

      </canvas>
    </div>

    <div>
    <ul>
      <li v-for="pregunta in preguntas" :key="pregunta.id">
        {{ pregunta.enunciat }}
      </li>
    </ul>
  </div>
    <div class="pregunta" v-if="fetchedData && fetchedData.preguntas.length > 0">
      <h1>{{ `Pregunta ${currentQuestionIndex + 1}/${fetchedData.preguntes.length}` }}</h1>

      <h1>{{ fetchedData.preguntes[currentQuestionIndex].enunciat }}</h1>
      <img :src="fetchedData.preguntes[currentQuestionIndex].imatge" alt="">
      <div class="respostes">
        <button v-for="(respuesta, i) in [
          fetchedData.preguntes[currentQuestionIndex].resposta1,
          fetchedData.preguntes[currentQuestionIndex].resposta2,
          fetchedData.preguntes[currentQuestionIndex].resposta3,
          fetchedData.preguntes[currentQuestionIndex].resposta4
        ]" :key="i" class="resposta" @click="readAnswer(i)">
          {{ respuesta }}
        </button>
      </div>
      <button @click="nextQuestion">Siguiente Pregunta</button>
    </div>


  </div>
</template>



<script>
import navBar from '../components/nav.vue';

export default {
  data() {
    return {
      preguntas: [],
    };
  },
 
  components: {
    navBar,
  },

  methods: {
    async fetchPreguntas() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/preguntes');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.preguntas = data;
      } catch (error) {
        console.error('Error fetching preguntas:', error);
      }
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
    startCarousel() {
      setInterval(() => {
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.fetchedData.preguntas.length;
      }, 5000); // Ajusta el tiempo de cambio de pregunta según tu preferencia
    },
  },

  // Usa el gancho de ciclo de vida 'mounted'
  mounted() {
    this.onMounted();
    this.startCarousel();
    this.fetchPreguntas();

  },
};
</script>
