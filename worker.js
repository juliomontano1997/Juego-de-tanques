//recibe la informacion y la procesa
this.onmessage = e => {
    const delay = e.data;
    const start = performance.now();
    while (performance.now() - start < delay);
    const end = performance.now();
    //devuelve la informacion
    this.postMessage(end - start);
};
