interface ProductOrServiceDetails {
  product_category?: string;
  product?: string;
  details?: string;
  unit?: string;
  quantity?: string | number;
  rate?: string | number;
  tax?: string | number;
  amount?: string | number;
}

export interface LeadType {
  first_name: string;
  last_name: string;
  company_name?: string;
  position?: string;
  phone_number?: string;
  email?: string;
  website?: string;
  budget?: string;
  gst_number?: string;
  is_converted?: boolean;
  address_name?: string;
  address_line_1?: string;
  city_id?: string;
  pincode?: string;
  country_id?: string;
  state_id?: string;
  sr_number?: string;
  create_date?: any;
  receive_date?: any;
  last_contact_date?: any;
  assignedTo?: string;
  lead_source?: string;
  priority?: string;
  tag_ids?: string[];
  details?: string;
  files?: any;
  product_or_service_details?: ProductOrServiceDetails[];
}

// const defaultValues = {
//   first_name: "John",
//   last_name: "Doe",
//   company_name: "Example Corp",
//   position: "Manager",
//   phone_number: "1234567890", // Updated field name
//   email: "john.doe@example.com",
//   website: "www.example.com",
//   budget: "10000",
//   gst_number: "GST123456",
//   is_converted: true,
//   status_id: "770e8400-e29b-41d4-a716-446655440001",
//   address_type: "Billing",
//   address_name: "123",
//   address_line_1: "Downtown",
//   landmark: "landmark",
//   city_id: "a60e8400-e29b-41d4-a716-446655440001",
//   country_id: "550e8400-e29b-41d4-a716-446655440001",
//   state_id: "990e8400-e29b-41d4-a716-446655440001",
//   pincode: "10001",
//   sr_number: "165165",
//   create_date: new Date(),
//   receive_date: new Date(),
//   last_contact_date: new Date(),
//   lead_source: "",
//   priority: "",
//   // tag_ids: ["bug", "follow up"],
//   assignedTo: "John Doe",
//   details: "Looking for a cloud-based CRM solution for our sales team.",
//   // files: [],
//   // product_or_service_details: [
//   //   {
//   //     product_category: "",
//   //     product: "",
//   //     details: "",
//   //     unit: "",
//   //     quantity: "",
//   //     rate: "",
//   //     tax: "",
//   //     amount: "",
//   //   },
//   // ],
// };
