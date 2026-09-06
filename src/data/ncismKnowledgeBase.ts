export interface HerbData {
  sanskritName: string;
  botanicalName: string;
  family: string;
  rasa: string;
  virya: string;
  vipaka: string;
  prabhava?: string;
  karma: string;
  indications: string;
  toxicOrSpecial?: string;
}

export interface FormulationData {
  name: string;
  type: string; // Asava, Arishta, Vati, Taila, Ghrita, Churna, Bhasma, Rasayana
  chiefIngredient: string;
  classicalText: string;
  rogadhikara: string;
  anupana: string;
  contraindications?: string;
}

export interface MarmaData {
  name: string;
  location: string;
  structuralType: "Mamsa" | "Sira" | "Snayu" | "Asthi" | "Sandhi";
  prognosticType: "Sadhyo Pranahara" | "Kalantara Pranahara" | "Vishalyaghna" | "Vaikalyakara" | "Rujakara";
  pramana: string; // Anguli
  viddhaLakshana: string;
}

export interface MineralData {
  sanskritName: string;
  englishName: string;
  group: "Maharasa" | "Uparasa" | "Sadharanarasa" | "Dhatu" | "Ratna";
  shodhanaMedia: string;
  maranaBhavana: string;
  bhasmaColor: string;
  therapeuticUse: string;
}

export interface SamhitaSthanaData {
  samhita: "Charaka Samhita" | "Sushruta Samhita" | "Ashtanga Hridaya";
  sthana: string;
  totalChapters: number;
  prominentChapters: string[];
  chiefSubject: string;
  commentators: string[];
}

export interface DiseaseData {
  name: string;
  dosha: string;
  dushya: string;
  srotas: string;
  pradhanaLinga: string;
  chikitsaPrinciple: string;
  classicalFormulations: string[];
}

