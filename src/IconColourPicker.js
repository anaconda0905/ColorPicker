import React from 'react';

const defaultColours = [
	'255, 22, 84',
    '36, 123, 160',
    '112, 193, 179',
    '146, 179, 0',
    '203, 177, 219',
    '193, 191, 112',
    '0,0,128',
    '0,128,128',
    '128,0,128',
    '0,128,0',
    '128,128,0',
    '128,0,0',
    '128,128,128',
    '192,192,192',
    '255,0,255',
    '0,255,255',
    '255,255,0',
    '0,0,255',
    '0,255,0',
    '255,0,0',
    '0,0,0',
    '0,102,102',
    '102,102,0',
    '102,0,102'
];

class IconColourPicker extends  React.Component {

	constructor() {
		super();
		this.setWrapperRef = this.setWrapperRef.bind(this); 
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setSelectedColour1 = this.setSelectedColour1.bind(this);
        
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
			this.setState({ selectedColour1: defaultColour ? defaultColour : defaultColours[0]});
		}
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside(event) {
        // this.setState({ dropdownDiv : false });
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			if (this.state.selectColour1 !== '' && this.props.onSelect) {
				this.props.onSelect({ colour1: this.state.selectedColour1});
			} else {
                // this.props.onSelect({});
                if (this.props.onSelect) {
                    this.props.onSelect({});
                }
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

	setSelectedColour1(colour, id) {
		this.setState({ selectedColour1: colour, index1: id });
    }
    

	storeColour() {
        this.setState({ dropdownDiv : true });
		this.toggleDropdown();
		if (this.props.onSelect) {
			this.props.onSelect({colour1: this.state.selectedColour1})
		}
	}

	render() {
		const {
			colours
		} = this.props;
        const {dropdownOpen, selectedColour1, index1, dropdownDiv} = this.state;
        const componentColours = colours ? colours : defaultColours;
        
		return (
            
			<div className={`dropdown icon-picker ${dropdownOpen ? 'open' : ''}`} ref={this.setWrapperRef} style={{width:"250px"}}>
                <span style={{display:"block"}}>Color component label</span>
                
				<button className="btn btn-default dropdown-toggle" type="button" onClick={() => this.toggleDropdown()}>
                    <div className="color-picker-background" style={{backgroundColor:selectedColour1, visibility:dropdownDiv || dropdownOpen ? 'visible' : 'hidden'}}></div>
					<span className="caret"></span>
				</button>
                {
                    dropdownOpen && 
                    <ul className="dropdown-menu" style={{display: "block"}} >
                    <div className="dropdown-menu-content">
                        <div style={{width:"90%",flex:"1", height:"230px", overflow:"auto"}}>
                            <ul className="icons">
                            {componentColours.map((colour, index) => {
                                const colours = colour.split(",");
                                const col1 = "rgba("+colours[0]+","+colours[1]+","+colours[2]+"," + 1+")";
                                const col2 = "rgba("+colours[0]+","+colours[1]+","+colours[2]+"," + 0.8+")";
                                const col3 = "rgba("+colours[0]+","+colours[1]+","+colours[2]+"," + 0.6+")";
                                const col4 = "rgba("+colours[0]+","+colours[1]+","+colours[2]+"," + 0.4+")";
                                const col5 = "rgba("+colours[0]+","+colours[1]+","+colours[2]+"," + 0.2+")";

                                    return (
                                        <li key={index} >
                                            <span className={`color border-radius ${selectedColour1 === col1 && index1 === 1 ? 'selected' : ''}`} style={{ backgroundColor: col1}} onClick={() => this.setSelectedColour1(col1,1)} ></span>
                                            <span className={`color border-radius ${selectedColour1 === col2 && index1 === 2 ? 'selected' : ''}`} style={{ backgroundColor: col2}} onClick={() => this.setSelectedColour1(col2,2)} ></span>
                                            <span className={`color border-radius ${selectedColour1 === col3 && index1 === 3 ? 'selected' : ''}`} style={{ backgroundColor: col3}} onClick={() => this.setSelectedColour1(col3,3)} ></span>
                                            <span className={`color border-radius ${selectedColour1 === col4 && index1 === 4 ? 'selected' : ''}`} style={{ backgroundColor: col4}} onClick={() => this.setSelectedColour1(col4,4)} ></span>
                                            <span className={`color border-radius ${selectedColour1 === col5 && index1 === 5 ? 'selected' : ''}`} style={{ backgroundColor: col5}} onClick={() => this.setSelectedColour1(col5,5)} ></span>
                                        </li>
                                    );
                                })}
                            </ul>
                            
                        </div>
                    </div>
                    <hr />
                    <div style={{textAlign:"center"}}>
					    <input type="button" style={{fontSize:"12px"}} onClick={() => this.storeColour()} value="Change colours" />
                    </div>
				</ul>
                }
			</div>
		);
	}
}


export default IconColourPicker;