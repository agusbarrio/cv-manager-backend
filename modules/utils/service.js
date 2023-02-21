'use strict';
const { ERRORS } = require('../../core');
const _ = require('lodash');
const dbService = require('./dbService');

const validUserEntities = async (
  userId,
  {
    experiencesIds,
    contactsIds,
    educationsIds,
    projectsIds,
    introsIds,
    skillsIds,
    resumesIds,
  }
) => {
  const totalInputEntities =
    (experiencesIds?.length || 0) +
    (contactsIds?.length || 0) +
    (educationsIds?.length || 0) +
    (projectsIds?.length || 0) +
    (introsIds?.length || 0) +
    (skillsIds?.length || 0) +
    (resumesIds?.length || 0);

  const result = await dbService.getUserEntities(userId, {
    experiencesIds: _.isEmpty(experiencesIds) ? null : experiencesIds,
    contactsIds: _.isEmpty(contactsIds) ? null : contactsIds,
    educationsIds: _.isEmpty(educationsIds) ? null : educationsIds,
    projectsIds: _.isEmpty(projectsIds) ? null : projectsIds,
    introsIds: _.isEmpty(introsIds) ? null : introsIds,
    skillsIds: _.isEmpty(skillsIds) ? null : skillsIds,
    resumesIds: _.isEmpty(resumesIds) ? null : resumesIds,
  });

  if (result.length !== totalInputEntities) throw ERRORS.E403;
};

const formatIds = (ids = []) => _.map(ids, (id) => ({ id }));

module.exports = {
  validUserEntities,
  formatIds,
};
