window.addEventListener('load', (event) => {
    document.getElementById('moveButton').addEventListener('click', moveChoiseEvent);
    document.getElementById('attackButton').addEventListener('click', meleeAttack);
    document.getElementById('skillSelectionButton').addEventListener('click', skillSelection);
    document.getElementById('nextTurnButton').addEventListener('click', NextTurn);

});
