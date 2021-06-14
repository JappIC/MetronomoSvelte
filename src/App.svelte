<script>

    import { blur, fly } from 'svelte/transition';
    import Timer from './timer.js';

    let 
        recarga           = false,
        bpm               = 150,
        medida            = 4,
        contador          = 0,
        tiempoTexto       = 'Estable',
        metronomoActivo   = false,
        textoBtnMetronomo = 'Start'
    ;

    const click1= new Audio('audio/click1.mp3');
    const click2= new Audio('audio/click2.mp3');

    setTimeout(()=>{
        recarga = true;
    },1);

    $:tiempoTexto = 
        bpm <= 40 ? 'Super lento' :
        bpm > 40 && bpm < 80 ? 'Lento' :
        bpm > 80 && bpm < 120 ? 'Pausado' :
        bpm > 120 && bpm < 180 ? 'Estable' :
        bpm > 180 && bpm < 220 ? 'Animado' :
        bpm > 220 && bpm < 240 ? 'Rápido' :
        bpm > 240 && bpm < 260 ? 'Muy rápido' :
        bpm > 260 && bpm < 280 ? 'Corre caminos' : 'Corre caminos'
    ;
    
    // Tiempo de intervalo
    $:metronomo.timeInterval = 60000 / bpm;

    /**
     * Funciones de botones
     */

    // Tiempo. [Uso de Pro Tip condicional para minimizar el código. No hace falta el else ":" pero me da error si no lo añado]
    const aumentarTiempo = (bpm) => (bpm <=279) ? bpm++ : bpm;
    const disminuirTiempo = (bpm) => (bpm >=21) ? bpm-- : bpm;

    // Medida. [Uso de condicional estandar]
    const aumentarMedida = ()=>{
        if (medida <= 11) medida++
    }
    const disminuirMedida = ()=>{
        if (medida >= 3) medida--
    }

    // Boton que activa o desactiva el metrónomo
    function btnMetronomo(){
        if(!metronomoActivo) {
            metronomo.start();
            textoBtnMetronomo = 'STOP';
            metronomoActivo = true;
        } else {
            metronomo.stop();
            textoBtnMetronomo = 'Start';
            metronomoActivo = false;
        }
    }

    // Función de reproducción de metronomo y es llamado por la función btnMetronomo
    function playClick(){
        if (contador === medida) contador = 0;
        if (contador === 0){
            click1.play();
            click1.currentTime = 0;
        }else{
            click2.play();
            click2.currentTime = 0;
        }
        contador++;
    }

    // Configuración del Constructor Timer.js
    const metronomo = new Timer(playClick, 60000 / bpm, { immediate: true });
	
</script>

