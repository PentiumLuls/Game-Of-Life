const structures = [
    {name: "glider", structure: glider, xOffset: 2, yOffset: 2},
    {name: "small exploder", structure: smallExploder, xOffset: 2, yOffset: 2},
    {name: "exploder", structure: exploder, xOffset: 5, yOffset: 5},
    {name: "10 cell row", structure: tenCellRow, xOffset: 5, yOffset: 0},
    {name: "lightweight spaceship", structure: lightweightSpaceship, xOffset: 3, yOffset: 3},
    {name: "tumbler", structure: tumbler, xOffset: 6, yOffset: 6},
    {name: "gosper glider gun", structure: gosperGliderGun, xOffset: 19, yOffset: 10},
    {name: "flower", structure: flower, xOffset: 10, yOffset: 10},
    {name: "verage", structure: verage, xOffset: 7, yOffset: 9},
    {name: "blinkerShip", structure: blinkerShip, xOffset: 10, yOffset: 12},
    {name: "boss", structure: boss, xOffset: 7, yOffset: 10},
    {name: "bunnies", structure: bunnies, xOffset: 7, yOffset: 3},
    {name: "wickstretcher", structure: wickstretcher, xOffset: 30, yOffset: 50},
    {name: "tagalong", structure: tagalong, xOffset: 15, yOffset: 10},
    {name: "blinkerPuffer2", structure: blinkerPuffer2, xOffset: 15, yOffset: 10},
    {name: "frothingPuffer", structure: frothingPuffer, xOffset: 15, yOffset: 10},
    {name: "biGun", structure: biGun, xOffset: 30, yOffset: 10},
    {name: "gunstar", structure: gunstar, xOffset: 80, yOffset: 80},
    {name: "acorn", structure: acorn, xOffset: 4, yOffset: 2},
    {name: "dieHard", structure: dieHard, xOffset: 16, yOffset: 16},
];

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
        xOffset: floor(boundary.X / 2) - floor(boundary.x / 2) + 2,
        yOffset: floor(boundary.Y / 2) - floor(boundary.y / 2) + 1
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
    const value = document.getElementById('structure-selector').value;
    for (let i = 0; i < structures.length; i++) {
        if (value === 'clear') {
            clearBoard();
            return;
        }
        if (value === 'random') {
            generateRandomBoard();
            return;
        }
        if (value === structures[i].name) {
            applyStructureToBoard(structures[i].structure, structures[i].xOffset, structures[i].yOffset);
            return;
        }
    }
    //APPLY CUSTOM STRUCTURE
    const custom = JSON.parse(localStorage.customTemplates);
    for (let i = 0; i < custom.length; i++) {
        if (custom[i].name === value) {
            applyStructureToBoard(custom[i].str, custom[i].xOffset, custom[i].yOffset);
            break;
        }
    }
}

function applyStructureToBoard(structure, xOffset, yOffset) {
    let x = Math.floor(cols / 2);
    let y = Math.floor(rows / 2);
    //STRING READING
    if (typeof structure == 'string') {
        var cellX = 0;
        var cellY = 0;
        for (let i = 0; i < structure.length; i++) {
            const cell = structure[i];
            if (cell === 'E') {
                cellX = 0;
                cellY++;
            } else {
                cellX++;
            }
            if (cell === '*')
                grid[x - xOffset + cellX][y - yOffset + cellY] = 1;
            else if (cell === '.')
                grid[x - xOffset + cellX][y - yOffset + cellY] = 0;
        }
    }
    //RLE READING
    else if (typeof structure.rle == 'string') {
        const columns = structure.rle.split("$");
        for (var i = 0; i < columns.length; i++) {
            const column = columns[i];
            var num = '';
            var cellY = i;
            var xcountOffset = 0;
            for (let j = 0; j < column.length; j++) {
                const symbol = column[j];
                try {
                    if (symbol === 'b') {
                        if (num === '')
                            num = '1';
                        for (let cellX = 0; cellX < num; cellX++) {
                            grid[x - xOffset + cellX + xcountOffset][y - yOffset + cellY] = 0;
                        }
                        xcountOffset += parseInt(num);
                        num = '';
                    } else if (symbol === 'o') {
                        if (num === '')
                            num = '1';
                        for (let cellX = 0; cellX < num; cellX++) {
                            grid[x - xOffset + cellX + xcountOffset][y - yOffset + cellY] = 1;
                        }
                        xcountOffset += parseInt(num);
                        num = '';
                    } else num += symbol;
                } catch (e) {
                }
            }
        }
    }
    //ARRAY READING
    else {
        for (let i = 0; i < structure.length; i++) {
            grid[x - xOffset + structure[i][0]][y - yOffset + structure[i][1]] = 1;
        }
    }
}