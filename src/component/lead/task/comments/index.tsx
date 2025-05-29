import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import Image from "next/image";
import ToolbarEditor from "@/@/component/tool-bar";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { SOURCE_TYPE } from "@/@/utils/constant";
import { createComment, fetchComments } from "@/@/redux/slices/commentSlice";
import { getNameInitials } from "@/@/utils/common";
import { getRelativeTime } from "@/@/utils/dateFormate";
import CommonProgressButton from "@/@/component/common-progress-button";
// import user_img from "../../../../../public/Images/user-img.png";

const CommentsSection = ({
  sortOrder,
  leadTask,
}: {
  sortOrder: "ASC" | "DESC";
  leadTask: any;
}) => {
  const dispatch = useAppDispatch();
  const [isRefresh, setIsRefresh] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 3; // Default pagination limit
  const [comments, setComments] = useState<any[]>([]); // Store comments locally
  const [totalPages, setTotalPages] = useState(1);

  const { commentList, loading } = useAppSelector((state) => state.comment);
  const { lead } = useAppSelector((state) => state.lead);

  useEffect(() => {
    if (commentList?.total_records) {
      setTotalPages(Math.ceil(commentList.total_records / limit));
    }
  }, [commentList?.total_records]);

  const methods = useForm<any>({
    mode: "onChange",
    defaultValues: {
      comment: null,
      status: "Active",
    },
  });

  const { handleSubmit, reset, watch } = methods;
  const stripHtml = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const comment = watch("comment");
  const isCommentEmpty = !stripHtml(comment)?.trim();

  // const isFirstRender = useRef(true);

  useEffect(() => {
    // if (isFirstRender.current) {
    //   isFirstRender.current = false; // Set to false after first render
    //   return;
    // }

    if (!isRefresh) {
      return;
    }

    fetchCommentData(1, true);
  }, [isRefresh, sortOrder]);

  const fetchCommentData = (pageNumber: number, resetData = false) => {
    if (lead && leadTask) {
      const params = {
        SourceId: lead?.lead?.lead_id,
        SourceType: SOURCE_TYPE?.LEAD,
        sortBy: "created_at",
        sortOrder,
        limit,
        page: pageNumber,
      };

      dispatch(
        fetchComments({
          id: lead?.lead?.lead_id,
          taskId: leadTask?.task_id,
          params,
        })
      ).then((res: any) => {
        if (resetData) {
          setComments(res?.payload?.data || []);
        } else {
          const newComments = res?.payload?.data || [];
          setComments((prev) => {
            const existingIds = new Set(
              prev.map((comment: any) => comment.comment_id)
            ); // Store existing IDs
            const filteredComments = newComments.filter(
              (comment: any) => !existingIds.has(comment.comment_id)
            ); // Remove duplicates
            return [...prev, ...filteredComments];
          });
        }
        setIsRefresh(false);
      });
    }
  };

  const onSubmit = (data: any) => {
    if (lead && leadTask) {
      dispatch(
        createComment({
          id: lead?.lead?.lead_id,
          taskId: leadTask?.task_id,
          data,
        })
      ).then(() => {
        reset();
        setIsRefresh(true);
      });
    }
  };

  const loadMoreComments = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCommentData(nextPage);
  };

  return (
    <div>
      <div className="common_card_main_div">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                <div className="mb-3 mt-2">
                  <ToolbarEditor name="comment" isControl={true} />
                </div>
              </Col>
              <Col md={12}>
                <div className="add_contact_btn_sec">
                  <CommonProgressButton
                    content="Comment"
                    loading={loading}
                    disabled={isCommentEmpty}
                  />
                </div>
              </Col>
            </Row>
          </form>
        </FormProvider>
        {/* <div className="timeline-container mt-5">
          <div className="template-container">
            {commentList?.data?.map((item: any, index: number) => (
              <div className="d-flex" key={index}>
                <div className="avatar-block me-3">
                  <div className="e-avatar e-avatar-xsmall e-avatar-circle">
                    {getNameInitials(
                      `${item.user_first_name} ${item.user_last_name}}`
                    )}
                  </div>
                </div>
                <div className="comment-timeline-item active w-100">
                  <div className="timeline_card_header">
                    <div className="timeline_card_info">
                      <div className="timeline_top_title">
                        {item.user_first_name} {item.user_last_name}
                      </div>
                    </div>
                    <div>
                      <span className="timeline-date">
                        {convertTimestampToDate(item?.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="timeline-content mb-0">
                      <h4
                        className="timeline_first_description"
                        dangerouslySetInnerHTML={{
                          __html: item.comment,
                        }}
                      ></h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div>
          {/* <div className="Comment_toolbar_sec">
            <div className="Comment_toolbar_data">
              <div className="Comment_toolbar_user_img">
                <Image
                  className="login_logo_img img-fluid"
                  src={user_img}
                  alt="side_img"
                />
              </div>
              <p className="Comment_toolbar_user_name"> John Doe </p>
            </div>
            <p className="comment_content">
              {" "}
              I just tried this recipe and it was amazing! The instructions were
              clear and easy to follow, and the end result was delicious. I will
              definitely be making this again. Thanks for sharing!
            </p>
            <p className="comment_Partition_line"> </p>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button className="Comment_toolbar_icon_btn">
                  {" "}
                  <Icon icon="carbon:text-bold" width="20" height="20" />{" "}
                </button>
                <button className="Comment_toolbar_icon_btn">
                  {" "}
                  <Icon
                    icon="ph:text-italic-bold"
                    width="20"
                    height="20"
                  />{" "}
                </button>
                <button className="Comment_toolbar_icon_btn">
                  {" "}
                  <Icon icon="ic:round-link" width="20" height="20" />{" "}
                </button>
              </div>
              <div>
                <button className="common_btn"> comment </button>
              </div>
            </div>
          </div> */}

          {comments?.length > 0 &&
            comments?.map((item: any) => (
              <div className="mt-3" key={item?.comment_id}>
                <div className="Comment_toolbar_data">
                  <div className="avatar-block">
                    <div className="e-avatar e-avatar-xsmall e-avatar-circle">
                      {getNameInitials(
                        `${item.user_first_name} ${item.user_last_name}`
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
                  dangerouslySetInnerHTML={{ __html: item?.comment }}
                ></p>
              </div>
            ))}

          {comments.length > 0 && page < totalPages && (
            <div className="mt-3">
              <button
                className="common_secondary_btn"
                onClick={loadMoreComments}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
