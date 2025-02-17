export interface Question {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  options?: { value: string; label: string }[];
  conditional?: (formData: FormData) => boolean;
}

export interface FormData {
  [key: string]: string;
}

export const questions: Question[] = [
  { id: "first_name", label: "What's your first name?", type: "text", placeholder: "John" },
  { id: "first_name", label: "What's your first name?", type: "text", placeholder: "John" },
  { id: "last_name", label: "And your last name?", type: "text", placeholder: "Doe" },
  { id: "email", label: "What's your email address?", type: "email", placeholder: "johndoe@example.com" },
  { id: "password", label: "Create a password", type: "password", placeholder: "Enter a strong password" },
  { id: "birthday", label: "When's your birthday?", type: "date", placeholder: "YYYY-MM-DD" },
  {
    id: "vehicle_type",
    label: "What type of vehicle do you drive?",
    type: "select",
    placeholder: "Select vehicle type",
    options: [
      { value: "owner-operator", label: "Owner Operator" },
      { value: "delivery-courier", label: "Delivery Courier" },
    ],
  },
  { id: "vehicle_year", label: "What year is your vehicle?", type: "number", placeholder: "2023" },
  { id: "vehicle_make", label: "What's the make of your vehicle?", type: "text", placeholder: "Toyota" },
  { id: "vehicle_model", label: "And the model?", type: "text", placeholder: "Corolla" },
  { id: "dot", label: "What's your DOT number? (Optional)", type: "text", placeholder: "12345678" },
  { id: "mc", label: "What's your MC number? (Optional)", type: "text", placeholder: "MC123456" },
  {
    id: "experience",
    label: "How many years of professional driving experience do you have?",
    type: "number",
    placeholder: "5",
  },
  {
    id: "accidents",
    label: "How many at-fault accidents have you had in the past 5 years?",
    type: "select",
    placeholder: "Select number of accidents",
    options: [0, 1, 2, 3, 4, 5].map((i) => ({ value: i.toString(), label: i.toString() })),
  },
  { id: "zip_code", label: "What's your zip code?", type: "text", placeholder: "12345" },
  {
    id: "recent_felony",
    label: "Have you had any misdemeanors or felonies in the past 3 years?",
    type: "select",
    placeholder: "Select an option",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "recent_felony_details",
    label: "If yes, please describe the misdemeanor or felony",
    type: "text",
    placeholder: "Provide details here",
    conditional: (formData: FormData) => formData.recent_felony === "yes",
  },
  {
    id: "past_felony",
    label: "Have you had any misdemeanors or felonies in the past 7 years?",
    type: "select",
    placeholder: "Select an option",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "past_felony_details",
    label: "If yes, please describe the misdemeanor or felony",
    type: "text",
    placeholder: "Provide details here",
    conditional: (formData: FormData) => formData.past_felony === "yes",
  },
  {
    id: "speeding_tickets",
    label: "How many speeding tickets have you had in the past 5 years?",
    type: "select",
    placeholder: "Select number of tickets",
    options: [0, 1, 2, 3, 4, "5+"].map((i) => ({ value: i.toString(), label: i.toString() })),
  },
  {
    id: "dui",
    label: "Have you had any DUIs or trafficking offenses?",
    type: "select",
    placeholder: "Select an option",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "availability",
    label: "How soon are you looking for a delivery opportunity?",
    type: "select",
    placeholder: "Select availability",
    options: [
      { value: "asap", label: "ASAP" },
      { value: "two_weeks", label: "Two weeks" },
      { value: "month", label: "Month" },
      { value: "exploring", label: "Exploring Options" },
    ],
  },
];
