const DiscordRPC = require('discord-rpc');
const ClientId = "393636216391860224";
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
var currentSong = "";

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

var albumArt = {
    "Parachutes": "parachutes",
    "X&Y": "xy",
		"Ghost Stories": "ghoststories",
    "Viva La Vida Or Death And All His Friends": "viva",
    "Viva La Vida - Prospekt's March Edition": "viva",
		"Kaleidoscope EP": "kale",
		"A Head Full Of Dreams": "head",
		"Mylo Xyloto": "mylo",
		"A Rush Of Blood To The Head": "rush",
    "Every Teardrop is a Waterfall - Single": "movingto",
    "Night Visions (Deluxe)": "idnv",
    "Smoke + Mirrors (Deluxe)": "idsm",
    "Everything Black (feat. Mike Taylor)": "eb",
    "Hybrid Theory (U.S. Version)": "lpht",
    "One More Light": "lpoml",
    "Meteora": "lpme",
    "Minutes To Midnight": "lpmtm",
    "Monstercat 001 - Launch Week": "mcat1",
    "Monstercat 002 - Early Stage": "mcat2",
    "Monstercat 003 - Momentum": "mcat3",
    "Monstercat 004 - Identity": "mcat4",
    "Monstercat 005 - Evolution": "mcat5",
    "Monstercat 006 - Embrace": "mcat6",
    "Monstercat 007 - Solace": "mcat7",
    "Monstercat 008 - Anniversary": "mcat8",
    "Monstercat 009 - Reunion": "mcat9",
    "Monstercat 010 - Conquest": "mcat10",
    "Monstercat 011 - Revolution": "mcat11",
    "Monstercat 012 - Aftermath": "mcat12",
    "Monstercat 013 - Awakening": "mcat13",
    "Monstercat 014 - Discovery": "mcat14",
    "Monstercat 015 - Outlook": "mcat15",
    "Monstercat 016 - Expedition": "mcat16",
    "Monstercat 017 - Ascension": "mcat17",
    "Monstercat 018 - Frontier": "mcat18",
    "Monstercat 019: Endeavour": "mcat19",
    "Monstercat 020 - Altitude": "mcat20",
    "Monstercat 021 - Perspective": "mcat21",
    "Monstercat 022 - Contact": "mcat22",
    "Monstercat 023 - Voyage": "mcat23",
    "Monstercat 024 - Vanguard": "mcat24",
    "Monstercat 025 - Threshold": "mcat25",
    "Monstercat 026 - Resistance": "mcat26",
    "Monstercat 027 - Cataclysm": "mcat27",
    "Monstercat 028 - Uproar": "mcat28",
    "Monstercat 029 - Havoc": "mcat29",
    "Monstercat 030: Finale": "mcat30",
    "Monstercat Uncaged, Vol. 1": "mcatbv1",
    "Monstercat Uncaged Vol. 2": "mcatbv2",
    "Monstercat Uncaged Vol. 3": "mcatbv3",
    "Monstercat Uncaged Vol. 4": "mcatbv4",
    "Monstercat: Best of 2017": "mcat2017",
    "Ready to Fly (feat. Adam Young)": "rtf",
    "Just Like I Do": "jlid",
    "Ocean Eyes": "jayc",
    "The Blue Room": "tbr",
    "Prospekt's March": "prospm",
    "Brothers & Sisters": "bands",
    "Something Just Like This": "stjlt",
    "Up To Now": "snowpatrol",
    "The Lightning Strike (What If This Storm Ends?)": "snowpatrol",
    "Greatest Hits": "snowpatrol",
    "Final Straw": "snowpatrol",
    "Fallen Empires": "snowpatrol",
    "Eyes Open": "snowpatrol",
    "A Hundred Million Suns": "snowpatrol",
    "When It's All Over We Still Have to Clear Up": "snowpatrol",
    "Songs For Polar Bears": "snowpatrol",
    "The Click": "click",
    "Furry Gang - Single": "noshy",
    "All the Single Furries - Single": "singlefur",








};

async function updateActivity() {
	if (!rpc)
    	return;

	var fs = require('fs');
	var filepath = `${process.env.APPDATA}\\Google Play Music Desktop Player\\json_store\\playback.json`;
	if(!fs.existsSync(filepath)) {
		console.log("Can't find %APPDATA%\\Google Play Music Desktop Player\\json_store\\playback.json, do you " +
		"have Google Play Music Desktop Player installed with the JSON API enabled?");
		return;
	}
    var obj = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    console.log(obj["song"]["title"]);



    var timein = (obj["time"]["current"])/1000;
    var timeinrounded = Math.round(timein)
    console.log(timeinrounded);

    var timetotal = (obj["time"]["total"])/1000;
    var timetotalrounded = Math.round(timetotal)
    console.log(timetotalrounded);

    var epochthing = Math.round((new Date()).getTime() / 1000);
    var epochendtime = timetotalrounded - timeinrounded;
    var timeendepoch = epochthing + epochendtime;

    console.log(timeendepoch);





	if(obj["playing"] == true) {
		rpc.setActivity({
      type: 2,
			details: `Howling to: ${obj["song"]["title"]}`,
			state: `By ${obj["song"]["artist"]}`,
			largeImageKey: albumArt[obj["song"]["album"]],
      largeImageText: 'Awoooooooo',
      smallImageKey: 'playing',
      smallImageText: 'Woof! ^w^',
      endTimestamp: timeendepoch,
			instance: false,
		});
	} else {
		rpc.setActivity({
      type: 2,
      details: `Howling to: ${obj["song"]["title"]}`,
			state: `By ${obj["song"]["artist"]}`,
      largeImageText:'Awoooooooo',
      smallImageText: 'Woof! ^w^',
      smallImageKey: 'paused',
      largeImageKey: albumArt[obj["song"]["album"]],
			instance: false,
		});
	}
}

rpc.on('ready', () => {
	console.log(`Starting with clentId ${ClientId}`);

	updateActivity();

	// activity can only be set every 15 seconds
	setInterval(() => {
		updateActivity();
	}, 15e3);
});

rpc.login(ClientId).catch(console.error);
