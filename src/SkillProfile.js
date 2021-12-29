import React, { Component } from 'react';
import { renameSkill } from './store';
import { connect } from 'react-redux';

class SkillProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skillName: (this.props.skill) ? this.props.skill.name : '',
            initialName: this.props.skill.name || '',
            submitEnabled: false
        }

        this.onModify = this.onModify.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.skill.name && this.props.skill.name) {
            this.setState({ skillName: this.props.skill.name, initialName: this.props.skill.name });
        }
    }

    onModify(ev) {
        this.setState({ skillName: ev.target.value});
        //capture button/DOM state in the react state
        //allows you to disable the button and toggle the css formatting in one switch
        if (ev.target.value === this.state.initialName) {
            this.state.submitEnabled = false;
        } else {
            this.state.submitEnabled = true;
        }
    }

    onSubmit(ev) {
        ev.preventDefault();

        //event.nativeEvent gets the standard JS event properties
        //.submitter returns the dom element that submitted the form
        switch (ev.nativeEvent.submitter.id) {
            case 'update': {
                //remember to call the function from this.props otherwise, it will call the function directly from the store which will not fully work. Which is why naming the function the same thing, is a bad idea.
                this.props.renameSkill({ skillId: this.props.skill.id, name: this.state.skillName });
            }
            break;
            case 'cancel': {
                //when you click cancel, navigate back to main page.
                this.props.history.push('/');
            }
            break
            default: {
                return;
            }
        }
    }

    render() {
        return(
            <div className='skill-profile'>
                <form onSubmit={ this.onSubmit } className='skill-profile'>
                <input type='text' value={ this.state.skillName } onChange={ this.onModify }></input>
                <button id='update' disabled={ !this.state.submitEnabled } >Update</button>
                <button id='cancel'>Cancel</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, otherProps) => {
    const skill = state.skills.find(skill => skill.id === otherProps.match.params.id * 1) || {};
    //get selected skill from otherProps
    //add it to the props so it can be accessed on load
    return { 
        ...state,
        skill
    }
}

//destructure history from OtherProps so you can the push('/') the home path into it when you're done updating.
const mapDispatchToProps = (dispatch, { history }) => {
    return {
        renameSkill: ({ skillId, name }) => dispatch(renameSkill({ skillId, name, history}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillProfile);