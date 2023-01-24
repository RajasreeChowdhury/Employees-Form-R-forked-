import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { EmployeeInput, EmployeeUpdateInput } from "./api/employees";

interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
}
interface Dependant {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}
interface Values {
  firstName: string;
  lastName: string;
  bloodGroup: string;
  sex: string;
  maritalStatus: Array<string>;
  dateOfBirth: string;
  children: number;
  currentAddress: Address;
  permanentAddress?: Address;
  dependants: Dependant[];
}
interface EmployeeFormProps {
  onSubmit: (employee: EmployeeInput | EmployeeUpdateInput) => void;
  employee?: EmployeeInput;
}
const addressSchema=Yup.object().shape({
  addressLine1: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
})
const childrenValidation = Yup.number().when("maritalStatus", {
  is: (values: string[]) => values[0] === "Married",
  then: (schema) => schema.required("Required"),
});
const permanentAddressValidation = addressSchema.when("sameAsCurrentAddress", {
  is: true,
  then: (schema) => Yup.object().optional(), 
});
const dependantSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  dateOfBirth: Yup.date().required("Required"),
});
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  dateOfBirth: Yup.date().required("Required"),
  sex: Yup.string().required("Required"),
  bloodGroup: Yup.string().required("Required"),
  maritalStatus: Yup.array(),
  children: childrenValidation,
  currentAddress: addressSchema,
  sameAsCurrentAddress: Yup.boolean(),
  permanentAddress: permanentAddressValidation,
  dependants: Yup.array().of(dependantSchema),
});

const InputField = ({ label, name, type }) => (
  <div>
    <label>{label}</label>
    <Field type={type} name={name} id={name} />
    <ErrorMessage name={name} component="span" />
  </div>
);
const RadioGroupField = ({ label, name, options }) => (
  <div>
    <label>{label}:</label>
    {options.map((option) => (
      <label key={option}>
        <Field type="radio" name={name} value={option} />
        {option}
      </label>
    ))}
    <ErrorMessage name={name} component="span" />
  </div>
);
const SelectField = ({ label, name, options }) => (
  <div>
    <label>{label}</label>
    <Field as="select" name={name} id={name}>
      <option value="">Select</option>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </Field>
    <ErrorMessage name={name} component="span" />
  </div>
);
const CheckboxField = ({ label, name, value }) => (
  <div>
    <label>
      <Field type="checkbox" name={name} value={value} />
      {label}
    </label>
    <ErrorMessage name={name} component="span" />
  </div>
);
const AddressField = ({ legend, addressType }) => (
  <fieldset>
    <legend>{legend}</legend>
    <InputField label="Address Line 1" name={[addressType, 'addressLine1']} type="text" />
    <InputField label="Address Line 2" name={[addressType, 'addressLine2']} type="text" />
    <InputField label="City" name={[addressType, 'city']} type="text" />
    <InputField label="State" name={[addressType, 'state']} type="text" />
    <InputField label="Zip" name={[addressType, 'zip']} type="text" />
  </fieldset>
);
const DependantField = ({ index,remove}) => (
  <div key={index}>
    <fieldset>
      <legend>Dependant {index + 1}</legend>
      <InputField label="First Name" name={`dependants.${index}.firstName`} type="text" />
      <InputField label="Last Name" name={`dependants.${index}.lastName`} type="text" />
      <InputField label="Date of Birth" name={`dependants.${index}.dateOfBirth`} type="date" />
    </fieldset>
    <button type="button" onClick={() => remove(index)}>
      Remove
    </button>
  </div>
);

export default function EmployeeForm({
  onSubmit,
  employee,
}: EmployeeFormProps) {
  const initialValues = employee || {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sex: "",
    bloodGroup: "",
    maritalStatus: [],
    children: 0,
    currentAddress: {
      addressLine1: "",
      city: "",
      state: "",
      zip: "",
    },
    permanentAddress: {
      addressLine1: "",
      city: "",
      state: "",
      zip: "",
    },
    sameAsCurrentAddress: false,
    dependants: [],
  };
  const handleSubmit = (values: Values) => {
    if (values.maritalStatus.length === 0) {
        values.maritalStatus = ["Single"];
    }
    if(values.sameAsCurrentAddress) {
      values.permanentAddress = values.currentAddress;
  }
    onSubmit(values);
};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <InputField label="First Name" name="firstName" type="text"  />
          <InputField label="Last Name" name="lastName" type="text" />
          <InputField label="Date of Birth" name="dateOfBirth" type="date" />
       <RadioGroupField
          label="Sex"
          name="sex"
          options={["Male", "Female", "Others"]}
         />
       <SelectField
            label="Blood Group"
            name="bloodGroup"
            options={[
              'A+',
              'A-',
              'B+',
              'B-',
              'O+',
              'O-',
              'AB+',
              'AB-',
            ]}
          />
      <CheckboxField
            label="Marital Status"
            name="maritalStatus"
            value="Married"
          />
          <InputField
            label="Children"
            name="children"
            type="number"
            min="0"
          />
      <AddressField legend="Current Address" addressType={['currentAddress']} />
          <div>
            <Field
             type="checkbox"
             name={['sameAsCurrentAddress']}
             id="sameAsCurrentAddress"
            />
            <label htmlFor="sameAsCurrentAddress">
              Same as Current Address
            </label>
          </div>
          {!values.sameAsCurrentAddress && (
          <AddressField legend="Permanent Address" addressType={['permanentAddress']} />
          )}
     <FieldArray name="dependants">
        {({push, remove}) => (
          <div>
             <label>Dependants:</label>
             {values.dependants.map((_, index) =>(
              <DependantField key={index} index={index} remove={remove} />
          ))}
         <button
           type="button"
           onClick={() =>
            push({ firstName: '', lastName: '', dateOfBirth: '' })
            }
         >
           ➕ Add Dependant
        </button>
     </div>
  )}
</FieldArray>
<button type="submit">Submit</button>
 </Form>
  )}
  </Formik>
  );
}