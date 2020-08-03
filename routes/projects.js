const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const groupSchema = require('../models/Group');
const memberSchema = require('../models/Member');

module.exports = (app) => {
  // find any project with search input, with $or [{key:value},{key: value}], value, in our case is a regular expression
  // this will help make it easier to search the database for specific project if you don't completely rember the title or somthing

  app.get('/api/projects', async (req, res) => {
    console.log('req.query is ' + req.query.search);

    try {
      const projects = await Project.find({
        $or: [
          { title: { $regex: req.query.search } },
          { description: { $regex: req.query.search } },
        ],
      });

      res.send(projects);
    } catch (err) {
      console.log('catch block');
      res.send(err);
    }
  });

  // JOIN project route

  app.get('/api/projects/:id', async (req, res) => {
    console.log(req.params.id);
    const project = await Project.findById({ _id: req.params.id });
    console.log(project.groups[0]);
    res.send(project);
  });

  app.get('/api/projects/:id/groups', async (req, res) => {
    console.log(req.params.id);
    const project = await Project.findById({ _id: req.params.id });

    console.log(project.groups);
    res.send(project.groups);
  });

  // CREATE
  app.post('/api/project', requireLogin, async (req, res) => {
    const { title, description, groups } = req.body;
    const newProject = new Project({
      title,
      description,
      groups: [],
      author: { id: req.user._id, username: req.user.name },
    });

    for (let i = 0; i < groups; i++) {
      newProject.groups.push({ notes: '', members: [] });
    }

    try {
      await newProject.save();
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  // READ
  // for authenticated user dasboard
  app.get('/api/user/projects', requireLogin, async (req, res) => {
    console.log(req.user);
    const projects = await Project.find({
      author: { id: req.user._id, username: req.user.name },
    });
    console.log(projects);
    res.send(projects);
  });

  // UPDATE
  // find one project to update

  app.get('/api/project/:id/edit', requireLogin, async (req, res) => {
    let foundProject = await Project.findById(req.params.id);
    console.log(Object.keys(foundProject.groups).length);
    res.send(foundProject);
  });

  app.put('/api/project/:id', requireLogin, (req, res) => {
    let newGroups = [];
    for (let i = 0; i < req.body.groups; i++) {
      newGroups.push(groupSchema);
    }
    Project.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        groups: newGroups,
      },
      (err, updatedProject) => {
        if (err) {
          console.log(err);
          res.send('error processing update');
        } else {
          res.send(updatedProject);
        }
      }
    );
  });

  // where a person can add there name to a group
  app.post('/api/member/:projectId', async (req, res) => {
    const { name, notes, projectId, groupId } = req.body;
    const project = await Project.findById({ _id: req.body.projectId });
    project.groups
      .filter((group) => {
        return group._id == groupId;
      })[0]
      .members.push({ name, notes });
    project.save();
  });

  app.put('/api/member/:projectId', async (req, res) => {
    const { groupId, projectId, memberId, name, notes } = req.body;
    console.log(`${groupId} ${projectId} ${memberId} ${name} ${notes}`);

    let project = await Project.findById(req.params.projectId);

    project.groups
      .filter((group) => {
        return group._id == groupId;
      })[0]
      .members.push({ name, notes });

    project.groups
      .filter((group) => {
        return group._id == groupId;
      })[0]
      .members.pull(memberId);

    console.log(project.groups[0].members[0]);
    Project.findByIdAndUpdate(req.params.projectId, project, (err, doc) => {
      if (err) console.log(err);
      //console.log('this is the doc ' + doc.groups[0].members[0]);
    });
    res.send({});
  });

  app.delete('/api/project/:id', requireLogin, (req, res) => {
    Project.findByIdAndRemove({ _id: req.params.id }, (err) => {
      if (err) throw err;
      res.send('');
    });
  });
};
