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


const tagalong = {
    rle: "21bo3b$18b4o3b$13bo2bob2o5b$13bo11b$4o8bo3bob2o5b$o3bo5b2ob2obobob5o$o" +
        "9b2obobobo2b5o$bo2bo2b2o2bo3b3o2bob2ob$6bo2bob2o12b$6bo4b2o12b$6bo2bob" +
        "2o12b$bo2bo2b2o2bo3b3o2bob2ob$o9b2obobobo2b5o$o3bo5b2ob2obobob5o$4o8bo" +
        "3bob2o5b$13bo11b$13bo2bob2o5b$18b4o3b$21bo!"
};

const blinkerPuffer2 = {
    rle: "13b3ob$12b5o$11b2ob3o$12b2o3b3$9bobo5b$2bo5bo2bo5b$b5o3bobo5b$2o3b2ob" +
        "2o7b$bo7bo7b$2b2o2bo2bo7b$10bo6b$2b2o2bo2bo7b$bo7bo7b$2o3b2ob2o7b$b5o" +
        "3bobo5b$2bo5bo2bo5b$9bobo5b3$12b2o3b$11b2ob3o$12b5o$13b3o!"
};

const frothingPuffer = {
    rle: "7bo17bo$6b3o15b3o$5b2o4b3o5b3o4b2o$3b2obo2b3o2bo3bo2b3o2bob2o$4bobo2bo" +
        "bo3bobo3bobo2bobo$b2obobobobo4bobo4bobobobob2o$b2o3bobo4bo5bo4bobo3b2o" +
        "$b3obo3bo4bobobo4bo3bob3o$2o9b2obobobob2o9b2o$12bo7bo$9b2obo7bob2o$10b" +
        "o11bo$7b2obo11bob2o$7b2o15b2o$7bobobob3ob3obobobo$6b2o3bo3bobo3bo3b2o$" +
        "6bo2bo3bobobobo3bo2bo$9b2o4bobo4b2o$5b2o4bo3bobo3bo4b2o$9bob2obo3bob2o" +
        "bo$10bobobobobobobo$12bo2bobo2bo$11bobo5bobo!"
};

const biGun = {
    rle: "11bo38b$10b2o38b$9b2o39b$10b2o2b2o34b$38bo11b$38b2o8b2o$39b2o7b2o$10b" +
        "2o2b2o18b2o2b2o10b$2o7b2o39b$2o8b2o38b$11bo38b$34b2o2b2o10b$39b2o9b$" +
        "38b2o10b$38bo!"
};

