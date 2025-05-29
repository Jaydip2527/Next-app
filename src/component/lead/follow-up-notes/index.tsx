import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import {
  createLeadFollowup,
  fetchLeadFollowup,
} from "@/@/redux/slices/leadFollowupSlice";
import { getRelativeTime } from "@/@/utils/dateFormate";
import { getNameInitials } from "@/@/utils/common";
import ToolbarEditor from "../../tool-bar";
import CommonProgressButton from "../../common-progress-button";

const FollowUpNotes = () => {
  const dispatch = useAppDispatch();
  const { lead } = useAppSelector((state) => state.lead);
  const [isRefresh, setIsRefresh] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [notes, setNotes] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(1);

  const { leadFollowupList, loading } = useAppSelector(
    (state) => state.leadFollowup
  );

  useEffect(() => {
    if (leadFollowupList?.total_records) {
      setTotalPages(Math.ceil(leadFollowupList.total_records / limit));
    }
  }, [leadFollowupList?.total_records]);

  const { id: lead_id } = useParams();
  const methods = useForm<any>({
    mode: "onChange",
    // resolver: yupResolver(leadFollowUpValidationSchema),
  });

  const { handleSubmit, reset, clearErrors, watch } = methods;
  // State for pagination, search, and sorting

  // const [search, setSearch] = useState("");
  // const [sortBy, setSortBy] = useState("");
  // const [sortOrder, setSortOrder] = useState("");

  const stripHtml = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const note_description = watch("note_description");
  const isNoteDescriptionEmpty = !stripHtml(note_description)?.trim();

  const fetchNotesData = (pageNumber: number, resetData = false) => {
    if (lead) {
      dispatch(
        fetchLeadFollowup({
          id: lead_id,
          data: {
            page: pageNumber,
            limit,
            // search,
            // sortBy,
            // sortOrder,
          },
        })
      ).then((res) => {
        if (resetData) {
          setNotes(res?.payload?.data?.data || []);
        } else {
          const newNotes = res?.payload?.data?.data || [];
          setNotes((prev: any) => {
            const existingIds = new Set(prev.map((note: any) => note?.note_id));
            return [
              ...prev,
              ...newNotes.filter(
                (note: any) => !existingIds.has(note?.note_id)
              ),
            ];
          });
        }
        setIsRefresh(false);
      });
    }
  };

  useEffect(() => {
    if (!isRefresh) {
      return;
    }
    fetchNotesData(1, true);
  }, [isRefresh]);

  const onSubmit = async (data: any) => {
    try {
      const addFormData = {
        ...data,
        status: "Active",
      };
      await dispatch(createLeadFollowup({ id: lead_id, data: addFormData }));

      clearErrors("note_description");
      reset();
      setIsRefresh(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("onSubmit Error:", error);
    }
  };

  const loadMoreNotes = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotesData(nextPage);
  };

  return (
    <div>
      <div className="common_card_main_div">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                <div className="mb-3 mt-2">
                  <ToolbarEditor name="note_description" isControl={true} />
                </div>
              </Col>
              <Col md={12}>
                <div className="add_contact_btn_sec">
                  <button type="button" className="common_secondary_btn">
                    Cancel
                  </button>
                  <CommonProgressButton
                    content="Save"
                    loading={loading}
                    disabled={isNoteDescriptionEmpty}
                  />
                </div>
              </Col>
            </Row>
          </form>
        </FormProvider>
        <div className="timeline-container mt-5">
          <div className="template-container">
            {notes.length > 0 &&
              notes?.map((item: any) => (
                <div className="mt-3" key={item?.note_id}>
                  <div className="Comment_toolbar_data">
                    <div className="avatar-block">
                      <div className="e-avatar e-avatar-xsmall e-avatar-circle">
                        {getNameInitials(
                          `${item?.user_first_name} ${item?.user_last_name}`
                        )}
                      </div>
                    </div>
                    <p className="Comment_toolbar_user_name">
                      {item?.user_first_name} {item?.user_last_name}
                    </p>
                    <p className="Comment_toolbar_user_time">
                      {getRelativeTime(item?.created_at)}
                    </p>
                  </div>
                  <p
                    className="comment_content"
                    dangerouslySetInnerHTML={{ __html: item?.note_description }}
                  ></p>
                </div>
              ))}

            {notes.length > 0 && page < totalPages && (
              <div className="mt-3">
                <button
                  className="common_secondary_btn"
                  onClick={loadMoreNotes}
                >
                  Load More
                </button>
              </div>
            )}

            {/* {leadFollowupList.data.length > 0 ? (
              leadFollowupList?.data?.map((item: any, index: number) => (
                <div className="d-flex" key={index}>
                  <div className="avatar-block me-3">
                    <div className="e-avatar e-avatar-xsmall e-avatar-circle">
                      {item.icon ? item.icon : "A"}
                    </div>
                  </div>
                  <div className="comment-timeline-item active w-100">
                    <div className="timeline_card_header">
                      <div className="timeline_card_info">
                        <div className="timeline_top_title">
                          {item.note_title ? item.note_title : "No Title"}
                        </div>
                      </div>
                      <div>
                        <span className="timeline-date">
                          {item.date ? item.date : new Date().toDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="w-100">
                      <div className="timeline-content mb-0">
                        <h4
                          className="timeline_first_description"
                          dangerouslySetInnerHTML={{
                            __html: item.note_description,
                          }}
                        ></h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no_data_found">No Data Found</div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpNotes;
