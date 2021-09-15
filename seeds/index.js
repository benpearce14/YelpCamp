const mongoose = require("mongoose");
const Campground = require("../models/campground");

const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedData = async function () {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const randomInt = Math.floor(Math.random() * 1000);
		const camp = new Campground({
			location: `${cities[randomInt].city}, ${cities[randomInt].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
		});
		await camp.save();
	}
	console.log("Database has been seeded");
};

seedData().then(() => {
	db.close();
});