const gunstar = {
    rle: "40b2o107b$40b2o107b$40b2o107b$40bo108b$39bobo107b$39bob2o106b2$46b2o" +
        "101b$40b2o4b2o101b$40b2o107b2$60bo26b2o60b$50b2o8b3o24bo61b$50bobo10bo" +
        "21bobo61b$50bo11b2o15bo5b2o4b2o56b$78b2o11b2o56b$51b2o25bobo68b$47bo3b" +
        "o2bo37bo56b$46bo2bob3o37bobo55b$46b3obo39bo2bo55b$40b2o5bob3o37bo2bo" +
        "56b$40b2o11bo95b$40b2o22b2o23bo2bo56b$41bo22b2o25b2o56b$40bobo106b$39b" +
        "2obo12b3o91b$55bo93b$56bo92b$40b2o107b$40b2o57b3o47b2$73b2o20b3obo2bo" +
        "46b$74bo7b2o9bob3o51b$71b3o8b2o8bo6b3o47b$71bo20b2o55b2$95b2o52b$87b2o" +
        "9b2o49b$87b2o7bobo50b$43b2o52bo25bo19b2o4b$43b2o74b2o2b2ob3o10b2o4b4o$" +
        "102b2o15b2o4b4o10b2o2b2ob3o$84b2o15b3o19b2o18bo5b$43b3o34b2o2b2o2b2o" +
        "10bobo2bo2b2o39b$44b2o34bobo2bo2b2o10b2o2b2o2b2o39b$41b2o38b3o20b2o43b" +
        "$31bo9b3o38b2o45b2o9b2o7b$29bo3bo8bobo83b2obo8b2o7b$29bo3bo9b2o84bo19b" +
        "$29bobobo3bo90bobo18b$37b2o89b2o4b3o12b$31b2o6bo88bob3o3bo12b$31b2o3bo" +
        "bo91bobo2bo13b$31b2o3bo90bo2bo18b$131bo17b$18b2o12bobo26bo60b2o25b$14b" +
        "2obo2bob2o9b2o26bobo57bobo25b$14b2o2bo4bo37b2o60bo25b$19bo129b$20bobo" +
        "20b2o104b$11bo25b2o4b2o91b2o11b$11b3o23b2o52b3o42bo12b$14bo76bo42bobo" +
        "12b$13b2o27b3o47bo41b2o13b$42b2o81b2o22b$32b2o11b2o78b2o22b$32b2o10b3o" +
        "102b$43bobo103b$16bo26b2o104b$14b2o133b$15b2o132b$114b2o33b$115bo33b$" +
        "115bobo31b$31b2o83b2o31b$31bobo115b$33bo115b$33b2o114b$132b2o15b$133b" +
        "2o14b$104b2o26bo16b$103bobo43b$102b3o10b2o32b$22b2o78b2o11b2o32b$22b2o" +
        "81b2o42b$13b2o41bo47b3o27b2o13b$12bobo42bo76bo14b$12bo42b3o52b2o23b3o" +
        "11b$11b2o91b2o4b2o25bo11b$104b2o20bobo20b$129bo19b$25bo60b2o37bo4bo2b" +
        "2o14b$25bobo57bobo26b2o9b2obo2bob2o14b$25b2o60bo26bobo12b2o18b$17bo" +
        "131b$18bo2bo90bo3b2o31b$13bo2bobo91bobo3b2o31b$12bo3b3obo88bo6b2o31b$" +
        "12b3o4b2o89b2o37b$18bobo90bo3bobobo29b$19bo84b2o9bo3bo29b$7b2o8bob2o" +
        "83bobo8bo3bo29b$7b2o9b2o45b2o38b3o9bo31b$43b2o20b3o38b2o41b$39b2o2b2o" +
        "2b2o10b2o2bo2bobo34b2o44b$39b2o2bo2bobo10b2o2b2o2b2o34b3o43b$5bo18b2o" +
        "19b3o15b2o84b$3ob2o2b2o10b4o4b2o15b2o102b$4o4b2o10b3ob2o2b2o74b2o43b$" +
        "4b2o19bo25bo52b2o43b$50bobo7b2o87b$49b2o9b2o87b$52b2o95b2$55b2o20bo71b" +
        "$47b3o6bo8b2o8b3o71b$51b3obo9b2o7bo74b$46bo2bob3o20b2o73b2$47b3o57b2o" +
        "40b$107b2o40b$92bo56b$93bo55b$91b3o12bob2o39b$106bobo40b$56b2o25b2o22b" +
        "o41b$56bo2bo23b2o22b2o40b$95bo11b2o40b$56bo2bo37b3obo5b2o40b$55bo2bo" +
        "39bob3o46b$55bobo37b3obo2bo46b$56bo37bo2bo3bo47b$68bobo25b2o51b$56b2o" +
        "11b2o78b$56b2o4b2o5bo15b2o11bo50b$61bobo21bo10bobo50b$61bo24b3o8b2o50b" +
        "$60b2o26bo60b2$107b2o40b$101b2o4b2o40b$101b2o46b2$106b2obo39b$107bobo" +
        "39b$108bo40b$107b2o40b$107b2o40b$107b2o!"
};

const acorn = {
    rle: "bo5b$3bo3b$2o2b3o!"
};

const dieHard = {
    rle: "bo2b6ob4ob4ob6o2bo$2obobo5bo3bo3bo5bobob2o$2bobobobobo2bo3bo2bobobobob" +
        "o$bo2b2obobo5bo5bobob2o2bo$ob4obob3obo3bob3obob4obo$2ob3o4bobobobobobo" +
        "4b3ob2o$obo3b2o2bob7obo2b2o3bobo$o2b2obo2bobo3bo3bobo2bob2o2bo$obo5b2o" +
        "bo7bob2o5bobo$o2b2o2b4o2bo3bo2b4o2b2o2bo$2bob3o2b2ob2obob2ob2o2b3obo$" +
        "2o2bo2b2o2b2o2bo2b2o2b2o2bo2b2o$o4b2o3b2obo3bob2o3b2o4bo$obobobo2b2obo" +
        "bobobob2o2bobobobo$o4b2o6b5o6b2o4bo$bobo2b2o2b2o2bobo2b2o2b2o2bobo$o4b" +
        "2o6b5o6b2o4bo$obobobo2b2obobobobob2o2bobobobo$o4b2o3b2obo3bob2o3b2o4bo" +
        "$2o2bo2b2o2b2o2bo2b2o2b2o2bo2b2o$2bob3o2b2ob2obob2ob2o2b3obo$o2b2o2b4o" +
        "2bo3bo2b4o2b2o2bo$obo5b2obo7bob2o5bobo$o2b2obo2bobo3bo3bobo2bob2o2bo$o" +
        "bo3b2o2bob7obo2b2o3bobo$2ob3o4bobobobobobo4b3ob2o$ob4obob3obo3bob3obob" +
        "4obo$bo2b2obobo5bo5bobob2o2bo$2bobobobobo2bo3bo2bobobobobo$2obobo5bo3b" +
        "o3bo5bobob2o$bo2b6ob4ob4ob6o2bo!"
}