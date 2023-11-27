# Ay no hay que llorar, que la vida es un carnaval y es más bueno vivir cantando.

*Todo aquel que piense que la vida es cruel, nunca estará solo, Dios está con él.*

Este es un calendario de **carnavales en Colombia**, para programarse con los carnavales desde el dia de hoy, hasta dentro de un año.


## Cómo añadir Ferias, Fiestas o Carnavales

En el archivo `src/carnavales.json` se encuentra un [arreglo](https//www.google.com) de carnavales

```
{    
  "type": string,   // Carnaval, Feria, Fiesta, Festival, etc
  "name": string,   // Resto del nombre
  "city": string,   // Nombre del Municipio donde se realiza
  "state": string,  // Nombre del Departamento donde se ubica dicho municipio
  "from": [
    number,  // Número de dia de inicio de la festividad
    number,  // Número de mes de inicio de la festividad
    number   // OPCIONAL. Año en que se realiza en estas fechas
  ],
  "to": [
    number,  // Número de dia de final de la festividad
    number,  // Número de mes de final de la festividad
    number   // OPCIONAL. Año en que se realiza en estas fechas
  ],
  "fixed": boolean,  // Se realiza en una fecha fija? (true) O la fecha cambia cada año?(false) 
  "dates": []        //Los eventos que se realizan en fechas especificas
},
```

**Nota:** en caso de ser una fiesta de un solo dia, `from` y `to` tendrian los mismos valores. Pero es necesario indicarlos


El formato de cada elemento dentro de `dates` es
```
  {
    "name": string, // El nombre de la celebración del dia
    "day": number  // El número de dia en que se celebra, donde 0 es el dia de inicio de la festividad. Recibe valores negativos para los eventos del PRECARNAVAL
  },
```

Como ejemplo, el **Carnaval de Barranquilla**:

```
  {
    "type": "Carnaval",
    "name": "de Barranquilla",
    "city": "Barranquilla",
    "state": "Atlántico",
    "from": [
      10,
      2,
      2024
    ],
    "to": [
      13,
      2,
      2024
    ],
    "fixed": false,
    "dates": [
      {
        "name": "Lectura del Bando",
        "day": -28
      },
      {
        "name": "Guacherna",
        "day": -8
      },
      {
        "name": "Coronación de la Reina",
        "day": -2
      },
      {
        "name": "Batalla de las Flores",
        "day": 0
      },
      {
        "name": "Desfile del Rey Momo",
        "day": 0
      },
      {
        "name": "Gran Parada de Tradición y Folclor",
        "day": 1
      },
      {
        "name": "Gran Parada Comparsas",
        "day": 2
      },
      {
        "name": "Festival de Orquestas y Acordeones",
        "day": 2
      },
      {
        "name": "Entierro de joselito Carnaval",
        "day": 3
      }
    ]
  },
```


***

### Carnavales actualizados en el archivo: 

**Carnaval de Negros y Blancos**

*Pasto, Nariño*

Del 2  al 6 de Enero  

Con 9 eventos


**Carnaval Multicolor de la Frontera**

*Ipiales, Nariño*

Del 2  al 6 de Enero  

Con 0 eventos


**Carnaval de Negros y Blancos de Túrreques**

*Túrreques, Nariño*

Del 3  al 6 de Enero  

Con 0 eventos


**Carnaval de Ocaña**

*Ocaña, Norte de Santander*

Del 4  al 6 de Enero  

Con 0 eventos


**Ferias y Fiestas de San jerónimo**

*Málaga, Santander*

Del 4  al 8 de Enero  

Con 2 eventos


**Carnaval de Riosucio**

*Riosucio, Caldas*

Del 5  al 10 de Enero  del 2024 

Con 7 eventos


**Fiesta de Sincelejo**

*Sncelejo, Sucre*

Del 20  al 20 de Enero  

Con 0 eventos


** Batalla de Flores**

*Santo Tomás, Atlántico*

Del 2  al 2 de Febrero  del 2024 

Con 0 eventos


**Carnaval de Barranquilla**

*Barranquilla, Atlántico*

Del 10  al 13 de Febrero  del 2024 

Con 9 eventos


**Carnaval de Mompox**

*Santa Cruz de Mompox, Bolívar*

Del 10  al 13 de Febrero  del 2024 

Con 0 eventos


**Carnaval de Riohacha**

*Riohacha, La Guajira*

Del 10  al 13 de Febrero  del 2024 

Con 0 eventos


**Feria de las Flores**

*Medellín, Antioquia*

Del 26 de Junio  al 5 de Junio  del 2024 

Con 0 eventos


**Festival Folclórico Colombiano**

*Ibagué, Tolima*

Del 14  al 30 de Junio  del 2024 

Con 12 eventos


**Ferias y Fiestas de San Pedro en El Espinal**

*El Espinal, Tolima*

Del 16 de Junio  al 1 de Junio  del 2024 

Con 12 eventos


**Fiesta Patronal del Carmen de Bolívar**

*Carmen de Bolívar, Bolívar*

Del 7  al 17 de Julio  

Con 8 eventos


**Fiesta de San Pacho**

*Quibdó, Chocó*

Del 20 de Septiembre  al 4 de Septiembre  

Con 0 eventos


**Festival Audiovisual de los Montes de María**

*Carmen de Bolívar, Bolívar*

Del 1  al 6 de Noviembre  

Con 0 eventos


**Feria de Cali**

*Cali, Valle del Cauca*

Del 25  al 30 de Diciembre  

Con 0 eventos

### Carnavales desactualizados:

**Festival Multicultural de los Montes de María**

*Carmen de Bolívar, Bolívar*

Con 0 eventos


**Festival Nacional de la Leyenda y Danza**

*Ciénaga, Magdalena*

Con 0 eventos


**Carnaval de Corozal**

*Corozal, Sucre*

Con 0 eventos