export const NCISM_HERBS: HerbData[] = [
  {
    sanskritName: "Ashwagandha",
    botanicalName: "Withania somnifera (L.) Dunal",
    family: "Solanaceae",
    rasa: "Tikta, Kashaya, Madhura",
    virya: "Ushna",
    vipaka: "Madhura",
    karma: "Balya, Rasayana, Vajikarana, Nidrajanaka, Vata-Kaphahara",
    indications: "Kshaya, Dhatudourbalya, Klaibya, Anidra, Vatavyadhi"
  },
  {
    sanskritName: "Shatavari",
    botanicalName: "Asparagus racemosus Willd.",
    family: "Asparagaceae / Liliaceae",
    rasa: "Madhura, Tikta",
    virya: "Sheeta",
    vipaka: "Madhura",
    karma: "Stanyajanana, Shukrala, Medhya, Rasayana, Pitta-Vatahara",
    indications: "Stanyakshaya, Amlapitta, Raktapitta, Yoniroga, Dhatukshaya"
  },
  {
    sanskritName: "Amalaki",
    botanicalName: "Phyllanthus emblica L. (Emblica officinalis Gaertn.)",
    family: "Phyllanthaceae / Euphorbiaceae",
    rasa: "Amla pradhana, Pancha-rasa (alavana)",
    virya: "Sheeta",
    vipaka: "Madhura",
    karma: "Tridoshahara (Pitta-shamaka pradhana), Chakshushya, Vayahsthapana",
    indications: "Prameha, Raktapitta, Amlapitta, Netraroga, Rasayana"
  },
  {
    sanskritName: "Haritaki",
    botanicalName: "Terminalia chebula Retz.",
    family: "Combretaceae",
    rasa: "Kashaya pradhana, Pancha-rasa (alavana)",
    virya: "Ushna",
    vipaka: "Madhura",
    karma: "Anulomana, Deepana, Pachana, Rasayana, Tridoshahara",
    indications: "Vibandha, Arsha, Grahani, Gulma, Udara, Shotha"
  },
  {
    sanskritName: "Bibhitaki",
    botanicalName: "Terminalia bellirica (Gaertn.) Roxb.",
    family: "Combretaceae",
    rasa: "Kashaya",
    virya: "Ushna",
    vipaka: "Madhura",
    karma: "Kaphahara, Bhedana, Chakshushya, Keshya",
    indications: "Kasa, Shwasa, Svarabheda, Netraroga, Palita"
  },
  {
    sanskritName: "Brahmi",
    botanicalName: "Bacopa monnieri (L.) Wettst.",
    family: "Plantaginaceae / Scrophulariaceae",
    rasa: "Tikta, Kashaya, Madhura",
    virya: "Sheeta",
    vipaka: "Madhura",
    karma: "Medhya, Rasayana, Ayushya, Hridya, Tridoshahara",
    indications: "Unmada, Apasmara, Manasika Mandya, Smritikshaya"
  },
  {
    sanskritName: "Mandukaparni",
    botanicalName: "Centella asiatica (L.) Urb.",
    family: "Apiaceae / Umbelliferae",
    rasa: "Tikta, Kashaya, Madhura",
    virya: "Sheeta",
    vipaka: "Madhura",
    karma: "Medhya Rasayana (one of 4 Medhya Rasayanas of Charaka)",
    indications: "Smritibhransha, Kushtha, Meha, Jwara"
  },
  {
    sanskritName: "Guggulu",
    botanicalName: "Commiphora mukul (Stocks) Hook.",
    family: "Burseraceae",
    rasa: "Tikta, Katu, Kashaya",
    virya: "Ushna",
    vipaka: "Katu",
    karma: "Medohara, Rasayana, Bhagna-sandhanakara, Vatahara",
    indications: "Amavata, Sandhivata, Medoroga, Vrana, Granthi"
  },
  {
    sanskritName: "Arjuna",
    botanicalName: "Terminalia arjuna (Roxb. ex DC.) Wight & Arn.",
    family: "Combretaceae",
    rasa: "Kashaya",
    virya: "Sheeta",
    vipaka: "Katu",
    karma: "Hridya, Sandhaniya, Vrana-ropana, Pitta-Kaphahara",
    indications: "Hridroga, Kshataksheena, Raktapitta, Prameha"
  },
  {
    sanskritName: "Nimba",
    botanicalName: "Azadirachta indica A. Juss.",
    family: "Meliaceae",
    rasa: "Tikta, Kashaya",
    virya: "Sheeta",
    vipaka: "Katu",
    karma: "Kandughna, Krimighna, Kushthaghna, Raktashodhaka",
    indications: "Kushtha, Prameha, Vrana, Krimi, Netraroga, Jwara"
  },
  {
    sanskritName: "Bhallataka",
    botanicalName: "Semecarpus anacardium L.f.",
    family: "Anacardiaceae",
    rasa: "Katu, Tikta, Kashaya",
    virya: "Ushna",
    vipaka: "Madhura",
    karma: "Kaphahara, Vatahara, Bhedana, Medhya, Rasayana",
    indications: "Arsha, Gulma, Kushtha, Kaphaja Roga",
    toxicOrSpecial: "Upavisha. Shodhana with Ishtika churna (brick powder) washing"
  },
  {
    sanskritName: "Vatsanabha",
    botanicalName: "Aconitum ferox Wall. ex Ser.",
    family: "Ranunculaceae",
    rasa: "Madhura, Tikta, Katu",
    virya: "Ushna",
    vipaka: "Katu",
    karma: "Swedana, Jwaraghna, Vedanasthapana, Yogavahi",
    indications: "Sannipata Jwara, Amavata, Katishoola",
    toxicOrSpecial: "Mahavisha. Shodhana with Gomutra or Godugdha swedana in Dola Yantra"
  },
  {
    sanskritName: "Shilajatu",
    botanicalName: "Asphaltum punjabianum (Mineral Pitch)",
    family: "Natural Mineral Exudate",
    rasa: "Tikta, Katu, Kashaya",
    virya: "Anushnasheeta (neither excessively hot nor cold)",
    vipaka: "Katu",
    karma: "Chhedana, Yogavahi, Rasayana, Medohara",
    indications: "Prameha (foremost drug), Medoroga, Mutrakrichhra, Ashmari"
  },
  {
    sanskritName: "Kutaja",
    botanicalName: "Holarrhena antidysenterica (Roth) Wall. ex A.DC.",
    family: "Apocynaceae",
    rasa: "Tikta, Kashaya",
    virya: "Sheeta",
    vipaka: "Katu",
    karma: "Stambhana, Deepana, Sangrahi, Raktashodhaka",
    indications: "Atisara, Pravahika, Raktarsha, Grahani"
  },
  {
    sanskritName: "Manjistha",
    botanicalName: "Rubia cordifolia L.",
    family: "Rubiaceae",
    rasa: "Tikta, Kashaya, Madhura",
    virya: "Ushna",
    vipaka: "Katu",
    karma: "Raktaprasadana, Varnya, Vishaghna, Pittashamaka",
    indications: "Raktadosha, Kushtha, Visarpa, Vyanga, Prameha"
  },
  {
    sanskritName: "Yashtimadhu",
    botanicalName: "Glycyrrhiza glabra L.",
    family: "Fabaceae",
    rasa: "Madhura",
    virya: "Sheeta",
    vipaka: "Madhura",
    karma: "Chakshushya, Varnya, Kanthya, Medhya, Jeevaneeya",
    indications: "Vrana, Kasa, Svarabheda, Raktapitta, Trishnadeeksha"
  },
  {
    sanskritName: "Punarnava",
    botanicalName: "Boerhavia diffusa L.",
    family: "Nyctaginaceae",
    rasa: "Madhura, Tikta, Kashaya",
    virya: "Ushna",
    vipaka: "Madhura",
    karma: "Shothahara, Mutrala, Hridya, Rasayana",
    indications: "Shotha, Pandu, Yakritroga, Vrikkaroga, Udara"
  },
  {
    sanskritName: "Shallaki",
    botanicalName: "Boswellia serrata Roxb. ex Colebr.",
    family: "Burseraceae",
    rasa: "Kashaya, Tikta, Madhura",
    virya: "Sheeta",
    vipaka: "Katu",
    karma: "Shothahara, Vedanasthapana, Sandhanakara",
    indications: "Sandhivata, Amavata, Purishaja Atisara"
  },
  {
    sanskritName: "Vidanga",
    botanicalName: "Embelia ribes Burm.f.",
    family: "Primulaceae",
    rasa: "Katu, Kashaya",
    virya: "Ushna",
    vipaka: "Katu",
    karma: "Krimighna (Foremost drug among Krimighna dravyas in Charaka)",
    indications: "Krimiroga, Udara, Shoola, Agnimandya"
  },
  {
    sanskritName: "Musta",
    botanicalName: "Cyperus rotundus L.",
    family: "Cyperaceae",
    rasa: "Tikta, Katu, Kashaya",
    virya: "Sheeta",
    vipaka: "Katu",
    karma: "Sangrahi, Deepana, Pachana, Tridoshashamaka",
    indications: "Jwara, Atisara, Grahani, Trishna, Agnimandya"
  }
];

