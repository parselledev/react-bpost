import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
import Link from '../../UI/Link/Link';
import './MailsListItem.sass';
import Dropzone from '../../UI/Dropzone/Dropzone';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import Timer from '../../UI/Timer/Timer';


class MailsListItem extends Component {

  state = {
    screenshot: [],
    postmanPartVisible: false,
    timer: 0
  }

  componentWillMount() {
    const {mail:{inProgress,postman,startTimestamp}, userName} = this.props;
    if(inProgress && (userName === postman)) {
      this.setState({postmanPartVisible: true})
    }

    if(Date.now() < startTimestamp + 300000) {
      this.setState({timer: startTimestamp + 300000 - Date.now()});
    }
  }

  handleScreenshotRecieve = (files) => {
    this.setState({screenshot: [files[0]]});
  }

  handleStartMail = () => {
    const {id, userName, mail} = this.props;
    const startTimestamp = Date.now();
    this.setState({
      postmanPartVisible: true,
      timer: 300000,
    });
    this.props.onStartMail(id, userName, startTimestamp, mail);
  }

  handleCancelMail = () => {
    const {id, mail} = this.props;
    this.setState({postmanPartVisible: false});
    this.props.onCancelMail(id, mail);
  }

  hadleCompleteMail = (id, mail) => {
    const {screenshot} = this.state;
    if(screenshot.length == 0) {
      alert('Для завершения загрузите скриншот диалога с адресоатом письма!')
      return
    }
    this.setState({timer: false});
    this.props.onCompleteMail(id, screenshot[0], mail);
  }

  cropText = (text, maxLength) => {
    if(text.length > maxLength) return text.slice(0, maxLength) + '...';
    else return text;
  }

  render() {
    const {postmanPartVisible, timer} = this.state;
    const {id, fetching, userName, mail, onDeleteMail} = this.props;
    const {completed, text, owner, social, inProgress, screenshot, target} = mail;
    const isOwner = userName === owner;

    const textShort = this.cropText(text, 40);

    const textFull = `
    Здравствуйте,
    Мы – Добропочта. Для Вас есть анонимное письмо:
    
    "${text}"
    ___ 
    Добропочта не несет ответственности за передаваемую информацию,
    и не создает данные сообщения.
    С уважением, Добропочта.`;

    return(
      <li className={`list__item ${inProgress ? 'inProgress' : ''} ${isOwner ? 'isOwner':''}`}>
        <div className="item__firstPart">
          <span className={`item__social item__social--${social}`}></span>
          <p className="item__text">{textShort}</p>
            <div className="item__actions">
              {
                !completed ?
                  <React.Fragment>
                    {
                      !isOwner ?
                        <UserActionButtons
                          inProgress={inProgress}
                          handleStartMail={this.handleStartMail}
                          handleCancelMail={this.handleCancelMail}
                          reportIcon={faExclamationTriangle}/>
                      :
                      <OwnerActionButtons
                        inProgress={inProgress}
                        onDeleteMail={onDeleteMail}
                        id={id}/>
                    }
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <Link
                      className="item__screenshotLink"
                      classMod="--blue"
                      text='Посмотреть скриншот'
                      target="_blank"
                      href={screenshot}/>
                    {
                      isOwner ?
                      <Button
                        className="item__startBtn"
                        classMod="small--warning"
                        text="Вернуть на исполнение"
                        onClick={this.handleCancelMail}/>
                      :
                      ''
                    }
                  </React.Fragment>
              }
            </div>
        </div>
        
        {
          postmanPartVisible &&
          <div className="item__postmanPart">
            <div className="item__helpActions">
              <Link
                className="item__progileLink"
                classMod="--blue"
                text='Профиль адресата'
                target="_blank"
                href={target}/>
              <Button.Clipboard
                className="item__copyTextBtn"
                classMod="small--ghost--blue"
                text="Коп. текст письма"
                clipboardtext={textFull}
                temptext="Скопировано"/>
            </div>

            <div className="item__screenshot">
              <Dropzone
                name="screenshot"
                accept="image/*"
                text="Загрузите скриншот переписки"
                recieveFiles={this.handleScreenshotRecieve}/>
            </div>

            <div className="item__complete">
              
              <Button
                className="item__completeBtn"
                classMod="medium--success"
                type="submit"
                disabled={timer === false}
                text={
                  <React.Fragment>
                    {
                      timer !== false ?
                        <>
                          Завершить&nbsp;
                          <Timer
                            startTime={timer}
                            onEnd={this.handleCancelMail}
                          />
                        </>
                        :
                        'Подождите...'
                    }
                  </React.Fragment>
                }
                onClick={() => this.hadleCompleteMail(id, mail)}/>
            </div>
          </div>
        }
      </li>
    )
  }
}

const UserActionButtons = ({inProgress, handleStartMail, handleCancelMail, reportIcon}) => {
  return(
    <React.Fragment>
      {
        !inProgress ?
          <Button
            className="item__startBtn"
            classMod="small--ghost--blue"
            text="Беру!"
            onClick={() => handleStartMail()}/>
          :
          <Button
            className="item__startBtn"
            classMod="small--warning"
            text="Отказаться"
            onClick={() => handleCancelMail()}/>
      }
      <Button
        className="item__reportBtn"
        classMod="small--icon--grey"
        icon={reportIcon}
        title="Репорт"/>
    </React.Fragment>
  );
}

const OwnerActionButtons = ({inProgress, onDeleteMail, id}) => {
  return(
    <Button
      className="item__deleteBtn"
      classMod="small--ghost--danger"
      text={`Удалить${inProgress ? ' (Выполняется)' : ''}`}
      onClick={() => onDeleteMail(id)}
      disabled={!inProgress ? false : true}/>
  );
}

export default MailsListItem;