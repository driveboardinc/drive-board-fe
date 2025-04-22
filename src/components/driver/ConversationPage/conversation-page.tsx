"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { JobDetailsPanel } from "./job-details-panel";
import { ConversationList } from "./conversation-list";
import { MessageArea } from "./message-area";

export function ConversationPage() {
  const [activeConversation, setActiveConversation] = useState<string | null>("1");
  const isMobile = useIsMobile();
  const [showConversations, setShowConversations] = useState(!isMobile);
  const [showJobDetails, setShowJobDetails] = useState(false);

  // Updated job details for truck-related positions
  const jobDetailsMap: Record<string, any> = {
    "1": {
      id: 10,
      title: "CDL Truck Driver",
      no_of_openings: 5,
      country: "United States",
      location: "Dallas, TX",
      shift: "Flexible",
      job_type_names: ["Full-time"],
      experience_level_names: ["2+ years"],
      application_method_names: ["email", "phone"],
      language_names: ["en"],
      working_days: "Monday to Sunday (rotating schedule)",
      min_pay: 75000,
      max_pay: 95000,
      description:
        "We are looking for a reliable and experienced CDL Truck Driver to join our team. Responsibilities include transporting goods safely, following DOT regulations, and maintaining vehicle upkeep. Routes are primarily regional with home time every weekend.",
      require_resume: false,
      application_updates: true,
      allow_contact: true,
      fair_chance_hiring: true,
      background_check_required: true,
    },
    "2": {
      id: 11,
      title: "Truck Mechanic",
      no_of_openings: 3,
      country: "United States",
      location: "Houston, TX",
      shift: "Day",
      job_type_names: ["Full-time"],
      experience_level_names: ["3+ years"],
      application_method_names: ["email"],
      language_names: ["en"],
      working_days: "Monday to Friday",
      min_pay: 60000,
      max_pay: 80000,
      description:
        "Experienced truck mechanic needed for fleet maintenance. Must be able to diagnose and repair diesel engines, air brake systems, and electrical systems. ASE certification preferred. Must have own tools and valid driver's license.",
      require_resume: true,
      application_updates: true,
      allow_contact: true,
      fair_chance_hiring: false,
      background_check_required: true,
    },
    "3": {
      id: 12,
      title: "Logistics Coordinator",
      no_of_openings: 1,
      country: "United States",
      location: "Atlanta, GA",
      shift: "Day",
      job_type_names: ["Full-time", "Office"],
      experience_level_names: ["1-2 years"],
      application_method_names: ["email", "online"],
      language_names: ["en"],
      working_days: "Monday to Friday",
      min_pay: 45000,
      max_pay: 55000,
      description:
        "We're seeking a detail-oriented Logistics Coordinator to manage our trucking operations. Responsibilities include scheduling deliveries, coordinating with drivers, tracking shipments, and ensuring compliance with transportation regulations.",
      require_resume: true,
      application_updates: true,
      allow_contact: true,
      fair_chance_hiring: true,
      background_check_required: true,
    },
    "4": {
      id: 13,
      title: "OTR Truck Driver",
      no_of_openings: 10,
      country: "United States",
      location: "Nationwide",
      shift: "Rotating",
      job_type_names: ["Full-time", "Travel"],
      experience_level_names: ["1+ years"],
      application_method_names: ["phone", "online"],
      language_names: ["en"],
      working_days: "Flexible schedule (2 weeks on, 3 days off)",
      min_pay: 85000,
      max_pay: 110000,
      description:
        "Over-the-road truck driver needed for long-haul routes. Class A CDL required with clean driving record. Experience with refrigerated loads preferred. Competitive pay with performance bonuses and benefits package.",
      require_resume: false,
      application_updates: true,
      allow_contact: true,
      fair_chance_hiring: false,
      background_check_required: true,
    },
    "5": {
      id: 14,
      title: "Fleet Manager",
      no_of_openings: 1,
      country: "United States",
      location: "Chicago, IL",
      shift: "Day",
      job_type_names: ["Full-time", "Management"],
      experience_level_names: ["5+ years"],
      application_method_names: ["email"],
      language_names: ["en"],
      working_days: "Monday to Friday",
      min_pay: 70000,
      max_pay: 90000,
      description:
        "Experienced Fleet Manager needed to oversee our growing truck fleet. Responsibilities include driver management, maintenance scheduling, route optimization, and ensuring compliance with safety regulations. Previous experience in transportation management required.",
      require_resume: true,
      application_updates: true,
      allow_contact: false,
      fair_chance_hiring: true,
      background_check_required: true,
    },
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
    if (isMobile) {
      setShowConversations(false);
    }
  };

  const handleBackToList = () => {
    setShowConversations(true);
  };

  const handleToggleJobDetails = () => {
    setShowJobDetails(!showJobDetails);
  };

  return (
    <div className="flex flex-col border  bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Conversation List */}
        {(showConversations || !isMobile) && (
          <div className={`${isMobile ? "w-full" : "w-80"} border-r bg-white flex-shrink-0`}>
            <ConversationList
              activeConversationId={activeConversation}
              onSelectConversation={handleSelectConversation}
            />
          </div>
        )}

        {/* Message Area */}
        {(!showConversations || !isMobile) && (
          <div className={`flex-1 ${isMobile && showJobDetails ? "hidden" : "block"}`}>
            <MessageArea
              conversationId={activeConversation}
              onBackClick={isMobile ? handleBackToList : undefined}
              onToggleJobDetails={isMobile ? handleToggleJobDetails : undefined}
              showJobDetailsButton={isMobile}
            />
          </div>
        )}

        {/* Job Details Panel */}
        {(!isMobile || (isMobile && showJobDetails)) && (
          <div className={`${isMobile ? "w-full" : "w-96"} border-l bg-white flex-shrink-0`}>
            {isMobile && (
              <div className="p-3 border-b">
                <button
                  onClick={handleToggleJobDetails}
                  className="text-blue-600 font-medium text-sm flex items-center"
                >
                  ← Back to messages
                </button>
              </div>
            )}
            {activeConversation && jobDetailsMap[activeConversation] ? (
              <JobDetailsPanel jobDetails={jobDetailsMap[activeConversation]} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No job details available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
