import React, { useEffect } from "react";
import { Row, Table } from "react-bootstrap";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import {
  // AutoCompleteComponent,
  MultiSelectComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { fetchContacts } from "@/@/redux/slices/contactSlice";

const AddUserTable = () => {
  const { control, setValue, getValues } = useFormContext();
  const dispatch = useAppDispatch();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "contacts",
  });
  const { companyContacts } = useAppSelector((state) => state.company);
  // const [selectedLead, setSelectedLead] = useState<any>(null);
  const { contactList } = useAppSelector((state) => state.contact);
  // Ensure at least one default row
  React.useEffect(() => {
    if (fields.length === 0) {
      append({
        // index: 1,
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        position: "",
      });
    }
  }, [fields, append]);

  useEffect(() => {
    dispatch(fetchContacts({ search: "" }));
  }, []);

  const handleAddRow = () => {
    append({
      // index: fields.length + 1,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      position: "",
    });
  };

  const processedContacts =
    (contactList &&
      contactList?.data?.map((item: any) => ({
        ...item,
        contact: {
          ...item.contact,
          full_name: `${item.contact.first_name} ${item.contact.last_name}`,
        },
      }))) ||
    [];

  useEffect(() => {
    if (companyContacts && companyContacts?.data?.length > 0) {
      const defaultSelectedIds = companyContacts?.data?.map(
        (c: any) => c?.contact?.contact_id
      );
      setValue("selected_contacts", defaultSelectedIds, {
        shouldValidate: true,
      });
    }
  }, [companyContacts, setValue]);

  // const handleChange = (event: any) => {
  //   const value = event.target.value;
  //   if (!value) {
  //     setSelectedLead(null);
  //   }
  // };

  // const handleDeleteRow = (index: number) => {
  //   if (fields.length > 1) {
  //     remove(index);
  //   }
  // };
  const handleDeleteRow = (index: number) => {
    if (fields.length > 1) {
      const deletedContactId = fields[index]?.contact_id;
      remove(index);

      if (deletedContactId) {
        // Remove the contact ID from selected_contacts
        const currentSelectedContacts = getValues("selected_contacts") || [];
        const updatedSelectedContacts = currentSelectedContacts.filter(
          (id: string) => id !== deletedContactId
        );
        setValue("selected_contacts", updatedSelectedContacts, {
          shouldValidate: true,
        });
      }
    }
    // const contactToDelete = fields[index];

    // if (contactToDelete) {
    //   console.log("contactToDelete", contactToDelete);
    //   console.log("getValues contacts", getValues("contacts"));
    //   // Update the specific contact with isDeleted: true
    //   const updatedContacts = getValues("contacts").map((contact, i) =>
    //     i === index ? { ...contact, isDeleted: true } : contact
    //   );
    //   console.log("updatedContacts", updatedContacts);
    //   setValue("contacts", updatedContacts, { shouldValidate: true });

    //   // Remove the contact ID from selected_contacts
    //   const currentSelectedContacts = getValues("selected_contacts") || [];
    //   const updatedSelectedContacts = currentSelectedContacts.filter(
    //     (id: string) => id !== contactToDelete.contact_id
    //   );

    //   setValue("selected_contacts", updatedSelectedContacts, {
    //     shouldValidate: true,
    //   });
    // }
  };

  return (
    <>
      <div className="multi_select_common text_filed_dropdown">
        <Controller
          name="selected_contacts"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <MultiSelectComponent
                id="mtselement"
                cssClass="e-outline"
                dataSource={processedContacts}
                fields={{
                  text: "contact.full_name",
                  value: "contact.contact_id",
                }}
                placeholder="Search & Select Contacts"
                showDropDownIcon={true}
                allowFiltering={true}
                value={field.value || []}
                onChange={(e: any) => {
                  const selectedValues = e.value || [];
                  setValue("selected_contacts", selectedValues, {
                    shouldValidate: true,
                  });

                  if (selectedValues.length === 0) {
                    remove();
                    return;
                  }

                  selectedValues.forEach((contactId: string) => {
                    const existing = fields.find(
                      (f: any) => f.contact_id === contactId
                    );
                    if (!existing) {
                      const selectedContact = processedContacts.find(
                        (c: any) => c.contact.contact_id === contactId
                      );
                      if (selectedContact) {
                        // Find the first blank row
                        const blankRowIndex = fields.findIndex(
                          (f: any) => !f.contact_id && !f.first_name && !f.email
                        );
                        // console.log("blankRowIndex ::::", blankRowIndex);
                        if (blankRowIndex !== -1) {
                          // Update the blank row
                          update(blankRowIndex, {
                            // index: blankRowIndex + 1,
                            first_name:
                              selectedContact.contact?.first_name || "",
                            last_name: selectedContact.contact?.last_name || "",
                            email: selectedContact.emails[0]?.email || "",
                            phone_number:
                              selectedContact.phones[0]?.phone_number || "",
                            position:
                              selectedContact?.companies[0]?.position || "",
                            contact_id: contactId,
                          });
                        } else {
                          // Append a new row if no blank rows are found
                          append({
                            // index: fields.length + 1,
                            first_name:
                              selectedContact.contact?.first_name || "",
                            last_name: selectedContact.contact?.last_name || "",
                            email: selectedContact.emails[0]?.email || "",
                            phone_number:
                              selectedContact.phones[0]?.phone_number || "",
                            position:
                              selectedContact?.companies[0]?.position || "",
                            contact_id: contactId,
                          });
                        }
                      }
                    }
                  });

                  fields.forEach((field: any, index) => {
                    if (
                      field?.contact_id &&
                      !selectedValues.includes(field?.contact_id)
                    ) {
                      remove(index);
                    }
                  });
                }}
                itemTemplate={(item: any, index: number) => (
                  <Row
                    onClick={() => {
                      setValue("selected_contacts", [
                        ...(getValues("selected_contacts") || []),
                        item.contact.contact_id,
                      ]);
                    }}
                    key={index}
                    className="autocomplete-item"
                  >
                    <div className="lead_common_text">
                      {`${item.contact.first_name} ${item.contact.last_name}`}
                    </div>
                    <div className="lead_common_text">
                      {item?.emails[0]?.email}
                    </div>
                    <div
                      className="lead_common_text lead_phone"
                      style={{
                        borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
                        paddingBottom: "5px",
                      }}
                    >
                      {item?.phones[0]?.phone_number}
                    </div>
                  </Row>
                )}
              />
              {error && <p className="error-text">{error.message}</p>}
            </>
          )}
        />
      </div>
      <div className="add_product_or_service_table_main_div">
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="product_or_service_action_icon ms-2"
                    onClick={handleAddRow}
                  >
                    <Icon icon="ic:sharp-add" width="16" height="16" />
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {fields
              ?.filter((field) => !field.isDeleted)
              ?.map((fieldValue, index) => (
                <tr key={fieldValue.id}>
                  <td>{index + 1}</td>
                  {/* <td style={{ display: "none" }}>
                  <Controller
                    name={`contacts.${index}.index`}
                    control={control}
                    render={({ field: {} }) => (
                      <input
                        type="hidden"
                        name={`contacts.${index}.index`}
                        value={index + 1}
                      />
                    )}
                  />
                </td> */}
                  <td>
                    <div className="text_filed text_filed_dropdown">
                      <Controller
                        name={`contacts.${index}.first_name`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="First Name *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue(
                                  `contacts.${index}.first_name`,
                                  e.value,
                                  {
                                    shouldValidate: true,
                                  }
                                )
                              }
                              disabled={fieldValue?.contact_id ? true : false}
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="text_filed text_filed_dropdown">
                      <Controller
                        name={`contacts.${index}.last_name`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Last Name *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue(
                                  `contacts.${index}.last_name`,
                                  e.value,
                                  {
                                    shouldValidate: true,
                                  }
                                )
                              }
                              disabled={fieldValue?.contact_id ? true : false}
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="text_filed text_filed_dropdown">
                      <Controller
                        name={`contacts.${index}.email`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Email *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue(`contacts.${index}.email`, e.value, {
                                  shouldValidate: true,
                                })
                              }
                              disabled={fieldValue?.contact_id ? true : false}
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="text_filed text_filed_dropdown">
                      <Controller
                        name={`contacts.${index}.phone_number`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Phone Number *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue(
                                  `contacts.${index}.phone_number`,
                                  e.value,
                                  {
                                    shouldValidate: true,
                                  }
                                )
                              }
                              disabled={fieldValue?.contact_id ? true : false}
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="text_filed text_filed_dropdown">
                      <Controller
                        name={`contacts.${index}.position`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Position *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue(
                                  `contacts.${index}.position`,
                                  e.value,
                                  {
                                    shouldValidate: true,
                                  }
                                )
                              }
                              disabled={fieldValue?.contact_id ? true : false}
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </td>
                  <td>
                    {/* {index === 0 ? (
                    <button
                      type="button"
                      className="product_or_service_action_icon"
                      onClick={handleAddRow}
                    >
                      <Icon icon="ic:sharp-add" width="16" height="16" />
                    </button>
                  ) : ( */}
                    {fields.length > 1 && (
                      <button
                        type="button"
                        className="product_or_service_delete_icon"
                        onClick={() => handleDeleteRow(index)}
                      >
                        <Icon
                          icon="mingcute:delete-2-fill"
                          width="16"
                          height="16"
                        />
                      </button>
                    )}
                    {/* )} */}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AddUserTable;
