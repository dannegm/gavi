# Gavi

## Cómo actualizar los datos

La aplicación utiliza una base de datos NoSQL local que opta por seguir una esructura definida para favorecer la navegación entre fechas, grados y materias.

Para modificar dichos datos, es necesario ingresar a la carpeta `<project>/src/assets/data` donde se encontrarán los siguientes archivos:

* `books.json` - Se describen los modelos de los libros disponibles por grado
* `books.js` - Se asocia cada libro del archivo `books.json` con el logo de su serie de acuerdo al campo `serieCode`
* `subjects.js` - Se asocian los logos de las materias de acuerdo con el código de la materia `subjectCode`
* `grade{#}.json` - Se encuentra el contenido de páginas por fechas. Existe un archivo por cada grado.
* `gradesData.json` - No tocar, se usa para importar los archivos JSON a la aplicación

### Modelos

#### Archivo de grados

Existe un archivo en formato JSON para cada grado el cual contiene información sobre las materias y páginas disponibles.

Cada archivo tiene la siguiente estructura base:

```json
{
    "scheme_version": "4.1.0", // Versión de la plataforma compatible
    "grade": "1" <string: grado al que corresponde>,
    "updated_at": <Date ISO-8601: fecha de la última actualización>,
    "signature": <string: sha1-signature>,
    "data": {
        "<Date YYYY/MM/DD:Fecha en la que se visualizará el contenido>": [
            // Subject Model > Contenido de la materia que será mostrada
        ]
    }
}
```

> **NOTA** Cabe destacar que los campos `scheme_version`, `signature` y `updated_at` son auto generados y no son necesarios para el mantenimiento al día a día de la plataforma. Este campo solamente es utilizado para identificar la última versión estable del contenido. Si el contenido generado en estos archivos no coincide con la firma significa que el contenido ha sido alterado y no se podrá ofrecer soporte ante esta situación dado que se ha modificado código funcional de la plataforma.

#### Días

Es la forma en la que la plataforma identificará qué día se visualizará cierto contenido. Este es un arreglo que contiene un identificador en formato de fecha `YYYY/MM/DD` y una lista de `subjects` que es el contenido que se visualizará en determinado día.

El modelo es el siguiente:

```json
"<Date YYYY/MM/DD:Fecha en la que se visualizará el contenido>": [
    // Subject Model > Contenido de la materia que será mostrada
]
```

#### Materias

Es el contenido que se visualizará en la plataforma. Es probable que en el mismo día se tenga la necesidad de tener más de un contenido con la misma materia, para este caso es útil incrementar el campo `subjectIndex`.

Es importante mencionar que el campo `subjectCode` debe ser uno de los que están disponibles en el archivo `src/assets/data/subjects.js`, de lo contrario no podrá mostrarse correctamente en la plataforma.

El modelo es el siguiente:

```json
{
    "subjectIndex": <int: el orden en el que se mostrará la materia si es que está repetida>,
    "subjectCode": <string: Es el código de la materia disponible en `src/assets/data/subjects.js`,
    "learn": <string: Es la leyenda del aprendizaje que aparecerá en el detalle de la materia>,
    "books": [
        // book Model > Contenido de los libros y páginas que será mostrado
    ]
}
```

#### Libros

Es el contenido de los libros que se visualizará en la plataforma. Esto pueden corresponder a libros de cualquier serie y grado. El contenido de los libros deberá estar ligado a los datos disponibles en el archivo `src/assets/data/books.json`

**NOTAS**

- El campo `id` no es necesario para que la plataforma funcione correctamente
- Los campos `label`, `type` son autogenerados y no son utilizados actualmente, fue un resago de versiones anteriores de la plataforma
- El código en el campo `serieCode` debe ser uno de los disponibles en el archivo `src/assets/data/books.js` en la lista `series` de la línea 10 de lo contrario el logo del libro no se mostrará correctamente
- El campo `interactiveLink` es opcional
- El campo `pages` es opcional

El modelo del libro es:

