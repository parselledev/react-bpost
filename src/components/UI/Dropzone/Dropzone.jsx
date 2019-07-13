import React, {Component} from 'react';
import './Dropzone.sass';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileUpload} from '@fortawesome/free-solid-svg-icons';

class Dropzone extends Component {

  state = {
    files: [],
    preview: [],
    isDrag: false
  }

  fileInputRef = React.createRef();

  handleFilesAdedd = (e) => {
    if (this.props.disabled) return

    let filesObj = "";
    const filesArray = [];

    if(e.target.files) {
      filesObj = e.target.files;
    } else {
      e.preventDefault();
      filesObj = e.dataTransfer.files;
      this.setState({ isDrag: false })
    }

    if(
      filesObj.length > 1 ||
      this.state.files.length >= 1||
      this.state.files.length + filesObj.length > 1) {
      alert('Вы не можете загрузить более 1 файла!');
      return;
    }

    for (var i = 0; i < filesObj.length; i++) {
      filesArray.push(filesObj.item(i))
    }

    this.setState(state => ({
      files: [...state.files, ...filesArray]
    }));

    this.makePreview(filesArray);

    this.props.recieveFiles(filesArray);
  }

  makePreview = (files) => {
    files.forEach(file => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const preview = <img src={reader.result}/>
        this.setState({preview: [...this.state.preview, preview]})
      };

      reader.readAsDataURL(file);
    });
  }

  onDragOver = (e) => {
    e.preventDefault()
    if (this.props.disabled) return
    this.setState({ isDrag: true })
  }

  onDragLeave = () => {
    this.setState({ isDrag: false })
  }

  openFileDialog = () => {
    if (this.props.disabled) return
    this.fileInputRef.current.click()
  }


  render() {
    const {isDrag, preview} = this.state;
    const {name, accept, text} = this.props;

    return (
      <div className="c-dropzone">
        <div
          className={`c-dropzone__area ${isDrag ? 'isDrag' : ''}`}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.handleFilesAdedd}
          onClick={this.openFileDialog}>
          <input
            ref={this.fileInputRef}
            className="c-dropzone__input"
            name={name}
            type="file"
            accept={accept}
            multiple
            onChange={this.handleFilesAdedd}
          />
          {
            preview.length > 0 ?
              <div className="c-dropzone__files">
                {
                  preview.map((item, index) => {
                    return(
                      <div
                        key={index}
                        className="c-dropzone__preview">
                          {item}
                      </div>
                    );
                  })
                }
              </div>
              :
              <React.Fragment>
                <FontAwesomeIcon icon={faFileUpload} className="c-dropzone__icon"/>
                <p className="c-dropzone__title">{text}</p>
              </React.Fragment>
          }
        </div>

        {/* <div className="c-dropzone__files">
          {
            preview.map((item, index) => {
              return(
                <div
                  key={index}
                  className="c-dropzone__preview">
                    {item}
                </div>
              );
            })
          }
        </div> */}
      </div>
    )
  }
}

export default Dropzone;