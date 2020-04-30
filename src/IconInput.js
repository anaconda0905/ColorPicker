import React from 'react';


// Create component for input
class Label extends React.Component {
    render() {
        if (this.props.hasLabel === 'true') {
            return <label className={'iconinputlabel'}
                htmlFor={this.props.htmlFor} > {this.props.label} 
            </label>
        }
    }
}

class IconInput extends React.Component {
                    render() {
        return ( <fieldset className={'iconinputfield'} >
                    <Label hasLabel={this.props.hasLabel}
                        htmlFor={this.props.htmlFor}
                        label={this.props.label}
                    />
                    
                    <input id={this.props.htmlFor}
                        max={this.props.max || null}
                        min={this.props.min || null}
                        name={this.props.name || null}
                        style={{width:"250px"}}
                        placeholder={this.props.placeholder || null}
                        required={this.props.required || null}
                        step={this.props.step || null}
                        type={this.props.type || 'text'}
                    /> 
                </fieldset>
        );
    }
}

export default IconInput;

{/* <IconInput 
          hasLabel='true'
          htmlFor='textInput'
          label='Text input'
          required='true'
          type='text'
        /> */}