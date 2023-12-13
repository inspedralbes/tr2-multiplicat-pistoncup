<template>
    <body>
        <navBar />

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
            canvas: null,
            ctx: null,
            img: new Image(),
            x: 60,
            y: 450, // Initial position based on canvas and image height
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
            log(this.autoNextTimer);
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

            // Check if a response has already been recorded for the current question
            const existingResponseIndex = this.respuestas.findIndex(
                (resp) => resp.pregunta === pregunta
            );

            if (existingResponseIndex === -1) {
                // If no response has been recorded, add the new response
                const respuesta = this.preguntas[preguntaIndex]['resposta' + respuestaIndex];
                this.respuestas.push({ pregunta, respuesta, respuestaIndex });
                console.log(this.respuestas);
            } else {
                // If a response has already been recorded, you may want to handle this case
                console.log('Response already recorded for this question');
                // You can choose to update the existing response or ignore the new click
            }
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
        /* Ancho de la franja vertical */
        margin-right: 10px;
    }

    .numero {
        margin-right: 10px;
    }
}
</style>