const SERVER_IP = "skibidicrafty.duckdns.org";

async function updateStatus() {
    const indicator = document.getElementById('status-indicator');
    const countText = document.getElementById('player-count-text');
    const playerList = document.getElementById('player-list');

    try {
    const res = await fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_IP}`);
    const data = await res.json();

    if (data.online) {
        indicator.textContent = "Online";
        indicator.className = "badge badge-online";
        countText.textContent = `${data.players.online} / ${data.players.max} jugadores conectados`;

        playerList.innerHTML = "";
        if (data.players.list && data.players.list.length > 0) {
        data.players.list.forEach(p => {
            const li = document.createElement("li");
            li.innerHTML = `<img src="https://crafatar.com/avatars/${p.uuid}?size=24&overlay" alt="${p.name_clean}"> ${p.name_clean}`;
            playerList.appendChild(li);
        });
        } else {
        playerList.innerHTML = `<li class="empty">No hay nadie conectado en este momento.</li>`;
        }
    } else {
        indicator.textContent = "Offline";
        indicator.className = "badge badge-offline";
        countText.textContent = "El servidor se encuentra fuera de línea.";
        playerList.innerHTML = `<li class="empty">Servidor apagado.</li>`;
    }
    } catch (e) {
    indicator.textContent = "Error";
    indicator.className = "badge badge-offline";
    countText.textContent = "No se pudo consultar el servidor.";
    playerList.innerHTML = `<li class="empty">Error al conectar con la API.</li>`;
    }
}

updateStatus();
setInterval(updateStatus, 30000);
