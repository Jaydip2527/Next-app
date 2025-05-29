"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import LeadProfile from "@/@/component/lead/profile";
import "../../../../Tab.scss";
import LeadsTask from "@/@/component/lead/task";
import FollowUpNotes from "@/@/component/lead/follow-up-notes";
import RemindersPage from "@/@/component/lead/reminders";
import "./lead-profile.scss";
import {
  getNameInitials,
  getRandomColor,
  priorityColors,
} from "@/@/utils/common";
import {
  getAllLeadStatus,
  getLeadById,
  updateAssignees,
  updateLeadPriority,
  updateLeadStatus,
  updateTags,
} from "@/@/redux/slices/leadSlice";
import { useAppDispatch } from "@/@/redux/redux-hooks";
import { createTag, fetchTags } from "@/@/redux/slices/tagsSlice";
import { fetchAllUser } from "@/@/redux/slices/userSlice";
import { convertTimestampToDate } from "@/@/utils/dateFormate";

const AddLeadProfile = () => {
  const dispatch = useAppDispatch();
  const { id: lead_id } = useParams();

  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [leadStatus, setLeadStatus] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [tags, setTags] = useState<any[]>([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const isFetched = useRef(false);

  // Fetch initial data
  useEffect(() => {
    if (!lead_id) {
      return;
    }

    if (!isFetched.current) {
      isFetched.current = true; // Set flag to prevent duplicate calls

      Promise.all([
        dispatch(getAllLeadStatus()).unwrap(),
        dispatch(fetchTags({ module: "lead" })).unwrap(),
        dispatch(
          fetchAllUser({ page: 1, limit: 10, is_with_respect_branch: "0" })
        ).unwrap(),
      ]).then(([statuses, fetchedTags, users]) => {
        // setSelectedLead(lead);
        setLeadStatus(statuses?.data || []);
        setTags(fetchedTags);
        setAssignees(users?.data || []);
      });
    }
  }, []);

  // Refresh lead data only when necessary
  useEffect(() => {
    if (!isRefresh) {
      return;
    }

    dispatch(getLeadById(lead_id as string))
      .unwrap()
      .then((lead) => {
        setSelectedLead(lead);
        setSelectedStatus(
          lead?.status ? `${lead.status.icon} ${lead.status.name}` : null
        );
        setSelectedPriority(lead?.lead?.priority || null);
        setIsRefresh(false);
      });
  }, [isRefresh, lead_id]);

  const handleTagChange = async (e: { value: any }) => {
    const selectedTags = Array.isArray(e.value) ? e.value : []; // Ensure selectedTags is an array
    const newTagIds: string[] = [];

    for (const tag of selectedTags) {
      const newTags = tags?.find(
        (t: { name: any; tag_id: any }) => t?.name === tag || t?.tag_id === tag
      );

      // Create new tags if needed
      if (!newTags) {
        if (!tag) {
          return;
        }
        try {
          const res = await dispatch(
            createTag({
              name: tag.trim(),
              color: getRandomColor(),
              module: "lead",
            })
          ).unwrap();
          if (res?.tag_id) {
            newTagIds.push(res.tag_id);
            setTags((prevTags: any[]) => [...prevTags, res]);
          }
        } catch (error) {
          // console.error("Error creating tag:", error);
          console.log("Error creating tag:", error);
        }
      }
    }

    // Merge existing and newly created tag IDs, ensuring no duplicates
    const finalTags = [
      ...new Set([
        ...selectedTags.map((tag) => {
          const existingTag = tags.find(
            (t) => t.name === tag || t.tag_id === tag
          );
          return existingTag ? existingTag.tag_id : null;
        }),
        ...newTagIds,
      ]),
    ].filter(Boolean); // Remove null/undefined values
    // Call updateTags API with the final tag list

    try {
      await dispatch(
        updateTags({ id: lead_id, data: { tag_ids: finalTags } })
      ).unwrap();
    } catch (error) {
      // console.error("Error updating tags:", error);
      console.log("Error updating tags:", error);
    }
  };

  const handleAssigneesChange = (e: { value: any[] }) => {
    const selectedUserIds = e.value;

    // Check if the new selection is actually different
    if (JSON.stringify(selectedUserIds) === JSON.stringify(assignees)) {
      return; // Don't trigger API call if nothing changed
    }

    dispatch(
      updateAssignees({ id: lead_id, data: { assigned_to: selectedUserIds } })
    ).unwrap();
  };

  // Status Change Handler
  const handleStatusChange = (args: { item: any }) => {
    setSelectedStatus(args.item?.properties?.text);
    dispatch(
      updateLeadStatus({ id: lead_id, data: { status_id: args.item.value } })
    ).unwrap();
  };

  // Priority Change Handler
  const handlePriorityChange = (args: { item: any }) => {
    setSelectedPriority(args.item?.value);
    dispatch(
      updateLeadPriority({
        id: lead_id,
        data: { priority: args.item.value },
      })
    ).unwrap();
  };

  // useEffect(() => {
  //   if (lead_id) {
  //     dispatch(getLeadStatus(lead_id))
  //       .unwrap()
  //       .then((res) => {
  //         setLeadStatus(res);
  //       });
  //     dispatch(getAssignees(lead_id))
  //       .unwrap()
  //       .then((res) => {
  //         setAssignees(res);
  //       });
  //     dispatch(getTags(lead_id))
  //       .unwrap()
  //       .then((res) => {
  //         setTags(res);
  //       });
  //     dispatch(getLeadPriority(lead_id))
  //       .unwrap()
  //       .then((res) => {
  //         setLeadPriority(res);
  //       });
  //   }
  // }, []);

  // Template for dropdown items
  const itemTemplate = (data: { fullName: string }) => {
    return (
      <div>
        <div className="avatar-block user_data_profile_sec">
          <div
            className="user_profile_icon"
            style={{ backgroundColor: getRandomColor(), color: "#fff" }}
          >
            <p className="avtar_profile_text">
              {" "}
              {getNameInitials(data?.fullName)}{" "}
            </p>
          </div>
          <span>{data.fullName}</span>
        </div>
      </div>
    );
  };

  // Template for selected value
  const valueTemplate = (data: { fullName: string }) => {
    return (
      <div>
        <div className="avatar-block tag_dropdown_selected">
          <div
            className="e-avatar e-avatar-small e-avatar-circle"
            style={{ backgroundColor: getRandomColor(), color: "#fff" }}
          >
            {getNameInitials(data?.fullName)}
          </div>
        </div>
      </div>
    );
  };

  // Template for dropdown items
  const itemTagsTemplate = (data: { name: string; color: string }) => {
    return (
      <div>
        <div className="avatar-block tag_dropdown_selected">
          <div
            className="e-avatar e-avatar-small e-avatar-circle"
            style={{
              backgroundColor: getRandomColor(),
              color: "#fff",
            }}
          >
            {data?.name && data?.name}
          </div>
        </div>
      </div>
    );
  };

  const valueTagsTemplate = (data: { name: string; color: string }) => {
    return (
      <div>
        <div className="avatar-block tag_dropdown_selected">
          <div
            className="e-avatar e-avatar-small e-avatar-circle tag-badge-div"
            style={{
              backgroundColor: getRandomColor(),
              color: "#fff",
            }}
          >
            {data?.name && data?.name}
          </div>
        </div>
      </div>
    );
  };

  const priorityTemplate = (data: any) => {
    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Icon icon={data?.icon} width="16" height="16" color={data?.color} />
        {data?.label}
      </span>
    );
  };

  const priorityLabelTemplate = () => {
    return selectedPriority ? (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Icon
          icon={
            priorityColors.find((p) => p.value === selectedPriority)?.icon || ""
          }
          width="16"
          height="16"
          color={
            priorityColors.find((p) => p.value === selectedPriority)?.color ||
            "#000"
          }
        />
        {priorityColors.find((p) => p.value === selectedPriority)?.label}
      </span>
    ) : (
      "Priority"
    );
  };

  const headertext = [
    {
      text: "Profile",
      component: <LeadProfile setIsRefresh={setIsRefresh} />,
      iconCss: "e-icons e-paste",
    },
    // {
    //   text: "Estimates",
    //   component: <LeadEstimates />,
    //   iconCss: "e-icons e-paste",
    // },
    { text: "Task", component: <LeadsTask />, iconCss: "e-icons e-paste" },
    // {
    //   text: "Attachments",
    //   component: <Attachments sortOrder="DESC" />,
    //   iconCss: "e-icons e-paste",
    // },
    {
      text: "Reminders",
      component: <RemindersPage />,
      iconCss: "e-icons e-paste",
    },
    {
      text: "Follow Up Notes",
      component: <FollowUpNotes />,
      iconCss: "e-icons e-paste",
    },
    // {
    //   text: "Activity Log",
    //   component: <ActivityLog sortOrder="DESC" />,
    //   iconCss: "e-icons e-paste",
    // },
  ];

  return (
    <>
      <div className="common_card_main_div">
        <div className="lead_contact_info_edit_div mb-2">
          <div className="left_div">
            <div className="info-item_top_sec">
              {/* <span className="info-label">lead: </span> */}
              <span className="info_value_top_sec">
                {selectedLead?.lead?.sr_number}
              </span>
            </div>
            <div className="info-item_top_sec">
              {/* <span className="info-label">Date Created:</span> */}
              <span className="info-date_top_sec">
                {convertTimestampToDate(
                  selectedLead?.lead?.created_at,
                  "DD MMMM YYYY"
                )}
              </span>
            </div>
            <button className="common_small_btn_icon">
              Convert to Customer
            </button>
          </div>
          <div className="right_div">
            <div className="dropdown-container">
              <div className="status_dropdown_tab">
                {/* Tags MultiSelect */}
                <div className="tags_data_tab ">
                  {/* <label className="block text-gray-600">Tags</label> */}
                  <MultiSelectComponent
                    id="tags_id"
                    dataSource={tags}
                    cssClass="e-outline"
                    fields={{ text: "name", value: "tag_id" }}
                    mode="Box"
                    selectAllText="Select All"
                    unSelectAllText="Unselect All"
                    itemTemplate={itemTagsTemplate}
                    valueTemplate={valueTagsTemplate}
                    showDropDownIcon={true}
                    allowFiltering={true}
                    placeholder="Tags"
                    popupHeight="300px"
                    value={selectedLead?.tags?.map((tag: any) => tag.tag_id)}
                    onChange={(e: any) => handleTagChange(e)}
                    // change={handleTagsChange} // Call API on change
                    allowCustomValue={true} // Allow user to enter new values
                  />
                </div>
                <DropDownButtonComponent
                  items={leadStatus.map(({ status_id, name, icon }) => ({
                    text: `${icon ? icon : ""} ${name ? name : "Status"}`, // Concatenating icon with name
                    value: status_id ?? "", // Setting status_id as the value
                  }))}
                  select={handleStatusChange}
                  className="dropdown_menu_btn"
                >
                  {selectedStatus && selectedStatus !== ""
                    ? selectedStatus
                    : "Status"}{" "}
                  {/* Ensure "Status" is shown if selectedStatus is null, undefined, or empty */}
                </DropDownButtonComponent>

                {/* Priority Dropdown */}
                <DropDownButtonComponent
                  // items={priorityColors.map(
                  //   ({ value, label, icon, color }) => ({
                  //     text: `<span style=${{
                  //       display: "flex",
                  //       alignItems: "center",
                  //       gap: "5px",
                  //     }} > <Icon
                  //           icon=${icon}
                  //           width="16"
                  //           height="16"
                  //           color=${color}
                  //         />
                  //         ${label}
                  //       </span>`,
                  //     value,
                  //   })
                  // )}
                  items={priorityColors}
                  select={handlePriorityChange}
                  className="dropdown_menu_btn"
                  enableHtmlSanitizer={false} // Allow rendering HTML inside `text`
                  itemTemplate={(data: any) => priorityTemplate(data)}
                >
                  {priorityLabelTemplate()}
                </DropDownButtonComponent>
              </div>

              {/* Assignees MultiSelect */}
              <div className="assignees_data_tab">
                {/* <label className="block text-gray-600">Assignees</label> */}
                <MultiSelectComponent
                  id="assigned_to"
                  dataSource={
                    assignees?.map(
                      (user: {
                        first_name: any;
                        last_name: any;
                        user_id: any;
                      }) => ({
                        ...user,
                        fullName: `${user.first_name} ${user.last_name}`, // Combine first and last name
                      })
                    ) || []
                  }
                  fields={{
                    text: "fullName", // Use the concatenated field
                    value: "user_id",
                  }}
                  mode="Box"
                  cssClass="e-outline"
                  selectAllText="Select All"
                  unSelectAllText="Unselect All"
                  itemTemplate={itemTemplate}
                  valueTemplate={valueTemplate}
                  showDropDownIcon={true}
                  allowFiltering={true}
                  placeholder="Assignees"
                  popupHeight="300px"
                  value={selectedLead?.assigned_to?.map(
                    (user: any) => user.user_id
                  )}
                  onChange={(e: any) => handleAssigneesChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="leads_tab_main">
        <TabComponent cssClass="responsive-mode" heightAdjustMode="None">
          <TabItemsDirective>
            {headertext?.map((tab, index) => (
              <TabItemDirective
                key={index}
                header={{ text: tab.text, iconCss: tab.iconCss }}
                content={() => tab.component}
              />
            ))}
          </TabItemsDirective>
        </TabComponent>
      </div>
    </>
  );
};

export default AddLeadProfile;
