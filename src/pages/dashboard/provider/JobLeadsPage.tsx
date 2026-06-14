import SeButton from "@/components/button/SeButton";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoCashOutline,
  IoArrowForward,
} from "react-icons/io5";

// Mock data: This matches what a Java 'JobSummaryDto' would look like
const mockLeads = [
  {
    id: "lead-1",
    title: "Full house plumbing inspection",
    category: "Plumbing",
    location: "New Baneshwor (1.2 km away)",
    urgency: "Today",
    budget: "Rs. 2,000 - 5,000",
    postedAt: "5 mins ago",
  },
  {
    id: "lead-2",
    title: "Ceiling fan installation",
    category: "Electrical",
    location: "Kupondole (2.5 km away)",
    urgency: "Tomorrow",
    budget: "Rs. 800",
    postedAt: "1 hour ago",
  },
];

const JobLeadsPage = () => {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Job Leads</h1>
        <p className="text-muted text-sm">
          New opportunities matching your skills
        </p>
      </div>

      <div className="grid gap-4">
        {mockLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-card-bg p-6 rounded-2xl border border-light-gray shadow-sm hover:border-accent transition-colors group"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Lead Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-small font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">
                    {lead.category}
                  </span>
                  <span className="text-xs text-muted">{lead.postedAt}</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {lead.title}
                </h3>

                <div className="grid grid-cols-2 gap-y-2 text-sm text-text-dark font-medium">
                  <div className="flex items-center gap-2">
                    <IoLocationOutline className="text-accent" />{" "}
                    {lead.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <IoTimeOutline className="text-accent" /> {lead.urgency}
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCashOutline className="text-accent" /> {lead.budget}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center md:border-l border-light-gray md:pl-6">
                <SeButton
                  btnText="View Details"
                  variant="accent"
                  className="w-full md:w-auto"
                  icon={<IoArrowForward />}
                  iconPosition="right"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobLeadsPage;
