import * as Yup from "yup";

// Validation Schema
export const CreateOpportunitySchema = Yup.object().shape({
  eventName: Yup.string().required("Event name is required"),
  eventDescription: Yup.string()
    .max(60, "Description cannot be more than 60 characters")
    .required("Event description is required"),
  eventMode: Yup.string()
    .oneOf(["ONLINE", "OFFLINE"], "Invalid event mode")
    .required("Event mode is required"),
  eventType: Yup.string().required("You must select the event type"),
  eventVenue: Yup.string().when("eventMode", {
    is: "ONLINE",
    then: () => Yup.string().default("REMOTE").notRequired(),
    otherwise: () =>
      Yup.string().required("Event venue is required for offline events"),
  }),
  // startDate: Yup.date()
  //   .required("Start date is required")
  //   .min(new Date(), "Start date cannot be in the past"),
  // endDate: Yup.date()
  //   .required("End date is required")
  //   .min(Yup.ref("startDate"), "End date cannot be before start date"),
  // registrationDeadline: Yup.date()
  //   .required("Registration deadline is required")
  //   .max(
  //     Yup.ref("startDate"),
  //     "Registration deadline should be on or before start date"
  //   ),
  // eventParticipationType: Yup.string()
  //   .oneOf(["INDIVIDUAL", "TEAM"], "Invalid participation type")
  //   .required("Participation type is required"),
  // teamSize: Yup.number().when("eventParticipationType", {
  //   is: "INDIVIDUAL",
  //   then: () => Yup.number().default(1).notRequired(),
  //   otherwise: Yup.number()
  //     .required("Team size is required for team participation")
  //     .min(1, "Team size must be at least 1"),
  // }),
  // isPaid: Yup.boolean(),
  // eventFees: Yup.number().when("isPaid", {
  //   is: true,
  //   then: () =>
  //     Yup.number()
  //       .required("Event fees are required for paid events")
  //       .min(0, "Event fees cannot be negative"),
  //   otherwise: Yup.number().notRequired().default(0),
  // }),
});

export const EditOrgFieldSchema = Yup.object().shape({
  orgName: Yup.string(),
  orgDescription: Yup.string(),
  orgContactDetails: Yup.string(),
});

export const OpportunityHomeSchema = Yup.object().shape({
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  pincode: Yup.number().required("Pincode is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  phoneNumber: Yup.number().required("Phone Number is required"),
  eduName: Yup.string().required("Education is required"),
  eduStartYear: Yup.date().required("Start date is required"),
  eduEndYear: Yup.date()
    .nullable()
    .transform((value, originalValue) => {
      // If the input is an empty string, return `null` to indicate the absence of a value
      return originalValue === "" ? null : new Date(originalValue);
    }),
  eduDescription: Yup.string(),
  eduCity: Yup.string(),
  eduState: Yup.string(),
  eduCountry: Yup.string(),
  eduDegree: Yup.string(),
  eduField: Yup.string(),
  eduYear: Yup.number(),
  eduIsPursuing: Yup.boolean(),
  gender: Yup.string().oneOf(["MALE", "FEMALE", "PREFER_NOT_TO_SAY", "OTHERS"]),
});

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("first name is required"),
  lastName: Yup.string().required("last name is required"),
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username should be at least 6 characters")
    .max(20, "Username should not exceed 20 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Username should not exceed 64 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string("Password is required")
    .min(6, "Password must be atleast 6 characters")
    .max(64, "Username should not exceed 64 characters"),
});

export const OTPSchema = Yup.object().shape({
  otp: Yup.number().required("OTP is required"),
});
