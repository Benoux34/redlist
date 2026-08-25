const ASSESSMENT_SELECT = {
  assessmentId: true,
  scientificName: true,
  vernacularNameFr: true,
  categoryCode: true,
  description: true,
  descriptionSource: true,
  photoUrl: true,
  photoAttribution: true,
  photoLicense: true,
  yearPublished: true,
  possiblyExtinct: true,
  officialUrl: true,
} as const;

export { ASSESSMENT_SELECT };
