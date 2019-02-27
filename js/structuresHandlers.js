

function saveCustomTemplate() {
    let name = prompt('Give the name of your structure:');

    //GET STRUCTURE IN STRING
    let structureStr = '';
    const boundary = findStructureBoundary();
    for (let j = boundary.y; j <= boundary.Y; j++) {
        for (let i = boundary.x; i <= boundary.X; i++) {
             if (grid[i][j] === 0)
                 structureStr += '.';
            if (grid[i][j] === 1)
                structureStr += '*';
        }
        structureStr += 'E';
    }
    const structure = {
        name: name,
        str: structureStr,
        xOffset: floor(boundary.X / 2) - floor(boundary.x / 2),
        yOffset: floor(boundary.Y / 2) - floor(boundary.y / 2)
    };
    const custom = JSON.parse(localStorage.customTemplates);
    custom.push(structure);
    localStorage.customTemplates = JSON.stringify(custom);
    addOptionsToStructureSelector();
}

function findStructureBoundary() {
    let minx = cols;
    let maxx = 0;
    let miny = rows;
    let maxy = 0;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j] === 1) {
                if (minx > i) minx = i;
                if (maxx < i) maxx = i;
                if (miny > j) miny = j;
                if (maxy < j) maxy = j;
            }
        }
    }
    return {x: minx, y: miny, X: maxx, Y: maxy};
}

function handleStructureSelector() {
    clearBoard();
    generation = 1;
    changeGenerationCounter();
    switch (document.getElementById('structure-selector').value) {
        case 'clear': {
            clearBoard();
            break;
        }
        case 'random': {
            generateRandomBoard();
            break;
        }
        case 'glider': {
            applyStructureToBoard(glider, 2, 2);
            break;
        }
        case 'small exploder': {
            applyStructureToBoard(smallExploder, 2, 2);
            break;
        }
        case 'exploder': {
            applyStructureToBoard(exploder, 5, 5);
            break;
        }
        case '10 cell row': {
            applyStructureToBoard(tenCellRow, 5, 0);
            break;
        }
        case 'lightweight spaceship': {
            applyStructureToBoard(lightweightSpaceship, 3, 3);
            break;
        }
        case 'tumbler': {
            applyStructureToBoard(tumbler, 6, 6);
            break;
        }
        case 'gosper glider gun': {
            applyStructureToBoard(gosperGliderGun, 19, 10);
            break;
        }
        case 'flower': {
            applyStructureToBoard(flower, 10, 10);
            break;
        }
        case 'verage': {
            applyStructureToBoard(verage, 7, 9);
            break;
        }
        case 'blinkerShip': {
            applyStructureToBoard(blinkerShip, 10, 12);
            break;
        }
        case 'boss': {
            applyStructureToBoard(boss, 7, 10);
            break;
        }
        case 'bunnies': {
            applyStructureToBoard(bunnies, 7, 3);
            break;
        }
        case 'wickstretcher': {
            applyStructureToBoard(wickstretcher, 30, 50);
            break;
        }

    }

}