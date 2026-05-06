import SeContainer from "@/components/container/SeContainer";
import FaqCard from "./FaqCard";
import SeContainerPadding from "@/components/container/SeContainerPadding";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeParagraph from "@/components/paragraph/SeParagraph";
import SeContainerMD from "@/components/container/SeContainerMD";
import { useState } from "react";

const faqItems = [
  {
    id: 1,
    question: "How is Sewalo different from other service platforms?",
    answer:
      "Unlike commission-based platforms, Sewalo uses a lead-unlock model. Providers pay a small fee to access leads — there are no transaction commissions. This eliminates platform leakage and aligns with Nepal's offline payment culture.",
  },
  {
    id: 2,
    question: "What is the 'Rule of Three'?",
    answer:
      "Each job request is limited to a maximum of 3 service providers. This ensures high win-rates for providers and prevents customers from being overwhelmed with too many quotes.",
  },
  {
    id: 3,
    question: "How does AI categorization work?",
    answer:
      "When a homeowner posts a job with photos and a description, our multimodal AI analyzes both to automatically classify the job as Micro, Medium, or Major — ensuring fair lead pricing based on complexity.",
  },
  {
    id: 4,
    question: "Is posting a job free for homeowners?",
    answer:
      "Yes, homeowners can post jobs completely free. You describe your issue, upload photos, and get matched with up to 3 qualified providers in your area.",
  },
  {
    id: 5,
    question: "What area does Sewalo cover?",
    answer:
      "Sewalo matches service providers within a 5km radius of your location for faster response times. We're starting in the Kathmandu Valley and expanding across Nepal.",
  },
  {
    id: 6,
    question:
      "Can I cancel my subscription anytime?Can I cancel my subscription anytime?",
    answer:
      "Yes, all provider subscriptions can be cancelled anytime. You'll retain access until the end of your billing period. No lock-in contracts.",
  },
];

const Faq = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };
  return (
    <section className="bg-light py-25.5">
      <SeContainer>
        <SeContainerPadding>
          <div>
            <div className="grid gap-4 mb-12">
              <SeSectionHeader title="Frequently Asked Questions" />
              <SeParagraph title="Everything you need to know about Sewalo" />
            </div>
            <SeContainerMD>
              <div className="grid gap-3">
                {faqItems.map((faq) => (
                  <FaqCard
                    key={faq.id}
                    id={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isActive={activeId === faq.id}
                    setActive={toggleFaq}
                  />
                ))}
              </div>
            </SeContainerMD>
          </div>
        </SeContainerPadding>
      </SeContainer>
    </section>
  );
};

export default Faq;
