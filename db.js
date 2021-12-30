const { Sequelize, JSON, Op, TEXT } = require('sequelize');
const db = new Sequelize('postgres://localhost/talent');
const faker = require('faker');

const Client = db.define('client', {
    name: TEXT,
    username: TEXT,
    email: TEXT,
    address: JSON,
    phone: TEXT,
    website: TEXT,
    company: JSON,
    image: TEXT
});

const Skill = db.define('skill', {
    name: TEXT
});

// "create" a model for the join table so it can be edited directly
const ClientSkill = db.define('client-skills', {});

//Creates the join table 'client-skill'
Client.belongsToMany(Skill, { through: ClientSkill });
Skill.belongsToMany(Client, { through: ClientSkill });

const sync = async () => {
    await db.sync({force: true});

    const users = [];
    for (let i = 0; i < 10; i++) {
        const user = { address:{} };
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.name = `${user.firstName} ${user.lastName}`;
        user.image = faker.image.imageUrl(320, 240, 'fashion, true');
        user.email = faker.internet.email();
        user.website = faker.internet.url();
        user.phone = faker.phone.phoneNumber();
        user.address.street = faker.address.streetAddress();
        user.address.city = faker.address.cityName();
        user.address.state = faker.address.stateAbbr();
        user.address.zipcode = faker.address.zipCodeByState(user.address.state);

        users.push(await Client.create(user));
    }

    const skillNames = ['singing', 'dancing', 'acting', 'juggling', 'plate spinning', 'long division'];
    const skills = await Promise.all(skillNames.map(name => Skill.create({ name })));

    for(const user of users) {
        user.addSkill( skills[ Math.floor(Math.random() * skills.length) ], { ignoreDuplicates: true } );
        Math.random() > 0.5 ? user.addSkill( skills[ Math.floor(Math.random() * skills.length) ], { ignoreDuplicates: true } ):null;
        Math.random() > 0.5 ? user.addSkill( skills[ Math.floor(Math.random() * skills.length) ], { ignoreDuplicates: true } ):null;
        Math.random() > 0.5 ? user.addSkill( skills[ Math.floor(Math.random() * skills.length) ], { ignoreDuplicates: true } ):null;
        Math.random() > 0.5 ? user.addSkill( skills[ Math.floor(Math.random() * skills.length) ], { ignoreDuplicates: true } ):null;
    }
}

sync();

module.exports = { Client, Skill, ClientSkill, Op }