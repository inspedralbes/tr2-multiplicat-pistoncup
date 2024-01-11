# Documentació bàsica del projecte
Ha d'incloure, com a mínim
## Instruccions per crear un entorn de desenvolupament

Eines: 
Programes web: Penpot, Taiga, Github, Chat GPT i Google Docs. 
Aplicacións: Node, Laravel, Vue, MYSQL i Pinia. 
Programes: CSS, HTML. PHP.
Plugins: Visual Studio Code: GitHub Copilot, Error Lens, Live Server, MySQL, node-snippets i Vue 3 Snippets.

## Instruccions per desplegar el projecte a producció
Per desplegar el proyecte s'ha de fer el seguent:

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

 5. Entrar en la carpeta nodeapp i instalar npm:
   cd..
   cd..
   cd .\nodeapp\
   npm install

 6. Entrar en la carpeta front i dintre d'aquesta a FastMath i instalar npm:
   cd..
   cd .\front\fastMath\
   npm install

 7. Crear arxiu dist:
   npm run build

9. Traslladar els fitxers al servidor.
   
10. Amb el servidor abrir la consola y engegar el node.
     cd .\nodeapp\
     node node.js

   

## Instruccions per seguir codificant el projecte
eines necessaries i com es crea l'entorn per que algú us ajudi en el vostre projecte.

## API / Endpoints / punts de comunicació
Heu d'indicar quins són els punts d'entrada de la API i quins són els JSON que s'envien i es reben a cada endpoint
