<template>
  <body>
    <navBar />

    <div id="graellaPosicions" v-if="pilots.length > 0">
      <div id="cont">
        <div id="logo"><img src="/img/logo_text.png" alt=""></div>
        <div id="contQuestions">
          <h3> {{ `${currentQuestionIndex + 1}/${preguntas.length}` }}</h3>
        </div>
      </div>
      <div id="barraPosiciones" v-if="connectedUsers.length">
        <div class="carrusel-container">
          <div class="carrusel" ref="carrusel">
            <div class="posicion" v-for="(user, i) in connectedUsers" :key="i">
              <div class="color-franja" :style="{ backgroundColor: colors[i] }"></div>
              <div class="numero">{{ i + 1 }}</div>
              <div class="nombre">{{ user.username }}</div>

            </div>
          </div>
        </div>
      </div>
    </div>



    <div class="granContenidor">

      <div class="descr" v-if="show && selectedButton">
        <h1>Explicació</h1>
        <p>{{ preguntas[currentQuestionIndex].explicacio }}</p>
        <button @click="hiddenDescr">Tancar</button>

      </div>

      <div>
        <canvas ref="myCanvas" width="650" height="700" style="border:1px solid #000;">
        </canvas>

      </div>


      <div>
        <div class="pregunta" v-if="preguntas.length > 0">
          <h2 :class="getTimerClass()">{{ `${formatTime(timeRemaining)}` }}</h2>


          <h1>{{ `Pregunta ${currentQuestionIndex + 1}/${preguntas.length}` }}</h1>

          <img src="/img/coches/1.png" alt="">

          <h1>{{ preguntas[currentQuestionIndex].enunciat }}</h1>
          <img :src="preguntas[currentQuestionIndex].imatge" alt="">
          <div class="respostes" v-if="timeRemaining < 11">
            <button :key="1" class="resposta" @click="readAnswer(1)" :class="{ 'selected': selectedButton === 1 }">
              {{ preguntas[currentQuestionIndex].resposta1 }}
            </button>

            <button :key="2" class="resposta" @click="readAnswer(2)" :class="{ 'selected': selectedButton === 2 }">
              {{ preguntas[currentQuestionIndex].resposta2 }}
            </button>

            <button :key="3" class="resposta" @click="readAnswer(3)" :class="{ 'selected': selectedButton === 3 }">
              {{ preguntas[currentQuestionIndex].resposta3 }}
            </button>

            <button :key="4" class="resposta" @click="readAnswer(4)" :class="{ 'selected': selectedButton === 4 }">
              {{ preguntas[currentQuestionIndex].resposta4 }}
            </button>
          </div>

          <button v-if="currentQuestionIndex === 56" @click="goToPodiumPage">Ir al podio</button>
          <button id="showDescr" @click="showDescr" v-if="selectedButton">?</button>
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
import { useAppStore } from '../stores/app.js';


