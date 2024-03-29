# Documentació bàsica del projecte
Ha d'incloure, com a mínim
## Instruccions per crear un entorn de desenvolupament

Eines: 

Programes web: Penpot, Taiga, Github, Chat GPT i Google Docs. 

Aplicacións: Node, Laravel, Vue, MYSQL i Pinia. 

Programes: CSS, HTML. PHP.

Plugins: Visual Studio Code, GitHub Copilot, Error Lens, Live Server, MySQL, node-snippets i Vue 3 Snippets.

## Instruccions per desplegar el projecte a producció

Per desplegar el proyecte s'ha de fer el seguent:

1.Baixarse el proyecte desde gitHub.

 git clone https://github.com/inspedralbes/tr2-multiplicat-pistoncup.git
 
 cd .\tr2-multiplicat-pistoncup\

2. Entrar en la carpeta laravel i dintre d'aquesta a FastMath i intalar composer:
   
cd .\laravel\FastMath\

composer install

3.Crear la base de dades a un servidor.
  -Enganxar continguts del fitxer create.sql
  
  -Enganxar continguts dels fitxers insertPreguntas.sql i insertPilots.sql

4. Crear .env:
   
   cp .env.example .env
   
   4.1 Modificar els camps seguents:
   
     FRONT_URL=http://{PRODUCTION_URL}

     DB_CONNECTION=mysql
     DB_HOST=
     DB_PORT=
     DB_DATABASE=
     DB_USERNAME=
     DB_PASSWORD=

 6. Entrar en la carpeta nodeapp i instalar npm:
 
   cd..
   
   cd..
   
   cd .\nodeapp\
   
   npm install

 7. Entrar en la carpeta front i dintre d'aquesta a FastMath i instalar npm:

   cd..
   
   cd .\front\fastMath\
   
   npm install

 9. Crear arxiu dist:
  
   npm run build

10. Traslladar els fitxers al servidor.
   
11. Amb el servidor abrir la consola y engegar el node.

    cd .\nodeapp\
    
    node node.js



## Instruccions per seguir codificant el projecte

1. Seguir els passos de la secció Desplegar el projecte a producció.

2. Fer les migrations:

   cd .\laravel\FastMath\
   
   php artisan migrate
   
4. Executar laravel

    php artisan serve
   
6. Amb un altre terminal engegar servidor.

  cd .\nodeapp\
  
  node node.js

8. Amb un altre terminal engegar servidor.

  cd .\front\fastMath\
  
  npm run dev   
  
10. Veure la web.

  http://localhost:5173/


## API / Endpoints / punts de comunicació
Api Laravel:

 Nom Api: Preguntas
 
 Method: POST

 ![image](https://github.com/inspedralbes/tr2-multiplicat-pistoncup/assets/124352502/13fd826a-68f9-4e92-acdb-f7f15f9cdc6d)

Api Laravel:

Nom Api: pilots

Method: Post

![image](https://github.com/inspedralbes/tr2-multiplicat-pistoncup/assets/124352502/b53a0872-3009-4306-a787-413ea9e528ae)


 Sockets Node

 ![image](https://github.com/inspedralbes/tr2-multiplicat-pistoncup/assets/124352502/678a1026-74f6-47ec-94bc-a2e5f5dfec47)

 Dades Vue:

![image](https://github.com/inspedralbes/tr2-multiplicat-pistoncup/assets/124352502/854f74b4-15a8-4305-81b6-60cae4990f00)




