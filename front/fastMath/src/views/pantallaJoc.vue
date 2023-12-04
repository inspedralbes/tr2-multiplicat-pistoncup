<template>
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
      <img
        src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.thebestf1.es%2Fwp-content%2Fuploads%2F2018%2F06%2Ff1-logo-negro-750x354.jpg&tbnid=R6cdCE8NbQd5pM&vet=12ahUKEwjvydPU2OuCAxU4dqQEHUdhCQ8QMygFegQIARBN..i&imgrefurl=https%3A%2F%2Fwww.thebestf1.es%2Fla-formula-1-podria-verse-obligada-cambiar-nuevo-logotipo%2F&docid=GRG8fzSZDsiePM&w=750&h=354&q=f1%20logo&hl=ca&safe=active&ved=2ahUKEwjvydPU2OuCAxU4dqQEHUdhCQ8QMygFegQIARBN"
        alt="">
      <canvas>

      </canvas>
    </div>

    <div>
      <div class="pregunta" v-if="preguntas.length > 0">
        <h1>{{ `Pregunta ${currentQuestionIndex + 1}/${preguntas.length}` }}</h1>

        <h1>{{ preguntas[currentQuestionIndex].enunciat }}</h1>
        <img :src="preguntas[currentQuestionIndex].imatge" alt="">
        <div class="respostes">
          <button :key="i" class="resposta" @click="readAnswer(i)">
            {{ preguntas[currentQuestionIndex].resposta1 }}
          </button>
          <button :key="i" class="resposta" @click="readAnswer(i)">
            {{ preguntas[currentQuestionIndex].resposta2 }}
          </button>
          <button :key="i" class="resposta" @click="readAnswer(i)">
            {{ preguntas[currentQuestionIndex].resposta3 }}
          </button>
          <button :key="i" class="resposta" @click="readAnswer(i)">
            {{ preguntas[currentQuestionIndex].resposta4 }}
          </button>
        </div>
        <button @click="nextQuestion">Siguiente Pregunta</button>
      </div>
      <div v-else>
        <h1>¡Fin del cuestionario!</h1>
      </div>
    </div>
  </div>
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
      this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.preguntas.length;
      this.startAutoNextTimer();
    },

    readAnswer(respuestaIndex) {
      const preguntaIndex = this.currentQuestionIndex;
      const pregunta = this.preguntas[currentQuestionIndex].enunciat;
      const respuesta = this.preguntas[currentQuestionIndex].resposta;
      this.respuestas.push({ pregunta, respuesta });
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
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Source+Code+Pro:wght@800&display=swap');


* {
  --lightGray: #B1B2B5;
  --darkGray: #262626;
  --grayPregunta: #404040;
  --grayResposta: #B1B2B5;
  --black: #0d0d0d;
  --darkRed: #99222d;
  --yellow: #deb53d;
  font-family: 'Lato', sans-serif;
}



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