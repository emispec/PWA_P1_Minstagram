document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgElement = document.createElement("img");
        imgElement.src = e.target.result;
        imgElement.onload = function () {
          const maxSize = 800;
          const scaleSize = Math.min(
            1,
            maxSize / Math.max(imgElement.width, imgElement.height)
          );
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = imgElement.width * scaleSize;
          canvas.height = imgElement.height * scaleSize;
          ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/webp", 0.8);
          document.getElementById("photo-preview").src = dataUrl;
        };
        document.body.appendChild(imgElement);
        imgElement.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });

document.getElementById("confirm-photo").addEventListener("click", function () {
  const imageBase64 = document.getElementById("photo-preview").src;
  const title = document.getElementById("photo-title").value;
  const timestamp = Date.now();

  const postData = {
    imagen: imageBase64,
    titulo: title,
    fecha: timestamp,
  };

  fetch("https://66268ff8052332d553234b90.mockapi.io/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Foto publicada con éxito!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al publicar la foto.");
    });
});

document.getElementById("cancel-photo").addEventListener("click", function () {
  window.location.href = "index.html";
});