export const NCISM_FORMULATIONS: FormulationData[] = [
  {
    name: "Chyawanprasha Avaleha",
    type: "Avaleha / Rasayana",
    chiefIngredient: "Amalaki (Phyllanthus emblica)",
    classicalText: "Charaka Samhita, Chikitsasthana 1/1",
    rogadhikara: "Kasa, Shwasa, Kshaya, Rasayana",
    anupana: "Ksheera (Milk) or Jala"
  },
  {
    name: "Arogyavardhini Vati",
    type: "Rasaushadhi / Vati",
    chiefIngredient: "Katuki (50% of the formulation) and Shuddha Parada, Gandhaka, Abhraka, Tamra, Loha Bhasma",
    classicalText: "Rasaratnasamuchchaya / Bhaishajya Ratnavali",
    rogadhikara: "Kushtha, Yakrit-Pliharoga, Medoroga, Malabaddhata",
    anupana: "Koshnajala or Dugdha"
  },
  {
    name: "Yogaraja Guggulu",
    type: "Guggulu Kalpana",
    chiefIngredient: "Shuddha Guggulu, Chitraka, Pippalimula, Triphala, Vidanga",
    classicalText: "Bhaishajya Ratnavali, Vatavyadhi Rogadhikara",
    rogadhikara: "Amavata, Sandhigata Vata, Katishoola, Sarvanga Vata",
    anupana: "Rasnasaptaka Kashaya or Koshnajala"
  },
  {
    name: "Kaishore Guggulu",
    type: "Guggulu Kalpana",
    chiefIngredient: "Shuddha Guggulu, Guduchi, Triphala, Danti, Trivrit",
    classicalText: "Bhaishajya Ratnavali, Vatarakta Rogadhikara",
    rogadhikara: "Vatarakta (Gout), Vrana, Kushtha, Prameha",
    anupana: "Manjisthadi Kashaya or Koshna Jala"
  },
  {
    name: "Sutshekhara Rasa",
    type: "Rasaushadhi (Kharaliya Rasayana)",
    chiefIngredient: "Shuddha Parada, Shuddha Gandhaka, Tamra Bhasma, Shankha Bhasma, Dhattura beeja",
    classicalText: "Yogaratnakara, Amlapitta Chikitsa",
    rogadhikara: "Amlapitta, Chhardi, Gulma, Shiroshoola, Pittaja Grahani",
    anupana: "Dugdha or Sharkara-Yukta Jala"
  },
  {
    name: "Draksharishta",
    type: "Asava / Arishta",
    chiefIngredient: "Draksha (Vitis vinifera), Dhataki pushpa, Jaggery",
    classicalText: "Sharangadhara Samhita, Madhyama Khanda 10",
    rogadhikara: "Urakshata, Kshaya, Kasa, Shwasa, Agnimandya",
    anupana: "Equal quantity of water after food"
  },
  {
    name: "Ashokarishta",
    type: "Asava / Arishta",
    chiefIngredient: "Ashoka Twak (Saraca asoca), Dhataki, Haritaki, Bibhitaki, Amalaki",
    classicalText: "Bhaishajya Ratnavali, Stri Roga Chikitsa",
    rogadhikara: "Asrigdara (Menorrhagia), Raktapradara, Yoniroga",
    anupana: "Equal quantity of water after food"
  },
  {
    name: "Saraswatarishta",
    type: "Asava / Arishta",
    chiefIngredient: "Brahmi (Bacopa monnieri), Shatavari, Vidarikanda, Haritaki, Swarna Patra/Bhasma",
    classicalText: "Bhaishajya Ratnavali, Rasayana Rogadhikara",
    rogadhikara: "Smriti Mandya, Unmada, Apasmara, Svarabheda, Shukrakshaya",
    anupana: "Equal quantity of water after food"
  },
  {
    name: "Maha Sudarshana Churna",
    type: "Churna",
    chiefIngredient: "Kiratatikta (50% of the herbal portion), Triphala, Trikatu, Haridra",
    classicalText: "Sharangadhara Samhita, Madhyama Khanda 6",
    rogadhikara: "Sarva Jwara (especially Vishama Jwara, Sannipata Jwara)",
    anupana: "Ushnodaka or Sita Jala"
  },
  {
    name: "Triphala Guggulu",
    type: "Guggulu Kalpana",
    chiefIngredient: "Haritaki, Bibhitaki, Amalaki, Pippali, Shuddha Guggulu",
    classicalText: "Sharangadhara Samhita, Madhyama Khanda 7",
    rogadhikara: "Arsha, Bhagandara, Vrana, Shotha",
    anupana: "Koshna Jala"
  },
  {
    name: "Ksheerabala Taila (101 Aavartita)",
    type: "Taila Kalpana",
    chiefIngredient: "Bala Mula Kashaya, Bala Kalka, Ksheera (Cow milk), Tila Taila",
    classicalText: "Ashtanga Hridaya, Vatarakta Chikitsa",
    rogadhikara: "Vatarakta, Pakshaghata, Indriyadaurbalya, Rasayana",
    anupana: "Ksheera or Oral drop administration / Nasya"
  },
  {
    name: "Brahmi Ghrita",
    type: "Ghrita Kalpana",
    chiefIngredient: "Brahmi Swarasa, Vacha, Kushtha, Shankhapushpi, Go-Ghrita",
    classicalText: "Charaka Samhita, Chikitsasthana 10 (Apasmara)",
    rogadhikara: "Apasmara, Unmada, Graha Roga, Smriti-Buddhikshaya",
    anupana: "Koshna Ksheera"
  }
];

