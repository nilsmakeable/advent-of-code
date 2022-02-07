import axios from 'axios';
import functions from 'firebase-functions';

const slackUrl = functions.config().slack.hookurl;
const leaderboardUrl = functions.config().adventofcode.leaderboardurl;
const sessionCookie = functions.config().adventofcode.sessioncookie;

const generateMsg = async () => {
    const req = await axios.get(leaderboardUrl, {
        headers: {
            cookie: `session=${sessionCookie}`,
        },
    });
    try {
        const data = req.data;
        const members = Object.keys(data.members).map((key: string) => {
            return { name: data.members[key].name, stars: data.members[key].stars, last: data.members[key].local_score };
        });
        members.sort((a: any, b: any) => {
            if (a.stars === b.stars) return b.last - a.last;
            return b.stars - a.stars;
        });
        let msg = '';
        let count = 1;
        members.forEach((member: any) => {
            msg += `${count}. ${member.name}: stars ${member.stars}, score: ${member.last}\n`;
            count++;
        });
        const res = await axios.post(slackUrl, {
            text: msg,
            username: 'Advent of code bot',
            icon_emoji: ':robot_face:',
        });

        if (res.status !== 200) {
            console.error(res);
        }
    } catch (err) {
        console.log(err);
    }
};

export const adventofcodeBotManual = functions.https.onRequest(async (_req, res) => {
    await generateMsg();
    res.send('Done');
});
export const adventofcodeBot = functions
    .region('europe-west2')
    .pubsub.schedule('0 12 * * *')
    .timeZone('Europe/Copenhagen')
    .onRun(async (_context) => {
        await generateMsg();
        return true;
    });
