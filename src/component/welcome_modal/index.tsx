'use client';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from "next/image";
import WelcomeUserImg from "../../../public/Images/welcome_user_img.png"

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='welcome_modal_card'
        >
            <Modal.Body className='welcome_modal_bg'>
                <div className="welcome_modal_main">
                    <div className='welcome_user_img_div'>
                        <Image className="welcome_user_img img-fluid" src={WelcomeUserImg} alt="welcome_user_img" />
                    </div>
                    <p className='welcome_user_title'> Welcome aboard smith! </p>
                    <p className='welcome_user_subinfo'> Thank you for  choosing LedgerX, before you start, we’d love to show you around and help you navigate the app. </p>
                    <div className='welcome_user_btn_sec'>
                        <button className='common_btn' >
                            Show Me Around
                        </button>
                        <button className='welcome_user_second_btn'> 
                            No Thanks, I&apos;ll Explore It.
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

function WelcomeModel({ class_name = '', title = 'Click Here' } : any) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <button className={class_name} onClick={() => setModalShow(true)}>
                {title}
            </button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default WelcomeModel;