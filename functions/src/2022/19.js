const prod = (a, b) => a * b;

const getMaxGeodes = (time, robots, materials, currMaxGeodes, blueprint) => {
	if (time <= 0)
		return currMaxGeodes;

	currMaxGeodes = Math.max(materials.geodes, currMaxGeodes);

	const maxOreNeeded = Math.max(
		blueprint.oreRobotCost.ore,
		blueprint.clayRobotCost.ore,
		blueprint.obsidianRobotCost.ore,
		blueprint.geodeRobotCost.ore
	);

	if (robots.obsidian > 0) {
		const enoughOre = blueprint.geodeRobotCost.ore <= materials.ores;
		const enoughObsidian = blueprint.geodeRobotCost.obsidian <= materials.obsidians;
		const canBuildGeodeRobot = enoughOre && enoughObsidian;

		const timeUntilEnoughOre = Math.ceil((blueprint.geodeRobotCost.ore - materials.ores) / robots.ore);
		const timeUntilEnoughObsidian = Math.ceil((blueprint.geodeRobotCost.obsidian - materials.obsidians) / robots.obsidian);
		const timeUntilEnoughResources = Math.max(timeUntilEnoughOre, timeUntilEnoughObsidian);
		
		const totalTime = 1 + (canBuildGeodeRobot ? 0 : timeUntilEnoughResources);

		const newMaterials = {
			...materials,
			ores: materials.ores + totalTime * robots.ore - blueprint.geodeRobotCost.ore,
			clays: materials.clays + totalTime * robots.clay,
			obsidians: materials.obsidians + totalTime * robots.obsidian - blueprint.geodeRobotCost.obsidian,
			geodes: materials.geodes + time - totalTime
		};

		currMaxGeodes = Math.max(getMaxGeodes(time - totalTime, robots, newMaterials, currMaxGeodes, blueprint), currMaxGeodes);

		if (canBuildGeodeRobot)
			return currMaxGeodes;
	}

	if (robots.clay > 0) {
		const enoughOre = blueprint.obsidianRobotCost.ore <= materials.ores;
		const enoughClay = blueprint.obsidianRobotCost.clay <= materials.clays;
		const canBuildObsidianRobot = enoughOre && enoughClay;

		const timeUntilEnoughOre = Math.ceil((blueprint.obsidianRobotCost.ore - materials.ores) / robots.ore);
		const timeUntilEnoughClay = Math.ceil((blueprint.obsidianRobotCost.clay - materials.clays) / robots.clay);
		const timeUntilEnoughResources = Math.max(timeUntilEnoughOre, timeUntilEnoughClay);

		const totalTime = 1 + (canBuildObsidianRobot ? 0 : timeUntilEnoughResources);

		if (time - totalTime > 2) {

			const newRobots = {
				...robots,
				obsidian: robots.obsidian + 1
			};
			
			const newMaterials = {
				...materials,
				ores: materials.ores + totalTime * robots.ore - blueprint.obsidianRobotCost.ore,
				clays: materials.clays + totalTime * robots.clay - blueprint.obsidianRobotCost.clay,
				obsidians: materials.obsidians + totalTime * robots.obsidian
			};

			currMaxGeodes = Math.max(getMaxGeodes(time - totalTime, newRobots, newMaterials, currMaxGeodes, blueprint));
		}
	}

	if (robots.clay < blueprint.obsidianRobotCost.clay) {
		const canBuildClayRobot = blueprint.clayRobotCost.ore <= materials.ores;

		const timeUntilEnoughOre = Math.ceil((blueprint.clayRobotCost.ore - materials.ores) / robots.ore);

		const totalTime = 1 + (canBuildClayRobot ? 0 : timeUntilEnoughOre);

		if (time - totalTime > 3) {

			const newRobots = {
				...robots,
				clay: robots.clay + 1
			};

			const newMaterials = {
				...materials,
				ores: materials.ores + totalTime * robots.ore - blueprint.clayRobotCost.ore,
				clays: materials.clays + totalTime * robots.clay,
				obsidians: materials.obsidians + totalTime * robots.obsidian
			};

			currMaxGeodes = Math.max(getMaxGeodes(time - totalTime, newRobots, newMaterials, currMaxGeodes, blueprint));
		}
	}

	if (robots.ore < maxOreNeeded) {
		const canBuildOreRobot = blueprint.oreRobotCost.ore <= materials.ores;

		const timeUntilEnoughOre = Math.ceil((blueprint.oreRobotCost.ore - materials.ores) / robots.ore);

		const totalTime = 1 + (canBuildOreRobot ? 0 : timeUntilEnoughOre);

		if (time - totalTime > 4) {

			const newRobots = {
				...robots,
				ore: robots.ore + 1
			};

			const newMaterials = {
				...materials,
				ores: materials.ores + totalTime * robots.ore - blueprint.oreRobotCost.ore,
				clays: materials.clays + totalTime * robots.clay,
				obsidians: materials.obsidians + totalTime * robots.obsidian
			};

			currMaxGeodes = Math.max(getMaxGeodes(time - totalTime, newRobots, newMaterials, currMaxGeodes, blueprint));
		}
	}

	return currMaxGeodes;
};

const input = document.querySelector('pre').innerText.trim()
	.split('\n')
	.filter(l => l.length > 0);

const blueprints = input.map(line => {
	const regex = /\d+/g;
	const id = Number(regex.exec(line));
	const oreRobotCost = {
		ore: Number(regex.exec(line)),
		clay: 0,
		obsidian: 0
	};
	const clayRobotCost = {
		ore: Number(regex.exec(line)),
		clay: 0,
		obsidian: 0
	};
	const obsidianRobotCost = {
		ore: Number(regex.exec(line)),
		clay: Number(regex.exec(line)),
		obsidian: 0
	};
	const geodeRobotCost = {
		ore: Number(regex.exec(line)),
		clay: 0,
		obsidian: Number(regex.exec(line)),
	};
	return {
		id,
		oreRobotCost,
		clayRobotCost,
		obsidianRobotCost,
		geodeRobotCost
	};
}).filter(blueprint => blueprint.id <= 3);

const initialRobots = {
	ore: 1,
	clay: 0,
	obsidian: 0
};

const initialMaterials = {
	ores: 0,
	clays: 0,
	obsidians: 0,
	geodes: 0
};

const qualities1 = blueprints.map(blueprint => getMaxGeodes(24, initialRobots, initialMaterials, 0, blueprint) * blueprint.id);

const answer1 = qualities.reduce(sum);

console.log(`first number: ${answer1}`);

const qualities2 = blueprints.map(blueprint => getMaxGeodes(32, initialRobots, initialMaterials, 0, blueprint));

const answer2 = qualities.reduce(prod, 1);

console.log(`secound number: ${answer2}`);
