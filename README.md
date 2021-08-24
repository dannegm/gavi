# Gavi

## Cómo actualizar los datos

La aplicación utiliza una base de datos NoSQL local que opta por seguir una esructura definida para favorecer la navegación entre fechas, grados y materias.

Para modificar dichos datos, es necesario ingresar a la carpeta `<project>/src/assets/data` donde se encontrarán los siguientes archivos:

* `books.js` - Se hace el mapeo del libro con su respectivo logo
* `subjects.js` - Se añade información de las materias
* `resources.json` - Se encuentra el contenido de páginas por fechas.
### Modelos

#### `books`
Se utiliza para registrar los logos de los libros que se utilizarán en el modelo `resource`

```json
{
    "<bookname>": "path/to/book/logo.png"
}
```

#### `subject`
Se utiliza para registrar los emblemas de las materias con su respectivo icono y color además del texto que se mostrará.
También es importante hacer notar el código del subject ya que este será el identificador para poder navegar entre ellos así como representará un nodo importante en el modelo de `resource`.

```json
{
    "<subject_code>": {
        "code": "art",
        "name": "Artes",
        "color": "#e83c7f",
        "icon": "path/to/subject/icon.png"
    }
}
```

#### `resource`
Es el modelo principal de los datos, tiene una estructura anidada por `año`, `mes` y `día` así como el grado y la materia.

La materia debe de estar previamente registrada en el archivo `subjects.js`.

Dentro de cada definición de la materia, se encontrará la enseñanza del día así como el material de trabajo por libros.

Cada libro deberá especificar en el campo `type` el nombre del libro previamente definido en el archivo `books.js`.

En el campo `name` se especificará el título del libro, este puede tener formato, para ello, es necesario agregar una etiqueta `<b></b>` para hacer resaltar el texto en el color primario del grado.

En el campo `pages` se definirán las páginas disponibles del material. Puede ser solamente una página o más. La aplicación mostrará automáticamente el texto aducuado según el número de páginas.

```js
{
    "2021": { /* año */
        "08": { /* mes */
            "23": { /* día */
                "1": { /* grado */
                    "mat": { /* código de materia */
                        "learn": "lorem impsum...",
                        "books": [
                            {
                                "type": "santillana",
                                "name": "La <b>Guía</b> Santillana <b>1</b>",
                                "pages": [80, 81, ...]
                            }
                            ...
                        ]
                    }
                    ...
                }
                ...
            }
            ...
        },
        ...
    }
    ...
}
```

## Configurar URL de páginas

Las páginas de los libros construyen automáticamente su URL para poder reenderizarse según la fecha, el grado, materia y libro seleccionado.

Esta URL puede ser configurada según tu estructura de carpetas en tu servidor. Para esto es necesario modificar la variable `REACT_APP_PAGE_URL_TEMPLATE` en tu archivo `.env`.

La variable representa una plantilla según los datos disponibles al momento de generar el URL, los cuales son:

* `{date}` - Fecha en el formato `YYYY/MM/DD`
* `{year}` - Año a 4 dígitos, ej `2021`
* `{month}` - Mes a 2 dígitos, ej `08`
* `{day}` - Día a 2 dígitos, ej `09`
* `{grade}` - Grado escolar, entre `1` y `6`
* `{subject}` - Código de la materia, debe estar registrado en `subjects.js`
* `{book}` - Nombre del libro, debe estar registrado en `books.js`
* `{page}` - Número de la página, definido en `resources.json`

Puedes generar tu platilla de acuerdo a tu estructura de carpetas o nombre del archivo, por ejemplo:

```env
REACT_APP_PAGE_URL_TEMPLATE=santillana.com/pages/{date}_{grade}_{subject}_{book}_{page}.jpg
```

El anterior ejemplo dice que las imágenes estarán en la página `santillana.com` en el subdirectorio `/pages` y el resto de valores corresponde al nombre del archivo.

Para el siguiente ejemplo (la configuración actual):
```env
REACT_APP_PAGE_URL_TEMPLATE=santillana.com/paginas/{date}/{grade}/{subject}/{book}/page_{page}.png
```

... la estructura de carpetas corresponde a:
```tree
2021
├── 08
│   ├── 23
│   │   ├── 1
│   │   │   ├── mat
│   │   │   │   ├── detectives
│   │   │   │   │   ├── page_108.png
│   │   │   │   │   ├── page_109.png
│   │   │   │   │   └── page_110.png
│   │   │   │   └── santillana
│   │   │   │       ├── page_383.png
│   │   │   │       ├── page_384.png
│   │   │   ├── esp
│   │   │   └── vid
│   │   ├── 2
│   │   ├── 3
│   │   ├── 4
│   │   ├── 5
│   │   └── 6
│   ├── 24
│   ├── 25
│   ├── 26
│   ├── 27
│   └── 28
└── 09
    ├── 01
    └── 02
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

## Configurar ruta de acceso

Es posible que al compilar la aplicación y subirla a un servidor, la página te regrese un `404` o una página en blanco. Esto puede deberse a que el subdirectorio donde se publicó la aplicación sea diferente al configurado, para esto, hay que configurar esta opción en el archivo `package.json`, el campo llamado `homepage`.

Si por ejemplo, tu aplicación la publicarás en `http://mipagina.com/redesignGAVI/gavi`, necesitarás configurar de la siguiente forma:

```json
{
    "homepage": "/redesignGAVI/gavi"
}
```

Si por lo contrario, está en la raíz del proyecto, bastará con establecer este valor en `/` o simplemente borrar el campo.
