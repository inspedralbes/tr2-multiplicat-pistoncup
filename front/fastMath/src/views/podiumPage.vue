<template>
    <body>

        <div class="podio">
            <div class="puesto puesto1">
                <h2>Puesto 1</h2>
            </div>
            <div class="puesto puesto2">
                <h2>Puesto 2</h2>
            </div>
            <div class="puesto puesto3">
                <h2>Puesto 3</h2>
            </div>
        </div>

    </body>
</template>
  
<script>
export default {
    data() {
        return {};
    },
    methods: {},
    mounted() { },
};
</script>
  
<style scoped>
body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f2f2f2;
    }

    .podio {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .puesto {
      width: 200px;
      height: 100px;
      background-color: #d4af37;
      border-radius: 8px;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .puesto1 {
      background-color: #ffd700; /* Oro */
    }

    .puesto2 {
      background-color: #c0c0c0; /* Plata */
    }

    .puesto3 {
      background-color: #cd7f32; /* Bronce */
    }

    .puesto h2 {
      margin: 0;
      color: #fff;
    }
</style>
  