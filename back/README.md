### Prerequisites
- ***NVM installed***. You can follow the next instructions: (https://github.com/nvm-sh/nvm#installing-and-updating).
- ***Node v18 or higher***. If you had installed NVM, you can switch your Node version with:
  ```
  $ nvm use 18
  ```
  You can view your current node version with:
  ```
  $ node -v
  ```

### How install
```
$ npm install
```

### How launch
```
$ npm run start
```

The backend will be listening in `localhost:3000`.


### Flujo para crear entornos de backend
Queremos tener diferentes entornos apuntando a nuestro back. El objetivo es que Sleepy Spider ofrezca diferentes preguntas según a que URL consulte. Para ello, empezaremos explicando como crear una base de datos, como conectarla con nuestro backend y cómo generar un entorno que exponga dicho servicio.


#### 1.- Nuestra base de datos, una hoja de cálculos
Nos apoyamos en Google Sheets, pero valdría cualquier otra herramienta de hojas de cálculo, como Excel. Por ejemplo: https://docs.google.com/spreadsheets/d/1xSLlB_hpHBXuD2LOmMss7lMMl9HSYUTmfNIO6EMWYVo/edit#gid=748318665.

![Image](https://github.com/ZenekeZene/sleepy-spider/assets/13425271/1408f98b-90c2-4995-baf3-d26b578bc615)

Los campos son:
- **question** (string): Por ejemplo: Which CSS property is used to change the background color of an element?
- **option1** (string): Por ejemplo: background-color
- **option2** (string): color
- **option3** (string): text-color
- **option4** (string): Por ejemplo: element-color
- **correct** (string): respuesta correcta. Tiene que coincidir el texto exactamente con una de las cuatro opciones. Esto quizá sea un pain.
- **tags** (string): Separados por comas. Por ejemplo: CSS, SASS
- **database-id** (string): Identifica de forma única qué version de datos es.

#### 2.- Exportar nuestra hoja de cálculos
- Archivo > Descargar > Valores separados por comas (.CSV).
![Image](https://github.com/ZenekeZene/sleepy-spider/assets/13425271/105b475c-f3ce-468d-9ecc-8116693e1f20)

#### 3.- Convertir a JSON
Necesitamos convertir el fichero .CSV a un fichero .JSON. Para eso nos apoyamos en la siguiente herramienta:
[Convertidor Online](https://csvjson.com/csv2json)

#### 4.- Integrar en proyecto
Movemos el fichero JSON al monorepo: _back > src > databases > XXX.json_
Pusheamos los cambios al repositorio.

#### 5.- Conectamos con el backend
Usamos **Railway** para crear servicios y exponerlos en producción. En este caso, tan solo usamos servicios web para exponer nuestra API de preguntas, así nuestra araña puede mostrar dichas preguntas al usuario.

##### Crear entorno nuevo
Railway funciona con entornos, esto nos da la posibilidad de tener una instancia aislada del servicio que queramos ofrecer, en este caso un servicio web que expone una API. Para crear un entorno nuevo:
![Image](https://github.com/ZenekeZene/sleepy-spider/assets/13425271/09872c00-544e-48e1-be53-2bc65850abd9)

Rellenamos los campos, con especial cuidado de rellenar la variable de entorno DATABASE_FILE. Esta variable apunta al fichero .JSON que hemos metido en nuestro proyecto back, pero no tenemos que prefijarlo con el path ni sufijarlo con el nombre formato. Si por ejemplo, nuestro fichero se llamaba questions.database.json, tan solo tenemos que poner questions.database.
![Image](https://github.com/ZenekeZene/sleepy-spider/assets/13425271/0ec48511-c633-4350-9256-0826cc95f81b)

También necesitas indicar en qué proyecto apoyarse para ofrecer el servicio. En nuestro caso, es un proyecto en Node albergado en un monorepo, bajo el subdirectorio back.
![Image](https://github.com/ZenekeZene/sleepy-spider/assets/13425271/85d7b76b-f88a-448a-9b26-d4c8b8684cf7)

##### Con el entorno creado
Si ya tuviéramos un entorno creado, bien porque estuviera creado de antes, bien porque la acabamos de crear, tan solo tenemos que cambiar la variable de entorno _DATABASE_FILE_ de nuestro servicio, como hemos indicado antes.

Al guardar los cambios, se desplegará una versión nueva de nuestro servicio.
Finalmente habremos creado el servicio y nos dará una URL, como esta:
![Image](https://github.com/ZenekeZene/sleepy-spider/assets/13425271/b0eea38b-376c-4808-9757-77f3f22ae5df)
Que utilizaremos a continuación.

#### 6.- Conectamos con el frontend
Utilizamos **Netlify** para desplegar nuestro frontend y servirlo a nuestros usuarios. Pero, para que la araña pueda mostrar nuestras nuevas preguntas, necesitamos apuntar a la URL anterior.

Con esta URL, vamos a **Netlify**, y modificamos la siguiente variable de entorno con dicha URL como valor:
![Image](https://github.com/ZenekeZene/sleepy-spider/assets/13425271/a758eea1-d893-4ef8-93ac-807a9c89efbc)





