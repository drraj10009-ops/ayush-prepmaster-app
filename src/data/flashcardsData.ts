import { Flashcard } from "../types";

export const NCISM_FLASHCARDS: Flashcard[] = [
  {
    id: "fc-1",
    subject: "Charaka Samhita",
    topic: "Trisutra Ayurveda",
    front: "What constitutes the 'Trisutra' (or Skandha-traya) of Ayurveda?",
    back: "1. Hetu (Etiology / Causative factors)\n2. Linga (Symptomatology / Clinical signs)\n3. Aushadha (Therapeutics / Formulations & Regimens)\nApplicable to both Swastha (healthy) and Aatura (diseased).",
    sanskritShloka: "हेतुलिङ्गौषधज्ञानं स्वस्थातुरपरायणम् । त्रिसूत्रं शाश्वतं पुण्यं बुबुधे यं पितामहः ॥",
    classicalReference: "Charaka Samhita Sutrasthana 1/24",
    mnemonic: "H-L-A (Hetu, Linga, Aushadha)"
  },
  {
    id: "fc-2",
    subject: "Sushruta Samhita",
    topic: "Ashtavidha Shastra Karma",
    front: "List the 8 surgical procedures (Ashtavidha Shastra Karma) described by Sushruta.",
    back: "1. Chedana (Excision)\n2. Bhedana (Incision)\n3. Lekhana (Scraping)\n4. Vyadhana (Puncturing / Venesection)\n5. Eshana (Probing)\n6. Aaharana (Extraction)\n7. Visravana (Draining fluids/pus)\n8. Seevana (Suturing)",
    sanskritShloka: "छेद्यं भेद्यं च लेख्यं च वेध्यमेष्यमहार्य च । विस्राव्यं सीव्यमेतेषां कर्म चाष्टविधं स्मृतम् ॥",
    classicalReference: "Sushruta Samhita Sutrasthana 25/5",
    mnemonic: "C-B-L-V-E-A-V-S"
  },
  {
    id: "fc-3",
    subject: "Dravyaguna Vijnana (Pharmacognosy)",
    topic: "Triphala Constituents & Rasa-Panchaka",
    front: "What are the constituents of Triphala and their individual Virya?",
    back: "1. Haritaki (Terminalia chebula) -> Ushna Virya, Madhura Vipaka\n2. Bibhitaki (Terminalia bellirica) -> Ushna Virya, Madhura Vipaka\n3. Amalaki (Phyllanthus emblica) -> Sheeta Virya, Madhura Vipaka\nTogether they possess 5 Rasas (Alavana - all except salty) and act as a Tridoshaghna Rasayana and Chakshushya.",
    classicalReference: "Bhavaprakasha Nighantu, Haritakyadi Varga",
    mnemonic: "H-B-A: H and B are Ushna, A is Sheeta"
  },
  {
    id: "fc-4",
    subject: "Rachana Sharir (Anatomy)",
    topic: "Trimarma in Ayurveda",
    front: "What are the 'Trimarmas' (Three Vital Centers) and their anatomical locations?",
    back: "1. Shira (Head / Brain / Cranium) -> Seat of Prana and Indriyas\n2. Hridaya (Heart / Thorax) -> Seat of Chetana and Ojas\n3. Basti (Urinary Bladder / Pelvic center) -> Seat of Mutra, Apana, and vital autonomic reflexes\nAll three are Sadhyo Pranahara Marmas.",
    classicalReference: "Charaka Chikitsasthana 26 & Siddhisthana 9",
    mnemonic: "S-H-B (Shira, Hridaya, Basti)"
  },
  {
    id: "fc-5",
    subject: "Kriya Sharir (Physiology)",
    topic: "Pancha Vidha Vata Locations & Functions",
    front: "Enumerate the 5 subtypes of Vata Dosha and their primary seats (Sthana).",
    back: "1. Prana Vata: Murdha (Head), Uras, Kanta -> Breathing, deglutition, sensory perception\n2. Udana Vata: Uras (Chest) -> Speech, effort, vigor, memory\n3. Samana Vata: Amashaya / Grahani (Near Agni) -> Digestion, separation of Sara/Kitta\n4. Vyana Vata: Hridaya (All-pervading) -> Circulation, pulsation, sweat expulsion\n5. Apana Vata: Pakwashaya, Shroni, Basti, Medhra -> Elimination of flatus, urine, stool, semen, fetus",
    classicalReference: "Ashtanga Hridaya Sutrasthana 12/4-9",
    mnemonic: "P-U-S-V-A"
  },
  {
    id: "fc-6",
    subject: "Rasa Shastra & Bhaishajya Kalpana",
    topic: "Bhasma Pariksha (Testing of Incinerated Minerals)",
    front: "What are the classical tests (Parikshas) for confirming an ideal Bhasma?",
    back: "1. Rekhapurna: Powder enters into the microscopic furrows of fingers\n2. Varitara: Floats smoothly on undisturbed water\n3. Unama: A grain of rice or grain placed on floating bhasma remains on top\n4. Apunarbhava: Cannot be reduced back to metallic state when heated with Mitra Panchaka\n5. Niruttha: Heated with silver foil, does not adhere or alter silver weight\n6. Nisvadu / Nirgandha: Tasteless and odorless",
    classicalReference: "Rasaratnasamuchchaya 8/26-30",
    mnemonic: "R-V-U-A-N (Rekhapurna, Varitara, Unama, Apunarbhava, Niruttha)"
  },
  {
    id: "fc-7",
    subject: "Kayachikitsa (Internal Medicine)",
    topic: "20 Pramehas - Dosha Distribution",
    front: "What is the numerical distribution of the 20 Prameha subtypes according to Dosha?",
    back: "• Kaphaja Prameha: 10 types (Sadhya - curable with therapy)\n• Pittaja Prameha: 6 types (Yapya - manageable/palliative)\n• Vataja Prameha: 4 types (Asadhya - incurable; culminates in Madhumeha / Ojakshaya)",
    sanskritShloka: "दश प्रमेहाः कफजाः षट् पित्तात् चत्वारो वातजाः । साध्या याप्यास्तथाऽसाध्याः क्रमात्ते दश षट् च चत्वारः ॥",
    classicalReference: "Charaka Chikitsasthana 6/8",
    mnemonic: "10 (Kapha) + 6 (Pitta) + 4 (Vata) = 20"
  },
  {
    id: "fc-8",
    subject: "Shalya Tantra (Surgery)",
    topic: "Jalaukavacharana - Nirvisha Leeches",
    front: "Name the 6 Nirvisha (Non-poisonous therapeutic) Leeches according to Sushruta.",
    back: "1. Kapila (Brownish with red belly)\n2. Pingala (Reddish-brown, fast moving)\n3. Shankhamukhi (Liver-colored with conical mouth)\n4. Mushika (Resembling mouse shape and gray color)\n5. Pundarikamukhi (Lotus petal color)\n6. Saravika (Barley-ear shaped with wide markings)",
    classicalReference: "Sushruta Samhita Sutrasthana 13/11",
    mnemonic: "K-P-S-M-P-S"
  },
  {
    id: "fc-9",
    subject: "Agada Tantra & Forensic (Vyavahara)",
    topic: "Sthavara Visha 10 Adhisthanas",
    front: "What are the 10 anatomical seats (Adhisthanas) of Sthavara (Plant & Mineral) Poisons?",
    back: "1. Mula (Root)\n2. Patra (Leaf)\n3. Phala (Fruit)\n4. Pushpa (Flower)\n5. Twak (Bark)\n6. Ksheera (Latex)\n7. Sara (Pith/Heartwood)\n8. Niryasa (Exudate/Gum)\n9. Dhatu (Metallo-minerals)\n10. Kanda (Tuber/Rhizome)",
    classicalReference: "Sushruta Samhita Kalpasthana 2/3",
    mnemonic: "M-P-P-P-T-K-S-N-D-K"
  },
  {
    id: "fc-10",
    subject: "Swasthavritta & Yoga (Preventive Medicine)",
    topic: "Shad Ritu & Adana / Visarga Kala",
    front: "How are the 6 Seasons divided into Adana Kala (Uttarana) and Visarga Kala (Dakshinayana)?",
    back: "• Adana Kala (Depleting / Sun dominant / Agneya):\n  1. Shishira (Late Winter)\n  2. Vasanta (Spring)\n  3. Greeshma (Summer)\n  -> Strength (Bala) decreases progressively; Tikta, Kashaya, Katu rasas predominate.\n\n• Visarga Kala (Nourishing / Moon dominant / Soumya):\n  4. Varsha (Monsoon)\n  5. Sharad (Autumn)\n  6. Hemanta (Early Winter)\n  -> Strength (Bala) increases progressively; Amla, Lavana, Madhura rasas predominate.",
    classicalReference: "Charaka Samhita Sutrasthana 6/5-8",
    mnemonic: "Adana = S-V-G (Weakening); Visarga = V-S-H (Strengthening)"
  }
];
