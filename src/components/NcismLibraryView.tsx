import React, { useState } from "react";
import {
  NCISM_DISEASES,
  NCISM_FORMULATIONS,
  NCISM_HERBS,
  NCISM_MARMAS,
  NCISM_MINERALS,
  NCISM_SAMHITAS
} from "../data/ncismKnowledgeBase";

type LibrarySection = "marmas" | "herbs" | "formulations" | "samhitas" | "minerals" | "diseases";

export const NcismLibraryView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<LibrarySection>("marmas");
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Section Selector */}
      <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              NCISM Comprehensive Digital Library
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Verified Ayurvedic Corpus
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Authoritative reference tables mapped to NCISM competencies for instant cross-verification during exam revision.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          {[
            { id: "marmas", label: "107 Marmas (Rachana Sharir)" },
            { id: "herbs", label: "Dravyaguna Herbarium & Rasa-Panchaka" },
            { id: "formulations", label: "Classical Formulations & Rogadhikara" },
            { id: "samhitas", label: "Brihat Trayi Samhita Structure" },
            { id: "minerals", label: "Rasa Shastra & Bhasma Examination" },
            { id: "diseases", label: "Kayachikitsa Chikitsa Sutras" }
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id as LibrarySection);
                setSearchFilter("");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeSection === sec.id
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Search inside section */}
        <div>
          <input
            type="text"
            placeholder={`Filter ${activeSection}...`}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full sm:w-80 text-xs p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* ----------------- SECTION: 107 MARMAS ----------------- */}
      {activeSection === "marmas" && (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-stone-900 font-serif">
              Marma Sharir Reference Table (Sushruta Samhita Sharirasthana 6)
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              Total Marmas in body: 107
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-50/60 text-emerald-950 font-bold border-b border-stone-200">
                  <th className="p-3">Marma Name</th>
                  <th className="p-3">Anatomical Region</th>
                  <th className="p-3">Structural Class</th>
                  <th className="p-3">Prognostic Class</th>
                  <th className="p-3">Dimension</th>
                  <th className="p-3">Injury Symptoms (Viddha Lakshana)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {NCISM_MARMAS.filter(
                  (m) =>
                    !searchFilter ||
                    m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    m.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    m.prognosticType.toLowerCase().includes(searchFilter.toLowerCase())
                ).map((m, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/70">
                    <td className="p-3 font-bold text-stone-900">{m.name}</td>
                    <td className="p-3 text-stone-700">{m.location}</td>
                    <td className="p-3 font-semibold text-indigo-900">{m.structuralType}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          m.prognosticType === "Sadhyo Pranahara"
                            ? "bg-rose-100 text-rose-800"
                            : m.prognosticType === "Kalantara Pranahara"
                            ? "bg-orange-100 text-orange-800"
                            : m.prognosticType === "Vishalyaghna"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {m.prognosticType}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-stone-600">{m.pramana}</td>
                    <td className="p-3 text-stone-600 max-w-xs">{m.viddhaLakshana}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- SECTION: HERBARIUM ----------------- */}
      {activeSection === "herbs" && (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-stone-50 border-b border-stone-200">
            <h2 className="text-sm font-bold text-stone-900 font-serif">
              Standardized Ayurvedic Herbarium & Rasa-Panchaka (API / NCISM)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-50/60 text-emerald-950 font-bold border-b border-stone-200">
                  <th className="p-3">Sanskrit Name</th>
                  <th className="p-3">Botanical Name</th>
                  <th className="p-3">Taxonomic Family</th>
                  <th className="p-3">Rasa & Vipaka</th>
                  <th className="p-3">Virya</th>
                  <th className="p-3">Therapeutic Karma</th>
                  <th className="p-3">Prime Indications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {NCISM_HERBS.filter(
                  (h) =>
                    !searchFilter ||
                    h.sanskritName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    h.botanicalName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    h.family.toLowerCase().includes(searchFilter.toLowerCase())
                ).map((h, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/70">
                    <td className="p-3 font-bold text-stone-900">{h.sanskritName}</td>
                    <td className="p-3 italic text-emerald-900 font-medium">{h.botanicalName}</td>
                    <td className="p-3 text-stone-700">{h.family}</td>
                    <td className="p-3 text-stone-700">
                      Rasa: {h.rasa}
                      <br />
                      <span className="text-stone-500">Vipaka: {h.vipaka}</span>
                    </td>
                    <td className="p-3 font-bold text-amber-900">{h.virya}</td>
                    <td className="p-3 text-stone-700">{h.karma}</td>
                    <td className="p-3 text-stone-600">{h.indications}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- SECTION: FORMULATIONS ----------------- */}
      {activeSection === "formulations" && (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-stone-50 border-b border-stone-200">
            <h2 className="text-sm font-bold text-stone-900 font-serif">
              Classical Polyherbal & Rasa Formulations (Bhaishajya Ratnavali / Sharangadhara)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-50/60 text-emerald-950 font-bold border-b border-stone-200">
                  <th className="p-3">Formulation Name</th>
                  <th className="p-3">Dosage Form</th>
                  <th className="p-3">Chief Active Ingredients</th>
                  <th className="p-3">Classical Treatise Citation</th>
                  <th className="p-3">Rogadhikara (Main Indication)</th>
                  <th className="p-3">Adjuvant (Anupana)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {NCISM_FORMULATIONS.filter(
                  (f) =>
                    !searchFilter ||
                    f.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    f.rogadhikara.toLowerCase().includes(searchFilter.toLowerCase())
                ).map((f, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/70">
                    <td className="p-3 font-bold text-stone-900">{f.name}</td>
                    <td className="p-3 font-semibold text-indigo-800">{f.type}</td>
                    <td className="p-3 text-stone-700">{f.chiefIngredient}</td>
                    <td className="p-3 italic text-stone-600">{f.classicalText}</td>
                    <td className="p-3 font-semibold text-emerald-900">{f.rogadhikara}</td>
                    <td className="p-3 text-stone-700">{f.anupana}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- SECTION: SAMHITAS ----------------- */}
      {activeSection === "samhitas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NCISM_SAMHITAS.map((sam, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-stone-900 text-sm">{sam.samhita}</h3>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900">
                  {sam.sthana} ({sam.totalChapters} Adhyayas)
                </span>
              </div>
              <div className="text-xs space-y-2 text-stone-700">
                <p>
                  <strong>Chief Focus:</strong> {sam.chiefSubject}
                </p>
                <p>
                  <strong>Key Chapters:</strong> {sam.prominentChapters.join(", ")}
                </p>
                <p className="text-stone-500">
                  <strong>Prominent Commentators:</strong> {sam.commentators.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----------------- SECTION: MINERALS ----------------- */}
      {activeSection === "minerals" && (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-stone-50 border-b border-stone-200">
            <h2 className="text-sm font-bold text-stone-900 font-serif">
              Rasa Shastra Minerals: Shodhana, Marana & Bhasma Examination
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-50/60 text-emerald-950 font-bold border-b border-stone-200">
                  <th className="p-3">Mineral / Metal</th>
                  <th className="p-3">Classical Group</th>
                  <th className="p-3">Purification (Shodhana) Media</th>
                  <th className="p-3">Incineration (Marana) Bhavana</th>
                  <th className="p-3">Bhasma Color</th>
                  <th className="p-3">Therapeutic Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {NCISM_MINERALS.map((m, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/70">
                    <td className="p-3 font-bold text-stone-900">
                      {m.sanskritName}
                      <div className="text-[11px] font-normal text-stone-500">{m.englishName}</div>
                    </td>
                    <td className="p-3 font-semibold text-indigo-900">{m.group}</td>
                    <td className="p-3 text-stone-700">{m.shodhanaMedia}</td>
                    <td className="p-3 text-stone-700">{m.maranaBhavana}</td>
                    <td className="p-3 font-bold text-amber-900">{m.bhasmaColor}</td>
                    <td className="p-3 text-stone-600">{m.therapeuticUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- SECTION: DISEASES ----------------- */}
      {activeSection === "diseases" && (
        <div className="space-y-4">
          {NCISM_DISEASES.map((dis, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between border-b pb-2 gap-2">
                <h3 className="font-bold text-emerald-950 text-base font-serif">{dis.name}</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    Dosha: {dis.dosha}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                    Srotas: {dis.srotas}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-stone-50 p-3 rounded-lg space-y-1">
                  <div className="font-bold text-stone-800">Cardinal Signs (Pratyatma Linga)</div>
                  <div className="text-stone-600">{dis.pradhanaLinga}</div>
                  <div className="text-stone-500 pt-1">Dushya: {dis.dushya}</div>
                </div>

                <div className="bg-stone-50 p-3 rounded-lg space-y-1">
                  <div className="font-bold text-stone-800">Chikitsa Sutra (Management Principle)</div>
                  <div className="text-stone-700 font-medium">{dis.chikitsaPrinciple}</div>
                </div>

                <div className="bg-stone-50 p-3 rounded-lg space-y-1">
                  <div className="font-bold text-stone-800">Classical Formulations</div>
                  <div className="text-emerald-900 font-semibold">
                    {dis.classicalFormulations.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
