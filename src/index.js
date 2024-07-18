console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    // Fetch and display images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById('dog-image-container');
            data.message.forEach(imgUrl => {
                const img = document.createElement('img');
                img.src = imgUrl;
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching images:', error));

    // Fetch and display breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breedList = document.getElementById('dog-breeds');
            const dropdown = document.getElementById('breed-dropdown');

            function displayBreeds(breeds) {
                breedList.innerHTML = ''; // Clear existing breeds
                breeds.forEach(breed => {
                    const li = document.createElement('li');
                    li.textContent = breed;
                    li.addEventListener('click', () => {
                        li.style.color = 'blue'; // Change to your preferred color
                    });
                    breedList.appendChild(li);
                });
            }

            const allBreeds = Object.keys(data.message);
            displayBreeds(allBreeds);

            dropdown.addEventListener('change', (event) => {
                const selectedLetter = event.target.value;
                const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
                displayBreeds(filteredBreeds);
            });
        })
        .catch(error => console.error('Error fetching breeds:', error));
});
