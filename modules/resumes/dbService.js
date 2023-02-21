'use strict';
const {
  dbConnector: {
    sequelize,
    models: {
      Resume,
      ResumeSkill,
      ResumeProject,
      ResumeExperience,
      ResumeEducation,
      Experience,
      Skill,
      Project,
      Education,
      Intro,
      Contact,
    },
  },
} = require('../../core');
const _ = require('lodash');
const { MODEL_ATTRIBUTES } = require('./constants');

const dbService = {
  getAllByUser: async (userId, attributes) => {
    const result = await Resume.findAll({
      where: { userId },
      attributes,
      include: [
        { model: Experience, as: 'experiences' },
        { model: Education, as: 'educations' },
        { model: Project, as: 'projects' },
        { model: Skill, as: 'skills' },
        { model: Contact, as: 'contact' },
        { model: Intro, as: 'intro' },
      ],
    });
    return result;
  },
  editOneByUser: async (
    id,
    userId,
    {
      title,
      contactId,
      introId,
      experiencesIds = [],
      skillsIds = [],
      projectsIds = [],
      educationsIds = [],
    }
  ) => {
    const result = await sequelize.transaction(async (transaction) => {
      const resume = await Resume.findOne({
        transaction,
        where: { id, userId },
        attributes: [MODEL_ATTRIBUTES.ID.key],
      });

      resume.title = title;
      resume.contactId = contactId;
      resume.introId = introId;
      await Promise.all([
        resume.setExperiences(experiencesIds, { transaction }),
        resume.setSkills(skillsIds, { transaction }),
        resume.setProjects(projectsIds, { transaction }),
        resume.setEducations(educationsIds, { transaction }),
        resume.save(),
      ]);
      return resume;
    });
    return result;
  },

  createOneByUser: async (
    userId,
    {
      title,
      contactId,
      introId,
      resumeExperiences = [],
      resumeSkills = [],
      resumeProjects = [],
      resumeEducations = [],
    }
  ) => {
    const createdItem = await Resume.create(
      {
        title,
        contactId,
        introId,
        userId,
        resumeExperiences,
        resumeSkills,
        resumeProjects,
        resumeEducations,
      },
      {
        include: [
          {
            model: ResumeExperience,
            as: 'resumeExperiences',
          },
          {
            model: ResumeSkill,
            as: 'resumeSkills',
          },
          {
            model: ResumeProject,
            as: 'resumeProjects',
          },
          {
            model: ResumeEducation,
            as: 'resumeEducations',
          },
        ],
      }
    );
    return createdItem;
  },
  deleteOneByUser: async (id, userId) => {
    const count = await Resume.destroy({ where: { id, userId } });
    return count;
  },
  deleteAllByUser: async (userId) => {
    const count = await Resume.destroy({ where: { userId } });
    return count;
  },
};

module.exports = dbService;