export const NCISM_MARMAS: MarmaData[] = [
  {
    name: "Hridaya",
    location: "Uras (Thorax between both breasts, corresponding to the cardiac region)",
    structuralType: "Sira",
    prognosticType: "Sadhyo Pranahara",
    pramana: "4 Anguli (Pani tala)",
    viddhaLakshana: "Immediate loss of consciousness, severe dyspnea, and death within 7 days"
  },
  {
    name: "Basti",
    location: "Kati/Nabhi pradesh (Urinary bladder region)",
    structuralType: "Snayu",
    prognosticType: "Sadhyo Pranahara",
    pramana: "4 Anguli",
    viddhaLakshana: "Sudden death; if injured on one side, urine leaks causing Ashmarivat krichhra; if both sides, fatal"
  },
  {
    name: "Shira / Sthapani",
    location: "Between the eyebrows (Glabella region)",
    structuralType: "Sira",
    prognosticType: "Vishalyaghna",
    pramana: "1/2 Anguli",
    viddhaLakshana: "Patient lives as long as the Shalya (arrow/foreign body) remains; death occurs upon extraction"
  },
  {
    name: "Guda",
    location: "Anal canal & terminal rectum",
    structuralType: "Mamsa",
    prognosticType: "Sadhyo Pranahara",
    pramana: "4 Anguli",
    viddhaLakshana: "Immediate shock and death within 7 days due to profuse hemorrhage and nerve destruction"
  },
  {
    name: "Nabhi",
    location: "Umbilicus",
    structuralType: "Sira",
    prognosticType: "Sadhyo Pranahara",
    pramana: "4 Anguli",
    viddhaLakshana: "Sudden collapse and death within 7 days"
  },
  {
    name: "Adhipati",
    location: "Bregma / Vertex of skull",
    structuralType: "Sandhi",
    prognosticType: "Sadhyo Pranahara",
    pramana: "1/2 Anguli",
    viddhaLakshana: "Immediate death"
  },
  {
    name: "Kshipra",
    location: "Between great toe and second toe, and between thumb and index finger",
    structuralType: "Snayu",
    prognosticType: "Kalantara Pranahara",
    pramana: "1/2 Anguli",
    viddhaLakshana: "Convulsions (Aakshepaka) and death within 15 to 30 days"
  },
  {
    name: "Kurpara",
    location: "Elbow joint (Sandhi)",
    structuralType: "Sandhi",
    prognosticType: "Vaikalyakara",
    pramana: "3 Anguli",
    viddhaLakshana: "Kuni (contraction/flexion deformity of arm) and loss of hand function"
  },
  {
    name: "Janu",
    location: "Knee joint (Sandhi)",
    structuralType: "Sandhi",
    prognosticType: "Vaikalyakara",
    pramana: "3 Anguli",
    viddhaLakshana: "Khanjata (limping) and joint stiffness"
  },
  {
    name: "Gulpha",
    location: "Ankle joint",
    structuralType: "Sandhi",
    prognosticType: "Rujakara",
    pramana: "2 Anguli",
    viddhaLakshana: "Severe intractable pain (Ruja), stiffness, and impaired gait"
  },
  {
    name: "Manibandha",
    location: "Wrist joint",
    structuralType: "Sandhi",
    prognosticType: "Rujakara",
    pramana: "2 Anguli",
    viddhaLakshana: "Severe pain and impairment of wrist motion"
  }
];

