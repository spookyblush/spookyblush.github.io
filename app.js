function updateFilterCounts() {
    const checkboxes = document.querySelectorAll('#filterMenu input[type="checkbox"]');
    const tbody = document.getElementById('tableBody');
    const rows = tbody.getElementsByTagName('tr');
    
    // Initialize counts (added Porcellionides)
    const counts = {
        Armadillidium: 0,
        Oniscus: 0,
        Porcellio: 0,
        Porcellionides: 0,
        Other: 0
    };

    // Count rows for each genus
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('expandable-row')) {
            const genus = rows[i].classList[1]; // Genus is in the second class
            if (counts[genus] !== undefined) {
                counts[genus]++;
            }
        }
    }

    // Update counts in the UI
    checkboxes.forEach(checkbox => {
        const genus = checkbox.value;
        const count = counts[genus];
        const countSpan = checkbox.nextElementSibling; // The span next to the checkbox
        countSpan.textContent = `(${count})`;
    });
}

function toggleRow(row) {
    let nextRow = row.nextElementSibling;

    while (nextRow && !nextRow.classList.contains('expandable-row')) {
        if (nextRow.style.display === "table-row") {
            nextRow.style.display = "none"; 
        } else {
            nextRow.style.display = "table-row"; 
        }
        nextRow = nextRow.nextElementSibling; 
    }
    // Update filter counts each time a row is expanded or collapsed
    updateFilterCounts();
}

function filterTable() {
    const input = document.getElementById('searchBar');
    const filter = input.value.toLowerCase();
    const tbody = document.getElementById('tableBody');
    const rows = tbody.getElementsByTagName('tr');
    
    const checkboxes = document.querySelectorAll('#filterMenu input[type="checkbox"]');
    const selectedGenus = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('expandable-row')) {
            const sellerName = rows[i].innerText.toLowerCase();
            const matchesSearch = sellerName.includes(filter);
            const matchesGenus = selectedGenus.length === 0 || selectedGenus.some(genus => rows[i].classList.contains(genus));

            // Show row only if it matches both search and genus filter
            rows[i].style.display = matchesSearch && matchesGenus ? "" : "none"; 
        }
    }
    
    // Update counts after filtering
    updateFilterCounts();
}

function toggleFilterMenu() {
    const filterMenu = document.getElementById('filterMenu');
    const button = document.getElementById('toggleFilterBtn');

    if (filterMenu.style.display === "none") {
        filterMenu.style.display = "block";
        button.textContent = "Hide Filters";
        
        // Update counts when the filter menu is shown
        updateFilterCounts();
    } else {
        filterMenu.style.display = "none"; 
        button.textContent = "Show Filters"; 
    }
}

function filterByGenus() {
    // This function now just calls filterTable, handling both filters together
    filterTable();
}
