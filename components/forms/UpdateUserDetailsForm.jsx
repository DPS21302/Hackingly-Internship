"use client";
import { useState, useEffect } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { baseURL } from "@/utils/BaseURL";
import { useForm, useFieldArray } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { FaTimes } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import {
  Card,
  CardBody,
  Input,
  Checkbox,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";

const UpdateUserDetailsForm = ({ userData }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [disableKey, setDisableKey] = useState(true);
  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [
        { align: [] },
        { align: ["center"] },
        { align: ["right"] },
        { align: ["justify"] },
      ],
      [{ color: [] }, { background: [] }],
      ["clean"],
      ["code-block"],
      ["table"], // Include the table button
    ],
  };

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: "education",
  });
  const { fields: jobFields, append: appendJob, remove: removeJob } = useFieldArray({
    control,
    name: "jobs",
  });
  
  const addEducationField = () => {
    appendEducation({ name: 'education', college: '', degree: '', major: '', start_date: '', still_enrolled: false, end_date: '', country: '', state: '', city: '' });
  };
  const addJobField = () => {
    appendJob({ name: 'job', company: '', job_title: '', start_date: '', currently_working: false, end_date: '', country: '', state: '', city: '' });
  };
  
  const removeEducationField = (index) => {
    removeEducation(index);
  };
  const removeJobField = (index) => {
    removeJob(index);
  };

  const setEducationFieldValues = (educationData) => {
    let length = educationData.length;
    educationData.forEach((eduField, index) => {
      const fieldValues = {
        ...eduField,
      };
      setValue(`education[${index}]`, fieldValues);
    });
    addEducationField();
    removeEducation(length);
  };
  const setJobFieldValues = (jobData) => {
    let length = jobData.length;
    jobData.forEach((jobField, index) => {
      const fieldValues = {
        ...jobField,
      };
      setValue(`jobs[${index}]`, fieldValues);
    });
    addJobField();
    removeJob(length);
  };

  useEffect(()=>{
    if(userData && userData.id){

      setSelectedCountry(userData?.country || "");
      setSelectedState(userData?.state || "");
      setSelectedCity(userData?.city || "");

      setEducationFieldValues(userData.education || []);
      setJobFieldValues(userData.jobs || []);
  
    }
  },[userData]);

  useEffect(() => {
    if(!!selectedCountry){
      setStates(State.getStatesOfCountry(selectedCountry));
    }else{
      setStates([]);
    }
  }, [selectedCountry]);

  // useEffect(() => {
  //   if(!!selectedCountry && !!selectedState){
  //     setCities(City.getCitiesOfState(selectedCountry, selectedState));
  //   }else{
  //     setCities([]);
  //   }
  // }, [selectedState]);

  const onSubmit = async (data) => {
    let updatedData = { ...userData };
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        updatedData[key] = data[key];
      }
    }
    updatedData["country"] = selectedCountry;
    updatedData["state"] = selectedState;
    updatedData["city"] = selectedCity;

    const updatingToast = toast.loading('Updating profile...', {
      duration: 9999, // Set a long duration, you can manually dismiss it
    });

    try {
      const response = await axios.patch(`${baseURL}/profile/`, updatedData, {
        headers: { Authorization: `Bearer ${session?.user?.data?.access}` },
      });

      toast.dismiss(updatingToast);

      if(response.data.code === 200){
        toast.success('Successfully updated profile!', {
          duration: 2500,
        });
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      } else {
        toast.error('Error updating profile');
      }

      return response.data;
    }catch (error) {
  
      toast.dismiss(updatingToast);
      if (axios.isAxiosError(error)) {
        
        const errorMessage = error.message;
        const errorData = error.response?.data;

        if (errorData && errorData.errors) {
          const errorMessages = Object.entries(errorData.errors).map(([field, messages]) => {
            return `\n${field.toUpperCase()}: ${messages.join(', ')}`;
          });
  
          const errorToastMessage = `Error updating profile!!${errorMessages.join('.')}`;
  
          toast.error(errorToastMessage,{
            duration: 4000,
          });
        } else {
          toast.error(`Error updating profile:\n${errorMessage}.`);
        }

      } else {
        // Handle non-Axios errors
        toast.error('Error updating profile');
      }

      throw error;
    }
  };

  return (

    <div className="ml-10 pt-20 layoutBox mr-10">
      <div className="w-full h-[250px]">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/27460615_7338836.svg?alt=media&token=ff8ac921-3566-479d-b192-346cc76a4321"
          className="w-full h-full lg:rounded-2xl object-cover"
        />
      </div>
      <div className="flex lg:flex-row flex-col lg:ml-10 lg:flex-none lg:items-start items-center -mt-20">
        <div className="lg:flex lg:items-center items-center space-x-2">
          <img
            src="https://i.ibb.co/Pj3Z5R3/close-up-cartoon-boy-with-glasses-black-shirt-generative-ai-955884-765.jpg"
            className="w-40 border-4 border-white rounded-full m-auto"
          />          
        </div>
      </div>

      <Card style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CardBody>
          <div className="mt-2">      
            <div>
              <div className="">
                <h1 className="text-xl font-medium mb-4">
                  Update your information here!
                </h1>
              </div>
              <form onSubmit={
                handleSubmit(onSubmit)
                }>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-5">

                  <Input
                    isRequired = {true}
                    key="first_name"
                    type="text"
                    label="First Name"
                    defaultValue={userData?.first_name ? userData.first_name : ""}
                    variant="faded"
                    color="primary"
                    {...register("first_name", { required: true })}
                  />

                  <Input
                    isRequired = {false}
                    key="middle_name"
                    type="text"
                    label="Middle Name"
                    defaultValue={userData?.middle_name ? userData.middle_name : ""}
                    variant="faded"
                    color="primary"
                    {...register("middle_name")}
                  />

                  <Input
                    isRequired = {true}
                    key="last_name"
                    type="text"
                    label="Last Name"
                    defaultValue={userData?.last_name ? userData.last_name:""}
                    variant="faded"
                    color="primary"
                    {...register("last_name", { required: true })}
                  />

                  <label htmlFor="bio" className="text-xl font-medium mt-2 md:col-span-3">
                    Bio
                  </label>

                  <ReactQuill
                    variant="faded"
                    color="primary"
                    id="bio"
                    defaultValue={userData?.bio ? userData.bio : ""}
                    modules={modules}
                    className="col-span-3 md:col-span-3 md:mb-9"
                    {...register("bio", { required: false })}
                  />
                  

                  <label className="text-xl font-medium mt-8 md:col-span-3">
                    Links
                  </label>

                  <Input
                    isRequired = {false}
                    key="website"
                    type="text"
                    label="Website"
                    defaultValue={userData?.website ? userData.website : ""}
                    variant="faded"
                    color="primary"
                    {...register("website")}
                  />
                  <Input
                    isRequired = {false}
                    key="linkedin"
                    type="text"
                    label="Linkedin"
                    defaultValue={userData?.linkedin?userData.linkedin:""}
                    variant="faded"
                    color="primary"
                    {...register("linkedin")}
                  />
                  <Input
                    isRequired = {false}
                    key="github"
                    type="text"
                    label="Github"
                    defaultValue={userData?.github?userData.github:""}
                    variant="faded"
                    color="primary"
                    {...register("github")}
                  />
                  <Input
                    isRequired = {false}
                    key="twitter"
                    type="text"
                    label="Twitter"
                    defaultValue={userData?.twitter?userData.twitter:""}
                    variant="faded"
                    color="primary"
                    {...register("twitter")}
                  />
                  <Input
                    isRequired = {false}
                    key="facebook"
                    type="text"
                    label="Facebook"
                    defaultValue={userData?.facebook?userData.facebook:""}
                    variant="faded"
                    color="primary"
                    {...register("facebook")}
                  />


                  <label className="text-xl font-medium mt-2 md:col-span-3">
                    Personal Details
                  </label>

                  <Input
                    type="date"
                    label="Date Of Birth"
                    defaultValue={userData?.date_of_birth?userData.date_of_birth:""}
                    placeholder="  "
                    variant="faded"
                    color="primary"
                    isRequired={true}
                    {...register("date_of_birth", { required: true })}
                  />
                    
                  <Select
                    id="gender"
                    name="gender"
                    label="Gender"
                    variant="faded"
                    color="primary"
                    defaultSelectedKeys={userData?.gender ? [userData.gender]:[]}
                    isRequired={true}
                    {...register("gender", { required: true })}
                  >
                    <SelectItem key="male" value="male">Male</SelectItem>
                    <SelectItem key="female" value="female">Female</SelectItem>
                    <SelectItem key="others" value="others">Others</SelectItem>
                    <SelectItem key="prefer not to say" value="prefer not to say">Prefer not to say</SelectItem>
         
                  </Select>

                  <Input
                    type="number"
                    label="Phone Number"
                    defaultValue={userData?.phone_number?userData.phone_number:""}
                    placeholder="  "
                    variant="faded"
                    color="primary"
                    isRequired={true}
                    {...register("phone_number", { required: true })}
                  />

                  <Select
                    id="country"
                    name="country"
                    label="Country"
                    variant="faded"
                    color="primary"
                    isRequired={true}
                    selectedKeys={selectedCountry ? [selectedCountry]:[]}
                    {...register("country")}
                    onChange={(e) => {
                      setValue("country", e.target.value);
                      setSelectedCountry(e.target.value);
                      setSelectedState("");
                      setSelectedCity("");
                      setValue("state", "");
                      setValue("city", "");
                    }}
                  >
                    {countries.map((country) => (
                      <SelectItem key={country.isoCode} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="State"
                    variant="faded"
                    color="primary"
                    isRequired
                    selectedKeys={selectedState ? [selectedState]:[]}
                    {...register("state")}
                    onChange={(e) => {
                      setValue("state", e.target.value);
                      setSelectedState(e.target.value);
                      setSelectedCity("");
                      setValue("city", "");
                    }}
                    isDisabled={!selectedCountry}
                  >
                    {states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </Select>

                  {/* <Select
                    label="City"
                    variant="faded"
                    color="primary"
                    isRequired
                    selectedKeys={selectedCity ? [selectedCity]:[]}
                    {...register("city")}
                    onChange={(e) => {
                      setSelectedCity(e.target.value || "");
                      setValue("city", e.target.value || "");
                    }}
                    disabled={!selectedCountry || !selectedState}
                  >
                    {cities.map((city) => (
                      <SelectItem key={city.isoCode} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </Select> */}

                  <Input
                    type="text"
                    variant="faded"
                    color="primary"
                    key="city"
                    label="City"
                    isRequired={true}
                    value={selectedCity}
                    isDisabled={!selectedCountry || !selectedState} 
                    {...register("city")}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      setValue("city", e.target.value);
                    }}
                  />


                  <Input
                    type="number"
                    label="Pin Code"
                    defaultValue={userData?.pin_code?userData.pin_code:""}
                    variant="faded"
                    color="primary"
                    isRequired={true}
                    {...register("pin_code", { required: true })}
                  />

                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-3 mt-5">Education</h2>
                  {educationFields.map((eduField, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md shadow-md">
                       <div className="flex justify-between mt-3 mb-3">
                        <h3 className="text-md font-semibold mb-1 ml-3 md:mr-4">Education #{index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => removeEducationField(index)}
                          color="danger"
                          className="flex items-center justify-center mb-2 mr-3 bg-red-500 text-white rounded-full w-7 h-7 p-1 hover:bg-red-600 transition-all"
                        >
                          <FaTimes size={20}/>
                          
                        </button>
                      </div>
                      <div  className="flex flex-col md:grid md:grid-cols-3 gap-5">
                        <Input
                          type="text"
                          label="School/University"
                          defaultValue={eduField.college}
                          variant="faded"
                          color="primary"
                          isRequired={true}
                          {...register(`education[${index}].college`, { required: true })}
                        />
                        <Input
                          type="text"
                          variant="faded"
                          color="primary"
                          label="Degree"
                          isRequired={true}
                          defaultValue={eduField.degree}
                          {...register(`education[${index}].degree`, { required: true })}
                        />
                        <Input
                          type="text"
                          variant="faded"
                          color="primary"
                          label="Major"
                          isRequired={true}
                          defaultValue={eduField.major}
                          {...register(`education[${index}].major`, { required: true })}
                        />
                        <Input
                          type="date"
                          variant="faded"
                          color="primary"
                          label="Start Date"
                          isRequired={true}
                          defaultValue={eduField.start_date}
                          {...register(`education[${index}].start_date`, { required: true })}
                          placeholder="  "
                        />

                        <Checkbox
                          size="md"
                          isSelected={getValues(`education[${index}].still_enrolled`)}
                          {...register(`education[${index}].still_enrolled`)}
                          onValueChange={(isChecked) => {
                            setValue(`education[${index}].still_enrolled`, isChecked);
                            setDisableKey((prev) => !prev);
                            if (isChecked) {
                              setValue(`education[${index}].end_date`, "");
                            }
                          }}
                        >
                          Still Enrolled?
                        </Checkbox>
                        

                        <Input
                          key={disableKey ? "disabled" : "enabled"}
                          type="date"
                          variant="faded"
                          color="primary"
                          label="End Date"
                          isDisabled={getValues(`education[${index}].still_enrolled`)}
                          isRequired={false}
                          defaultValue={eduField.end_date}
                          {...register(`education[${index}].end_date`)}
                          placeholder="  "
                        />
                        

                        <Input
                          type="text"
                          variant="faded"
                          color="primary"
                          label="Country"
                          isRequired={true}
                          defaultValue={eduField.country}
                          {...register(`education[${index}].country`, { required: true })}
                        />
                        <Input
                          type="text"
                          variant="faded"
                          color="primary"
                          label="State"
                          isRequired={true}
                          defaultValue={eduField.state}
                          {...register(`education[${index}].state`, { required: true })}
                        />
                        <Input
                          type="text"
                          variant="faded"
                          color="primary"
                          label="City"
                          isRequired={true}
                          defaultValue={eduField.city}
                          {...register(`education[${index}].city`, { required: true })}
                        />
                        
                      </div>
                    </div>
                  ))}
                  <Button className="my-5" type="button" onClick={addEducationField}>
                    Add Education
                  </Button>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-3 mt-5">Job Details</h2>
                  {jobFields.map((jobField, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md shadow-md" >
                       <div className="flex justify-between mt-3 mb-3">
                        <h3 className="text-md font-semibold mb-1 ml-3 md:mr-4">Job #{index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => removeJobField(index)}
                          className="flex items-center justify-center mb-2 mr-3 bg-red-500 text-white rounded-full w-7 h-7 p-1 hover:bg-red-600 transition-all"
                          
                        >
                          <FaTimes size={20} />
                        </button>
                      </div>
                      <div  className="flex flex-col md:grid md:grid-cols-3 gap-5">
                        <Input
                          type="text"
                          label="Company Name"
                          defaultValue={jobField.company}
                          variant="faded"
                          color="primary"
                          isRequired={true}
                          {...register(`jobs[${index}].company`, { required: true })}
                        />
                        <Input
                          type="text"
                          variant="faded"
                          color="primary"
                          label="Title"
                          isRequired={true}
                          defaultValue={jobField.job_title}
                          {...register(`jobs[${index}].job_title`, { required: true })}
                        />
                        
                        <Input
                          type="date"
                          label="Start Date"
                          defaultValue={jobField.start_date}
                          placeholder="  "
                          variant="faded"
                          color="primary"
                          isRequired={true}
                          {...register(`jobs[${index}].start_date`, { required: true })}
                        />         

                        <Checkbox
                          size="md"
                          isSelected={getValues(`jobs[${index}].currently_working`)}
                          {...register(`jobs[${index}].currently_working`)}
                          onValueChange={(isChecked) => {
                            setValue(`jobs[${index}].currently_working`, isChecked);
                            setDisableKey((prev) => !prev);
                            if (isChecked) {
                              setValue(`jobs[${index}].end_date`, "");
                            }
                          }}
                        >
                          currently working?
                        </Checkbox>

                        <Input
                          key={disableKey ? "disabled" : "enabled"}
                          type="date"
                          variant="faded"
                          color="primary"
                          label="End Date"
                          isRequired={false}
                          isDisabled={getValues(`jobs[${index}].currently_working`)}
                          defaultValue={jobField.end_date}
                          {...register(`jobs[${index}].end_date`)}
                          placeholder="  "
                        />
                        
                        <Input
                          type="text"
                          variant="faded"
                          color="primary"
                          label="Country"
                          isRequired={true}
                          defaultValue={jobField.country}
                          {...register(`jobs[${index}].country`, { required: true })}
                        />
                        <Input
                          type="text"
                          variant="faded"
                          color="primary"
                          label="State"
                          isRequired={true}
                          defaultValue={jobField.state}
                          {...register(`jobs[${index}].state`, { required: true })}
                        />
                        <Input
                          type="text"
                          variant="faded"
                          color="primary"
                          label="City"
                          isRequired={true}
                          defaultValue={jobField.city}
                          {...register(`jobs[${index}].city`, { required: true })}
                        />
                        
                      </div>
                    </div>
                  ))}
                  <Button className="my-5" type="button" onClick={addJobField}>
                    Add Job
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center md:flex-row md:items-center md:space-x-3">

                  <Button
                    className="my-5"
                    type="submit"
                    color="primary"
                    variant="solid"
                    >
                    Update Profile
                  </Button>

                  <Button
                    className="my-5"
                    type="button"
                    color="danger"
                    variant="solid"
                    onClick={() => router.push("/profile")}
                    >
                    Cancel
                  </Button>

                </div>
              </form>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateUserDetailsForm;