export const specialities: string[] =  ['Emergency medicine', 'Allergy', 'Anesthesiology', 'Cardiology', 'Child and adolescent psychiatry', 'Clinical biologist', 'Clinical chemistry', 'Clinical microbiology', 'Clinical neurophysiology', 'Craniofacial surgery', 'Dermatology', 'Endocrinology', 'Family medicine', 'Digestive system surgery', 'Gastroenterology', 'General Practice', 'General surgery', 'Geriatrics', 'Hematology', 'Immunology', 'Infectious disease (medical specialty)', 'Internal medicine', 'Medical laboratory', 'Nephrology', 'Neuropsychiatry', 'Neurology', 'Neurosurgery', 'Nuclear medicine', 'Obstetrics and gynaecology', 'Occupational medicine', 'Oncology', 'Ophthalmology', 'Oral and maxillofacial surgery', 'Orthopaedics', 'Otorhinolaryngology', 'Paediatric surgery', 'Paediatrics', 'Pathology', 'Pharmacology', 'Physical medicine and rehabilitation', 'Plastic surgery', 'Podiatric surgery', 'Preventive healthcare', 'Psychiatry', 'Public health', 'Radiation Oncology', 'Radiology', 'Respiratory medicine', 'Rheumatology', 'Stomatology', 'Thoracic surgery', 'Tropical medicine', 'Urology', 'Vascular surgery', 'Venereology']

export const entitiesForRights = {
  applications: 'Reports',
  users: 'Users',
  checkupPlanPlace: 'Check up plan, place:'
}

export const initialRights = [{ entity: 'applications', create: false, update: false, read: true, delete: false }, { entity: 'users', create: false, update: false, read: false, delete: false }, { entity: 'checkupPlanPlace', create: false, update: false, read: false, delete: false }]

export const localization = {
  patientComplaints: {
    en: 'Patient complaints: ',
    ru: 'Жалоб'
  },
  patientComplaintsPlaceholder: {
    en: 'Restriction of reception in the right limbs, memory loss, violation of statics and walking',
    ru: 'Ограничение приема в правых конечностях, снижение памяти, нарушение статики и ходьбы.'
  },
  anamnesis: {
    en: 'Anamnesis: ',
    ru: 'Анамнеза'
  },
  anamnesisPlaceholder: {
    en: 'In August 2012, he received a gunshot wound to the head, immediately after the injury he was hospitalized in the Kizilyurt hospital, where he received medical and surgical treatment (craniotomy); since then he has been disabled, receives periodic outpatient treatment, inpatient treatment, rehabilitation treatment with a weak and short-term positive effect, there is a gradual progression of symptoms, he is a disabled person of the 1st group.',
    ru: 'В августе 2012 года получил огнестрельное ранение в голову, сразу после травмы был госпитализирован в Кизилюртовскую ГБ, там получал медикаментозное и оперативное лечение(трепанация черепа); с тех пор является инвалидом, получает периодическое амбулаторное лечение, стационарное лечения, реабилитационное лечение со слабым и непродолжительным положительным эффектом, отмечается постепенное прогрессирование симптоматики, является инвалидом 1й группы.'
  },
  diagnosticFindings: {
    en: 'Diagnostic findings',
    ru: 'Данные обследования'
  },
  diagnosticFindingsPlaceholder: {
    en: 'Hospital discharge summary is provided from 2012 immediately after the accident and from 2021 from the rehabilitation center, where his objective condition is described.',
    ru: 'предоставлен ВЭ от 2012 года сразу после аварии и от 2021г из реабилитационного центра, где описан DS подопечного, его объективное состояние.'
  },
  examinationType: {
    en: 'Examination type',
    ru: 'Вид обследования'
  },
  place: {
    en: 'place',
    ru: 'Место'
  },
  medicalQuestion: {
    en: 'Aim of medical examination',
    ru: 'Цель проведения обследования'
  },
  examinationPlan: {
    en: 'Add examination plan',
    ru: 'Добавить план обследования в таблицу'
  },
  show: {
    en: 'show',
    ru: 'показать'
  },
  comments: [{
    en: 'Where did the patient turn and for what help?',
    ru: 'Куда обратился пациент и с какой помощью'
  }, {
    en: 'What was provided to them, or vice versa, nothing was provided, only complaints and requests',
    ru: 'Что было им предоставлено, или наоборот, ничего не было предоставлено, только жалоюы и просьбы'
  }, {
    en: 'What work has been done',
    ru: 'Какая работа была проделана'
  }, {
    en: 'Why would this or that be recommended, on the basis of which',
    ru: 'Почему быоо рекомендовано то, или иное, на основании чего'
  }, {
    en: 'Based on the results of the work done, I consider the request of the ward (oh) justified (or not) and possible for approval (or not)',
    ru: 'Заключение: "По результатам проделанной работы считаю просьбу подопечного (ой) обоснованной (или нет) и возможной для одобрения (или нет)"'
  }],
  whereDidGo: {
    en: 'Where did the patient turn and for what help?',
    ru: 'Куда обратился пациент и с какой помощью'
  },
  whatHeGive: {
    en: 'What was provided to them, or vice versa, nothing was provided, only complaints and requests',
    ru: 'Что было им предоставлено, или наоборот, ничего не было предоставлено, только жалоюы и просьбы'
  },
  whatWorkDone: {
    en: 'What work has been done',
    ru: 'Какая работа была проделана'
  },
  whatRecommended: {
    en: 'Why would this or that be recommended, on the basis of which',
    ru: 'Почему быоо рекомендовано то, или иное, на основании чего'
  },
  basedOnFinishedWork: {
    en: 'Based on the results of the work done, I consider the request of the ward (oh) justified (or not) and possible for approval (or not)',
    ru: 'Заключение: "По результатам проделанной работы считаю просьбу подопечного (ой) обоснованной (или нет) и возможной для одобрения (или нет)"'
  },
  explanations: {
    en: 'Explanations',
    ru: 'Пояснения'
  },
  consiliumIncluding: {
    en: 'Remote concilium is lead including:',
    ru: 'Проведен дистанционный врачебный консилиум в составе:'
  },
  writeNameWhoTakePart: {
    en: 'Write name and specialities of doctors who took part in making summary',
    ru: '(указать ФИО и специальности врачей, которые участвовали в формировании заключения)'
  },
  consiliumName:{
    en:'name',
    ru:'ФИО'
  },
  specialization:{
    en:'specialization',
    ru:'специализация'
  }

}