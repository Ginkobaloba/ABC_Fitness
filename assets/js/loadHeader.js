document.addEventListener("DOMContentLoaded", function() {
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });
});