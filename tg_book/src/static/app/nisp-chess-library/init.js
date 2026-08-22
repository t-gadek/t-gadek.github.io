function isCorrectMove(source, destination, type) {
    var figure = {
        source: source,
        destination: destination,
        type: type
    };

    var sourceX = parseInt(source.charAt(0));
    var sourceY = parseInt(source.charAt(2));
    var destinationX = parseInt(destination.charAt(0));
    var destinationY = parseInt(destination.charAt(2));

    const move = { sourceX, sourceY, destinationX, destinationY };

    switch(type) {
        case "PAWN": return new Pawn().validateMove(move);
        case "KING": return new King().validateMove(move);
        case "QUEEN": return new Queen().validateMove(move);
        case "ROOK": return new Rook().validateMove(move);
        case "BISHOP": return new Bishop().validateMove(move);
        case "KNIGHT": return new Knight().validateMove(move);
    }

    return false;
}

function generateChessboard() {
    var chessboardDiv = document.createElement('div');
    chessboardDiv.classList.add('chessboard', 'effect');

    var fields = [
        { class: 'white', symbol: '' },
        { class: 'black', symbol: '' },
    ];

    for (var row = 8; row >= 1; row--) {
        for (var col = 1; col <= 8; col++) {
            var fieldIndex = (row + col) % 2;
            var fieldClass = fields[fieldIndex].class;
            var fieldId = col + '_' + row;

            var fieldDiv = document.createElement('div');
            fieldDiv.classList.add('field', fieldClass);
            fieldDiv.id = fieldId;

            if (fieldId === '3_1') {
                var symbolSpan = document.createElement('span');
                symbolSpan.id = 'figure';
                symbolSpan.innerHTML = '&#9815;'; // Chess symbol for rook
                fieldDiv.appendChild(symbolSpan);
            }

            chessboardDiv.appendChild(fieldDiv);
        }
    }

    return chessboardDiv;
}

var chessboard = generateChessboard();
document.body.appendChild(chessboard);

document.addEventListener("DOMContentLoaded", function () {
    var chooseFigure = 'BISHOP';

    var figures = new Map();
    figures.set('KING', '<span id="figure">&#9812;</span>');
    figures.set('QUEEN', '<span id="figure">&#9813;</span>');
    figures.set('ROOK', '<span id="figure">&#9814;</span>');
    figures.set('BISHOP', '<span id="figure">&#9815;</span>');
    figures.set('KNIGHT', '<span id="figure">&#9816;</span>');
    figures.set('PAWN', '<span id="figure">&#9817;</span>');

    var startPosition = null;
    var destinationPosition = null;

    document.getElementById("chess").addEventListener("change", function () {
        console.log('value = ', this.value);
        chooseFigure = this.value;

        var figureElement = document.getElementById("figure");
        if (figureElement) {
            figureElement.remove();
        }

        switch (chooseFigure) {
            case 'KING': document.getElementById('5_1').innerHTML = figures.get(chooseFigure); break;
            case 'QUEEN': document.getElementById('4_1').innerHTML = figures.get(chooseFigure); break;
            case 'ROOK': document.getElementById('1_1').innerHTML = figures.get(chooseFigure); break;
            case 'BISHOP': document.getElementById('3_1').innerHTML = figures.get(chooseFigure); break;
            case 'KNIGHT': document.getElementById('2_1').innerHTML = figures.get(chooseFigure); break;
            case 'PAWN': document.getElementById('4_2').innerHTML = figures.get(chooseFigure); break;
        }
    });

    var fieldElements = document.getElementsByClassName("field");
    for (var i = 0; i < fieldElements.length; i++) {
        fieldElements[i].addEventListener("mouseup", function () {

            if (this.querySelector('#figure') !== null && startPosition === null) {
                startPosition = this.id;
                document.getElementById('figure').style.color = '#267340';
            } else if (startPosition !== null) {
                destinationPosition = this.id;

                var resultMove = isCorrectMove(startPosition, destinationPosition, chooseFigure);

                if (resultMove) {
                    document.getElementById('figure').style.color = '#000000';

                    var figureElement = document.getElementById('figure');
                    if (figureElement) {
                        figureElement.remove();
                    }
                    document.getElementById(destinationPosition).innerHTML = figures.get(chooseFigure);
                } else {
                    document.getElementById('figure').style.color = '#000000';

                    var figureElement = document.getElementById('figure');
                    if (figureElement) {
                        figureElement.remove();
                    }
                    document.getElementById(startPosition).innerHTML = figures.get(chooseFigure);
                    alert("Ruch niepoprawny!");
                }

                startPosition = null;
                destinationPosition = null;
            }
        });
    }
});