export const NCISM_SAMHITAS: SamhitaSthanaData[] = [
  {
    samhita: "Charaka Samhita",
    sthana: "Sutrasthana",
    totalChapters: 30,
    prominentChapters: ["Deerghanjivitiya", "Apamarga Tanduliya", "Tashyashitiya", "Matrashitiya", "Yajjah Purushiya", "Dashapranayatana"],
    chiefSubject: "Fundamental principles, Swasthavritta, Shad Padartha, Dosha-Dhatu-Mala, Guna and Karma",
    commentators: ["Chakrapani Datta (Ayurveda Dipika)", "Gangadhara Roy (Jalpakalpataru)", "Yogindranath Sen (Charakopaskara)"]
  },
  {
    samhita: "Charaka Samhita",
    sthana: "Nidanasthana",
    totalChapters: 8,
    prominentChapters: ["Jwara Nidana", "Raktapitta Nidana", "Gulma Nidana", "Prameha Nidana", "Kushtha Nidana", "Shosha Nidana", "Unmada Nidana", "Apasmara Nidana"],
    chiefSubject: "Nidana Panchaka (Hetu, Purvaroopa, Roopa, Upashaya, Samprapti) of 8 major diseases",
    commentators: ["Chakrapani Datta", "Vijayaraksita (Madhu Kosha author on Madhava Nidana referenced Charaka Nidana)"]
  },
  {
    samhita: "Charaka Samhita",
    sthana: "Chikitsasthana",
    totalChapters: 30,
    prominentChapters: ["Rasayana", "Vajikarana", "Jwara Chikitsa", "Raktapitta", "Gulma", "Prameha", "Kushtha", "Rajayakshma", "Kasa", "Chhardi", "Visarpa", "Trishna", "Visha", "Madatyaya", "Vatavyadhi", "Vatarakta", "Yonivyapad"],
    chiefSubject: "Clinical medicine, classical formulations, treatment algorithms, and emergencies",
    commentators: ["Chakrapani Datta", "Driddhabala (who redacted chapters 18 to 30 of Chikitsasthana, Kalpa, and Siddhi)"]
  },
  {
    samhita: "Sushruta Samhita",
    sthana: "Sutrasthana",
    totalChapters: 46,
    prominentChapters: ["Vedotpatti", "Shishyopanayaniya", "Yantra Vidhi", "Shastra Avacharaniya", "Jalaukavacharana", "Agnikarma", "Kshara Paka", "Yogya Sutriye"],
    chiefSubject: "Surgical ethics, instrumentation, bloodletting, cautery, plastic surgery (Rhinoplasty)",
    commentators: ["Dalhana (Nibandha Samgraha)", "Gayadasa (Nyayachandrika)"]
  },
  {
    samhita: "Sushruta Samhita",
    sthana: "Sharirasthana",
    totalChapters: 10,
    prominentChapters: ["Sarvabhuta Chinta", "Shukra Shonita Shuddhi", "Garbhavakranti", "Garbhavyakarana", "Sharirasankhya Vyakaranam", "Pratyeka Marma Nirdesha", "Siravarna Vibhakti"],
    chiefSubject: "Embryology, osteology, cadaveric dissection (Avagharshana), 107 Marmas, 700 Siras",
    commentators: ["Dalhana", "Chakrapani Datta (Bhanumati commentary)"]
  },
  {
    samhita: "Ashtanga Hridaya",
    sthana: "Sutrasthana",
    totalChapters: 30,
    prominentChapters: ["Ayushkamiya", "Dinacharya", "Ritucharya", "Roganutpadaniya", "Doshadi Vijnaniya", "Shodhana Gana", "Dvividhopakramaniya"],
    chiefSubject: "Synthesis of Charaka and Sushruta principles in elegant poetry, preventive regimens",
    commentators: ["Arunadatta (Sarvangasundara)", "Hemadri (Ayurveda Rasayana)"]
  }
];

