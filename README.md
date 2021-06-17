# Metrónomo app

Metronomo es un proyecto desarrollada con el Framewok Svelte y generado con [Svelte](https://svelte.dev)2. Este proyecto se usa para el aprendizaje y muestra de capacidades. Siéntase libre de clonar este proyecto.

<img src="/public/img/Metronomo.png" alt="Metrónomo"/>

*Tenga en cuenta que tiene que tener [Node.js](https://nodejs.org) instalado.*


## Empezar

Instalar las dependencias...

```bash
cd MetronomoSvelte
npm install
```
Inicializar servidor...

```bash
npm run dev
```

Vaya a [localhost:5000](http://localhost:5000). Deberías ver tu aplicación ejecutándose.

De forma predeterminada, el servidor solo responderá a las solicitudes de localhost. Para permitir conexiones desde otras computadoras, edite los comandos `sirv` en package.json para incluir la opción `--host 0.0.0.0`.

Si está utilizando [Visual Studio Code](https://code.visualstudio.com/), le recomendamos que instale la extensión oficial [Svelte para VS Code] (https://marketplace.visualstudio.com/items?itemName=svelte .svelte-vscode). 

Si está utilizando otros editores, es posible que deba instalar un complemento para obtener el resaltado de sintaxis y la inteligencia.

## Construyendo y ejecutando en modo de producción

Para crear una versión optimizada de la aplicación:

```bash
npm run build
```

Puede ejecutar la aplicación recién construida con `npm run start`. Esto usa [sirv](https://github.com/lukeed/sirv), que se incluye en las `dependencies` de su package.json para que la aplicación funcione cuando la implemente en plataformas como [Heroku](https: // heroku.com).

# Funcionalidades

Metronomo viene con las siguientes características:

- BPM modular. Puedes cambiar los BPM mediantes dos botones de aumentar y disminuir o un deslizador.
- Ventana de notificación que dependiendo del numero de BPM establecidos mostrara un mensaje.
-- Super lento, Lento, Pausado, Estable, Animado, Rápido, Muy rápido, Corre caminos.
- Un botón para parar o reproducir.
- Botones para aumentar o disminuir el compas.
- Efectos de transición.
- Adaptativa.
