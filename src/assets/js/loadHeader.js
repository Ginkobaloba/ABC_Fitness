document.addEventListener("DOMContentLoaded", function() {
    fetch('src/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });
});