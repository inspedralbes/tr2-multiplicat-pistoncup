<template>
  <header>
    <nav>
      <h1>FM</h1>
    </nav>
  </header>
</template>




<script>
export default {
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Source+Code+Pro:wght@800&display=swap');

:root {
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
    animation: scrollCarrusel 50s linear infinite;
    /* Ajusta la duración según tu preferencia */
  }

  .posicion {
    /* Tu estilo para cada posición */
    margin-right: 10px;
  }

  

  @keyframes scrollCarrusel {
    from {
      transform: translateX(90%);
    }

    to {
      transform: translateX(-100%);
    }
  }
}
</style>



