function toggleRow(row) {
    // Get the next row to show/hide details
    let nextRow = row.nextElementSibling;

    // Loop through all following rows and toggle the display
    while (nextRow && !nextRow.classList.contains('expandable-row')) {
        // Toggle display of detail rows
        if (nextRow.style.display === "table-row") {
            nextRow.style.display = "none"; // Hide the row
        } else {
            nextRow.style.display = "table-row"; // Show the row
        }
        nextRow = nextRow.nextElementSibling; // Move to the next row
    }
}

function filterTable() {
    const input = document.getElementById('searchBar');
    const filter = input.value.toLowerCase();
    const tbody = document.getElementById('tableBody');
    const rows = tbody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        // Only filter expandable rows
        if (rows[i].classList.contains('expandable-row')) {
            const sellerName = rows[i].innerText.toLowerCase();
            rows[i].style.display = sellerName.includes(filter) ? "" : "none";
        }
    }
}