export default {
  data() {
    return {
      preguntas: [],
      pilots: [],
      currentPilotIndex: 0,
      currentQuestionIndex: 0,
      autoNextTimer: null,
      timeRemaining: 15,
      respuestas: [],
      selectedButton: false,
      show: false,
      canvas: null,
      ctx: null,
      img: new Image(),
      x: 100,
      y: 450,
      cars: [],
      colors: [
        '#002a38',
        '#006334',
        '#0091ba',
        '#898989',
        '#c70000',
        '#000000',
        '#780000',
        '#ff0000',
        '#ff7f00',
        '#ffff00',
      ],

    };
  },

  components: {
    navBar,
  },

  computed: {
    connectedUsers() {
      const appStore = useAppStore();
      return appStore.connectedUsers;

    },
  },

  methods: {
    async fetchPreguntas() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/preguntes');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.preguntas = data.map((pregunta) => ({
          ...pregunta,
          respuestaCorrecta: pregunta.respuesta_correcta,
        }));
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


    //--------------------------------------------------------------------- temporizador de la pregunta

    startQuestionTimer() {
      this.timeRemaining = 15; // reiniciar el tiempo para cada pregunta
      if (this.questionTimer) {
        clearInterval(this.questionTimer);
      }
      this.questionTimer = setInterval(() => {
        this.timeRemaining = Math.max(0, this.timeRemaining - 1);
        if (this.timeRemaining === 0) {
          // Si el tiempo llega a cero, pasar a la siguiente pregunta
          this.nextQuestion();
        }
      }, 1000);
    },

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    },

    getTimerClass() {
      return {
        'timer-red': this.timeRemaining <= 5,
      };
    },


    //--------------------------------------------------------------------- pasa a la siguiente pregunta
    nextQuestion() {
      if (this.currentQuestionIndex < this.preguntas.length - 1) {
        this.currentQuestionIndex++;
        this.selectedButton = false; // Desmarcar el botón
        this.show = false;
        this.startQuestionTimer(); // Iniciar el temporizador para la nueva pregunta
      } else {
        // Si es la última pregunta, no incrementar más y mostrar el v-else
        this.currentQuestionIndex = this.preguntas.length - 1;
        clearInterval(this.questionTimer); // Detener el temporizador si es la última pregunta
      }
    },



    //--------------------------------------------------------------------- leer respuesta 

    readAnswer(respuestaIndex) {
      const preguntaIndex = this.currentQuestionIndex;

      // Verificar si ya se ha seleccionado una respuesta
      if (!this.selectedButton) {
        // Obtener la información de la pregunta y respuesta
        const pregunta = this.preguntas[preguntaIndex].enunciat;
        const respuestaSeleccionada = this.preguntas[preguntaIndex]['resposta' + respuestaIndex]?.toLowerCase();
        const respuestaCorrecta = this.preguntas[preguntaIndex].correcta?.toLowerCase();

        if (respuestaCorrecta !== undefined && respuestaSeleccionada !== undefined) {
          const esRespuestaCorrecta = respuestaSeleccionada === respuestaCorrecta;

          const appStore = useAppStore();

          if (esRespuestaCorrecta) {
            // Incrementar los puntos para el primero en responder
            appStore.loginInfo.points += 1000;
            this.moveCarUp();
          } else {
            // Calcular puntos basados en el tiempo restante
            const puntosBase = 700;
            const puntosGanados = Math.max(0, puntosBase - (15 - this.timeRemaining) * 20);

            // Incrementar los puntos
            appStore.loginInfo.points += puntosGanados;
          }

          // Actualizar las posiciones
          appStore.updatePositions();

          // Actualiza las posiciones y muestra en el carrusel
          this.updatePositions();


          // Marcar el botón seleccionado
          this.selectedButton = respuestaIndex;

          // Deshabilitar los botones de respuesta
          this.disableAnswerButtons();

        } else {
          console.error('Error: respuestaCorrecta o respuestaSeleccionada es undefined.');
        }
      }
    },

    moveCarUp() {
      // Ajusta la cantidad que quieres mover el coche hacia arriba
      const yOffset = 50;

      // Actualiza la posición Y del coche
      this.y -= yOffset;

      // Vuelve a dibujar el canvas con la nueva posición del coche
      this.drawImage();
    },
    updatePositions() {
      // Obtiene la información de los usuarios conectados desde el Pinia store
      const appStore = useAppStore();
      const connectedUsers = appStore.connectedUsers;

      // Ordena los usuarios por puntos de mayor a menor
      const sortedUsers = connectedUsers.slice().sort((a, b) => b.points - a.points);

      // Actualiza las posiciones en el store
      sortedUsers.forEach((user, index) => {
        user.position = index + 1;
      });

      // Actualiza el carrusel
      this.drawImage();
    },

    disableAnswerButtons() {
      // Deshabilitar los botones de respuesta
      for (let i = 1; i <= 4; i++) {
        document.querySelector(`.resposta:nth-child(${i})`).disabled = true;
      }
    },


    showDescr() {
      this.show = true;

    },

    hiddenDescr() {
      this.show = false;
    },
    //--------------------------------------------------------------------- ir al podio

    goToPodiumPage() {
      this.$router.push('/podiumPage');
    },

    //--------------------------------------------------------------------- carrusel

    startCarousel() {
      setInterval(() => {
        this.currentPilotIndex = (this.currentPilotIndex + 1) % this.pilots.length;
        this.drawImage();
      }, 5000);
    },
    //--------------------------------------------------------------------- carga los coches

    loadCars() {
      // Separación entre coches
      const separation = 50;
      const ancho = 40; // Ajusta el ancho deseado según tus preferencias

      for (let i = 1; i <= this.connectedUsers.length; i++) {
        const carImage = new Image();
        carImage.src = `/img/coches/${i}.png`;

        // Calcula la altura proporcional para mantener la relación de aspecto
        carImage.onload = () => {
          const aspectRatio = carImage.width / carImage.height;
          const alto = ancho / aspectRatio;

          // Establece el tamaño deseado de la imagen del coche
          carImage.width = ancho;
          carImage.height = alto;

          // Establece la posición inicial en el eje X para cada usuario con separación
          this.connectedUsers[i - 1].carPositionX = this.x + i * separation;

          this.cars.push(carImage);
          this.drawImage(); // Asegúrate de dibujar después de cargar todas las imágenes
        };
      }
    },

    //--------------------------------------------------------------------- imprime el coche en el canva

    drawImage() {
      // Borra el canvas antes de imprimir el coche
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.connectedUsers.forEach((user, index) => {
        const carPositionX = user.carPositionX;
        const userCar = this.cars[index];

        // Imprime el coche ajustando la posición y tamaño
        this.ctx.drawImage(userCar, carPositionX, this.y, userCar.width, userCar.height);
      });
    },
    moveImage() {

    },


    generateRandomColor() {
      if (!this.randomColor) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        this.randomColor = color; // Almacena el color generado para su uso posterior
      }
      return this.randomColor;
    },



  },

  // Usa el gancho de ciclo de vida 'mounted'
  mounted() {
    this.startCarousel();
    this.fetchPreguntas();
    this.fetchPilots().then(() => {
      // Carga las imágenes de los coches despues de cargar los pilotos
      this.loadCars();

      // Obtener el contexto del canvas
      this.canvas = this.$refs.myCanvas;
      this.ctx = this.canvas.getContext("2d");

      // Iniciar el temporizador al cargar la página
      this.startQuestionTimer();
    });
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
    position: relative;
    width: 97%;
    margin: auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    background-color: var(--darkGray);
  }

  .descr {
    position: absolute;
    font-size: .8em;
    background-color: var(--lightGray);
    color: var(--black);
    padding: 20px;
    border-radius: 20px;
    grid-column: 1/3;
    text-align: center;
    width: 25%;
    right: 40%;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
    z-index: 1;

  }

  .dark-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  .pregunta {
    color: white;
    background-color: var(--grayPregunta);
    padding: 20px;
    border-radius: 20px;
    border: 4px solid var(--darkRed);
    z-index: 2;

  }

  .respostes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;

  }

  .resposta {

    font-size: 1.2em;
  }

  .resposta:hover {
    background-color: var(--darkRed);
    color: white;
    transition: .5s;

  }

  .selected {
    background-color: var(--darkRed);
    color: white;
    transition: 1s;
  }

  .timer-red {
    color: var(--darkRed);
    animation: blink .3s infinite alternate;
    /* ajusta la duración según tus preferencias */
  }

  @keyframes blink {
    from {
      opacity: 1;
    }

    to {
      opacity: 0.5;
      /* ajusta la opacidad según tus preferencias */
      color: var(--yellow);

    }
  }

  canvas {
    background-image: url(../views/img/canva.gif);
    background-size: contain;
    width: 100%;
    height: 100%;


  }



  #showDescr {
    background-color: var(--yellow);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-weight: bolder;
    font-size: 1.5em;
    border: none;
    margin: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }

  #graellaPosicions {
    display: grid;
    grid-template-columns: .15fr 1fr;
    box-shadow: rgba(153, 34, 45, 0.16) 0px 10px 36px 0px, rgba(153, 34, 45, 0.06) 0px 0px 0px 1px;
    width: 100%;
  }

  #cont {
    background-color: var(--black);
    color: white;
    font-size: .6em;
    display: grid;
    grid-template-columns: .3fr 1fr;
    padding: 5px;
  }

  #contQuestions {
    text-align: right;
    padding-right: 15px;
    padding-top: 2px;
    font-size: 1.5em;
  }

  #contQuestions h3 {
    margin: 0;
    padding-top: 5px;
  }

  #logo img {
    width: 55px;
    padding: 5px;
  }

  #barraPosiciones {
    overflow: hidden;
    color: white;
    padding-top: 10px;
    background-color: var(--grayPregunta);
    padding-left: 5px;
  }

  .carrusel-container {
    display: flex;
  }

  .carrusel {
    display: flex;
    animation: scrollCarrusel 70s linear infinite;
  }


  .posicion {
    width: 10px;
    margin-right: 40px;
    width: 300px;
    display: grid;
    grid-template-columns: .1fr 0.2fr 5fr;
  }

  .color-franja {
    height: 100%;
    width: 5px;
    margin-right: 10px;
  }


  .numero {
    margin-right: 10px;
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