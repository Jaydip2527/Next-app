import React from "react";
// import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Col, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import UploadFiles from "../../upload-files";

const Attachments = ({ sortOrder }: { sortOrder: "ASC" | "DESC" }) => {
  const methods = useForm<any>({
    mode: "onChange",
    // resolver: yupResolver(leadValidationSchema),
  });

  console.log("sortOrder :>> ", sortOrder);

  const { handleSubmit } = methods;
  const onSubmit = (data: any) => {
    console.log("data :>> ", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="common_card_main_div">
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <UploadFiles name="files" multiple={true} />
                </div>
              </Col>
            </Row>
          </div>

          <h6 className="common_card_title"> Government Id </h6>

          <div className="common_card_main_div add_padding">
            <div>
              <p className="attachments_upload_title">
                {" "}
                Upload the document file as image or pdf with high resolution.
                Max file size 2mb{" "}
              </p>

              <Row>
                <Col lg={12} xl={8}>
                  <div className="attachments_card_data">
                    <Row>
                      <Col md={6}>
                        <div className="text_filed upload_filed_padding">
                          <TextBoxComponent
                            placeholder="Aadhar Card Number"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="card_upload_sec">
                          <UploadFiles name="files" multiple={true} />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="attachments_card_data">
                    <Row>
                      <Col md={6}>
                        <div className="text_filed upload_filed_padding">
                          <TextBoxComponent
                            placeholder="PAN Number"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="card_upload_sec">
                          <UploadFiles name="files" multiple={true} />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="attachments_card_data">
                    <Row>
                      <Col md={6}>
                        <div className="text_filed upload_filed_padding">
                          <TextBoxComponent
                            placeholder="Driving License"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="card_upload_sec">
                          <UploadFiles name="files" multiple={true} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Attachments;
