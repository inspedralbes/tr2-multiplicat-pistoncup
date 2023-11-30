<template>


  <navBar />

  <div id="graellaPosicions" v-if="fetchedData">
    <div id="cont">
      <h3>FM {{ `Pregunta ${currentQuestionIndex + 1}/${fetchedData.preguntas.length}` }}</h3>
      
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

  
  <div class="granContenidor" v-if="fetchedData">

    
    <div class="canva">
      <h1>canva</h1>
        <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.thebestf1.es%2Fwp-content%2Fuploads%2F2018%2F06%2Ff1-logo-negro-750x354.jpg&tbnid=R6cdCE8NbQd5pM&vet=12ahUKEwjvydPU2OuCAxU4dqQEHUdhCQ8QMygFegQIARBN..i&imgrefurl=https%3A%2F%2Fwww.thebestf1.es%2Fla-formula-1-podria-verse-obligada-cambiar-nuevo-logotipo%2F&docid=GRG8fzSZDsiePM&w=750&h=354&q=f1%20logo&hl=ca&safe=active&ved=2ahUKEwjvydPU2OuCAxU4dqQEHUdhCQ8QMygFegQIARBN" alt="">
      <canvas>
       
      </canvas>
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
import navBar from '../components/nav.vue';

export default {
  data() {
    return {
      fetchedData: null,
      currentQuestionIndex: 0,
      respuestas: [],
      autoNextTimer: null,
    };
  },
  components: {
    navBar,
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
    startCarousel() {
      setInterval(() => {
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.fetchedData.preguntas.length;
      }, 5000); // Ajusta el tiempo de cambio de pregunta según tu preferencia
    },
  },
  mounted() {
    this.onMounted();
    this.startCarousel();

  },
};
</script>
