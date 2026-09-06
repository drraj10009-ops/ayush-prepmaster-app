import { MCQQuestion } from "../types";

export const CANONICAL_QUESTIONS: MCQQuestion[] = [
  {
    id: "cq-001",
    subject: "Charaka Samhita",
    topic: "Sutrasthana - Deerghanjivitiya Adhyaya",
    question: "According to Acharya Charaka in Deerghanjivitiya Adhyaya (Cha. Su. 1), which among the following is the correct definition and order of 'Shad Padartha' (Six Categories) propounded by Sage Kanada and adopted in Ayurveda?",
    questionHindi: "दीर्घञ्जीवितीय अध्याय (चरक सूत्रस्थान १) के अनुसार आचार्य चरक द्वारा वर्णित एवं आयुर्वेद में स्वीकृत 'षट् पदार्थों' का प्रामाणिक क्रम एवं स्वरूप निम्नलिखित में से कौन-सा है?",
    options: [
      "Samanya, Vishesha, Guna, Dravya, Karma, Samavaya",
      "Dravya, Guna, Karma, Samanya, Vishesha, Samavaya",
      "Samanya, Vishesha, Dravya, Guna, Karma, Samavaya",
      "Karya, Karana, Samanya, Vishesha, Dravya, Guna"
    ],
    optionsHindi: [
      "सामान्य, विशेष, गुण, द्रव्य, कर्म, समवाय",
      "द्रव्य, गुण, कर्म, सामान्य, विशेष, समवाय",
      "सामान्य, विशेष, द्रव्य, गुण, कर्म, समवाय",
      "कार्य, कारण, सामान्य, विशेष, द्रव्य, गुण"
    ],
    correctAnswer: 0,
    explanation: "Acharya Charaka in Sutrasthana Chapter 1 (Shloka 28-29) enumerates the Karana Padarthas starting with: 'Samanyam cha Vishesham cha Gunam Dravyani Karma cha | Samavayam cha tajjnyatva...' Here, Samanya and Vishesha are placed foremost because all Ayurvedic therapeutics (Dhatu Samya Kriya) depend directly on the principle of Samanya (Vriddhi karana) and Vishesha (Hrasa hetu).",
    explanationHindi: "चरक सूत्रस्थान १/२८-२९ के अनुसार: 'सामान्यं च विशेषं च गुणान् द्रव्याणि कर्म च। समवायं च तज्ज्ञात्वा तन्त्रोक्तं विधिमास्थितः॥' आयुर्वेद में चिकित्सा का मूल प्रयोजन धातुसाम्य क्रिया है, जो सामान्य (वृद्धि का कारण) एवं विशेष (ह्रास का कारण) सिद्धान्त पर आश्रित होने के कारण चरक ने सामान्य-विशेष को सर्वप्रथम स्थान दिया है।",
    classicalReference: "Charaka Samhita, Sutrasthana 1/28-29",
    difficulty: "Medium",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Order mnemonic: S-V-G-D-K-S. Note that Vaisheshika Darshana puts Dravya first, but Charaka uniquely puts Samanya-Vishesha first for therapeutic utility.",
    sanskritTerm: "सामान्यं च विशेषं च गुणान् द्रव्याणि कर्म च"
  },
  {
    id: "cq-002",
    subject: "Charaka Samhita",
    topic: "Chikitsasthana - Jwara Chikitsa",
    question: "In the management of Taruna Jwara (Acute Fever up to 7 days), which of the following therapeutic measures is strictly CONTRAINDICATED according to Charaka?",
    questionHindi: "तरुण ज्वर (प्रथमावस्था - १ से ७ दिन तक) की चिकित्सा में आचार्य चरक के अनुसार निम्नलिखित में से कौन-सा उपक्रम सर्वथा निषिद्ध (वर्जित) है?",
    options: [
      "Langhana (Fasting/Light Diet)",
      "Svedana (Sudation)",
      "Snehana and Kashaya Pana (Astringent Decoctions)",
      "Ushnodaka Pana (Warm Water)"
    ],
    optionsHindi: [
      "लङ्घन (उपवास / लघु आहार)",
      "स्वेदन (मृदु स्वेद)",
      "स्नेहन एवं कषाय रस पान (कषाय क्वाथ)",
      "उष्णोदक पान (गुनगुना जल)"
    ],
    correctAnswer: 2,
    explanation: "In Taruna Jwara, the Doshas are Ama-Yukta (unripened/undigested). Administering Snehana (oleation) or Kashaya Rasa decoctions early locks the Ama in the Dhatus ('Ama-dosha-stambhaka'), leading to Vishama Jwara or severe complications. Langhana, Svedana, Kala (time), and Yavagu are the prescribed early protocols.",
    explanationHindi: "तरुण ज्वर में दोष आमयुक्त होते हैं। आमावस्था में स्नेहन या कषाय रस का सेवन कराने से स्तम्भन होकर दोष धातुओं में लीन हो जाते हैं (दोषस्तम्भक), जिससे विषमज्वर आदि उपद्रव उत्पन्न होते हैं। अतः ज्वरादौ लङ्घनं, स्वेदनं, कालो यवाग्वस्तिक्तको रसः का विधान है।",
    classicalReference: "Charaka Samhita, Chikitsasthana 3/138-142",
    difficulty: "Hard",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Classic Shloka: 'Jwaradau Langhanam Proktam Jwaramadhye tu Pachanam | Jwarante Bheshajam Dadyat...' Do not give Kashaya decoctions in the first 7 days.",
    sanskritTerm: "ज्वरादौ लङ्घनं प्रोक्तं"
  },
  {
    id: "cq-003",
    subject: "Sushruta Samhita",
    topic: "Sutrasthana - Yantra & Shastra Vidhi",
    question: "Acharya Sushruta describes 101 Yantras and 20 Shastras. Which Yantra is designated as the 'Pradhana' (Foremost) Yantra among all, and what is the justification given?",
    questionHindi: "आचार्य सुश्रुत ने १०१ यन्त्र एवं २० शस्त्रों का वर्णन किया है। इनमें से समस्त यन्त्रों में 'प्रधानतम यन्त्र' किसे माना गया है तथा उसका क्या कारण बताया गया है?",
    options: [
      "Sandamsha Yantra (Tweezers) because it can grip minute foreign bodies",
      "Kanka-mukha Yantra because it resembles a heron's beak",
      "Kanka-mukha Yantra because it is universally applicable in deep wounds",
      "Hasta (The Surgeon's Hand) because all other yantras depend on the hand for their application"
    ],
    optionsHindi: [
      "संदंश यन्त्र - क्योंकि यह सूक्ष्म शल्य को ग्रहण कर सकता है",
      "कङ्कमुख यन्त्र - क्योंकि यह कङ्क पक्षी के मुख सदृश है",
      "कङ्कमुख यन्त्र - क्योंकि यह गम्भीर शल्य निर्हरण में उत्तम है",
      "हस्त (शल्य चिकित्सक का हाथ) - क्योंकि हस्त के बिना किसी भी यन्त्र का प्रयोग संभव नहीं है"
    ],
    correctAnswer: 3,
    explanation: "Acharya Sushruta states in Sutrasthana Chapter 7: 'Tatra sarvayantranam Pradhanam tam Hastam eva | Kasmad-hetoriti chet, Hastamrite yantranam-apravritteh...' The surgeon's hand is the foremost yantra because no instrument can function without the physical and intellectual guidance of the hand.",
    explanationHindi: "सुश्रुत सूत्रस्थान ७/३ में स्पष्ट कहा गया है: 'तत्र सर्वयन्त्राणां प्रधानतमं हस्तमेव, कुतः? हस्तमृते यन्त्राणामप्रवृत्तेः, हस्ताधीनत्वाच्च यन्त्रकर्मणाम्।' समस्त यन्त्र हस्त के अधीन होकर ही कार्य करते हैं, अतः हस्त ही प्रधानतम यन्त्र है।",
    classicalReference: "Sushruta Samhita, Sutrasthana 7/3",
    difficulty: "Easy",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Remember: Total Yantras = 101; Total Shastras = 20. Pradhana Yantra = Hasta; Pradhana Shastra = Mandalaagra/Vridhipatra based on incision type.",
    sanskritTerm: "तत्र सर्वयन्त्राणां प्रधानतमं हस्तमेव"
  },
  {
    id: "cq-004",
    subject: "Sushruta Samhita",
    topic: "Sharirasthana - Pratyeka Marma Nirdesha",
    question: "A trauma victim arrives with an injury to the 'Hridaya' Marma. Based on Acharya Sushruta's classification, what is the anatomical structure (Vastu) and prognostic outcome (Pramana) of Hridaya Marma?",
    questionHindi: "एक आघात (Trauma) रोगी 'हृदय' मर्म पर चोट के साथ उपस्थित होता है। आचार्य सुश्रुत के वर्गीकरण के आधार पर हृदय मर्म का संरचनात्मक भेद (रचना) एवं सद्यस्क परिणाम (परिणाम) क्या है?",
    options: [
      "Snayu Marma and Kalantara Pranahara (death within 15-30 days)",
      "Sira Marma and Sadhyo Pranahara (immediate death within 7 days)",
      "Mamsa Marma and Vaikalyakara (permanent disability)",
      "Sandhi Marma and Rujakara (chronic intractable pain)"
    ],
    optionsHindi: [
      "स्नायु मर्म एवं कालान्तर प्राणहर (१५ से ३० दिन में मृत्यु)",
      "सिरा मर्म एवं सद्यः प्राणहर (७ दिन के भीतर तत्काल मृत्यु)",
      "मांस मर्म एवं वैकल्यकर (स्थायी अङ्ग विकलता)",
      "संधि मर्म एवं रुजाकर (निरन्तर तीव्र वेदना)"
    ],
    correctAnswer: 1,
    explanation: "Hridaya is classified as a Sira Marma (vascular structure) and is one of the 19 'Sadhyo Pranahara Marmas'. Injury to Hridaya causes immediate death within 7 days due to loss of Ojas, Chetana, and collapse of Rasavaha/Pranavaha Srotas.",
    explanationHindi: "सुश्रुत शारीरस्थान ६ के अनुसार हृदय सिरा मर्म है तथा १९ 'सद्यः प्राणहर' मर्मों में परिगणित है। हृदय पर आघात होने से ओज, चेतना एवं रसवह-प्राणवह स्रोतों का नाश होकर सप्तरात्राभ्यन्तर (७ दिन के भीतर) मृत्यु हो जाती है।",
    classicalReference: "Sushruta Samhita, Sharirasthana 6/9-15",
    difficulty: "Clinical Vignette",
    examType: ["NEXT", "AIAPGET"],
    highYieldTip: "Sushruta classifies 107 Marmas: Sadhyo Pranahara (19), Kalantara Pranahara (33), Vishalyaghna (3), Vaikalyakara (44), Rujakara (8). Hridaya, Basti, and Shira are the 3 Trimarmas.",
    sanskritTerm: "सद्यःप्राणहराणि एकोनविंशतिः"
  },
  {
    id: "cq-005",
    subject: "Dravyaguna Vijnana (Pharmacognosy)",
    topic: "Rasa-Panchaka & Important Plants",
    question: "Regarding 'Guduchi' (Tinospora cordifolia (Willd.) Miers), identify the correct set of Rasa, Virya, Vipaka, and specific Prabhava recognized by NCISM and classical texts:",
    questionHindi: "शास्त्रीय वनौषधि 'गुडूची' (Tinospora cordifolia) के सन्दर्भ में NCISM एवं शास्त्रीय ग्रन्थों द्वारा मान्य रस, वीर्य, विपाक एवं कर्म का सही युग्म कौन-सा है?",
    options: [
      "Tikta-Kashaya Rasa, Ushna Virya, Madhura Vipaka, and Vayahsthapana/Rasayana",
      "Katu-Tikta Rasa, Sheeta Virya, Katu Vipaka, and Vishaghna",
      "Madhura-Amla Rasa, Ushna Virya, Amla Vipaka, and Dipana",
      "Kashaya-Lavana Rasa, Sheeta Virya, Madhura Vipaka, and Medhya"
    ],
    optionsHindi: [
      "तिक्त-कषाय रस, उष्ण वीर्य, मधुर विपाक, वयःस्थापन / रसायन कर्म",
      "कटु-तिक्त रस, शीत वीर्य, कटु विपाक, विषघ्न कर्म",
      "मधुर-अम्ल रस, उष्ण वीर्य, अम्ल विपाक, दीपन कर्म",
      "कषाय-लवण रस, शीत वीर्य, मधुर विपाक, मेध्य कर्म"
    ],
    correctAnswer: 0,
    explanation: "Guduchi possesses Tikta and Kashaya Rasa, Laghu-Snigdha Guna, Ushna Virya (unusual for Tikta dravyas, hence called an exception/vichitra pratyayarabdha), and Madhura Vipaka. It acts as a Tridoshaghna, Rasayana, Medhya, and Jwaraghna.",
    explanationHindi: "भावप्रकाश निघण्टु (गुडूच्यादि वर्ग ८-१०) के अनुसार: 'गुडूची कटुका तिक्ता स्वादुपाका रसायनी। सङ्ग्राहिणी कषायोष्णा लघ्वी बल्याऽग्निदीपनी॥' गुडूची तिक्त रस होते हुए भी उष्ण वीर्य एवं मधुर विपाक युक्त होती है (विचित्र प्रत्यारब्ध), अतः यह त्रिदोषशामक एवं रसायन है।",
    classicalReference: "Bhavaprakasha Nighantu, Guduchyadi Varga Shloka 8-10",
    difficulty: "Medium",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Guduchi is famous for Ushna Virya with Madhura Vipaka, making it safe for Pitta despite Ushna virya due to its Madhura vipaka.",
    sanskritTerm: "गुडूची कटुका तिक्ता स्वादुपाका रसायनी"
  },
  {
    id: "cq-006",
    subject: "Rasa Shastra & Bhaishajya Kalpana",
    topic: "Parada Samanya Shodhana & Ashta Samskaras",
    question: "During the purification (Samanya Shodhana) of Parada (Mercury), which combination of ingredients is used for trituration (Mardana) to remove Visha, Vahni, and Mala doshas?",
    questionHindi: "पारद के सामान्य शोधन की शास्त्रीय विधि में पारद के विष, वह्नि एवं मल दोषों के निवारण हेतु मर्दन में प्रयुक्त होने वाले मुख्य द्रव्य कौन-से हैं?",
    options: [
      "Kumari Swarasa and Haridra Churna for 7 days",
      "Sudha Churna (Lime), Lashuna (Garlic), and Saindhava Lavana",
      "Triphala Kashaya and Gomutra for 3 days",
      "Nirgundi Swarasa and Tankana Bhasma"
    ],
    optionsHindi: [
      "कुमारी स्वरस एवं हरिद्रा चूर्ण (७ दिन तक)",
      "सुधा चूर्ण (चूना), लशुन कल्क एवं सैन्धव लवण",
      "त्रिफला क्वाथ एवं गोमूत्र (३ दिन तक)",
      "निर्गुण्डी स्वरस एवं टंकण भस्म"
    ],
    correctAnswer: 1,
    explanation: "In standard Ayurvedic pharmacopoeial Samanya Shodhana of Parada, Parada is triturated with Sudha Churna (Chuna) for 3 days to remove Kanchuka dosha, followed by washing and triturating with Lashuna Kalka (equal quantity) and Saindhava Lavana (half quantity) until the paste turns black, then washed with warm water.",
    explanationHindi: "रसतरंगिणी (तरंग ५/२८-३३) के अनुसार पारद को पहले सुधा चूर्ण (चूना) के साथ ३ दिन खरल कर कंचुक दोष दूर करते हैं। तदुपरान्त समभाग लशुन कल्क एवं अर्धांश सैन्धव लवण के साथ कजली सदृश कृष्ण वर्ण होने तक मर्दन कर उष्णोदक से प्रक्षालन करते हैं।",
    classicalReference: "Rasatarangini, Taranga 5/28-33",
    difficulty: "Hard",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Remember sequence: Sudha churna (Chuna) -> Lashuna + Saindhava -> Dhauti with warm water until clear.",
    sanskritTerm: "सूतशोधनविधिः लशुनैः सैन्धवेन च"
  },
  {
    id: "cq-007",
    subject: "Roganidana & Vikriti Vijnana (Pathology)",
    topic: "Ashtavidha Pariksha & Nadi Vijnana",
    question: "A 45-year-old male with chronic anxiety and irregular bowel habits undergoes Nadi Pariksha (Pulse Examination). If the pulse movement resembles that of a 'Sarpa' (Serpent) or 'Jalauka' (Leech), which Dosha predominance does this indicate?",
    questionHindi: "नाड़ी परीक्षा के समय यदि नाड़ी की गति 'सर्प' या 'जलौका' (जोंक) के समान वक्रगामी प्रतीत होती है, तो यह किस प्रधान दोष का लक्षण है?",
    options: [
      "Kapha Dosha (Mandooka Gati)",
      "Pitta Dosha (Kaka/Kapotadi Gati)",
      "Vata Dosha (Sarpa/Jalauka Gati)",
      "Sannipataja Dosha (Karkata Gati)"
    ],
    optionsHindi: [
      "कफ दोष (मण्डूक गति)",
      "पित्त दोष (काक / कपोत गति)",
      "वात दोष (सर्प / जलौका गति - वक्रगामी)",
      "सन्निपात दोष (कर्कट गति)"
    ],
    correctAnswer: 2,
    explanation: "Yogaratnakara and Basavarajeeyam state: 'Vatena vakragamanam Sarpavad Jalaukavad' (Vata pulse moves tortuously like a snake or leech). Pitta pulse leaps rapidly like a frog (Mandooka/Kaka gati). Kapha pulse moves slowly and majestically like a swan or pigeon (Hamsa/Kapota/Gaja gati).",
    explanationHindi: "योगरत्नाकर नाड़ी परीक्षा प्रकरण के अनुसार: 'वातेन वक्रगा नाडी सर्पवज्जालौकावत्। पित्तेनोत्प्लुत्य गमना मण्डूकस्येव काकवत्। कफेन मन्दगमना हंसपारावतादिवत्॥' अतः वक्रगामी सर्प-जलौका गति वात प्रकोप का निश्चित लक्षण है।",
    classicalReference: "Yogaratnakara, Nadi Pariksha Prakarana Shloka 14-16",
    difficulty: "Medium",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Vata = Sarpa/Jalauka (wriggling); Pitta = Mandooka/Kaka (jumping); Kapha = Hamsa/Gaja/Paravata (slow, bounding).",
    sanskritTerm: "वातेन वक्रगा नाडी सर्पवज्जलौकावत्"
  },
  {
    id: "cq-008",
    subject: "Kayachikitsa (Internal Medicine)",
    topic: "Prameha Chikitsa & Upadrava",
    question: "A 52-year-old obese patient with polyuria, turbid urine, and sweet taste in mouth is diagnosed with Kaphaja Prameha. According to Charaka, what is the fundamental Chikitsa Sutra for 'Sthula Pramehi' versus 'Krisha Pramehi'?",
    questionHindi: "प्रमेह चिकित्सा में आचार्य चरक के अनुसार 'स्थूल प्रमेही' एवं 'कृश प्रमेही' का मूलभूत चिकित्सा-सूत्र क्या निर्धारित किया गया है?",
    options: [
      "Sthula Pramehi requires Samshodhana followed by Aptarpana; Krisha Pramehi requires Brimhana and Santarpana",
      "Both require vigorous Langhana and Vamana every week",
      "Sthula Pramehi requires Snehapana; Krisha Pramehi requires Tikshna Virechana",
      "Both should strictly undergo Raktamokshana and Shirodhara"
    ],
    optionsHindi: [
      "स्थूल प्रमेही में संशोधन एवं अपतर्पण; कृश प्रमेही में बृंहण एवं संतर्पण",
      "दोनों में प्रति सप्ताह तीव्र लङ्घन एवं वमन",
      "स्थूल प्रमेही में स्नेहपान; कृश प्रमेही में तीक्ष्ण विरेचन",
      "दोनों में रक्तमोक्षण एवं शिरोधारा का अनिवार्य प्रयोग"
    ],
    correctAnswer: 0,
    explanation: "Charaka explicitly bifurcates Prameha management: Sthula Balavan Pramehi must be managed with Samshodhana (Vamana/Virechana) followed by Aptarpana (depleting diet, Shilajatu, Asava/Arishta). Krisha Durbala Pramehi should never be given strong evacuation, but rather Brimhana (nourishing, restorative therapy) to preserve Dhatus and Ojas.",
    explanationHindi: "चरक चिकित्सास्थान ६/१५-१६ के अनुसार: 'स्थूलः प्रमेही बलवानिहैको कृशस्तथैकः परिदुर्बलश्च। संशोध्य संशाम्यत एव पूर्वः, कृशस्तु संबृंहयितव्य एव॥' स्थूल बलवान प्रमेही का संशोधन एवं अपतर्पण किया जाता है, जबकि कृश दुर्बल प्रमेही की धातु रक्षा हेतु केवल बृंहण चिकित्सा की जाती है।",
    classicalReference: "Charaka Samhita, Chikitsasthana 6/15-16",
    difficulty: "Clinical Vignette",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Clinical Golden Rule: Never administer strong purificatory therapies (Samshodhana) in Krisha Pramehi; prioritize Dhatu protection.",
    sanskritTerm: "स्थूलः प्रमेही बलवानिहैको कृशस्तथैकः परिदुर्बलश्च"
  },
  {
    id: "cq-009",
    subject: "Shalya Tantra (Surgery)",
    topic: "Kshara Sutra & Bhagandara",
    question: "In the preparation of standard Ayurvedic 'Kshara Sutra' for the management of Bhagandara (Fistula-in-ano), what is the exact classical sequence and number of coatings used?",
    questionHindi: "भगन्दर (Fistula-in-ano) की चिकित्सा में प्रयुक्त मानक 'क्षार सूत्र' के निर्माण में धागे पर लेप (Coatings) का शास्त्रीय क्रम एवं कुल संख्या क्या है?",
    options: [
      "7 coatings of Snuhi Ksheera, 7 coatings of Apamarga Kshara, 7 coatings of Haridra Churna (Total 21 coatings)",
      "11 coatings of Snuhi Ksheera alone, followed by 10 coatings of Guggulu",
      "11 coatings of Snuhi Ksheera, 7 coatings of Snuhi Ksheera + Apamarga Kshara, 3 coatings of Snuhi Ksheera + Haridra Churna (Total 21 coatings)",
      "5 coatings of Arka Ksheera, 5 coatings of Tankana, 5 coatings of Nimba"
    ],
    optionsHindi: [
      "७ लेप स्नुही क्षीर, ७ लेप अपामार्ग क्षार, ७ लेप हरिद्रा चूर्ण (कुल २१ लेप)",
      "११ लेप केवल स्नुही क्षीर, तत्पश्चात १० लेप गुग्गुलु",
      "११ लेप स्नुही क्षीर, ७ लेप स्नुही क्षीर + अपामार्ग क्षार, ३ लेप स्नुही क्षीर + हरिद्रा चूर्ण (कुल २१ लेप)",
      "५ लेप अर्क क्षीर, ५ लेप टंकण, ५ लेप निम्ब"
    ],
    correctAnswer: 2,
    explanation: "Standard CCRAS / NCISM validated Kshara Sutra preparation involves linen thread (Barbour's surgical linen #20) receiving 21 total coatings: First 11 coatings of pure Snuhi Ksheera (Euphorbia neriifolia), followed by 7 coatings of Snuhi Ksheera mixed with Apamarga Kshara (Achyranthes aspera), and finally 3 coatings of Snuhi Ksheera mixed with fine Haridra Churna (Curcuma longa).",
    explanationHindi: "CCRAS एवं NCISM द्वारा मान्य प्रामाणिक क्षार सूत्र निर्माण विधि में बार्बर लिनेन सूत्र २० पर कुल २१ लेप किए जाते हैं: प्रथम ११ लेप शुद्ध स्नुही क्षीर के, द्वितीय ७ लेप स्नुही क्षीर + अपामार्ग क्षार के, तथा अन्तिम ३ लेप स्नुही क्षीर + सूक्ष्म हरिद्रा चूर्ण के किए जाते हैं।",
    classicalReference: "Chakradatta Bhagandara Chikitsa / CCRAS Standard Pharmacopoeia",
    difficulty: "Hard",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Remember coating distribution: 11 (pure Snuhi) + 7 (Snuhi + Apamarga Kshara) + 3 (Snuhi + Haridra) = 21 coatings. Haridra gives antiseptic color and minimizes irritation.",
    sanskritTerm: "स्नुहीक्षीरं क्षारश्च हरिद्रा च"
  },
  {
    id: "cq-010",
    subject: "Shalakya Tantra (ENT & Ophthalmology)",
    topic: "Netra Rogas & Sandhigata Rogas",
    question: "A 30-year-old female presents with a painless, cystic swelling at the Kaninika Sandhi (medial canthus of the eye) discharging non-purulent watery fluid without burning sensation. According to Sushruta, what is the diagnosis and its treatment?",
    questionHindi: "कनीनिका सन्धि (Medial Canthus) पर मन्द वेदना युक्त, शोथ रहित, बिना दाह का ग्रन्थि-सदृश श्वेत पिच्छिल स्राव करने वाला रोग आचार्य सुश्रुत के अनुसार कौन-सा है एवं उसकी शल्य चिकित्सा क्या है?",
    options: [
      "Puyalasa - Treated by Bhedana and Kshara application",
      "Upanaha - Treated by Chedana and scraping",
      "Jalasrava (Netra Nadi) - Treated with Siravedha",
      "Parvani - Treated with Lekhana"
    ],
    optionsHindi: [
      "पूयालस - भेदन एवं क्षार प्रयोग द्वारा",
      "उपनाह - छेदन एवं प्रच्छान द्वारा",
      "जलस्राव (नेत्र नाड़ी) - सिरावेध द्वारा",
      "पर्वणी - लेखन द्वारा"
    ],
    correctAnswer: 1,
    explanation: "Acharya Sushruta describes 9 Sandhigata Rogas. Upanaha is a cystic swelling at the inner canthus (Kaninika Sandhi), firm, painless or mildly tender, without suppurative discharge, classified as a Kaphaja disease, and its surgical management is Chedana (excision).",
    explanationHindi: "सुश्रुत उत्तरतन्त्र अध्याय ८ के अनुसार कनीनिका सन्धि पर कफज उपनाह रोग होता है, जिसमें ग्रन्थि के समान शोथ होता है और इसकी प्रधान चिकित्सा छेदन (Excision) कर्म है।",
    classicalReference: "Sushruta Samhita, Uttaratantra 8/12-14",
    difficulty: "Clinical Vignette",
    examType: ["NEXT", "AIAPGET"],
    highYieldTip: "Sandhigata Rogas total = 9 (Puyalasa, Upanaha, 4 types of Netra Srava: Puya, Shleshma, Rakta, Pitta, and Parvani, Alaji, Krimigranthi).",
    sanskritTerm: "उपनाहः कनीनिकामध्यगतः"
  },
  {
    id: "cq-011",
    subject: "Prasuti Tantra & Stri Roga (Obs & Gynae)",
    topic: "Yonivyapad & Garbhini Charya",
    question: "A 28-year-old married woman complains of persistent unctuous, white, painless vaginal discharge with mild pruritus. According to Charaka, which Yonivyapad is characterized by 'Picchila, Sheeta, Pandu varna Srava' caused by Kapha?",
    questionHindi: "आचार्य चरक के अनुसार पिच्छिल, शीतल, मन्द वेदना युक्त एवं पाण्डु वर्ण (श्वेत) स्राव किस कफज योनि व्यापद् का प्रधान लक्षण है?",
    options: [
      "Shlaeshimiki (Kaphaja) Yonivyapad",
      "Upapluta Yonivyapad",
      "Paripluta Yonivyapad",
      "Karnini Yonivyapad"
    ],
    optionsHindi: [
      "श्लैष्मिकी (कफज) योनि व्यापद्",
      "उपप्लुता योनि व्यापद्",
      "परिप्लुता योनि व्यापद्",
      "कर्णिनी योनि व्यापद्"
    ],
    correctAnswer: 0,
    explanation: "In Charaka Chikitsasthana 30, Shlaeshimiki Yonivyapad is described: 'Shleshmana prapidita yoni... picchila shitala ruk-heena... panduvarna srava'. Upapluta involves Kapha-Vata combination during pregnancy with white discharge. Karnini is characterized by development of a polypoidal pericervical fleshy growth (Karnika).",
    explanationHindi: "चरक चिकित्सास्थान ३०/१६ के अनुसार: 'आचरेत् कफसंयुक्ता श्लैष्मिकी पिच्छिला भृशम्। शीता कण्डूयुता चापि पाण्डुवर्णाऽल्परुङ्नरा॥' श्लैष्मिकी योनि व्यापद् में कफ दोष के कारण पिच्छिल, शीतल एवं पाण्डु स्राव होता है।",
    classicalReference: "Charaka Samhita, Chikitsasthana 30/16",
    difficulty: "Medium",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Total Yonivyapad = 20 according to all classical authorities (Charaka, Sushruta, Vagbhata). Shlaeshimiki has sweetish white cold discharge without pain.",
    sanskritTerm: "श्लैष्मिकी योनि व्यापत्"
  },
  {
    id: "cq-012",
    subject: "Kaumarbhritya (Pediatrics)",
    topic: "Samskaras & Balagrah",
    question: "According to Acharya Kashyapa, at what age should the 'Phalaprashana' (introduction of fruits) and 'Annaprashana' (introduction of solid cereals) samskaras be performed in infants?",
    questionHindi: "आचार्य काश्यप के अनुसार शिशुओं में 'फलप्राशन संस्कार' एवं 'अन्नप्राशन संस्कार' क्रमशः किस आयु में कराने का विधान है?",
    options: [
      "Phalaprashana at 4th month; Annaprashana at 6th month",
      "Phalaprashana at 6th month; Annaprashana at 10th month",
      "Phalaprashana at 6th month; Annaprashana at 1st year",
      "Both performed together at the 6th month"
    ],
    optionsHindi: [
      "फलप्राशन ४थे मास में; अन्नप्राशन ६ठे मास में",
      "फलप्राशन ६ठे मास में; अन्नप्राशन १०वें मास में",
      "फलप्राशन ६ठे मास में; अन्नप्राशन १ वर्ष की आयु में",
      "दोनों संस्कार एक साथ ६ठे मास में"
    ],
    correctAnswer: 0,
    explanation: "Acharya Kashyapa in Kashyapa Samhita uniquely introduced 'Phalaprashana Samskara' at the 4th month (introducing sweet fruit juices like Draksha, Dadima) to test gut tolerance before introducing solid food grains (Annaprashana) at the 6th month.",
    explanationHindi: "काश्यप संहिता खिलस्थान के अनुसार: 'चतुर्थे मासि फलप्राशनम्, षष्ठे मास्यन्नप्राशनम्।' काश्यप जी ने चतुर्थ मास में फलप्राशन (द्राक्षा, दाड़िम स्वरस आदि) तथा षष्ठ मास में अन्नप्राशन का विशिष्ट विधान किया है।",
    classicalReference: "Kashyapa Samhita, Khilasthana Samskara Adhyaya",
    difficulty: "Medium",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Kashyapa is the only author who specifically details Phalaprashana at month 4 before Annaprashana at month 6.",
    sanskritTerm: "चतुर्थे मासि फलप्राशनम् षष्ठे चान्नाशनं"
  },
  {
    id: "cq-013",
    subject: "Agada Tantra & Forensic (Vyavahara)",
    topic: "Visha Upakrama & Sthavara Visha",
    question: "Acharya Charaka describes 'Chaturvimshati Upakrama' (24 modalities of treating poisoning). What is the FIRST and foremost Upakrama in this classical sequence?",
    questionHindi: "आचार्य चरक द्वारा प्रतिपादित 'चतुर्विंशति उपक्रम' (विष चिकित्सा के २४ उपक्रम) में सर्वप्रथम (पहला) उपक्रम कौन-सा है?",
    options: [
      "Vamana (Emesis)",
      "Arishta-bandhana (Tourniquet/Ligature application)",
      "Nishpidana (Suction/Squeezing)",
      "Mantra (Chanting neutralizing incantations)"
    ],
    optionsHindi: [
      "वमन (Emesis)",
      "अरिष्टा-बन्धन (Tourniquet बन्धन)",
      "निष्पीड़न (दंश स्थान का निष्पीड़न)",
      "मन्त्र (दैवव्यपाश्रय मन्त्रोच्चार)"
    ],
    correctAnswer: 3,
    explanation: "In Charaka Chikitsasthana 23/35-37, the 24 Upakramas begin strictly with 'Mantra': 'Mantro-arishtam-atha-utkartanam nishpidanam tatha...'. Mantra is placed first because of its supreme spiritual, divine, and psychosomatic neutralizing potency (Daivavyapashraya Chikitsa).",
    explanationHindi: "चरक चिकित्सास्थान २३/३५ के अनुसार: 'मन्त्रोऽरिष्टाऽथोत्कर्तनं निष्पीडनं तथा। आचूषणं च...' चरक ने २४ विष उपक्रमों में 'मन्त्र' को सर्वप्रथम स्थान दिया है क्योंकि यह अचिन्त्य प्रभाव वाला दैवव्यपाश्रय उपक्रम है।",
    classicalReference: "Charaka Samhita, Chikitsasthana 23/35",
    difficulty: "Hard",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Charaka's 24 Upakramas order starts: Mantra -> Arishta -> Utkartana -> Nishpidana. Sushruta gives 6 Visha Upakramas.",
    sanskritTerm: "मन्त्रोऽरिष्टाऽथोत्कर्तनं निष्पीडनं"
  },
  {
    id: "cq-014",
    subject: "Kriya Sharir (Physiology)",
    topic: "Dhatu Poshana & Dosha Lakshanas",
    question: "In Ayurvedic physiology, which Nyaya (law) of Dhatu Poshana explains the preferential, selective nourishment of Dhatus based on their specific affinity and proximity to nutritional channels?",
    questionHindi: "आयुर्वेदीय शरीर क्रिया में धातु पोषण का वह कौन-सा न्याय है, जो पोषक रस से विशिष्ट धातुओं के चयनात्मक (Selective) पोषण को स्पष्ट करता है?",
    options: [
      "Ksheera-Dadhi Nyaya (Law of complete transformation)",
      "Kedari-Kulya Nyaya (Law of irrigation channels)",
      "Khale-Kapota Nyaya (Law of selective pecking)",
      "Ekakala Dhatu Poshana Nyaya"
    ],
    optionsHindi: [
      "क्षीर-दधि न्याय (सर्वथा परिणामवाद)",
      "केदारी-कुल्या न्याय (सिंचन एवं दूरी क्रम)",
      "खले-कपोत न्याय (चयनात्मक पोषण)",
      "एककाल धातु पोषण न्याय"
    ],
    correctAnswer: 2,
    explanation: "Khale-Kapota Nyaya (Pigeons pecking specific grains from a threshing floor) illustrates how each Dhatu selects only its specific nutritional precursors from the circulating Ahara Rasa, despite all nutrients flowing through the same systemic circulation.",
    explanationHindi: "खलिहान में जिस प्रकार भिन्न-भिन्न कपोत (कबूतर) अपनी आवश्यकतानुसार विशिष्ट अन्नकणों का चयन करते हैं, उसी प्रकार खले-कपोत न्याय के अनुसार प्रत्येक धातु पोषक रस से केवल अपने सजातीय अंशों का ही ग्रहण करती है।",
    classicalReference: "Chakrapani Datta Commentary on Cha. Su. 28/4",
    difficulty: "Medium",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Ksheera-Dadhi = Sequential total transformation; Kedari-Kulya = Channel transmission by distance; Khale-Kapota = Selective nutrient uptake.",
    sanskritTerm: "खले कपोत न्यायः"
  },
  {
    id: "cq-015",
    subject: "Rachana Sharir (Anatomy)",
    topic: "Marma & Srotas Anatomy",
    question: "How many 'Snayu' (ligaments/tendons) and 'Asthi' (bones) are enumerated in the human body according to Acharya Sushruta?",
    questionHindi: "आचार्य सुश्रुत के अनुसार मानव शरीर में 'अस्थि' (हड्डियों) एवं 'स्नायु' की कुल संख्या कितनी मानी गई है?",
    options: [
      "300 Bones and 900 Snayus",
      "360 Bones and 500 Snayus",
      "206 Bones and 400 Snayus",
      "300 Bones and 500 Snayus"
    ],
    optionsHindi: [
      "३०० अस्थियाँ एवं ९०० स्नायु",
      "३६० अस्थियाँ एवं ५०० स्नायु",
      "२०६ अस्थियाँ एवं ४०० स्नायु",
      "३०० अस्थियाँ एवं ५०० स्नायु"
    ],
    correctAnswer: 0,
    explanation: "Acharya Sushruta (the father of surgery) enumerates 300 bones (Asthi) and 900 ligaments (Snayu) in the body. Note that Acharya Charaka enumerates 360 bones including teeth, sockets, and nails.",
    explanationHindi: "सुश्रुत शारीरस्थान ५ के अनुसार शरीर में अस्थियों की कुल संख्या ३०० तथा स्नायुओं की संख्या ९०० है। चरक के अनुसार अस्थियों की कुल संख्या ३६० (दन्त एवं नख सहित) मानी गई है।",
    classicalReference: "Sushruta Samhita, Sharirasthana 5/18-24",
    difficulty: "Easy",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Sushruta = 300 bones, 900 Snayu, 500 Mamsa peshis (male) / 520 (female). Charaka = 360 bones.",
    sanskritTerm: "त्रीणि सषष्ट्यानि शतान्यस्थ्नां (चरक) / त्रीणि शतान्यस्थ्नां (सुश्रुत)"
  },
  {
    id: "cq-016",
    subject: "Swasthavritta & Yoga (Preventive Medicine)",
    topic: "Ritucharya & Vega Dharana",
    question: "According to Ashtanga Hridaya, in which Ritu (Season) is the natural accumulation (Chaya), vitiation (Prakopa), and pacification (Prashama) of Pitta Dosha observed?",
    questionHindi: "अष्टाङ्ग हृदय के अनुसार पित्त दोष का स्वाभाविक चय, प्रकोप एवं प्रशम क्रमशः किन ऋतुओं में होता है?",
    options: [
      "Chaya in Varsha, Prakopa in Sharad, Prashama in Hemanta",
      "Chaya in Greeshma, Prakopa in Varsha, Prashama in Sharad",
      "Chaya in Shishira, Prakopa in Vasanta, Prashama in Greeshma",
      "Chaya in Sharad, Prakopa in Hemanta, Prashama in Shishira"
    ],
    optionsHindi: [
      "वर्षा ऋतु में चय, शरद् ऋतु में प्रकोप, हेमन्त ऋतु में प्रशम",
      "ग्रीष्म ऋतु में चय, वर्षा ऋतु में प्रकोप, शरद् ऋतु में प्रशम",
      "शिशिर ऋतु में चय, वसन्त ऋतु में प्रकोप, ग्रीष्म ऋतु में प्रशम",
      "शरद् ऋतु में चय, हेमन्त ऋतु में प्रकोप, शिशिर ऋतु में प्रशम"
    ],
    correctAnswer: 0,
    explanation: "Vagbhata clearly states the Ritucharya Dosha cycle: Vata undergoes Chaya in Greeshma, Prakopa in Varsha, Prashama in Sharad. Pitta undergoes Chaya in Varsha (due to sour waters), Prakopa in Sharad (due to intense sun), and Prashama in Hemanta (due to cold). Kapha undergoes Chaya in Shishira, Prakopa in Vasanta, and Prashama in Greeshma.",
    explanationHindi: "अष्टाङ्ग हृदय सूत्रस्थान ३/४०-४२ के अनुसार: वर्षा ऋतु में अम्लोदक के कारण पित्त का 'चय', शरद् ऋतु में तीक्ष्ण सूर्य किरणों के कारण 'प्रकोप', तथा हेमन्त ऋतु के शैत्य से पित्त का 'प्रशम' होता है।",
    classicalReference: "Ashtanga Hridaya, Sutrasthana 3/40-42",
    difficulty: "Medium",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Classic table: Pitta = Varsha (Chaya) -> Sharad (Prakopa) -> Hemanta (Prashama). Virechana is indicated in Sharad Ritu for Pitta.",
    sanskritTerm: "चयप्रकोपप्रशमाः पित्तस्य वर्षादिषु"
  },
  {
    id: "cq-017",
    subject: "Modern Clinical Medicine for AMO/NEXT",
    topic: "Emergency Medicine & Pharmacology",
    question: "A 60-year-old patient in the AMO OPD presents with severe crushing retrosternal chest pain radiating to the left jaw and diaphoresis. The ECG reveals ST-segment elevation in leads II, III, and aVF. What is the diagnosis and immediate first-line management?",
    questionHindi: "एक ६० वर्षीय रोगी को सीने में असह्य दर्द, पसीना एवं बायीं भुजा में दर्द की शिकायत है। ईसीजी (ECG) में Lead II, III एवं aVF में ST-खण्ड का उभार (Elevation) मिलता है। इसका निदान एवं प्रथम प्राथमिक प्रबन्धन क्या है?",
    options: [
      "Anterior wall myocardial infarction; IV Furosemide",
      "Inferior wall myocardial infarction; Aspirin 325 mg chewed + Sublingual Nitroglycerin with caution + Urgent Cardiology referral",
      "Lateral wall myocardial infarction; High-dose Oral Digoxin",
      "Acute pericarditis; NSAIDs and immediate discharge"
    ],
    optionsHindi: [
      "एंटीरियर वॉल मायोकार्डियल इन्फार्कशन; IV फ्यूरोसेमाइड",
      "इन्फीरियर वॉल मायोकार्डियल इन्फार्कशन (IWMI); एस्पिरिन ३२५ मिग्रा चबाकर + सब्लिंगुअल नाइट्रोग्लिसरीन (सावधानीपूर्वक) + तत्काल कार्डियोलॉजी रेफरल",
      "लेटरल वॉल मायोकार्डियल इन्फार्कशन; उच्च मात्रा ओरल डिजॉक्सिन",
      "एक्यूट पेरीकार्डाइटिस; दर्दनिवारक (NSAIDs) देकर छुट्टी"
    ],
    correctAnswer: 1,
    explanation: "ST elevation in leads II, III, and aVF indicates an Acute Inferior Wall Myocardial Infarction (typically involving the Right Coronary Artery). Immediate management includes chewable Aspirin, antiplatelet therapy, oxygen if hypoxic, analgesia, and urgent PCI referral. Note: Nitrates should be used with extreme caution if right ventricular infarction is suspected.",
    explanationHindi: "Lead II, III एवं aVF में ST-elevation इन्फीरियर वॉल मायोकार्डियल इन्फार्कशन (हृदयाघात) दर्शाता है। प्रथम चिकित्सा में एस्पिरिन ३२५ मिग्रा चबाने को देना, दर्द निवारण एवं तत्काल कैथ लैब / कार्डियोलॉजी केन्द्र भेजना आवश्यक है।",
    classicalReference: "Standard Modern Emergency Protocol for AMO / NEXT Clinical Component",
    difficulty: "Clinical Vignette",
    examType: ["NEXT", "AMO"],
    highYieldTip: "Leads II, III, aVF = Inferior wall (RCA); V1-V4 = Anterior / Septal (LAD); I, aVL, V5-V6 = Lateral wall (LCx).",
    sanskritTerm: "हृच्छूल / हृद्द्रव लक्षणम्"
  },
  {
    id: "cq-018",
    subject: "AYUSH Ministry Guidelines & National Programs",
    topic: "NAM & AYUSH Regulatory Framework",
    question: "Under the National AYUSH Mission (NAM) and NCISM Act 2020, what is the mandatory qualifying examination established for obtaining a license to practice Indian Systems of Medicine across India?",
    questionHindi: "NCISM अधिनियम २०२० एवं राष्ट्रीय आयुष मिशन के तहत भारत में भारतीय चिकित्सा पद्धतियों (आयुर्वेद) में व्यावसायिक अभ्यास (चिकित्सा लाइसेंस) प्राप्त करने हेतु कौन-सी अनिवार्य परीक्षा निर्धारित की गई है?",
    options: [
      "National Eligibility cum Entrance Test (NEET)",
      "National Exit Test (NEXT)",
      "State AYUSH Medical Registration Test (SAMRT)",
      "All India PG Entrance Test (AIAPGET)"
    ],
    optionsHindi: [
      "नीट (NEET)",
      "राष्ट्रीय निर्गम परीक्षा (National Exit Test - NEXT)",
      "राज्य आयुष मेडिकल पंजीकरण परीक्षा",
      "एआईएपीजीईटी (AIAPGET)"
    ],
    correctAnswer: 1,
    explanation: "Section 15 of the NCISM Act 2020 establishes the 'National Exit Test' (NEXT) as the mandatory qualifying examination for all medical students graduating with BAMS/BHMS/BUMS/BSMS to obtain registration on the National and State registers and acquire a license to practice.",
    explanationHindi: "NCISM अधिनियम २०२० की धारा १५ के अनुसार BAMS उत्तीर्ण स्नातकों हेतु राष्ट्रीय एवं राज्य पंजिकाओं में पंजीकरण एवं चिकित्सा कर्म हेतु 'राष्ट्रीय निर्गम परीक्षा' (National Exit Test - NEXT) उत्तीर्ण करना कानूनी रूप से अनिवार्य किया गया है।",
    classicalReference: "NCISM Act 2020, Section 15 & Ayush Ministry Guidelines",
    difficulty: "Easy",
    examType: ["NEXT", "AMO"],
    highYieldTip: "NEXT is mandatory for licensing; NEET is for UG entry; AIAPGET is for PG admission.",
    sanskritTerm: "राष्ट्रीय निर्गम परीक्षा (National Exit Test)"
  },
  {
    id: "cq-019",
    subject: "Research Methodology & Statistics",
    topic: "Clinical Trials & Statistical Significance",
    question: "In a randomized controlled clinical trial comparing an Ayurvedic formulation with standard care, a p-value of p < 0.01 is obtained. What does this statistical result signify regarding the Null Hypothesis?",
    questionHindi: "एक यादृच्छिक नियन्त्रित नैदानिक परीक्षण (RCT) में यदि p-value का मान p < 0.01 प्राप्त होता है, तो शून्य परिकल्पना (Null Hypothesis - H0) के सन्दर्भ में इसका क्या अर्थ है?",
    options: [
      "The result is statistically insignificant, and the null hypothesis is accepted",
      "There is less than a 1% probability that the observed treatment difference occurred by random chance, rejecting the null hypothesis",
      "The formulation is 99% toxic and cannot be prescribed",
      "The sample size was inadequate and the trial must be nullified"
    ],
    optionsHindi: [
      "परिणाम सांख्यिकीय रूप से असार्थक है और शून्य परिकल्पना स्वीकृत होती है",
      "परिणाम के संयोगवश होने की सम्भावना १% से भी कम है, अतः शून्य परिकल्पना निरस्त (Reject) होती है और परिणाम अत्यधिक सार्थक है",
      "औषधि ९९% विषाक्त है और इसका प्रयोग नहीं किया जा सकता",
      "नमूना आकार (Sample size) अपर्याप्त था अतः परीक्षण रद्द माना जाए"
    ],
    correctAnswer: 1,
    explanation: "In biostatistics, the p-value measures the probability of obtaining test results at least as extreme as the observed results under the assumption that the null hypothesis (H0) is true. A p < 0.01 indicates strong evidence against H0 (less than 1% likelihood due to chance alone), leading to rejection of the null hypothesis in favor of the alternative hypothesis.",
    explanationHindi: "सांख्यिकी में p-value यदि ०.०१ से कम (p < 0.01) है, तो इसका अर्थ है कि यह अन्तर मात्र संयोगवश होने की सम्भावना १% से भी कम है। अतः शून्य परिकल्पना (Null Hypothesis) को अस्वीकार कर वैकल्पिक परिकल्पना को स्वीकार किया जाता है (Highly Significant)।",
    classicalReference: "ICMR & NCISM Guidelines for Biomedical Research in AYUSH",
    difficulty: "Medium",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Standard alpha threshold is 0.05 (5%). If p < 0.05, the result is statistically significant. If p < 0.01, it is highly significant.",
    sanskritTerm: "प्रमाण विज्ञान एवं सांख्यिकी"
  },
  {
    id: "cq-020",
    subject: "Ashtanga Hridaya & Sangraha",
    topic: "Sutrasthana - Ayushkamiya Adhyaya",
    question: "Acharya Vagbhata defines the 'Trisutra' (three pillars) of Ayurveda in the famous shloka: 'Hetulingaushadhajnyanam...'. What do these three components correspond to?",
    questionHindi: "आचार्य वाग्भट एवं चरक द्वारा प्रतिपादित आयुर्वेद के 'त्रिसूत्र' (हेतुलिङ्गौषधज्ञानं...) में कौन-से तीन घटक समाहित हैं?",
    options: [
      "Etiology (Hetu), Symptoms/Signs (Linga), and Therapeutics/Medicine (Aushadha)",
      "Dosha, Dhatu, and Mala",
      "Sutra, Nidana, and Chikitsa",
      "Vata, Pitta, and Kapha"
    ],
    optionsHindi: [
      "हेतु (रोग कारण / Etiology), लिङ्ग (लक्षण / Signs & Symptoms) एवं औषध (उपचार / Therapeutics)",
      "दोष, धातु एवं मल",
      "सूत्र, निदान एवं चिकित्सा",
      "वात, पित्त एवं कफ"
    ],
    correctAnswer: 0,
    explanation: "Trisutra Ayurveda comprises: Hetu (causative factors/etiology), Linga (clinical signs and symptoms/manifestations), and Aushadha (medicinal substances, diet, and therapeutic interventions) for both healthy individuals (Swastha) and diseased individuals (Aatura).",
    explanationHindi: "अष्टाङ्ग हृदय सूत्रस्थान १/१३ एवं चरक सूत्रस्थान १/२४ के अनुसार: 'हेतुलिङ्गौषधज्ञानं स्वस्थातुरपरायणम्। त्रिसूत्रं शाश्वतं पुण्यं बुबुधे यं पितामहः॥' आयुर्वेद के त्रिसूत्र हेतु (कारण), लिङ्ग (लक्षण) एवं औषध (द्रव्य) हैं।",
    classicalReference: "Ashtanga Hridaya, Sutrasthana 1/13 & Cha. Su. 1/24",
    difficulty: "Easy",
    examType: ["NEXT", "AIAPGET", "AMO"],
    highYieldTip: "Trisutra = Hetu, Linga, Aushadha. Skandha-traya has the same meaning. Do not confuse with Tridanda (Sattva, Atma, Sharira) or Tripod (Vata, Pitta, Kapha).",
    sanskritTerm: "हेतुलिङ्गौषधज्ञानं स्वस्थातुरपरायणम्"
  }
];
