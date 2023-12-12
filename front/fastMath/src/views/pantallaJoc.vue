<template>
  <body>
    <navBar />

    <div id="graellaPosicions" v-if="pilots.length > 0">
      <div id="cont">
        <h3>FM {{ `Pregunta ${currentQuestionIndex + 1}/${preguntas.length}` }}</h3>
      </div>
      <div id="barraPosiciones" v-if="pilots.length">
        <div class="carrusel-container">
          <div class="carrusel" ref="carrusel">
            <div class="posicion" v-for="(piloto, i) in pilots" :key="i">
              <div class="numero">{{ i + 1 }}</div>
              <div class="nombre">{{ piloto.pilot_name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="granContenidor">
      <div class="canva">
        <h1>canva</h1>
        <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.thebestf1.es%2Fwp-content%2Fuploads%2F2018%2F06%2Ff1-logo-negro-750x354.jpg&tbnid=R6cdCE8NbQd5pM&vet=12ahUKEwjvydPU2OuCAxU4dqQEHUdhCQ8QMygFegQIARBN..i&imgrefurl=https%3A%2F%2Fwww.thebestf1.es%2Fla-formula-1-podria-verse-obligada-cambiar-nuevo-logotipo%2F&docid=GRG8fzSZDsiePM&w=750&h=354&q=f1%20logo&hl=ca&safe=active&ved=2ahUKEwjvydPU2OuCAxU4dqQEHUdhCQ8QMygFegQIARBN" alt="">
        <canvas></canvas>
      </div>

      <div>
        <div class="pregunta" v-if="preguntas.length > 0">
          <h1>{{ `Pregunta ${currentQuestionIndex + 1}/${preguntas.length}` }}</h1>

          <h1>{{ preguntas[currentQuestionIndex].enunciat }}</h1>
          <img :src="preguntas[currentQuestionIndex].imatge" alt="">
          <div class="respostes">
            <button :key="1" class="resposta" @click="readAnswer(1)">
              {{ preguntas[currentQuestionIndex].resposta1 }}
            </button>
            <button :key="2" class="resposta" @click="readAnswer(2)">
              {{ preguntas[currentQuestionIndex].resposta2 }}
            </button>
            <button :key="3" class="resposta" @click="readAnswer(3)">
              {{ preguntas[currentQuestionIndex].resposta3 }}
            </button>
            <button :key="4" class="resposta" @click="readAnswer(4)">
              {{ preguntas[currentQuestionIndex].resposta4 }}
            </button>
          </div>
          <button @click="nextQuestion">Siguiente Pregunta</button>
          <button v-if="currentQuestionIndex === 56" @click="goToPodiumPage">Ir al podio</button>
        </div>
        <div v-else>
          <h1>¡Fin del cuestionario!</h1>
          
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import navBar from '../components/nav.vue';

export default {
  data() {
    return {
      preguntas: [],
      pilots: [],
      currentPilotIndex: 0,
      currentQuestionIndex: 0,
      autoNextTimer: null,
      respuestas: [], // Agregamos el array para almacenar las respuestas
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
    async fetchPilots() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/pilots');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.pilots = data;
      } catch (error) {
        console.error('Error fetching pilots:', error);
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
      if (this.currentQuestionIndex < this.preguntas.length - 1) {
        this.currentQuestionIndex++;
      } else {
        // Si es la última pregunta, no incrementar más y mostrar el v-else
        this.currentQuestionIndex = this.preguntas.length - 1;
      }
      this.startAutoNextTimer();
    },
    goToPodiumPage() {
      this.$router.push('/podiumPage');
    },
    readAnswer(respuestaIndex) {
      const preguntaIndex = this.currentQuestionIndex;
      const pregunta = this.preguntas[preguntaIndex].enunciat;
      const respuesta = this.preguntas[preguntaIndex]['resposta' + respuestaIndex];
      this.respuestas.push({ pregunta, respuesta, respuestaIndex });
      console.log(this.respuestas);
    },
    startCarousel() {
      setInterval(() => {
        this.currentPilotIndex = (this.currentPilotIndex + 1) % this.pilots.length;
      }, 5000);
    },
  },

  // Usa el gancho de ciclo de vida 'mounted'
  mounted() {
    this.startCarousel();
    this.fetchPreguntas();
    this.fetchPilots();
  },
};
</script>
<style scoped>




@media (min-width: 1024px) {

  body {
    margin: 0;
    background-color: var(--darkGray);
  }


  nav {
    background-color: var(--lightGray);
    margin: 0;

  }

  nav h1 {
    margin: 0;
  }

  .granContenidor {
    width: 97%;
    margin: auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: var(--darkGray);
  }

  .pregunta {
    color: white;
    background-color: var(--grayPregunta);
    padding: 20px;
    border-radius: 20px;
    border: 4px solid var(--darkRed);
  }

  #graellaPosicions {
    display: grid;
    grid-template-columns: .1fr 1fr;
    grid-gap: 20px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }

  #cont {
    background-color: var(--black);
    color: white;
    font-size: .6em;
  }

  #barraPosiciones {
    overflow: hidden;
    color: white;
  }

  .carrusel-container {
    display: flex;
  }

  .carrusel {
    display: flex;
    animation: scrollCarrusel 70s linear infinite;
    /* Ajusta la duración según tu preferencia */
  }

  .posicion {
    /* Tu estilo para cada posición */
    width: 200px;
    display: grid;
    grid-template-columns: 0.5fr 3fr;
  }


  @keyframes scrollCarrusel {
    from {
      transform: translateX(15%);
    }

    to {
      transform: translateX(-100%);
    }
  }
}
</style>