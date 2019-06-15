// Main Functions

// --- App Initialize
function app_initialize() {

    // Check if we item library exists: Create it or copy it
    if (localStorage.getItem('itemLibrary') === null) {
        localStorage.setItem('itemLibrary', JSON.stringify(appData.itemLibrary));
    }
    else {
        appData.itemLibrary = JSON.parse(localStorage.getItem('itemLibrary'));
    }

    // Initialize Submit Listener
    $('#btn-item-add').on('click', app_item_add);

}

// Add Item and Render
function app_item_add() {
    // Get Input
    let inputItem = $('#input-item').val();

    // Input validation: Is the input field empty, if so early exit with null;
    if (inputItem === '') { return null; }

    appData.itemLibrary.push(inputItem);
    localStorage.setItem(appData.storageKey, JSON.stringify(appData.itemLibrary));

    // Clear Input Field
    $('#input-item').val('');

    // Re-Render List
    app_render_list();
}


// Remove item and re-render
function app_item_remove(index) {

    // Remove index from array, save, and re-render
    appData.itemLibrary.splice(index, 1);
    localStorage.setItem(appData.storageKey, JSON.stringify(appData.itemLibrary));

    // Re-Render List
    app_render_list();

}

// Render Item List
function app_render_list() {

    // Clear Initial Div because we're putting stuff into it regardless
    $('#item-container').empty();

    // Check if library has items in it.
    // Loop through and render each item on the dom.
    // Or render "Empty List!"
    if (appData.itemLibrary.length > 0) {
        appData.itemLibrary.forEach(function (itemValue, index) {

            // Draw up template
            let myHTML = `
            <div class="item-cell">
                <div class="item-done" onclick="app_item_remove(${index})" id="btn-item-remove">
                    <i class="fas fa-check-circle"></i>
                </div>
                <p class="item-details">
                    ${itemValue}
                </p>
            </div>`;

            // Append Item
            $('#item-container').append(myHTML);
        });
    }
    else {

        // Draw up template
        let myHTML = `
                <p class="item-empty">
                    List is empty!
                </p>`;

        // Append Item
        $('#item-container').append(myHTML);
    }
}