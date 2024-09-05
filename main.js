fetch('http://localhost:3000/api/singers/', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let select = document.getElementById('select');
        let opciones2 = '';

        for (let i = 0; i < data.singers.length; i++) {
            const singer = data.singers[i];
            opciones2 += `<option value="${singer.id}">${singer.nombre}</option><br><br>`;
        }
        select.innerHTML = opciones2;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

document.getElementById('select').addEventListener('change', function() {
    const selectedArtistId = this.value;
    fetch(`http://localhost:3000/api/singers/${selectedArtistId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let menu = document.getElementById('list');
            let opciones = '';
            let albumes = data.albums || [];

            for (let j = 0; j < albumes.length; j++) {
                const album = albumes[j];
                opciones += `
                <h3>${album.titulo} <p>${album.release_date}</p></h3>
                <div id="${album.id}" class="album-container">
                    <img class="album-cover" src="${album.portada}" alt="${album.titulo}">
                    <div class="album-description">
                        <h4>Description:</h4>
                        <p>${album.description}</p>
                    </div>
                    <div class="album-songs">
                        `;

                for (let h = 0; h < album.canciones.length; h++) {
                    const cancion = album.canciones[h];
                    opciones += `<h6>Track ${h + 1}: ${cancion.titulo} (${cancion.duracion})</h6>`;
                }

                opciones += `</div>
                </div>`;
            }
            menu.innerHTML = opciones;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});