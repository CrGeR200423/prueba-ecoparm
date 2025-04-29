function filtrarTabla() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#tabla-emergencia tr");

    rows.forEach(row => {
        let entidad = row.cells[0].textContent.toLowerCase();
        row.style.display = entidad.includes(input) ? "" : "none";
    });
}