export const NCISM_MINERALS: MineralData[] = [
  {
    sanskritName: "Abhraka",
    englishName: "Mica (Biotite)",
    group: "Maharasa",
    shodhanaMedia: "Triphala Kwatha or Gomutra nirvapana (heating red hot and quenching 7 times)",
    maranaBhavana: "Dhanyabhraka prepared with Jatamansi and triturated with Arkaksheera or Gomutra, subjected to 10 to 1000 Puta (Sahasraputi Abhraka)",
    bhasmaColor: "Ishtikavarna (Brick Red / Deep Rust)",
    therapeuticUse: "Foremost Rasayana, Kshaya, Shwasa, Kasa, Prameha, Deepana"
  },
  {
    sanskritName: "Makshika (Swarna Makshika)",
    englishName: "Copper Pyrites (Chalcopyrite - CuFeS2)",
    group: "Maharasa",
    shodhanaMedia: "Matulunga Swarasa or Nimbu Swarasa and Saindhava Lavana roasting in Iron pan",
    maranaBhavana: "Kulatta Kwatha or Nimbu Swarasa with Gandhaka",
    bhasmaColor: "Tamravarna / Rakta varna (Reddish)",
    therapeuticUse: "Pandu (foremost), Prameha, Mandagni, Hridroga, Rasayana"
  },
  {
    sanskritName: "Shilajatu",
    englishName: "Black Bitumen / Mineral Pitch",
    group: "Maharasa",
    shodhanaMedia: "Triphala Kwatha, Bhrangaraja Swarasa, Suryatapi method",
    maranaBhavana: "Does not require Marana puta (used directly as Shuddha Shilajatu)",
    bhasmaColor: "N/A (Soft black tarry pitch)",
    therapeuticUse: "Sarvarogahara, Prameha, Medoroga, Rasayana"
  },
  {
    sanskritName: "Gandhaka",
    englishName: "Sulfur",
    group: "Uparasa",
    shodhanaMedia: "Melting in Cow Ghee and filtering into Cow Milk (Kurma Yantra or cloth filter)",
    maranaBhavana: "Acts as Marana agent for metals (Kajjali formation)",
    bhasmaColor: "N/A (volatile mineral, purified form is bright yellow)",
    therapeuticUse: "Kushtha (foremost), Rasayana, Parada Bandhana, Deepana"
  },
  {
    sanskritName: "Tamra",
    englishName: "Copper",
    group: "Dhatu",
    shodhanaMedia: "Heating and quenching in Taila, Takra, Kulattha Kwatha, Gomutra, Aranala (3 times each)",
    maranaBhavana: "Kajjali and Nimbu Swarasa or Snuhiksheera",
    bhasmaColor: "Krishna Varna (Black)",
    therapeuticUse: "Yakrit-Pliha roga, Kushtha, Pandu, Stholya, Netraroga, Ashta Maha Dosha free"
  },
  {
    sanskritName: "Loha (Kanta Loha / Teekshna Loha)",
    englishName: "Iron",
    group: "Dhatu",
    shodhanaMedia: "Triphala Kwatha quenching 7 times",
    maranaBhavana: "Triphala Kwatha, Gomutra, and Guggulu, Bhanupaka and Sthalipaka",
    bhasmaColor: "Pakwajambuphalavarna (Purple-Black like ripe blackberry)",
    therapeuticUse: "Panduroga (first choice), Shotha, Kaphaja roga, Vayasthapana"
  }
];

