const { Sequelize, TEXT, Op } = require('sequelize');
const db = new Sequelize('postgres://localhost/talent');
const faker = require('faker');

const Client = db.define('client', {
    name: TEXT
});

const Skill = db.define('skill', {
    name: TEXT
});

const ClientSkill = db.define('client-skills', {});

//Creates the join table 'client-skill'
Client.belongsToMany(Skill, { through: ClientSkill });
Skill.belongsToMany(Client, { through: ClientSkill });

// "create" a model for the join table so it can be edited directly


const sync = async () => {
    await db.sync({force: true});

    const users = [];
    for (let i = 0; i < 5; i++) {
        users.push(await Client.create({ name: faker.name.firstName() }));
    }

    const andrew = await Client.create({name: 'Andrew'});
    const react = await Skill.create({name: 'React'});
    const javascript = await Skill.create({name: 'JavaScript'});

    andrew.addSkill(react);
    andrew.addSkill(javascript);
    
    const skillNames = ['singing', 'dancing', 'acting', 'juggling', 'plate spinning', 'long division'];
    const skills = await Promise.all(skillNames.map(name => Skill.create({ name })));

    for(const user of users) {
        user.addSkill( skills[ Math.floor(Math.random() * skills.length) ] );
        // user.addSkill( skills[ Math.floor(Math.random() * skills.length) ] );
    }
}

sync();

module.exports = { Client, Skill, ClientSkill, Op }