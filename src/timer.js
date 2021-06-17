// Agregar función de constructor de temporizador precisa

function Timer(callback, timeInterval, options) {
    this.timeInterval = timeInterval;
    
    // Agregar método para iniciar el temporizador
    this.start = () => {
        // Establezca el tiempo esperado. El momento en el que iniciamos el temporizador más el intervalo de tiempo.
        this.expected = Date.now() + this.timeInterval;
        // Inicie el tiempo de espera y guarde la identificación en una propiedad, para que podamos cancelarla más tarde
        this.theTimeout = null;
        
        if (options.immediate) {
            callback();
        } 
        
        this.timeout = setTimeout(this.round, this.timeInterval);
    }

    // Agregar método para detener el temporizador
    this.stop = () => {
        clearTimeout(this.timeout);
    }

    // Método redondo que se encarga de ejecutar la devolución de llamada y ajustar el tiempo.
    this.round = () => {

        // La deriva será el momento actual en el tiempo para esta ronda menos el tiempo esperado.
        let drift = Date.now() - this.expected;

        // Ejecute la devolución de llamada de error si la deriva es mayor que el intervalo de tiempo y si se proporciona la devolución de llamada
        if (drift > this.timeInterval) {
            // Si se proporciona una devolución de llamada de error
            if (options.errorCallback) {
                options.errorCallback();
            }
        }
        callback();

        // Incremente el tiempo esperado por intervalo de tiempo para cada ronda después de ejecutar la función de devolución de llamada.
        this.expected += this.timeInterval;
        
        // Ejecute el tiempo de espera nuevamente y establezca el intervalo de tiempo de la siguiente iteración en el intervalo de tiempo original menos la deriva.
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
}

export default Timer;