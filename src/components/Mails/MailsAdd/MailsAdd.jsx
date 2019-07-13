import React, {Component} from 'react';
import PropTypes from 'prop-types'
import compose from '../../../utils/compose';
import {connect} from 'react-redux';
import withApiService from '../../hoc/withApiService';
import {fetchAddMail} from '../../../actions/mailsActions';
import Modal from '../../UI/Modal/Modal';
import Form from '../../UI/Form/Form';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

class MailsAddContainer extends Component {

  static propTypes = {
    userName: PropTypes.string,
    mails: PropTypes.object,
    onAddMail: PropTypes.func
  };

  state = {
    modalVisible: false
  }

  formInitialValues = {
    social: 'vk',
    target: '',
    text: ''
  };

  handleSubmit = (values, {resetForm}) => {
    const {social, target, text} = values;
    const {userName} = this.props;
    this.props.onAddMail(userName, social, target, text);
    resetForm(this.formInitialValues);
    this.setState({modalVisible: false});
  }

  handleReset = () => {
  }

  render() {

    const formSchema = Yup.object().shape({
      social: Yup.string()
              .required('Обязательное поле'),
      target: Yup.string()
              .url('Неправильный URL')
              .required('Обязательное поле'),
      text: Yup.string()
            .min(5, 'Минимум 5 символов')
            .max(100, 'Максимум 100 символов')
            .required('Обязательное поле')
    });

    const form = (
      <Formik
        initialValues={this.formInitialValues}
        validationSchema={formSchema}
        onSubmit={this.handleSubmit}>
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

              <Button
                classMod="medium--blue"
                type="submit"
                text="Добавить"/>
            </Form>
          )}
      </Formik>
    );

    return(
      <Modal
        title="Добавить письмо"
        content={form}
        visible={this.state.modalVisible}>
        <Button
          className="mails__addBtn"
          classMod="medium--iconed--success"
          text="Написать"
          icon={faEdit}/>
      </Modal>
    );
  }
}

const mapStateToProps = ({login:{userName}}) => {
  return {userName};
}

const mapDispatchToProps = (dispatch, {apiService}) => {
  return {
    onAddMail: (userName, social, target, text) => dispatch(fetchAddMail(dispatch, apiService, userName, social, target, text))
  };
}

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MailsAddContainer);