{#if recarga}
<section class="metronomo">

    <!-- VISTA DE BPM Y TESTO TIEMPO -->
    <h1 transition:blur={{ delay:100, duration: 1250 }}>{bpm} <span>BPM</span></h1>
    <p transition:blur={{ delay:100, duration: 1250 }}>{tiempoTexto}</p>

    <!-- OPCIONES DE TIEMPO -->
    <div class="tiempo">
        <div 
            on:click={disminuirTiempo} 
            class="icono"
            class:btn-no-activo="{bpm === 20}"
            transition:fly="{{ delay:100, x: 100, duration: 1250 }}"
        >-
        </div>

        <input 
            bind:value={bpm} 
            type=range 
            min=20 max=280 
            step="1" 
            class="rango-tiempo"
            transition:blur={{ delay:300, duration: 1250 }}
        >
        
        <div 
            on:click={aumentarTiempo} 
            class="icono"
            class:btn-no-activo="{bpm === 280}" 
            transition:fly={{ delay:100, x: -100, duration: 1250 }}
        >+
        </div>
    </div>

    <!-- BOTÓN INICIAR -->
    <div 
        on:click={btnMetronomo} 
        class="btn-play" 
        transition:blur={{ delay:100, duration: 1250 }}
    >
        {textoBtnMetronomo}
    </div>

    <!-- OPCIONES DE MEDIDA -->
    <div class="medida">
        <div 
            on:click={disminuirMedida}
            class:btn-no-activo="{medida === 2}" 
            id="restar-medida" 
            class="icono"
            transition:fly={{ delay:100, x: -100, duration: 1250 }}
        >-
        </div>
        <div 
            id="numero-medida" 
            class="numero-medida"
            transition:fly={{ delay:100, y: 100, duration: 1250 }}
        >
            {medida}
        </div>
        <div 
            on:click={aumentarMedida}
            class:btn-no-activo="{medida === 12}" 
            id="sumar-medida" 
            class="icono"
            transition:fly="{{ delay:100, x: 100, duration: 1250 }}"
        >+
        </div>
    </div>

</section>
{/if}
<style>

    @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');

    .metronomo{
        box-shadow:  0 0 10px #ccc;
        display: grid;
        font-family: 'Dela Gothic One', cursive;
        margin: 50px auto;
        max-width: 700px;
        text-align: center;
        padding-bottom: 50px;
        user-select: none;
    }

    .metronomo .icono{
        box-shadow: 0 0 2px 2px #ccc;
        border-radius: 50%;
        color: #b7b7b7;
        cursor: pointer;
        transition: 0.3s;
    }

    .metronomo .icono:hover{
        box-shadow: 0 0 1px 1px #ccc;
        background-color: #4aa05d;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
    }

    .btn-no-activo{
        cursor: auto !important;
        opacity: 0;
    }

    /* Clases para el medidor */
    .metronomo h1{
        background-color: #4aa05d;
        color: #fff;
        font-size: 80px;
        margin: 0;
        padding: 50px 10px;
    }

    .metronomo h1 span{
        font-size: 30px;
        margin-left: 5px;
    }

    .metronomo p{
        background-color: #5ebd6c;
        color: #fff;
        font-size: 20px;
        margin: 0;
        padding: 20px 10px;
    }

    /* Clases para el tiempo */
    .metronomo .tiempo{
        display: grid;
        grid-template-columns: auto 1fr auto;
        padding: 50px 10%;
    }

    .metronomo .tiempo .icono{
        font-size: 40px;
        padding: 0px 22px 5px;
    }

    .metronomo .tiempo input{
        margin: 0 20px;
        max-width: 100%;
    }

    .metronomo input[type=range]{
        -webkit-appearance: none;
        background-color: transparent;
        border: none;
    }

    .metronomo input[type=range]:focus{
        outline: none;
    }

    .metronomo input[type=range]::-webkit-slider-thumb{
        -webkit-appearance: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #4aa05d;
        margin-top: -14px;
    }
    .metronomo input[type=range]::-moz-range-thumb{
        -webkit-appearance: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #4aa05d;
        border:none;
    }

    .metronomo input[type=range]::-webkit-slider-runnable-track{
        width: 100%;
        height: 2px;
        background-color: #8db693;
    }

    /* Botón */
    .metronomo .btn-play{
        background-color: #4aa05d;
        border: 5px solid #5ebd6c;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        font-size: 30px;
        padding: 35px 10px;
        align-self:   center;
        justify-self: center;
        transition: 0.5s;
    }

    .metronomo .btn-play:hover{
        border: 5px solid #80e28f;
    }

    /* Clases para la medida del tiempo */
    .metronomo .medida{
        display: grid;
        font-size: 28px;
        font-weight: 100;
        grid-template-columns: repeat(3, auto);
        justify-content: center;
        margin-top: 30px;
        line-height: 30px;
    }

    .metronomo .medida .icono{
        font-size: 20px;
        margin: 0 10px;
        padding: 0 12px;
        line-height: 1.4;   
    }

    .metronomo .medida .numero-medida{
        color: #4aa05d;
    }

</style>