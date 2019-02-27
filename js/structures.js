const glider = [[0, 1], [1, 2], [2, 2], [2, 1], [2, 0]];
const smallExploder = [[1, 0], [0, 1], [1, 1], [2, 1], [0, 2], [2, 2], [1, 3]];
const exploder = [[0, 0], [2, 0], [4, 0], [0, 1], [4, 1], [0, 2], [4, 2], [0, 3], [4, 3], [0, 4], [2, 4], [4, 4]];
const tenCellRow = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]];
const lightweightSpaceship = [[1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [4, 1], [4, 2], [0, 3], [3, 3]];
const tumbler = [[1, 0], [2, 0], [4, 0], [5, 0],
    [1, 1], [2, 1], [4, 1], [5, 1],
    [2, 2], [4, 2], [0, 3], [2, 3],
    [4, 3], [6, 3],
    [0, 4], [2, 4], [4, 4], [6, 4],
    [0, 5], [1, 5], [5, 5], [6, 5]];

const gosperGliderGun = [[0, 2], [1, 2], [0, 3], [1, 3],
    [8, 3], [8, 4], [9, 2], [9, 4], [10, 2], [10, 3],
    [16, 4], [16, 5], [16, 6], [17, 4], [18, 5],
    [22, 1], [22, 2], [23, 0], [23, 2], [24, 0], [24, 1],
    [24, 12], [24, 13], [25, 12], [25, 14], [26, 12],
    [34, 0], [34, 1], [35, 0], [35, 1],
    [35, 7], [35, 8], [35, 9], [36, 7], [37, 8]];

const flower = [[0, 6], [0, 7], [1, 5], [1, 7], [2, 5], [2, 7], [3, 6],
    [5, 0], [5, 1], [5, 2], [6, 0], [6, 3], [7, 1], [7, 2],
    [5, 10], [5, 11], [6, 9], [6, 12], [7, 10], [7, 11], [7, 12],
    [9, 6], [10, 5], [10, 7], [11, 5], [11, 7], [12, 5], [12, 6]];
const verage = "......*..........E" +
    ".....*.*....E" +
    "......*.....E" +
    "............E" +
    "....*****...E" +
    "...*..*..*..E" +
    "..*.**.**.*.E" +
    "..*.*...*.*.E" +
    ".**.*...*.**E" +
    ".*..*.*.*..*E" +
    "...*.....*..E" +
    "....*****...E" +
    "......*.....";

const blinkerShip = "............*..*...............E" +
    "...........*...................E" +
    "...........*...*...............E" +
    "...**......****................E" +
    "..****.........................E" +
    ".**.**.........................E" +
    "..**.....**.***................E" +
    "........*.....**.......*....***E" +
    ".......**.......*......*....*.*E" +
    "........*.....**.......*....***E" +
    "..**.....**.***................E" +
    ".**.**.........................E" +
    "..****.........................E" +
    "...**......****................E" +
    "...........*...*...............E" +
    "...........*...................E" +
    "............*..*...............E";

const boss = "......*..........E" +
    ".....*.*....E" +
    ".....*.*....E" +
    "....**.**...E" +
    "...*.....*..E" +
    "..*.*.*.*.*.E" +
    "..*.*...*.*.E" +
    ".**.*...*.**E" +
    ".*..*.*.*..*E" +
    "...*.....*..E" +
    "....**.**...E" +
    ".....*.*....E" +
    ".....*.*....E" +
    "......*.....";

const bunnies = ".*.....*.E" +
    "...*...*.E" +
    "...*..*.*E" +
    "..*.*....";

const wickstretcher = {
    rle: "24b3o$23b6o$22boob5o$23boo4bo$$27bo$27boobo$27b3o$25boo$9bobo12boobo$" +
        "8bobbo11boo$7boo15bobo$6bo3bo14bo$5b3obo16bo$bboo24boo$bo3b5o6bo11bo$o" +
        "3bo8b4o7b3o$o5boo5boo8b5obo$3o3b4obo10boob3obboo$bo7boobboo8boo$boo8bo" +
        "3bo$bobo8b3o$boobbo8b4o8bobo$bbobo13bo5boboo$14b3o6bo$bboo9bo4bo4bo3bo" +
        "$bbobboo5bo3boo5boobbo$3bo8bo3bo$3bo3bo4bo3boo7bobbo$4bo8bo4bo$5b3o6b" +
        "3o6b3o$18bo3bobbobo$5b3o4b6o3bo5bo$4bo7bo8bobbobo$3bo3boobo3boo4bobbo$" +
        "3bobb3obo3bobbobboobo$3b3obobbo3b3o6bo$4boo3boo8boboo11boo$4bo5b10obbo" +
        "10bobbobbo$3bobbo14bo12bob4o$4bo5b10o3bo7b4o7boo$4boo3boo8bobo9bo3bob" +
        "oobobbo5bo$3b3obobbo3b3o17booboobooboboobobo$3bobb3obo3bobbobboo3boobo" +
        "13bobboboobbo$3bo3boobo3boo5bob4obobob5ob3o4bo3boobboo$4bo7bo5bo7bob3o" +
        "bbobobobob4ob3obboobbo$5b3o4b14obboobbo4bobo4bo4bo3bobo$30bo6boobbo3bo" +
        "bo3b3oboo$5b3o4b14obboobbo4bobo4bo4bo3bobo$4bo7bo5bo7bob3obbobobobob4o" +
        "b3obboobbo$3bo3boobo3boo5bob4obobob5ob3o4bo3boobboo$3bobb3obo3bobbobb" +
        "oo3boobo13bobboboobbo$3b3obobbo3b3o17booboobooboboobobo$4boo3boo8bobo" +
        "9bo3boboobobbo5bo$4bo5b10o3bo7b4o7boo$3bobbo14bo12bob4o$4bo5b10obbo10b" +
        "obbobbo$4boo3boo8boboo11boo$3b3obobbo3b3o6bo$3bobb3obo3bobbobboobo$3bo" +
        "3boobo3boo4bobbo$4bo7bo8bobbobo$5b3o4b6o3bo5bo$18bo3bobbobo$5b3o6b3o6b" +
        "3o$4bo8bo4bo$3bo3bo4bo3boo7bobbo$3bo8bo3bo$bbobboo5bo3boo5boobbo$bboo" +
        "9bo4bo4bo3bo$14b3o6bo$bbobo13bo5boboo$boobbo8b4o8bobo$bobo8b3o$boo8bo" +
        "3bo$bo7boobboo8boo$3o3b4obo10boob3obboo$o5boo5boo8b5obo$o3bo8b4o7b3o$b" +
        "o3b5o6bo11bo$bboo24boo$5b3obo16bo$6bo3bo14bo$7boo15bobo$8bobbo11boo$9b" +
        "obo12boobo$25boo$27b3o$27boobo$27bo$$23boo4bo$22boob5o$23b6o$24b3o!"
};

const tagalong = "21bo3b$18b4o3b$13bo2bob2o5b$13bo11b$4o8bo3bob2o5b$o3bo5b2ob2obobob5o$o" +
    "9b2obobobo2b5o$bo2bo2b2o2bo3b3o2bob2ob$6bo2bob2o12b$6bo4b2o12b$6bo2bob" +
    "2o12b$bo2bo2b2o2bo3b3o2bob2ob$o9b2obobobo2b5o$o3bo5b2ob2obobob5o$4o8bo" +
    "3bob2o5b$13bo11b$13bo2bob2o5b$18b4o3b$21bo!";