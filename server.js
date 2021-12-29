const express = require('express');
const app = express();
const path = require('path');
const { user } = require('pg/lib/defaults');
const { Client, Skill, ClientSkill, Op } = require('./db');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/skills', async (req, res, next) => {
    try {
        res.send(await Skill.findAll({
            include: Client
        }));
    } catch(e) {
        next(e);
    }
});

app.get('/api/clients', async (req, res, next) => {
    try {
        res.send(await Client.findAll({
            include: Skill
        }));
    } catch(e) {
        next(e);
    }
});

app.put('/api/clientSkills', async (req, res, next) => {
    try {
        if (req.body.addRemove === 'addSkill') {
            await ClientSkill.create({
                clientId: req.body.clientId,
                skillId: req.body.skillId
            });
        } else if (req.body.addRemove === 'removeSkill') {
            await ClientSkill.destroy({
                where: {
                    [Op.and]: [{
                        clientId: req.body.clientId
                    },
                    {
                        skillId: req.body.skillId
                    }]
                }
            });
        }

        const client = await Client.findByPk(req.body.clientId, {
            include: Skill
        });
        
        const skill = await Skill.findByPk(req.body.skillId, {
            include: Client
        });
        
        res.status(200).send({ client, skill });

    } catch (err) {
        next(err);
    }
});

app.put('/api/skills/:id', async (req, res, next) => {
    try {
        const skill = await Skill.findByPk(req.params.id, {
            include: Client
        });
        skill.update({
            name: req.body.name
        });
        res.status(200).send(skill);
    } catch(e) {
        next(e);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));