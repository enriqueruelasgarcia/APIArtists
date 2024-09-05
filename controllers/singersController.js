const mysql = require('../db/mySQL');

module.exports = {
    listar: (req, res) => {
        const query = `
            SELECT artists.id AS singer_id, artists.name AS singer_name, artists.genre AS genre,
            albums.id AS album_id, albums.title AS album_title, albums.portada AS album_cover,
            DATE_FORMAT(albums.release_date, '%Y-%m-%d') AS album_release_date,
            albums.description AS album_description,
            songs.id AS song_id, songs.title AS song_title, songs.duration AS song_duration
            FROM artists
            LEFT JOIN albums ON artists.id = albums.artist_id
            LEFT JOIN songs ON albums.id = songs.album_id
        `;

        mysql.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }

            const data = results.reduce((acc, row) => {
                const { singer_id, singer_name, genre, album_id, album_title, album_cover, album_release_date, album_description, song_id, song_title, song_duration } = row;

                if (!acc.singers) acc.singers = [];

                let singer = acc.singers.find(s => s.id === singer_id);
                if (!singer) {
                    singer = {
                        id: singer_id,
                        nombre: singer_name,
                        genero: genre,
                        albums: []
                    };
                    acc.singers.push(singer);
                }

                if (album_id) {
                    let album = singer.albums.find(a => a.id === album_id);
                    if (!album) {
                        album = {
                            id: album_id,
                            titulo: album_title,
                            portada: album_cover,
                            release_date: album_release_date,
                            description: album_description,
                            canciones: []
                        };
                        singer.albums.push(album);
                    }

                    if (song_id) {
                        album.canciones = album.canciones || [];
                        album.canciones.push({
                            id: song_id,
                            titulo: song_title,
                            duracion: song_duration
                        });
                    }
                }

                return acc;
            }, {});

            res.json(data);
        });
    },

    buscar: (req, res) => {
        const query = `
            SELECT artists.id AS singer_id, artists.name AS singer_name, artists.genre AS genre,
            albums.id AS album_id, albums.title AS album_title, albums.portada AS album_cover,
            DATE_FORMAT(albums.release_date, '%Y-%m-%d') AS album_release_date,
            albums.description AS album_description,
            songs.id AS song_id, songs.title AS song_title, songs.duration AS song_duration
            FROM artists
            LEFT JOIN albums ON artists.id = albums.artist_id
            LEFT JOIN songs ON albums.id = songs.album_id
            WHERE artists.id = ?
        `;

        mysql.query(query, [req.params.id], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }

            const data = results.reduce((acc, row) => {
                const { singer_id, singer_name, genre, album_id, album_title, album_cover, album_release_date, album_description, song_id, song_title, song_duration } = row;

                if (!acc.singers) acc.singers = [];

                let singer = acc.singers.find(s => s.id === singer_id);
                if (!singer) {
                    singer = {
                        id: singer_id,
                        nombre: singer_name,
                        genero: genre,
                        albums: []
                    };
                    acc.singers.push(singer);
                }

                if (album_id) {
                    let album = singer.albums.find(a => a.id === album_id);
                    if (!album) {
                        album = {
                            id: album_id,
                            titulo: album_title,
                            portada: album_cover,
                            release_date: album_release_date,
                            description: album_description,
                            canciones: []
                        };
                        singer.albums.push(album);
                    }

                    if (song_id) {
                        album.canciones = album.canciones || [];
                        album.canciones.push({
                            id: song_id,
                            titulo: song_title,
                            duracion: song_duration
                        });
                    }
                }

                return acc;
            }, { singers: [] });

            res.json(data.singers[0] || {});
        });
    }
};