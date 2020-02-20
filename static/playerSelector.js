const colors = {'red':'blue',
    'blue':'yellow',
    'yellow':'green',
    'green':'pink',
    'pink':'rainbow',
    'rainbow':'sunset',
    'sunset':'red',
};
const playerSelectors = document.getElementsByClassName('playerSelect');

function reloadColors() {
    const player1color = document.getElementById('player1select').dataset.color;
    const player2color = document.getElementById('player2select').dataset.color;

    document.getElementById('subbutton').value = JSON.stringify({'player1':player1color, 'player2':player2color})
}


reloadColors();

for (let selector of playerSelectors){
    selector.addEventListener('click',function () {
        const color = this.dataset.color;
        let newColor = colors[color];

        if ( document.getElementsByClassName(newColor).length > 0){
            newColor = colors[newColor];
        }

        this.dataset.color = newColor;
        this.classList.remove(color);
        this.classList.add(newColor);
        reloadColors();
    });
}