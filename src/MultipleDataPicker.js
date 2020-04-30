import React from 'react';

const defaultColours = [
    'value1',
    'value2',
    'value3',
    'value4',
    'value5',
];

class MultipleDataPicker extends React.Component {

    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setSelectedColour1 = this.setSelectedColour1.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            dropdownOpen: false,
            selectedIcon: '',
            selectedColour: '',
            componentColours: props.colours ? props.colours : defaultColours,
            filteredComponentColours: props.colours ? props.colours : defaultColours,
        };
        // this.defaultState = this.state;
    }


    componentDidMount() {
        const {
            defaultColour
        } = this.props;
        document.addEventListener('mousedown', this.handleClickOutside);
        if (defaultColour) {
            this.setState({ selectedColour1: defaultColour ? defaultColour : defaultColours[0] });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        // this.setState({ dropdownDiv : false });
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (this.state.selectColour1 !== '' && this.props.onSelect) {
                this.props.onSelect({ colour1: this.state.selectedColour1 });
            } else {
                // this.props.onSelect({});
                if (this.props.onSelect) {
                    this.props.onSelect({});
                }
            }
            this.setState({ dropdownOpen: false });
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

    handleChange(event) {
        const filterString = event.target.value;
        if (filterString.length === 0) {
            this.setState({ filteredComponentColours: this.state.componentColours })
        } else {
            console.log("aaaaaaaaa", filterString);
            // const result = this.state.componentColours.filter(item => { console.log(item); return true; });
            // console.log(result);
            this.setState({ filteredComponentColours: this.state.componentColours.filter(item => item.includes(filterString)) });
        }
    }

    render() {
        const { dropdownOpen, selectedColour1, filteredComponentColours } = this.state;

        const filtered = filteredComponentColours;

        return (

            <div className={`dropdown icon-picker ${dropdownOpen ? 'open' : ''}`} ref={this.setWrapperRef} style={{ width: "250px" }}>
                <span style={{ display: "block" }}>From</span>
                <button className="btn btn-default dropdown-toggle" type="button" onClick={() => this.toggleDropdown()}>
                    <span className="data-picker-background">{selectedColour1}</span>
                    <span className="caret"></span>
                </button>
                {
                    dropdownOpen &&

                    <ul className="data-dropdown-menu" style={{ display: "block" }} >
                        <div className="data-dropdown-menu-content">
                            <input type={"text"} className="data-search" onChange={this.handleChange} placeholder="Type to search" /><br />

                            <ul className="icons">
                                {filtered.map((colour, index) => {
                                    return (
                                        <li key={index} onClick={() => this.setSelectedColour1(colour)}>
                                            <span >{colour}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </ul>
                }
            </div>
        );
    }
}


export default MultipleDataPicker;