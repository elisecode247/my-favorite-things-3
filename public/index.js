window.addEventListener('DOMContentLoaded', () => {

    const addButton = document.getElementsByClassName('add-favorite-button')[0];
    const list = document.getElementsByClassName('favorites-list')[0];
    const newFavoriteInput = document.getElementsByClassName('favorite-input')[0];

    fetch('http://localhost:3000/api/v1/favorites', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            res.data && res.data.favorites.forEach(item => {
                const newListItem = document.createElement('li');
                newListItem.innerText = item;
                list.appendChild(newListItem);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    addButton.addEventListener('click', evt => {
        evt.preventDefault();
        const data = { data: newFavoriteInput.value };

        fetch('http://localhost:3000/api/v1/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                const newListItem = document.createElement('li');
                newListItem.innerText = newFavoriteInput.value;
                list.appendChild(newListItem);
                newFavoriteInput.value = '';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

});