export const NCISM_DISEASES: DiseaseData[] = [
  {
    name: "Jwara (Fever)",
    dosha: "Vata, Pitta, Kapha, or Sannipataja",
    dushya: "Rasa Dhatu",
    srotas: "Rasavaha and Swedavaha Srotas",
    pradhanaLinga: "Santapa (elevated body temperature), Aruchi, Sweda-avarodha, Angamarda",
    chikitsaPrinciple: "Langhanam Jwaradau, Pachana, Svedana, Kala, Yavagu, Tikta Rasa Dravya, Virechana in Pittaja",
    classicalFormulations: ["Maha Sudarshana Churna", "Sudarshana Vati", "Amritarishta", "Jayamanagala Rasa", "Tribhuvana Kirti Rasa"]
  },
  {
    name: "Prameha (Urinary Disorders & Diabetes)",
    dosha: "Kapha (10 types), Pitta (6 types), Vata (4 types) - Total 20 types",
    dushya: "Medas, Rakta, Shukra, Ambu, Vasa, Lasika, Majja, Rasa, Ojas, Mamsa (10 Dushyas)",
    srotas: "Mutravaha and Medovaha Srotas",
    pradhanaLinga: "Prabhoota-Aavil-Mutrata (Excessive, turbid urination), Madhuryam ca tanau",
    chikitsaPrinciple: "Sthula: Samshodhana and Aptarpana; Krisha: Brimhana; Tikta-Kashaya dravya, Shilajatu, Asava",
    classicalFormulations: ["Chandraprabha Vati", "Vasantakusumakara Rasa", "Nishamalaki Churna", "Asanadi Kashaya", "Mehamudgara Vati"]
  },
  {
    name: "Tamaka Shwasa (Bronchial Asthma)",
    dosha: "Vata and Kapha",
    dushya: "Prana and Udaka",
    srotas: "Pranavaha Srotas",
    pradhanaLinga: "Krichhra Uchhvasa (paroxysmal dyspnea), Ghurghuraka (wheezing), Asino Labhate Saukhyam (orthopnea)",
    chikitsaPrinciple: "Vata-Kaphahara, Snehana with Lavana Taila, Swedana, Vamana/Virechana with Ushna Dravyas",
    classicalFormulations: ["Shwasakasa Chintamani Rasa", "Kanakasava", "Talisadi Churna", "Shringyadi Churna", "Kantakaryavaleha"]
  },
  {
    name: "Amavata (Rheumatoid Arthritis)",
    dosha: "Vata and Ama",
    dushya: "Rasa, Asthi, Sandhi",
    srotas: "Rasavaha and Asthivaha Srotas",
    pradhanaLinga: "Sandhi Shoola, Shotha, Stabdhata (morning stiffness), Angamarda, Aruchi, Trishna, Jwara",
    chikitsaPrinciple: "Langhana, Swedana (Valuka Sweda), Tikta-Deepana Dravya, Virechana, Snehapana, Basti (Kshara Basti)",
    classicalFormulations: ["Simhanada Guggulu", "Yogaraja Guggulu", "Rasnasaptaka Kwatha", "Alambushadi Churna", "Vatari Guggulu"]
  },
  {
    name: "Rajayakshma (Tuberculosis / Phthisis)",
    dosha: "Tridoshaja (Sannipataja)",
    dushya: "Sarva Dhatus (Dhatu Kshaya)",
    srotas: "Rasavaha and Sarva Srotas (Srotorodha and Dhatukshaya)",
    pradhanaLinga: "Triroopa (Amsamardha, Santapa, Karapadadaha) or Ekadasharoopa (Kasa, Jwara, Parshwashoola, Svarabheda, Atisara, etc.)",
    chikitsaPrinciple: "Balya, Brimhana, Agni Deepana, Rakshana of Purisha (Purisham Balam Hi Balinam), Mamsarasa",
    classicalFormulations: ["Chyawanprasha", "Sitopaladi Churna", "Draksharishta", "Swarna Vasantamalati Rasa", "Lakshadi Guggulu"]
  }
];
