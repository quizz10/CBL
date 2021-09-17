const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const findAlbum = async searchText => {
    const res = await fetch('data/data.json');
    const tracks = await res.json();

    let matches = tracks.filter(track => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return track.name.match(regex) || track.album.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
    }
    outputHtml(matches);
};

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <a href="${match.href}">${match.album}</a>
        `).join();
        matchList.innerHTML = html;


    } else if (matches.length === 0) {
        const html = matches.map(match => `
        <p>${
            match.album
        }</p>
       
        `).join();
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => findAlbum(search.value));