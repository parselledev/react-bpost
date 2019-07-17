import React, {Component} from 'react';
import PropTypes from 'prop-types'
import compose from 'Utils/compose';
import {connect} from 'react-redux';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';

import {selectAuthUsername} from 'Redux/auth/auth.selectors';
import {mailsAdd} from 'Redux/mails/mails.actions';
import Modal from 'Components/UI/Modal/Modal';
import Form from 'Components/UI/Form/Form';
import Button from 'Components/UI/Button/Button';
import Input from 'Components/UI/Input/Input';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';

class MailsAddContainer extends Component {

  static propTypes = {
    username: PropTypes.string,
    mails: PropTypes.object,
    mailsAdd: PropTypes.func
  };

  state = {
    modalVisible: false
  }

  formInitialValues = {
    social: 'vk',
    target: '',
    text: '',
    recaptcha: ""
  };

  handleModalToggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  handleSubmit = (values, {resetForm}) => {
    const {social, target, text} = values;
    const {username} = this.props;
    this.props.mailsAdd(username, social, target, text);
    resetForm(this.formInitialValues);
    this.handleModalToggle();
  }

  render() {

    const {modalVisible} = this.state;

    const formSchema = Yup.object().shape({
      social: Yup.string()
              .required('Обязательное поле'),
      target: Yup.string()
              .url('Неправильный URL')
              .required('Обязательное поле'),
      text: Yup.string()
            .min(5, 'Минимум 5 символов')
            .max(100, 'Максимум 100 символов')
            .required('Обязательное поле'),
      recaptcha: Yup.string()
        .required('Обязательное поле')
    });

    const form = (
      <Formik
        initialValues={this.formInitialValues}
        validationSchema={formSchema}
        onSubmit={this.handleSubmit}
        setFieldValue>
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Field component={Input.FormSelect} name="social">
                <option value="vk">VK</option>
                <option value="tg">Telegram</option>
              </Field>

              <Field
                component={Input.FormField}
                name="target"
                placeholder="Получатель (ссылка)"/>

              <Field
                component={Input.FormTextarea}
                name="text"
                rows="3"
                placeholder="Текст письма"/>

              <Field
                component={Input.FormReCaptcha}
                setFieldValue={props.setFieldValue}
                name="recaptcha"/>

              <Button
                classMod="medium--blue"
                type="submit"
                text="Добавить"/>
            </Form>
          )}
      </Formik>
    );

    return(
      <div className="mails__add">
        {
          modalVisible ?
            <Modal
              title="Написать письмо"
              content={form}
              handleModalClose={this.handleModalToggle}>
            </Modal>
            :
            ''
        }
        <Button
          className="mails__addBtn"
          classMod="medium--iconed--success"
          text="Написать"
          icon={faPencilAlt}
          onClick={this.handleModalToggle}/>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  username: selectAuthUsername
});

const mapDispatchToProps = (dispatch, {apiService}) => ({
  mailsAdd: (username, social, target, text) => dispatch(mailsAdd(dispatch, apiService, username, social, target, text))
});

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MailsAddContainer);