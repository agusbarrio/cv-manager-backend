'use strict';

module.exports = {
  MODEL_NAME: 'Experience',
  TABLE_NAME: 'experiences',
  MODEL_ATTRIBUTES: {
    ID: 'id',
    TITLE: 'title',
    COMPANY_NAME: 'companyName',
    LOCATION: 'location',
    START_DATE: 'startDate',
    END_DATE: 'endDate',
    INDUSTRY: 'industry',
    DESCRIPTION: 'description',
    EMPLOYMENT_TYPE: 'employmentType',
    USER_ID: 'userId',
  },

  EMPLOYMENT_TYPES: {
    FULL_TIME: 'FULL_TIME',
    PART_TIME: 'PART_TIME',
    SELF_EMPLOYED: 'SELF_EMPLOYED',
    FREELANCE: 'FREELANCE',
    CONTRACT: 'CONTRACT',
    INTERNSHIP: 'INTERNSHIP',
    APPRENTICENSHIP: 'APPRENTICENSHIP',
    SEASONAL: 'SEASONAL',
  },
};
