/* eslint-disable no-continue */
/* eslint-disable no-bitwise */
const start = performance.now();
let answer1 = 0;
const rows = document.querySelector('pre').innerText.trim().split(`\n`);
const parsed = [];

rows.forEach((row) => {
    const [, blueprintId, oreRobotCostOre, clayRobotCostOre, obsidianRobotCostOre, obsidianRobotCostClay, geodeRobotCostOre, geodeRobotCostObsidian] =
        /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./
            .exec(row)
            ?.map(Number) ?? [];
    parsed.push({
        blueprintId,
        oreRobotCostOre,
        clayRobotCostOre,
        obsidianRobotCostOre,
        obsidianRobotCostClay,
        geodeRobotCostOre,
        geodeRobotCostObsidian,
    });
});

const evaluateBlueprint = (blueprint, totalMinutes) => {
    const visited = [];
    const queue = [];
    queue.push({
        minutesLeft: totalMinutes,
        oreRobots: 1,
        ore: 0,
        clayRobots: 0,
        clay: 0,
        obsidianRobots: 0,
        obsidian: 0,
        geodeRobots: 0,
        geodes: 0,
    });

    let best = 0;
    for (let i = 0; i < 1e9 && queue.length > 0; i++) {
        const { minutesLeft, oreRobots, ore, clayRobots, clay, obsidianRobots, obsidian, geodeRobots, geodes } = queue.pop();

        if (minutesLeft === 0) {
            best = Math.max(geodes, best);
            continue;
        }

        const visitedKey1 = `${minutesLeft},${oreRobots},${clayRobots},${obsidianRobots},${geodeRobots}`;
        const visitedKey2 = `${ore},${clay},${obsidian},${geodes}}`;
        const isVisited = visited[visitedKey1]?.[visitedKey2];
        if (isVisited > 0) {
            continue;
        }
        if (!visited[visitedKey1]) {
            visited[visitedKey1] = [];
        }
        visited[visitedKey1][visitedKey2] = 1;

        if (blueprint.geodeRobotCostOre <= ore && blueprint.geodeRobotCostObsidian <= obsidian) {
            queue.push({
                minutesLeft: minutesLeft - 1,
                oreRobots,
                ore: ore + oreRobots - blueprint.geodeRobotCostOre,
                clayRobots,
                clay: clay + clayRobots,
                obsidianRobots,
                obsidian: obsidian + obsidianRobots - blueprint.geodeRobotCostObsidian,
                geodeRobots: geodeRobots + 1,
                geodes: geodes + geodeRobots,
            });
            continue;
        }
        let boughtRobot = false;

        if (blueprint.obsidianRobotCostClay <= clay && blueprint.obsidianRobotCostOre <= ore) {
            queue.push({
                minutesLeft: minutesLeft - 1,
                oreRobots,
                ore: ore + oreRobots - blueprint.obsidianRobotCostOre,
                clayRobots,
                clay: clay + clayRobots - blueprint.obsidianRobotCostClay,
                obsidianRobots: obsidianRobots + 1,
                obsidian: obsidian + obsidianRobots,
                geodeRobots,
                geodes: geodes + geodeRobots,
            });
            boughtRobot = true;
        }

        if (blueprint.clayRobotCostOre <= ore) {
            queue.push({
                minutesLeft: minutesLeft - 1,
                oreRobots,
                ore: ore + oreRobots - blueprint.clayRobotCostOre,
                clayRobots: clayRobots + 1,
                clay: clay + clayRobots,
                obsidianRobots,
                obsidian: obsidian + obsidianRobots,
                geodeRobots,
                geodes: geodes + geodeRobots,
            });
            boughtRobot = true;
        }

        if (blueprint.oreRobotCostOre <= ore) {
            queue.push({
                minutesLeft: minutesLeft - 1,
                oreRobots: oreRobots + 1,
                ore: ore + oreRobots - blueprint.oreRobotCostOre,
                clayRobots,
                clay: clay + clayRobots,
                obsidianRobots,
                obsidian: obsidian + obsidianRobots,
                geodeRobots,
                geodes: geodes + geodeRobots,
            });
            boughtRobot = true;
        }

        if (!boughtRobot) {
            queue.push({
                minutesLeft: minutesLeft - 1,
                oreRobots,
                ore: ore + oreRobots,
                clayRobots,
                clay: clay + clayRobots,
                obsidianRobots,
                obsidian: obsidian + obsidianRobots,
                geodeRobots,
                geodes: geodes + geodeRobots,
            });
        }
    }
    return best;
};

for (const blueprint of parsed) {
    const best = evaluateBlueprint(blueprint, 24);
    answer1 += blueprint.blueprintId * best;
}

console.info(`Answer1: ${answer1} after ${(performance.now() - start).toFixed(2)}ms`);

let answer2 = 1;
for (let i = 0; i < 3; i++) {
    const best = evaluateBlueprint(parsed[i], 32);
    answer2 *= best;
}

console.info(`Answer2: ${answer2} after ${(performance.now() - start).toFixed(2)}ms`);
