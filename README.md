# Rockify

Landing page dedicada al Rock Nacional Argentino: 36 artistas, 336 álbumes y
más de 3.800 canciones, con fichas de banda, discografías navegables y un
reproductor con estética de vinilo.

**En vivo:** https://guidoap87.github.io/rockify-web/

## Cómo está armado

- `index.html` — portada con la grilla de bandas
- `detalle.html` — ficha del artista y su discografía (`?id=`)
- `album.html` — tracklist de un álbum (`?artistId=&albumIndex=`)
- `script.js` — render de las tres páginas y el reproductor
- `styles.css` — estilos
- `data/artists.json` — la base de datos completa: discografías, historia, curiosidades y galería
- `index.js` — servidor Express que sirve el sitio y expone la API
- `tools/malvinas.py` — genera `img/malvinas.png`, el icono del logo (necesita Pillow)

El front lee `data/artists.json` directamente, así que el sitio funciona como
páginas estáticas (es lo que hace GitHub Pages). Si ese archivo no está
disponible, cae al servidor local en `http://localhost:3000/api/artists`.

## Correrlo local

```bash
npm install
node index.js
```

Y abrir http://localhost:3000.

## API

| Ruta                 | Devuelve                        |
| -------------------- | ------------------------------- |
| `GET /api/artists`   | Todos los artistas              |
| `GET /api/artists/:id` | Un artista por id (1 a 36)    |

## Agregar audio a una canción

En `data/artists.json` las canciones son strings. Para que una suene, se
reemplaza el string por un objeto y se deja el mp3 en `audio/`:

```json
"songs": ["Necesito", { "title": "Fuego", "file": "fuego.mp3" }]
```

## La sección de historia

Cada artista tiene `ficha` (origen, años en actividad, integrantes), `historia`
(un array de párrafos), `curiosidades` (objetos con `titulo` y `texto`) y
`galeria`. Se renderizan en `detalle.html`, arriba de la discografía, y cada
bloque se omite solo si viene vacío.

La galería usa `galeria` cuando tiene entradas. Si está vacía se arma sola con la
foto de la banda y las tapas de los discos; las tapas que falten se descartan
solas, y si no queda ninguna la sección entera no aparece. Para cargar fotos
propias alcanza con dejarlas en `img/<Banda>/` y listarlas:

```json
"galeria": [
  { "src": "img/Soda/vivo1990.jpg", "epigrafe": "Gira Animal, 1990" }
]
```