```json
{
    "id": <string: identificador del libro>,
    "subjectCode": <string: Código de materia>,
    "serieCode": <string: Serie del libro>,
    "interactiveLink": <string|URL: Link externo a los interactivos vinculados a un libro>,
    "subjectName": <string: Nombre de la materia>,
    "serieName": <string: Nombre de la serie con grado>,
    "folder": <string: Identificador del folder para formar las páginas>,
    "identifier": <string: Identificador de la materia para formar las páginas>,
    "label": "empty",
    "type": "book",
    "pages": // Pages Model > Contenido de las páginas que será mostrado,
}
```

#### Páginas

Es el contenido de las páginas, este corresponde a los grupos de páginas individuales o por rango. La generación de páginas tiene dos niveles los cuáles ayudarán a generar los textos de forma programática. Funciona de la siguiente manera:

El modelo tiene un arreglo de nivel superior el cuál contiene agrupaciones de páginas los cuáles resultará en un texto unido por comas y la conjunción "*Y*", ej:

```javascript
[ A, B ] // Regresará `Páginas A y B`
[ A, B, C ] // Regresará `Páginas A, B y C`
[ A, B, C, D ] // Regresará `Páginas A, B, C y D`
[ A ] // Regresará `Páginas A`
```

El segundo nivel del arreglo corresponderá a los rangos de las páginas los cuales resultará siempre un texto unido por la conjunción "*a*" donde el límite mínimo será el primer elemento de la lista y el límite máximo será el último, ej:

```javascript
[ 1, 2 ] // Regresará `1 a 2`
[ 1, 2, 3 ] // Regresará `1 a 3`
[ 1, 2, 3, 4, 5 ] // Regresará `1 a 5`
[ 1, 5 ] // Regresará `1 a 5`, no es necesario tener elementos intermedios
[ 1 ] // Regresará `1`
```

En conjunto, se podrá crear una leyenda adecuada para grado, ej:

```javascript
[ [1] ] // Páginas 1
[ [1], [2] ] // Págians 1 y 2
[ [1, 2, 3], [11, 12, 13] ] // Páginas 1 a 3 y 11 a 13
[ [1, 2, 3], [11, 12, 13], [50, 55] ] // Páginas 1 a 3, 11 a 13 y 50 a 55
```

Una forma fácil de generar este arreglo es utilizando el siguiente script el cuál recibirá un `string` en formato humano como `1 a 3 y 11 a 13` y regresará el arreglo necesario: `[ [1, 2, 3], [11, 12, 13] ]`

```javascript
import { flattenDeep, range } from 'lodash';

const pagesHumanToArray = (humanText) => {
    const humanTextSanitized = humanText.toLowerCase().replace(/\n/g, '').replace(/\s/g, '');

    if (humanTextSanitized === '') {
        return [];
    }

    const firstLevel = flattenDeep(humanTextSanitized.split(',').map((i) => i.split('y')));
    const secondLevel = firstLevel.map((i) => {
        const thirdLevel = i.split('a').map(Number);
        if (thirdLevel.length === 1) {
            return thirdLevel.map(Number);
        }

        const [from, to] = thirdLevel;
        return range(from, to + 1).map(Number);
    });
    return secondLevel;
};
```

Ejemplos de uso:

```javascript
pagesHumanToArray('1') // [ [ 1 ] ]
pagesHumanToArray('1 y 2') // [ [ 1 ], [ 2 ] ]
pagesHumanToArray('1 a 2') // [ [ 1, 2 ] ]
pagesHumanToArray('1 a 3, 11 a 13 y 50 a 55') // [ [ 1, 2, 3 ], [ 11, 12, 13 ], [ 50, 51, 52, 53, 54, 55 ] ]
```

## Configurar URL de páginas

Las páginas de los libros construyen automáticamente su URL para poder reenderizarse según la fecha, el grado, materia y libro seleccionado.

Esta URL puede ser configurada según tu estructura de carpetas en tu servidor. Para esto es necesario modificar la variable `REACT_APP_PAGE_URL_TEMPLATE` en tu archivo `.env`.

