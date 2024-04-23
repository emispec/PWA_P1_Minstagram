document.addEventListener("DOMContentLoaded", function () {
  fetch("https://66268ff8052332d553234b90.mockapi.io/api/post")
    .then((response) => response.json())
    .then((data) => {
      const photoFeed = document.getElementById("photo-feed");
      if (data && data.length > 0) {
        data.sort((a, b) => b.fecha - a.fecha);
        data.forEach((photo) => {
          const photoCard = document.createElement("div");
          photoCard.className = "photo-card";
          photoCard.innerHTML = `
                    <img src="${photo.imagen}" alt="Photo">
                    <div class="photo-info">
                        <p>${photo.titulo}</p>
                        <small>${new Date(photo.fecha).toLocaleString()}</small>
                    </div>
                `;
          photoFeed.appendChild(photoCard);
        });
      } else {
        photoFeed.innerHTML = "<p>No hay fotos para mostrar.</p>";
      }
    })
    .catch((error) => {
      console.error("Error al cargar las fotos:", error);
      photoFeed.innerHTML = "<p>Error al cargar las fotos.</p>";
    });
});
