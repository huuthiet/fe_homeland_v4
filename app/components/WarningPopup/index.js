/**
 *
 * WarningPopup
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './style.scss';
import { Modal, ModalBody, Button } from 'reactstrap';
import ClassNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import messages from '../Navbar/messages';

function WarningPopup(props) {
  const {
    content = '',
    visible = false,
    className = '',
    toggle = () => {},
    callBack = () => {},
  } = props;

  return (
    <Modal
      className={ClassNames('warning-popup-wrapper', className)}
      isOpen={visible}
      size="lg"
      centered
    >
      <ModalBody className="body-wrapper">
        <div className="content">{content}</div>
        <div className="btn-wrapper">
          <Button
            className="btn-block"
            color="success"
            onClick={() => {
              callBack();
              toggle(visible);
            }}
          >
            {<FormattedMessage {...messages.agree} />}

          </Button>
          <Button
            className="btn-block"
            color="secondary"
            onClick={() => {
              toggle(visible);
            }}
          >
             {<FormattedMessage {...messages.cancel} />}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

WarningPopup.propTypes = {};

export default WarningPopup;