La variable representa una plantilla según los datos disponibles al momento de generar el URL, los cuales son:

* `{grade}` - Grado escolar, entre `1` y `6`
* `{subject}` - Código de materia que puedes verificar en el archivo `src/assets/data/subjects.js`
folder : Código de folder que puedes verificar en el archivo src/assets/data/books.json según grado y materia
identifier : Código de serie que puedes verificar en el archivo src/assets/data/books.json según grado y materia
* `{page}` - Número de la página, definido en `resources.json`
* `{date}` - Fecha en el formato `YYYY/MM/DD`
* `{year}` - Año a 4 dígitos, ej `2021`
* `{month}` - Mes 1-12, formato a 1 o dos dígitos, números menores a 10 NO tienen un 0 precedente, ej `01`
* `{day}` - Día 1-31, formato a 1 o dos dígitos, números menores a 10 NO tienen un 0 precedente, ej: `01`
index : En caso de tener múltiples materias en un mismo día, este les dirá el orden de dicha materia

Puedes generar tu platilla de acuerdo a tu estructura de carpetas o nombre del archivo, por ejemplo:

```env
REACT_APP_PAGE_URL_TEMPLATE=santillana.com/pages/{date}_{grade}_{subject}_{book}_{page}.jpg
```

El anterior ejemplo dice que las imágenes estarán en la página `santillana.com` en el subdirectorio `/pages` y el resto de valores corresponde al a las variables previamente descritas.

Para el siguiente ejemplo (la configuración actual):
```env
REACT_APP_PAGE_URL_TEMPLATE=santillana.com/pages/{grade}/{folder}/{identifier}{page}.png
```

## Compilar y publicar App

Ya que la aplicación fue desarrollada con React, es necesario poder compilarla para su publicación en internet. Para esto, es necesario cumplir antes con los siguientes requisitos:

* Tener una terminal de línea de comandos (`bash` recomendado)
* Tener [NodeJS](https://nodejs.org/en/download/) v14 instalado
* Tener [Yarn](https://yarnpkg.com/getting-started/install) instalado de forma global
* Tener [GIT](https://git-scm.com/downloads) instalado para poder clonar el proyecto

Una vez teniendo todos los requisitos, lo siguiente será hacer una copia del archivo `.env.example` y renombrarlo a `.env`. En este archivo se podrán configurar varios parámetros de la aplicación.

Posterior a esto, necesitas instalar las dependencias del proyecto, para esto, abre la termina, navega hasta el directorio del proyecto y ejecuta el siguiente comando:

```bash
$ yarn install
```

Una vez esté todo listo, para compilar el proyecto ejecuta el siguiente comando en tu terminal:

```bash
$ yarn build
```

Esto generará una carpeta llamada `build` dentro del directorio del proyecto. Esta carpeta tendrá los archivos necesarios para subirlos a internet. Deberás subir todos los archivos a tu carpeta pública de tu proveedor de hosting.

Para gegnerar los empaquetados de todos los grados se deberá ejecutar el comando

```bash
$ yarn build:exportables
```

## Configurar parámetros de la aplicación

Para configurar los límites de navegación de la aplicación, es necesario establecer el rango de fechas en las variables `REACT_APP_MIN_ALLOWED_DATE` y `REACT_APP_MAX_ALLOWED_DATE` dentro del archivo `.env`. El formato de las fechas debe estar en [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601), ej:

```env
REACT_APP_MIN_ALLOWED_DATE=2021-08-01T00:00:00.000Z
REACT_APP_MAX_ALLOWED_DATE=2022-07-31T00:00:00.000Z
```

Para configurar los años visibles en la aplicación, es necesario editarlo en la variable `REACT_APP_YEAR_LIST` dentro del archivo `.env`. Los años deben estar separados por comas **SIN ESPACIOS** intermedios, ej:

```env
REACT_APP_YEAR_LIST=2021,2022,2023,2024
```
