import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { departmentOptions } from "@/@/utils/constant";
import { fetchRolesByOrgId } from "@/@/redux/slices/roleSlice";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";

const AddUserTable = ({ organizationId }: { organizationId: string }) => {
  const dispatch = useAppDispatch();
  const { control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "employees",
  });
  const { orgRoleList } = useAppSelector((state) => state.role);

  useEffect(() => {
    if (organizationId) {
      dispatch(fetchRolesByOrgId(organizationId));
    }
  }, [organizationId]);

  // Ensure at least one default row
  React.useEffect(() => {
    if (fields.length === 0) {
      append({
        index: 1,
        first_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        designation: "",
        department: "",
        role_id: "",
        // role_id: "9e715179-d35e-43b5-8c40-50f905357645",
      });
    }
  }, [fields, append]);

  const handleAddRow = () => {
    append({
      index: fields.length + 1,
      first_name: "",
      last_name: "",
      email: "",
      contact_number: "",
      designation: "",
      department: "",
      role_id: "",
      // role_id: "9e715179-d35e-43b5-8c40-50f905357645",
    });
  };

  const handleDeleteRow = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <>
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
              <th>Department</th>
              <th>Role</th>
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
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td>{index + 1}</td>
                <td style={{ display: "none" }}>
                  <Controller
                    name={`employees.${index}.index`}
                    control={control}
                    render={({ field: {} }) => (
                      <input
                        type="hidden"
                        name={`employees.${index}.index`}
                        value={index + 1}
                      />
                    )}
                  />
                </td>
                <td>
                  <div className="text_filed text_filed_dropdown">
                    <Controller
                      name={`employees.${index}.first_name`}
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
                                `employees.${index}.first_name`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
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
                      name={`employees.${index}.last_name`}
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
                                `employees.${index}.last_name`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
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
                      name={`employees.${index}.email`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextBoxComponent
                            placeholder="Email *"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            value={field.value}
                            onChange={(e: any) =>
                              setValue(`employees.${index}.email`, e.value, {
                                shouldValidate: true,
                              })
                            }
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
                      name={`employees.${index}.contact_number`}
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
                                `employees.${index}.contact_number`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
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
                      name={`employees.${index}.designation`}
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
                                `employees.${index}.designation`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
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
                  <div className="dropdown_common">
                    <Controller
                      name={`employees.${index}.department`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <DropDownListComponent
                            placeholder="Department *"
                            dataSource={departmentOptions || []}
                            fields={{
                              text: "label",
                              value: "value",
                            }}
                            popupHeight="220px"
                            className="dropdown_filed"
                            cssClass="e-outline"
                            value={field.value}
                            onChange={(e: any) =>
                              setValue(
                                `employees.${index}.department`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
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
                  <div className="dropdown_common">
                    <Controller
                      name={`employees.${index}.role_id`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <DropDownListComponent
                            placeholder="Role *"
                            dataSource={orgRoleList || []}
                            fields={{
                              text: "role_name",
                              value: "role_id",
                            }}
                            popupHeight="220px"
                            className="dropdown_filed"
                            cssClass="e-outline"
                            value={field.value}
                            disabled={!organizationId}
                            onChange={(e: any) =>
                              setValue(`employees.${index}.role_id`, e.value, {
                                shouldValidate: true,
                              })
                            }
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
