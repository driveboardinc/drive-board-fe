export interface Question {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  conditional?: (formData: FormData) => boolean;
}

export interface FormData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: string | any;
}

export const questions: Question[] = [
  {
    id: "driver_type",
    label: "What type of driver are you?",
    type: "button-select",
    required: true,
    options: [
      { value: "transport_company", label: "Transport Company" },
      { value: "carrier", label: "Carrier" },
      { value: "job_seeker", label: "Owner Operator" },
    ],
  },
  { id: "first_name", label: "What's your first name?", type: "text", placeholder: "John", required: true },
  { id: "last_name", label: "And your last name?", type: "text", placeholder: "Doe", required: true },
  {
    id: "email",
    label: "What's your email address?",
    type: "email",
    placeholder: "johndoe@example.com",
    required: true,
  },
  {
    id: "password",
    label: "Create a password",
    type: "password",
    placeholder: "Enter a strong password",
    required: true,
  },
  { id: "birthday", label: "When's your birthday?", type: "date", placeholder: "YYYY-MM-DD", required: true },
  {
    id: "zip_code",
    label: "What's your zip code?",
    type: "location",
    placeholder: "Enter your zip code",
    required: true,
  },

  {
    id: "vehicle_type",
    label: "What type of vehicle do you drive?",
    type: "button-select",
    required: true,
    options: [
      { value: "semi_truck", label: "Semi Truck" },
      { value: "box_truck", label: "Box Truck" },
      { value: "cargo_van", label: "Cargo Van" },
      { value: "suv_sedan", label: "SUV/Sedan" },
    ],
    conditional: (formData: FormData) =>
      formData.driver_type === "owner_operator" || formData.driver_type === "delivery_courier",
  },
  {
    id: "vehicle_year",
    label: "What year is your vehicle?",
    type: "number",
    placeholder: "2023",
    required: true,
    conditional: (formData: FormData) =>
      formData.driver_type === "owner_operator" || formData.driver_type === "delivery_courier",
  },
  {
    id: "vehicle_make",
    label: "What's the make of your vehicle?",
    type: "text",
    placeholder: "Toyota",
    required: true,
    conditional: (formData: FormData) =>
      formData.driver_type === "owner_operator" || formData.driver_type === "delivery_courier",
  },
  {
    id: "vehicle_model",
    label: "And the model?",
    type: "text",
    placeholder: "Corolla",
    required: true,
    conditional: (formData: FormData) =>
      formData.driver_type === "owner_operator" || formData.driver_type === "delivery_courier",
  },
  {
    id: "dot",
    label: "What's your DOT number? (Optional)",
    type: "text",
    placeholder: "12345678",
    conditional: (formData: FormData) => formData.driver_type === "owner_operator",
  },
  {
    id: "mc",
    label: "What's your MC number? (Optional)",
    type: "text",
    placeholder: "MC123456",
    conditional: (formData: FormData) => formData.driver_type === "owner_operator",
  },
  {
    id: "experience",
    label: "How many years of professional driving experience do you have?",
    type: "button-select",
    required: true,
    options: [
      { value: "0-2", label: "0-2 years" },
      { value: "3-5", label: "3-5 years" },
      { value: "5-10", label: "5-10 years" },
      { value: "10+", label: "10+ years" },
    ],
  },
  {
    id: "accidents",
    label: "How many at-fault accidents have you had in the past 5 years?",
    type: "button-select",
    required: true,
    options: [
      { value: "0", label: "None" },
      { value: "1-2", label: "1-2" },
      { value: "3+", label: "3+" },
    ],
  },
  {
    id: "misdemeanors_3years",
    label: "Have you had any misdemeanors in the past 3 years?",
    type: "button-select",
    required: true,
    options: [
      { value: "none", label: "None" },
      { value: "1-2", label: "1-2" },
      { value: "3+", label: "3+" },
    ],
  },
  {
    id: "misdemeanors_7years",
    label: "Have you had any misdemeanors in the past 7 years?",
    type: "button-select",
    required: true,
    options: [
      { value: "none", label: "None" },
      { value: "1-2", label: "1-2" },
      { value: "3+", label: "3+" },
    ],
  },
  {
    id: "speeding_tickets",
    label: "How many speeding tickets have you had in the past 5 years?",
    type: "button-select",
    required: true,
    options: [
      { value: "0", label: "None" },
      { value: "1", label: "1 Ticket" },
      { value: "3+", label: "3+" },
    ],
  },
  {
    id: "dui",
    label: "Have you had any DUIs or trafficking offenses?",
    type: "button-select",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "availability",
    label: "How soon are you looking for a delivery opportunity?",
    type: "button-select",
    required: true,
    options: [
      { value: "asap", label: "ASAP" },
      { value: "two_weeks", label: "Two weeks" },
      { value: "month", label: "Month" },
      { value: "exploring", label: "Exploring Options" },
    ],
  },
];
