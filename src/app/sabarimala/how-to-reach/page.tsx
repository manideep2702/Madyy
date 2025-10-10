"use client";

import { Train, Plane, Bus } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 pt-24 md:pt-28 pb-16">
        <section className="rounded-2xl border border-border bg-card/70 p-6 md:p-8 shadow-sm">
            <h1 className="text-center text-2xl md:text-3xl font-extrabold tracking-wide text-[#D4AF37]">How to Reach</h1>

          <div className="mt-6 space-y-4 text-sm md:text-[15px] leading-7 text-left text-white/90">
            <h2 className="text-xl md:text-2xl font-extrabold flex items-center gap-3 text-[#D4AF37]"><Train className="h-6 w-6" /> By Rail</h2>
            <p>
              Get down at Kottayam Railway Station. Take a taxi or State Transport bus to Pampa. 93 KM, 2 1/2 hours. (
              <a
                className="underline underline-offset-2"
                href="https://www.google.com/maps/dir/Kottayam+Railway+Station,+Railway+Rd,+Nagampadam,+Kottayam,+Kerala+686002/Pampa+Bus+Stand,+State+Highway+44,+Sabarimala,+Kerala/@9.508077,76.4757897,101357m/data=!3m2!1e3!4b1!4m14!4m13!1m5!1m1!1s0x3b062b768f668dd5:0xbf4e72d1e97f7332!2m2!1d76.5322269!2d9.5943927!1m5!1m1!1s0x3b065b906d9f69c3:0xc9d725a23834dacd!2m2!1d77.0688584!2d9.4066187!3e0?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                See directions here
              </a>
              )
            </p>
            <p>
              Or: Get down at Chengannur Railway Station. Take a taxi or State Transport bus to Pampa. 85 KM, 2 1/4 hours. (
              <a
                className="underline underline-offset-2"
                href="https://www.google.com/maps/dir/Railway+Station+Chengannur,+Chengannur,+Kerala/Pampa+Bus+Stand,+State+Highway+44,+Sabarimala,+Kerala/@9.3944137,76.5142169,101391m/data=!3m2!1e3!4b1!4m14!4m13!1m5!1m1!1s0x3b0622ee48b6d633:0x83222264c99e69d9!2m2!1d76.6085457!2d9.3191353!1m5!1m1!1s0x3b065b906d9f69c3:0xc9d725a23834dacd!2m2!1d77.0688584!2d9.4066187!3e0?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                See directions here
              </a>
              )
            </p>
            <p>
              From Pampa, it is 6 KM, 1 1/2 hrs trekking on foot. (
              <a
                className="underline underline-offset-2"
                href="https://www.google.com/maps/dir/Pampa+Bus+Stand,+State+Highway+44,+Sabarimala,+Kerala/Sabarimala+Ayyappan+Temple,+Sannidhanam,+Sabarimala,+Kerala/@9.4219004,77.0648026,3168m/data=!3m2!1e3!4b1!4m14!4m13!1m5!1m1!1s0x3b065b906d9f69c3:0xc9d725a23834dacd!2m2!1d77.0688584!2d9.4066187!1m5!1m1!1s0x3b065bb5fe893067:0x66c47b4d5d2359fc!2m2!1d77.0813685!2d9.4345978!3e2?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                See map here
              </a>
              )
            </p>

            <h2 className="mt-6 text-xl md:text-2xl font-extrabold flex items-center gap-3 text-[#D4AF37]"><Plane className="h-6 w-6" /> By Air</h2>
            <p>
              Fly to Thiruvananthapuram (TRV) Airport. Take a taxi or bus to Pampa. 176 KM, 4 1/2 hrs. (
              <a
                className="underline underline-offset-2"
                href="https://www.google.com/maps/dir/Trivandrum+Domestic+Airport,+Vallakkadavu,+Thiruvananthapuram,+Kerala/Pampa+Bus+Stand,+State+Highway+44,+Sabarimala,+Kerala/@8.9406962,76.6085674,101521m/data=!3m2!1e3!4b1!4m14!4m13!1m5!1m1!1s0x3b05bbe8bec92f31:0x7d2eb26cb74c53b0!2m2!1d76.918593!2d8.477842!1m5!1m1!1s0x3b065b906d9f69c3:0xc9d725a23834dacd!2m2!1d77.0688584!2d9.4066187!3e0?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                See directions here
              </a>
              )
            </p>
            <p>
              Fly to Kochi (COK) Airport. Take a taxi or bus to Pampa. 157 KM, 4 hrs. (
              <a
                className="underline underline-offset-2"
                href="https://www.google.com/maps/dir/Cochin+International+Airport+(COK),+Airport+Road,+Kochi,+Kerala/Pampa+Bus+Stand,+State+Highway+44,+Sabarimala,+Kerala/@9.7756184,76.1490639,9z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x3b080882748f4a6f:0x30b2ebe45d968458!2m2!1d76.392958!2d10.1517834!1m5!1m1!1s0x3b065b906d9f69c3:0xc9d725a23834dacd!2m2!1d77.0688584!2d9.4066187!3e0"
                target="_blank"
                rel="noopener noreferrer"
              >
                See directions here
              </a>
              )
            </p>
            <p>
              From Pampa, it is 6 KM, 1 1/2 hrs trekking on foot. (
              <a
                className="underline underline-offset-2"
                href="https://www.google.com/maps/dir/Pampa+Bus+Stand,+State+Highway+44,+Sabarimala,+Kerala/Sabarimala+Ayyappan+Temple,+Sannidhanam,+Sabarimala,+Kerala/@9.4219004,77.0648026,3168m/data=!3m2!1e3!4b1!4m14!4m13!1m5!1m1!1s0x3b065b906d9f69c3:0xc9d725a23834dacd!2m2!1d77.0688584!2d9.4066187!1m5!1m1!1s0x3b065bb5fe893067:0x66c47b4d5d2359fc!2m2!1d77.0813685!2d9.4345978!3e2?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                See map here
              </a>
              )
            </p>

            <h2 className="mt-6 text-xl md:text-2xl font-extrabold flex items-center gap-3 text-[#D4AF37]"><Bus className="h-6 w-6" /> By Road</h2>
            <p>
              Kerala State Road Transport Corporation has regular bus services to Pampa from Coimbatore, Palani and Tenkasi. (
              <a className="underline underline-offset-2" href="https://www.keralartc.com/" target="_blank" rel="noopener noreferrer">
                See details
              </a>
              )
            </p>
            <p>
              Karnataka State Road Transport Corporation also operates bus service for pilgrims. (
              <a className="underline underline-offset-2" href="https://ksrtc.in/" target="_blank" rel="noopener noreferrer">
                Click here
              </a>
              )
            </p>
            <p>
              Tamil Nadu State Transport Corporation also operates bus service for pilgrims. (
              <a className="underline underline-offset-2" href="https://www.tnstc.in/OTRSOnline/" target="_blank" rel="noopener noreferrer">
                Click here
              </a>
              )
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
