// {"user":["This field is required."]}
// {"user":["carrier profile with this user already exists."]}

interface ValidationRule {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  message: string;
}

export interface CarrierSignupField {
  id: string;
  label: string;
  highlight: string[];
  emoji: string;
  type: "text" | "email" | "tel" | "select" | "multiselect" | "password" | "datetime-local";
  options?: string[];
  required: boolean;
  validation?: ValidationRule[];
}

export const carrierSignupData = {
  title: "Company Information",
  fields: [
    {
      id: "company_name",
      label: "👋 Hey! What's your **company name**?",
      highlight: ["company name"],
      type: "text",
      required: true,
      validation: [
        { minLength: 2, message: "Company name must be at least 2 characters" },
        {
          maxLength: 100,
          message: "Company name cannot exceed 100 characters",
        },
        {
          pattern: /^[a-zA-Z0-9\s.,&'-]+$/,
          message: "Please enter a valid company name",
        },
      ],
    },
    {
      id: "company_mailing_address",
      label: "📬 Where should we send important **mail**?",
      highlight: ["mailing address"],
      type: "text",
      required: true,
      validation: [
        { minLength: 5, message: "Please enter a valid mailing address" },
        {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email address",
        },
      ],
    },
    {
      id: "dot_number",
      label: "🔢 What's your **DOT number**?",
      highlight: ["DOT number"],
      type: "text",
      required: false,
      validation: [
        {
          pattern: /^[0-9]{5,7}$/,
          message: "Please enter a valid DOT number (5-7 digits)",
        },
      ],
    },
    {
      id: "mc_number",
      label: "🔢 What's your **MC number**?",
      highlight: ["MC number"],
      type: "text",
      required: false,
      validation: [
        {
          pattern: /^[0-9]{5,6}$/,
          message: "Please enter a valid MC number (5-6 digits)",
        },
      ],
    },
    {
      id: "dot_mc_number",
      label: "🔢 Have a **DOT/MC number**?",
      highlight: ["DOT/MC number"],
      type: "text",
      required: false,
      validation: [
        {
          pattern: /^(MC|DOT)?[0-9]{5,7}$/i,
          message: "Please enter a valid DOT/MC number (e.g., MC12345 or DOT1234567)",
        },
      ],
    },
    {
      id: "representative_name",
      label: "👤 Who's your **company rep**?",
      highlight: ["company rep"],
      type: "text",
      required: true,
      validation: [
        { minLength: 2, message: "Name must be at least 2 characters" },
        { pattern: /^[a-zA-Z\s-']+$/, message: "Please enter a valid name" },
      ],
    },
    {
      id: "representative_email",
      label: "📧 Your rep’s **email**?",
      highlight: ["email"],
      type: "email",
      required: true,
      validation: [
        {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email address",
        },
      ],
    },
    {
      id: "password",
      label: "🔒 Create a strong **password** for your account",
      highlight: ["password"],
      type: "password",
      required: true,
      validation: [
        {
          minLength: 8,
          message: "Password must be at least 8 characters long",
        },
        {
          pattern:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
      ],
    },
    {
      id: "representative_phone",
      label: "📞 Your rep’s **phone number**?",
      highlight: ["phone number"],
      type: "tel",
      required: true,
      validation: [
        {
          pattern: /^\+?1?\d{10,14}$/,
          message: "Please enter a valid phone number",
        },
      ],
    },
    {
      id: "formation_state",
      label: "🌎 Where was your company **formed**?",
      highlight: ["formed"],
      type: "select",
      options: ["Alabama", "Alaska", "Arizona" /* Add all US states */],
      required: true,
    },
    {
      id: "specific_states",
      label: "🏛️ Where was your company **formed**?", // Changed emoji to be more relevant
      highlight: ["formed"],
      type: "select",
      options: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      required: true,
    },
    {
      id: "best_time_to_call",
      label: "🕒 When's the **best time to call** you?",
      highlight: ["best time to call"],
      type: "datetime-local",
      required: true,
      validation: [
        {
          pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
          message: "Please select a valid date and time",
        },
      ],
    },

    {
      id: "hiring_preferences",
      label: "👥 What are your **hiring preferences**?",
      highlight: ["hiring preferences"],
      type: "multiselect",
      options: ["Full-time", "Part-time", "Contract", "Seasonal"],
      required: true,
    },
  ] as CarrierSignupField[],
};
