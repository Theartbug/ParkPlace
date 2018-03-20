import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { signup } from './actions';
import blankImage from '../app/default.png';

class SignUp extends PureComponent {

  state = {
    error: null,
    image: blankImage,
    disable: false
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { elements } = event.target;
    const { history, location } = this.props;

    const credentials = {
      email: elements.email.value,
      password: elements.password.value,
      image: elements.image.files[0],
      location: elements.location.value,
      userName: elements.username.value
    };
    
    const { from } = location.state || { from: { pathname: '/' } };

    this.props.onSubmit(credentials)
      .then(() => {
        setTimeout(() => {
          history.push(from); //allows firebase to send the auth token prior to page move!
        }, 100);
      })
      .catch(error => this.setState({ error }));
  };

  handleUpload = ({ target }) => {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
      this.setState({ image: reader.result, disable: true });
    };
  };

  handleImageRemove = () => {
    this.setState({ image: null, disable: false });
    this.pictureInput.value = ''; //clears file 
  };

  render() {
    const { error, image, disable } = this.state;
    const { buttonText, legendText } = this.props;

    return (

      <form className="player-form" onSubmit={this.handleSubmit}>
        <legend>{legendText}</legend>
        <label htmlFor="email"> Email:
        <input name="email" required/>
        </label>

        <label htmlFor="password" > Password:
        <input name="password" type="password" required/>
        </label>

        <label htmlFor="username"> Username: 
        <input name="username" required/>
        </label>

        <label htmlFor="location"> Location: 
        <input name="location"/>
        </label>

        <label htmlFor="image"> Add Profile Picture:
        <input ref={(input) => { this.pictureInput = input; }} type="file" name="image" onChange={this.handleUpload} disabled={disable}/>
        </label>

        <figure>
          { (image !== blankImage) && <button type="button" onClick={this.handleImageRemove}>x</button> }
          <img className="preview" src={image}/>
        </figure>

        <button type="submit">{buttonText}</button>
        <pre style={{ color: 'red' }}>
          {error && error.message}
        </pre>
      </form>
    );
  }
}

export default connect(
  () => ({ 
    buttonText: 'Create Account',
    legendText: 'Sign Up' 
  }),
  { onSubmit: signup }
)(SignUp);