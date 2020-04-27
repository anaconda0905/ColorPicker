import React from 'react';

const defaultColours = [
	'#FF1654',
	'#247BA0',
	'#70C1B3',
	'#92b300',
	'#CBB1DB',
	'#C1BF70',
	'#add8e6',
	'#ffc1cb',
	'#67d8f3',
	'#f3af67'
];

class IconColourPicker extends  React.Component {

	constructor() {
		super();
		this.setWrapperRef = this.setWrapperRef.bind(this); 
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		
        this.setSelectedColour1 = this.setSelectedColour1.bind(this);
        this.setSelectedColour2 = this.setSelectedColour2.bind(this);
		
		this.state = {
			dropdownOpen: false,
			selectedIcon: '',
			selectedColour: ''
		};
		this.defaultState = this.state;
	}


	componentDidMount() {
		const {
			defaultColour
		} = this.props;
		document.addEventListener('mousedown', this.handleClickOutside);
		if (defaultColour) {
			this.setState({ selectedColour1: defaultColour ? defaultColour : defaultColours[0], selectedColour2: defaultColour ? defaultColour : defaultColours[0]});
		}
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			if (this.state.selectColour1 !== '' && this.props.onSelect && this.state.selectColour2 !== '' && this.props.onSelect) {
				this.props.onSelect({ colour1: this.state.selectedColour1, colour2: this.state.selectedColour2 });
			} else {
                // this.props.onSelect({});
                if (this.props.onSelect) {
                    this.props.onSelect({});
                }
				this.setState({ selectedColour1: '', selectedColour2: ''});
			}
			this.setState({dropdownOpen: false});
		}
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	toggleDropdown() {
		this.setState({ dropdownOpen: this.state.dropdownOpen ? false : true });
	}

	setSelectedColour1(colour) {
		this.setState({ selectedColour1: colour });
    }
    
    setSelectedColour2(colour) {
		this.setState({ selectedColour2: colour });
	}

	storeColour() {
		this.toggleDropdown();
		if (this.props.onSelect) {
			this.props.onSelect({colour1: this.state.selectedColour1, colour2: this.state.selectedColour2})
		}
	}

	render() {
		const {
			colours
		} = this.props;
        const {dropdownOpen} = this.state;
		const componentColours = colours ? colours : defaultColours;
        const {selectedColour1} = this.state;
        const {selectedColour2} = this.state;

		return (
            
			<div className={`dropdown icon-picker ${this.state.dropdownOpen ? 'open' : ''}`} ref={this.setWrapperRef} style={{width:"262px"}}>
                <span style={{display:"block"}}>Color component label</span>
				<button className="btn btn-default dropdown-toggle" type="button" onClick={() => this.toggleDropdown()}>
                    <div className="color-picker-foreground" style={{backgroundColor:selectedColour1}}></div>
                    <div className="color-picker-background" style={{backgroundColor:selectedColour2}}></div>
					<span className="caret"></span>
				</button>
                {
                    dropdownOpen && 
                    <ul className="dropdown-menu" style={{display: "block"}} >
                    <div className="dropdown-menu-content">
                        <div>
                            <li className="header">Foreground</li>
                            <ul className="icons">
                                {componentColours.map((colour, index) => {
                                    return (
                                        <div>
                                        <li key={index} onClick={() => this.setSelectedColour1(colour)}>
                                            <span className={`color border-radius ${this.state.selectedColour1 === colour ? 'selected' : ''}`} style={{ backgroundColor: colour}}></span>
                                        </li>
                                        </div>
                                    );
                                })}
                            </ul>
                            
                        </div>
                        <div>
                            <li className="header">Background</li>
                            <ul className="icons">
                                {componentColours.map((colour, index) => {
                                    return (
                                        <li key={index} onClick={() => this.setSelectedColour2(colour)}>
                                            <span className={`color border-radius ${this.state.selectedColour2 === colour ? 'selected' : ''}`} style={{ backgroundColor: colour}}></span>
                                        </li>
                                    );
                                })}
                            </ul>
                            
                        </div>
                    </div>
                    <hr />
                    
					<button type="button" className="btn btn-default" style={{textAlign:"center"}} onClick={() => this.storeColour()}>Change colours</button>
                    
				</ul>
                }
				
			</div>
		);
	}
}


export default IconColourPicker;