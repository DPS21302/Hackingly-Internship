import { Accordion, AccordionItem } from "@nextui-org/react";
import FaqImg from "@/assets/images/faq.webp";
import Image from "next/image";
const Faq = () => {
    const FqaData = [
      {
        question: "What is the motivation behind a hackathon?",
        answer:
          "Hackathons aim to support creativity, innovation, and problem-solving, often resulting in the development of prototypes, software, or solutions for real-world challenges.",
      },
      {
        question: "How long does a typical hackathon last?",
        answer:
          "The duration of a hackathon can vary, but it's usually held for over a day or over the weekend. Some hackathons may last longer, spanning several days.",
      },
      {
        question: "Are hackathons just for software engineers?",
        answer:
          "No, hackathons are organized for participants with various skills. While coding is common, hackathons also welcome designers, project managers, and individuals with different expertise to contribute.",
      },
      {
        question: "Do participants need prior experience to join a hackathon?",
        answer:
          "Many hackathons are open to participants of all skill levels, from beginners to experienced professionals. Some hackathons offer mentorship to help beginners get started.",
      },
      {
        question: "What is a bootcamp?",
        answer:
          "A bootcamp is an intensive, short-term training program designed to provide participants with specific skills, often in areas like coding, data science, or digital marketing.",
      },
      {
        question: "How long does a typical bootcamp last?",
        answer:
          "Bootcamp lengths vary but typically range from a few weeks to a few months. They are designed to offer focused and immersive learning experiences.",
      },
      {
        question: "Are bootcamps suitable for beginners?",
        answer:
          "Yes, many bootcamps are beginner-friendly and provide foundational knowledge. Some may have prerequisites or options for more advanced courses.",
      },
      {
        question: "What are the benefits of attending a bootcamp?",
        answer:
          "Bootcamps offer a structured learning environment, hands-on experience, and the valuable opportunity to acquire practical skills quickly for a fast track to career advancement or a career change.",
      },
      {
        question: "Do bootcamps enhance job opportunities?",
        answer:
          "Many bootcamps provide job placement support, including career counseling, resume workshops, and networking opportunities to help graduates secure employment in their chosen field.",
      },
      {
        question: "Are hackathons and bootcamps free?",
        answer:
          "No, typically hackathons and bootcamps are not free, and participants may need to pay registration fees or tuition. However, there may be some exceptions or sponsored events that are free to attend.",
      },
    ];
    return (
      <>
        <div className="layoutBox">
          <div className="my-10 text-center">
            <h2 className="text-3xl mb-2 font-medium">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="flex items-center gap-6 p-3 md:p-0">
            <Accordion>
              {FqaData.map((data) => (
                <AccordionItem
                  key={data.question}
                  aria-label={data.question}
                  title={data.question}
                >
                  {data.answer}
                </AccordionItem>
              ))}
            </Accordion>
            <div className="hidden md:block rounded-full">
              <Image src={FaqImg} width={1000} alt="" className="bg-transparent rounded-l-[60px]" />
            </div>
          </div>
        </div>
      </>
    );
  };

export default Faq;

