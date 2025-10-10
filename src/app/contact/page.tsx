import { Contact2 } from "@/components/ui/contact-2";

export default function Page() {
  return (
    <Contact2
      title="Contact Us"
      description="Sree Sabari Sastha Seva Samithi (SSSSS). In case of any changes / suggestions please mail us sasthasevasamithi@gmail.com"
      address={`Sree Sabari Sastha Seva Samithi (SSSSS)\n207, Hema Durga Heights, Widia Colony Road, Miyapur, Hyderabad 500049\n\nFacebook: Sastha Seva Samithi`}
      phones={["Phone/FAX: 040-2304 0930", "Mobile: +91-9866007840"]}
      emails={["suggestions@sabarisastha.org", "sasthasevasamithi@gmail.com"]}
      web={{ label: "sabarisastha.org", url: "https://sabarisastha.org" }}
    />
  );
}
