"use client";

import { useSearchParams } from "next/navigation";
import {
  BookOpenText,
  Shield,
  CalendarDays,
  Mountain,
  ScrollText,
  Droplet,
  Route as RouteIcon,
  ListOrdered,
  Layers,
  Info,
  Lightbulb,
  ShieldAlert,
} from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";

type Language = "en" | "ml" | "te" | "hi" | "ta" | "kn";
type ContentBlock = { title: string; body: string[] };

type Topic = {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
};

function SabarimalaContent() {
  const params = useSearchParams();
  const tab = (params.get("tab") || "about").toLowerCase();
  const showAbout = tab === "about";
  const showPooja = tab === "pooja";

  // Pooja timings table extracted from the shared image
  const POOJA_HEAD = ["Particulars", "Normal Period", "Season"] as const;
  const POOJA_ROWS = [
    { particular: "Opening of Sreekovil", normal: "5.00 a.m.", season: "3.00 a.m." },
    { particular: "Nirmalya darshanam", normal: "5.05 a.m.", season: "3.05 a.m." },
    { particular: "Ganapati homam", normal: "5.30 a.m.", season: "3.30 a.m." },
    { particular: "Neyyabhishekam", normal: "5.15 a.m. to 6.45 a.m", season: "3.15 a.m. to 6.45 a.m" },
    { particular: "Usha pooja", normal: "7.30 a.m.", season: "7.30 a.m." },
    { particular: "Udayasthamana Pooja", normal: "8.00 am", season: "Normally Nil" },
    { particular: "Neyyabhishekam", normal: "9.00 a.m. to 11.15 a.m", season: "8.00 a.m. to 11.15 a.m" },
    { particular: "Ucha pooja", normal: "12.00 p.m.", season: "12.00 p.m." },
    { particular: "Closing of Sreekovil", normal: "1.00 p.m.", season: "1.00 p.m." },
    { particular: "Opening of Sreekovil", normal: "5.00 p.m.", season: "4.00 p.m." },
    { particular: "Deeparadhana", normal: "6.30 p.m.", season: "6.30 p.m." },
    { particular: "Pushpabhishekam", normal: "6.45 p.m. to 9.00 pm", season: "6.45 p.m. to 9.00 pm" },
    { particular: "Padi pooja", normal: "7.00 pm", season: "Nil" },
    { particular: "Athazha pooja", normal: "9.15 p.m.", season: "9.15 p.m." },
    { particular: "Harivarasanam", normal: "9.55 p.m.", season: "10.55 p.m." },
    { particular: "Closing of Sreekovil", normal: "10.00 p.m.", season: "11.00 p.m." },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 pt-24 md:pt-28 pb-16">
        {showPooja ? (
          <section className="space-y-4">
            <header>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Pooja Timings</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Extracted from the official schedule image. Timings may vary on festival days.
                Please verify with temple authorities.
              </p>
            </header>
            <div className="rounded-2xl border border-border bg-card/70 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full table-auto text-left">
                  <thead>
                    <tr>
                      {POOJA_HEAD.map((head) => (
                        <th key={head} className="border-b border-border bg-muted/60 p-4">
                          <span className="text-xs font-medium leading-none tracking-wide text-muted-foreground">
                            {head}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {POOJA_ROWS.map(({ particular, normal, season }, index) => {
                      const isLast = index === POOJA_ROWS.length - 1;
                      const classes = isLast ? "p-4" : "p-4 border-b border-border";
                      return (
                        <tr key={`${particular}-${index}`} className="text-sm">
                          <td className={`${classes} font-medium text-foreground`}>{particular}</td>
                          <td className={classes}>{normal}</td>
                          <td className={classes}>{season}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              “Sreekovil” means Sanctum Sanctorum (Garbha Gruha). Timings are indicative and may change per
              local needs.
            </p>
          </section>
        ) : (
        <>
        {showAbout && (
          <section className="rounded-2xl border border-border bg-card/70 p-6 md:p-8 shadow-sm">
            <h1 className="text-center text-2xl md:text-3xl font-extrabold tracking-wide text-[#D4AF37]">SABARIMALA</h1>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              Sabarimala is a temple complex located at Sabarimala hill inside the Periyar Tiger Reserve in the
              Perinad Village, Pathanamthitta District, Kerala, India. It is one of the largest annual pilgrimage
              sites in the world with an estimate of over 40 to 50 million (4 to 5 Crores) devotees visiting every year.
            </p>
            <hr className="my-6 border-border" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-[420px_1fr] gap-8 items-start">
              <figure className="w-[340px] md:w-[420px] rounded-xl overflow-hidden border border-border shadow-sm bg-black/5">
                <img src="/leftsab.jpg" alt="Sabarimala hill and temple crowd" className="w-full h-[220px] md:h-[360px] object-cover" />
              </figure>

              {/* Right: short intro matching image height */}
              <div className="rounded-xl border border-border bg-black/5 p-5 shadow-sm text-sm md:text-[15px] leading-7 text-white/90 md:min-h-[360px] flex items-center">
                <div className="space-y-4 text-left">
                  <p>
                    The temple is dedicated to the deity Ayyappan (Dharma Shasta), the son of Shiva and Mohini, the feminine
                    form of Vishnu.
                  </p>
                  <p>
                    The temple is situated on a hilltop amidst 18 hills at an altitude of 1,260 m (4,134 ft) above sea level,
                    and is surrounded by mountains and dense forests. The dense forest, part of the Periyar Tiger Reserve,
                    around the temple is known as Poonkaavanam. Temples exist in each of the hills surrounding Sabarimala.
                  </p>
                </div>
              </div>

              {/* Full-width details under the image */}
              <div className="md:col-span-2 rounded-xl border border-border bg-black/5 overflow-hidden shadow-sm text-sm md:text-[15px] leading-7 text-white/90">
                <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-border">
                  <div className="space-y-2 text-left p-5 md:p-6 md:pr-8">
                    <p className="font-semibold text-[#D4AF37]">The temple is open for worship on:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Mandalam — approximately 15 November to 26 December</li>
                      <li>Makaravilakku / Makara Sankranti — 14 or 15 January</li>
                      <li>Temple Annual Festival — mid to end March</li>
                      <li>Vishu / Mesha Sankramanam — usually 14 April</li>
                      <li>Travancore Maharaja’s Birthday — around 11 November</li>
                      <li>First five days of each Malayalam month</li>
                    </ul>
                    <p className="mt-3">
                      See current year dates in our <a href="/calendar/temple" className="underline underline-offset-2">Ayyappa Temple Calander</a>.
                    </p>
                  </div>
                  <div className="space-y-4 text-left p-5 md:p-6 md:pl-8">
                    <p className="font-semibold text-[#D4AF37]">What makes Sabarimala unique</p>
                    <p>
                      The 41‑day <span className="italic">vratham</span> (penance) observed before the pilgrimage — a process of self‑purification
                      of thoughts, words and deeds — includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Abstinence from alcohol, tobacco, narcotics, meat, fish, egg, onion and garlic; reduced food intake.</li>
                      <li>Refraining from harsh or untruthful words; speaking pleasantly.</li>
                      <li>Bhakti in daily life: shlokas, scriptures, bhajans; visit nearby temples.</li>
                      <li>Cleanliness: bath twice a day, clean dress, avoid pollution.</li>
                      <li>Abstinence from sexual desires, in thought and deed.</li>
                    </ul>
                    <p>
                      At the end of 41 days, offerings are gathered in an <span className="italic">Irumudi</span> and the pilgrimage is undertaken.
                      The ghee offered to the Lord is received as <span className="italic">prasadam</span>; the coconut is offered to the fire — symbolising
                      inner purification. <span className="italic">Tat Tvam Asi</span> — the divinity in the Lord and within yourself are one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Table of contents + dynamic section */}
        <TableOfContents />
        </>
        )}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 text-sm text-muted-foreground">Loading…</div>}>
      <SabarimalaContent />
    </Suspense>
  );
}

function TableOfContents() {
  const params = useSearchParams();
  const sectionParam = params.get("section");
  const tabAlias = params.get("tab");
  const initial = (
    sectionParam ||
    (tabAlias === "reach" ? "reach" : undefined) ||
    "ayyappa-birth"
  ).toLowerCase();
  const topics = useMemo<Topic[]>(
    () => [
      { id: "ayyappa-birth", title: "Lord Ayyappa – Birth And History", icon: BookOpenText },
      { id: "upa-devathas", title: "Upa Devathas", icon: Shield },
      { id: "ulsavam", title: "Ulsavam/Festival", icon: CalendarDays },
      { id: "ponnambalamedu", title: "Ponnambalamedu", icon: Mountain },
      { id: "rituals", title: "Rituals", icon: ScrollText },
      { id: "guruthy", title: "Guruthy Tharpanam", icon: Droplet },
      { id: "trek", title: "Trek to Sabarimala", icon: RouteIcon },
      { id: "18-steps", title: "18 Steps (Pathinettampadi)", icon: ListOrdered },
      { id: "18-hills", title: "18 Hills (Mala)", icon: Layers },
      { id: "facts", title: "Facts on Sabarimala", icon: Info },
      { id: "tips", title: "Tips to Ayyappa Devotees", icon: Lightbulb },
      { id: "anti", title: "Anti Sabarimala Activities", icon: ShieldAlert },
    ],
    []
  );

  const [active, setActive] = useState(initial);

  const current = topics.find((t) => t.id === active) || topics[0];
  const CurrentIcon = current.icon;
  // Language state for the current article (only used for Ayyappa – Birth for now)
  const [lang, setLang] = useState<Language>("en");

  // Localised content for "Lord Ayyappa – Birth And History"
  const birthContent = useMemo(
    () => ({
      en: {
        title: "Lord Ayyappa – Birth And History",
        body: [
          "Different versions of stories about the incarnation of Lord Ayyappa are in circulation. There is a Vedic or Puranic deity Harihara Putra, born out of the holy union of Siva and the feminine form of Vishnu called Mohini at the Samudra Manthan (churning of milky ocean) during the Koorma Avatar (incarnation of Maha Vishnu as Turtle) at the beginning of the present Chatur Yuga. Another legend is related to the killing of Vrikasura (Bhasmasura), during the second incarnation of Vishnu as Mohini, from a later period.",
          "Then there is a historical person, Manikantan, related to the Pandya dysnasty of Madurai in present day Tamil Nadu. This is from a period 800 years ago. This legend is described below. Bhootanatha Upakhyanam, extracted from Brahmanda Puranam and retold in Malayalam by Shri. Kallarackal Krishnan Nair and another translation by Shri. P.N. Krishnanunni and a third book Bhootanatha Sarvaswam by Shri. Kurumulloor Narayana Pillai are considered as authentic references for Ayyappa the historical person.",
          "The members of Pandya dynasty ousted by Tirumala Naicker, the ruler of the Pandya Empire spanning Madurai, Tirunelveli and Ramanathapuram lived in places like Valliyur, Tenkasi, Shenkottai, Achankovil and Sivagiri. They had also established their supremacy in parts of Travancore, and some of them belonging to Chempazhanattu Kovil in Sivagiri were given the right to rule the province of Pandalam by the King of Travancore, some eight hundred years ago. King Rajashekhara, the foster father of Lord Ayyappa belonged to this dynasty.",
          "A just and precocious sovereign King Rajashekhara was held by his subjects in high esteem. Under him, the region was witnessing a golden age. But the king had one sorrow: he was childless and thus had no heir to inherit his throne. Both the hapless king and his queen prayed fervently to Lord Shiva for a child.",
          "Around the same time, a demon by the name of Mahishasura (in the shape of a bullock) undertook severe penance (tapas) and consequently Lord Brahma was forced to grant his wish that nobody on earth could annihilate him. Emboldened by Brahma’s boon, Mahishasura commenced systematic destruction of people and pulverized tribes and communities. Terrorized and fearing his wrath, people fled to distant lands. Realizing that only a superhuman power could exterminate the wayward Mahishasura, the devas appealed to Goddess Durga, who killed him in a fierce battle.",
          "Determined to avenge her slain brother, Mahishi, the sister of Mahishasura secured a boon from Lord Brahma that no being except the offspring of Vishnu (Hari) & Shiva (Haran) could slay her. In due course of time, Mahishi went to Devaloka and began harassing the Devas who in turn implored Lord Vishnu to intervene. As the boon was that nobody except the son of Lord Shiva & Vishnu could kill Mahishi, Lord Vishnu assumed the female persona of Mohini (beautiful lady) who was instrumental in the killing of Vrikasura (Bhasmasua). The Mohini avatar of Vishnu earlier was to help the devas get the divine prize Amrit, immortal nectar, came out of Samudra Manthan, churning of milky ocean, away from the asuras. The male child born out of the union of Mohini (Vishnu) and Lord Shiva was placed at the bank of Pampa river.",
          "On one of his hunting trips to the forests near River Pampa, as King Rajashekhara reclined on the banks of river mulling over the natural beauty of the surroundings and waterfalls, he heard an infant’s wails from the forest. Astounded, he followed the sounds and came upon a beautiful child furiously kicking its feet and arms. The king stood there, perplexed – he longed to take the child home to his palace.",
          "Whilst King Rajashekhara beheld the divine child, a sadhu appeared from nowhere and instructed him to take the infant to his palace. Also the mendicant assured him that the child would mitigate his dynasty’s sufferings and that when the boy turned twelve, Rajashekhara would be aware of his divinity. As the child was wearing a gold chain with bell (mony), the sadhu directed the King to name him Manikandan, one with a golden neck.",
          "Ecstatic, Rajashekhara took Manikandan home and narrated the happenings to his queen. They both felt that they had been blessed by Lord Shiva himself. All except the Diwan/minister who had entertained hopes of becoming the king after Rajashekhara, rejoiced in the royal couple’s happiness.",
          "As a child, Manikandan was very intelligent and precocious. He excelled in martial arts and shastras and surprised his guru with his brilliance and superhuman talents. Peace and prosperity reigned in Pandalam. Eventually, Ayyappan’s guru concluded that the boy was no ordinary mortal but a divine being. Upon completing his studies, Manikandan went up to his teacher to offer guru dakshina and seek his blessings in turn.",
          "As he approached his spiritual master for asheerwaad (blessing), the guru explained to Manikandan what he had already surmised about him, that he was a divine power destined for superhuman glory. The guru then beseeched him to bestow vision and speech upon his son who was blind and dumb. Manikandan placed his hands on the guru’s son and the boy immediately gained eyesight and speech. Requesting that this miracle be revealed to none, Manikandan returned to the palace.",
          "Manikantan had learnt martial arts, organized local people, in the name of Yogams and taught them warfare and martial arts to prepare them against thieves, looters and enemies. He had killed Udayanan, a looter with base at Karimala, who had abducted the princess of Pandalam. When Vaparan, another warrior, a thief and looter attacked poor peole of Pandala kingdom, Manikantan fought with him, endowed him with good advices and finally made him a good friend.",
          "Meanwhile the Queen had given birth to a male child who was named Raja Rajan. Sensing that these miraculous turn of events were somehow inextricably linked to Manikandan, Rajasekhara, decided to crown him King; he obviously considered Lord Ayyappan his eldest son. Everybody with the exception of the King’s Diwan got dejected. This wily minister, who secretly nursed kingly ambitions, hated Manikandan and devised manifold plots, including poisoning of food to exterminate the divine avatar. Manikandan had a few narrow escapes, yet his body bore an injury that none could cure. Finally, Lord Shiva himself in the garb of a healer cured the young boy.",
          "His plans foiled, the Diwan told, injecting poison in the minds of the Queen that it was highly improper for Manikandan to succeed Rajashekhara, as her own son was alive who will have to suffer a lot if Manikandan were to become the king. Since Arthasastra considers that ends justify the means, he instigated her to feign illness; he assured the Queen that he would make his physician proclaim that she could be cured only by the application of a tigress’ milk. Manikandan would be impelled to go to the forest where he would fall a prey to wild animals, or even if he returned home without accomplishing the task, Rajashekhara’s love for him would not be the same as before. Blinded by her attachment for her own son, the Queen vowed to help the Diwan and pretended as though she was suffering from a terrible headache. The King grew alarmed and summoned his physicians who were unable to revive the seemingly ailing Queen. Eventually the Diwan’s accomplice physician declared that she would be cured of the malady only if the milk of a lactating tigress were made available. Rajashekhara proclaimed that he would hand over half his kingdom to anybody who could cure the hapless Queen.",
          "The team of soldiers sent by Rajashekhara with the sole purpose of getting the milk returned empty handed. Manikandan offered to help, but the King would not heed his pleas to go to the forest, citing the boy’s tender age and impending coronation as reasons. Unperturbed, Manikandan requested his father to do him a favour. Rajashekhara, ever the indulgent parent relented immediately; the boy seizing the opportunity pressed him to let him collect the milk. Manikandan stalled Rajashekhara’s efforts to organize a band of brave men to accompany him into the forest; he argued that the tigress would leave silently upon seeing the crowd of soldiers. Reluctantly Rajashekhara bid farewell to his favourite son.",
          "The Bhootagana/servants of Lord Shiva closely followed Manikandan as he entered the forest. But on the way, he chanced to witness the atrocities of the demoness Mahishi even in Devaloka. His sense of justice outraged, Manikandan hurled Mahishi onto the earth below; she fell on the banks of the Azhutha River. A bloody battle soon ensued and at the end, Manikandan mounted Mahishi’s chest and commenced a violent dance that reverberated within the earth and the Devaloka. Even the Devas were frightened. Mahishi realized that the divine being on her was the son of Hari and Haran, chastened, she prostrated before the young boy and died.",
          "Following his confrontation with Mahishi, Manikandan entered the forest for tigress’ milk. He had a darshan of Lord Shiva who informed him that even though he had fulfilled the divine plan, he still had one major task to accomplish. Manikandan was reminded about his grief stricken father and ailing mother; also he was assured of Lord Indra’s assistance in obtaining the much prized tigress’ milk. Manikandan made his way to the Royal palace on Lord Devendra, disguised as a tiger; they were accompanied by female devas in the guise of tigresses and male devas as tigers.",
          "The people of Pandalam panicked upon seeing the boy and the tigers and hurriedly sought shelter. Soon after, the Sadhu, who had first materialized before Rajashekhara in the forest, when he heard a child’s wails appeared again and revealed Manikandan’s true identity to the wonder-struck king. The King grew silent and pensive, as Manikandan approached the palace gates with the tigers. The boy descended from the tiger’s back and informed the solemn King that he could get the milk from the tigresses and cure the Queen of the mysterious ailment. Unable to contain himself any longer, Rajashekhara fell at the lad’s feet and begged for forgiveness, he had finally seen through his Queen’s pretense; her malady had ceased the moment Manikandan had left for the forest. On the day he returned from the forest, Manikandan turned twelve years old.",
          "King Rajashekhara decided to punish his Diwan as the latter was responsible for his son’s exile into the forest. Manikandan, however advised restraint; he held that all had unfolded in accordance with the divine order, through the will of God. Also he reminded his father that as he had accomplished the task for which he had created himself, he would return to Devaloka without fail. Before his departure, the lad told the King that he as he was pleased by the latter’s unflinching faith and devotion, he would grant him whatever boon Rajashekhara requested for. Immediately, the King Rajasekara told him that they wanted to construct a temple in his memory and beseeched him to suggest a suitable place for the temple. Manikandan aimed an arrow which fell at a place called Sabarimala, where in the Sri Rama’s era a Sanyasini called Sabari observed tapas. Lord Manikandan told the King to renovate the existing Dharma Sastha temple in that place, built by Sage Parasurama, an avatar of Vishnu and then he disappeared. Manikandan then reached the Dharma Sastha temple, and merged with the murti of Dharma Sastha.",
          "Later, acting upon the advice of Sage Agasthya, King Rajashekhara laid the foundation stone of the present temple at Sabarimala. Lord Manikandan, had stated emphatically that he would grace only those devotees who come for his darshan after observing forty one days’ penance or vratam. Devotees are expected to adhere to a way of life akin to that of a brahmachari, celibate, constantly reflecting on the divine. Whilst they make their way up the steep slopes of Sabarimala, they adorn themselves with three-eyed coconut filled with ghee, pooja materials and foodstuff on their heads called ‘Irumudi’, and bathed in River Pampa chanting ‘Swami Saranam’ and climb the divine eighteen steps of the temple.",
          "Every year, millions converge upon Sabarimala irrespective of caste or creed, with garlands and irumudis, chant paeans to Lord Ayyappa, bathe in holy river Pampa, climb up the eighteen steps, hoping to catch a glimpse of Lord Ayyappa, the Dharma Sastha.",
        ],
      },
      ml: {
        title: "ശ്രീ അയ്യപ്പൻ – ജനനവും ചരിത്രവും",
        body: [
          "അയ്യപ്പന്റെ അവതാരവുമായി ബന്ധപ്പെട്ട് നിരവധി കഥാവ്യാഖ്യാനങ്ങൾ prചാരത്തിലുണ്ട്. സമുദ്രമഥനകാലത്ത് വിഷ്ണുവിന്റെ മോഹിനിയും ശിവനും ചേർന്നുള്ള ദൈവിക ഐക്യത്തിൽ ജനിച്ച ഹരിഹരപുത്രനെന്ന പുരാണപാത്രവും മറ്റൊരു പതിപ്പിൽ മഹിഷിയെ വധിക്കുന്ന കഥയും കാണാം.",
          "ചരിത്രപരമായി പാണ്ട്യരാഷ്ട്രീയവുമായി ബന്ധമുള്ള മണികണ്ഠൻ ഏകദേശം 800 വർഷങ്ങൾക്ക് മുമ്പുള്ള വ്യക്തിത്വമാണ്. പമ്പാനദീതീരത്ത് കണ്ടെത്തിയ ദൈവശിശുവിനെ പന്തളം രാജാവായ രാജശേഖരൻ ദത്തെടുത്ത് വളർത്തി. മണികണ്ഠൻ ശാസ്ത്രങ്ങളിലും ആയുധകലകളിലും അത്ഭുത കഴിവ് തെളിയിച്ചു.",
          "ദിവാൻ നടത്തിയ കുതന്ത്രമനുസരിച്ച് റാണി രോഗം കൃത്രിമമായി നടിച്ച് കടുവപ്പാലാണ് ഔഷധമെന്ന് പ്രഖ്യാപിച്ചു. മണികണ്ഠൻ ഒറ്റയ്ക്കുപോയി മഹിഷിയെ വധിച്ച് കടുവകളോടൊപ്പം മടങ്ങുമ്പോൾ ദൈവിക രൂപം രാജാവിന് വെളിപ്പെട്ടു.",
          "ദേവലോകത്തേക്കു മടങ്ങും മുമ്പ് മണികണ്ഠൻ വില്ലുമായി അമ്പെയ്തു സൂചിപ്പിച്ച സ്ഥലത്ത് – ശബരിയുടെ തപസ്സ് നടന്ന ശബരിമലയിൽ – ധർമ്മശാസ്താവിന്റെ ക്ഷേത്രം പണിയാൻ രാജാവിനോട് നിർദ്ദേശിച്ചു. തീർത്ഥാടകർക്കായി 41 ദിവസത്തെ വ്രതം നിർദ്ദേശിക്കപ്പെട്ടു.",
          "ഇന്നും ലക്ഷക്കണക്കിന് ഭക്തർ പമ്പാതീരത്ത് സ്നാനം ചെയ്തു ഇരുമുടി ഏറ്റുചുമന്ന് പതിനെട്ടു പടികൾ കയറി ‘സ്വാമിയേ ശരണം അയ്യപ്പ’ എന്നു ജപിച്ച് ദർശനം നേടുന്നു.",
        ],
      },
      hi: {
        title: "भगवान अयप्पा – जन्म और इतिहास",
        body: [
          "अयप्पा के अवतार के बारे में कई कथाएँ मिलती हैं — एक पुराणिक हरिहरपुत्र जो शिव और मोहिनी (विष्णु) के दिव्य संयोग से उत्पन्न हुए। एक कथा भस्मासुर के वध से भी जुड़ी है।",
          "ऐतिहासिक परंपरा में पांड्य वंश से जुड़े मणिकंटन का वर्णन है (लगभग 800 वर्ष पूर्व)। पंपा नदी किनारे मिले दिव्य शिशु को पंडालम के राजा राजशेखर ने गोद लिया। मणिकंटन ने शास्त्र और शस्त्र दोनों में अद्भुत प्रतिभा दिखाई।",
          "दीवान की साजिश से रानी ने बीमारी का नाटक किया और इलाज के लिए बाघिन का दूध माँगा। मणिकंटन अकेले जंगल गए, माहिषी का वध किया और देवों के साथ बाघ पर सवार होकर लौटे — तब उनकी दिव्यता प्रकट हुई।",
          "दिव्य कार्य पूर्ण कर मणिकंटन ने शबरी के तपस्थल शबरिमला में धर्मशास्ता का मंदिर बनाने का आदेश दिया और तीर्थयात्रियों के लिए 41 दिन का व्रत निर्धारित किया।",
          "आज भी लाखों भक्त पंपा में स्नान कर ‘स्वामीये शरणम् अयप्पा’ जपते हुए इरुमुडि लेकर अठारह सीढ़ियाँ चढ़ते हैं।",
        ],
      },
      te: {
        title: "శ్రీ అయ్యప్ప – జననం మరియు చరిత్ర",
        body: [
          "అయ్యప్ప స్వరూపం గురించి అనేక కథలు ఉన్నాయి. సముద్ర మథన కాలంలో శివుడు – మోహిని (విష్ణువు) సంయోగం ద్వారా హరిహరుపుత్రుడు పుట్టినదనే పురాణ కథ, అలాగే భస్మాసురుని వధ కథ ప్రసిద్ధం.",
          "చరిత్రలో పాండ్య వంశానికి చెందిన మణికంటుడి గురించిన వృత్తాంతం ఉంది (800 ఏళ్ల క్రితం). పంబ తీరం వద్ద లభించిన దివ్యశిశువును పండల రాజు రాజశేఖరుడు దత్తత తీసుకున్నాడు. మణికంటుడు శాస్త్ర‑శస్త్రాలలో అసాధారణ ప్రతిభ చూపాడు.",
          "దేవాన్ కుట్రతో రాణి అనారోగ్య నటన చేసి పులి పాలే ఔషధమని తెలిపింది. మణికంటుడు ఒంటరిగా అడవికి వెళ్లి మహిషిని సంహరించి పులులపై ప్రయాణించి తిరిగి వచ్చాడు — అప్పుడు ఆయన దివ్య స్వరూపం రాజుకు తెలిసింది.",
          "దేవలోకానికి వెళ్లేముందు శబరిమలలో ధర్మశాస్తా ఆలయం నిర్మించాలని ఆజ్ఞాపించి, యాత్రికులకు 41 రోజుల వ్రతాన్ని నియమించాడు.",
          "నేడు కూడా లక్షలాది భక్తులు పంబలో స్నానం చేసి ఇరుముడు తీసుకుని ‘స్వామియే శరణం అయ్యప్ప’ అని జపిస్తూ పధినెనిమిది అడుగులు ఎక్కుతారు.",
        ],
      },
      ta: {
        title: "ஸ்ரீ அய்யப்பன் – பிறப்பும் வரலாறும்",
        body: [
          "அய்யப்பனின் அவதாரம் குறித்து பல கதைகள் உள்ளன. சமுத்திர மந்தனத்தின் போது சிவன் மற்றும் மோகினி (விஷ்ணு) இணைப்பில் பிறந்த ஹரிஹரபுத்திரன் என்ற புராணக் கதை பிரசித்தம்.",
          "வரலாறு படி, சுமார் 800 ஆண்டுகளுக்கு முன் பாண்டிய வம்சத்துடன் தொடர்புடைய மணிகண்டன். பம்பா கரையில் கிடைத்த தெய்வக் குழந்தையை பண்டலம் ராஜா ராஜசேகரன் தத்தெடுத்தார். மணிகண்டன் சாஸ்திர, சஸ்திரங்களில் சிறந்த திறமை காட்டினார்.",
          "தீவான் சூழ்ச்சியால் ராணி நோய்வாதம் நடித்து புலிப் பால் தேவை என கூறினர். மணிகண்டன் காடிற்குச் சென்று மஹிஷியை வென்று புலிகளில் திரும்பினார் — அப்போது தெய்வீக ரூபம் வெளிப்பட்டது.",
          "தெய்வக் கடமை நிறைவு செய்து சபரிமலையில் தர்மசாஸ்தா ஆலயம் அமைக்க சொல்லி, யாத்திரிகர்களுக்கு 41 நாள் விரதத்தை விதித்தார்.",
          "இன்றும் கோடிக்கணக்கான பக்தர்கள் ‘ஸ்வாமியே சரணம் அய்யப்பா’ என ஜபித்து பம்பாவில் स्नனம் செய்து இருமுடியுடன் 18 படிகளை ஏறுகின்றனர்.",
        ],
      },
      kn: {
        title: "ಶ್ರೀ ಅಯ್ಯಪ್ಪ – ಜನನ ಮತ್ತು ಇತಿಹಾಸ",
        body: [
          "ಅಯ್ಯಪ್ಪನ ಅವತಾರ ಕುರಿತು ಅನೇಕ ಕಥೆಗಳು প্রচಾರದಲ್ಲಿವೆ. ಸಮುದ್ರಮಥನದ ವೇಳೆ ಶಿವ‑ಮೋಹಿನಿಯ ದೈವಿಕ ಸಂಗಮದಿಂದ ಹರಿಹರಪುತ್ರನ ಜನನದ ಪುರಾಣಕಥೆ ಪ್ರಸಿದ್ಧ.",
          "ಐತಿಹಾಸಿಕವಾಗಿ ಸುಮಾರು 800 ವರ್ಷಗಳ ಹಿಂದೆ ಪಾಂಡ್ಯ ವಂಶ ಸಂಬಂಧಿ ಮಣಿಕಂಟನ ಬಗ್ಗೆ ವರ್ತಮಾನವಿದೆ. ಪಂಪಾ ತೀರದಲ್ಲಿ ಸಿಕ್ಕ ದೈವಶಿಶುವನ್ನು ಪಂಡಲಂ ರಾಜ ರಾಜಶೇಖರ ದತ್ತಕ ತೆಗೆದುಕೊಂಡರು. ಮಣಿಕಂಟನು ಶಾಸ್ತ್ರ‑ಶಸ್ತ್ರಗಳಲ್ಲಿ ಅಪ್ರತಿಮ ಪ್ರತಿಭೆ ತೋರಿದನು.",
          "ದಿವಾನದ ಕುತಂತ್ರದಿಂದ ರಾಣಿ ಅನಾರೋಗ್ಯವಾಗಿ ನಟಿಸಿ ಹುಲಿ ಹಾಲು ಬೇಕೆಂದು ಹೇಳಿಸಲಾಯಿತು. ಮಣಿಕಂಟನು ಮಹಿಷಿಯನ್ನು ಸಂಹರಿಸಿ ದೇವತೆಗಳೊಂದಿಗೆ ಹುಲಿಗಳ ಮೇಲೆ ವಾಪಸ್ಸಾದನು — ಆಗ ಅವನ ದಿವ್ಯತೆ ತಿಳಿದುಬಂತು.",
          "ದೇವಲೋಕಕ್ಕೆ ಮರಳುವ ಮೊದಲು ಶಬರಿಮಲೆಲ್ಲಿ ಧರ್ಮಶಾಸ್ತ್ರ ದೇವರ ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಲು ಹೇಳಿ, ಯಾತ್ರಿಕರಿಗೆ 41 ದಿನಗಳ ವ್ರತವನ್ನು ನಿಯಮಿಸಿದರು.",
          "ಇಂದಿಗೂ ಲಕ್ಷಾಂತರ ಭಕ್ತರು ಪಂಪೆಯಲ್ಲಿ ಸ್ನಾನ ಮಾಡಿ ಇರುಮುಡಿಯನ್ನು ಹೊತ್ತು ‘ಸ್ವಾಮಿಯೆ ಶರಣಂ ಅಯ್ಯಪ್ಪ’ ಎಂದು ಜಪಿಸುತ್ತಾ 18 ಹೆಜ್ಜೆಗಳನ್ನು ಏರುತ್ತಾರೆ.",
        ],
      },
    }),
    []
  );
  // Full story content in multiple languages (user-provided)
  const fullBirthContent = useMemo<Record<Language, ContentBlock>>( 
    () => ({
      en: {
        title: "Lord Ayyappa – Birth And History",
        body: [
          "Different versions of stories about the incarnation of Lord Ayyappa are in circulation. There is a Vedic or Puranic deity Harihara Putra, born out of the holy union of Siva and the feminine form of Vishnu called Mohini at the Samudra Manthan (churning of milky ocean) during the Koorma Avatar (incarnation of Maha Vishnu as Turtle) at the beginning of the present Chatur Yuga. Another legend is related to the killing of Vrikasura (Bhasmasura), during the second incarnation of Vishnu as Mohini, from a later period.",
          "Then there is a historical person, Manikantan, related to the Pandya dysnasty of Madurai in present day Tamil Nadu. This is from a period 800 years ago. This legend is described below. Bhootanatha Upakhyanam, extracted from Brahmanda Puranam and retold in Malayalam by Shri. Kallarackal Krishnan Nair and another translation by Shri. P.N. Krishnanunni and a third book Bhootanatha Sarvaswam by Shri. Kurumulloor Narayana Pillai are considered as authentic references for Ayyappa the historical person.",
          "The members of Pandya dynasty ousted by Tirumala Naicker, the ruler of the Pandya Empire spanning Madurai, Tirunelveli and Ramanathapuram lived in places like Valliyur, Tenkasi, Shenkottai, Achankovil and Sivagiri. They had also established their supremacy in parts of Travancore, and some of them belonging to Chempazhanattu Kovil in Sivagiri were given the right to rule the province of Pandalam by the King of Travancore, some eight hundred years ago. King Rajashekhara, the foster father of Lord Ayyappa belonged to this dynasty.",
          "A just and precocious sovereign King Rajashekhara was held by his subjects in high esteem. Under him, the region was witnessing a golden age. But the king had one sorrow: he was childless and thus had no heir to inherit his throne. Both the hapless king and his queen prayed fervently to Lord Shiva for a child.",
          "Around the same time, a demon by the name of Mahishasura (in the shape of a bullock) undertook severe penance (tapas) and consequently Lord Brahma was forced to grant his wish that nobody on earth could annihilate him. Emboldened by Brahma’s boon, Mahishasura commenced systematic destruction of people and pulverized tribes and communities. Terrorized and fearing his wrath, people fled to distant lands. Realizing that only a superhuman power could exterminate the wayward Mahishasura, the devas appealed to Goddess Durga, who killed him in a fierce battle.",
          "Determined to avenge her slain brother, Mahishi, the sister of Mahishasura secured a boon from Lord Brahma that no being except the offspring of Vishnu (Hari) & Shiva (Haran) could slay her. In due course of time, Mahishi went to Devaloka and began harassing the Devas who in turn implored Lord Vishnu to intervene. As the boon was that nobody except the son of Lord Shiva & Vishnu could kill Mahishi, Lord Vishnu assumed the female persona of Mohini (beautiful lady) who was instrumental in the killing of Vrikasura (Bhasmasua). The Mohini avatar of Vishnu earlier was to help the devas get the divine prize Amrit, immortal nectar, came out of Samudra Manthan, churning of milky ocean, away from the asuras. The male child born out of the union of Mohini (Vishnu) and Lord Shiva was placed at the bank of Pampa river.",
          "On one of his hunting trips to the forests near River Pampa, as King Rajashekhara reclined on the banks of river mulling over the natural beauty of the surroundings and waterfalls, he heard an infant’s wails from the forest. Astounded, he followed the sounds and came upon a beautiful child furiously kicking its feet and arms. The king stood there, perplexed – he longed to take the child home to his palace.",
          "Whilst King Rajashekhara beheld the divine child, a sadhu appeared from nowhere and instructed him to take the infant to his palace. Also the mendicant assured him that the child would mitigate his dynasty’s sufferings and that when the boy turned twelve, Rajashekhara would be aware of his divinity. As the child was wearing a gold chain with bell (mony), the sadhu directed the King to name him Manikandan, one with a golden neck.",
          "Ecstatic, Rajashekhara took Manikandan home and narrated the happenings to his queen. They both felt that they had been blessed by Lord Shiva himself. All except the Diwan/minister who had entertained hopes of becoming the king after Rajashekhara, rejoiced in the royal couple’s happiness.",
          "As a child, Manikandan was very intelligent and precocious. He excelled in martial arts and shastras and surprised his guru with his brilliance and superhuman talents. Peace and prosperity reigned in Pandalam. Eventually, Ayyappan’s guru concluded that the boy was no ordinary mortal but a divine being. Upon completing his studies, Manikandan went up to his teacher to offer guru dakshina and seek his blessings in turn.",
          "As he approached his spiritual master for asheerwaad (blessing), the guru explained to Manikandan what he had already surmised about him, that he was a divine power destined for superhuman glory. The guru then beseeched him to bestow vision and speech upon his son who was blind and dumb. Manikandan placed his hands on the guru’s son and the boy immediately gained eyesight and speech. Requesting that this miracle be revealed to none, Manikandan returned to the palace.",
          "Manikantan had learnt martial arts, organized local people, in the name of Yogams and taught them warfare and martial arts to prepare them against thieves, looters and enemies. He had killed Udayanan, a looter with base at Karimala, who had abducted the princess of Pandalam. When Vaparan, another warrior, a thief and looter attacked poor peole of Pandala kingdom, Manikantan fought with him, endowed him with good advices and finally made him a good friend.",
          "Meanwhile the Queen had given birth to a male child who was named Raja Rajan. Sensing that these miraculous turn of events were somehow inextricably linked to Manikandan, Rajasekhara, decided to crown him King; he obviously considered Lord Ayyappan his eldest son. Everybody with the exception of the King’s Diwan got dejected. This wily minister, who secretly nursed kingly ambitions, hated Manikandan and devised manifold plots, including poisoning of food to exterminate the divine avatar. Manikandan had a few narrow escapes, yet his body bore an injury that none could cure. Finally, Lord Shiva himself in the garb of a healer cured the young boy.",
          "His plans foiled, the Diwan told, injecting poison in the minds of the Queen that it was highly improper for Manikandan to succeed Rajashekhara, as her own son was alive who will have to suffer a lot if Manikandan were to become the king. Since Arthasastra considers that ends justify the means, he instigated her to feign illness; he assured the Queen that he would make his physician proclaim that she could be cured only by the application of a tigress’ milk. Manikandan would be impelled to go to the forest where he would fall a prey to wild animals, or even if he returned home without accomplishing the task, Rajashekhara’s love for him would not be the same as before. Blinded by her attachment for her own son, the Queen vowed to help the Diwan and pretended as though she was suffering from a terrible headache. The King grew alarmed and summoned his physicians who were unable to revive the seemingly ailing Queen. Eventually the Diwan’s accomplice physician declared that she would be cured of the malady only if the milk of a lactating tigress were made available. Rajashekhara proclaimed that he would hand over half his kingdom to anybody who could cure the hapless Queen.",
          "The team of soldiers sent by Rajashekhara with the sole purpose of getting the milk returned empty handed. Manikandan offered to help, but the King would not heed his pleas to go to the forest, citing the boy’s tender age and impending coronation as reasons. Unperturbed, Manikandan requested his father to do him a favour. Rajashekhara, ever the indulgent parent relented immediately; the boy seizing the opportunity pressed him to let him collect the milk. Manikandan stalled Rajashekhara’s efforts to organize a band of brave men to accompany him into the forest; he argued that the tigress would leave silently upon seeing the crowd of soldiers. Reluctantly Rajashekhara bid farewell to his favourite son.",
          "The Bhootagana/servants of Lord Shiva closely followed Manikandan as he entered the forest. But on the way, he chanced to witness the atrocities of the demoness Mahishi even in Devaloka. His sense of justice outraged, Manikandan hurled Mahishi onto the earth below; she fell on the banks of the Azhutha River. A bloody battle soon ensued and at the end, Manikandan mounted Mahishi’s chest and commenced a violent dance that reverberated within the earth and the Devaloka. Even the Devas were frightened. Mahishi realized that the divine being on her was the son of Hari and Haran, chastened, she prostrated before the young boy and died.",
          "Following his confrontation with Mahishi, Manikandan entered the forest for tigress’ milk. He had a darshan of Lord Shiva who informed him that even though he had fulfilled the divine plan, he still had one major task to accomplish. Manikandan was reminded about his grief stricken father and ailing mother; also he was assured of Lord Indra’s assistance in obtaining the much prized tigress’ milk. Manikandan made his way to the Royal palace on Lord Devendra, disguised as a tiger; they were accompanied by female devas in the guise of tigresses and male devas as tigers.",
          "The people of Pandalam panicked upon seeing the boy and the tigers and hurriedly sought shelter. Soon after, the Sadhu, who had first materialized before Rajashekhara in the forest, when he heard a child’s wails appeared again and revealed Manikandan’s true identity to the wonder-struck king. The King grew silent and pensive, as Manikandan approached the palace gates with the tigers. The boy descended from the tiger’s back and informed the solemn King that he could get the milk from the tigresses and cure the Queen of the mysterious ailment. Unable to contain himself any longer, Rajashekhara fell at the lad’s feet and begged for forgiveness, he had finally seen through his Queen’s pretense; her malady had ceased the moment Manikandan had left for the forest. On the day he returned from the forest, Manikandan turned twelve years old.",
          "King Rajashekhara decided to punish his Diwan as the latter was responsible for his son’s exile into the forest. Manikandan, however advised restraint; he held that all had unfolded in accordance with the divine order, through the will of God. Also he reminded his father that as he had accomplished the task for which he had created himself, he would return to Devaloka without fail. Before his departure, the lad told the King that he as he was pleased by the latter’s unflinching faith and devotion, he would grant him whatever boon Rajashekhara requested for. Immediately, the King Rajasekara told him that they wanted to construct a temple in his memory and beseeched him to suggest a suitable place for the temple. Manikandan aimed an arrow which fell at a place called Sabarimala, where in the Sri Rama’s era a Sanyasini called Sabari observed tapas. Lord Manikandan told the King to renovate the existing Dharma Sastha temple in that place, built by Sage Parasurama, an avatar of Vishnu and then he disappeared. Manikandan then reached the Dharma Sastha temple, and merged with the murti of Dharma Sastha.",
          "Later, acting upon the advice of Sage Agasthya, King Rajashekhara laid the foundation stone of the present temple at Sabarimala. Lord Manikandan, had stated emphatically that he would grace only those devotees who come for his darshan after observing forty one days’ penance or vratam. Devotees are expected to adhere to a way of life akin to that of a brahmachari, celibate, constantly reflecting on the divine. Whilst they make their way up the steep slopes of Sabarimala, they adorn themselves with three-eyed coconut filled with ghee, pooja materials and foodstuff on their heads called ‘Irumudi’, and bathed in River Pampa chanting ‘Swami Saranam’ and climb the divine eighteen steps of the temple.",
          "Every year, millions converge upon Sabarimala irrespective of caste or creed, with garlands and irumudis, chant paeans to Lord Ayyappa, bathe in holy river Pampa, climb up the eighteen steps, hoping to catch a glimpse of Lord Ayyappa, the Dharma Sastha.",
        ],
      },
      ml: {
        title: "ശ്രീ അയ്യപ്പൻ – ജനനവും ചരിത്രവും",
        body: [
          "ഇതിനുപുറമേ 800 ഓളം വർഷം പഴക്കമുള്ള, ഇന്നത്തെ തമിഴ്‌നാട്ടിലെ മധുരായ് പാണ്ഡ്യ രാജവംശത്തോട് ബന്ധമുണ്ട് എന്ന ചരിത്ര പുരുഷനായ മാണികണ്ഠനുമുണ്ട്. ഈ കഥ താഴെ വിവരിച്ചിരിക്കുന്നു. ബ്രഹ്മാണ്ഡ പുരാണത്തിൽ നിന്ന് എടുത്ത ബൂതനാഥ ഉപാഖ്യാനം, ശ്രീ കുട്ടലക്കൽ കൃഷ്ണൻ നായരുടെയും, ശ്രീ പി.എൻ. കൃഷ്ണൻഉണ്ണിയുടെയും മാതൃഭാഷ പരിഭാഷ, ശ്രീ കുറുമുളൂർ नारായണ പിള്ളയുടെയും ബൂതനാഥ സർവ്വസ്വം എന്നീ പുസ്തകങ്ങളും ചരിത്ര പുരുഷനായ അയ്യപ്പയുടെ പ്രാമാണിക രേഖകളായി പരിഗണിക്കുന്നു.",
          "മധുര, തിരുനെൽവേലി, രാമനാഥപുരം എന്നിവിടങ്ങൾ ഉൾപ്പെടുത്തി പാണ്ഡ്യ സാമ്രാജ്യത്തെ ഭരണത്തിൽ നിന്നും തിരുമല നായ്ക്കർ പുറത്താക്കിയ പാണ്ഡ്യ രാജവംശാംഗങ്ങൾ വല്ലിയൂർ, തെങ്കാശി, ചെങ്കോട്ട, അചങ്കോവിൽ, ശിവഗിരി തുടങ്ങിയ സ്ഥലങ്ങളിൽ താമസിച്ചു. ട്രാവൻകൂർ രാജാവ് ചെമ്പഴനാട്ട് കൊവ്വിലിലെ ചിലർക്ക് പാണ്ടലത്തെ ഭരിക്കാൻ അവകാശം നൽകി. പാണ്ടലം ദൈനവായിരുന്നു രാജശേഖരനെ ലോർഡ് അയ്യപ്പയുടെ പിതാവായി ആക്കിയത്.",
          "പൃഥ്വിയിലുള്ളവർ കൊന്നിരിക്കുകയായിരുന്ന തിന്മകളെ ചെറുക്കാൻ അനുഗ്രഹത്തോടെയുള്ള ശിശുവിനായി രാജശേഖരനും രാജ്ഞിയും ശിവനോട് പ്രാർത്ഥിച്ചു.",
          "അതേ സമയത്ത് മഹിഷാസുരൻ എന്ന കൊള്ലപ്പം മാസംകൊണ്ടു ബ്രഹ്മാവിന്റെ അനുഗ്രഹം നേടി: ആരും അവനെ കൊല്ലാനാകില്ലെന്ന്. ദേശങ്ങൾക്കുപോലും അതിജീവിക്കാൻ കഴിയാത്ത വിധം മഹിഷാസുരൻ കൂട്ടങ്ങൾക്കു കൂട്ടമായി നശിപ്പിച്ചു. ഭയന്നുപോയ ജനങ്ങൾ അകറ്റ ദേശങ്ങളിൽ പിച്ചിൽ പോയി. ദേവികൾ, ദുർഗയെ അഭ്യർത്ഥിച്ചു. അവൾ മഹിഷാസുരനെ കൊല്ലുന്നു.",
          "വധിക്കപ്പെട്ട സഹോദരന്റെ പ്രതികാരം തേടി മഹിഷിയുടെ പങ്ക്; ബ്രഹ്മാവിൽ നിന്ന് വിഷ്ണുവിന്റെയും ശിവന്റെയും മകൻ മാത്രമാകണം എന്ന ഭൂനി അവർ നേടി. പിന്നീടു ദേവലോകത്തേക്ക് പോയി ദേവികളെ പീഡിപ്പിച്ചു. ദേവികൾ വിഷ്ണുവിനെ കാത്തു, വിഷ్ణു മോഹിനി രൂപം (സുന്ദരിയായ സ്ത്രീ) സ്വീകരിച്ചു. മോഹിനി രൂപം ദേവരുക്കു അമൃതം നേടാൻ ഉപകൃതമായിരുന്നു. സിവയും മോഹിനിയും ചേർന്നപ്പോൾ പമ്പനദീതീരത്ത് ശിശു ജനിച്ചു.",
          "പമ്പാനദിയുടെ അടുക്കൽ രാജശേഖരൻ വേട്ടയാടാൻ പോയപ്പോൾ ശിശുവിന്റെ വിങ്ങുന്ന ശബ്ദം കേട്ടു. സുന്ദരകുഞ്ഞിനെ കണ്ടു, രാജാവ് രാജകുമാരിയായിട്ടുകൊണ്ടു കൊണ്ടു പോയി. അവനെ മാറോട്ടം കൊണ്ടുപോയി. കുട്ടിയുടെ കഴുത്തിൽ മണിയായ ഒറ്റചങ്ങല ഘട്ടത്തിനായി മാണികണ്ഠൻ എന്നു പേരിട്ടു.",
          "ഉത്സാഹത്തോടെ രാജാവ് രാജ്ഞിയോടു സംഭവങ്ങൾ പറഞ്ഞു. രാജ്ഞിയും സന്തോഷിച്ചു, ശിവന്റെ അനുഗ്രഹമായി കണ്ടു. ദിവാന്മാർ മാത്രം ദുഖിച്ചു.",
          "കുട്ടിക്കാലത്ത് മാണികണ്ഠൻ അഗാധബുദ്ധിയും ധീരനും ആയിരുന്നു, യുദ്ധകലകളിൽ പാടവമുണ്ടായിരുന്നു, ഗുരുവിനെ അത്ഭുതപ്പെടുത്താൻ കഴിഞ്ഞു. സമാധാനവും സമൃദ്ധിയും പാണ്ടലത്ത് നിലനിന്നു. പഠനം പൂർത്തിയാക്കി ഗുരുവിനോട് ഗുരുവന്ദനം ചെയ്ത് അനുഗ്രഹം തേടി.",
          "ആശീർവാദവുമായി ഗുരു, മാണികണ്ഠനെ ദൈവീയശക്തി എന്ന് ബോധ്യപ്പെടുത്തി, ഗുരുവിന്റെ കുരുടരെയും മുഖവികലരെയും സ്നാനം മാർഗ്ഗം ദർശനം ലഭിച്ചു. ആരെയും അറിയിക്കരുതെന്നു പറഞ്ഞു, മാണികണ്ഠൻ മടങ്ങി.",
          "യോഗങ്ങളിൽ വിളിച്ചു ചേർത്ത്, തട്ടിത്തരിക്കും ആശങ്കകൾക്കെതിരെ യുദ്ധകലയും ശിക്ഷണവും നൽകി. ഉദയനൻ എന്ന കപടനെ കൊല്ലി, കുടിയരേയുടെയും സ്വന്തം രാജ്ഞിയുടെയും മകനായ രാജ രാജൻസ് ജനിച്ചു. രാജശേഖരൻ മാണികണ്ഠനെ രാജാവാക്കാൻ തീരുമാനിച്ചു. ദിവാൻ മാത്രം നിരാശനായി. പലതരത്തിലുള്ള കൊലയാളി ശ്രമങ്ങളെക്കും മാണികണ്ഠൻ അതിജീവിച്ചെങ്കിലും ഒരിടവേള തടസ്സപ്പെടുകയുണ്ടായി. ശിവൻതന്നെ വൈദ്യനായി വന്ന് അവനെ വിധവുമാക്കി.",
          "ദിവാനം രാജ്ഞിക്ക് കുതിരാവിഷം നൽകുന്നു, അവളെ രോഗിയായിത്തിരിക്കുന്നു നടിക്കുകയും. കടുവപ്പാലിനോടു മാത്രമാ രോഗം മാറുകയെന്നു നിർവഹിക്കുന്നു. രാജശേഖരൻ ആരേയും പുറത്ത് പോവാതെ മാണികണ്ഠനെയാണ് വിടരുത് എന്ന് പറഞ്ഞു. മാണികണ്ഠൻ മാത്രം പോവുന്നു.",
          "കാടിൽ പോകുന്ന വഴി മഹിഷിയെ നേരിടുന്നു, മഹിഷിയെ തോൽപ്പിച്ചു. മഹിഷി മനപ്പൂർവ്വം കീഴ്‍വഴങ്ങുന്നു. പിന്നീടു കടുവപ്പാൽ ശേഖരിക്കുന്നു, ഭഗവാന്റെ സഹായത്തോടെ. രാജഭവനത്തേക്ക് കടുവകളിൽ യാത്രചെയ്യുന്നു. രാജാവ് മനസ്സിലാക്കുന്നു. അമ്മയുടെ അസുഖം മാറുന്നു. മാണികണ്ഠൻ പന്ത്രണ്ടാം വയസ്സിൽ തിരിച്ചു വരുന്നു.",
          "ദിവാനെ ശിക്ഷിക്കാനാവശ്യപ്പെട്ടെങ്കിലും മാണികണ്ഠൻ ദൈവീകക്രമം അനുസരിച്ച് സംഭവങ്ങൾ നടന്നതാണെന്ന് പറയുന്നു. രാജാവിന്റെ അനശ്വരവിശ്വാസം കണ്ടു സന്തോഷിച്ചു വൃക്ഷം ഇടുന്നു, ശബരീമലയിലെ ധർമ്മശാസ്തക്ഷേത്രത്തിലേക്ക് പോകാൻ നിർദ്ദേശിക്കുന്നു. അവിടെ ശിവന്റെ രൂപത്തിൽ ലയിക്കുന്നു.",
          "ശേഷം സന്യാസി ശബരി താമസിച്ച സ്ഥലത്ത് ക്ഷേത്രസ്ഥാപനം കഴിക്കുന്നു. അർച്ചനക്കായി ക്ഷീരവ്രതം അനുഷ്ഠിക്കുന്നവരെ മാത്രം ദർശനത്തിന് അനുഗ്രഹിക്കുന്നുവെന്ന് രാജാവിനോട് അറിയിക്കുന്നു. ഭക്തർ മനസ്സും ശരീരവും വിശുദ്ധമായി വച്ച് ഇറുമുടി കെട്ടി പോകുന്നു, പമ്പയിൽ കുളിച്ച് 'സ്വാമിശരണം' അരിപ്പിച്ച് പതിനെട്ടടികളും കയറുന്നു.",
          "പ്രതി വർഷം, കുലവും മതവും വനങ്ങൾക്കുമുവർത്തി, കുടുംബങ്ങൾ അയ്യപ്പയെ ദർശിക്കാൻ എത്തുന്നു.",
        ],
      },
      te: {
        title: "శ్రీ అయ్యప్ప – జననం మరియు చరిత్ర",
        body: [
          "తర్వాత చారిత్రక వ్యక్తి, మణికంఠన్, ఈయన ప్రస్తుతం తమిళనాడు లోని మధురై పాండ్య రాజవంశానికి చెందినవాడు. ఇది 800 సంవత్సరాల క్రితం జరిగిన కధ. ఈ కథను క్రింద వివరించారు. బూతనాధ ఉపఖ్యానం, బ్రహ్మాండ పురాణం నుండి తీసుకుని మలయాళంలో శ్రీ. కಲ್ಲరక్కల్ కృష్ణన్ నాయర్, శ్రీ. పి.ఎన్. కృష్ణనున్ని మరియు శ్రీ. కురుముల్లోర్ నారాయణ పిళ్ళై రాసిన బూతనాథ సర్వస్వం తదితర పుస్తకాలు అయ్యప్ప చారిత్రక వ్యక్తిగా గుర్తింపబడుతున్నాయి.",
          "పాండ్య రాజవంశ సభ్యులను తిరుమల నాయకర్, పాండ్య సామ్రాజ్యపు పాలకుడు, మధురై, తిరునెల్వేలి, రామనాథపురం వంటి ప్రాంతాలకు పంపించాడు. వారు వల్లిూరు, తేన్కాసి, చెంకొట్టై, అచంకోవిల్, శివగిరి వంటివి నివాసాలుగా ఏర్పరచుకున్నారు. కొందరు ట్రావంకూర్‌లో తమ ఆధిపత్యాన్ని నెలకొల్పారు, మరికొందరు శివగిరిలోని చెంపజనట్టు కోవిలును పాలించే హక్కును ట్రావంకూర్ రాజు ఇచ్చారు, ఇది 800 సంవత్సరాల క్రితం జరిగింది. లార్డ్ అయ్యప్ప తండ్రి రాజశేఖర ఈ రాజవంశానికి చెందినవాడు.",
          "న్యాయనిపుణుడు, తెలివైన రాజశేఖరను ప్రజలు అత్యంత గౌరవించారు. ఆయన పాలనలో ఆ ప్రాంతానికి ‘సువర్ణ యుగం’ వచ్చింది. కానీ రాజుకు ఒక బాధలు ఉండేది, ఆయనకు సంతానం లేకుండా, వారసుడు ఉండలేదు. బాధపడుతున్న రాజూ, రాణి కూడా శివుని పూజించి పిల్ల కొరకు ప్రార్థించారు.",
          "అందువల్ల మహిషాసురుడు (పెంటపంది ఆకారంలో) పదునైన తపస్సు చేసినాడు. బ్రహ్మదేవుడికి ఈడే మంత్రము దాదాపు అందించాల్సివచ్చింది, ఎవరూ మహిషాసురుని చంపలేరు అనే వరం ఇచ్చాడు. ఈ వరంతో మహిషాసురుడు ప్రజలను, తెగలను నాశనం చేయడం మొదలుపెట్టాడు. ప్రజలు అతని భయంతో దూర ప్రాంతాలకు పారిపోయారు. మహిషాసురుని సంహారం చేయడం కోసం దేవతలు దుర్గను ప్రర్థించి, ఆమె కొత్త యుద్ధంలో అతనిని చంపింది.",
          "తన సోదరుడిని చంపిన ప్రతీకారం కోసం మహిషి, మహిషాసురుని సోదరి, బ్రహ్మదేవుని నుండి విష్ణు (హరి), శివ (హరన్) సంతానం మాత్రమే తనను సంహరించగలరు అనే వరాన్ని పొందింది. కాలక్రమంగా మహిషి దేవలోకానికి వెళ్లి, దేవతలను వేధించటం మొదలుపెట్టింది. వారు విష్ణువుని ప్రార్థించడంతో, విష్ణువు మోహిని రూపం ధరించాడు, ఈ రూపం వృకాసురుని సంహరించడంలో కీలక పాత్ర పోషించింది. మోహిని అవతారంలో విష్ణువు, దేవతలకు అమృతాన్ని (అమరత్వం) పొందడానికి సహాయం చేశాడు, ఇది సముద్రమథనం ద్వారా వచ్చింది. మోహిని (విష్ణువు) మరియు శివుని సంభందంతో పుట్టిన మగ బిడ్డను పంపానది ఒడ్డున వదిలారు.",
          "ఒక రోజు, రాజశేఖర వేట వెళ్ళి పంబా నది ఒడ్డున విశ్రమించే సమయంలో, అడవిలో ఒక శిశువు అరుపులు విన్నాడు. ఆశ్చర్యంతో, శబ్దాన్ని అనుసరించి, చేతులు, కాళ్లతో తష్టికుట్టుతున్న అందమైన బిడ్డను చూశాడు. బిడ్డను ప్యాలెస్‌కు తీసుకెళ్ళాలని రాజుకు కోరిక వచ్చింది.",
          "అప్పుడు ఒక సాధువు ప్రత్యక్షమై, బిడ్డను ప్యాలెస్‌కు తీసుకెళ్ళమని సూచించాడు. బాలుడు పన్నెండు సంవత్సరాలు పూర్తి చేసుకున్నవెనుక అతను దివ్యత్వంతో కూడినవాడవుతాడని చెప్పాడు. బిడ్డ మెడలో బంగారు గొలుసు, గంట ఉన్నందున ‘మణికంఠన్’ అనే పేరు పెట్టమని చెప్పాడు.",
          "ఆనందంగా, రాజశేఖర మణికంఠన్‌ను ఇంటికి తీసుకెళ్లి, జరిగిన విషయం రాణి కి వివరించాడు. ఇద్దరూ శివుని ఆశీర్వాదంగా భావించారు. అందరూ రాజా, రాణి సంతోషమయ్యారు. ఉద్వేగంగా మంత్రికి మాత్రం (దివాన్) నిరాశే.",
          "బాల్యంలొ మణికంఠన్ అతి తెలివైనవాడు, యుద్ధ కళల్లో, శస్త్రాల్లో నేర్పరి. తన గురువుని అద్భుతంగా ఆశ్చర్యపరిచాడు. పాండలం‌లో శాంతి, శ్రేయస్సు ఏర్పడింది. చివరగా, మణికంఠన్ తన చదువు ముగించుకొని, గురుదక్షిణ కోసం దానే గురువుని ఆశీర్వాదం కోరాడు.",
          "గురువు మణికంఠన్‌ను దివ్యశక్తిగా భావించి, తన కనికరం వెలితివాడికి దృష్టి, మాట ఇవ్వమని కోరాడు. మణికంఠన్ అతని మీద చేతులు పెట్టి, వెంటనే అతనికి చూపు, మాట వచ్చాయి. ఈ ముడిపట్టి విషయాన్ని ఎవరికీ చెప్పవద్దని కోరగా, మణికంఠన్ తిరిగి ప్యాలెస్‌కు వెళ్ళాడు.",
          "మణికంఠన్ యుద్ధ కళలు నేర్పించి, స్థానికులను యోగం పేరుతో సంఘటితం చేసారు. దొంగలైన వారి నుంచి రక్షణ కోసం వారిని శిక్షణ ఇచ్చాడు. అతడు ధరింకి అనే దొంగను చంపాడు, అతడు పాండలం రాజకుమారుతి ని అపహరించేవాడు. వాపరన్, మరొక యోధుడు, పాండలం ప్రజలను వేధించేవాడు, మణికంఠన్ అతనితో పోరాడి, మంచి సలహాలు ఇచ్చాడు, చివరకు స్నేహితుడయ్యాడు.",
          "మధ్యలో రాణి కొడుకు రాజా రాజన్‌ కు జన్మనిచ్చింది. ఈ అనుభూతుల్లో మణికంఠన్‌తో అనుబంధం ఉందని తెలుసుకున్న రాజశేఖర, అతనిని రాజుగా ప్రకటించాలని నిర్ణయించుకున్నాడు. అందరూ, దివాన్ మినహాయించి, నిరుత్సాహపడిపోయారు. దివాన్, రహస్యంగా రాజ పదవిని ఆశిస్తూ, మణికంఠన్ మీద కుట్రలు, ఆహార విషపూరితం చేసింది. అతను చిన్న గాయమయ్యాడు, అది ఎవ్వరూ నయం చేయలేకపోయారు. చివరికి శివుడు తన వైద్యరూపంలో వచ్చి మణికంఠన్‌కు నయం చేశాడు.",
          "దివాన్, రాణి మనసులో మణికంఠన్ రాజుగా అసలు కాకూడదని విషాన్ని నింపాడు. అర్థశాస్త్రం ప్రకారం విజయానికి అన్ని మార్గాలు సరియే అని ఆమెకు అబద్దం చెప్పి, ఆమె ఊపు తిప్పించాలని సాధ్యం చేసింది, తల్లి తీవ్ర తలనొప్పితో బాధపడుతున్నట్టు నటించింది. రాజు వైద్యులను పిలచాడు, వారు రాణిని బాగు చేయలేకపోయారు. చివరకి దివాన్ వైద్యుడు, \"మాండ్యం కావాలి అంటే పొంగు పాలు (కడువ పాలు) కావాలి\" అన్నాడు. రాజశేఖర ఈమెను బాగు చేస్తే కర్ణానికి పాలాంటే తన సగం రాజ్యం ఇస్తానని ప్రకటించాడు.",
          "రాజశేఖర పంపిన సైనికులు పాలను తెచ్చే ప్రయత్నంలో విఫలమయ్యారు. మణికంఠన్ సహాయానికి వేశాడు, కానీ రాజు అనుమతించలేదు. మణికంఠన్ తండ్రిని అనురధించి, జీవించించి, కడువ పాలు తెచ్చేందుకు అనుమతించమని విష్ణువుని ఒప్పించాడు.",
          "అటు దెయ్యం మహిషిని పోరాడి, పడికి సంహరించాడు. తరహగా మహిషి దివ్యంలో పనికిరాకుండా వ్యవహరించింది. ఆమెని పగ నెరవేర్చింది. మణికంఠన్ మట్టిలోకి వేసాడు, పోరాటంలో ఆమెకి ఆమె పాదంలో నచించాడు, ఆమె మణికంఠన్ ధర్మ పుత్రుడు అని తెలుసుకుంది, నమస్కరించి మరణించింది.",
          "అంతే కాకుండా, మణికంఠన్ కడువ పాల కోసం అడవికి వెళ్లాడు. శివుని దర్శనం చేసాడు, ఇంకా ఒక పెద్ద పని ఉందని చెప్పారు. పిత మరియు తల్లి బాధలు గుర్తుచేశారు, ఇంద్రుడు సహయం చేస్తాడని చెప్పారు. మణికంఠన్, దేవేంద్రునితో కలిసి, పులిగా మారి రాచరికం వంక రాగా, స్త్రీ దేవతలు పులి రూపంలో, పురుష దేవతలు పులి రూపంలో కెళ్ళారు.",
          "పాండలంలో ప్రజలు పిల్లను, పులులను చూసి భయపడి దాచుకున్నారు. తిరిగి అడవిలో స్వామీ రావడంతో, మణికంఠన్ సత్యాన్ని రాజశేఖరకు చెప్పారు, రాజు నిశ్శబ్ధంగా పిల్లతో పాదాల దగ్గర క్షమాపణ కోరాడు, తల్లి నటించినది అంటారు. అదే రోజు మణికంఠన్ పన్నెండు సంవత్సరాలు చేరాడు.",
          "దివాన్‌ను శిక్షించాలనుకున్నప్పటికీ, మణికంఠన్ అన్నాడు, \"ఇవి అన్నీ దేవ అభిప్రాయానికి, ఆ ఉత్తర్వు ప్రకారం జరిగినవి\". తండ్రికి దేవభక్తిని, విశ్వాసాన్ని ఆనందించడమే శుభ ప్రదం అన్నాడు. \"నాకు కఠినమైన ఉపవాసం, మలయాళ వాటి ప్రకారం సున్నిత రీతిలో దేవుడిని దర్శించాలనుకునే వారికే దీవెన లభిస్తుంది\" అన్నాడు.",
          "ఆ devotees 41 రోజుల వ్రతం చేసి, ఇరుముడికి (రెండు అల్లలు కలిగి ఉంటుంది) ఉప్పు, పూజా పదార్థాలు, తైలు, ఆహారం దిండాలుగా భర్తీ చేసి, పాంబా నదిలో స్నానం చేసుకుని, ‘స్వామి శరణం’ అంటూ 18 అడుగులు ఎక్కి అయ్యప్పను దర్శించుకుంటారు.",
          "ప్రతి సంవత్సరమూ, లక్షలాది మంది కుల, మత, ప్రాంత భేదం లేకుండా అయ్యప్ప స్వామిని దర్శించడానికి వస్తారు.",
        ],
      },
      hi: {
        title: "भगवान अयप्पा – जन्म और इतिहास",
        body: [
          "फिर एक ऐतिहासिक व्यक्ति मणिकंटन है, जो वर्तमान तमिलनाडु के मदुरै के पांड्य वंश से संबंधित है। यह करीब 800 वर्ष पुरानी कथा है। इस कथा का वर्णन नीचे दिया गया है। ब्रह्मांड पुराण से लिया गया भूथनाथ उपाख्यान, श्री कल्लरक्कल कृष्णन नायर द्वारा मलयालम में पुनर्कथन, श्री पी.एन. कृष्णनुन्नी द्वारा अनुवाद, और श्री कुरुमुल्लूर नारायण पिल्लै द्वारा लिखित 'भूथनाथ सर्वस्वम' को अय्यप्प के ऐतिहासिक व्यक्ति के प्रामाणिक संदर्भ माना जाता है।",
          "पांड्य वंश के सदस्यों को पांड्य साम्राज्य के शासक तिरुमला नायकर द्वारा निष्कासित किया गया, जो मदुरै, तिरुनेलवेली और रामनाथपुरम तक फैला था। वे वलियूर, तेनकासी, शेंकोट्टई, अचंकविल और शिवगिरि जैसे स्थानों में बस गए। उन्होंने त्रावणकोर के कुछ हिस्सों में भी अपनी श्रेष्ठता स्थापित की, और शिवगिरि के चेम्पजनट्टु कोविल के कुछ लोगों को त्रावणकोर के राजा द्वारा पांडलम प्रांत का शासन करने का अधिकार दिया गया, लगभग आठ सौ साल पहले। भगवान अय्यप्प के पालक पिता राजा राजशेखर इसी वंश के थे।",
          "न्यायप्रिय और बुद्धिमान राजा राजशेखर को प्रजा अत्यधिक सम्मान देती थी। उनकी शासनी में क्षेत्र में स्वर्ण युग चल रहा था। लेकिन राजा को एक दुख था - वे निःसंतान थे और उनकी गद्दी संभालने वाला कोई उत्तराधिकारी नहीं था। राजा-रानी दोनों ने संतति के लिए भगवान शिव की आराधना की।",
          "उसी समय महिषासुर नामक राक्षस (बैल के रूप में) ने कठोर तप किया और अंततः भगवान ब्रह्मा को मजबूर किया कि कोई भी पृथ्वीवासी उसे नष्ट न कर सके। ब्रह्मा के वरदान से महिषासुर ने लोगों का विनाश, समाजों और जातियों का संहार शुरू किया। डरे हुए लोग दूर स्थानों पर भाग गए। महिषासुर को नष्ट करने के लिए देवी दुर्गा की प्रार्थना की गई, जिन्होंने तीव्र युद्ध में उसका वध किया।",
          "अपने मारे गए भाई का बदला लेने के लिए महिषी, महिषासुर की बहन ने भगवान ब्रह्मा से यह वर मांगा कि उसका वध केवल विष्णु (हरी) और शिव (हरन) के संतान ही कर सकते हैं। समय के साथ, महिषी देवलोक चली गई और देवताओं को सताने लगी। देवताओं ने भगवान विष्णु से हस्तक्षेप करने की प्रार्थना की। चूंकि वरदान था कि शिव और विष्णु के पुत्र के अलावा कोई महिषी को नहीं मार सकता, विष्णु ने मोहिनी (सुंदर महिला) का रूप धारण किया, जो वृकासुर (भस्मासुर) के वध में सहायक थी। विष्णु का पूर्ववर्ती मोहिनी अवतार देवताओं को अमृत दिलाने, समुद्र मंथन से प्राप्त अमरता का पुरस्कार दिलाने के लिए था। मोहिनी (विष्णु) और शिव के मिलन से उत्पन्न पुत्र को पम्पा नदी के किनारे छोड़ दिया गया।",
          "राजा राजशेखर एक दिन पम्पा नदी के पास वन भ्रमण पर थे, जब उन्होंने जंगल से एक शिशु की रोने की आवाज सुनी। वे आवाज का पीछा करके सुंदर बालक के पास पहुंचे जो अपने हाथ-पैर चला रहा था। राजा बालक को महल ले जाने का इच्छुक हुआ।",
          "राजा राजशेखर के समक्ष दिव्य बालक को देखकर एक साधु अचानक आया और बालक को महल ले जाने के निर्देश दिए। साधु ने आश्वासन दिया कि बालक उनके वंश की पीड़ा को दूर करेगा और जब बालक बारह वर्ष का होगा, तब राजा को उसकी दिव्यता का ज्ञान होगा। बालक के गले में घंटी (मणी) के साथ स्वर्ण श्रृंखला देख साधु ने 'मणिकंडन' नाम रखने को कहा।",
          "राजा राजशेखर बालक को घर ले गए और रानी को सारी घटना सुनाई। दोनों ने इसे भगवान शिव का आशीर्वाद माना। रानी-राजा के अलावा मंत्री (दीवान) दुखी रहा।",
          "बाल्यावस्था में मणिकंडन अति बुद्धिमान था, युद्धकला एवं शास्त्रों में निपुण था, गुरु को अपने असाधारण गुणों से चौंका दिया। पांडलम क्षेत्र में शांति-संपन्नता आई। अंत में, अय्यप्पा के गुरु ने बालक को दिव्य समझा। पढ़ाई पूरी होने पर, मणिकंडन गुरु-दक्षिणा देने और आशिर्वाद लेने आया।",
          "गुरु ने मणिकंडन को दिव्य शक्ति मानकर उसे अपने नेत्रहीन और मूक पुत्र को दृष्टि और वाणी देने का आग्रह किया। मणिकंडन ने अपने हाथ पुत्र पर रखे और वह तुरंत देख बोल सका। इस चमत्कार को किसी को न बताने का अनुरोध किया गया।",
          "मणिकंडन ने युद्धकला सीखी, स्थानीय जनता को ‘योगम’ नाम से संघटित किया, उन्हें युद्ध और रक्षा के तरीके सिखाए। उसने करिमला के लुटेरे उदयन को मार डाला, जिसने पांडलम की राजकुमारी का अपहरण किया था। जब वपारण नामक दूसरा योद्धा-लुटेरा पांडलम के गरीबों पर हमला किया, मणिकंडन ने उससे लड़ाई की, उसे अच्छी सलाह दी और अंत में मित्र बना लिया।",
          "इसी बीच रानी ने एक पुत्र को जन्म दिया जिसका नाम राजा राजन रखा गया। इन चमत्कारिक घटनाओं को मणिकंडन से जुड़ा हुआ मानकर राजा ने उसे राजा घोषित करने का निर्णय लिया; स्पष्ट ही राजा अय्यप्पन को अपना सबसे बड़ा पुत्र मानते थे। राजा के मंत्री को छोड़कर सभी दुखी हुए। मंत्री ने राज-पद पाने की हसरत में कई साजिशें की, भोजन में विष मिलाया। मणिकंडन कई बार बाल-बाल बचा, लेकिन उसकी चोट ठीक न हो सकी। आखिरकार भगवान शिव ही वैद्य के रूप में आए और ठीक किया।",
          "मंत्री ने रानी को समझाया कि मणिकंडन राजा बनने योग्य नहीं, क्योंकि उसका भी पुत्र जीवित है और मणिकंडन के राजा बनने से उसे बहुत दुख होगा। अर्थशास्त्र अनुसार, लक्ष्य पाने के लिए कोई भी तरीका जायज है, इसलिए रानी से बीमारी का नाटक करने को कहा; चिकित्सक ने घोषणा की कि रानी को केवल बाघिन के दूध से ही लाभ होगा। राजा ने घोषणा की कि जो रानी का इलाज करेगा उसे आधा राज्य मिलेगा।",
          "राजा ने दूध लाने के लिए सैनिक भेजे जो खाली लौट आए। मणिकंडन मदद को आगे आया लेकिन राजा ने उसकी विनती नहीं मानी। निडर मणिकंडन ने पिता से कृपा मांगी, राजा ने अनुमति दी तो मणिकंडन दूध लाने जंगल गया। मणिकंडन ने सैनिकों का साथ लेने से इनकार किया। राजा ने अनिच्छा से विदा किया।",
          "मणिकंडन के साथ भगवान शिव के ‘भूतगण’ गए। रास्ते में उसने महिषी के अत्याचार देखे, उसे न्याय के भाव से धरती पर फेंका, वह अज़ुथा नदी के किनारे गिरी। रक्तपूर्ण युद्ध के बाद मणिकंडन ने महिषी की छाती पर नृत्य किया, जिससे पृथ्वी और देवलोक कांप गए। महिषी समझ गई कि यही हरि और हरन का बेटा है, उसने नतमस्तक होकर प्राण त्याग दिए।",
          "महिषी के वध के बाद मणिकंडन ने बाघिन दूध लेने के लिए जंगल प्रवेश किया। भगवान शिव के दर्शन हुए। उन्होंने बताया कि कई काम पूरे हो चुके, पर एक बड़ा कार्य बाकी है। पिता-माता के दुःख का स्मरण कराया, भगवान इंद्र की सहयता से बाघिन का दूध मिलेगा। देवेंद्र के साथ बाघ रूप में महल पहुँचा, माता देवियाँ बाघिन के रूप में तथा देव पुरुष बाघों के रूप में आये।",
          "पांडलम वासी बाघों को देखकर भयभीत होकर छिप गए। साधु फिर प्रकट हुआ और मणिकंडन की असली पहचान राजा को बताई। राजा ने मणिकंडन से क्षमा मांगी, रानी ठीक हो गई, बालक बारह वर्ष का हुआ।",
          "राजा राजशेखर मंत्री को दंड देना चाहते थे, लेकिन मणिकंडन ने संयम रखने को कहा, सब कुछ ईश्वर इच्छा से ही हुआ। चलते वक्त उसने राजा को वर मांगने को कहा, राजा ने मंदिर बनाने का निवेदन किया। मणिकंडन ने तीर चलाकर सबरीमला स्थान चुना, जहाँ श्रीराम काल में तपस्विनी सबरी ने तप किया था। मणिकंडन ने धर्म शास्ता मंदिर के नवीनीकरण का निर्देश दिया, फिर मंदिर में लीन हो गए।",
          "बाद में, अगस्त्य मुनि की सलाह पर राजा राजशेखर ने वर्तमान मंदिर की नींव रखी। मणिकंडन ने स्पष्ट कहा कि केवल वे भक्त जो 41 दिन का व्रत रखें और दर्शन को आएं, उन्हें कृपा मिलेगी। भक्तों को ब्रह्मचारी के समान जीवन बिताना चाहिए, आत्मचिंतन करना चाहिए। सबरीमला की कठिन चढ़ाई पर भक्त तीन-आँख वाले नारियल, घी, पूजा सामग्री, भोजन ‘ईरुमुदी' में भरकर, पम्पा नदी में स्नान कर ‘स्वामी शरणम’ बोलते हुए अठारह पवित्र सीढ़ियां चढ़ते हैं।",
          "हर साल, लाखों लोग जाति-धर्म से परे, भगवान अय्यप्पा के दर्शनों के लिए यहाँ आते हैं, फूलों की माला और ईरूमुदी के साथ, पम्पा नदी में स्नान कर, अठारह सीढ़ियाँ चढ़ते हैं, और भगवान अय्यप्पा के दर्शन का लाभ प्राप्त करते हैं।",
        ],
      },
      ta: {
        title: "ஸ்ரீ அய்யப்பன் – பிறப்பும் வரலாறும்",
        body: [
          "பிறகு, தற்போதைய தமிழ்நாட்டின் மதுரை பாண்டிய அரச குடும்பத்துடன் தொடர்புடைய வரலாற்று நபர் மணிகண்டன் இருக்கிறார். இது 800 ஆண்டுகளுக்கு முன்பு நடந்தது. இந்தப் புரಾಣம் கீழே விவரிக்கப்படுகிறது. ப்ரஹ்மாண்ட புராணத்தில் இருந்து எடுத்த பூதநாத உபாக்யானம், திரு. கல்லறக்கல் கிருஷ்ணன் நாயர் அவர்களால் மலையாளத்தில் திரும்பக் கூறப்பட்டது, திரு. பி. என். கிருஷ்ணனுன்னி, மற்றும் மூன்றாவது புத்தகம் பூதநாத சர்வஸ்வம் (திரு. குருமுள்ளூர் நாராயணப் பிள்ளை) ஆகியவை அய்யப்பா வரலாற்று நபரைத் துல்ளியமான ஆதாரங்களாகக் கருதப்படுகின்றன.",
          "பாண்டிய பேரரசை ஆண்டிருக்கும் திருமலை நாயக்கரால் புறப்படுத்தப்பட்ட பாண்டிய வம்சத்தினர் மதுரை, திருநெல்வேலி, இராமநாதபுரம் ஆகிய இடங்களை ஓரமாக விட்டுவிட்டு வல்லியூர், தென்காசி, செங்கோட்டை, அச்சன்கோவில், சிவகிரி ஆகிய இடங்களில் வாழ்ந்து வந்தனர். அவர்கள் திராவங்கூர் பகுதிகளிலும் தங்கள் ஆதிகாரம் ஏற்படுத்திக் கொண்டனர். சிவகிரியில் உள்ள செம்பெழனாட்டு கோயிலுக்கு சொந்தமான சிலருக்கு திராவங்கூர் அரசன் சுமார் 800 ஆண்டுகளுக்கு முன்பு பண்டலம் மாகாணத்தை ஆளும் உரிமை வழங்கினார். ஆண்டிப்பெருமான் அய்யப்பாவின் அன்னையர் ராஜASEGARA இந்த வம்சத்தில் சேர்ந்தவராக இருப்பவர்.",
          "நியாயமானும், சிக்கன் அறிவுடையும் அரசர் ராஜASEGARA அவர்களது குடிமக்களால் மிகுந்த மதிப்புடன் கருதப்பட்டார். அவருடைய ஆட்சி காலத்தில் அந்த பகுதி தங்க யுகத்தை அனுபவித்தது. ஆனால் ராஜாவுக்கு ஒரு வருத்தம் இருந்தது: அவர்களுக்கு பிள்ளையில்லை, அதனால் ஏக்கம் இருந்தது. இருவரும் பக்தியுடன் சிவபெருமானிடம் பிள்ளையை வேண்டினார்கள்.",
          "அதே சமயத்தில், மஹிஷாசுரர் என்ற பூ (மாடு வடிவில்) கடுமையான தவம் இருந்தார். இறுதியில் பிரம்மா அவருக்கு பூவை அழிக்க யಾರும் அனுமதி இல்லை என்று வரம் வழங்க வேண்டிய சூழ்நிலை ஏற்பட்டது. இந்த வரத்தாலே, ಮஹிஷாசುರர் மக்கள், வம்சங்கள் மற்றும் சமுகங்களை அழிக்க ஆரம்பித்தார். மக்கள் அவரது கோபத்திலிருந்து பயந்து தூர இடங்களில் ஒடிவந்தனர். தேவர்கள் மஹிஷாசுரனை அழிக்க நான் துர்கையை வேண்டினர்; அவர் கடும் போரில் அவனை கொன்றார்.",
          "அவர் கொல்லப்பட்ட சகோதரனுக்கு பழிவாங்கும் மனப்பான்மையுடன், மஹிஷி என்பவர் (மஹிஷாசுரரின் தங்கை), பிரம்மாவிடம் விஷ்ணுவின் (ஹரி) மற்றும் சிவபெருமானின் (ஹரன்) மக்கள் தவிர வேறு யாராலும் அவளை அழிக்க முடியாது என்று வரம் பெற்றார். காலப்போக்கில், மஹிஷி தேவலோகத்துக்குச் சென்றார், தேவர்களை தொந்தரவு செய்யத் தொடங்கினார். தேவர்கள் மேலும் விஷ்ணுவை வேண்டினர். அந்த வரத்தின்படி, சிவனும் விஷ்ணுவும் இணைந்து பிறந்த மகனை தவிர, யாராலும் மஹிஷியை அழிக்க முடியாது; விஷ್ಣு அழகான பெண் வடிவமான மோகினியாக நடித்தார், வ்ரிகாசுரன் (பஸ್ಮாசುರன்) கொலை செய்யப்பட்டார்கள். இது முன்பே சமுத்திர மந்தனத்தில் அமிர்தத்தைப் பெறுவதற்காகவும், உண்மையில், மோகினி விட் விஷ்ணு சிவபெருமான் கூட்டமாக பிறந்த மகனையே பம்பா நதிக்கரையில் வைத்தனர்.",
          "ஒரு வேட்டையாடும் பயணத்தின் போது, பம்பா நதிக்கரையில் வழித்தடம் அமர்ந்த ராஜவீதி ராஜASEGARA பக்கத்தில் குழந்தையின் அழுகை கேட்டார். ஆச்சரியத்துடன், அவர் அதை பின்தொடர்ந்து, காற்கள் மற்றும் கைகளை ஓட்டிக்கொண்டிருந்த அழகான குழந்தையைக் கண்டார். அந்தக் குழந்தையை அரண்மனைக்கு கொண்டு செல்ல ஆசை அடைந்தார்.",
          "இது குறித்து நின்றபோது, திடீரென ஒரு சாது தோன்றினார்; தன்னை பிள்ளையை அரண்மனைக்கு கொண்டு செல்ல உத்தரவிட்டார். இந்த பிள்ளை தங்கள் வம்சத்தின் சோதனையை ஒழிக்க, பன்னிரண்டாம் வயதில் ராஜASEGARA அவருக்கு திவ್ಯ சக்தியுள்ளவன் என்றறிவது. பிள்ளையின் கழுத்தில் மணி கொண்ட பொன் சங்கிலி காணப்பட்டது, ஆகவே அதன் பெயர் மணிகண்டன் என்று கூறினார்.",
          "மிகவும் மகிழ்ச்சி போல, ராஜASEGARA மணிகண்டனை வீட்டிற்கு கொண்டு சென்றார், நடந்த நிகழ்வுகளை தனது அரசியத்துடன் பகிர்ந்து கொண்டார். இருவரும் சிவபெருமான் அவர்கள் வழங்கியதாக கருதினர். எல்லாம் சோಂಬல் என்று நினைத்த அமைச்சர் தவிர்த்து, அரச தம்பதியினர் மகிழ்ந்தனர்.",
          "பையனாக மணிகண்டன் மிகுந்த புத்திசாலியானவனும் திறம்பட யுத்தக் கலை உள்ளிட்டவற்றிலும் வல்லவரும் ஆக இருந்தான். குருவை தனது வல்லமைத்திறன் கொண்டு ஆச்சரியப்படுத்தினான். பாண்டலம் பகுதியில் அமைதி மற்றும் செழிப்பு நிலவியது. பின்னர், அய்யப்பனின் குருவே அந்தப் பையன் சாதாரண நபர் அல்ல, திவ்ய சக்தியுள்ளவராக கூறினார். படிப்பை முடித்து, மணிகண்டன் குரு தட்சிணையுடன் ஆசீர்வாதம் பெற வந்தான்.",
          "ஆசிர்வாதம் பெற முனைந்தபோது, குரு : \"நீ திவ்ய சக்தி வாய்ந்தவன்\" என்று முன்னதாகவே உணர்ந்ததை விளக்கினார். மேலும் குரு தனது கண்பார்வை மற்றும் பேச்சு இழந்த மகனுக்கு பார்வை, பேச்சு வழங்குமாறு வேண்டினார். மணிகண்டன் தன்னுடைய கைகள் வைத்து, அந்தக் குழந்தை உடனே பார்வையும் பேச்சும் பெற்றான். இந்த அருமையை எவருக்கும் தெரியப்படுத்த வேண்டாம் என்று கேட்டுக்கொண்டான்.",
          "மணிகண்டன் யுத்தக் கலையை கற்றார், யோகங்களை உருவாக்கி மக்கள் திரட்டி, அவர்கள் கொள்ளைகளுக்கும் குற்றங்களை எதிர்த்து ஆற்றப்படுகிறது. கரைமலை என்ற கொள்ளைக்காரனை கொன்றான்; அந்தக் கொழுந்து பாண்டலம் அரசகுமாரியைக் கடத்தினான். மற்றொரு காதலர்-திருடன் வபரனும், பாண்டலத்தில் நல்லவராக மாற்றப்பட்டான்.",
          "இதற்கிடையில், ராணி ஒரு ஆண் குழந்தை பெற்றாள், அவன் பெயர் ராஜ ராஜன். இந்த அதிசயமான நிகழ்வுகள் அனைத்தும் மணிகண்டனுடன் தொடர்புடையது என்று உணர்ந்த அரசர், அவரை அரசராக உயர்த்த முடிவு செய்தார்; அரசன் அய்யப்பனை முதன்மை மகனாக கருதினார். அமைச்சருக்கு தவிர அனைவரும் மன வேதனையுடன் இருந்தனர். மந்திரி அரச பதவி ஆசையுடன், பல சதி முயற்சிகள் செய்தார், உணவில் விஷம் கலந்து கொல்ல முயன்றார். மணிகண்டன் சில narrow escapesஉம் இருந்தது, ஒரு காயம் மட்டுமே இருந்தது, அதனை யாராலும் நிவர்த்தி செய்ய முடியவில்லை. இறுதியில், சிவபெருமான் வைத்தியராக வந்து அந்தக் காயத்தை குணப்படுத்தினார்.",
          "மந்திரி ராணியின் நினைவில் வஞ்சத்தை விதைத்தார், மணிகண்டனை அரசராக்க அனுமதிக்கலா, ஏற்கனவே அவரது மகன் வாழ்கிறார்; அவர் அரசராகின், அவரது மகன் துன்பப்படுவார். சாஸ்திரப்படி, பின்னிடம் விடும் குற்றம் ಮುಖ್ಯம் என்று கூறி, ரோகம் போல நடிக்க தூண்டினார்; மருத்துவர், புலி பால் தேவை என்று கூறினார். அரசர் அறிவிப்பு செய்து, இந்த அசாதாரண நிகழ்வில் வெற்றி கண்டவர்க்கு பரிசு வழங்கப்படும் என்றார்.",
          "அடுத்து, காவல்துறையை அனுப்பினார், அவர்கள் வெற்றியின்றி திரும்பிவந்தனர். மணிகண்டன் உதவ முன்வந்தார், அரசர் முதலில் மறுத்தார். யாரையும் கூட்ட வேண்டாம் என்று கூறி, இறுதியில் தந்தை சம்மதித்து, தனியாக புலி பால் சேகரிக்க அனுமதி அளித்தார். சிப்பாய்களை கூட்ட வேண்டாம் என்று கூறினார்; அரசர் தயக்கத்துடன் அனுமதித்தார்.",
          "பூதகணங்கள் மணிகண்டனை பின்தொடர்ந்தனர். வழியில், மஹிஷியின் அட்டகாசங்களை கண்டார்; நீதிக்காக, மஹிஷியை பூಮிக்கு வீசினார்; அவள் அஜுத்தா நதிக்கரையில் விழுந்தாள். இரத்தப்போருக்குப் பிறகு, மணிகண்டன் மஹிஷியின் மார்பில் குதித்து கடும் நடனம் ஆடினார்; இதனால் பூಮியும் தேவலோகமும் நடுங்கின. மஹிஷி, தன் மீது இருப்பவர் ஹரி, ஹரன் மகன் என்பதை உணர்ந்து, பணிந்து உயிர்துறைத்தாள்.",
          "இந்த மோதலுக்குப் பிறகு, மணிகண்டன் புலி பால் தேடி காட்டிற்குள் நுழைந்தார்; சிவபெருமானின் தரிசனம் பெற்றார்; தேவையான பணிகள் நிறைவு பெற்றும், இன்னும் ஒரு பெரிய பணியுண்டு என்று நினைவூட்டினார். தந்தை-தாயின் துயரத்தை நினைவூட்டினார்; இந்திரன் உதவுவார் என்று உறுதியளித்தார். மணிகண்டன், தேவேந்திரருடன் புலி வேடத்தில் அரச அரண்மனைக்கு வந்தார்; பெண் தேவிகள் புலி வடிவிலும், ஆண் தேவர்கள் புலி வடிவிலும் உடன் வந்தனர்.",
          "பாண்டலம் மக்கள் பையனையும் புலிகளையும் கண்டு அஞ்சினர். பின்னர், முதலில் காட்டில் ராஜASEGARA முன் தோன்றிய சாது மீண்டும் தோன்றி, மணிகண்டனின் உண்மையான அடையாளத்தை ராஜாவுக்கு வெளிப்படுத்தினார். ராஜா, மணிகண்டன் புலிகளின் முதுகில் வந்ததை கண்டு மௌனமாய் நன்றார். பையன் புலியின் முன்துகிலிருந்து இறங்கி, புலிகளிடமிருந்து பாலைப் பெற்று ராணியின் நோயை குணப்படுத்த முடியும் என்று கூறினார். ராஜASEGARA, ராணியின் நாடகத்தை உணர்ந்து, மன்னிப்புக் கேட்டார்; ராணி குணமடைந்தார்; அன்றே மணிகண்டன் பன்னிரண்டு வயது ஆனார்.",
          "அடுத்ததாக, அரசர் அமைச்சரைத் தண்டிக்க விரும்பினார்; ஆனால் மணிகண்டன் பொறுமையை வேண்டினார்; அனைத்தும் இறைவனின் இச்சையின்படி நிகழ்ந்தது என்று கூறினார். புறப்படும் முன், அரசரிடம் ஒரு வரம் கேட்கச் சொன்னார்; அரசர், நினைவாக ஒரு கோயில் கட்ட வேண்டும் என்று விண்ணப்பித்தார். மணிகண்டன் அம்பை செலுத்த, அது சபரಿಮலை என்று அழைக்கப்படும் இடத்தில் விழுந்தது; அங்கு இராமர் காலத்தில் சபரி தபஸ் செய்தார். அங்கு தர்ம சாஸ்தா கோயிலை புதுப்பிக்குமாறு கூறி, பின்னர் தர்ம சாஸ்தா முர்த்தியில் லயித்தார்.",
          "பிறகு, அகஸ்திய முனிவரின் ஆலோசனையின் பேரில், ராஜா ராஜசேகரர் தற்போதைய சபரிமலை கோயிலின் அஸ்திவார கல்லை நாட்டினார். மணிகண்டன், 41 நாட்கள் விரதம் இருந்து தரிசனத்திற்கு வரும்வர்களுக்கே அருள் புரிவேன் என்று தெளிவாகச் சொன்னார். பக்தர்கள் பிரம்மச்சாரி போன்று வாழ்ந்து, தியானத்தில் இருக்க வேண்டும். சபரிமலை உயரமான சரிவுகளை ஏறிச் செல்லும் போது, மூன்று கண் கொண்ட தேங்காயில் நெய், பூஜைச் சாதனங்கள், உணவுப் பொருட்கள் ஆகியவற்றை ‘இருமுடி’யில் எடுத்து, பம்பಾ நதியில் ஸ்நானம் செய்து, \"ஸ்வாமி சரணம்\" என்று சொல்வதுடன் 18 தெய்வீக படிகளை ஏறுகின்றனர்.",
          "ஒவ்வொரு ஆண்டும், ஜாதி-மத பேதமின்றி கோடிக்கணக்கில் பக்தர்கள் மலர் மாலைகள் மற்றும் இருமுடிகளுடன் புனித பம்பಾ நதியில் நீராடிச், பதினெட்டு படிகள் ஏறி, தர್ಮசாஸ்தாவாகிய அய்யப்பனை தரிசிக்க வருகின்றனர்.",
        ],
      },
      kn: {
        title: "ಶ್ರೀ ಅಯ್ಯಪ್ಪ – ಜನನ ಮತ್ತು ಇತಿಹಾಸ",
        body: [
          "ಆಮೇಲೆ ಸ್ಥೂಲ ವ್ಯಕ್ತಿ, ಮಣಿಕಂಠನ್, ಇವರು ಪ್ರಸ್ತುತ ತಮಿಳುನಾಡಿನ ಮದುರೈ ಪಾಂಡ್ಯ ವಂಶಕ್ಕೆ ಸೇರಿದವರು. ಇದು 800 ವರ್ಷಗಳ ಬಳಿಕದ ಕಥೆ. ಈ ಕಥೆಯನ್ನು ಕೆಳಗೆ ವಿವರಿಸಲಾಗಿದೆ. ಬ್ರಹ್ಮಾಂಡ ಪುರಾಣದಿಂದ ತೆಗೆದ ಬೂತನಾಥ ಉಪಖ್ಯಾನಂ, ಶ್ರೀ ಕಲ್ಲರಕ್ಕಲ್ ಕೃಷ್ಣನ್ ನಾಯರ್ ಅವರಿಂದ ಮಾಲಯಾಳಂನಲ್ಲಿ ಪುನರ್ ಕಥನ ಹಾಗೂ ಶ್ರೀ ಪಿ.ಎನ್. ಕೃಷ್ಣನುನಿ ಅವರು ಅನುವಾದ ಹಾಗೂ ಶ್ರೀ ಕುರುಮಳ್ಳೂರು ನಾರಾಯಣ ಪಿಳ್ಳೈ ಅವರ ಬೂತನಾಥ ಸರ್ವ್ಯಾಸ್ವಂ ಎಂಬ ಪುಸ್ತಕಗಳು ಅಯ್ಯಪ್ಪ ಅವರ ವಾಸ್ತವ ವ್ಯಕ್ತಿಗೆ ಪ್ರಾಮಾಣಿಕ ಸಮರ್ಥನೆಗಳನ್ನು ಹಂಚಿವೆ.",
          "ಪಾಂಡ್ಯ ರಾಜವಂಶದವರಿಗೆ ಪಾಂಡ್ಯ ಸಾಮ್ರಾಜ್ಯದ ಆಡಳಿತಗಾರ ತಿರುಮಲಾ ನಾಯ್ಕರ್ ಅವರಿಂದ ಆಳುತ್ತಿರುವವರನ್ನು ಚದುರಿಸಿದ ನಂತರ, ಅವರು ವಲ್ಲಿಯೂರ, ತೆಂಕಾಸಿ, ಶೆಂಕೊಟ್ಟೈ, ಅಚಂಕೋವಿಲ್ ಮತ್ತು ಶಿವಗಿರಿ ಮೊದಲಾದ ಸ್ಥಳಗಳಲ್ಲಿ ವಾಸ ಮಾಡಿಕೊಂಡಿದ್ದರು. ಟ್ರಾವಾಂಕೋರ್ ಪಕ್ಷದಲ್ಲಿಯೂ ತಮ್ಮ ಏತಿಯನ್ನು ಸ್ಥಾಪಿಸಿದರು. ಶಿವಗಿರಿಯ ಚೆಂಪಾಜನಟ್ಟು ಕೋವಿಲ್ಲಿಗೆ ಸೇರಿದ ಕೆಲವರು ಟ್ರಾವಾಂಕೋರ್ ರಾಜನಿಂದ ಪಂಡಲಂ ಪ್ರಾಂತ್ಯವನ್ನು ಆಳಲು ಹಕ್ಕಿಗಾಗಿ ಆಯ್ಕೆಯಾಗಿದ್ದು, ಈದು 800 ವರ್ಷಗಳ ಹಿಂದಿನದು. ಲೋರ್ಡ್ ಅಯ್ಯಪ್ಪನ ಪಾಲಕರು ರಾಜಶೇಖರ ಅವರೂ ಈ ವಂಶಕ್ಕೆ ಸಂಬಂಧಿಸಿದವರು.",
          "ನ್ಯಾಯಮೂರ್ತಿ ಹಾಗೂ ಬುದ್ಧಿವಂತರಾದ ರಾಜಶೇಖರನ್ನು ಅವರ ಪ್ರಜೆಗಳು ಹೆಚ್ಚು ಗೌರವಿಸಿದರು. ಅವರ ಆಡಳಿತದಲ್ಲಿ ಪ್ರದೇಶದವರು ರತ್ನ ಯುಗವನ್ನು ಅನುಭವಿಸಿದರು. ಆದರೆ ರಾಜನಿಗೆ ಒಂದು ದುಃಖವಿತ್ತು: ಅವರು ಸಂತಾನವಿಲ್ಲದೆ, ಬಾಳಿನಲ್ಲಿ ಉತ್ತರಾಧಿಕಾರಿ ಇಲ್ಲ. ದುಃಖಿತ ರಾಜ ಹಾಗೂ ರಾಣಿ ಇಬ್ಬರೂ ಶಿವನಿಗೆ ಮಗನಿಗಾಗಿ ಪೂಜೆ ಮಾಡಿದರು.",
          "ಅದೇ ಸಮಯದಲ್ಲಿ ಮಹಿಷಾಸುರ ಎಂಬ ರಾಕ್ಷಸ (ಎಮ್ಮೆ ರೂಪದಲ್ಲಿ) ತಿವ್ರ ತಪಸಾಚರಣೆ ಮಾಡಿದನು. ಈ ಕಾರಣದಿಂದ ಬ್ರಹ್ಮದೇವರಿಂದ ಭೂಮಿಯಲ್ಲಿ ಯಾರೂ ಅವನನ್ನು ಸಂಹರಿಸಬಾರದು ಎಂಬ ವರನನ್ನು ಪಡೆದನು. ಬ್ರಹ್ಮನ ವರದಿಂದ ಮಹಿಷಾಸುರ ಜನರ ಮೇಲಾಗಿವನು, ಸಮುದಾಯಗಳನ್ನು ನಾಶಗೊಳಿಸಿದನು. ಜನರು ಭಯದ ಹೊತ್ತಿನಲ್ಲಿ ದೂರ ಪ್ರದೇಶಗಳಿಗೆ ಓಡಾಡಿದರು. ಮಹಿಷಾಸುರ ಸಂಹಾರಕ್ಕೆ ದೇವತೆಗಳು ದುರ್ಗಾಮಾತೆಗೆ ಪ್ರಾರ್ಥಿಸಿದರು, ರಕ್ತಪಾತ ಯುದ್ಧದಲ್ಲಿ ಅವಳ ವಧ ಮಾಡಿಕೊಂಡಳು.",
          "ತಮ್ಮನ್ನು ಕೊಂದ ಸಹೋದರನಿಗೆ ಪ್ರತೀಕಾರ ಮಾಡಲು ಮಹಿಷಿ, ಮಹಿಷಾಸುರನ ತಂಗಿ, ಬ್ರಹ್ಮನಿಂದ ವಿಷ್ಣು (ಹರಿ) ಮತ್ತು ಶಿವ (ಹರನ್) ಮಗನ ಹೊರತು ಯಾರೂ ಅವಳನ್ನು ಕೊಲ್ಲಬಾರದು ಎಂಬ ವರ ಪಡೆದಳು. ನಂತರ ಅವಳು ದೇವಲೋಕಕ್ಕೆ ಹೋಗಿ ದೇವತೆಯನ್ನು ತೊಂದರೆ ಮಾಡಿತು. ದೇವತೆಗಳು ವಿಷ್ಣುವನ್ನು ಹೊತ್ತುಕೊಂಡರು. ವರದ ಪ್ರಕಾರ, ಶಿವ ಮತ್ತು ವಿಷ್ಣು ಮಗನ ಹೊರತು ಯಾರೂ ಮಹಿಷಿಯನ್ನು ಕೊಲ್ಲಬಾರದು; ವಿಷ್ಣು ಮೋಹಿನಿ ರೂಪವನ್ನು ತಾಳಿತು, ವೃಕಾಸುರ (ಭಸ್ಮಾಸುರ) ವಧ ಮಾಡಲಾಯಿತು. ಈ ಹಿಂದೆ ಮೋಹಿನಿ ಅವತಾರ ದೇವತೆಗೆ ಅಮೃತವನ್ನು ಕೊಡಿಸಲು, ಸಮುದ್ರಮಥನದ ಫಲವಾಗಿ ದೊರೆತ ಅಮೃತ ಪಡೆದುಕೊಂಡಿತು. ಮೋಹಿನಿ (ವಿಷ್ಣು) ಮತ್ತು ಶಿವನ ಸಂಗಮದಿಂದ ಹುಟ್ಟಿದ ಮಗ ಪಾಂಪಾ ನದಿಯ ತೀರದಲ್ಲಿ ಹಾಕಲಾಯಿತು.",
          "ಪಾಂಪಾ ನದಿಯ ಹತ್ತಿರ ಇದೆ ರಜಾ ರಾಜಶೇಖರ್ ಅವರ ವೇಟೆಗಾಗಿ ಹೋಯ್ದಿದ್ದಾಗ, ಅರಣ್ಯದಿಂದ ಮಗುವಿನ ಅಳಿಸುವಿಕೆಯನ್ನು ಕೇಳಿದರು. ಆತಿದೃಷ್ಟದಿಂದ, ಮಗುವಿನ ಅಳಿಕೆಯನ್ನು ಹಿಂಬಾಲಿಸಿ, ಪಾದಗಳು, ಕೈಗಳು ಬಲವಾಗಿ ಉರುಳುತ್ತಿದ್ದ ಸುಂದರ ಮಗುವನ್ನು ಕಂಡು. ರಾಜನು ತಾವು ಮಗುವನ್ನು ಅರಮನೆಗೆ ಕರೆದುಕೊಳ್ಳಲು ಬಯಸಿದನು.",
          "ರಾಜಶೇಖರ್ ದಿವ್ಯ ಮಗುವನ್ನು ನೋಡುತ್ತಿದ್ದಾಗ, ಒಂದು ಸಾರ್ಗು ಎಲ್ಲಿ ಇಲ್ಲಿಂದ ಅಲ್ಲಿಗೆ ಬಂದು, ಮಗುವನ್ನು ಅರಮನೆಗೆ ಕರೆದುಕೊಂಡು ಹೋಗುವಂತೆ ಸೂಚಿಸಿತು. ತಂದೆ ಮಗುವಿನ ಮಾಹಾ ಸಮರ್ಥದಿಂದ ಶತಮಾನಗಳ ಪೀಡಿರಿ ಮುಕ್ತಪಡುವಂತಿದ್ದನು; ಬಾಲಕನಿಗೆ ಹನ್ನೆರಡು ವರ್ಷವಾದ ಮೇಲೆ ರಾಜಶೇಖರಿಗೆ ಅವನ ದಿವ್ಯತೆಯ ಅರಿವು ಬರಲಿದೆ. ಮಗುವಿನ ಎದೆಯಲ್ಲಿ ಬಂಗಾರದ ಅಂಗಿ ಗಂಟು ಇದ್ದುದರಿಂದ 'ಮಣಿಕಂಠನ್' ಎಂದು ಹೆಸರಿಡಬೇಕೆಂದು ಸಾರ್ಗು ಸೂಚಿಸಿತು.",
          "ಐಷಾರಾಮಿ ರಾಜಶೇಖರ್ ಮಣಿಕಂಠನನ್ನು ಮನೆಗೆ ಕರೆದುಕೊಂಡು ಹೋಗಿ, ಎಲ್ಲಾ ಘಟನೆಗಳನ್ನು ತನ್ನ ರಾಣಿಗೆ ವಿವರಿಸಿದನು. ಇಬ್ಬರೂ ಶಿವನ ಆಶೀರ್ವಾದ ಪಡೆದರೆಂದು ಭಾವಿಸಿದರು. ರಾಜ ಹಾಗೂ ರಾಣಿ ಹೊರತು ದಿವಾನ್ ಮಾತ್ರ ದುಃಖ ಪಟು.",
          "ಬಾಲ್ಯದಲ್ಲಿ ಮಣಿಕಂಠನ್ ಬಹುಬುದ್ಧಿವಂತ, ಯುದ್ಧಕಲೆ, ಶಾಸ್ತ್ರದಲ್ಲಿ ದಕ್ಷತೆ ತೋರ್ಪಡಿಸಿ ತನ್ನ ಗುರುವಿಗೆ ಆಶ್ಚರ್ಯಪಡಿಸಿದನು. ಪಾಂಡಲಂನಲ್ಲಿ ಶಾಂತಿ, ಸಮೃದ್ಧಿ ಬಂತು. ಕೊನೆಗೆ ಅಯ್ಯಪ್ಪನ ಗುರು ಈ ಹುಡುಗ ಸ್ತೂರ್ಧ ವ್ಯಕ್ತಿಯಲ್ಲ, ದಿವ್ಯವಾಗಿದ್ದಾನೆ ಎಂದು ಅಂಗೀಕರಿಸಿದರು. ಅಧ್ಯಯನ ಪೂರ್ಣಗೊಂಡ ಮೇಲೆ, ಮಣಿಕಂಠನ್ ಗುರುದಕ್ಷಿಣೆ ಅವಹೇಳನಗೊಳಿಸಿ ಆಶೀರ್ವಾದಕ್ಕೆ ತೆರಳಿದನು.",
          "ಸ್ಪಿರಿಚುವಲ್ ಗುರು ಜೊತೆ ಅವಶ್ಯವಾದ ಆಶೀರ್ವಾದ ಪಡೆಯಲು ಹೋದಾಗ, ಗುರುವು 'ನೀನು ದಿವ್ಯ ಶಕ್ತಿ' ಎಂದು ಮೊದಲೇ ವ್ಯಾಖ್ಯಾನ ಮಾಡಿದ್ದರು ಎಂದು ವಿವರಿಸಿದರು. ಗುರು ತನ್ನ ಕುರುಡ ಹಾಗೂ ಮೌನ ಮಗನಿಗೆ ದೃಷ್ಟಿ, ಮಾತು ನೀಡುವಂತೆ ಮಣಿಕಂಠನನ್ನು ಕೇಳಿದರು. ಮಗನ ಮೇಲಿದ್ದ ಕೈ ಗುರುವಿನ ಮಗನಿಗೆ ಹಾಕಿ ಅವನು ಕ್ಷಣಕಾಲದಲ್ಲಿ ದೃಷ್ಟಿ, ಮಾತು ಸಿಕ್ಕಿತು. ಈ ಅದ್ಭುತದ ಬಗ್ಗೆ ಯಾರಿಗೂ ಹೇಳಬಾರದು ಎಂದು ಹೇಳಿದರು.",
          "ಮಣಿಕಂಠನು ಯುದ್ಧಕಲೆ, ಯೋಗನಾಮದಡಿ ಜನರನ್ನು ಸಂಘಟಿಸಿ, ಗೆದ್ದವನಕಾಲ್ಗಳನ್ನು ಮತ್ತಷ್ಟು ದಕ್ಷತೆಯಿಂದ ತಯಾರಿಸಿದನು. ಕರುಮಲಾದಲ್ಲಿ ಆಧಾರಪಟ್ಟು ದೊಂಗ 'ಉದಯನನ್' ಒಬ್ಬನ್ನ ತಿಂದು, ಅವನು ಪಾಂಡಲಂ ರಾಜಕುಮಾರಿಯನ್ನು ಅಪಹರಿಸಿದನು. ಇನ್ನೊಬ್ಬ ಯೋಧ, ದೋಚುಗಾರ 'ವಪರನ್' ಬುಡತನ, ತೊಡಗಿಸಿಕೊಂಡು ಬಡ ಜನರನ್ನು ಕಾಡಿದವು; ಮಣಿಕಂಠನ್ ಅವನ ಮುಂದೆ ಯುದ್ಧವಾಡಿ, ಉತ್ತಮ ಸಲಹೆ ನೀಡಿ, ಗೆಳೆಯನನ್ನಾಗಿ ಮಾಡಿದನು.",
          "ಅಷ್ಟರಲ್ಲಿ ರಾಣಿ ಪುರುಷ ಮಗುವನ್ನು ಜನಿಸಿದವರು; ಅವನಿಗೆ 'ರಾಜಾ ರಾಜ್ಯನ್' ಎಂದು ಹೆಸರಿಸಲಾಯಿತು. ಈ ಅದ್ಭುತ ಘಟನೆಗಳು ಮಣಿಕಂಠನೊಂದಿಗೆ ಇನ್ನಷ್ಟು ಸಂಬಂಧಿಸಿರುವಂತೆ ಅರಿತ ರಾಜಶೇಖರ್ ಮಣಿಕಂಠನನ್ನು ರಾಜನೆಂದು ಘೋಷಿಸಿದನು; ಪ್ರತಿಭಟನೆಯಿಲ್ಲದೆ ಅಯ್ಯಪ್ಪನ ತಮ್ಮಾಗ್ನನ್ನು ಹೆಚ್ಚೆಂಬ ಖಚಿತಗೊಳಿಸಿದನು. ರಾಜನೇ ಹೊರತು, ದಿವಾನ್ ಮಾತ್ರ ವಿಷಾದ ಪಟ್ಟರು. ರಾಜಾ ಸ್ಥಾನ ಆಕಾಂಕ್ಷಿಸಿದ ಸಚಿವನು ಕಡೆಗೂ ಕುತಂತ್ರ ಮಾಡಿ, ಆಹಾರ ವಿಷ ಸೇರಿಸಿ ಕೊಲ್ಲಲು ಯತ್ನಿಸಿದನು. ಮಣಿಕಂಠನಿಗೆ ಕೆಲವು narrow escapes ಆಗಿದ್ದವು; ಆದರೆ ಅವನ ಗಾಯವನ್ನು ಯಾರೂ ಗುಣಪಡಿಸಲಿಲ್ಲ. ಕೊನೆಗೆ ಶಿವನ ಸ್ವರೂಪದಲ್ಲಿ ಬಂದು ಆಯ್ದು ಗುಣಪಡಿಸಿದರು.",
          "ದಿವಾನ್ ರಾಣಿಗೆ ಪಾಯಸ್ ಮಾಡಿದರು, ಮಣಿಕಂಠನ್ ರಾಜನಾಗಲು ತಕ್ಕುದಲ್ಲ ಎಂದು ವಿಷ ಹರಿಸಿದ್ದಾಯಿತು. ಅದನ್ನು ಪಾಯಸ್ ಮಾಡಿಸಿ ಸಹಾಯ ಮಾಡಿ ಹೇಳಿದರು. ರಾಣಿ ತಾನು ತೀವ್ರ ತಲನೋವಿನಲ್ಲಿದ್ದೆ ಎಂದು ನರ್ತನೆ ಮಾಡಿದರು. ರಾಜನು ವೈದ್ಯರನ್ನು ಕರೆಸಿದನು, ಅವರೇ ರಾಣಿಗೆ ಗುಣಪಡಿಸಲಿಲ್ಲ. ದಿವಾನ್ ವೈದ್ಯನು ಬರುವವರೆಗೆ, ಬಯಸಿ ಬಿಗಿಯಾದ ಬಾಯಿ ಪಾಲೆಯಿಂದ ಮಾತ್ರ ಗುಣಪಡಿಸಲಾಗುವುದು ಎಂದನು. ರಾಜಶೇಖರ್ ಅವನು ರಾಣಿ ಗುಣಪಡಿಸಿದರೆ ಅರ್ಧ ರಾಜ್ಯ ಕೊಡುವುದಾಗಿ ಆವಿಷ್ ನೀಡಿ.",
          "ರಾಜಶೇಖರ್ ಕಳುಹಿಸಿದ ಸೈನಿಕಗಳಿಂದ ಪಾಲು ಬಂದಿಲ್ಲ. ಮಣಿಕಂಠನ್ ಸಹಾಯಕ್ಕೆ ಬಯಸಿದ್ದಾರೆ. ರಾಜ ಮಣಿಕಂಠನ್ ವನ್ಯಪ್ರಾಣಿಗಳು ವಿರುದ್ಧ ದುಃಖಪಡುತ್ತಾ ಅವನು ಹಿಜಾಗುತ್ತಿರುವುದನ್ನು ಸಹಾಯವಿದ್ಯಾ ಎಂದು ನಿರೂಪಿಸಿ, ಮಣಿಕಂಠನ್ ಸಹಾಯ ಮಾಡಿ ಸಲ್ಲಿಸಿದರು. ಮಣಿಕಂಠನ್ ತನ್ನ ತಂದೆಯಿಂದ ಅರ್ಥಪಡಿಸಿ, ರಾಜನು ತಟ್ಟಂಪಟ್ಟು, ಮಣಿಕಂಠನಿಗೆ ಹೋದ ಹಣವನ್ನು ನೀಡಿ.",
          "ಮಣಿಕಂಠನ್ ಬುಹೋತಗಣ ದೊಡ್ದವರು ಹೊತ್ತಿಗೆ ಕಾಡು ಪ್ರವೇಶಿಸಿದರು. ದಾರಿ ಮಧ್ಯೆ, ಮಹಿಷಿಯ ದುರ್ಬುದ್ಧಿ ಕೆಲಸ ಕಲಿತು, ಅವಳನ್ನು ಪಕ್ಕ ಬಿಡಿಸಿದರು, ಆಳು ಅಝುತಾ ನದಿಯ ಪಕ್ಕದಲ್ಲಿದ್ದನು. ರಕ್ತಪಾತ ಯುದ್ಧ, ಅಂತಿಮವಾಗಿ ಮಣಿಕಂಠನ್ ಮಹಿಷಿಯ ಮೇಲೆ ಕುಳಿತು ಭಾರೀ ಪ್ರಸನ್ನವಾಗಿ ನೃತ್ಯ ಮಾಡಿದನು; ಸಾಮಾನ್ಯವಾಗಿ ದೇವತೆಗಳು ಭಯಪಡಿದರು. ಮಹಿಷಿಯ ಮೇಲೆ ಇರಿಸಲಾಗುವುದು; ಆಕೆ ವಿಧಿಗೆ ಶರಣಾಗಿ, ಸಾಯುವ ಬಹುದಯಾ.",
          "ಮಹಿಷಿಯನ್ನು ಸಂಹರಿಸಿದ ನಂತರ, ಮಣಿಕಂಠನ್ ಪೈಪಾಲ್ ಪಾರುಗೆ (ಹೊಳಪಾನ) ಹೋಗಲಾಯಿತು. ಶಿವನ ದರ್ಶನ ಪಡೆದನು. ಮಹತ್ವಪೂರ್ಣ ಕಾರ್ಯ ಮುಗಿದರೂ, ಇನ್ನೊಬ್ಬ ದೊಡ್ಡ ಕಾರ್ಯ ಬಾಕಿ ಇದೆ ಎಂದು ಹೇಳಿದ್ದಾರೆ. ತಂದೆ, ತಾಯಿ ದುಃಖ ನೆನೆಸಿದರು; ಇಂದ್ರ ದೇವರು ಪದವಿಷಗುತ್ತದೆ ಎಂದರು. ಮಣಿಕಂಠನ್ ರಾಜಕೀಯಕ್ಕೆ ದೇವೇಂದ್ರನೊಂದಿಗೆ ಪೈಪಾಲ್ ಪಾರುಗೆ ಹೋಗಿದ್ದನು; ಷ್ಟೀ ದೇವತೆಗಳು ಪೈಪಾಲ್ ರೂಪಿನಲ್ಲಿ, ಪುರುಷ ದೇವತೆಗಳು ಪೈಪಾಲ್ ರೂಪದಲ್ಲಿ ಮೂಡಿದರು.",
          "ಪಾಂಡಲಂ ಜನರು ಮಣಿಕಂಠನನ್ನು, ಪೈಪಾಲ್ ಗೆ ಬೆದರಿಕೆಯಿಂದ ಒಲೆಹಾಕಿದರು. ಬಳಿಕ ರಣ ಗಟ್ಟುತ ಕಥನವನ್ನು ಕೇಳಿದ ನಂತರ, ರಾಜನು ಮಣಿಕಂಠನನ್ನು ಕ್ಷಮಿಸಿ, ತಾಯಿ ಗುಣಪಡೆದರು; ಮಣಿಕಂಠನು ಹನ್ನೆರಡು ವರ್ಷದಾಗಿದ್ದನು.",
          "ಒಟ್ಟು, ರಾಜನು ದಿವಾನನ್ನು ದಂಡಿಸಲು ನಿರ್ಧರಿಸಿದನು; ಆದರೆ ಮಣಿಕಂಠನು ದೈವಕ್ರಮವಾಗಿ ಇದೆ ಎಲ್ಲಾ ನಡೆಯಿತು ಎಂದು ಅರಿತು, ಹೆಸರು ಹಾಕಲು ಅವಕಾಶ ಕೊಡುತ್ತೇನೆ ಎಂದನು. ತಕ್ಷಣ, ರಾಜನು ದೇವಾಲಯ ನಿರ್ಮಿಸಲು ಪಠ್ಯ ನೀಡಿದನು; ಮಣಿಕಂಠನ್ ತೀರವನ್ನು ನೀಡಿ ಜಾರಿ ಕಳಿಸಿದನು, \"ಸಬರಿಮಲೆ\" ಎಂದು ತಿಳಿಸಿದರು; ಶ್ರೀರಾಮನ ಕಾಲದಲ್ಲಿ ಸರಬರಿ ಅವರು ತಪಸ್ಸು ಮಾಡಿದ ಸ್ಥಳ. ಸಬರಿಮಲೆ ಕುಡಮ್ಮ ನವೀಕರಣ ಮಾಡ ಬೇಕೆಂದು ಸೂಚಿಸಿ, ನಿರಂತರ ಸಾದ್ಗಿ ಹೊಂದಿದನು. ಅನಂತರ ಧರ್ಮಶಾಸ್ತ್ರ ದೇವಾಲಯದಲ್ಲಿ ಸೇರಿಸಿದನು.",
          "ಕಾಲಾನುಗುಣವಾಗಿ, ಆಗಸ್ಥ್ಯ ಮಹರ್ಷಿಯ ಹಿತ ಚಿಂತನೆಯಿಂದ ರಾಜ ರಾಜಶೇಖರ್ ಸಬರಿಮಲೆ ಆಧುನಿಕ ಸ್ಥಾಯಿಯಲ್ಲಿ ಶಿಲಾಸ್ಥಾಪನೆ ಮಾಡಿದನು. ಮಣಿಕಂಠನು ಘಟ್ಟವಾಗಿDeviation ಮಾಡಿದನು; ಕೇವಲ 41 ದಿನ ತಪಸ್ಸು ಮಾಡಿದವರಿಗೆ ಮಾತ್ರ ದರ್ಶನ ಸಿಗುತ್ತದೆ ಎಂದರು. ಭಕ್ತರು ಬ್ರಮ್ಮಚಾರಿ ಜೀವನದಂತೆ ಬಾಳಬೇಕು, ತಪಸ್ಸು ಮಾಡಬೇಕು. ಭಕ್ತರು ಹರಿವು ಬೆರಗನ್ನು ಭರಿ 'ಇರುಮುಡಿ'ಯಲ್ಲಿ ನೈವಿದ್ಯ, ಪೂಜಾ ಪದಾರ್ಥ, ಆಹಾರ ಮುಂತಾದವುಗಳನ್ನು ತುಂಬಿ, ಪಂಪಾ ನದಿಯಲ್ಲಿ ಸ್ನಾನ ಮಾಡಿ \"ಸ್ವಾಮಿ ಶರಣಂ\" ಎಂದು ಘೋಷಣೆ ಮಾಡಿ 18 ದೇವನು ಪದಿಗಳನ್ನು ಏರುತ್ತಾರೆ.",
          "ಪ್ರತಿ ವರ್ಷ, ಕೋಟಿ ಸಂಖ್ಯೆಯಲ್ಲಿ ಜನ ಜಾತಿ, ಮತ, ದೇಶ ಹೆಸರಿಗೆ ಸಂಸ್ಕೃತಿಯಿಂದ ಯಾತ್ರೆಗೆ ಬರುತ್ತಾರೆ; ಹೂಮಾಲೆಗಳು, ಇರುಮುಡಿಗಳೊಂದಿಗೆ ಪಾವನ ಪಂಪಾ ನದಿಯಲ್ಲಿ ಸ್ನಾನ ಮಾಡಿ, 18 ಪದಿಗಳನ್ನು ಏರುತ್ತಾರೆ; ಧರ್ಮಶಾಸ್ತ್ರ ರೂಪದ ಅಯ್ಯಪ್ಪನನ್ನು ದರ್ಶನ ಮಾಡುತ್ತಾರೆ.",
        ],
      },
    }),
    []
  );

  // Upa Devathas content (English provided; more locales can be added)
  const upaDevathasContent = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "Upa Devathas",
        body: [
          "Nagarajav: The deity of Nagarajav is placed adjacent to the Sreekovil (sanctum sanctorum) of Lord Ayyappa. Pilgrims, after the darsan of Lord Ayyappa and Kannimoola Ganapathi, make their darsan and give offerings to Nagarajav.",
          "Vavaru Nada: There is a place near the temple, east of Sannidhanam (the abode of Lord Ayyappa), dedicated to Vavar/Vapuran — a warrior thief/looter turned close friend of Lord Ayyappa — which is called Vavaru Nada. However, some people portray him as a Muslim and his place at Sabarimala is considered an epitome of religious harmony.",
          "Malikapurathamma: Malikapurathamma is the most important upadevatha in Sabarimala. She is considered Devi Madurai-Meenakshi, the kula-devatha of the Pandya dynasty. There are two more beliefs: that she is the demon who fought with Sri Ayyappan as Mahishi, and upon defeat a beautiful lady emerged from the body and wished to remain with Sri Ayyappa; or that the daughter of Sri Ayyappa’s guru became a Sanyasini and desired to remain with Sri Ayyappa. As per Tantric view, pilgrims have to worship Malikappuram as ‘Adiparasakthi’. Main offerings include turmeric powder (manjal podi), saffron powder (kumkumam podi), jaggery (sharkara), honey (then), plantain (kadali pazham), and red silk.",
          "Karuppu Swami & Karuppai Amma: The temple of Karuppu Swami is located on the right side of the Pathinettam Padi (sacred eighteen steps). The temple also includes the murti of Karuppai Amma. They were people from the forest who helped Lord Ayyappa in his divine mission and are believed to have divine power.",
          "Valiya Kadutha Swami: The small shrine of Valiya Kadutha is located on the left side of the holy steps. Valiya Kadutha is also an attendant of Lord Ayyappa.",
          "Mele Ganapathi: Mel Ganapathi prathishta is adjacent to the Sreekovil (sanctum sanctorum) of the Sannidhanam. Devotees offer part of the broken ghee coconut (ney thenga) to Sri Ganapathi in the fireplace (azhi). Ganapathi homam is the main offering.",
        ],
      },
    }),
    []
  );

  // Ulsavam/Festival (English)
  const ulsavamContent = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "Ulsavam/Festival",
        body: [
          "‘Ulsavam’ is the annual festival held at Sabarimala temple during the Malayalam month of ‘Meenam’ (or the Tamil month of ‘Panguni’) falling in March–April. The temple remains open for 10 days during the ‘Ulsavam’.",
          "The festival begins with the hoisting of the temple flag, ‘Kodiyettam’. Over the following days, special poojas including ‘Ulsavabali’ and ‘Sree Bhootha Bali’ are conducted. The 9th day marks ‘Pallivetta’, when Sree Ayyappa goes in ceremonial procession to perform the royal hunt at Saramkuthi; this is followed by the Sabarimala ‘Arattu’ — the holy dip — at the Pampa river.",
          "Special poojas for ‘Panguni Uthram’ draw the annual ‘Ulsavam’ to a close. ‘Uthram’ is the birth star of Sree Ayyappan.",
        ],
      },
    }),
    []
  );

  // Ponnambalamedu (English)
  const ponnambalameduContent = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "Ponnambalamedu",
        body: [
          "Ponnambalamedu, one among the 18 hills, lies to the east of Sabarimala. It is considered the origin (moola sthan) of Bhadra Kaali, the adhi-devatha/mala-daivam of all the 18 hills of Sabarimala. Many ancient sages are believed to have performed severe tapas (penance) here for hundreds of years, filling the place with positive energy.",
          "The renowned female sage Sabari, disciple of Sage Mathanga, lived here in the Treta yuga and is said to have blessed a childless devotee, ‘Vijaya Brahmin’. Later, at Sabari Peetam, Sabari met Lord Rama and attained moksha. The divine Makara Jyoti is seen from Ponnambalamedu during sunset on Makaram 1st each year, immediately after deeparadhana in the Ayyappa temple. Millions of devotees wait with folded hands and Saranaghosham to behold this divine sight.",
        ],
      },
    }),
    []
  );

  // Rituals (English)
  const ritualsContent = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "Rituals",
        body: [
          "Malayidal (Maala Dhaaranam): A pilgrimage to Sabarimala is a disciplined test of the senses. Pilgrims lead a simple, pious life known as ‘Vratam’ for successful completion. ‘Vratam’ ideally starts when the pilgrim adorns a maala, signifying willingness to undertake austerity. A bead chain with a locket of Lord Ayyappa may be worn. From then, he is addressed as ‘Ayyappa’. Life is to be free of worldly pleasures; food is strictly vegetarian; smoking, tobacco, narcotics and alcohol are strictly avoided; conjugal abstinence is observed. The Mala is to be accepted with prayers from a temple priest or a Guruswamy (one who has completed 18 pilgrimages), or alternatively, worn in one’s prayer room. The Mala is removed only after concluding the pilgrimage.",
          "Mandala Vratam (41 days): ‘Mandala Vratam’ denotes 41 days of austerity. Wearing the Mala denotes onset of ‘Vratam’. Many consider Saturday or the day of Utram (the birth star of Lord Ayyappa) as auspicious to begin. The goal is to cultivate discipline and healthy practices through sustained self‑control and prayer. Black attire is recommended, denoting detachment from material things. Personal grooming such as cutting hair, shaving, and trimming nails is avoided during this period.",
          "Kettunirakkal / Preparation of Irumudi: This ritual prepares and packs the ‘Irumudi kettu’ under a Guruswamy’s guidance. Only those carrying the Irumudi on the head are permitted to climb the 18 sacred steps. Others take a different passage to the north to reach the sanctum for worship. During Kettunira, after initial prayers, ghee (clarified cow’s butter) — the sacred offering — is filled into a coconut after removing the fibrous cover and draining its water through a small hole. This symbolizes draining worldly attachments from the mind and filling it with spiritual aspirations (jeeva‑atma). The ghee‑filled coconut (‘neyy‑thenga’) symbolizes the devotee’s body (shell), the ghee within as the jeeva‑atma. The front compartment of the Irumudi is filled with the neyy‑thenga and offerings to Lord Ayyappa and accompanying deities, then tied closed; it is believed vibrant with spiritual power. The rear compartment is filled with food for the journey and coconuts to be broken at holy spots.",
          "Petta‑Thullal: In his incarnation as the son of the Pandalam Raja, Shree Dharma Sastha formed ‘Yogams’ — groups of youths trained in ‘Kalari’ (martial arts) to protect the pious and uphold Dharma. Among many Yogams, five were prominent: 1) Ambalappuzha Yogam, 2) Aalangat Yogam, 3) Muhamma Yogam, 4) Cheerappanchira Yogam, 5) Manarkad Yogam. The first two continue to this day. Petta Thullal is the ritual dance at Erumely en route to Sabarimala, with Nadaswaram and Saranaghosham (‘swamy thinthaka thom, ayyappa thinthaka thom’), symbolising the slaying of demoness Mahishi by Lord Ayyappa. It marks the last leg of the annual pilgrimage on January 12 each year. Traditionally, Ambalappuzha Yogam performs first, beginning after sighting a kite near noon from Kochambalam at Petta junction, then paying respects at the Nainar mosque to Ayyappa’s trusted lieutenant, Vavar/Vapuran. The Aalangad Yogam begins after sighting a star in the daylight sky. After an overnight stay at Valiambalam, both trek to Pampa for the Pampa Sadya and later participate in the Makara Vilakku festival at Sannidhanam.",
          "Mani Mandapam & Makara Vilakku (7 days): Thiruvabharanam (sacred gold ornaments of Lord Ayyappa) are kept at Srambickal Palace within the Pandalam Palace complex and are taken in procession to Sabarimala at season’s end; poojas are performed on the vigraha adorned with them, after which the ornaments are returned. Thiruvabharanam consists of three boxes (ornaments, dress materials and other items), carried by a 12‑member team to Sabarimala over ~3 days, reaching at sunset on Makara Samkranti. The first box goes to the sanctum; after poojas and deeparadhana, Makara Jyoti is seen from Ponnambalamedu.",
          "The other two boxes contain: a gold kalasa/kumbham used on the 5th day for Kalabha Abhishekam; five natural color powders for Kalamezhuthu (1. turmeric, 2. burned rice husk/umikkari, 3. rice powder, 4. from the bark of ‘Vaaka’, 5. red mixture of lime and turmeric), prepared by the senior-most mother of Pandalam palace; the Thidambu of Ayyappa (face with moustache and eyes glittering with marataka/emerald); and two flags (Thalappara Kotta and Inchipppara Kotta) — all taken to the Mani Mandapam near Malikappurathamma temple.",
          "Mani Mandapam is a plain room without any vigraha, opened only 7 days a year for poojas and rituals. It is considered the moolasthan (origin) of the temple — where Lord Ayyappa meditated before becoming one with the Dharma Sastha vigraha in the Sreekovil. On Makara Samkranti day, special noon poojas are conducted. The next day, after deeparadhana, Kalamezhuthu begins and finishes before Athazhappooja. The chaitanya (divine energy) of Lord Ayyappa is invoked (Aavahanam) into the Thidambu, taken atop a decorated elephant in procession with traditional torches and music (theevetti & vaadyam) led by the Malikappuram melsanthi towards Patinettampadi, followed by Naayaattu Vili (songs). The procession returns to Mani Mandapam; concluding poojas are performed and the Kalam is traditionally removed. The same sequence continues for the next 4 days, with different Kalams: Day 1 Ayyappa as Brahmachari; Day 2 as warrior; Day 3 as young prince (a representative from Pandalam, as father of Manikantan, stays in Rajamandapam west of Mani Mandapam till the festival ends); Day 5 as King with full decoration and crown. On Day 5, the procession touches the 18 steps and goes up to Saramkuthi, marking festival conclusion. It is clarified that on all five days, Lord Ayyappa — not Malikappurathamma — is taken on the decorated elephant. Lord bids farewell to devotees at Saramkuthi and returns without torches and music. Ambalappuzha and Aalangat Yogams conduct rituals at Mani Mandapam, accompany Lord to Pathinettampadi, perform arathi, and return on the first afternoon, one after the other.",
        ],
      },
    }),
    []
  );

  // Guruthy Tharpanam (English)
  const guruthyContent = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "Guruthy Tharpanam",
        body: [
          "Guruthy is a red liquid prepared by mixing lime and turmeric in a large quantity of water in a broad copper/alloy vessel. After pooja, pouring the guruthy in the traditional way is performed as a vazhipadu (offering/ritual) to Goddess Bhadra Kaali — the adhi‑devatha and mala‑devatha (owner of the mountains) — as an annual parihara‑kriya to increase the chaithanya (divine energy).",
          "Guruthy Tharpanam is performed on the sixth day after Makara‑samkramam (7th of Makaram month), after Athazhappooja, in the courtyard of the Malikappuram temple complex. Five kalams (drawings of deities) representing the Pancha‑bhoothas are drawn, poojas are performed, and guruthy is poured in the traditional way.",
          "Simultaneously, Guruthy Tharpanam is also performed at three more places — as offerings to Malikappurathamma (as Madurai Meenakshi), to Kochu Kadutha Swami and to Vavar/Vapuran.",
        ],
      },
    }),
    []
  );

  // Trek to Sabarimala (English)
  const trekContent = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "Trek to Sabarimala",
        body: [
          "Traditional Path — Route 1: There are several routes to Sabarimala, including the Erumeli route, Vandiperiyar route and the Chalakayam route. The Erumeli path is considered traditional as Ayyappan is held to have taken this route to subdue Mahishi. It is also the toughest, a ~61 km trek through forests and hills.",
          "Pilgrims on the Erumeli route begin with prayers at the shrines of Dharma Sastha and Vavar Swami at Erumeli. About 4 km ahead is Perur Thodu — a resting place of Ayyappa — marking the ascent towards Sabarimala. Beyond Perur Thodu, the forest is called Poongavanam (Ayyappa’s garden).",
          "The next spot is Kaalaketti (~10 km from Perur Thodu): ‘Kaala’ means ox and ‘ketti’ is tying; it is believed Lord Shiva tied his vahana here and witnessed Ayyappa slaying Mahishi. Pilgrims offer prayers, lighting camphor and breaking coconuts.",
          "Azhutha River lies ~2 km from Kaalaketti. Pilgrims collect pebbles before the steep Azhutha hill (a 2 km ascent considered very tough, often drawing tears). Kallidumkunnu at the summit is where pilgrims throw the pebbles down, commemorating the flinging down of Mahishi’s remains.",
          "Inchipparakota marks the descent after the hill. Here is Kotayil Sastha’s shrine. The slippery descent ends at Karimala thodu (canal), flanked by Azhutha hill on one side and Karimala on the other.",
          "Karimala is frequented by elephants; pilgrims set campfires to guard against chill and animals. The 5 km ascent over seven levels is arduous; devotees chant ‘Swamiye Saranam Ayyappa’. On top, the flat tract allows rest; the ‘Naazhikkinar’ (well within a well) offers fresh spring water. Prayers are offered to Karimalanthan, Kochu Kadutha Swami and Bhagawathi.",
          "After a strenuous 5 km descent via Valiyaanavattam and Cheriyaanavattam, pilgrims reach the river Pampa — as holy as the Ganges and the place where King Rajasekhara is believed to have found infant Manikandan. The Sannidhanam is ~8 km from Pampa; notable spots en route include Neelimala, Appachimedu, Sabareepeedom and Saramkuthi. Subramaniam Road is a longer but gentler alternative.",
          "Route 2: The motor route from Erumely to Pampa via Mukkoottuthara, Pampavali, Plappally, Nilakkal, Chalakkayam and Pampa is now commonly used to access the base.",
          "Route 3: Pilgrims coming via Cumbum/Theni (Tamil Nadu) can reach Sabarimala via Pulmedu (verify current access conditions).",
          "The ascents and descents of the trek teach that life has ups and downs — one must persevere to reach the summit.",
        ],
      },
    }),
    []
  );

  // 18 Steps (Pathinettampadi) (English)
  const steps18Content = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "18 Steps (Pathinettampadi)",
        body: [
          "Pathinettampadi are the 18 divine steps to the Thirumuttam of Sabarimala temple. Each step is 5 feet long, 9 inches wide and 9 inches high. Once granite, the steps were covered in 1985 with Panchaloha (gold, silver, copper, iron, tin). Pilgrims must carry an irumudikettu and observe a 41‑day vratam to ascend the steps. Devotees who climb the steps 18 times plant a young coconut tree at Sannidhanam and are known as ‘Guruswami’.",
          "Meaning of the 18 steps: the first five denote Panchendriyas (senses); the next eight, Ashtaragas (inner passions); the next three, Trigunas (Sattva, Rajas, Tamas); the last two, Vidya and Avidya (knowledge and ignorance). The steps also symbolise the 18 hills around Sabarimala — crossing them signifies purification and eligibility for Lord Ayyappa’s darshan.",
          "1) Eyes — sight",
          "2) Nose — smell",
          "3) Tongue — taste",
          "4) Skin — touch",
          "5) Ears — hearing",
          "6) Kaama — lust",
          "7) Krodha — anger",
          "8) Lobha — greed",
          "9) Moha — temptation",
          "10) Mada — pride",
          "11) Maatsarya — envy",
          "12) Ahamkara — ego",
          "13) Dumpam — jealousy",
          "14) Tamo guna",
          "15) Rajo guna",
          "16) Sattva guna",
          "17) Vidya — wrong knowledge",
          "18) Avidya — ignorance",
        ],
      },
    }),
    []
  );

  // 18 Hills (Mala) (English)
  const hills18Content = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "18 Hills (Mala)",
        body: [
          "Numbered list of the 18 hills associated with Sabarimala:",
          "1) Ponnambalamedu",
          "2) Skandamala",
          "3) Sundaramala",
          "4) Nagarmala",
          "5) Inchipparakotta",
          "6) Karimala",
          "7) Mayiladumala",
          "8) Chittambalamedu",
          "9) Sreepadam mala",
          "10) Pudussery mamala",
          "11) Mathangamala",
          "12) Kalki mamala",
          "13) Nilackal mala",
          "14) Thalappara mala",
          "15) Thevar mala",
          "16) Kalaketty mala",
          "17) Neelimala",
          "18) Sabarimala",
        ],
      },
    }),
    []
  );

  // Anti Sabarimala Activities (English)
  const antiContent = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "Anti Sabarimala Activities",
        body: [
          "From a remote, obscure, difficult to reach pilgrimage spot, over the last 75 years Sabarimala has become one of the most popular pilgrimage centres in the world. It now attracts about 40–50 million (4–5 crores) pilgrims every year from across Hindu society — all castes and classes — and from all over India, especially the southern states. Its popularity poses a hurdle to proselytisation; resistance to such moves appears in various forms. This section narrates some challenges.",
          "16 July 1950: Sabarimala temple was burnt and the vigraha of Ayyappa was broken. A one‑man inquiry commission headed by DIG Keshava Menon submitted a report unraveling a conspiracy by fanatical Christian elements; the report was never tabled in the assembly and culprits were not brought to justice.",
          "29 March 1983: A wooden cross was planted overnight on private land at Nilakkal (within the 18 hills of Sabarimala). Claims were made that St. Thomas had built a church there in 52 AD. On May 19 the state government acquired land for a church. After a year‑long agitation, the planted cross was removed and the move thwarted, though the myth resurfaces periodically.",
          "November 2000: A local paper reported that a rat’s tail and a beef ball were found in sealed packets near the hundi at Sannidhanam — an ‘anti‑prasadam’ meant to poison devotees’ minds. The Devaswom Board first presented it as true, then backtracked; the truth was never unravelled.",
          "2018 onward: Following a Supreme Court verdict, the state, using police force, attempted to thrust entry for women of menstruating age. A devaprasnam stated ‘younger devas are angry with such moves’. Despite strong protests, activists were escorted into the temple against tradition and ritual injunctions.",
          "Statements by the Kerala CM that renovation would proceed without devaprasnam and that water could be piped from Pampa for abhishekam (instead of sacred water carried by devotees) were criticised as mocking tradition.",
          "Some groups circulated narratives (e.g., around Vavar and Vavar Nada) to mislead devotees and divert donations; such stories sometimes gained currency with support from ‘secular’ quarters of government.",
          "2006–2018: A PIL by Indian Young Lawyers Association led to the 28 Sept 2018 Supreme Court verdict permitting women’s entry; large peaceful agitations by devotees, including millions of women, followed and were met with heavy policing.",
          "Sabarimala Ayyappa Seva Samajam organised resistance under the banner of Sabarimala Karma Samiti and Sabarimala Action Council.",
          "14 Nov 2019: On 65 review petitions (by Sabarimala Ayyappa Seva Samajam, National Ayyappa Devotees’ Association, Nair Service Society, All Kerala Brahmin Association and others), the Supreme Court by 3:2 majority referred issues to a larger bench; two judges dissented and dismissed the reviews.",
          "Jan 2020: A nine‑judge bench was constituted to examine questions on freedom of religion (Arts. 25–26), equality (Art. 14) and related issues across faiths; hearings have been ongoing intermittently.",
        ],
      },
    }),
    []
  );

  // Tips to Ayyappa Devotees (English)
  const tipsContent = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "Tips to Ayyappa Devotees",
        body: [
          "• Meet a Guruswamy and wear Mudra (special garland) before planning darshan.",
          "• A Guruswamy is a devotee with 18+ years of Sabarimala experience who guides pilgrims.",
          "• Observe 41‑day vratham: bath twice daily; do not remove the mala until completion. After bath apply vibhuti and chant ‘Swamiye Saranam Ayyappa’ 108 times before a photo or at a temple. Wear black/blue/saffron clothes; uniforms allowed at work/school but change after returning.",
          "• No haircut or shaving. Eat fresh vegetarian food; avoid leftovers. Prefer home food; if unavoidable, choose clean vegetarian hotel food.",
          "• Keep Ayyappa in mind; chant His name; see ‘Swamy’ in all beings and address others as ‘Swamy’.",
          "• Avoid luxury, cosmetics, face powder, perfumes.",
          "• Avoid mattresses; use a mat or cot for sleep/rest.",
          "• Observe strict brahmacharyam physically and mentally.",
          "• Join spiritual activities in nearby temples/places (Ayyappa pooja, Ayyappan vilakku, bhajans) without waiting for invitation.",
          "• Respect Guruswamy and follow guidance. After 41 days, with his help fill ghee in coconut and prepare Irumudi with pooja items (avoid plastic). Preserve the Irumudi with great respect during the journey.",
          "• After bath in holy Pampa and trekking via Neelimala, Sabareepeedam, Saramkuthi etc., climb the 18 steps, do Neyyabhishekam, receive a portion of ghee as prasadam, worship upa‑devathas and spend time in dhyanam/meditation.",
          "• Protect holy Pampa; never contaminate it with garbage or clothes.",
          "• Avoid plastic in Sabarimala and Poonkavanam; if compelled to carry any, do not litter.",
          "• On return, bathe and do saranaghosham before Ayyappa’s photo/temple, then remove the mala and end the vratham (never remove the mala en route before reaching home).",
        ],
      },
    }),
    []
  );

  // Facts on Sabarimala (English)
  const factsContent = useMemo<Partial<Record<Language, ContentBlock>>>(
    () => ({
      en: {
        title: "Facts on Sabarimala",
        body: [
          "• The temple of Dharma Sastha at Sabarimala is believed to have been consecrated by Sage Parashurama. Dharma Sastha, also known as Hariharaputra, is the son of Hari (Vishnu in Mohini form) and Hara (Siva).",
          "• Lord Ayyappa is believed to be a historical person (10th–11th century) born as Manikandan in the royal palace of Pandalam who merged with Dharma Sastha. In Sabarimala He is a Naiṣṭhika Brahmachari in Patta Yogasanam.",
          "• Lord Ayyappa explained to his father, the King of Pandalam, the rituals, customs and poojas, emphasising ‘vratam’. He specified that devotees must ascend the 18 holy steps with Irumudi and that women of reproductive age should not visit Him.",
          "• The British ‘Memoir of the Survey of the Travancore and Cochin States’ (Ward & Conner, 1816–1820) mentions Sabarimala, its structure and pooja dates, and notes that women aged ~10–50 refrain from visiting the temple.",
          "• Kerala High Court (1991, Justices Paripoornan and K.B. Marar) recognised that restricting women aged above 10 and below 50 from trekking the holy hills and offering worship accords with usage prevalent from time immemorial.",
          "• Formerly the temple opened only once a year (Jan 11–15). After devaprasna, it now opens Nov 15–Jan 20, first five days of each Malayalam month, and on occasions like Vishu, Travancore King’s birthday, annual festival etc.",
          "• Devotees increased from 10–15 thousand in 1816 to 4–5 crores (40–50 million) now; visitors arrive from all over India and 25–30 foreign countries.",
          "• Preparation begins on the first day of Malayalam month Vruschikam: wear sacred mala (tulsi/sandal/pearls) under a Guruswamy’s guidance, observe 41‑day vratam, maintain purity and climb the 18 steps with Irumudi.",
          "• Wearing the mala, the devotee takes the name of the Lord (Ayyappa) and sees Swamy Ayyappa in all beings.",
          "• Sabarimala exemplifies national integration — unity in diversity.",
          "• No gender discrimination: only a restriction for women between 10 and 50 as prescribed by the Tantri; lakhs of women (‘Malikappuram’) outside this age group trek and receive darshan.",
          "• When one begins vratham wearing mala/mudra, the whole family often joins; more than 50% of Hindu families in South India are directly or indirectly connected to Swamy Ayyappa.",
        ],
      },
    }),
    []
  );



  return (
    <section className="mt-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
      <aside className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm md:sticky md:top-28 self-start">
        <h2 className="text-sm font-bold text-[#D4AF37]">Table of Contents</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {topics.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  className={`w-full text-left rounded-md px-2 py-1 transition-colors flex items-center gap-2 ${
                    active === s.id
                      ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  <span className="font-bold">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="rounded-xl border border-border bg-card/70 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg md:text-xl font-semibold text-[#D4AF37] flex items-center gap-2">
            {CurrentIcon ? <CurrentIcon className="h-5 w-5" /> : null}
            {
              active === "ayyappa-birth"
                ? (fullBirthContent[lang]?.title || current.title)
                : active === "upa-devathas"
                ? (upaDevathasContent[lang]?.title || current.title)
                : active === "ulsavam"
                ? (ulsavamContent[lang]?.title || current.title)
                : active === "ponnambalamedu"
                ? (ponnambalameduContent[lang]?.title || current.title)
                : active === "rituals"
                ? (ritualsContent[lang]?.title || current.title)
                : active === "guruthy"
                ? (guruthyContent[lang]?.title || current.title)
                : active === "trek"
                ? (trekContent[lang]?.title || current.title)
                : active === "18-steps"
                ? (steps18Content[lang]?.title || current.title)
                : active === "18-hills"
                ? (hills18Content[lang]?.title || current.title)
                : active === "anti"
                ? (antiContent[lang]?.title || current.title)
                : active === "tips"
                ? (tipsContent[lang]?.title || current.title)
                : active === "facts"
                ? (factsContent[lang]?.title || current.title)
                : current.title
            }
          </h3>
          {active === "ayyappa-birth" && (
            <label className="text-xs text-[#D4AF37] inline-flex items-center gap-2">
              <span>Language</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="rounded-md bg-background/70 px-2 py-1 text-white ring-1 ring-border focus:outline-none focus:ring-2"
              >
                <option value="en">English</option>
                <option value="ml">Malayalam</option>
                <option value="hi">Hindi</option>
                <option value="te">Telugu</option>
                <option value="ta">Tamil</option>
                <option value="kn">Kannada</option>
              </select>
            </label>
          )}
        </div>
        <div className="mt-3 text-sm md:text-[15px] leading-7 text-white/90 space-y-4 text-left">
          {active === "ayyappa-birth"
            ? ((fullBirthContent[lang] ?? fullBirthContent.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "upa-devathas"
            ? ((upaDevathasContent[lang] ?? upaDevathasContent.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "ulsavam"
            ? ((ulsavamContent[lang] ?? ulsavamContent.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "ponnambalamedu"
            ? ((ponnambalameduContent[lang] ?? ponnambalameduContent.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "rituals"
            ? ((ritualsContent[lang] ?? ritualsContent.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "guruthy"
            ? ((guruthyContent[lang] ?? guruthyContent.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "trek"
            ? ((trekContent[lang] ?? trekContent.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "18-steps"
            ? ((steps18Content[lang] ?? steps18Content.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "18-hills"
            ? ((hills18Content[lang] ?? hills18Content.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "anti"
            ? ((antiContent[lang] ?? antiContent.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "tips"
            ? ((tipsContent[lang] ?? tipsContent.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : active === "facts"
            ? ((factsContent[lang] ?? factsContent.en)?.body ?? []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            : (
              <p>
                Content coming soon. This section will be updated with rich details and visuals about “{current.title}”.
              </p>
            )}
        </div>
      </div>
    </section>
  );
}
